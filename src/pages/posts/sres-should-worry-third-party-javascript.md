---
template: "blog/blog-post"
draft: false

# Metadata
title: "Why SREs Should Worry More About Third-Party JavaScript"
description: "Javascripts attacks are on the rise and the changing nature of websites & mobile applications is fueling it. These javascript attacks are hard to stop and the post provide solutions on how to fight back."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Why SREs Should Worry More...

# Fields
date: 2019-06-12
author:
  - Ido Safruti

blog_title: "Why SREs Should Worry More About Third-Party JavaScript"
categories: Thought Leadership
tags:
  - Client Side Data Protection
  - Javascript Security

thumbnail: sres-should-worry-third-party-js.jpg

canonical_overwrite: "https://www.forbes.com/sites/forbestechcouncil/2019/06/12/why-sres-should-worry-more-about-third-party-javascript/#3c9f6fb2f525"
---

As Originally published in [Forbes](https://www.forbes.com/sites/forbestechcouncil/2019/06/12/why-sres-should-worry-more-about-third-party-javascript/#3c9f6fb2f525)

![Why SREs Should Worry More About Third-Party JavaScript](/assets/images/blog/sres-should-worry-third-party-js.jpg)<br>

<p>In the summer of 2018, [Ticketmaster and British Airways](https://tech.newstatesman.com/security/magecart-ba-ticketmaster) suffered security breaches that routed millions of customers' credit card information to mysterious IP addresses located in Eastern Europe. The cause of those breaches? Magecart. Magecart is a style of attack on web and mobile applications that involves inserting malicious JavaScript to scrape or harvest user information. Magecart attacks are not unlike those undertaken by physical credit card skimmers.</p>
<p>In the BA and Ticketmaster attacks, an attacker modified an existing script and replaced it with a hacked version modified to skim customer payment information for theft without either the user or the web application publisher’s knowledge.</p>

<h2>Script Attacks Are Growing (And Fast)</h2>

<p>Magecart attacks are the tip of the iceberg. Third-party JavaScript attacks on websites are on the rise. According to prominent security researcher Graham Cluley, tens of thousands of websites have been compromised and [hundreds of millions of people](https://www.grahamcluley.com/join-magecart-webinar/) have been impacted in the past five years. Site operators victimized include some of the biggest names in e-commerce, travel, financial services and online game industries.</p>

<p>Additionally, we scanned the top 18,000 websites of the Alexa website traffic list and found that 70% of the scripts running on those domains are from third-parties. These scripts are all potential targets for JavaScript attacks.</p>

<p>Fueling this wave of attacks is the changing nature of browsers, websites and mobile applications. Websites today increasingly contain JavaScript code from multiple services and JavaScript libraries from third parties. The services let a site add capabilities with a simple integration on the front-end side only -- for example, payment services like Stripe, chat widgets like Olark or feedback capture widgets like Qualaroo.</p>

<p>Open source front-end libraries, such as like jQuery, Modernizr or Facebook’s popular React framework, make it easier to build and maintain websites by shifting the burden for key functionalities out of the site code and into the library. Libraries are used to supply fonts, emoticons and graphics capabilities, among other uses.</p>

<p>Cybercriminals have recognized this reliance on JavaScript as a convenient attack vector. Like various Magecart exploits, these attacks are focusing increasingly on co-opting this third-party JavaScript in various ways to steal customer information. This means modifying the code, skimming or harvesting information and sending it somewhere else. The modified code may only include a few extra lines or it may even be shorter than what it replaced. Many of the attacks are coming from Eastern Europe and parts of the world where enforcement of cybercrimes is lax.</p>

<p>Aside from harvesting sensitive user data, these scripts are also used to insert malware into the browser or desktops of unsuspecting users. The malware might hijack a browser for cryptocurrency mining or, ironically, turn the browser into a node on a global bot network used to break into accounts.</p>

<p>Some common ways malicious script attack types work include:</p>

<ul>
  <li>Directly hacking into third-party services and manipulating the code that is served</li>
  
  <li>Creating third-party services that resemble other third-party services and tricking web and application developers into using them</li>
  
  <li>Inserting code disguised as patches into open source libraries, with the hope the community won’t notice</li>
  
  <li>Creating modules and extensions to common frameworks, like Magento and WordPress, or contributing infected code to such open source server-side modules</li>
  
  <li>Exploiting known holes in third-party libraries</li>
</ul>

<h2>Attacks Can Be Hard To Spot</h2>

<p>These attacks are hard to spot and the behavior changes on the pages are small and selective. For example, we have seen hacked JavaScript code that targets only specific users or regions and code that only acts maliciously when it recognizes credentials for well-known cryptocurrency wallets.</p>

<p>Another smart attack was a malicious script that added a field for a U.S. social security number to the standard information request form for an address, name and email on a travel website. Due to their subtlety and the fact that the malicious code runs outside of the site’s perimeter (directly loaded to the user’s browser from the third-party service), third-party script attacks can go undetected for weeks or months.</p>

<p>Because many companies leverage pieces of the same code to power both websites and hybrid mobile apps, the attack often works on both vectors. This was the case with the British Airways attack; the company’s web application and hybrid mobile app shared code for core functionalities.</p>

<h2>How To Fight Back</h2>

<p>There are a number of steps site reliability engineers (SREs) and security teams must undertake to fight back against such script attacks. For starters, SREs should keep a tight inventory of every third-party script running on every page on a site and regularly check to make sure there have not been new scripts installed or illegitimate changes made to existing scripts.</p>

<p>For all open source components, it's important to monitor bug reports and security updates. Most open source libraries have specific security processes that generally include a subscription to email updates when security issues arise.</p>

<p>Restrict or limit the use of third-party vendors on sensitive pages, like payment or login, where an attack may be extremely painful. Restricting third-party scripts can be done also by using a [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) or loading third-party scripts in separate iframes (inline frames) to limit their access to the rest of the page. However, these methods aren’t easy to implement and may break the functionality of the scripts or page, so they should be carefully administered.</p>

<p>Monitoring services that track the website and look for signs of anomalous behavior are pretty common, though we’ve seen advanced attackers that detect these services and will serve them a clean script while serving targeted users an infected one.</p>

<p>These measures may take considerable time and effort, but the alternative is far worse. Web applications are growing more -- not less -- reliant on third-party JavaScript. Roughly [83% of developers](https://www.infosecurity-magazine.com/news/developers-fail-secure-open-source/) use code components (including JavaScript services and libraries) to build web applications. JavaScript attacks are a convenient way to quietly harvest reams of data for sale on the dark web. It’s a cybercriminal's dream and a web and application publisher's nightmare, but it's one that can be prevented.</p>
