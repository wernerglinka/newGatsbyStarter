---
template: "blog/blog-post"
draft: false

# Metadata
title: "Brute-Force Botnet Attacks Now Elude Volumetric Detection"
description: "It is harder to distinguish botnet behavior from human behavior now that brute force attacks can elude volumetric detection. Learn more from PerimeterX."

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techblog/
  - name: Brute-Force Botnet Attacks Now Elude...

# Fields
date: 2016-12-19
author:
  - Amir Shaked
  - Inbar Raz

blog_title: "Brute-Force Botnet Attacks Outsmart Volumetric Detection"
categories: Research
tags:
  - botnet
  - brute-force
  - IOT
  - ATO
  - account-takeover

related_posts:

thumbnail: brute-force-botnets.png

canonical_overwrite: https://www.darkreading.com/endpoint/brute-force-botnet-attacks-now-elude-volumetric-detection/a/d-id/1327742
---

_Based on our Article in [DARK Reading](https://www.darkreading.com/endpoint/brute-force-botnet-attacks-now-elude-volumetric-detection/a/d-id/1327742)_

_Blog updated on November 13th, 2017_

Volumetric detection tools have been a bulwark of protection against brute-force attacks, because the attacks can be of great scale and velocity. Defenses that depend on catching speed and volume of login attempts are now failing, however. Here’s why: distributed attacks using large botnets, and a treasure trove of curated, stolen login credentials, plus guessing algorithms.

Botnets, the armies carrying out these massive, widely distributed attacks, are capable of trying out userID/password combinations very rapidly. Stopping the attack means first recognizing it. Most think of speed as the obvious giveaway of an automated attack.

## Credential-stuffing is increasing rapidly and has become more successful

Destiny rewards persistence. That might be the mantra of brute-force botnet attackers. Judging from the growing number of attacks, they believe it, too.

Microsoft’s Identity and Security Protection Team saw a quadrupling (300% jump) in user accounts attacked between Q1 2016 and Q1 2017. Microsoft detected more than 10 million credential attacks every day across its identity systems back in mid-2016. This included millions of attacks daily where attackers had found correct username and password combinations, but during or after login, the user was recognized as a bot or cyber-criminal.

## The bad guys catch on, and “spread out” to defy volumetric defenses

Several months ago, PerimeterX detected a credentials brute-force attack against one of our customers that lasted almost 34 hours, and included 366,000 login attempts. It sounds like an easy case for volumetric detection, with more than 10,000 attempts per hour. In the past, Google has documented attacks at the rate of 360,0000 attempts per hour, but ten thousand is obvious when coming from one or a few sources.

Volumetric tools deployed at the PerimeterX customer did not “see” this attack initially, because it did not originate from one single IP address. Instead, over 1,000 different IP addresses participated in this attack. Let’s look at the distribution of attempts:

![distribution of brute force attack](/assets/images/blog/iot-ato.png)<br>

Of the participating IP addresses, the vast majority (over 77%) capped at just 10 attempts during the entire attack. In other words, those IP addresses averaged one attempt every three hours, approximately. Only a minority of the originating IP addresses could trigger volumetric detection. In fact, 77% percent of the attacking IP addresses would go unnoticed.

For perspective, attacks on financial institutions have been known to use [one million IP addresses](http://www.circleid.com/posts/20160620_nearly_1_million_ip_addresses_used_by_attackers_on_a_single_target/).

## Large-scale educated guessing

Would counting failed login attempts work here? Not necessarily – today, many brute-force attacks don’t endlessly enumerate on passwords. Instead, they try username/password pairs that were likely obtained from leaked account databases, gathered from other vulnerable and hacked sites. Since many people use the same password for numerous accounts on unrelated websites, there is a good chance that some, if not many, of the login attempts will actually be successful.

Attackers don’t stop there, however. They can supplement brute-force techniques with highly effective algorithms to test variations of known (i.e., stolen) userID and password combinations. These credentials work up to 8% of the time, according to what PerimeterX has monitored in actual attacks.

## How Motivated Attackers Adapt

On a different attack we observed, nearly 230,000 attempts at logging in over 20 minutes originated from over 40,000 participating IP addresses. The vast majority of these IP addresses were used as the origin point of 10 or fewer attempts. A volumetric detection tool would simply miss this attack.

Volumetric detector is usually set to between 5 and 30 as a minimum, depending on the site’s specific behavior. Our data suggest that motivated attackers will adapt and adjust their numbers to your threshold, no matter how low it is. This particular attack was highly concentrated within a very short window of only about 20 or 25 seconds.

## Fake User Creation Attack

Let's look at one last distributed attack, against a different PerimeterX customer. This time, the attack is not about credentials brute-forcing but rather fake user creation. In this example, the largest groups of IP addresses used per attempt count were those that committed only 1 or 2 attempts:

![distribution of brute force attack](/assets/images/blog/ip-addresses.png)<br>

The entire attack was conducted in less than six hours.

How do the attackers get so many IP addresses to attack from? The answer lies in analyzing the IP addresses themselves. Our research shows that 1% were proxies, anonymizers or cloud vendors, and the other 99% were private IP addresses of home networks, likely indicating that the attacks were performed by some botnet (or botnets) of hacked computers and connected devices. Furthermore, the residential IP addresses constantly change (as in any home), rendering IP blacklisting irrelevant and even harmful for the real users' experience.

## Behavior, Not Volume, is the Key to Detecting Brute-Force Attacks

We included in this post just a few representative examples (out of many more we detected) of large-scale attacks originating from thousands of IP addresses over a short time span. In most of these cases, detection was achieved by examining how users interacted with the website. The suspicious indicators included users accessing only the login page, filling in the username and password too quickly or not using the mouse. Behavior-based technology can also detect:

1. Non-human operation of the mouse. Always clicking on the center pixel of a choice button is a simple example.
2. Attempts to appear human with unrealistic randomness in operation of the mouse.
3. Interaction with specific web pages that does not match up to how humans react to those pages.

The implication of these attacks vary. They include theft of user credentials as well as fake user account creation, which in turn leads to user fraud, spam, malware distribution and even layer-7 DDoS on the underlying web application.

Volumetric detections relies on historical signatures. Every day, the attack methods gets smarter, and checking speed is no longer enough. Volumetric detections are simple and still play a useful role, but they are not sufficient. Attackers continue to improve their techniques, bypassing old-fashioned defenses and making brute-force techniques “smart” with use of curated databases of stolen credentials, along with credential-guessing algorithms. The new frontier in defense is in distinguishing bot behavior from human behavior – and blocking the bots.
