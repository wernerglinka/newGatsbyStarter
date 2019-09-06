---
template: "blog/blog-post"
draft: false

# Metadata
title: "There and Back Again - The Story of a Stream"
description: "Stream processing is one of those nifty new big data buzz words. To catch up on what it is and where it’s at, this two-part blog post from O’Reilly’s Radar is a wonderful crash course."

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: There and Back Again...

# Fields
date: 2016-10-20
author:
  - Elad Amit

blog_title: "There and Back Again - The Story of a Stream"
categories: Engineering
tags:
  - devops
  - scale
  - kafka
  - stream-processing

thumbnail: there-and-back-again.jpg
---

_(Part 1 of 4)_

## A Humble Beginning (a.k.a. always start simple)

“Stream processing” is one of those nifty new “big data” buzz words. To catch up on what it is and where it's at, [this](https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-101) two-part blog post from O'Reilly's Radar is a wonderful crash course.

In this series of posts, we'll lay out our own experience over the past year or so. The posts start with a humble beginning, trace the history to where we are now, and then cover our near-term plans.

At PerimeterX we are experiencing one of those _fun_ problems; we get to inspect the entire stream of traffic from our customer's application. To protect our customers' websites and applications, we get to inspect and collect activities and interactions of the users from all of their pages. Given the size of the customers and amount of page views we protect, that’s a lot of data to collect, and that imposes the demand for speed. The API calls delivering this information need to get a fast response. In addition, the data itself needs to be processed and made available as swiftly as possible for our customers to see what's going on in their systems.

That, in a nutshell, is the reason stream processing became a focus for our team.

![Going up stream, credit: https://www.flickr.com/photos/katmainps/16333875678/](/assets/images/blog/going_up_stream.jpg)

Fortunately enough, stream processing is dead simple to start with. This notion got us to our first [Spark Streaming](http://spark.apache.org/docs/latest/streaming-programming-guide.html) implementation which was built in our early stages to solve a problem which was much simpler back then. It was built as a set of [Spark standalone](http://spark.apache.org/docs/latest/spark-standalone.html) clusters, each with its own purpose. All these clusters were relatively simple and had no dependencies between them or any long-term state, i.e. beyond the scope of a batch.

The caveats: Spark's inherent complexity and our lack of understanding of its inner workings, at the time, brought on these following pain points:

- Memory consumption was going through the roof (at ~24gb of RAM per host).
- Throughput stability was something we craved but did not have.
- As a result of the above, manual data replays were occurring on a weekly basis and at the worst times imaginable - as production issues often do.

Being a group of pragmatic individuals, the kind who'd choose buy over build and iterative design, we decided to switch from Spark to a simpler solution and get rid of complexity we did not need at the time.

Our requirements were simple, and amounted to collecting, enriching and shipping our raw data to various data stores. The ops people among you may have already noticed that this sounds very similar to log shipping, the problem solved by the likes of [flume](https://flume.apache.org/) and [Logstash](https://www.elastic.co/products/logstash).

In our comparison, Logstash won due to three main advantages:

1. It has well-maintained plugins for the inputs (Kafka) and outputs (Cassandra, Elasticsearch, BigQuery, InfluxDB, and Google Cloud Storage) that we needed, along with a good community and documentation on how to build one's own plugins.
2. Our team had more experience running stable Logstash-based pipelines than any of the other options.
3. We are avid fans of Elasticsearch and the ELK stack in general, though secretly we chose Logstash because it has an awesome logo. Seriously, mustaches are cool.

Both in our trials and once deployed, we found these are indeed much simpler components to use. The benefits we saw:

- Memory consumption was much lower - after the switch each host/process was consuming 1 to 2gb of RAM, depending on the specific process and purpose.
- Logstash completely(-ish) lacks state, which made it much simpler to autoscale / repair.
- Throughput decreased a bit, which was to be expected when moving away from Scala to JRuby.

### Logstash and Cassandra (a.k.a. it's not all rainbows and ponies)

Luckily enough, the Kafka and Elasticsearch plugins are indeed top-notch and helped reduce our stability issues to near zero. We found, however, that the currently available [Logstash Cassandra output](https://github.com/otokarev/logstash-output-cassandra) plugin was a bit problematic for our needs; we required more capabilities and better stability. This led to the open sourcing of a new version, which can be found among our open-sourced projects [here](https://github.com/PerimeterX/logstash-output-cassandra).

Its use is quite simple and allows you to both drive data as-is to your Cassandra cluster, and _adjust_ the data specifically at the output level if necessary.

### What's Next?

Once deployed, this shift achieved exactly what we were aiming for. While throughput decreased by ~15% per core, stability improved and this part of our system was no longer that annoying thing that wakes the on-call person every other night.

This was all fine and dandy until we started getting more complex requirements, which forced us to delve into the horrible Land of Long-term State.

In Part Two of this series, we will go into the reasons we ended up circling back to Spark Streaming, and using it to augment Logstash. The post will detail our new deep-dive into Spark Streaming, based on new knowledge and new requirements, and how we got it working smoothly. We'll share what we've learned about the caveats and gotchas of running a production-grade pipeline on top of Spark Streaming.
