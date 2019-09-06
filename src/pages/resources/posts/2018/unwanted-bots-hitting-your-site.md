---
template: "blog/blog-post"
draft: false

# Metadata
title: "5 Ways to Identify a Bot Attack"
description: "In 2016, the majority of visitors to websites were not humans but bots. That’s from data tracked by Kleiner Perkins partner Mary Meeker highlighted, a leading authority on all things web"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: 5 Ways to Identify a Bot Attack

# Fields
date: 2018-06-18
author:
  - Ido Safruti

blog_title: "5 Ways to Identify a Bot Attack"
categories: Thought Leadership
tags:
  - account-takeover
  - botnet
  - e-commerce security
  - vulnerability

related_posts:

thumbnail: unwanted-bots.jpg

canonical_overwrite: https://www.forbes.com/sites/forbestechcouncil/2018/02/28/five-easy-ways-to-identify-bot-attacks-on-your-site/#79c42da68fa3
---

As Originally published in [Forbes](https://www.forbes.com/sites/forbestechcouncil/2018/02/28/five-easy-ways-to-identify-bot-attacks-on-your-site/#20e309328fa3)
In 2016, the majority of visitors to websites were not humans but bots. That’s from data tracked by Kleiner Perkins partner Mary Meeker highlighted, a leading authority on all things web. Like it or not, this means that every website operator has to contend with bots. Some bots, such as search index bots from Google and Bing, are helpful in making sure visitors can find a site. Other bots, however, are not that helpful, and in fact quite harmful. Unlawful bots hammer sites to steal customer credit cards, suck dry gift card balances, and execute account takeover attacks.

Both good bots and malicious are bots made up of code. How can you tell them apart? And how can you clearly determine when malicious bots have come calling? Identifying a good bot is fairly straightforward. Bots with good intentions usually identify what they are to site operators, and explain what they want from your site. See my blog [Four Principles of Good Bots](/blog/live-by-code-of-good-bots/) here.

What’s much harder is understanding the differences between actual human users and dangerous bots who seek to surreptitiously imitate them.
Here’s the good news. By and large, bots behave quite differently than humans. And you don’t have to be an engineer or even a smart analytics practitioner to spot anomalous behavior indicative of bots and identify signals that those visiting your site may not be of flesh and blood.
We present to you a quintet of signs that malicious bots may be showing up on your digital doorstep.

## 1. A Rise in Shopping Cart Abandonments

Malicious bots are often used to harvest price information from the sites of competitors. To prevent this, site operators hide prices until a shopper places the item into a shopping cart. To mimic that behavior, advanced bots toss items of interest into online shopping carts to make the prices visible for scraping. Naturally, they never finish the transaction. The result? A spike increase in the number abandoned carts - which might indicate a bot attack.

## 2. Unusual Patterns Of Page Views

A human customer exhibits a relatively predictable pattern of page views. Most visit a home page, maybe click on a category or sale page, then perform a search, click on a product page and then make a purchase or leave the site. A normal human visitor would click on every product page on a site -- or even click on half of those pages. Malicious scrapers exhibit this behavior all the time. All they want is to harvest information from product pages. Those bots also regularly search a site many times in a row during a session. This means that visitor sessions which show odd patterns of page views - repeated searchers, numerous product page views - might indicate a scraper bot is at work. These behaviors also show up as unusually long sessions required to copy large amounts of site content, such as product descriptions and images.

## 3. A Spike In Unsuccessful Login Attempts

Bot operators often use them for account takeover attacks, in which a botnet will try to gain access to and take control of users’ accounts by inputting user-password combinations used on other sites (and sold on the dark web). For these sorts of attacks, botnets may try to log into millions of accounts in a day or to. These spurts of attempts generate massive spikes in unsuccessful login attempts, easily identifiable in your web analytics data or access log files. When the percentage of failed login attempts goes up sharply, this indicates a strong likelihood of an account takeover bot attack.

## 4. A Large Jump in Gift Card Number Validation Failures

Closely related is another regular trick fraudsters use for pilfering the value from legitimate gift cards. Compared to account takeover attacks, gift card accounts present an easy target. If someone checks the balance of a gift card, the issuing companies generally do not require a billing address, account name, other personal identification information. This makes it simple to check gift card account balances in order to identify the best targets through brute-force attacks that spin through combinations of pin codes and card numbers rapidly to look for valid pairs. Bots are used to undertake these attacks. Whenever an invalid pair is tried, a failed validation warning is generated. That means, if you see a rapid rise in gift card validation failures then there is a strong likelihood bots are trying to identify which gift card accounts have large balances and can be sold on the dark web.

## 5. Unusual Traffic Origination Patterns

You know where your customers live - in Europe, the United States or Asia. If a wave of web traffic comes from someplace your customers don’t live or where you don’t offer your service - say, Vietnam or Russia - then you may be under bot attack. Botnet operators like to use affordable or easily hacked web hosting services. They also seek to infest human hosts or web servers with malware in countries where enforcement may be more lax. Identifying this anomaly is quite simple; check for changes in the geographic origin of your visitors and if you see a flood from a place where your customers are not, you likely are under a bot attack.
These are just five easy to spot signs that you are under bot attack. Unfortunately preventing bot attacks proactively is far more difficult than spotting them. Bot operators may piggyback on the browsers of legitimate users, change IP addresses frequently, and use other masking tactics to hide their identity and their intent.

As a result, to stop bots before they cause significant damage on your site and ruin your customer relationships will require more sophisticated techniques that specialized bot defense companies such as PerimeterX provide. Powered by machine learning and examining billions of actions each day across hundreds of websites, PerimeterX sees at web scale what bot attacks are happening where. By parsing site visitor actions down to keystroke cadence and cursor movements across a page among others, PerimeterX uses proactive behavioral analysis and predictive algorithms to stop bots cold.

The five signals discussed here that malicious bots are attacking your site is merely a starting point. They represent analysis that any analytics practitioner or web operations person could undertake to quickly judge whether their valuable site content , and their customers accounts, are under assault by malicious bots. The real truth is this: Bots have very different goals than do humans. As a result, the difference between them is usually rather obvious if you know what to look for and what behavior would be anomalous for humans but logical for bots.
