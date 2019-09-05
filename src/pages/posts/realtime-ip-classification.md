---
template: "blog/blog-post"
draft: false

# Metadata
title: "How to efficiently classify IP addresses in real time using a self made IP DB"
description: "This post details how we efficiently use MaxMind DB format to generate and run realtime classification of IP addresses at scale"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: What is a Sneaker Bot...

# Fields
date: 2018-05-08
author:
	- Barak Amar
	- Yael Fraiman

blog_title: "How to efficiently classify IP addresses in real time using a self made IP DB"
categories: Engineering
tags: 
	- MaxMindDB 
	- IP
	- Classification
	- Golang
	- Perl

thumbnail: bad_good.jpg
---

At PerimeterX we process a lot of data that we collect from websites' users, to classify and analyze the behavior of the users and determine if they are legitimate or not. A key component of any such analysis involves processing the user's IP address. Knowing more information about the request source IP can have many benefits, from geographic location, service provider, verifying if the IP appeared in bad reputation lists we maintain, and more. As the data we needed to categorize grew and the number of requests went up, we started looking into a better solution than simply iterating over each IP and matching it against a list of networks. We were already familiar with MaxMind as a solution for GeoLocation, when we implemented our own auto-update mechanism and put the legwork into researching the most suitable library for faster lookup.

Some of the benefits of the MaxMind DB file format are:

1. The file format holds the same structure used for binary lookup, usually it means that the reader library will map the file into memory and use it directly to look up the IP information. This makes loading and searching the database very fast.
2. Multiple reader libraries that read from this file format (different programming languages and multiple implementations)
3. Has spec [MaxMind DB File Format Specification](https://maxmind.github.io/MaxMind-DB/)

This solution allowed us to process a large amount of traffic with a fast lookup and a small memory footprint. Internally we use multiple databases and a small cache layer to eliminate lookups. We use it to store, distribute and efficiently manage IP databases in our network, from IP information that we extract, collect or that our algorithms generate based on traffic we analyze.

We found this process to be extremely efficient, and as it is fairly simple to demonstrate the use of it, we wanted to share the steps we did, by provide a detailed example. In the following example we will take the [Amazon AWS IP Address Ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) and:

1. Build an application that will collect the data
2. Build a database from the data
3. Use the database for enrichment purposes

## Grabbing the raw IP information

The following code (collect.go) will collect IP ranges information from Amazon and build a CSV with a service and region associated for each range:

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
)

func main() {
	// request amazon ip ranges data
	res, _ := http.Get("https://ip-ranges.amazonaws.com/ip-ranges.json")
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	// parse json information
	var aws struct {
		SyncToken  string `json:"syncToken"`
		CreateDate string `json:"createDate"`
		Prefixes   []struct {
			IPPrefix string `json:"ip_prefix"`
			Region   string `json:"region"`
			Service  string `json:"service"`
		} `json:"prefixes"`
	}
	json.Unmarshal(body, &aws)

	// ouput as csv
	writer := csv.NewWriter(os.Stdout)
	defer writer.Flush()
	writer.Write([]string{"service", "region", "network"})
	for _, p := range aws.Prefixes {
		writer.Write([]string{p.Service, p.Region, p.IPPrefix})
	}
}
```

We will also provide a short Dockerfile to use the code above:

```docker
FROM golang:1-alpine
RUN mkdir /app
WORKDIR /app
COPY collect.go ./
RUN go build
ENTRYPOINT ["/app/app"]
```

## Creating IP DB for fast lookup

Using the collected information, the following code will read the CSV and build a MaxMindDB file populated with the IP classification information:

```perl
#!/usr/bin/env perl
use strict;
use warnings;

use Text::CSV_XS;
use Net::Works::Network;
use MaxMind::DB::Writer::Tree;

my %types = (
    service => 'utf8_string',
    region  => 'utf8_string',
);

my $tree = MaxMind::DB::Writer::Tree->new(
    database_type => 'Feed-IP-Data',
    description => { en => 'Amazon IP data' },
    ip_version => 6,
    map_key_type_callback => sub { $types{ $_[0] } },
    record_size => 24,
);

my $file = $ARGV[0] or die "Need to get CSV file on the command line\n";
print "==> ", $file, "\n";
open(my $fh, "<", $file) or die "$file: $!";

my $csv = Text::CSV_XS->new();
$csv->column_names($csv->getline($fh));
while (my $row = $csv->getline($fh)) {
    my $network = Net::Works::Network->new_from_string( string => $row->[2] );
    my $metadata = { service => $row->[0], region => $row->[1] };
    $tree->insert_network($network, $metadata);
}
close $fh;

my $filename = $ARGV[1] or die "Need to get mmdb file on the command line\n";
open my $ofh, '>:raw', $filename;
$tree->write_tree( $ofh );
close $ofh;

print "$filename created\n";
```

And again, a Dockerfile to run the build database script

```docker
FROM perl:5
RUN cpanm --notest --skip-satisfied MaxMind::DB::Writer Text::CSV_XS
RUN mkdir /out /app
WORKDIR /app
COPY build.pl ./
VOLUME "/out"
ENTRYPOINT ["perl", "build.pl"]
```

## IP classification as middleware

In the last step, here is an example of a small http server that will use the database to enrich the requests by placing the AWS service and region in dedicated HTTP headers

```go
package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	maxminddb "github.com/oschwald/maxminddb-golang"
)

// ClassificationRecord IP classification record
type ClassificationRecord struct {
	Service string `maxminddb:"service"`
	Region  string `maxminddb:"region"`
}

/// extracting the real user's IP address, assuming it is on a dedicated HTTP header: X-REAL-IP
func getRealIP(r *http.Request) string {
	rip := r.Header.Get("X-REAL-IP")
	if rip == "" {
		rip = r.RemoteAddr
	}
	return rip
}

// enrichClassification enrich request with classification information on headers
func enrichClassification(reader *maxminddb.Reader, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// log request real ip
		rip := getRealIP(r)
		log.Printf("Request from %s", rip)
		// parse ip and enrich classification information
		addr := net.ParseIP(rip)
		if addr != nil {
			var record ClassificationRecord
			_ = reader.Lookup(addr, &record)
			if record.Service != "" {
				r.Header.Set("X-IP-SERVICE", record.Service)
			}
			if record.Region != "" {
				r.Header.Set("X-IP-REGION", record.Region)
			}
		}
		next.ServeHTTP(w, r)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "What would life be if we had no courage to attempt anything?\n")
	// use enriched information if found on request
	if service := r.Header.Get("X-IP-SERVICE"); service != "" {
		fmt.Fprintf(w, "Known service %s\n", service)
	}
	if region := r.Header.Get("X-IP-REGION"); region != "" {
		fmt.Fprintf(w, "Known region %s\n", region)
	}
}

func main() {
	// load mmdb with classifications
	mmdb, err := maxminddb.Open("feed.mmdb")
	if err != nil {
		log.Fatalln(err)
	}
	defer mmdb.Close()
	// register routes and serve requests
	http.Handle("/", enrichClassification(mmdb, index))
	log.Fatalln(http.ListenAndServe(":8080", nil))
}
```

Dockerfile to run the code above.
For simplicity we embed the 'feed.mmdb' database file - but we can use it from a shared volume or download/update it using the server itself.

```docker
FROM golang:1-alpine
RUN apk add --update git
RUN mkdir /app
WORKDIR /app
COPY use.go feed.mmdb ./
RUN go get -d . && go build
EXPOSE 8080
CMD ["/app/app"]
```

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/2fQ1Gq3KOpvNs4NTmu" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/siliconvalleyhbo-2fQ1Gq3KOpvNs4NTmu">via GIPHY</a></p>

Now we have a fast and simple solution that you can extend upon and use in order to classify your traffic based on the client IP.
