---
template: "blog/blog-post"
draft: false

# Metadata
title: "List EVERY event that exists in the browser"
description: "List EVERY event that exists in the browser"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: List EVERY event ...in the browser

# Fields
date: 2019-08-13
author:
  - Gal Weizman

blog_title: "List EVERY event that exists in the browser"
categories: Engineering
tags:
  - JavaScript
  - events
  - event handlers
  - event listeners
  - research
  - browsers

thumbnail: every-event-ui.png
---

### Events in JavaScript

> **tl;dr — Get a full map of every event in the browser using this [npm package](https://www.npmjs.com/package/px-map-events).
> See the result of running this package on a large set of browsers and operating systems for yourself in a [graphical representation](https://perimeterx.github.io/map-events-website/).**

Events are great.

We, as JavaScript developers, use them constantly when creating and improving websites and web applications. They are an essential part of JavaScript and are necessary to a developer wanting to create any type of smooth and successful UX.
And yet, there is so much we don’t know when it comes to events in JavaScript.

Mostly, it’s the variety — there are so many different events that exist and can be listened to by JavaScript, and we as developers are barely aware of them.

This knowledge made me think “Why isn’t there a map for that?”
You know, like a map of every event of every object in JavaScript that can be listened to. Such a map will definitely help me understand the world of JavaScript events a bit better, and probably become aware of the many events that I am not even familiar with!

And so, this thought led me to the question of “How can I get this information?”
First I tried to look for it online. I was not able to find such a map - a full one that lists all objects and all of the events that can be listened to under these objects (please share if you know of such a map!).

So what do you do when you find out there is some knowledge that the internet lacks? You help ‘em out!

I realized that creating such map shouldn’t be too complicated once you understand how subscribing to events works in JavaScript. The two main methods of subscribing to events in JavaScript are through event listeners and events handlers. Let's have a quick overview of these two methods:

### Event Listeners Vs. Event Handlers

1. `event listeners`: event listeners can be attached to objects and listen to their events. It's as simple as that. There is an unlimited amount of listeners that can be attached to an event:

```javascript
window.addEventListener("click", event => {
  console.log(`first listener: `, event);
});
window.addEventListener("click", event => {
  console.log(`second listener: `, event);
});
window.addEventListener("click", event => {
  console.log(`third listener: `, event);
});
```

Using event listeners is powerful not only because more than one can be registered, but also because extra configuration to the action of the event subscription can be provided.
Unfortunately, this is not what this post is about and I won't be covering that part of event listeners, but this is definitely something every JavaScript developer should know perfectly (I recommend you read more about it [here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Syntax) ).

2. `event handlers`: These can be used to register to the same events as event listeners, but in a different and less powerful way. Event handlers are actual properties of the object's prototype. There can only be one event handler to an object and its event at a time, and configuring an event handler, unlike with event listeners, is not an option. Its default setup will always be similar to the effect of calling `addEventListener` with `false` as the third argument:

```javascript
// false is the default value of the third argument of addEventListener function
document.addEventListener(
  "SOME_EVENT",
  event => {
    console.log("SOME_LISTENER");
  },
  false
);
```

When it comes to objects that are not DOM Nodes, there is one way to set an event handler:

```javascript
window.onclick = event => {
  console.log(
    "This handler will NEVER be called, since it is about to be overwritten"
  );
};
window.onclick = event => {
  console.log(
    "This handler is the ONLY handler that will be executed when clicking the window",
    event
  );
};
```

However, when it does come to objects that are DOM Nodes, setting an event handler can also be achieved by using the higher level API of [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute):

```javascript
// doing:
document.body.setAttribute("onclick", 'console.log("body was clicked", event)');
// is the same as doing:
document.body.onclick = event => {
  console.log("body was clicked", event);
};
```

Remember, the fact that there are two ways to register an event handler to an object does not mean there can be more than one handler! The attributes API simply lies on top of the lower level events handler API:

```javascript
document.body.setAttribute(
  "onclick",
  'console.log("body was clicked: ", event)'
);
console.log(document.body.onclick); // will output:
/*
ƒ onclick(event) {
console.log("body was clicked", event)
}
*/
```

Eventually, both `event handlers` and `event listeners` register the provided callbacks to the same pool of listeners - there is no difference between them when the event is fired!

### How can this knowledge help with listing "EVERY event that exists in the browser"?

**Stage 1: Extract all of the supported events of an object's prototype**

At this point it's rather simple.
If the event handlers are properties of objects, then those objects must contain a reference to those handlers on their prototypes.
For example, since `document.body` supports `click` event, `HTMLBodyElement` must have `onclick` property (regardless of whether it is its [own property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) or not).
The best way to obtain all of these handlers would be to iterate the prototype and look for them. Methods like `Object.keys()` or `Object.getOwnPropertyNames()` won't do the trick if our goal is to get ALL of the object's properties and not only its own properties.
Now, what you need to look for in the iteration are the properties that start with `on`. These properties reference event handlers by definition. So it should look something like this:

```javascript
function _isEvent(prop) {
  if (0 !== prop.indexOf("on")) {
    return false;
  }

  return true;
}

function _getEvents(obj) {
  var result = [];

  for (var prop in obj) {
    if (_isEvent(prop)) {
      prop = prop.substr(2); // remove "on" at the beginning
      result.push(prop);
    }
  }

  return result;
}

// XMLHttpRequest's supported events (on Chrome 75):
console.log(_getEvents(XMLHttpRequest.prototype));
// ["readystatechange", "loadstart", "progress", "abort", "error", "load", "timeout", "loadend"]
```

Cool! We now have two simple functions to which we can provide an object’s prototype and get all of the events it supports.

**Stage 2: Extract all of the supported events of all of the objects’ prototypes in the browser**

Now all that’s left to do is to dynamically extract the supported events of all of the objects that exist in the browser (anything under `window`) using the helper functions we've just implemented above.
This means that first, we'll have to run `_getEvents` on `window` itself to get all of the events it supports.
Then, we'll have to iterate all of `window`'s own properties, and get all of the events supported by those properties (e.g. `XMLHttpRequest` is a property of `window`, therefore we'll have to get the events it supports as well).

```javascript
function getEvents() {
  const result = {};

  result["window"] = _getEvents(window, hasOwnProperty);

  const arr = Object.getOwnPropertyNames(window);

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    let resultArray = [];

    try {
      const obj = window[element];

      if (!obj || !obj["prototype"]) {
        continue;
      }

      proto = obj["prototype"];

      resultArray = _getEvents(proto);
    } catch (err) {
      // console.error(`failed to get events of %o`, element);
    }

    result[element] = resultArray;
  }

  return result;
}
```

That's it! Now calling `getEvents()` will get us all of the events in the browser! And since we're talking about A LOT of events, I won't be documenting all of them here, but you can see the result for yourself right here: [jsfiddle](https://jsfiddle.net/8z1pr6hv/)/[github gist](https://gist.github.com/galpx/9889e557ac127499cd8dc3942a58500b).

### Now what about EVERY event that exists in EVERY browser?

This is where it gets even more interesting. Now that we have the power to list all of the events in the browser, why not create a tool that extracts that information from every browser on every operating system out there, and create a full map out of the extracted data?

By using [browserstack](https://browserstack.com/)'s great product, I was able to run the `getEvents()` function on a very large cross-section of browsers and operating systems, extract that data and present it graphically.
That representation can be found right [here](https://perimeterx.github.io/map-events-website/) and the entire list of events can be found right [here](https://raw.githubusercontent.com/perimeterx/map-events-website/master/data.json).
The last time I ran the extraction code was when Chrome 75 was the latest version, so this list might not be completely up to date. Furthermore, this list is in no way exhaustive (it lacks mobile devices for example) and I leave it up to you to send us additional devices and browsers you come across. You are more than welcome to help out with keeping this list up to date!

![events map ui](/assets/images/blog/every-event-blog-post/every-event-ui.png)

The project can be found on [github](https://github.com/perimeterx/map-events) and can be used as an [npm package](https://www.npmjs.com/package/px-map-events) as well.

Hope this article and the map help shed some light on the variety of events in JavaScript and helps us understand and explore them a little bit better.

> This research was conducted and published by [Gal Weizman](http://github.com/galpx/) on behalf of [PerimeterX Inc](https://perimeterx.com/).
