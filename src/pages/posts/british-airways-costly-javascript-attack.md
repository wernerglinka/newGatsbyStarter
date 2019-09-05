---
template: "blog/blog-post"
draft: false

# Metadata
title: "$229 Million GDPR Fine for British Airways Shows How Costly JavaScript Attacks Can Be"
description: "We’ve previously covered why JavaScript attacks should be a major concern to any company that collects any sort of customer, user, or payment information online or in mobile apps."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: $229 Million GDPR Fine for British Airways...

# Fields
date: 2019-07-10
author:
  - Deepak Patel

blog_title: "$229 Million GDPR Fine for British Airways Shows How Costly JavaScript Attacks Can Be"
categories: Thought Leadership
tags:
  - client side data protection
  - javascript security

thumbnail: british-air-blog-post.jpg
---

![$229 Million GDPR Fine for British Airways Shows How Costly JavaScript Attacks Can Be](/assets/images/blog/british-air-blog-post.jpg)<br>

We’ve previously covered why [JavaScript attacks](/blog/client-side-battle-against-javascript-attacks/) should be a major concern to any company that collects any sort of customer, user, or payment information online or in mobile apps. In these attacks, malicious actors covertly modify site code and begin collecting information from site visitors or users. The costs of these attacks to companies ranges into the millions of dollars, between reimbursing victims, repairing shattered reputations, and spending massive amounts of employee time on everything from customer support to security audits and additional site code reviews.

The biggest cost of all, however, are the fines that a company may receive in the European Union - up to 4% of their annual revenue, in a worst case scenario. British Airways just got hit with one of the first of these very large fines.

On July 8, the Information Commissioner's Office (ICO), a data security watchdog in the UK, [announced](https://www.bbc.com/news/business-48905907) that it levied a £183 million (roughly \$229 million) fine against British Airways (BA), citing a security breach in the summer of 2018 that allowed malicious hackers to skim credit card numbers from nearly 400,000 transactions. The fine landed under Europe’s new General Data Protection Rules, a sweeping set of laws designed to protect consumer data. Part of GDPR is assigning stronger penalties against companies that fail to protect customer data - in this case BA. BA actually got off easy; the fine totalled only 1.5% of annual revenue, well below the 4% maximum.

While the ICO and BA released few details of the attack, security company RiskIQ [analyzed changes to JavaScript](https://www.riskiq.com/blog/labs/magecart-british-airways-breach/) on BA’s website and found that someone had modified the Modernizr library (a common JavaScript module) adding 22 lines of code. We don’t know how this happened or what security hole they were able to exploit in BA’s web application and site engineering workflows. Without access to server and access logs, we can only hypothesize. But this attack had all the hallmarks of a classic Magecart skimming operation. Magecart is a loose group of attacks that appear to have common characteristics around digital skimming of credit card information, usually from fairly large web applications or web sites.

In the case of the BA breach, mobile app users were also affected;BA, like many companies, leveraged the same website code and functionality to power its Android mobile application (a so-called hybrid app). While the specific duration of the breach remains unknown, it appears that a malicious version of the JavaScript code ran for months, all the while collecting personal information from hundreds of thousands of users - including login, payment card, and travel booking details as well name and address information.

So you are saying that GDPR is mainly concerned with data breaches, right? In our mind, we believe this is a data breach, even though no data leaked from BA databases or servers on the server-side. The ICO cited and fined BA specifically for failure to maintain proper security practices to protect consumer data. We don’t know exactly what practices BA was following; in all likelihood, they were doing their best to tackle what is an increasingly difficult problem - JavaScript and client-side attacks.

The only way to accomplish this is to monitor every snippet of code and every library in a web application or hybrid mobile application on a continuous basis and spot modifications to site code in near real-time. Savvy attackers could wreak tremendous damage even during brief windows of exposure during high traffic times such as Cyber Monday or Christmas Eve (to name two popular online shopping days)

It’s important to note that this attack on BA is different from phishing, where a bad actor creates a fake site to deceive users. In phishing attacks, the original site isn’t liable because it’s an imitation site and there was no issue with the site that is being imitated; rather, phishing attacks rely on the inability of unsuspecting users to notice that the site they are visiting may be fraudulent. For Magecart attacks like this one, the site operators bear considerable responsibility. BA’s code was served and “verified” by the original site and on the official mobile application, making BA the clearly responsible party.

The fine serves as a major wake-up call to all companies with websites and applications utilizing third-party services and JavaScript components that it is their responsibility to totally secure the users’ experience on their sites, and to manage, control, and monitor any script served as part of their applications. In businesses with small margins, like transportation or retail, a fine of 4% of gross revenues can be devastating. What’s more, GDPR covers any company doing business in the EU so any foreign business operating inside the Union faces the same liability.

And make no mistake - the Magecart attacks are only accelerating. Digital skimming is the fastest growing attack type. Cybercriminals are going where the money is. What’s your plan to stop them from hacking your site code - and putting you at risk of a massive fine?
