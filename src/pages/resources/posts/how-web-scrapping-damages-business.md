---
template: "blog/blog-post"
draft: false

# Metadata
title: "How Web Scraping Can Damage eCommerce Businesses And How Behavior Can Predict It Before It Happens"
description: "How Web Scraping Can Damage eCommerce Businesses And How Behavior Can Predict It Before It Happens"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: How Web Scraping Can Damage...

# Fields
date: 2018-08-21
author:
  - Corinna Krueger

blog_title: "How Web Scraping Can Damage eCommerce Businesses And How Behavior Can Predict It Before It Happens"
categories: Thought Leadership
tags:
  - web scraping

thumbnail: web-scraping.jpg
---

In previous posts we covered the impact of account takeover attacks on Retailers. In this post we will delve into another unwanted activity that keeps retailers up at night.

Often, eCommerce sites must also cope with simultaneous scraping attacks executed by bots. What is web scraping? Scraping bots harvest valuable pricing information, product inventory and descriptions as well as images and other resources from the retailers’ websites. The bots grab this content without permission. Those images and text descriptions quickly show up on competing sites and on unauthorized or unofficial resellers. “We were surprised to find our content even on the sites of highly reputable ecommerce companies,” said Jim Giantomenico, CIO at Avenue Stores, which discovered that scraping bots were stealing its images and product descriptions in the summer of 2017.

## Nearly Every e-Tailer is a Target for Scraping Bots

In reality, Avenue’s experience with scraping bots is more the norm than the exception. Scraping is a fast-growing problem for thousands of retailers. These attacks are carried out by automated software - bots - that target a website, and identify valuable content by looking at file types (for images) or text location. They scrape the text, prices and images and send those images back to a central repository or database controlled by the operator of the scraping bots.

Web scraping bots also seek to harvest product prices and inventory levels. Retailers attempt to frustrate the scraping bots by “hiding” the prices, showing them only once an item is added to the shopping carts, but scrapers have programmed their bots to put products into shopping carts to obtain the final pricing. Similarly, inventory information can alert competitors that a product may be out-of-stock or going out-of-stock. Dozens of consultants and technology companies offer price and inventory scraping tools and services, often in real time. So retailers should assume competitors are relentlessly trying to capture all the price and inventory information from their site as well. To do this, they are using sophisticated “third-generation” bots that can render a page, run Javascript, and maintain state just like a real browser. These bots, as mentioned, can place the item into a shopping cart, to trigger the calculation of discounts, taxes, and shipping charges, to see the total price that a customer might pay.

The volume of bots scraping content is astronomical. Our researchers have seen an average of 30% with spikes as high as 70% of total web traffic.

## Changing Threats, Smarter Bots

Scraping attackers have turned to more sophisticated tools. Specifically, they are deploying bots which can imitate normal human interactions with sites. They can run JavaScript, save cookies, and use engine automation to simulate mouse movement, keyboard typing, clicking and more. They can imitate every part of the shopping behavior, but never make the actual purchase. Increasingly, these bots can bypass or solve traditional protections such as CAPTCHAs and JavaScript challenges. Scraping bot attacks have also become more widely distributed, using thousands of different IP addresses and rotating browser user-agents which makes them harder to detect. Because scraping alone is not listed as a crime, most major brands attempt to scrape price, inventory and product data off of competitors’ sites. A number of venture-backed companies, such as Import.io, have designed tools specifically for wide-scale programmatic scraping.

These changes have played out on a large scale for many sites. Our researchers see scraping bots comprising around 30% or more of site visitors, adding items to shopping carts and checking shipping prices, which is enough to not only compromise content but also to put a significant load on servers and other infrastructure. The charts below show how persistent scraping bots can be. As legitimate traffic ebbs and flows in daily and weekly seasonality, scraping bots maintain their persistency to gather information day and night, weekdays and weekends.

![Traffic Flow](/assets/images/blog/traffic-flow.jpg)<br>

## Not All Scraping is Bad....But Good Bots Aren’t Always Good

Not all website scraping bots are bad, and certain types of scraping may be beneficial. All search engine spiders are actually web scraping bots. But these bots feed information into search indexes that make it easier for people to find a web property, and helps bring users to the site. Bots from shopping aggregators may scrape product and pricing data, as well as images, in order to add them to links back to the original product page. These bots scrape but help retailers by driving additional traffic to their pages. In some cases, the party doing the scraping may actually be a company that both competes against and cooperates with the scraped target. A 2015 report by the Federal Trade Commission found that [Google illegally scraped content](https://www.theguardian.com/technology/2015/mar/20/google-illegally-took-content-from-amazon-yelp-tripadvisor-ftc-report) from Amazon, Yelp! And TripAdvisor in order to improve its own services. All three of those companies rely on Google for traffic and referrals.

## How Scraping Hurts Business

Scraping bots that steal price, inventory and product information for delivery to competitors, however, are not Google spiders. To the contrary, when scraped content is published online on a different site, it can negatively impact the search engine rankings of the original site because search engine ranking systems penalize duplicate content appearing on unrelated URLs. This is particularly damaging when Google ranks pages containing the stolen content higher than the original, legitimate pages.

### Punish the Victim, Reward the Thieves

In that circumstance, search engines may mistakenly downrank the content originators, as their algorithms may conclude incorrectly that the rightful owner of the content is running a “content farm” or are otherwise trying to game the search engines with copied content. Such downranks can have a catastrophic impact on traffic and, subsequently, sales for the legal owner of the content.

### Legal or Not, Scraping Breaks Rules

Gathering price intelligence from competitors is considered a normal part of doing business. This activity is also not technically illegal, whereas unauthorized reuse of scraped content is in fact a violation of the copyright law. Scraping price and inventory data, however, invariably violates the Terms of Service of websites under attack by scraping bots. Some businesses are willing to sue to stop scraping attacks.

This type of price and inventory intelligence can be used as a competitive weapon. For example, if a retailer notices that a competitor is having a sale on a particular popular SKU, it may want to lower its own prices to better compete and attract bargain hunters - and raise them again when it appears the competitor is about to run out of inventory.

## Reactive Detection of Web Scraping Bots

### Verify Scraping With Honeypots

There are a number of approaches to identifying web scraping bots. For example, coupon aggregator and curator CouponFollow thought that scraping bots were harvesting the coupon codes its staff had painstakingly collected and published on their site. To verify that scraping bots were copying the codes, the CouponFollow team began seeding their listings with false codes which they had simply made up. [CouponFollow then searched for postings of the false codes on competing sites and found their “honeypot” codes had been posted](http://go.perimeterx.com/rs/001-VJX-104/images/Case-Study_CouponFollow.pdf) by dozens of their competitors - including some very popular and generally respected coupon sites.

### Manual Filtering

Website operators and analytics teams can also try to manually filter scraping bots by subscribing to blacklists of malicious bots, however, that is a never-ending process of playing “Catch Up”, and relying only on IP addresses for detection isn’t accurate enough and will lead to misdetections as well as false-positives (blocking legitimate users sharing the IP address).

### Crude Rules-Based Volumetric Detection

Another method of detection is to write rules for what types of behavior are acceptable on a web server; this can help block some scraping bots. These types of bots tend to be aggressive and attempt to access as many pages as possible in a short period of time. This lends to volumetric detection and screening. Bots from a single IP address which are visiting pages above a given threshold can be blocked.

### Improved Technology Blocks Scraping Effectively

Smarter scraping bot operators, such as Luminati.io and Netnut.io get around these filtering mechanisms by using a highly distributed network of bots to mount “low and slow” attacks that use many thousands of IP addresses with each IP requesting only a few pages of content to scrape. Sometimes these operators use masses of Virtual Private Networks and tens of millions of proxies that mask IP addresses and present as residential, data center or mobile device footprints in order to confuse detection and make scraping easier. Luminati, for example, claims to have 33 million IP addresses in “The World’s Largest Proxy Network”.

The best way to detect and stop content scraping bots, however, is to filter them based on a variety of behaviors that would not be normal human interactions. For example, a human visitor is highly unlikely to check out every single link on a product category page. Typically, a human visiting a web site might meander up and down the page a bit rather than cut a straight line for all images and for particular blocks of content. There are numerous behavioral and environmental signals, from typing cadence to browser version and device type to geographic location, that more sophisticated bot detection and mitigation tools can use as clues to whether a visitor is a bot or not.

## Web Scraping Will Get Worse Unless You Understand the Behavior

Bots are continually advancing in sophistication. Behavioral-based detection is the most efficient way to proactively block attacks before they happen. It uses machine learning to quickly adapt to new types of bot behaviors and identify them as threats. Rest assured, the armies of scraping bots are not going away. In fact, we will see even more of them as web scraping grows cheaper due to the declining cost of cloud computing. These scraping bots will have a real impact on business unless they are stopped in the trenches.
