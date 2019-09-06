---
template: "blog/blog-post"
draft: false

# Metadata
title: "Abusing GSuite for Data Scraping"
description: "How scrapers abuse GSuite to scrape data from the web"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: Abusing GSuite for Data Scraping

# Fields
date: 2019-02-24
author:
  - Raz Avizemel

blog_title: "Abusing GSuite for Data Scraping"
categories: Research
tags:
  - GSuite
  - Google Spreadsheet
  - Scraping
  - Abuse
  - Google

thumbnail: randy-fath-711941-unsplash.jpg
---

Millions of requests are made by Google’s bots and services on a daily basis. The famous search engine has become such an important part of the internet that it can even get some places where humans are blocked – login pages, filtered content and more. Some websites don’t even check the users’ profiles if they claim they’re associated with Google (easy to do by simply changing the user-agent you’re requesting the page with). This is a threat that more experienced website managers are aware of. However, fewer people are aware of the many ways a hacker can identify themselves as Google, or even worse, hide behind a legitimate services, which may not be suspected because of the company’s reputation.

Google’s applications are extremely popular today thanks to their web versions and their functionalities. Some of Google’s applications, however, can be abused by sophisticated malicious figures in order to scrape data from websites and cause harm.
Those services allow users to access websites through their applications, with the use of easy built-in functions which cause the request to actually originate from Google servers and IPs.
Scrapers may also abuse Google’s cached content without even contacting the original site’s server, as we posted in the [Google Search Scraping article](https://www.forbes.com/sites/forbestechcouncil/2018/06/11/protect-your-site-from-stealth-scraping-through-google-search/#326fc9152188) article.
Using these methods helps hide under the cover of traffic coming from Google.

![good and bad googlebots](/assets/images/blog/gsuite1.png)

## Daily percent of Googlebot’s requests on our customers

As you may notice, some requests try to spoof themselves as Googlebot traffic by imitating the Googlebots’ user-agent. The current way to detect if a user is trying to mimic Googlebots is defined [on Google's site](https://support.google.com/webmasters/answer/80553?hl=en) - checking the correlation between the requests’ user-agent and the IP it connects from, in order to make sure it’s not someone who claims to be Google.
This method increases the processing time per request and is therefore not realistic for high-volume and live processing.

In our data, we see that around 8% of the daily requests to our clients come from Googlebots and around 4% requests coming from Google’s different services and IPs. That is over 10% out of the billions of site requests made daily. This can be used for a lot of scraping and other abuse.

From the research we’ve conducted at PerimeterX, we have seen the different ways several applications communicate with our clients’ servers, and how well they hide the real users’ identities. For example, if you’re an advanced user of Google Sheets, you may be familiar with the function IMPORTXML; that with a XPath can query all the text, links and so on from a website. However, it is possible that you didn’t know that the request actually goes to Google’s servers, where a new request is sent from Google’s servers to the website. Whether this was done intentionally or not, the abuse we’ve found allows users to obtain the information they need while hiding behind Google’s user-agent and IP range.

The different services we’ve inspected presented different working methods. Google Sheets doesn’t report the user’s true IP address, while Weblight does. In both cases you can identify the service using a simple string that appears in the User Agent: `Mozilla/5.0 (compatible; GoogleDocs; apps-spreadsheets; +http://docs.google.com)` for Google Spreadsheets, `Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19` for Google Weblight. Google Translate, identified by the suffix `via translate.google.com` in the user-agent, on the other hand, doubles the traffic to the site, as the requests are made from both Google’s servers and the user’s computer.

![good and bad googlebots](/assets/images/blog/gsuite2.png)

In the chart above you can see the Google Sheets requests and Googleweblight made to our customers per day. Needless to say that different customers get different amounts of Google Sheets traffic, indicating that some sites are more susceptible to abuse than others. The different numbers between accounts can also be caused by the identity of the scrapers, how advanced they are, and how motivated they with scraping data from a targeted site.

Looking at Weblight reveals two points. The first is that it has much more traffic, which is possibly due to the fact this is a legitimate feature of Google, and is used in many places like Latin America or South-east Asia, and you can see an increase over time. The specific reasons for the increased use of Googleweblight are not certain. The growth can be due to an actual increase of users that need the feature, or an increase of abuse in the method.

So how can Spreadsheets scraping be stopped real-time?

It seems that Google apps-spreadsheets bot does not comply with the robots.txt file, as it seems from testing the method against a site that should block all bots that honor the file. It may be since Google didn’t actually consider it to be a bot, but changing that could itself prevent the abuses I’ve discussed in this post.

We suspect that more of Google’s, and other companies’ applications can be used in some way for malicious intents. We did see that some of Microsoft’s products can be abused as well, but the abusers do not come from the company’s servers, but from their own resources, which makes them much easier to handle.
If you’re managing a website yourself, you should look for specific user-agents that may be querying your site, such as the ones mentioned in this post.
In case you do find a service that you may be worried about, you need to understand if and how the service can be abused, and how can you identify the traffic that uses that service.

Remember, just as whitelisting the Google Cloud platform simply because it’s Google’s isn’t a good choice of action, neither is whitelisting their applications.
