---
template: "blog/blog-post"
draft: false

# Metadata
title: "How We Define 'Good Bots' At PerimeterX"
description: "Are you the developer of a good bot? Check out our 'Code of Good Bots' and get your application inline with these 4 principles."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: How We Define 'Good Bots' At PerimeterX

# Fields
date: 2017-09-27
author:
  - Ido Safruti

blog_title: "4 Principles Of Good Bots For Web Developers"
categories: Thought Leadership
tags:
  - good bots

thumbnail: good-bots.png

canonical_overwrite: https://www.darkreading.com/cloud/how-to-live-by-the-code-of-good-bots/a/d-id/1329979
---

_As originally published in [DARKReading](https://www.darkreading.com/cloud/how-to-live-by-the-code-of-good-bots/a/d-id/1329979)_

Although my company fights problems caused by malicious bots on the Internet, many bots are doing good things. These beneficial bots may help a site get better exposure, provide better product recommendations, or monitor critical online services. The most famous good bot is the Googlebot, which crawls links to build the search engine many of us use.

To keep their access to the Web open, the makers of good bots must understand how to tell the world about their bots' intentions. At PerimeterX, we defined a "Code of Good Bots" that provides basic rules of good behavior. If legitimate bot makers follow this code, then websites and security services (like PerimeterX) can easily identify such bots.

If you're a bot developer, we recommend following the Code of Good Bots:

## 1. Declare who you are.

The Internet is awash in spoofed and poorly identified traffic. This includes bad bots that seek to harm sites. To avoid suspicion, a bot developer should make its bot declare its identity in the user-agent HTTP header when communicating with a site. We also recommended that bot developers provide a link in the user-agent header to a page describing the bot, what it's doing, why a site owner should grant it access, and methods a site owner can use to control the bot.

Googlebot, for example, will always include the word "googlebot" in the user-agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)

## 2. Provide a method to accurately identify your bot.

Good bot builders should provide a defensible method to verify a bot is what it declares itself to be. While declaring a specific user-agent is important, malicious bots can pretend to be legitimate by copying the user-agent header of a beneficial bot (also known as user-agent spoofing). For this reason, validating the good bot's source IP address is crucial.

The bot maker should provide a list of IP ranges as an XML or JSON file on its website. This list also can be provided as a DNS TXT record in the bot owner's domain. We recommend an expiration time for the list, to indicate the frequency at which this list should be retrieved.

Another method used by many crawlers was introduced by Google and calls for a sequence of reverse DNS and DNS lookups to validate the source IP address. You can read more about this method here. Although Google's verification method is common and offers the required safety, it is very inefficient for the validating site. Providing a list of IP ranges enables a much more efficient validation process.

We recommend that bot makers specify the verification method in the URL provided in the user-agent string.

The validation method should be strong enough that bad bots can't pass this test. Specifically, the method should restrict the IP address ranges to those controlled or owned by the bot operator. For example, suggesting that a site owner verify that the IP address is in the Amazon Web Services (AWS) IP ranges isn't a good idea. Anyone can purchase an AWS virtual server and use it to send requests across the Web.

... [Read full article](https://www.darkreading.com/cloud/how-to-live-by-the-code-of-good-bots/a/d-id/1329979)
