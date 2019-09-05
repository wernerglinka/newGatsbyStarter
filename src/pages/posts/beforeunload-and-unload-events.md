---
template: "blog/blog-post"
draft: false

# Metadata
title: "unload And beforeunload Events And How To Easily Debug Them Both!"
description: "unload And beforeunload Events And How To Easily Debug Them Both!"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: unload And beforeunload Events...

# Fields
date: 2019-02-06
author:
  - Gal Weizman

blog_title: "unload And beforeunload Events And How To Easily Debug Them Both!"
categories: Engineering
tags:
  - javascript
  - debugging
  - research

thumbnail: unload-events.jpg
---

**`unload`** And **`beforeunload`** Events And How To Easily Debug Them Both!

> **tl;dr — if you’re only here for the trick of how to set a breakpoint and
> actually debug **`unload`** and **`beforeunload`** event listeners, go straight
> to “The Trick To Successfully Debug **`unload`**/ **`beforeunload`** Event
> Listeners” section below.**

As I often do, I was looking for potential vulnerabilities in well known
websites and web applications. There is a specific one that I have reasons to believe
that might be vulnerable to a serious [`XSS`](<https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)>) exploitation.

At some point in the process, I realized that the part that might be vulnerable
to XSS is executed by an `unload` event listener that was registered by some
javascript code in the website. This was where I had to debug to be able to tell
whether I found something interesting here or not.

So I set a breakpoint where the code that is supposed to be fired by the `unload` event is,
and reloaded the page to allow my [`Google Chrome Browser`](https://www.google.com/chrome/)
stop at this breakpoint of mine letting me debug it.

For those of you who have enough javascript experience, the following will not
shock you at all: the browser ignored my breakpoint completely and reloaded the page normally.

That’s kind of annoying. I mean, any javascript code that is intended to execute
under this event executes perfectly fine — whether it’s [`console.log()`](https://developer.mozilla.org/en/docs/Web/API/Console/log),
[`localStorage.setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem) or any other standard action. So what’s wrong with my
breakpoint? or placing a [`debugger;`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/debugger) command? Why don’t these work?

```javascript
window.addEventListener("unload", e => {
  console.log("unloading!"); // would successfully log to console
  localStorage.setItem("key", "value"); // would successfully set new item to local storage
  debugger; // would fail to break at this point!
});
```

In order to understand this behavior, it makes sense for us to first understand
these events. The purpose of these events is to enable a website to execute
pre-configured actions right before it, unloads and when it unloads. <br> Or, to
be more specific, as mentioned in [MDN](https://developer.mozilla.org/en-US/):
_“The [`beforeunload`](https://developer.mozilla.org/en/docs/Web/Events/beforeunload) event is fired when the window, the document and its
resources are about to be unloaded”_ and _“The [`unload`](https://developer.mozilla.org/en-US/docs/Web/Events/unload) event is fired when
the document or a child resource is being unloaded”._ (which means it’s not about
the website as much as it is about any [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) that lives within the website,
whether it is the [`top frame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/top) or an [`iframe`](https://developer.mozilla.org/en/docs/Web/HTML/Element/iframe))

> So let’s try to list the different properties of these two events and compare
> them:

**Order:** `beforeunload` will always fire before `unload` event (makes sense,
right?)

```javascript
const ifr = document.createElement("iframe");
document.body.appendChild(ifr);

// top window's beforeunload event would be the first one to fire
window.onbeforeunload = function(e) {
  console.log("first event to fire (1)");
};

// other windows beforeunload events would fire after top window
ifr.contentWindow.onbeforeunload = function(e) {
  console.log("second event to fire (2)");
};

// top window's unload event would fire after all beforeunload events have been fired
window.onunload = function(e) {
  console.log("third event to fire (3)");
};

// other windows unload events would fire after top window
ifr.contentWindow.onunload = function(e) {
  console.log("fourth event to fire (4)");
};
```

**Purpose:** The `beforeunload` event triggers right before unloading of
the window has begun. `unload` would trigger while unloading of the window is
taking place.

**Cancelable:** The `beforeunload` event can be canceled by user interaction:

```javascript
// by https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload#Example
window.addEventListener("beforeunload", function(event) {
  event.preventDefault(); // Cancel the event as stated by the standard.
  event.returnValue = ""; // Chrome requires returnValue to be set.
});
```

The above example will trigger a popup asking the user whether they are sure
they want to leave the site or not, and in case they choose not to leave, the
`beforeunload` event will be canceled, the `unload` event will never even
initiate, and the page will not reload. On the other hand, that wouldn’t happen
for an `unload` event — once it is fired, there is no way to prevent the window
from unloading.

**Supporting objects:** Both `beforeunload` and `unload` events can be
registered to be listened to by `window`, [`HTMLElementBody`](https://developer.mozilla.org/en/docs/Web/HTML/Element/body) and
[`HTMLFrameSetElement`](https://developer.mozilla.org/en/docs/Web/HTML/Element/frameset)

```javascript
function successful_listener(e) {
  console.log("would successfully fire!");
}

function failing_listener(e) {
  console.log(
    "would never fire - this message would never be logged to console"
  );
}

// both ways to register both beforeunload And unload events would work with window
window.addEventListener("beforeunload", successful_listener);
window.addEventListener("unload", successful_listener);
window.onbeforeunload = successful_listener;
window.onunload = successful_listener;

// addEventListener won't work with document.body whereas direct registration would
document.body.addEventListener("beforeunload", failing_listener);
document.body.addEventListener("unload", failing_listener);
document.body.onbeforeunload = successful_listener;
document.body.onunload = successful_listener;

// addEventListener won't work with frameset whereas direct registration would
const frameset = document.createElement("frameset");

document.body.appendChild(frameset);
frameset.addEventListener("beforeunload", failing_listener);
frameset.addEventListener("unload", failing_listener);
frameset.onbeforeunload = successful_listener;
frameset.onunload = successful_listener;
```

It is worth mentioning that the `unload` properties of all three (the `window`, the
`body` and the `frameset`) point to the same place (same goes for
`beforeunload`):

```javascript
function listener() {}

const frameset = document.createElement("frameset");
const body = document.body;

window.onunload = listener;
window.onbeforeunload = listener;

body.onunload === listener; // true
body.onbeforeunload === listener; // true

frameset.onunload === listener; // true
frameset.onbeforeunload === listener; // true
```

Oh, and for those of you who wonder “what in the world is a `frameset`?” — don’t
worry about it. It's this super old and deprecated element that is no longer in
use at all. In fact, it is currently defined as obsolete, which means it could
be gone in any new version of any major browser any time!

**Prototype:** Whereas `unload` is a normal event that inherits from [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event),
`beforeunload` has its own prototype, [`BeforeUnloadEvent`](https://developer.mozilla.org/en-US/docs/Web/API/BeforeUnloadEvent). This is in order to
implement the `beforeunload` event’s unique property `returnValue`, which allows the
registered event listener to display the “Are you sure you want to leave this
site?” dialog box.

> So How Can One Debug A `beforeunload`/`unload` Event Listener?

And now for the cool part! As I was saying at the beginning, debugging these
events is pretty tricky because, when you think about it, you’re not supposed to
be able to. The purpose of the `unload` and `beforeunload` events is very clear:
Execute a set of preconfigured actions before and when a page unloads. All
synchronous actions are guaranteed to fully execute, but when it comes to
asynchronous actions that are initiated by synchronous actions inside the event
listener, the browser is more like “I’ll do my best to execute all your actions,
but when the unloading event finishes I cannot promise you anything”.

```javascript
window.addEventListener("unload", e => {
  function sleep(delay) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  // unloading won't finish until 10 full seconds pass!
  sleep(10000);
  setTimeout(() => {
    // this part would be ignored since unloading will already
    // finish by now, thus it won't wait for this async call
    sleep(10000);
  }, 0);
});
```

But does the browser agree to execute any type of action? The answer is no.
There are some types of actions that by spec are not allowed to be executed
within a `beforeunload`/`unload` events listeners. [`alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) is one example, but
the most relevant one is `debugger;` (neither is setting a breakpoint using the
devtools).

So setting a breakpoint in the listener, setting a `debugger;` statement or
anything else really — would all be ignored by the browser, thus making
debugging of the `unload`/`beforeunload` event kind of impossible.

> The Trick To Successfully Debug `unload`/`beforeunload` Event Listeners

So back to my story... After a few hours of trying to successfully debug the suspicious
`unload` event listener, I gave up for the night as it was very
late. As I clicked the small `x` button in order to close the tab, expecting
it to shutdown, I was amazed to finally see my breakpoint work!

Apparently there is one unloading flow in which the browser respects breakpoints
and `debugger;` statements — not a normal reload of the page, but an actual
attempt to shut its tab down completely!

I still went to sleep after that because it really was late — but ever since
that I can easily debug `unload`/`beforeunload` event listeners!

```javascript
// run this code in devtools console and than try to shutdown
// the tab - see how Chrome suddenly respects `debugger;` statement!
window.onunload = e => {
  debugger;
};
```

> Tips For Researchers

1.  Keep an extra tab open in your Chrome window — once you use the trick to debug
    listeners, although you’d be able to debug them, you will not be able to prevent
    the tab from shutting down. It is easier to repeatedly do so while working at the same
    window, which would only be possible if the closing tab is not the only tab in
    the window.
2.  Google Chrome Browser — I haven’t checked whether this trick works on other
    browsers than Chrome, mostly because I don’t see a reason to debug javascript
    code in any other browser (yeah, I said it).<br> It might work on other browsers
    though — again, never even checked.
3.  Understand your case first — if the code you attempt to debug is, for some reason,
    session-based, closing the session (by using the trick above and closing the tab) each
    time might create a different flow from what you actually try to research — take
    that into consideration when debugging!

> Tips For Developers

1.  No long actions inside these listeners — although practically you can
    synchronously do what ever you want inside the listeners, it is bad practice!
    Avoid long actions in order to make sure you don’t prevent the user from smooth
    unloading of your website.
2.  Use [`sendBeacon()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) in case you must send data before unloading — sometimes it
    makes sense for a website to want to send some POST data when the page is about
    to unload. In order to successfully do so, `sendBeacon()` was invented. (like,
    seriously, it was literally invented for this case) so make sure to
    use that if you want to know for sure your data is sent without
    expecting a response.

> To Sum Up

Hope this made sense and helped you understand these two unique events, their
purpose and their differences. Also, I hope you find that debugging trick useful
— I sure did!

If I have missed out on anything or am wrong with anything of what I’ve said in
this article, I would love to hear it so I can correct myself and keep this
post as accurate and as helpful as possible!

Oh, and sorry for no [`jsfiddle`](https://jsfiddle.net/) demos.. for some reason `beforeunload` and
`unload` events didn’t work very smoothly with it. <br> I recommend that you to just
copy-paste the snippets above in Chrome’s devtools console in any website and
see it for yourselves.

Edit: [The builtin way to debug any registered event listeners in chrome devtools](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints#event-listeners)
has come to my attention as another way to debug all `beforeunload` event listeners.
It is indeed a great builtin way to do so, but:

1. It can be used to debug `beforeunload` event only, whereas the trick I present here
   allows you to debug `unload` event as well.
2. It only allows you to debug all registered listeners, which is very annoying and unnecessary
   in complex websites where there are a lot of registered event listeners and you
   only wish to debug a specific one.
