---
template: "blog/blog-post"
draft: false

# Metadata
title: "Bot Attacks: 2017 Holidays Saw Attacks Start Way Before Black Friday"
description: "For bot attacks looking to pull off account takeovers, the holiday shopping season started early last year. PerimeterX research found that attackers boosted efforts to break into major retail sites in 2017. The attack attempts likely doubled in volume over those experienced in 2016. Read the latest research from our blog."

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techblog/
  - name: Bot Attacks 2017 Holidays Saw Attacks Start...

# Fields
date: 2018-03-07
author:
  - Ido Safruti

blog_title: "How Unwanted Bots Mounted Earlier Attacks In 2017 Holiday Shopping Season"
categories: Research
tags:
  - account-takeover
  - ato
  - botnet
  - e-commerce security
  - holiday ecommerce
  - holiday season
  - vulnerability

related_posts:

thumbnail: overall-login-traffic-tn.jpg
---

The holiday shopping season started early last year -- for perpetrators of [Account Takeovers attacks](https://www.perimeterx.com/threats/account-abuse/), that is. Our research found that as early as the third week of October, attackers markedly boosted efforts to break into online accounts of major retail sites. While hard to measure in a comprehensive fashion, the attack attempts likely doubled in volume over those experienced by online merchants and shoppers in the previous year. What’s more, everyone needs to get used to this new early season attack schedule. Online merchants need to be on guard earlier to stop the attacks on their website and mobile apps and consumers should start looking for signs that their accounts have been compromised a month or more before the Black Friday madness starts.

![Overall Login Traffic](/assets/images/blog/bots-attacks-2017-holiday-shopping-season/overall-login-traffic.jpg)

_Account takeover attempts started increasing about one month prior to the sales days, peaking on Cyber Monday_

## What Is Account Takeover And Why It Matters

[Account Takeover](https://www.perimeterx.com/resources/account-takeover-threat/), also called ATO, is a favorite tactic of cyberthieves in which they attempt to take control of many accounts on a site or service, by applying massive distributed attacks checking stolen credentials. Once they take over these accounts, they can easily commit fraud, - for example, leveraging the valid credit cards or gift cards stored in accounts of legitimate shoppers in order to buy items that can be resold on the Black Market or on EBay and Amazon. ATO perpetrators generally purchase lists of stolen credentials sold illicitly on the Dark Web for pennies per name. Most people reuse password and email combinations across several sites and this makes their accounts easy targets. ATO perpetrators use armies of malicious software Bots. These are automated programs that run undetected on users computers and work in the background. Bot networks attempting ATO attacks increasingly have infected real users' computers to create clandestine browser sessions where the Bots can try out the lists of stolen emails and passwords on hundreds or thousands of digital commerce sites. Because they are piggybacking on real users, these types of Bots are very hard to detect without sophisticated behavioral analysis systems.

Account takeovers are on the rise globally. [The October 2017 Global Fraud Index](https://www.pymnts.com/news/security-and-risk/2017/fraud-index-account-takeover/), a collaboration between PYMNTS and Signifyd, found that account takeover attacks had soared in Q2 2017, rising by 45 percent in that quarter alone. During those three months merchants lost \$3.3 billion to ATO attacks. Another research firm, Javelin Strategy & Research, found that [ATO incidence rose by 31% from 2015 to 2016](https://www.javelinstrategy.com/press-release/identity-fraud-hits-record-high-154-million-us-victims-2016-16-percent-according-new). So it certainly appears that ATO attempts are in the midst of a major upswing.

Our research at PerimeterX corroborated those findings. Starting in November 2017, we tracked a huge spike in ATO attempts on our own customers and on other online merchants across the Internet. By analyzing our newer customers, who would be more likely to suffer attacks because ATO rings had not yet labeled them as a hardened target, we saw a 100% to 200% increase in the volume of attack attempts from Bots. This turned out to be one of the most active holiday hacking seasons our researchers have ever seen!

![Human vs BOT Traffic](/assets/images/blog/bots-attacks-2017-holiday-shopping-season/human-vs-bot-traffic.jpg)<br>

Fraudsters heighten holiday attacks for a number of reasons. In the high shopping season, there is more account activity and more new accounts are being created as users shop, expanding the surface area for attack. High traffic volumes on digital commerce sites can make it harder to differentiate a rise in Bot activity from the overall rise in traffic and to spot anomalous behavior. Because this is such a critical shopping season, merchants also may be reluctant to block suspicious traffic as they do not want to risk preventing access from legitimate shoppers who are spending more money per visit. The high activity last holiday season, however, may have been the culmination of a rapidly rising tide of account thefts.

## Massive Theft Of User Data Fueling The Rising Tide Of Account Takeovers

In 2017 alone hundreds of millions of user accounts were exposed to hackers or stolen. There are early indications that the Equifax breach, which exposed detailed financial and personal information from the credit reports of over 140 million Americans, has given fresh ammunition to fraudsters. They can easily use that stolen data to know where to target ATO attacks against individual consumers.

Even email and password data theft without any access to other personal information can cause subsequent problems. In a [November 2017 research](https://security.googleblog.com/2017/11/new-research-understanding-root-cause.html) Google tracked black markets where third-party password breaches were traded and 25,000 black hat tools used for phishing and keylogging. From these sources the Google team identified “788,000 credentials stolen via keyloggers, 12 million credentials stolen via phishing, and 3.3 billion credentials exposed by third-party breaches.” These types of account thefts and others, like the [Uber theft that exposed 57 million customer accounts](https://www.theguardian.com/technology/2017/nov/21/uber-data-hack-cyber-attack), are the primary fuel for ATO attacks.

## How Account Takeovers Harm Consumers and Merchants

For site operators and publishers, ATO events can be horrific. Large ATO events can see hundreds of thousands of attempts per hour to crack into a website using thousands of different IP addresses to conduct the attack. Because often these attackers are using legitimate emails, even warning users that something might be amiss can cause inconvenience to loyal customers. Locking them out of accounts after repeated unauthorized attempts to crack their accounts by Bots, likewise, angers real users and hurts the brands of merchants.

Once an ATO Bot cracks a user’s account, the Bot owner can then use the stolen account for a variety of types of fraudulent activity. For merchants, an account takeover attack looks like a normal user who happens to mail a purchase to a new address. The attackers tend to focus on high-value goods, with orders of over \$100, often from online merchants that have less sophisticated fraud prevention systems. [The “athleisure” category or the leather goods categories](https://www.pymnts.com/news/security-and-risk/2017/ecommerce-retailers-brace-for-holiday-fraud-assault/) , for example, are prime targets due to the relatively high price per item.

Attackers don’t trip alarms ordering a handful of products for a fairly large total purchase. Because these attackers are aiming for higher dollar values, they are often backed by criminals who can answer the phone after they change the verification data on an account and later receive the fraudulent orders at a real address. Another form of account takeover attack is to use loyalty card credits or buy online gift certificates that can be used for purchase without providing identification. Still another form of fraud is warranty fraud - where an ATO attacker looks for recent purchase activity in an account and requests a replacement product be sent to a different address.

The costs of these online attacks to users and merchants is real and painful. According to Javelin, ATO cost the victim \$263 out of pocket on average in 2016. Victims spent a total 20.7 hours resolving problems caused by account takeovers, an increase of 47% over 2015. These attacks damage the brands of merchants. Even when unsuccessful, high volume ATO attacks can slow down site response times dramatically precisely when merchants want to have their sites running the fastest - during the busiest shopping seasons.

## A New Normal: Lessons Learned From The Winter 2017 Account Takeover Onslaught

With the rising tide of account thefts over the past two years and the earlier arrival of ATO holiday attempts, we believe that account takeovers are moving earlier and earlier in the shopping cycles. This will accompany a higher baseline volume of ATO attempts fueled by the rising tide of stolen user IDs and passwords which show no signs of abating. Because attacks are coming earlier and earlier in the season, for merchants it’s more important to make sure any enhanced account security measures go in place well before Black Friday or any other seasonal traffic hitting websites or shopping apps. That means prior to big shopping days like Valentine’s Day, Mother’s Day and Fourth of July, among others.

We encourage merchants to monitor their traffic for potential ATO attacks by alerting on sharp increase of login attempts, and specifically for increase in number of failed logins. It is also recommended to implement solutions that prevent these types of automated attempts, rather than only alert a victim after the attack has happened. In fact, analyzing access to the login is not sufficient for attack prevention or mitigation. It is important to analyze and track the behavior of the user. This can include monitoring mouse clicks and typing sequence, device fingerprinting, browser version number checks, and observing the flow of pageviews on the site for anomalous behavior. These checks may detect a behavioral fingerprint that can help in predicting a malicious user on their first request and support a decision to block that user and stop the attack. (Note: [PerimeterX Bot Defender](https://www.perimeterx.com/products/bot-defender/) uses these types of behavioral insights to identify and block attacks prior to impacting a site or mobile app API endpoint).

For online shoppers, the increase in ATO attacks means they need to be doubly aware of signs of attack, including emails asking if they had changed their mailing address or any other account information, and monitor microtransactions on credit cards that might indicate that fraudsters are probing to ensure they have valid credit card information. A better long-term solution still is to ensure that they never use the same password twice, which means using a password manager such as 1password, LastPass or Dashlane. Some of these password managers also alert users whenever a website they have an account on has been hacked and prompts them to update their passwords. Lastly, password wallets make it easier to maintain harder-to-crack passwords because the wallet automatically logs into the sites and the user doesn’t need to worry about remembering 26-character passwords with numbers, letters and symbols.

The bottom line of all this, however, is simple. All of our accounts are going to be constantly under attack. We need to adopt a permanent defensive posture to keep these attackers at bay and have alerts and monitoring in place to detect when such an attack actually takes place.
