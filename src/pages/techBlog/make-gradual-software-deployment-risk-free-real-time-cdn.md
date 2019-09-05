---
template: "blog/blog-post"
draft: false

# Metadata
title: "Make gradual software deployment risk-free with a real-time CDN"
description: "Giving a customer the ability to gradually roll out changes in your product can be a challenge. See how we simplified the logic and leveraged our CDN's edge scripting language to create customer specific control groups that can be used for A/B testing. The next time you make a change to your website assets you can feel safe knowing that you are in control"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: Make gradual software deployment...

# Fields
date: 2016-12-20
author:
  - Or Guz

blog_title: "Make gradual software deployment risk-free with a real-time CDN"
categories: Engineering
tags:
  - cdn
  - fastly
  - gradual deployment
  - ab testing
  - ab

thumbnail: make-gradual-software-deployment.png

canonical_overwrite: https://techbeacon.com/make-gradual-software-deployment-risk-free-real-time-cdn
---

_*As originally published in [TechBeacon](https://techbeacon.com/make-gradual-software-deployment-risk-free-real-time-cdn)*_

## Background

For many organizations, making changes in the content they serve may not be an easy slam-dunk. The new content might contain a “buggy” script causing browsers to display annoying behaviors. Or it might simply be new content that you want to unveil gradually to your audiences. In both cases, you want to perform a gradual deployment, AKA AB testing, to test the new content on a small subgroup of your customers. This blog details how to cut the risk with an easy, gradual deployment using a real-time CDN.

Organizations have been increasingly looking to real-time content delivery networks (CDNs) for Javascript monitoring clients.

CDN nodes generally cache content separately for each customer group, which means that the content can be versioned and may vary between customers. Since it is versioned, do you have to change the javascript version occasionally according to your customers’ requirements?
The answer, of course, is YES and this is where it starts getting risky.

> “There can be no great accomplishment without risk.” - Neil Armstrong

Why not minimize the risk through gradual deployment of updated static content?

Here's how to cut the risk with an easy, gradual deployment using a real-time CDN.

## How to implement gradual deployment

The following instructions show gradual deployment on the generalized CDN level. You will need to adapt the general process to the specific capabilities of your own CDN. After the general CDN instructions below, I give an example of a specific implementation our team has used.

### Step 1 - Define A/B:

Define version A (current version) and version B (next version to test).

### Step 2 - Define success criteria and appropriate logging:

Gradually deploy version B, while making sure to log possible errors, monitor performance and define success criteria. For example, success can be defined as:

No errors and maximum performance.

### Step 2 - Step 3 - Serve version A to X% of the users and version B to Y% of them:

You should use a cookie indicating which version needs to be served. If it exists (from previous session), use it and if not, generate a A/B value according to the required percentage and set it on the response.

To make sure the CDN’s cache nodes will cache version A separately from version B, You should use the Vary header. Normally, CDNs use the request path and the host header to find an object in their cache. The Vary header tells the cache which other parts of the request (header names, separated by a comma) are also relevant for finding the cache object.

An additional point to mention: you may want to assign different percentages to each customer group and be able to dynamically change the percentage. In this case, you should check if there is some kind of dynamic updatable config table on the CDN level so that the group percentage will be extracted from it.

You'll find it instructive to create your own Gradual Deployment/AB Testing advanced logic using a real-time CDN.

## Fastly-specific implementation example

The following instructions are geared to the Fastly CDN. If you use another CDN, you will need to adapt the general process to the specific capabilities of that particular CDN.

Let's start by setting the header, X-VersionAB, indicating which version to serve:

```bash
# Subroutine getting executed when request is received
vcl_recv {
  if (req.http.Cookie:VersionAB) {
    # Cookie exists, use it to populate header
    set req.http.X-VersionAB = req.http.Cookie:VersionAB;
  } else { # Cookie doesn't exist, generate random header value according to percentage
    if (randombool(10,100)) {
      set req.http.X-VersionAB = "B";
    } else {
      set req.http.X-VersionAB = "A";
    }
  }
}
```

VersionAB is the cookie indicating which version needs to be served. If it exists (from previous session), use it and if not, generate a new random value according to the percentage being passed as a first parameter to the randombool function.

On the other hand, if you had no cookie to begin with, you would want to create it with a three-day expiry.

```bash
sub vcl_deliver {
  if (!req.http.Cookie:VersionAB) {
    add resp.http.Set-Cookie="VersionAB=" req.http.X-VersionAB "; expires=" now + 3d ";";
  }
  return (deliver);
}
```

At this point, you’ve made sure that:

- Every request reaching your backend will have X-VersionAB set to the correct version;
- Every response being delivered will set the cookie when needed.

All that remains to wrap this up is to make sure the CDN’s cache nodes will cache version A separately from version B. This is exactly what the Vary header is designed for. Normally, CDNs like Fastly use the request path and the host header to find an object in their cache. The Vary header tells the cache which other parts of the request (header names, separated by a comma) are also relevant for finding the cache object.

```bash
sub vcl_fetch {
  # Append X-VersionAB header name to the vary header
  if (beresp.http.Vary) {
    set beresp.http.Vary = beresp.http.Vary ", X-VersionAB";
  } else {
    set beresp.http.Vary = "X-VersionAB";
  }
}
```

Now the hashing function, which determines the key for the cache entry, will take your version header into account. An additional point to mention: you may want to assign different percentages to each customer group and be able to dynamically change the percentage. Edge Dictionaries come to the rescue. (Full documentation can be found [here](https://www.fastly.com/blog/announcing-edge-dictionaries-make-faster-decisions-edge) and [here](https://www.fastly.com/blog/improvements-edge-dictionaries).)

To make a long story short, using the REST API you can create and update an edge dictionary for maintaining state (key, value table) across VCL versions.

For the following steps, we assume you have read how to use edge dictionaries and you were able to create one for your service.

Here is an example of an edge dictionary:

```bash
table gradual_percentage {
  "Group1": "10",
  "Group2": "20",
  "Group3": "30",
}
```

You can fetch the value for the relevant group and use it to set the right X-VersionAB value.

```bash
# Subroutine getting executed when request is received
vcl_recv {
  set req.http.X-Group-Num = <Group extraction logic>
  set req.http.X-Percentage = table.lookup(gradual_percentage, req.http.X-Group-Num);
  if (req.http.Cookie:VersionAB) {
    # Cookie exists, use it to populate headerset req.http.X-VersionAB = req.http.Cookie:VersionAB;
  } else {
    # Cookie doesn't exist, generate random header value according to percentage
    if (randombool(std.atoi(req.http.X-Percentage),100)) {
      set req.http.X-VersionAB = "B";
    } else {
      set req.http.X-VersionAB = "A";
    }
  }
}
```

Replace <Group extraction logic> with your own relevant logic. You can use a header or a value extracted from a cookie, for example. From there, you obtain the percentage value from the dictionary (“gradual_percentage”) for the relevant group and use this value (after converting the string to a number) for the randombool function.

If you are not certain the dictionary already contains a value for your group, you can add a check for this case and set req.http.X-Percentage to 0 so version A will be served.

Your work is done, and now you can use edge dictionary functionality to make life easier.

These are the key features of edge dictionaries you can now use:

- CRUD REST APIs for manipulating group percentage.
- Batch API for updating several groups together.
- You can also take it to the next level and allow your customers to set their own percentage via your API. For instance, PerimeterX uses Fastly API after proper validations, authentication, and authorization.

Gradually rolling out changes in your product can be risky, but it is possible when you take into consideration the following:

- Create A and B versions of your updated content, then define success criteria. You serve a set percentage of users with version A, and the remainder with version B.
- Use the Vary heading to make sure the CDN’s cache nodes will cache version A separately from version B.
- Finally, use the updatable state with the REST API (edge dictionary) to make a few tasks easier, such as updating several groups together.

Share your experiences with using CDNs for software delivery in the comments section below.
