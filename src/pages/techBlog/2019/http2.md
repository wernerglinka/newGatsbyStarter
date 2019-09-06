---
template: "blog/blog-post"
draft: false

# Metadata
title: "HTTP/2 - The Reasons, The Features And The Node.js Support"
description: "HTTP/2 - The Reasons, The Features And The Node.js Support"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: HTTP/2 - The Reasons...

# Fields
date: 2019-02-20
author:
  - Liron Shmuel

blog_title: "HTTP/2 - The Reasons, The Features And The Node.js Support"
categories: Engineering
tags:
  - HTTP/2
  - HTTP2
  - HTTP
  - HTTPS
  - Node.js
  - Node
  - Javascript

thumbnail: marc-olivier-jodoin-291607-unsplash.jpg
---

HTTP/2, the latest version and the successor of the HyperText Transfer Protocol (HTTP/1.x) was published in 2015, and lately started to be adopted by almost every organization as the mainstream future scaffoldings of the World Wide Web.

Original HTTP protocol was proposed by Tim Berners-Lee, and first released in 1991, to communicate between web servers and clients. Although the HTTP/1.x protocol has served the web for over 15 years, the technology is beginning to become old. HTTP/2 is the biggest, most innovative change to the protocol family since 1999, and was influenced by Google’s SPDY protocol mechanisms. HTTP/2 changes are designed to maintain backward-compatibility with HTTP/1.x, so everything you have should continue working after you moved to HTTP/2 (😄).

### So what’s wrong with HTTP/1.x? Why do we want that new protocol?

Well, HTTP/2 has some great benefits over HTTP/1.x:

- ⚡ **High performance** - Nowadays, a web page is way more resource-intensive than ever, and updates dynamically on both mobile and desktop sites. Loading tons of assets efficiently became problematic, because HTTP/1.x practically only allows one concurrent request per TCP connection. HTTP/2 has more capabilities in terms of bi-directional connection and data compression which brings its performance to the maximum.

- 🙂 **Simplicity** - HTTP/1.x uses textual-format commands to complete the communication cycles. HTTP/2 implements these cycles in a different way (using binary commands, to be explained later). This change simplifies implementation of commands that were confusingly mixed together due to commands containing text and optional spaces. It is easier for the network to generate and parse data chunks in binary.
- 💪 **Robustness** - HTTP/2 is less error-prone, has significant effective network resource utilization which improved its throughput, and has reduced network latency.
- 🥇 **SEO** - Google is offering a ranking boost for fast-loading websites. With HTTP/2, your website should load faster and perform better, meaning that your website should enjoy these boosted rankings on search engine results pages.
- 🔓 **Security** - HTTP/2 is eliminating security threats and risks that HTTP/1.x has. Its binary format and compression approach allows protecting sensitive data, faster encryption, and lighter network footprint.

### What about browser support? Will I lose some clients?

You don’t need to worry at all! Most major browsers already added HTTP/2 support by the end of 2015. HTTP/2 is supported on:

- Chrome 40+ (released on 2015)
- Firefox 36+ (released on 2014)
- Internet Explorer 11+ and all Edge versions (requires Windows 8+, released on 2014)
- Safari 9+ (released on 2015)
- Opera 21+ (released on 2014)

#### Let's take a look at HTTP/2 main features:

### 1. Multiplexed Streams

HTTP/1.x has a problem where only one request can be outstanding on a connection at a time. HTTP/1.1 tried to overcome this with resource pipelining, but it didn’t completely address the issue because a large or slow response can still block others behind it. Moreover, that “solution” has been found to be very difficult to implement because some web servers don’t do it simply.  
Nowadays, it’s super common for a dynamic web page to request multiple resources over multiple connections, so it can impact the site’s performance.
HTTP/2 allows multiple request and response messages to be in flight at the same time, over the same TCP connection. In that way the requests and responses do not block each other, and you don’t have to think about solutions I call “optimization hacks”, such as image sprites or inlining using data URIs, domain sharding and splitting resources on different hosts, CSS and Javascript concatenation etc. These “streams” are a sequence of independent data frames, and they are reassembled at the other side.  
This feature also reduces your site’s latency, so it boosts up your rank on popular search engines because you site performs better.

### 2. Connection Coalescing 

In HTTP/2 requests for assets across different hostnames can be made over a single connection. This feature is really important, because among with the multiplexed streams it promises fewer TCP connections and TLS handshakes on HTTPS (if the TLS certificate is valid for both hosts and each hostname resolves to the same IP address).

![](/assets/images/blog/http2-multiplexing.png)
<br><br>

### 3. Server Push

In HTTP/2 assets can be pushed from the server to the client without the client needing to request the asset first. These resources are cacheable, so a client can reuse these resources across different pages, and multiple resources can be multiplexed over on connection. This feature saves RTT (round-trip time) and also reduces the network latency.  
It’s important to mention that the client must explicitly confirm to receive “push resources”. Moreover, client can limit the number of concurrent stream and can also block pushed streams, so it’s completely safe.

![](/assets/images/blog/http2-serverpush.png)
<br><br>

### 4. Binary protocol

HTTP/1.x uses text commands to process data to another entity within its data transfer. HTTP/2 uses a different format - binary commands. Yes, it might be more difficult to read binary instead of text, but this format simplifies the chunks parsing and generation process of a payload for the network. Also, it is less error-prone (because of the easy parsing), reduces the latency, is more secure (and leave a better network footprint and be resistant to some attacks, like the response splitting attack), and enables more HTTP/2 features (like multiplexing, compression and steam prioritization that I’ll explain later).  
The browsers that support HTTP/2 will convert the text to binary before sending it to the endpoint.

![](/assets/images/blog/http2-binaryprotocol.png)
<br><br>

### 5. Header Compression (HPACK)

HTTP protocol is stateless, so its clients must include some metadata within each request to let the other client know how it needs to handle that request (using headers). In HTTP/1.x, we are frequently sending identical headers again and again for the same client. HTTP/2 solved that by compressing some of the headers and removing unnecessary headers. Both clients that support HTTP/2 will have a list of headers that were previously used within their communication cycle. The headers are reconstructed at the getter endpoint by looking for the information that found on old requests headers. This will also reduce the throughput and request size, making things go faster, and might offer some security benefits (by infecting some headers).

![](/assets/images/blog/http2-hpack.png)
<br><br>

### 6. Stream prioritization

HTTP/2 allows the client to prioritize its data stream and optimize the resource allocation process by sending “hints” indicating the handling importance of a given stream. The server can decide to not follow the prioritization.
This feature promises an optimal delivery of high-priority responses to the client (like faster loading for important assets on site), and might improve your site SEO.

#### On Node.js

**TL;DR**: All of the code with all necessary instructions is available [here](https://github.com/PerimeterX/node-http2-server-push). Feel free to open issues/PRs if something is not clear/not working.
You can also jump directly to the code examples on this page: [Native Node.js](#native-node-js), [Koa](#koa), [Express](#express), [Hapi](#hapi)

From Node 8.4 we can use the native support of HTTP/2 library by `require('http2')`, so Node.js supports all of the features I explained above.

To have a benchmark for HTTP/2 vs HTTP/1.x, I tried serving 100 tiny images from a Node.js servers (HTTP/1.x server and HTTP/2 server, using the same API framework) that together assemble a full logo. Then I made this video demonstration:
![](/assets/images/blog/http1vshttp2.gif)
<br><br>
The video clearly shows that it takes almost 85% longer to load a lot of assets from an HTTP/1.x Node.js server compared to HTTP/2 Node.js server.
Let’s look into the code:

### Native Node.js

HTTP/1.x:

```javascript
require("https")
  .createServer(
    {
      key: Fs.readFileSync(keyPath),
      cert: Fs.readFileSync(certPath),
    },
    (req, res) => {
      const filePath = Path.join(imagesDir, req.url);
      res.writeHead(200, { "Content-Type": Mime.getType(filePath) });
      res.end(Fs.readFileSync(filePath), "utf-8");
    }
  )
  .listen(PORT, "localhost", () => {
    console.log(`Native HTTP/1.x running at https://localhost:${PORT}`);
  });
```

In HTTP/2 things go a little bit different. In this example, we will use the **server push** technique to server all the files over 1 TCP connection on the same **multiplexed stream**. We will define a helper method to get some metadata (file descriptors) for these files that we will use over almost all our HTTP/2 examples, which called `getFiles`:

```javascript
const getFiles = () => {
  const files = new Map();

  Fs.readdirSync(imagesDir).forEach(fileName => {
    const filePath = Path.join(imagesDir, fileName);
    const fileDescriptor = Fs.openSync(filePath, "r");
    const stat = Fs.fstatSync(fileDescriptor);
    const contentType = Mime.getType(filePath);
    files.set(`/${fileName}`, {
      filePath,
      fileDescriptor,
      headers: {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": contentType,
      },
    });
  });
  return files;
};
```

Now we are ready to have a look at our HTTP/2 native server:

```javascript
const Http2 = require('http2');
const files = getFiles();

Http2.createSecureServer({
   key: Fs.readFileSync(keyPath),
   cert: Fs.readFileSync(certPath)
}, (req, res) => {
   // res.stream is the Duplex stream.
   for(let i = 1; i <= 100; i++) {
       // Server push feature
       const path = `/pxlogo${i}.png`;
       const file = files.get(path)
       res.stream.pushStream({ [Http2.constants.HTTP2_HEADER_PATH]: path }, (err, pushStream) => {
           pushStream.respondWithFD(file.fileDescriptor, file.headers)
       })
   }
   res.stream.respondWithFD(...)
   // or stream.respond({ ':status': 200 });
}).listen(PORT, 'localhost', () => {
   console.log(`Native HTTP/2 running at https://localhost:${PORT}`)
});
```

### Koa

We handle Koa server almost the same as the native servers.
On HTTP/1.X:

```javascript
const Http2 = require("http2");
const Koa = require("koa");
const Static = require("koa-static");

const http1app = new Koa();
http1app.use(Static("assets"));
require("https")
  .createServer(
    {
      key: Fs.readFileSync(keyPath),
      cert: Fs.readFileSync(certPath),
    },
    http1app.callback()
  )
  .listen(PORT, "localhost", () => {
    console.log(`Koa HTTP/1.x running at https://localhost:${PORT}`);
  });
```

In HTTP/2 things also looks almost the same with only one change - `res.stream` becomes `ctx.res.stream`:

```javascript
const Http2 = require('http2');
const Koa = require('koa');
const files = getFiles();

const http2app = new Koa();
http2app.use(async (ctx, next) => {
   for(let i = 1; i <= 100; i++) {
       // Server push feature
       const path = `/pxlogo${i}.png`;
       const file = files.get(path)
       ctx.res.stream.pushStream({ [Http2.constants.HTTP2_HEADER_PATH]: path }, (err, pushStream) => {
           pushStream.respondWithFD(file.fileDescriptor, file.headers)
       })
   }
   ctx.res.stream.respondWithFD(...)
});

Http2.createSecureServer({
   key: Fs.readFileSync(keyPath),
   cert: Fs.readFileSync(certPath)
}, http2app.callback()).listen(PORT, 'localhost', () => {
   console.log(`Koa HTTP/2 running at https://localhost:${PORT}`)
});
```

### Express

We need to have couple of changes if we want to apply HTTP/2 on our Express server. We can’t use the native HTTP/2 library directly, so we will use the `spdy` library. So, on HTTP/1.x things look like:

```javascript
const Express = require("express");
const Https = require("https");

const http1app = Express();
http1app.use(Express.static("assets"));

Https.createServer(
  {
    key: Fs.readFileSync(keyPath),
    cert: Fs.readFileSync(certPath),
  },
  http1app
).listen(PORT, "localhost", () => {
  console.log(`HTTP/1.x Express running at https://localhost:${PORT}`);
});
```

And on HTTP/2, like this:

```javascript
const Express = require('express');
const Spdy = require('spdy');

const http2app = Express();
http2app.use((req, res) => {
   for(let i = 1; i <= 100; i++) {
       const assetPath = `/pxlogo${i}.png`;
       const filePath = Path.join(imagesDir, path);
       const stream = res.push(assetPath, {
           request: { accept: '*/*' },
           response: { 'content-type': Mime.getType(filePath) }
       });
       stream.end(Fs.readFileSync(filePath))
   }
   res.writeHead(200);
   res.end(..., 'utf-8');
});
Spdy.createServer({
   key: Fs.readFileSync(keyPath),
   cert: Fs.readFileSync(certPath)
}, http2app).listen(PORT, 'localhost', () => {
   console.log(`HTTP/2 Express running at https://localhost:${PORT}`)
});
```

### Hapi

HTTP/1.x:

```javascript
const Https = require('https');
const Hapi = require('hapi');
const Inert = require('inert');

const getHttp1Server = async () => {
   const server = Hapi.server({
       tls: true, port: ...,
       listener: Https.createServer({
           key: Fs.readFileSync(keyPath),
           cert: Fs.readFileSync(certPath)
        })
   });
   await server.register(Inert);
   server.route([{
       method: 'get',
       path: '/{param*}',
       handler: { directory: { path: 'assets' } }
   }]);
   return server;
}
(async () => {
   const http1Server = await getHttp1Server();
   await http1Server.start();
   console.log(`Hapi HTTP/1.x running at https://localhost:${PORT}`);
})();
```

For HTTP/2 we have a plugin called [underdog](https://github.com/hapipal/underdog) that handles the server push for us, so everything looks almost as same as HTTP/1.x:

```javascript
const Http2 = require('http2');
const Hapi = require('hapi');
const Inert = require('inert');
const Underdog = require('underdog');

const getHttp2Server = async () => {
   const server = Hapi.server({
       tls: true, port: ...,
       listener: Http2.createSecureServer({
           key: Fs.readFileSync(keyPath),
           cert: Fs.readFileSync(certPath)
        })
   });
   await server.register(Inert);
   await server.register(Underdog);
   server.route([
       {
           method: 'get', path: '/',
           handler: (request, h) => {
               for(let i=1; i<=100; i++) {
                   h.push(response, `/pxlogo${i}.png`);
               }
               return response;
           }
       },
       {
           method: 'get', path: '/{param*}',
           handler: { directory: { path: 'assets' } },
           config: { isInternal: true }
       }
   ]);
   return server;
}

(async () => {
   const http2Server = await getHttp2Server();
   await http2Server.start();
   console.log(`Hapi HTTP/2 running at https://localhost:${PORT}`);
})();
```

#### Conclusion

As explained, HTTP/2 provides a lot of awesome features that you really want and need. It is the future of the web, and as support for it grows - so will its adoptions across all over the web.
