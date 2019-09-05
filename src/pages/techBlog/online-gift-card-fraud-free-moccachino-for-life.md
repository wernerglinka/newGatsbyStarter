---
template: "blog/blog-post"
draft: false

# Metadata
title: "Online Gift Card Fraud: Free Moccachino for Life?"
description: "Online gift card fraud is easy to accomplish, and the potential losses to retailers are significant. Learn best practices to prevent this on your site."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Online Gift Card Fraud...

# Fields
date: 2017-08-07
author:
  - Inbar Raz

blog_title: "Online Gift Card Fraud: Free Moccachino for Life?"
categories: Research
tags:
  - gift card fraud

thumbnail: gift-card-fraud.png
---

Gift cards can be compromised online through bruteforce or “educated guessing” techniques, but to cash in, the cyber criminal may want to show up in person. In 2016, an estimated \$950 million was lost to e-gift card fraud in the US. PerimeterX’ research found it was surprisingly easy to obtain egift card balances and clone online gift cards from some major retailers, and the potential losses are significant. It can also be difficult to even detect the fraud, if the gift card is hacked online, but later used in an actual purchase in store. A number of best practices and detection of sophisticated bot attacks greatly reduce the threat of online gift card fraud.

## The cyber kill-chain

When an egift card is stolen, it may not be used immediately – and may never be used online. Sometimes the attackers are able to clone information that can later be used at the attacker’s choice of place and time, and the incident responders won’t find any evidence of a breach.

To demonstrate such a scenario, we chose a large coffee shop chain that offers a loyalty card program. Customers load their prepaid cards with funds, then use the card to make purchases in stores. By exploiting a series of vulnerabilities and questionable security decisions, we were able to get details for any loyalty card this retailer issued. Then we were able to select any that we liked - attackers would probably choose those with a large balance - and then generate a matching card and use it for an actual purchase.

Naturally, this was carried out in accordance with ethical hacking guidelines, using only cards and funds that belonged to us, and our activity was promptly reported to the coffee shop chain.

## Choosing the Target

Our target company had to match the following requirements:

- Offers membership or loyalty cards that can be used for in-store payment.
- Card balance could – at the time of our experiment – be checked online.
- Very large customer base.

We selected a leading coffee shop chain that offers prepaid, rechargeable loyalty cards. This allowed us to create a scenario that begins with an egift card brute force attack, but ends up in financial fraud in the store.

## Researching the Website

Like many other businesses, this vendor has a webpage that allows you to check the balance of your card:

![Coffee Card Statement](/assets/images/blog/coffee-card-statement.png)

All one had to do, prior to us alerting this retailer of the vulnerability was to enter the card number as it appears on the card:

![Coffee Card](/assets/images/blog/coffee-card.png)

However, while the card itself contains five additional security digits - 95912 in this example - those digits are not required for querying the balance. In response to a query, you get not only the current balance, but also the recent activities performed with the card:

![Coffee Card Balance](/assets/images/blog/coffee-card-balance.png)

As it turns out, the card numbers are sequential. Since the five additional digits don’t participate, an attacker could simply enter any card number they want.

## Researching the Card Data

At that point, we had the balance information and recent activity data for 1,000 cards. Naturally, a real attacker would have scanned the entire card arsenal and would have obtained much more data, but the data we obtained was enough to pick a victim card that had funds we could steal.

The next step was to research the contents of the magnetic stripe. By figuring that out, we would be able to generate the magnetic stripe data for any card we wish.

Inspecting the magnetic stripe data revealed information beyond the card number that we already had. That information had to be deciphered completely in order to be able to recreate the data for a different card number. Most of the fields were quickly understood, and only the last one - we suspected it was a checksum - remained unknown.

A few more minutes was all it took to solve the mystery, and then we had all the information needed to create a fake, duplicate card and use it in stores.

## Completing the Flow: Execution and Exploitation

This was the sequence of the entire exploit:

1. Enumerated on a range of cards, obtained their balance information and picked a victim card.
2. Generated the magnetic stripe data based on the card number.
3. Overwrote another card with the newly generated data.
4. Used the balance on the card to make fraudulent purchases.

After successfully overwriting the magnetic stripe of card #2 (the clone) with the generated data of card #1 (the victim), we went to a branch of the coffee shop and ordered a cappuccino and a cheesecake. We handed over the forged card and successfully completed the transaction.

## Disclosure

After successfully completing the attack, we prepared a detailed report. The report was sent to the chain headquarters on April 20th 2017 and within hours we received a call from the company’s CISO, who had been unaware of the security gap, and requested additional information from us.

## What can website owners do?

**1. Monitor anomalous traffic**
Best practices for a website or service include monitoring a site for anomalous traffic or query patterns. If the wholesale testing of account credentials, or card balances as in this case, occurs in a rapid succession, it’s not difficult to set up volumetric rules to deter access.

**2. Impede Balance Checking**
Service functionality itself needs to be evaluated to see if it facilitates fraud. It was probably an oversight to allow unrestricted access to check the balance of any card. Pushing that functionality behind an account login, and limiting detection of balance to the account owner, would severely restrict the testing that was shown in this example.

**3. Block Non-Human Traffic**
More advanced attacks are designed to circumvent volumetric limits, with lower access rates, and diverse request IPs via a botnet. Protection then needs to be equally sophisticated in detecting the undesired behavior. Preventing this type of financial fraud requires either service-specific detection, in this case watching for clues such as many incorrect account credentials or card numbers, or more universal protection in blocking non-human traffic from the service.

## Summary

As we’ve shown here, an online gift card brute-force attack can be just the first step in a larger, more dangerous attack, commonly involving fraud. By getting access to account information, attackers can choose a gift card to their liking, applying almost any set of parameters, and then proceed to drain funds associated with that account.

This particular case also demonstrates another important point: Unlike traditional breaches, where any number of logging or monitoring systems can help, forensic investigation needs to reconstruct the entire attack. Parts of the attack are carried out offline, at a different time and place. As a result, it is very hard to connect the two events - first the online attack and then the fraud - or even to detect the fraud at all.

Businesses should go out of their way to block bot attacks. The damage inflicted by these attacks may appear somewhere else, and it might be irreversible.
