---
template: "blog/blog-post"
draft: false

# Metadata
title: "The client-side battle against JavaScript attacks is already here"
description: "The blog talks about javascript security. From methods used by hackers like DOM Modification, Browser Storage Data Access, & Data Harvesting to real-world examples of javascript attacks and how to prevent web apps against javascript attacks the blog discuss it all."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: The client-side battle against JavaScript...

# Fields
date: 2019-06-11
author:
  - Ben Diamant

blog_title: "The Client-Side Battle Against JavaScript Attacks Is Already Here"
categories: Thought Leadership
tags:
  - Client Side Data Protection
  - Javascript Security

thumbnail: client-side-2.jpg
---

![The Client-Side Battle Against JavaScript Attacks Is Already Here](/assets/images/blog/client-side-2.jpg)<br>

<p>In our [previous blog](/blog/client-side-security-blindspot/) post we discussed how client-side code (code residing in a web application)  has become the largest part of a web app, and a popular method for developers to use when they introduce new capabilities into web applications. We touched on how unauthorized modification of client-side code has become a popular method for changing the content or altering the behavior of websites through malicious attacks. We also covered why website operators have no visibility into what happens inside their users’ browsers when their client-side code is changed. We explained briefly how JavaScript code that runs on a website may actually be generated elsewhere in a JavaScript library that is controlled by a third-party vendor or open-source maintainer. And we looked at how these unauthorized changes to otherwise respected and trusted JavaScript libraries run on the client side, through injection of malicious code, are an increasingly popular attack method against eCommerce, travel and finance company web applications.</p>

<p>In this post, we’ll go deeper into the problem. More specifically, we will review how changes to JavaScript libraries made in client-side attacks can alter website behavior without site visitors noticing. We will explore how these types of behaviors can harm end users. These damages include manipulating the user experience, hijacking the user’s session, and leaking or stealing sensitive user data such as sensitive personal information, account passwords, and financial data like bank account or credit card account information. Additionally, this post will also review some of the known recent client-side attacks on JavaScript libraries. We will conclude by covering common approaches to face these threats, what the problems with those approaches might be, and recommend best practices to deal with these threats.</p>

<h2>JavaScript Methods Used by Bad Actors</h2>

<p>Before running through real-life threats and examples, let's review the power JavaScript code has to control and modify what a user sees or experiences in a web application. On every web page, JavaScript code can access, modify, create an alternative for and remove anything from the page. This includes UI elements, object prototypes, storage assets, and network activity. Large portions of website functionality are being executed via JavaScript libraries - snippets of pre-written JavaScript that make it faster and easier to do things. This is a tremendous amount of power and the risk from it is magnified by the fact that there are no easy ways for either site operators or site visitors to know when such changes have been made, and the users are at high risk if a website they are visiting has a breached library or code.</p>

<p>Let's review a few of the common javascript vulnerabilities used by hackers when they breach client-side code (typically via a JavaScript library) to manipulate the application and steal or skim data.</p>

<h3>DOM Modification</h3>

<p>DOM stands for Document Object Model, which is, according to Mozilla,  “...the data representation of the objects that comprise the structure and content of a document on the web.” In other words - the DOM is a key component representing a webpage and the relationship between all of its elements. Malicious DOM modification is any JavaScript code that modifies the webpage by introducing new code that manipulates the DOM. Malicious JavaScript libraries can use this method to execute pieces of code that will present fake content, display unauthorized ads, fabricate a form asking the user to provide their social security number or bank account, and otherwise alter the intended visual experience or functionality of a website from the way it was originally designed by the website operator.</p>

<h3>Browser Storage Data Access</h3>

<p>Modern browsers support several types of web storage. The most common types are [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies), [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), and [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Each storage type serves a different purpose and has a different scope. What's common to the entities above, is that they usually contain sensitive user data. JavaScript running on a web page has access to nearly all types of storage. What’s more, JavaScript can read and change storage key values. In doing so, it can access or modify PII data, social network tokens, affiliation codes, session keys, user histories, clickstreams and more.</p>

<h3>Network Sniffing and Manipulation</h3>

<p>JavaScript code can generate network calls in all kinds of protocols, but it also has the power to [monkey patch](https://en.wikipedia.org/wiki/Monkey_patch) network activity (extend or modify supporting system software locally) and by that modify network calls parameters, content, headers and target domains. It can also replay the same network request by cloning its entire content and modify the target. This can be used to gain unauthorized access to network capabilities to make a browser or a web application appear to be something it is not or fake a user identity.</p>

<h3>Data Harvesting</h3>

<p>Malicious scripts can monitor browser events, form input changes and user interaction. These scripts have the ability to observe, collect and report any kind of data associated with the web page. Usually, this data is captured and exported to an unknown location and an unauthorized server or service using different types of network protocols suggested by the browser. From payment information to personal information, everything is at risk and could be stolen.</p>

<h2>Real Life Threats and Stories</h2>

<p>Let’s review some popular and commonly used threats that have appeared in the last few years. These attacks leverage many of the powers and weaknesses that we detailed about JavaScript in the previous section of this post.</p>

<h3>Digital Skimming</h3>

<p>Digital skimming was all over the media with Magecart group breaching thousands of sites and stealing millions of credit card details from payments pages. Skimming exploits, however, are not new; [Magecart was originally reported on 2016](https://securityaffairs.co/wordpress/52000/malware/magecart-ecommerce-keylogger.html). The idea behind digital skimming is simple: By secretly modifying legitimate JavaScript libraries with the malicious code the attacker monitors payment transactions, harvests credit card numbers and user IDs (and other key payment details) and sends them to a designated gateway to be logged. The common user can’t tell their information was leaked because the original transaction is processed as normal. The website operator, likewise, is unaware that their user’s data was stolen.</p>

<p><strong>Example</strong>: Magecart is the most prominent example of digital skimming and started initially targeting online stores powered by the Magento platform. Since then, it has spread to many other types of commerce platforms. Magecart attacks follow a familiar pattern. Criminal hackers breach the store’s back-end, using unknown or known but unpatched vulnerabilities in the software or in plug-ins used for many eCommerce applications. The hacker then alters the site’s code, directing it to load JavaScript that would monitor and record activity on sensitive pages where payment information is taken from a customer. The rogue JavaScript would send the payment data to a remote server controlled by malicious hackers. Dozens of prominent eCommerce sites have been affected by Magecart, often going months without realizing that their users’ data was being copied away.</p>

<h3>Watering Hole Attack</h3>

<p>In watering hole attacks the malicious group targets a certain group to infect this group with malware (a piece of malicious software that users either install unknowingly or is installed without their knowledge). To achieve that, the JavaScript exploit kit silently monitors users on breached pages, collects their personal info, IP address and other identifying information. If a user matches the group criteria - say, someone who works for a certain government or organization - that user will be redirected to another site operated by the attacker and infected by the malware.</p>

<p><strong>Example</strong>: In November 2018, the research team at cybersecurity company ESET published a note about a watering hole attack against 21 websites associated with organizations in Cambodia, including some high traffic government agency sites. The attack was organized, ESET researchers concluded by a shady group called [OceanLotus](https://www.welivesecurity.com/2018/11/20/oceanlotus-new-watering-hole-attack-southeast-asia/). In this case, the attack is extremely sophisticated, consisting of multiple steps to avoid detection, use of multiple IP addresses per user attack, and multiple stages to verify that the user fits desired criteria before attempting to push malware onto the user’s local environment. In the case of OceanLotus, it is believed to be primarily focused on harvesting sensitive intelligence from government agencies, NGOs, and human rights organizations. This implies the OceanLotus crew are sponsored by some sort of state actor that is interested in this information.</p>

<h3>Session and Credential Hijacking</h3>

<p>Session hijacking is a technique used to steal users’ session in an ‘auth’ protected protocol (like OAuth), and bypass authentication procedures. JavaScript accesses users’ storage assets in the browser or web application, where social network tokens and session credentials are usually kept. In this manner, a rogue JavaScript library or code injection can hijack users’ sessions and authenticate on their behalf using these stolen credentials.</p>

<p><strong>Examples</strong>: There are numerous examples, recent and further past, of these attack types, which can include stealing everything from info stored in Cookies to PII to other useful forms of financial or personal data. In April 2018 reports surfaced about an exploit where criminal hackers were [grabbing Facebook user data](https://techcrunch.com/2018/04/18/login-with-facebook-data-hijacked-by-javascript-trackers/) via third-party JavaScript trackers included on sites and web applications that use the “Login With Facebook” for user signup and authentication. According to those reports, the exploit lets the trackers skim some or all of a user’s PII data provided to the site. This PII data could include name, email address, gender, age range, gender, location, and profile photo. What the trackers were actually doing with the data was not obvious from but apparently, the parent companies behind the trackers sell services to publishers to help them make more money based on data from users.</p>

<h3>Fake Ads Injection and Malicious Redirects</h3>

<p>On today’s web, advertising companies make hundreds of billions of dollars when people visit a website, click on ads or watch videos. Fraudsters take advantage of this market,too, with ad fraud and click fraud. Attackers fraudulently extract money from these flows by injecting compromised JavaScript into libraries or directly onto poorly secured websites. This malicious JavaScript may display fake ads or may automatically click numerous times on ads displayed on a page. The fake JavaScript may also be used to redirect users to another destination that the attacker can use to harvest money from clicks or views or affiliate purchases.</p>

<p><strong>Example</strong>: In April 2019, an [attack against unpatched Google Chrome browsers](https://threatpost.com/easter-attack-apple-ios/143901/) running on iOS devices exposed roughly 500 million users to a Session Hijacking attack by the eGobbler gang, a well-known cybercriminal organization that has a long history of mounting so-called “malvertising” attacks. In this case, as the team that discovered the exploit at [Confiant outline](https://blog.confiant.com/massive-egobbler-malvertising-campaign-leverages-chrome-vulnerability-to-target-ios-users-a534b95a037f), the exploit bypassed the core sandboxing feature in iOS apps that prevents attackers from installing malware. In this particular attack, the session hijack leverages a webpage with adware that has been compromised. The user clicks on an ad that appears to belong to a well-known brand but is actually used to deliver a malware payload. After the payload is delivered, a user would experience unexpected pop-ups that they could not close. When the user clicks on the links in the popup, the eGobbler gang would collect revenue from the clicks.</p>

<h3>Cryptojacking</h3>

<p>This is a newer form of JavaScript abuse. Crytpojacking is when malicious hackers co-opt the computing firepower of a browser or a host machine CPU to perform the mathematical calculations required to mine cryptocurrencies like BitCoin. The cryptohackers do this with hacked JavaScript libraries or compromised third-party JavaScript services. The illegal mining is performed without the owners of the browser or computer knowing it is going on. The operators of the sites running the compromised JavaScript also are unaware of what they are exposing their users to. Cryptojacking is a threat used by criminal crypto-mining groups, like [Coinhive](https://krebsonsecurity.com/2018/03/who-and-what-is-coinhive/).  This group breached JavaScript libraries on multiple popular websites to achieve rogue mining on a broad scope. Other than cryptomining being illegal, it causes users to suffer from a massive drop in their web and computer performance.</p>

<p><strong>Example</strong>:  The Node Package Manager (NPM) is the package registry for all packages used for applications that run NodeJS, the popular server-side scripting language shares that uses JavaScript. NPM is downloaded billions of times per month by site operators updating their NodeJS packages. Because they are written in JavaScript, NodeJS packages are often used to integrate front-end functionalities like payment modules or chat tools. In November 2018, a very popular NodeJS / JavaScript library called “Event-Stream” that had 2 million downloads per week was [compromised](https://www.csoonline.com/article/3324599/hacker-adds-malicious-bitcoin-stealing-code-to-popular-javascript-library.html) after the maintainer of the package tired of the work and handed it over to someone else on GitHub. The recipient of “Event-Stream injected code that included cryptocurrency mining software into the code, exposing millions of visitors to websites that used the package to the placement of the cryptocurrency malware onto their local machines or browsers.</p>

<p>The above examples cover just a small portion of threats resulting from breached JavaScript libraries. As we mentioned previously in this post, the risk to users and site operators is high due to the easy accessibility and enormous power of JavaScript running in the browser. The bottom line here is simple and disturbing. Due to the power JavaScript has in the browser and web applications and the stark lack of security around JavaScript, the Internet is not safe. Browsers are not safe. Neither are they designed to protect end users from JavaScript attacks.   With a recent increase in client-side attacks, there is a dire need to improve our methods and tools for protecting against JavaScript attacks running on the client-side.</p>

<h2>How To Protect Your Web App</h2>

<p>First, let’s be honest. There is no silver bullet technology or service in existence today to protect against all these varieties of attacks. There are piecemeal methods and solutions, but none are very efficient.</p>

<p>We also need to consider the potential cost of true lock-down security of the browser and web applications. In the past decade (and even more quickly in the past five years) web development standards have changed. We develop faster, using multiple teams in different regions to build websites and web applications. Frequently, JavaScript code is added by multiple, and often non-technical, parties in the organization. No one wants to slow down the pace of development and innovation. Striking the ideal balance between flexible, fast and highly collaborative and distributed development methodologies versus improved security is always a challenge and a trade-off. That said, due to the severity of threats facing client-side security and the rising tide of JavaScript attacks, It’s pretty clear we need to consider some broad changes and massively improve the security around web applications development, deployment and operations. Below is a survey of some potential options already in existence, none of which are perfect or comprehensive.</p>

<h3>CSP and Policy Based Services</h3>

<p>Today, web operators can choose one of two ways to handle client-side threats and protect their JavaScript assets from an unauthorized breach.</p>

<p>[CSP (Content Security Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is a secure HTTP-based layer that is built into modern browsers. Using CSP, a web developer can apply content rules on allowed assets. This allows for highly granular control of what content can and cannot be modified by Javascript when a web application loads. That’s great. The downside? CSP is managed by static tags which are not easy to update or programmatically modify. As a result, CSP requires a full redeployment of the entire web app whenever a new policy is applied. While CSP will block any JavaScript code that did not meet its rules, it can also block unforeseen edge cases and impact the user experience. The upshot?  Using CSP to protect application content is a good idea but the tradeoff is that it leads to a longer and more inefficient development process. Equally important, if CSP is [used improperly](https://www.netsparker.com/blog/web-security/negative-impact-incorrect-csp-implementations/), it can significantly slow down your web app, impacting the user experience.</p>

<p>The other alternative is to purchase a service to protect your client-side assets. Unfortunately, the current solutions for protecting the client-side of web applications are all based on managing the policies of what the JavaScript libraries in your application are allowed and not allowed to do. As with the use of CSP, this approach leads to inefficient web development processes and leaves a lot of gray area between the allowed and unallowed methods. Confusion over this gray area can cause significant problems and result in unforeseen problems and performance issues that application users experience - often with unfortunate consequences like slow response times and broken logic inside of the application for what should otherwise be very normal capabilities.</p>

<h2>What's the right approach?</h2>

<p>To avoid changes in current development methods, and to be able to decide in real-time if a newly introduced action is allowed or not, new methods and techniques must be developed. Rather than prescriptive approaches based on filter structures or static tagging, the security layer should live in parallel with the actual context of the web app and be constantly updating in real-time, deriving intelligence from patterns of past and ongoing attacks around the world. With machine learning, this layer should monitor all JavaScript actions on every user session, detect unfamiliar actions and identify known malicious patterns.</p>

<p>When it determines that an anomaly is present, the security layer should make on-the-fly judgments about what is the proper response to the request in the browser (typically a decision tree with options like alert/allow/mitigate). By doing so, security requirements can keep up with the dynamic lifecycle of JavaScript libraries, but also have full control and visibility on any change introduced. This type of capability was not possible until recently due to the limitations on real-time monitoring at the global scale and the resource and latency requirements of machine learning algorithms that must drive this technology. We will cover more about this in our next post.</p>
