---
template: "blog/blog-post"
draft: false

# Metadata
title: "When Kafka met Bruce: How one service can boost app messaging reliability"
description: "Given massive scale and many producers, we saw the need to develop a buffer between our application and Kafka — until we met bruce"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: When Kafka met Bruce...

# Fields
date: 2016-11-04
author:
  - Ben Diamant

blog_title: "When Kafka met Bruce: How one service can boost app messaging reliability"
categories: Engineering
tags:
  - devops
  - scale
  - kafka
  - bruce
  - bigdata

thumbnail: when-kafka-met-bruce.png
---

**Given massive scale and many producers, we saw the need to develop a buffer between our application and Kafka — until we met bruce**

Apache Kafka, the open source messages broker originally developed by LinkedIn, has gained in popularity and became a major player in big data pipeline infrastructures.

It's easy to see why: Kafka simplifies messages transportation between applications, and brings many advantages to the table when compared to its competitors. It has high throughput of up to 170, 000 messages per second per thread, simple messages partitioning, disk persistence, and easy data replays.

Kafka is a good choice to use when:

- One service writes messages faster than they can be read by the service that reads them.
- Single/many sources produce data, single/many origins consume it.
- You want to decouple your producer and consumers. An example would be server-side application and databases.

Before diving in, it's important to understand four key terms:

- **Kafka Message** - A single entity delivered by Kafka. Popular formats are: string, JSON, and Avro.
- **Topic** - A messages feed managed by Kafka. You can define multiple topics.
- **Producer** - A client that publishes messages through a Kafka topic. Multiple producers can publish to a single topic.
- **Consumer** - A client that subscribes to messages delivered through Kafka cluster. Multiple consumers can subscribe to a single topic.

At PerimeterX, we use Kafka for multiple purposes, delivering messages on different topics with producer clients written in Python, Node.js, Scala, and Go, transporting tens of thousands messages every second.

When our Kafka cluster got bigger, and with the growing amount of different producers, we wanted to ensure that our data pipeline is fault tolerant. One of the data junctions we wanted to improve is the pipe from the producers to Kafka.

## The problem starts with dependency

Kafka has many producers, publishing messages on multiple topics. These producers are usually server-side services or apps that receive data from a different source, process it, and push it to Kafka.

The dependency between your application and Kafka is very strong. Kafka handles the backpressure of the application, enabling it to handle real-time requests and queuing backend processing. If Kafka is unreachable for some reason, such as due to a failure or network issues, the messages your application was supposed to deliver will be lost.

To decouple this dependency, we started thinking about creating a buffer layer between our application and Kafka. Here's what we did:

- The application tries to send message to Kafka.
- If Kafka is unreachable, we append the message to a memory buffer/disk buffer.
- When Kafka is reachable again, we flush the messages in the buffer.
- This solution was good, but not perfect. You still need to manage the retries and buffering in your application, and if your applications goes down before you saved the buffer to disk, messages are lost.

Finally, any I/O managed by your application run-time has its own set of problems. In a large scale app, you need to worry about your database, cache server, configurations load, file system ops, and other factors. Having fewer I/O pipes reduces application complexity.

Then we ran into [Bruce](https://github.com/ifwe/bruce).

## What's so big about Bruce?

Bruce is a light, open-source Unix service that runs on the same machine as your application, and decouples messages producing responsibilities from the client. Bruce takes care of all the things you don’t want to handle in your applications.

Key features include:

- **A smart Kafka producer** - Supports all the functionality needed to produce messages to Kafka with extension: share load among Kafka brokers, send messages by partition/in high-level, acknowledgment, and retries.
- **Messages buffering** - Bruce buffers messages in memory in order to handle cases where Kafka is too loaded to receive more messages, or where something went down on the network line to Kafka.
- **Failover** - Connectivity to Kafka is recovered under any type of outage, including when a Kafka node dies, or the network connection to the cluster is lost. Bruce handles reconnecting and bufferring messages while offline. When you're back online, bruce resends all buffered messages.
- **Statistics collection** - Bruce exposes every useful metric in a JSON-based web UI, so you can track the number of messages sent, discarded, and in buffer, as well as message size, and more.

Sound good? That doesn’t mean it was easy. We encountered these issues:

- **Bruce has strict environment demands.** Our product is built in a container-based environment, so we had to wrap it in a Docker file and then contribute it back.
- **Bruce communicates using Unix domain sockets**, but our front-end app is built with Node.JS, which didn’t have native support for domain sockets, so we had to build a Node.JS client.
- **Different containers don’t share resources**, and our application and Bruce each run in their own container, and had to communicate using a Unix domain socket. To overcome this, we created a shared volume to be used as the socket file, which did the work.

The changes we need to make in the setup in order for Bruce to work included:

- Creating a Bruce instance on the same machine as our application instances.
- Configuring Bruce to connect to our Kafka cluster.
- Connecting to Bruce from the application using our [framework’s client](https://github.com/ifwe/bruce/tree/master/example_clients) on top of the unix socket that Bruce exposes.
- Sending messages using Bruce.

## Getting things working

Below we demonstrate a basic usage, in a syntax based on Node.js, of how we communicate with Bruce.

- Create your own [bruce_conf.xml](https://github.com/ifwe/bruce/blob/master/doc/detailed_config.md). The basic configuration is to add Kafka connection details, plus the topics you work with.
- Build and run Bruce from this [Dockerfile](https://github.com/PerimeterX/perimeterx-public-devtools/blob/master/Bruce/Dockerfile).

```bash
$ cd /path/to/Dockerfile
$ docker build -t Bruce .
$ docker run -d --name Bruce -v /path/to/bruce_conf.xml:/etc/bruce/bruce_conf.xml:ro -v /path/to/bruce.socket:/root Bruce
```

- Connect to the Bruce-exposed socket (by default: /root/bruce.socket) using the Node.js client and send a message:

```javascript
const bruceClient = require("./bruce_client").Bruce;
const unix = require("unix-dgram");
const BRUCE_SOCKET = "/root/bruce.socket";
const client = unix.createSocket("unix_dgram");

client.on("connect", () => {
  const msg = "hello from Bruce!";
  const topic = "bruce_topic";
  const bruceMsg = bruceClient.createAnyPartitionMsg(
    topic,
    Date.now(),
    topic,
    msg
  );
  client.send(msg);
});

client.connect(BRUCE_SOCKET);
```

- Monitoring: Bruce exposes a [JSON-based web UI](https://github.com/ifwe/bruce/blob/master/doc/status_monitoring.md) for monitoring metrics at http&#58;//bruce-host:9090

Source files for the Dockerfile, Node.js client and Bruce client are located in our [Github Repo](https://github.com/PerimeterX/perimeterx-public-devtools/tree/master/Bruce).

## More reliable messaging with Bruce and Kafka

With the increase in Kafka usage among modern backend services, server applications must deal with messages transportation (redundancy, retries, backups and protocol implementation). Using Bruce, it is possible to separate the transportation responsibility from the server application and encapsulate it in a dedicated service. That adds up to more reliable messaging.
