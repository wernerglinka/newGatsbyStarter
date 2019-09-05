---
template: "blog/blog-post"
draft: false

# Metadata
title: "Protect Your Site from Stealth Scraping"
description: "When you hear about malicious scraping of website content, this has traditionally meant some bad actor hitting your site repeatedly and using headless browsers or scraping services to harvest your images and text without permission."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Protect Your Site from Stealth Scraping

# Fields
date: 2018-06-11
author:
  - Ido Safruti

blog_title: "Protect Your Site from Stealth Scraping"
categories: Thought Leadership
tags:
  - account-takeover
  - botnet
  - e-commerce security
  - vulnerability

thumbnail: stealth-scraping.jpg

canonical_overwrite: "https://www.forbes.com/sites/forbestechcouncil/2018/06/11/protect-your-site-from-stealth-scraping-through-google-search/#15b7323e2188"
---

As Originally published in [Forbes](https://www.forbes.com/sites/forbestechcouncil/2018/06/11/protect-your-site-from-stealth-scraping-through-google-search/#7b26e93c2188)

When you hear about malicious scraping of website content, this has traditionally meant some bad actor hitting your site repeatedly and using headless browsers or scraping services to harvest your images and text without permission. Fortunately, website operators and security teams could detect the presence of scrapers by studying their web analytics and identifying specific patterns of page views and anomalies in visitor behavior.

There is a less well-known type of scraping, however, that is impossible for website operators to detect or even know about. That’s because this scraping technique never actually touches your website. In this method, the scrapers will hit Google rather than visit the affected sites directly, taking advantage of Google’s vast indexing capabilities and crawling engine. Here is how that works.

Google is a search engine, yes, but in order to index the web, it also built the world’s largest web scraping engine. To improve its search abilities and performance, Google keeps a cached version of the content it crawls. This also allows web searchers to view cached web content when a page is offline. To access the cached content, a user should simply click the green arrow to the left of the search result for that site and select the “cached” option in the drop-down menu. This cache of content also includes images and is exceptionally easy to scrape. For that reason, the cache provides a much softer target for content theft than the live site. Scraping efforts are not visible to the website operator or any of its analytics tools and security monitoring services.

The cached view of a page on Google may have different view options (full, text-only or source). Sites that are updated frequently, for inventory or pricing, for instance, are typically scanned much more frequently and will show recently cached results from the last few hours.

Web scraping is one of the fastest-growing types of web attacks we are seeing these days. Scraping of price and inventory data is endemic in numerous e-commerce industries, including apparel, online travel, sporting goods and furniture. Malicious bot operators use the scraped information for price and inventory intelligence. Content theft for unauthorized reposting is also a significant problem. Images and engaging text are expensive to create. For that reason, high-quality images and product descriptions are coveted by unethical website operators and third-party resellers of brand-name goods and services.

One possible way to detect that this type of scraping attack is underway is by utilizing tracking scripts. Scrapers fetching content from a Google cached page may also fetch the scripts and resources from the original URLs as indicated in the page. When tracking access to these resources, one can see that they were called from a Google cached page and not from the original page. That said, if the scraper chooses to not run javascript and scrapes the “text-only” section of sites, then those scrapes are impossible to detect.

There is a simple solution to this, which may make sense for many website operators. Google (and other crawlers) allows you to turn off caching of crawled resources on a per URL basis. In reality, very few visitors know about the ability to access cached content. Even fewer access your sites in that manner. If protecting your content on a specific page is more important than making that page’s content available on Google when your site is down, you should instruct crawlers not to display a cached version of that page. The instruction could be for crawlers in general or for Googlebot specifically. To stop caching, use the “ROBOTS” meta tag in the page header, as follows: <META NAME="ROBOTS" CONTENT="NOARCHIVE">. You can read more about how to use this instruction and variations of it here.

Turning off search engine caching will help you block just one more vector the bad guys use to spy on your sites and lift your content. It’s easy to do, it's free, and it helps future-proof your site against what is likely to be another wave of bot attacks as more bot network operators realize they can grab this valuable information with far less risk of detection.
