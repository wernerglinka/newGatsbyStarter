---
template: "blog/blog-post"
draft: false

# Metadata
title: "Blocking Tor: A Case for Better Detection"
description: "Blocking Tor: A Case for Better Detection"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: "Blocking Tor: A Case for Better Detection"

# Fields
date: 2016-04-05
author:
  - Ido Safruti

blog_title: "Blocking Tor, A Case for Better Detection"
categories: Thought Leadership
tags:
  - Tor
  - anonymity

thumbnail: blocking-tor.png
---

In the last week there is an ongoing debate about the common method used by service providers (and CloudFlare in particular) for blocking Tor users and the grand Tor community.
CloudFlare on their end declared that Tor as a network is heavily used by attackers and that [no less than 94% of Tor requests they see are malicious](https://blog.cloudflare.com/the-trouble-with-tor/), and that they were blocking requests coming from IP addresses from which malicious activity had been detected. On the other side, the [Tor project is accusing CloudFlare](https://blog.torproject.org/blog/trouble-cloudflare) of punishing the entire community for malicious activity detected from specific Tor IPs.

In our experience relying on IP addresses as a sole indicator results in a high rate of false positives. This results in also blocking legitimate users who use Tor. In reality this is profiling the entire Tor community as malicious. Blocking potential legitimate users or customers on your site (or giving them a bad experience infested with CAPTCHAs) translates to potential loss of traffic and revenue for the site owner.

At PerimeterX we believe that the proper way to handle Tor users is not by blocking the entire community, but rather by blocking the offensive activity itself. While this does require a greater level of sophistication on the part of the provider, it's nothing outside of the realm of possibility today.

## A little about Tor (and why we should care)

Tor is a free global network that enables anonymous communication over the Internet, specifically for HTTP. It hides the identity and location of the user (client). A Tor browser will encrypt and route the user’s HTTP requests through several Tor nodes, selecting an exit node through which the communication will exit the Tor network to the destination. The nodes participating in the Tor network publish their availability, so that a node can be an exit node for multiple different users simultaneously.

On its own, anonymity is good for people who care about their privacy for many legitimate reasons. However, offering anonymity also provides an opportunity for criminal activity and fraud.

While it might be true to claim that malicious users are likely to hide their origin using anonymous services like Tor, using Tor on its own isn’t a sufficient reason to determine that a user is malicious.

## IP reputation in security services

Traditional security approaches, like the one used by CloudFlare, maintain information about IP addresses from which malicious activities like spam, malware distribution, and fraud were performed. In CloudFlare’s case the information is collected through [Project Honey Pot](https://www.projecthoneypot.org/) which attracts and tracks malicious activity. The IP addresses of the attackers are then logged to a database for bad reputation.

The assumption behind these lists is that if malicious activity was identified from an IP address, anything from that IP should be flagged as bad. While historically this was sometimes true for specific attacks, like email spam, and may indicate compromised devices, there are many cases today where the IP address on its own is not a strong enough indication because IPs are shared. Exhausting the IPv4 space is one such reason. You see IPs shared between multiple users (home networks), or rotating quickly (mobile carriers), or a large corporation or university using a single IP for its entire campus (where all the users are behind a NAT). Another case where IP alone just won’t help is Tor. This is true for two important reasons. First, a Tor exit node serves many different users making it is hard to distinguish between each user's traffic (due to their anonymity), and second, the architecture of the Tor network makes it terribly easy for a malicious user to switch exit nodes frequently. Blocking a specific IP will not be effective in fending off such an attack.

A Tor exit node on its own could be behind a NAT, for example a single computer in a large university campus. Marking that IP address as bad and blocking it will impact many innocent bystanders, potentially long after the attacker has already moved on and utilized a different address.

Our conclusion is that relying on IP reputation as the sole indicator is highly susceptible to false positives (blocking legitimate users), and in the case of Tor network the risk is even higher. Even if you simply don’t want to allow any access by anonymous users, relying on the IP addresses is not enough, as they may carry requests/users that aren’t using Tor.

The correct approach for detection should be based on the actions themselves, and should be based on a stronger indication than the IP address or its historic reputation. It is true when trying to positively identify a Tor session (not simply relying on the IP list of Tor exit nodes), and it is especially true when trying to separate malicious Tor users from legitimate ones.

In general, we believe that it is important to detect and mark specific requests from Tor users appropriately and to make this information available to the site owner. We also believe that the indication should be combined with actual indicators of malicious activity in order to block or alert on a specific malicious user or session. Offering the information and the power to the site owners will help them determine how they want to handle such requests.

## Anonymity - not a problem for most

For many services, anonymity of a user is not a concern. If I’m running an online store, I wouldn’t want to block a user and lose potential revenue just because the user cares more than the average person about his browsing privacy. Through the process of browsing the site, adding items to the shopping cart and completing a checkout process there are many other indications that can help us determine with much higher accuracy, if the user is committing fraud, or whether the user is a human or a bot. Tor may be one such indication, but it isn’t the strongest one, and it alone shouldn’t be used to determine the user’s intentions.

By honing in on the actual indications that identify bots and malicious users one can actually offer a much better service to such site owners, reduce the amount of false positives, and help the retailer maximize the potential revenue while limiting the risk by detecting fraudulent users more accurately.

## Geo-targeted and Geo-fenced services

While many services out there may not care about anonymity, for some the ability to accurately detect that a user is anonymous is extremely important.

Some services, by definition, are limited to a specific geographic location. This is referred to as “geo-fencing”. One example is broadcasting sporting events. In many cases the broadcaster has distribution rights only for a specific location. When a user tries to access the content, the broadcaster needs to verify where the user is actually coming from, and will only offer the service/content within the permitted location. Anonymity in such a case is unwelcome, and for the broadcaster to comply with his license, anonymous users must be blocked.

Accurate geographic location is also critical for advertisers. An advertiser is willing to pay to show specific ads to some targeted local or regional audience. There is no point in showing an ad promoting a sale in San Francisco for a user that is actually from Paris and is browsing through an exit node in San Francisco. Applying a policy like the one in this example is called “geo-targeting”. The advertiser needs to accurately identify the user’s location in order to accurately place and be paid for targeted advertising.

These are just two of a variety of use cases where site owners would want to block access from anonymous services like Tor.

## Detection by action, not by association

Relying on the IP address alone is simply not a good enough solution. We need to positively assert that a session is an anonymous session, and more importantly - we need to positively identify when a session is malicious, or bot originated.

This could only be done by applying deeper behavioral analysis of the user and the session.

Making decisions in this manner rather than using IP reputation will lead not only to a better experience for the users, but also a better solution for the web-site by reducing false positives, and enabling the service for more legitimate users, while maintaining more accurate security measures to block attackers.

It is much harder to do this than profiling and flagging an entire population as suspicious, but it is worth the effort.

## Summary

IP reputation is commonly used today by different service providers to assess risk based on the IP address of the user. While it could be helpful in some cases, in general it is very risky and leads to a high rate of false positives because of shared IP use. Tor is a specific and more complex use-case. By design, an exit node is serving multiple users, users occasionally switch end-points, and Tor exit nodes may originate from behind a NAT.

Could the Tor community at large stand up and fight the use of their network for fraudulent and criminal activities? This is a question for the Tor community to answer, and it won’t be an easy one, as the definition of legal and criminal activity significantly varies between countries and industries.

In our opinion, it is simply a better solution where technology exists for providers to identify and remediate bad behavior of specific users, rather than an entire class of traffic.
