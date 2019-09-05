---
template: "blog/blog-post"
draft: false

# Metadata
title: "Prevent Brute Force Attacks, Coupon Fraud, Gift Card Fraud"
description: "Steps every retailer should take to prevent brute force attacks of coupon, vouchers and gift cards. Prevent future coupon fraud on your website with PerimeterX."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Prevent Brute Force Attacks...

# Fields
date: 2017-03-20
author:
  - Inbar Raz

blog_title: "Stopping fraud from brute-force attacks against online coupons"
categories: Research
tags:
  - e-commerce security

thumbnail: How-to-prevent-fraud-from-brute-force-online-coupon-and-gift-card-attacks.jpg

canonical_overwrite: https://www.digitalcommerce360.com/2017/03/17/prevent-fraud-brute-force-online-coupon-gift-card-attacks/
---

_Based on our Article in [Internet Retailer](https://www.digitalcommerce360.com/2017/03/17/prevent-fraud-brute-force-online-coupon-gift-card-attacks/)_

_Blog updated on November 13th, 2017_

Coupons have universal appeal, [92% of consumers used one on a purchase](https://blog.accessdevelopment.com/2017-coupon-statistics) in the past year. Coupons fill the mobile channel, too. 90% of mobile device users have at least one subscription to access coupons and promotions.

Cybercriminals find ample opportunity in these burgeoning categories. Unfortunately, some retailers make it far too easy for coupon bandits. Here is a true tale – and it’s all too common.

Recently, Michael Consumer received a voucher – as a personal gift - for an expensive dinner for two. To use the voucher, Mike first had to activate it on the issuing company’s website:

![](/assets/images/blog/PerimeterX-coupon-fraud-1.jpg)<br>

As Mike entered the final digit in the voucher number, a small green V appeared on screen next to the number, validating the voucher number. If he added an incorrect digit or removed a correct one, the green V changed to a red X.
Mike was surprised to see that the web page was sending each digit to the server as it was typed, and receiving a “Good” or “Bad” response immediately.

Even worse, this trial-and-error could be repeated until an attacker found every number in the code because there was no limit on the rate or count. The situation was perfect for brute-force bots. It wouldn’t even require user credentials to gain access.

Not only that, but Mike figured out that the voucher numbers used a specific format that significantly reduced the number of possibilities to scan through. In fact, it took less than 100 attempts to guess another valid voucher number.
Mike Consumer is also a researcher at a security company, and he warned the issuer of the voucher that it was gravely exposed. Lucky for the retailer, which could easily have ended up paying for a great number of free dinners.

A recent [study from Tripwire suggests](https://www.tripwire.com/state-of-security/risk-based-security-for-executives/risk-management/gift-card-fraud-how-its-committed-and-why-its-so-lucrative/) that criminals are working on a massive scale to crack coupon and voucher codes. Hackers can acquire coupon codes from the issuers, from merchants, or through reward redemption programs. Other methods include phishing, SQL injection, social engineering and accidental disclosure. When they succeed, they either use the codes or resell them on the black market.

The example Mike Consumer happened upon, of a coupon issuer making it easy for hackers, could easily be exploited by a single hacker. To attack coupons on a grand scale, cybercriminals turn to bots.

### Criminals: What’s not to like about online coupons?

Online coupons have several qualities that are very attractive to hackers:

1. They are juicy targets—once a criminal cracks the code, money is within easy reach, via the resale marketplace.
2. They are easily crackable in some cases.
3. The victimized coupon holder may never figure out that a theft took place. The cybercriminal is gone long before discovery, leaving unclear fingerprints.

### How common is brute-forcing gift card and coupon / voucher codes?

While the act of trying to brute-force login credentials (known as Account Takeover, or ATO) is frequently mentioned in the media, statistics are lacking on brute-force attempts on coupon, voucher and gift card codes.

### Ground Zero for Cracking Into Gift Cards

Any retailer that lets someone check their gift card balance online is a target for hackers, as they can validate the code and pin without logging into a user account.

![](/assets/images/blog/PerimeterX-coupon-fraud-3.jpg)<br>

## Who coupon fraud hurts – and what is the damage?

Customers who receive coupons and vouchers might choose to delay using them. If the coupon is cracked before it’s used legitimately, two things happen:

1. Thieves use the voucher and claim the product or the discount, or sell the voucher on the black market.
2. Real customers discover that their vouchers do not work. The retailer has little choice; it must either reissue the voucher or compensate the customers, at an even greater cost.

Typically, for every dollar of fraud committed, a retailer suffers an overall loss of about \$3.10, or triple the fraud amount. Customer service, IT security, and accounting staff time are all consumed in correcting any fraud that impacts a customer.

## Best Practices to Stop Coupon Fraud

Online retailers should take specific, straightforward precautions before putting coupons information online. These measures allow you to better safeguard your customers, their accounts and coupons.

### Don’t put anything valuable in the browser

Some coupons, particularly seasonal ones, are offered to customers on the condition that they complete an action, such as subscribing to a mailing list. Once the customer enters the requested information, the coupon code is revealed.

We’ve seen retailers send out the coupon code in the original HTML page, hidden from view, only to be revealed at the end of the process:

![](/assets/images/blog/PerimeterX-coupon-fraud-2.jpg)<br>

With this questionable approach, simple inspection of the downloaded HTML allows the coupon code to be extracted. The best practice is to have the server verify that the user enters the requested information, and only then send the coupon code.

### Create generic and personalized coupons

Make part of the coupons generic, so everyone can use and share them. Those coupons generate traffic back to your website; customers can share these reusable coupon codes widely and help build traffic. Additionally, according to a recent survey, [85% of consumers](https://www.placed.com/resources/white-papers/mobile-now-the-standard-in-couponing) search for coupons before visiting a retailer’s site. The rest should be personalized and unique, so only the specific customers you want to have them will actually receive them.

### Create coupon codes that are difficult to guess

Many retailers choose codes that are giveaways. A few examples:

1STPURCHASE, JUSTGO, XMASEBOOK, 30OFF, SECRET50, BOOK20, BUNDLE10, SUCCESS10, PROMO20

Online coupons should be random and contain both letters and numbers, to make common or automated guessing a challenge.

A couple of examples for well-constructed coupon codes:

6ZWTL35R74A4VQQPMOY6, D73JO1N8KEQG

While the above coupon codes are not easy to type into a website form, a customer will not be turned off by such a long coupon code because most retailers send confirmation emails with coupon codes allowing customers to simply copy and paste the code into the online form. This method makes it easier for customers to receive discounts, and defeats malicious bot attacks.

### Assign a validity period to every coupon

Online coupons should have a limited validity. “Not valid before …” and “Not valid after…” will solve the problem of an unexpected (or uncontrolled) use rate of the coupons. This is particularly important, if a large number of coupons are generated beforehand, or if the vendor wishes to limit or control the rate of use.

### Validation and enforcement

Verify all the details, such as the coupon number or PIN code, and make sure the coupon is used within the applicable terms and conditions.

Also, retailers should require an additional piece of information, that is much harder to guess, such as email address or a phone number of the gift card recipients in conjunction with the card data itself.

### Strong authentication for online balance checks

Robust authentication should be required before a user can obtain confidential information, and the coupon/voucher number alone should never give access and control. Use an additional authentication factor, such as a PIN code, although these are certainly not foolproof or unbreakable. Adding a CAPTCHA also helps prevent automated checks of card balance.

Although it can be cumbersome for users, require pre-registration and login where this is practical.

### Use a web behavior-based approach to protect from online fraud

To protect your customers and your business, use a behavior-based approach that monitors how users interact with your website by observing their mouse movements and click speed, to detect and block automated attacks. This requires a technology which can distinguish human activity from malicious bot activities.

Attacks on ecommerce websites are already at a crescendo level. Malicious bots make up half the traffic on the average retail site, based on our monitoring across numerous sites and industry statistics.

Automation and more sophisticated bots have made these attacks harder to detect and potentially more damaging to a retailer’s business, impacting customer loyalty and brand reputation. Retailers should prioritize deployment of up-to-date [anti-bot protection](/products/bot-defender/bot-defender-web/), and take common-sense precautions to impede the work of cybercriminals.

_PerimeterX specializes in detecting and mitigating automated web attacks._
