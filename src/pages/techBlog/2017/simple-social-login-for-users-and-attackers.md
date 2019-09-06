---
template: "blog/blog-post"
draft: false

# Metadata
title: "Social Media Login Security: Issues, Risks and Tips for Cyber Security"
description: "Social logins are very popular, but they can be abused by automated attacks. Learn how to make it harder for fraudsters to exploit this in our latest post."

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techblog/
  - name: Social Media Login Security...

# Fields
date: 2017-10-18
author:
  - Ido Safruti

blog_title: "How To Make Your Simple Social Login More Secure"
categories: Research
tags:
  - social
  - login

related_posts:

thumbnail: social-login.png

canonical_overwrite: https://www.infosecurity-magazine.com/opinions/simple-social-login-users-attackers/
---

_As originally published in [InfoSecurity Magazine](https://www.infosecurity-magazine.com/opinions/simple-social-login-users-attackers/)_

You will find them on millions of websites, including many of the most popular sites on the internet. These little buttons make it much faster for customers to sign up for a web application or service and dramatically boost conversion rates for site owners: I’m talking about the ubiquitous social login buttons from Facebook, Google and others.

Unfortunately, social logins are a growing source of abuse and fraud as sophisticated attackers and botnet operators have figured out ways to hack these authentication mechanisms and wreak havoc. This column will give you an overview of how social logins abuse happens and basic steps site operators can take to prevent it.

It’s easy to see why social logins are so popular. For users, it’s a much easier mechanism. With a social login they control one trusted identity and use it to log into other places in a trustworthy way. For site owners, it reduces friction in the signup process and feels more secure as they don’t need to manage user passwords or store their credentials and they know that a user’s email will be valid and won’t bounce.

Sounds good, right? Recently a customer called us and showed a strange graph of new account creations on their site. The line on the graph rose steeply in a very short period.

The customer was experiencing roughly a 9X increase in new account creation for no apparent reason. They believed it was an automated attack on their login page aimed at hacking into existing user accounts or creating fake new accounts on the application. We looked into their claim and quickly realized that the automated attack was a centrally controlled botnet of tens of thousands of malware infected browsers targeting the application’s social login flow.

In many cases, the way social login abuse happens starts by enticing a user to install a malicious browser extension. That extension will request your permission to read and change all data on all websites you visit, and a week or so from install date, will download in the background some Javascript malware from its command and control site to run on the user’s browser, and from that point can practically control your browser. The major browser makers cannot adequately police their stores due to the sheer volume of extensions uploaded.

These malicious extensions wait in the background and watch until a user logs into Facebook, Google or some other service. Once the user is logged in, the extension then will use the access tokens or credentials, and will attempt to sign the user up for other services supporting said social login without approval or permission, taking advantage of the logged in social account.

Some of the bot extension makers will actually take an extra step and use this tactic to game its rankings on the extension store using the user’s credentials to upvote the score, and will use the social networks to further distribute the malware to friends, allowing them to get thousands of more downloads.

Because social logins will generally keep a user logged in for 30 days without requiring an additional log in, bot makers and botnet operators have a considerable window of time in which to either perpetrate online fraud or spread their malware widely, all while piggybacking on the browsers of legitimate users.

What good is a hacked social login on a site? For one thing, it can be used to rack up affiliate fees through fake account signups at dating sites or other applications using hijacked social credentials. Botnet operators can also use social logins to propagate their malware by storing the malware on these sites as well as spreading it to friends or contacts and create a broader network of bots. For example, a hacked social login on a major file transfer site could be used as a powerful propagation mechanism for malware. Marketing fraud is another way that bot operators use social logins to make money or punish competitors.

Here are some basic steps to take that will make it harder for social login fraud to happen on a web application.... [Read full article](https://www.infosecurity-magazine.com/opinions/simple-social-login-users-attackers/)
