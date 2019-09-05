---
template: "blog/blog-post"
draft: false

# Metadata
title: "Fighting Fraud in the Trenches"
description: "Fighting Fraud in the Trenches"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Fighting Fraud in the Trenches

# Fields
date: 2018-08-17
author:
  - Amir Shaked

blog_title: "Fighting Fraud in the Trenches"
categories: Research
tags:
  - account-takeover

thumbnail: fighting-fraud-in-trenches.jpg

canonical_overwrite: https://www.tripwire.com/state-of-security/security-awareness/events/bsideslv-fraud-trenches/
---

As originally published on [tripwire.com](https://www.tripwire.com/state-of-security/security-awareness/events/bsideslv-fraud-trenches/)

The famed bank robber [Willie Sutton](https://www.fbi.gov/history/famous-cases/willie-sutton) once said “I rob banks because that’s where the money is.” These days, botnet operators would say the same about retail sites and marketplaces. The nexus of fraud activity has shifted away from financial services targets to focus heavily on the retail ecosystem. That’s because retail and marketplace sites are far more like banks than they used to be, with multiple ways for criminals to cash in.

These attacks are very common. According to PerimeterX’s own analysis, on average 40% of all login attempts are malicious in nature. That can go up to 80% of all log-in attempts during significant account takeover (ATO) attacks. Increasingly, this mix includes mobile apps and mobile APIs as key targets. Of the 3 billion malicious login attempts PerimeterX blocked in the last few months during ATOs, 40% of the bots tried to disguise themselves as mobile apps.

From simply hijacking a stolen account to making fraudulent purchases to siphoning off loyalty points, ATO attacks against retailers offer criminals many ways to extract cash quickly and easily. Not surprisingly, the scale of attacks has grown massively to fit the target environment.

What has changed to make this possible? The first question might actually be: what has not changed? People still reuse passwords heavily across multiple sites. This is despite years of calls for people to use password wallet software or password management systems in browsers.

Many financial institutions have mandated two-factor authentication (2FA). But retail operators are afraid to take this step for fear of chasing off valid users and real customers by putting unnecessary steps into purchasing and login processes. Banks can demand 2FA because financial accounts are inherently sticky. But retailers must fight to convince even their more loyal customers to not abandon shopping carts. As a result retail became a relatively “softer” target that has drawn more attention from hackers.

Criminals have higher quality data, as the marketplace for stolen credentials has grown more sophisticated and the people operating it became more professional. We now see massive online databases with billions of username/password pairs running online reliably with very low latencies for large queries. This is a fundamentally different animal than dumping a few hundred accounts on Pastebin and offering to sell the rest for \$20 on some obscure Dark Web site.

Improvements in QA tooling for browsers and apps have also helped botnet operators who mimic many aspects of a QA process during their attacks. This has the perverse impact of providing ready-made open-source tools to deliver botnet attacks. The shift to mobile apps has arguably made retail even more vurnerable because botnet operators attack an API rather than a website. This provides less information to security teams for detection and filtering, because attackers are only quering an API, not trying to move about a website.

Then there is the explosion of connected devices. Gartner has predicted that there will be [20 billion connected devices by 2020](https://www.zdnet.com/article/iot-devices-will-outnumber-the-worlds-population-this-year-for-the-first-time/), as we move to a world where nearly everything is Internet enabled. The malware targeting poorly secured IoT systems has become far more sophisticated; the [Mirai botnet](https://www.tripwire.com/state-of-security/latest-security-news/researchers-discover-500000-iot-devices-vulnerable-to-mirai-botnet/) software, for example, continues to evolve and improve. This gives botnet operators a fast-growing body of easy yet sufficiently useful delivery agents for attacks or malware payloads.

The reality is, if you are not seeing these attacks, you are not looking hard enough. They are certainly happening on your website. Some basic steps to identify these attacks include:

- Look for old versions of your mobile app spiking in traffic
- Look for user agent clusters that are only doing login attempts
- Look for conspicuously outdate user agents

Retail websites and secondary marketplace operators victimized by these attacks will generally learn what’s happening only when customer complaints start to roll in. By then, it’s too late, and the damage has been done, financially and to the brand’s reputation.

Contact us for more information about how to protect both your business and your customers from account takeover attacks.
