---
template: "blog/blog-post"
draft: false

# Metadata
title: "What is a Sneaker Bot? Stop the Bot from 'Buying' Shoes Online!"
description: "Stop sneaker bots from buying and stealing your top online sneaker inventory! Learn how to prevent bot attacks here."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: What is a Sneaker Bot...

# Fields
date: 2016-05-04
author:
  - Adi Ludmer
  - Christopher Federico

blog_title: "Sneaker Bots – Stop them From Stealing Your New Shoes"
categories: Research
tags:
  - sneakers
  - sneakerbot
  - scalping

image:
  feature: sneakerbots-stealing.jpg
  thumb: blog/blog-thumbnails/sneakerbots-stealing.jpg
---

Want a new pair of Nike Air Jordans? How about those Yeezy 350s? Good luck with that. [Collectible sneakers make up a multimillion dollar market segment](http://www.highsnobiety.com/2016/04/21/most-expensive-sneakers-2016-q1/) of a billon dollar US market for sneakers, and third-party resellers will do anything to scoop up as many pairs as they can—leaving you to pay \$600 and up for a pair.

This begs the question—how _do_ unauthorized outlets get all these sneakers, and how can _you_ get a pair?

Enter the _Sneaker Bot_, a collection of software that automates all parts of the sneaker-buying process. From Twitter-feed scanning to cart adding and checkout, the “Sneaker Bot” claims to do it all.

The cost? A price tag that starts at $20 USD for a browser add-on and goes up all the way to $350 USD for a suite of tools that includes iPhone apps, CAPTCHA solvers, resale-value projections, and more.

Sneaker Bot suppliers include all that is needed to succeed. Some even offer 24/7 customer support. Resellers and consumers alike use Sneaker Bot to buy, or “cop,” pair after pair of sneakers because it’s 100x faster than a real person.

Sneaker bots have cornered the market and left manufacturers and consumers stumped at how to solve the problem. On May 29th, 2015, Nike cancelled the online launch of two new Air Jordan models, forcing the company to sell only through select retailers and Nike stores. Another retailer _END._ [was forced to create an entirely new system to pre-register for limited edition shoes](http://www.highsnobiety.com/2016/04/27/sneaker-bots-how-do-they-work/). This is not a new problem. Sneaker Bots have been around for a few years—but only now have they been thoroughly investigated.

In order to block and protect against such bots, we studied and analyzed a few of them to uncover their behavior.

## Sneaker Bots Illustrated

For our research, we acquired two different “bots.” One bot was solely dedicated to the Nike store, while the other targeted twenty-two different retailers. They were both delivered as Google Chrome extensions. We classify this type of extension as a “Browser Automation Bot.” A technical analysis of these bots is available at the end of this blog post.

These bots are so easy to purchase that anyone can do it. The website includes detailed instructions, links to YouTube videos, and even live chat.

![sample_banner](/assets/images/blog/sneakerbot-figure1_botsite_banner_example.png "a sneakerbot banner-ad")

Plus, the ease of use is promoted throughout the site with guarantees that you can resell your “copped” sneakers at a high price.

Installing the extension was very easy, too. A user must only enable Development mode in Google Chrome and select the extension. Once the extension is installed, all that’s needed is to type in the model name, choose the shoe size, and select the “ON” button.

<p align="center">
  <img src="/assets/images/blog/sneakerbot-figure2_config_example.png" alt="configuring a sneakerbot"/>
</p>

Within moments, a user has the desired item in the cart.

<p align="center">
  <img src="/assets/images/blog/sneakerbot-figure3_itemincart_example.png" alt="sneakers in the cart!"/>
</p>

## Implications

The ease of use and being readily available makes these sneaker bots a real threat for retailers. Using them enables unauthorized resellers to snag the entire stock of premium and limited-edition sneakers that consumers end up paying top dollar for on secondary markets.

And if you’re a consumer, you’re forced to pay the high price tag—unless you find an obscure size that no one purchased, get very lucky, or commit your life like this [guy](http://www.complex.com/sneakers/2014/05/how-to-cop-sneakers-online-without-a-bot/persistence) did.

Customers are asking manufacturers and distributors to fight back and do more to inhibit bots. Sneakers are just one example of highly sought-after items that will resell over their regular intended price. Event tickets, electronics, and clothing are all targets of bots and can eventually lead to fraud and counterfeit items being sold. Something should, and can, be done to stop it.

To fight these bots and prevent their purchases, you need to be able to analyze their behavior and detect and separate them from legitimate users. Detection and enforcement can involve rate limiting, looking for specific code or actions that they do (or don't), and more. But be prepared for an arms race as bots are evolved in order to circumvent protection. You can also try a solution that is purpose built to automatically detect and separate bots from legitimate users, like our own PerimeterX [Bot Defender](/products/bot-defender/bot-defender-web/) service.

## Appendix: Technical Analysis

### Bot #1: “Nike Add To Cart”

The bot is quite easy to analyze. It’s labeled as the **_Nike Add To Cart_** bot with the sole purpose of waiting for the sneaker to be available in the user’s size on [store.nike.com](http://store.nike.com/). Then the sneaker pair is placed in the shopping cart.

The core of this browser automation bot consists of two simple JavaScript functions— `fTick()` and `fRun()`:

![code_example](/assets/images/blog/sneakerbot-figure4_code_example.png)

The `fTick()` function is a timer that runs every 300ms, scanning the active page for the SKU element of the sneaker the buyer is looking to purchase. If the SKU element is found, then the `fRun()` function executes and attempts to add the item to the shopping cart.

This Chrome-extension bot is not very complex and does not make any effort to hide its source code in any way, either. It will easily break if Nike were to change the name of the page element that’s being searched for.

### Bot #2: 22-in-1 Bot

Our second example is a more complex, “many-in-one bot” that works with twenty-two different sneaker brands and online stores.

This is an unsigned Chrome extension (not validated and not distributed through the Google Chrome Extension Store), and users should be aware that the permissions it requests essentially grant access to all data in their browser, including full access to all tabs, http and https sessions, and all local Chrome storage:

![permissions](/assets/images/blog/sneakerbot-figure5_permissions_example.png)

### Content Scripts

In order to inject code into the desired websites, a dedicated mechanism of Chrome called “content scripts” is used. This allows the browser extension to read and manipulate the DOM of the specified list of URLs from the manifest file. In the screenshot below, you can see that autobuy.js and jQuery.js will run as content scripts.

![content_scripts](/assets/images/blog/sneakerbot-figure6_contentscipts_example.png)

From the target website’s point of view, content scripts are invisible because they’re loaded in a special area called an “isolated world." [Google’s official documentation](https://developer.chrome.com/extensions/content_scripts) explains:

> "Content scripts execute in a special environment called an isolated world. They have access to the DOM of the page they are injected into, but not to any JavaScript variables or functions created by the page."

It’s this functionality that allows the extension to run its own version of jQuery side by side with the one executed by the website it’s visiting—without causing any conflicts.

Running inside the isolated world makes detection of these scripts very hard, but not completely impossible. When the scripts generate an event or an action, it will be visible to the DOM. The website can listen to these changes, and this can be crucial in exposing their existence. _Content Scripts_ present an interesting challenge and opportunity. We’ll take a more in-depth look at them in a future blog post.

### The JavaScript Code

All of the relevant JavaScript code in the bot has been <a href="https://en.wikipedia.org/wiki/Obfuscation_(software)">obfuscated</a> in order to prevent the end-user from seeing what it does. We start with something that looks like this:

```javascript
var _0xecd1 = [
  "\x69\x57\x61\x6E\x67\x20\x53\x68\x6F\x65\x62\x6F\x74\x20\x6F\x6E",
  "\x6C\x6F\x67",
  "\x31\x31",
  "\x4C\x61\x72\x67\x65",
  "\x66\x61\x6C\x73\x65",
  "\x6A\x6F\x72\x64\x61\x6E\x20\x31\x31",
  "\x74\x65\x78\x74",
  "\x2E\x65\x78\x70\x2D\x63\x61\x72\x74\x2D\x71\x74\x79",
  "\x73\x68\x6F\x65\x2D\x73\x69\x7A\x65",
  "\x63\x6C\x6F\x74\x68\x2D\x73\x69\x7A\x65",
  "\x65\x6E\x61\x62\x6C\x65\x64",
  "\x6B\x65\x79\x77\x6F\x72\x64",
  "\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65",
  "",
  "\x67\x65\x74",
  "\x73\x79\x6E\x63",
  "\x73\x74\x6F\x72\x61\x67\x65",
  "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x73\x65\x63\x75\x72\x65\x2D\x73\x74\x6F\x72\x65\x2E\x6E\x69\x6B\x65\x2E\x63\x6F\x6D\x2F\x75\x73\x2F\x63\x68\x65\x63\x6B\x6F\x75\x74\x2F\x68\x74\x6D\x6C\x2F\x63\x68\x65\x63\x6B\x6F\x75\x74\x5F\x6C\x6F\x67\x69\x6E\x2E\x6A\x73\x70",
];
```

After deobfuscation, you end up with human-readable code that’s much easier to analyze:

```javascript
var _0xecd1 = [
  "XXXXX Shoebot on",
  "log",
  "11",
  "Large",
  "false",
  "jordan 11",
  "text",
  ".exp-cart-qty",
  "shoe-size",
  "cloth-size",
  "enabled",
  "keyword",
  "toLowerCase",
  "",
  "get",
  "sync",
  "storage",
  "https://secure-store.nike.com/us/checkout/html/checkout_login.jsp",
];
```

Like our previous example, this bot waits for the product to be available for purchase, and when it is, it automatically adds it to the user’s shopping cart. In order to do this, there’s code that checks, every 300 milliseconds, whether the “Add to Cart” button is available. When the button becomes available, another function sets the relevant shoe size and clicks on the “Add to Cart” button.

Unlike our previous example, though, the script also takes the user all the way to the check-out process and verifies whether the checkout has been completed. This additional detail makes the tool more appealing for users since it helps them complete the entire buying process, in their absence.
