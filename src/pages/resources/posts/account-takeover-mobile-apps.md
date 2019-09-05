---
template: "blog/blog-post"
draft: false

# Metadata
title: "Account Takeover on Mobile Apps"
description: "The latest threat to online vendors, comes from mobile API"
excerpt: "Automated attacks aren’t unique to websites alone. Running mobile applications exposes you to just as much risk of automated bot attacks that hit the APIs meant to serve legitimate mobile users."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: Account Takeover on Mobile Apps

# Fields
date: 2017-09-18
author:
  - Amir Shaked
  - Ori Hamama

blog_title: "Account Takeover on Mobile Apps"
categories: Research
tags:
  - account-takeover

thumbnail: account-takeover-mobile.jpg
---

Automated attacks aren’t unique to websites alone. Running mobile applications exposes you to just as much risk of automated bot attacks that hit the APIs meant to serve legitimate mobile users.

The transition of fraud from credit cards to ecommerce websites is already well underway, and now we see the attacks appear on a new platform: mobile applications.

The attack vector is commonly as follows: starting with user ID and password data stolen from an online service. The stolen credentials are then sold on an underground market and used to automatically scan target sites and mobile APIs. Along the way, the perpetrators collect validated accounts, which can later be used to commit fraud, spam, and malware distribution. There are other ways in which attackers can monetize the validated credentials, such as reselling them at a higher value on the Dark Web.

If you have both a mobile app and a website, you probably see the attackers on one of those (whichever they find is easier for them to abuse), and when you protect one you’ll quickly find them trying to attack the other.

## Tech Spec

From a technical standpoint, mobile applications do very little to protect themselves.
We chose 10 popular applications from the Google Play store in the shopping category, all of which had at least 10 million downloads. We then conducted technical research using only a basic set of tools which almost anyone with rudimentary technological skills can use.

**Steps in the research:**

**Step 1** - We installed an emulator from Android Studio tools.

![android emulator](/assets/images/blog/install-android-emulator.jpg)<br>

**Step 2** - We installed a MITM proxy server - we used Burp suite, but there are many other MITM proxy tools you can use (Fiddler, mitmproxy, etc.).

**Step 3** - We installed the proxy server certificate into our emulator in order to capture all the TLS traffic, including https traffic.

**Step 4** - We installed the application using adb tools.

**Step 5** - We logged in with an account we created, and captured the HTTP request.

<figure class="blog-post-image is-larger">
    <img class="has-dropshadow" src="/assets/images/blog/python-script.jpg" alt="phyton script" />
    <figcaption>Click image for larger view</figcaption>
</figure>

**Step 6** - We wrote a Python script to replay the login attempt with different credentials. The purpose of the script was to get an indication of the success of the various login attempts, and to be able to run the script as many as times as necessary to facilitate account enumeration. We attempted to use it 20 times from the same IP address, which is far more than the attacks we typically see, and many more than in the attack described later in this post.

<figure class="blog-post-image is-larger">
    <img class="has-dropshadow" src="/assets/images/blog/python-script-in-editor.jpg" alt="phyton script in editor" />
    <figcaption>Click image for larger view</figcaption>
</figure>

We conducted this process on every app in the popular applications list, and the results were troubling:

Six apps were easily abused for login enumeration.Two other apps had simple defense mechanism, that were bypassed by a doing additional request to get a preliminary token. The last two had certificate pinning, which is an excellent basic protection against MITM proxy, but this defense can be defeated with real-time debugging.

A couple of hours of work were enough to prepare an attack on potentially millions of accounts.

## ATO Data Example

The technique isn’t hard, and the threat is very real.

**Attack One - Mobile App**

One such example, shown below, shows the attackers’ progress against one of our customers, and every step of the changes they tried to bypass detection, using simple (yet effective if you don’t have protection) techniques.

The following graph depicts different account takeover (ATO Attacks). The bubble size represents the number of login attempts, while the Y-axis shows the average number of attempts per IP address. The closer to zero the average number per IP address, the more distributed the attack.

<figure class="blog-post-image is-larger">
    <img class="has-dropshadow" src="/assets/images/blog/attack-one-graph.jpg" alt="attack on mobile app" />
    <figcaption>Click image for larger view</figcaption>
</figure>

Attacker B used very few machines, and they originated from cloud providers. This attack is simple to detect and block by means of source IP classification, applying volumetric rules or rate-limiting. Attacker B’s method was exactly as described above, with no variation.

Attacker A was more sophisticated, and tried several approaches. On all attempts, the attacker used rented botnets with numerous clean IP addresses, with an average of 5 to 20 attempts per IP address, in order to bypass volumetric detections. Initially they used the HTTP request as described in the previous section. When it failed, they tried changing the User-Agent in the request from iOS to the Android one - there is good logic behind it, as some protection signatures are version specific. Two months passed quietly until they returned, this time changing multiple HTTP headers in their attempt. This method can trick specific signature detection, but can be identified by running classification on the packets and exposing the anomaly in the packets’ content.

**Attack Two - Mobile App and Website**

Let’s look at another example, of an attack on both a mobile app and website belonging to the same company.

<figure class="blog-post-image is-larger">
    <img class="has-dropshadow" src="/assets/images/blog/attack-two-graph.jpg" alt="attack on mobile app and website" />
    <figcaption>Click image for larger view</figcaption>
</figure>

In this case the attackers initially targeted the website, but once they were blocked there, they switched - within a single day - to targeting the Mobile API. This shows the simplicity of executing such an attack. They moved to conducting more distributed attacks, and trying to change different parameters on the HTTP packet such as User-Agent and other headers. Even while blocked they return to probe the API every few weeks. So even if you manage to divert such an attack, you need to keep an open eye as a determined attacker won’t stop testing you.

## How can you protect your mobile app?

While account takeover on websites isn’t new, mobile application providers are not doing enough to stop this threat that hurts both their users and their bottom line by impacting the user experience and brand reputation.

We can also see they will try and deflect signature detection and volumetric rules, by changing signatures and running more distributed attacks.

To effectively block them you need to analyze your own traffic. Ask the following questions:

1. Which routes did the attacker request and at what sequence and timing?
2. Is it really your app using your backend API?
3. Even if it is, is it running on an emulator or maybe a device farm?

To conclude, you need to constantly monitor your sensitive routes from being abused by someone mimicking your app. This attack could be ATO, but we also see scraping, fraud and scalping carried out on mobile API.
