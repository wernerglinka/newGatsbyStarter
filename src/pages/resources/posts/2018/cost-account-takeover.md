---
template: "blog/blog-post"
draft: false

# Metadata
title: "The True (And Shockingly High) Cost of Account Takeover Attacks"
description: "The True (And Shockingly High) Cost of Account Takeover Attacks"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: The True (And Shockingly High) Cost of Account...

# Fields
date: 2018-06-25
author:
  - Corinna Krueger

blog_title: "The True (And Shockingly High) Cost of Account Takeover Attacks"
categories: Thought Leadership
tags:
  - account-takeover

related_posts:

thumbnail: starbucks-breakin.jpg
---

In 2016, the security team at fitness tracker FitBit noticed big chunks of data from its customer accounts [published on free text storage site Pastebin](https://krebsonsecurity.com/2016/01/account-takeovers-fueling-warranty-fraud/). The data was posted under suspicious headers like “Selling FitBit accounts” and it appeared to contain information about the make and model number of FitBit devices as well as the last time the user had synced the device.

This was an instance of [Account Takeover (ATO)](/topics/account-take-over/), a fast growing scourge that is costing merchants billions of dollars. According to one report that analyzed transactions at over 5,000 merchants in Europe, Asia and North America, account takeover losses by merchants in the U.S. [soared 45% to \$3.3 billion in Q2 of 2017](https://www.thepaypers.com/digital-identity-security-online-fraud/account-takeover-rises-45-percent-puts-online-retailers-at-a-loss-of-usd-3-3-bln/770633-26). This is hardly surprising, given that billions of user accounts have been breached in the past five years. For a list of the [17 worst data breaches of the 21st](https://www.csoonline.com/article/2130877/data-breach/the-biggest-data-breaches-of-the-21st-century.html) century check CSO online here.

The massive Equifax breach alone may have exposed as much as 45% of all United States citizens account information to criminals. What’s more, the soaring number of massive account breaches like Equifax, Yahoo, and LinkedIn, has led to more accurate account takeover attacks. This is because users commonly use the same password in multiple sites, and with the hundreds of millions of accounts exposed, criminals can test and validate them on thousands of different sites with high success rates. Preying on this weakness, criminals can focus on email or username and password pairs that have been proven to work on at least one site. PerimeterX research found that recent account takeover attacks - also called credential stuffing attacks - enjoyed a surprisingly high success rate of 8% per takeover attempt.

## The Anatomy of An Account Takeover Attack On FitBit

Here’s how account takeovers work against companies like FitBit and their customers. A criminal purchases thousands or even millions of email and password credentials on the Dark Web for a relative pittance - roughly \$10 per 100,000 accounts. The criminal then uses a network of malicious bots to try to log in with these user and password credentials to numerous ecommerce sites (Hence the term credential stuffing). The bot network is automated and relentless, often masking its activities by spreading out across tens of thousands of IP addresses attached to connected devices or browsers infected with malware.

Once a bot identifies the working pair, the criminals then use the validated accounts to make unauthorized purchases, drain rewards card balances, or, in the case of FitBit, request replacement devices under warranty (known as “Warranty Fraud”). So the Pastebin postings of FitBit account information were effectively an offer to sell validated, working account information, including user emails and passwords.

With that information, a fraudster could log in to a user account and effectively take it over by changing the email address and password. After taking control of the account, the fraudster would then file a warranty claim asking for a replacement FitBit to be sent to a new physical address. It’s understandable why they would target FitBit. The higher-end FitBits retail for over $200 and, when resold new online, can pull in $100 on sites such as eBay or Craigslist.
Warranty fraud is just one flavor. In another form of account takeover, criminals use the stolen account to order additional merchandise and send it to a freight forwarder who then moves the loot to Eastern Europe or other jurisdictions beyond most law enforcement reach, for online resale. This is [the problem that Avenue Stores dealt with](/resources/case-study-avenue-stores/) when it faced down credential stuffers in the spring of 2017.

Yet another form of nascent account takeovers is to drain the loyalty card balances of accounts. Once the attacker has accessed the card, they can check the balance and use it to purchase products online which it can then ship to a different address. This has been a particularly difficult problem for travel and hospitality companies that have had customers victimized by account takeovers where criminals use regular customers’ loyalty and points balances to purchase vacations and travel.

Increasingly account takeovers target mobile applications. Coffee giant Starbucks has [suffered repeated credential stuffing attacks on its mobile app](https://www.buzzfeed.com/venessawong/my-starbucks-app-was-hacked-for-100-dollars?um_term=.vr1jwjxvw&utm_term=.pd21vlb0Z%23.tbDGVp0lv). Bot networks target the Starbucks mobile API by requesting access to accounts with an email and password combination. Valid combinations grant access. Then the criminals reload the account and use it to create a gift card which is later resold on the Dark Web. This is particularly a problem with mobile apps like these which do not have the capability to request two-factor authentication. The problem is compounded when app operators like Starbucks use the same URL for primary access to its mobile app and for accessing financial transactions.

## Huge Total Cost Far Exceeds Direct Monetary Losses

For companies, like Fitbit and Starbucks, the cost of the lost replacement device or reimbursing a customer is only one small part of the total cost of a widespread ATO. An additional cost is significant time wasted by support teams dealing with upset customers and operations teams dealing with the legal and logistical fallout. Avenue Stores described the process as a “nightmare” with months of time wasted by its support and operations team as they doubled down to identify instances of ATO and make sure it refunded affected customers and let them know how to secure their accounts.

![People broke into my Starbucks App and Charged Me $100](/assets/images/blog/starbucks-breakin.jpg)<br>

On the operations side, as well, when an account takeover happens then operations and finance teams have to not only refund customers if they are charged but also potentially deal with the financial implications of chargebacks from credit card accounts. Merchant banks charge $20 to $50 per chargeback. eCommerce companies cannot necessarily head off chargebacks if their customers report the fraudulent activity to their credit card companies. Excessive chargebacks can have additional costs of higher interest rates paid by eCommerce companies they are labeled as carrying a high risk of fraud. Additionally, an eCommerce company’s operations and finance teams must spend time working with fraud detection teams to stop the account takeover attack ring. Starbucks apparently has struggled with the credential stuffing problem for a number of years. Another significant cost is the reputational and brand damage when angry customers complain (sometimes very vocally on Twitter and on other social media) and when media picks up the story and covers it as it did with Starbucks. There is also the time cost to customers, who have to cancel credit cards, change account names, and reset accounts. This is not factored in directly but clearly weighs on brand reputation and may result in customers leaving the fold in frustration or anger.

These cascading factors compound to make fraud costs mount far above the actual dollar value of stolen goods or services. According to the [LexisNexis 2017 True Cost of Fraud Survey](https://risk.lexisnexis.com/insights-resources/research/2017-tcof), “Every dollar of fraud costs organizations nearly 2 ½ times more than the actual loss itself.” The survey of 1196 retailers and financial institutions found that eCommerce companies actually face higher fraud costs than most other sectors.

In the case of FitBit, for example, those costs would likely be $700 to $1,000 per successful takeover, across shipping the device, figuring out and cleaning up the ATO, informing the user, and performing forensics to identify the source of the ATOs and try to stop them. In the case of Starbucks, the coffee giant not only must reimburse the customers for the errant charges but it must also honor the illegal gift cards unless it can figure out how to stop them in time. As illustrated by the BuzzFeed article, as well, there is not only an individual customer reputational risk but also the risk that the company ends up in the feeds of millions of news consumers as an example of where not to do business online or in a mobile app.

The moral of all this? An ounce of prevention is usually worth a lot more than a pound of cure in the case of account takeovers. Companies should be anticipating account takeover attacks by putting in place strategies to block account takeover bots as soon as they show up and to smoothly mitigate customer relationships damaged from the attack, reducing financial chaos should the criminals succeed in taking over significant numbers of accounts.
