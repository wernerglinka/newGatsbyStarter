---
template: "blog/blog-post"
draft: false

# Metadata
title: "Guide to Account Takeover Attacks 2"
description: "Learn ways to identify and prevent account takeover (ATO) attacks."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Guide to Account Takeover Attacks 2

# Fields
date: 2019-09-03
author:
  - Deepak Patel

blog_title: "The Best Way to Identify and Prevent Account Takeover Attacks"
categories: Thought Leadership
tags:
  - account takeover
  - bot management

related_posts:
  - Guide to Account Takeover Attacks

thumbnail: ato-2.jpg
---

![Guide to Account Takeover Attacks 2](/assets/images/blog/ato-2.jpg)<br>

In our [last blog post](/blog/account-take-over-part1/), we learned what account takeovers (ATOs) are, how and why they happen, and some recent examples. In this blog post, we’ll look at ways to identify and prevent these devastating attacks.

## How to Identify Account Takeover

ATOs often make millions or billions of attempts to gain access using combinations of password and email or username credentials lifted from the dark web. These attacks employ massive bot networks with thousands, and up to millions of nodes. These nodes might be compromised browsers of real users, spoofed browsers on devices operating out of a cloud server, or hacked internet of things (IoT) devices.

The [2019 Verizon Data Breach Investigations Report](https://enterprise.verizon.com/resources/reports/dbir/) indicates that “Botnets are truly a low-effort attack that knows no boundaries and brings attackers either direct revenue through financial account compromise or infrastructure to work from.”

For most organizations, if they see an account being used in an anomalous way or a huge volume of login requests coming from a limited number of Internet addresses, they can lock the account and have the user reconfirm login and account details. The problem comes when attacks get creatively “low and slow.” That’s because bots can impersonate many different devices on many different IPs, making them harder to detect. It is very easy to launch a highly distributed campaign with bots that pretend to be browsers or native apps, and because the number of requests from a single source is small, a basic volumetric-based protection would not be able to detect them as they fly under the radar.

For example, in a sophisticated, hyper-distributed attack on a large retailer website, [bot armies made more than 300,000 login attempts](https://www.darkreading.com/endpoint/anatomy-of-an-account-takeover-attack/a/d-id/1324409) from thousands of IP addresses in the course of a single day. Each IP address was used to attempt logins to approximately 100 distinct user accounts, spread along the entire day sending requests 10 minutes apart, with a different browser cookie used for every login, likely to skirt security solutions based on device tracking.

Here’s another example: Consider a campaign comprised of 366,000 login attempts from 1,000 different IPs making 10,000 attempts an hour. We’ve found that 77% of this attack would go unnoticed by a web application firewall (WAF) or volumetric detection because most of these attempts send no more than 10 requests from a single IP, evading detection.

The bottom line is that the combination of highly distributed attacks using real browsers making requests, and operating in conjunction with real users’ sessions, renders many detection approaches useless. So what does work in identifying account takeover?

According to [451 Research](/resources/reduce-fraud-web-behavior-analytics/), “Web behavior analytics (WBA) is the key ingredient in a fraud prevention strategy where everything – user accounts, devices, network, and transaction details – are likely to be hijacked by professional fraudsters. The ability to expose when approved users and devices are acting as if they’ve been hijacked is the driving motivation behind machine learning.”

More to the point here is the ability to take advantage of behavioral fingerprints, tell-tale characteristics of interaction with a system that can be used to distinguish bot from human, and even to predict intent. This behavioral approach can use hundreds of different data signals -- everything from network and device-level bread crumbs (e.g., IP address, device make/version, and user agent), to the typical paths used to navigate a site/app, to the details of how users, both in general and individually do different things (e.g., mouse movements and clicks, keyboard patterns, and the rate of response between pages).

Indeed, more personal and/or granular behavioral traits, such as the way someone types (known as keystroke dynamics) and uses a mouse, and benchmarking these activities against a baseline, can be used to quickly distinguish human from bot. For example, humans might hover over different elements on the page, until they reach a box where they can type, which they click and start typing. The actual typing, in terms of keystrokes, keydown and keyup events, and the timing of each, is unique to each person. The fact is, human interactions are very distinct from the behavior of automated attacks. This isn’t detected by looking at the behavior or path of URLs accessed, but more specifically at all aspects of what the user (or bot) is doing with the browser and application.

The catch is that behavioral fingerprint methods require not only a high level of sensing capabilities, but also massively parallel computation infrastructure that is optimized specifically to the task of real-time evaluation of large amounts of sensor data. Without such large-scale, real-time analysis capabilities, keeping pace with the speed and evolution of today’s attacks is not even remotely possible.

## What’s Not Likely to Help

- **Web Application Firewalls (WAFs)**: While WAFs help with the top-ten OWASP risks, they’re not as effective in detecting ATO attacks. That’s because ATO attacks typically fall within business logic and do not trigger alerts. More advanced, highly distributed attacks are low and slow and completely transparent to WAFs, which can neither detect nor mitigate them.
- **Multi-Factor Authentication (MFA)**: While it is highly recommended and extremely helpful to protect enterprise users, most consumer-oriented vendors do not force MFA because they want to streamline the user experience.
- **CAPTCHA**: Forcing CAPTCHA on every user for every session creates aggravation and frustration and lowers conversion rates. Moreover, bots are getting better at bypassing CAPTCHA challenges, some with a 90% success rate.
- **New Mobile Features**: While capabilities like Device ID and biometrics can help (by providing a low-friction option for stronger/multi-factor authentication), they are not widely available yet and, therefore, of limited usefulness at this point.
- **Basic Volumetric Detection**: If you block traffic just because of an unknown spike, you might also block real users. For example, Marketing might launch a huge nation-wide campaign and forget to inform the Web and Security teams, which, if they block the traffic, could end up costing the company serious revenue.

## Preventing ATO Attacks

To stop account takeover and abuse attacks, we must switch from profiling environments and instead focus on behavioral anomalies and characteristics. The determination of whether a behavior is human or bot-based must be made quickly on the first access and request, rather than over a series of pages. If the attack starts with a request to the login page, any delay in determination will occur after the actual attempt has been made. When analyzing the user’s behavioral fingerprints, rather than the request itself, we are able to obtain much more information that can be used to effectively detect and block malicious users.

Machine learning-based behavioral analytics are at the heart of PerimeterX, which delivers the highest level of detection accuracy and scalability. The PerimeterX bot protection-as-a-service catches automated attacks in real time with unparalleled accuracy, auto-tuning to improve detection while easily integrating into your existing infrastructure.

If you’d like to learn more about account takeover and what you can do to prevent this type of attack, visit: https://www.perimeterx.com/threats/account-abuse/
