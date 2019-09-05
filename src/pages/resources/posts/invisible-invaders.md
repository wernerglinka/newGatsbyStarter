---
template: "blog/blog-post"
draft: false

# Metadata
title: "Bot Attacks: Why Bot Detection Is Becoming More Difficult"
description: "Traditional methods can't block invisible users and bot attacks, but a behavioral approach can tell the difference between bots and humans."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: Bot Attacks Why Bot Detection...

# Fields
date: 2017-06-19
author:
  - Ido Safruti

blog_title: "Bot Attacks Have Become Stealthier and More Dangerous"
categories: Thought Leadership
tags:
  - account-takeover

thumbnail: invisible-invaders.png

canonical_overwrite: https://www.darkreading.com/threat-intelligence/invisible-invaders-why-detecting-bot-attacks-is-becoming-more-difficult/a/d-id/1329090
---

_Based on our Article in [DARKReading](https://www.darkreading.com/threat-intelligence/invisible-invaders-why-detecting-bot-attacks-is-becoming-more-difficult/a/d-id/1329090)_

_Blog updated on November 13th, 2017_

_**Gen3 and Gen4 bots can evade traditional defenses, but a behavioral approach can discern between bots and humans.**_

In a recent automated attack, tens of thousands of Canon printers and IoT devices were used by bots to launch over 5 million attempts to brute-force into accounts. Each bot sent requests roughly 10 minutes apart, to avoid triggering volumetric alerts.

This bot army employed a highly accurate username and password list, as PerimeterX researchers discovered. What might trigger the greatest alarm: the success rate of 8%. Break-in was achieved on 8% of attempts. Doing the math, the attack breached an amazing 400,000 accounts each day.

How can a massive attack like this achieve such a high success rate? Criminal bot developers are relentless at improving their weaponry, while their potential victims are always on the defense, playing catchup – not able to get ahead by anticipating the enemy’s next move.

What many call Gen3 - headless, scripted browsers – and Gen4 bots (malware-infected browser extensions), and their mobile app variants, slip past website defenses every day. The standard defense techniques, like logfile analysis, fail to detect these newer bots in real time, making their attacks largely invisible.

## Gen3 and Gen4 Bots Are Versatile

Gen3 and Gen4 bots are today’s sophisticated automated attackers — but they are the evolutionary descendants of the bots that originated over the past 20 years. Gen4 bots originate as malware, often infiltrating through a browser extension. Then, they latch on to an [innocent] human user in parasitic fashion. Under the guise of their host, they go undetected as they perform account takeover, malware distribution, and fraud.

Past generation of bots could be defeated by blacklisting their IP address or detecting the absence of cookies or their inability to perform simple tasks, like running a JavaScript code. The jump to Gen3 “headless browsers,” was significant. These are browser cores which can run on a scripting engine that behaves like a real browser, able to run JavaScript and fully render pages. Challenge tests can expose headless browsers . An example of a challenge test: asking the browser to render a sound or an image to prove the actual browser identity.

Because these next-gen bots are more sophisticated and look as if they’re operating in a real user environment, traditional detection methods can’t identify them, let alone block them.

## How They Attack

Impersonating normal users, Gen3 and Gen4 bots perform a wide variety of assaults against websites, yet remain invisible to a Web application firewall or signature detection.

Attackers have shown ingenuity in finding ways to monetize – to fraudulently extract money from -- websites. These techniques include account takeover, in which the stolen accounts are then sold on the Dark Web and used for fraud, fake account creation, testing stolen credit cards, and brute-forcing gift cards by guessing their number to cash out their balances. There’s also click-fraud, in which bots are instructed to invisibly browse different sites and click on ads to extract money from advertisers.

### Scalper Bots: Checkout Abuse

Scalper bots dominate the purchasing of limited-supply products such as concert tickets and exclusive factory runs of hot sports items. This business approach relies on checkout abuse. Nearly everyone has encountered this when purchasing concert tickets. Within a minute, the event is sold out, and it’s guaranteed that none of the tickets were bought by humans.

## Steps for Detection and Protection

Since the dawn of Internet bot attacks in the mid-1990s, they have almost always attacked by using a website in ways that a human also could. Newer, more versatile bots are much harder to detect, as they are malware running on real users’ browsers or devices, hiding behind the activity of human users by shadowing their legitimate sessions and injecting hidden activities of their own. How can you detect such bots which are only briefly active in legitimate sessions?

### If the Perpetrator Has no Mugshot, Nobody Recognizes Him

Signature-based systems, once the best available method for detecting bots, look for specific patterns in a request, such as a sequence of words in the request packet. If the perpetrator – the bot – has a mugshot on file, then signature-matching works.

Some systems can also pattern match on malformed requests designed to find problems in how a site is set up or coded. However, this means the potential target is playing catch-up, which often fails because attacks constantly change their "look." It’s analogous to a wanted criminal who undergoes frequent plastic surgery and doesn’t look like his last known mugshot.

Older defenses fail to detect Gen3 and Gen4 bots which are sophisticated enough to convincingly duplicate a real user's behavior and environment, and they make requests that are indistinguishable from those made by humans.

With signature-based detection systems not offering a viable solution, companies can consider a behavioral approach which distinguishes bots from humans. Web behavior analytics works by identifying behavior that is not human as opposed to recognizing a specific, particular known bot behavior. One basic and obvious example: humans always move a mouse in a somewhat random fashion while interacting with a website page. Humans move the mouse toward a button before clicking it. If the mouse clicks the same pixel in multiple checkboxes instantly and without any prior mouse “wiggle”, there is almost certainly no human operating the mouse. Web behavior analytics (WBA) does not need to recognize the signature of this bot attack, nor know exactly which pixel the bot will click. Instead, WBA focuses on recognizing that even though a real user is logged on, that mouse click was conducted in a non-human manner.

This analysis can be applied at the user, browser, and network levels, and is the first practical option for staying ahead of Gen3 and Gen4 bots and their increasingly sophisticated descendants, in the years ahead. For the first time since the arms race with hackers began, organizations have a way to be proactive against constantly evolving automated attacks. Behavior analytics give them confidence that accounts, gift cards, credit cards, reward points, user identities, and product and price information are not being constantly harvested from their websites.
