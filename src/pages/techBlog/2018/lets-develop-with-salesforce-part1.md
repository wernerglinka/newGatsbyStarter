---
template: "blog/blog-post"
draft: false

# Metadata
title: "Lets Develop With SFCC - Part 1: Setting Up Your Development Environment"
description: "A blog series about developing a cartridge for Salesforce Commerce Cloud"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: Lets Develop With SFCC - Part 1

# Fields
date: 2018-04-17
author:
  - Johnny Tordgeman

blog_title: "Lets Develop With SFCC - Part 1: Setting Up Your Development Environment"
categories: Engineering
tags:
  - JavaScript
  - SFCC

thumbnail: sfcc-1.jpg
---

![post logo](/assets/images/blog/sfcc-1.jpg)<br>

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@igormiske?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Igor Miske"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">Igor Miske</span></a>

Recently I got the chance to work on (and get certified 🎊 🎉 in) Salesforce’s eCommerce platform — Salesforce Commerce Cloud (SFCC for short). One thing I noticed almost immediately is the lack of community documentation of the platform, so I decided to document my road to developing a cartridge - a foundational concept of the Commerce Cloud Digital development architecture.

To kick things off, let’s set up the development environment we will use throughout our development process.

## Step 1: Install the Necessary Software

**Eclipse**

Download and install the latest Eclipse from [https://www.eclipse.org/](https://www.eclipse.org/)

**Java JDK 8**

Download and install Java 8 JDK from [http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

**UX Studio**

Salesforce Commerce Cloud development and debugging is done through an Eclipse plugin called UX Studio.<br/>
To install UX Studio:

1. In Eclipse, select _Help_ > _Install New Software_.

2. Click _Add_.<br/>This opens the Add Repository dialog.

3. Enter the following details:

- **Name**: UX Studio (or anything you like really)

- **Location**: [https://developer.salesforce.com/media/commercecloud/uxstudio/4.6](https://developer.salesforce.com/media/commercecloud/uxstudio/4.6)

4. Check the box next to _Salesforce Commerce Cloud_ and click _Next_.

5. Continue through the _Install Details_ dialog until you are asked to restart Eclipse. Congratulations, you are now one step closer to starting the cartridge development!

The following GIF shows the entire installation process:

![](/assets/images/blog/sfcc-install.gif)

## Step 2: Connect to Your Sandbox Server

Now that you have all the necessary software installed, let’s connect to our sandbox server.

1. Change Eclipse to _Digital Development_ perspective by clicking on the _Window_ menu -> _Perspective_ -> _Open Perspective_ -> _Other_ and select _Digital Development_.

2. Click on _File_ -> _New_ -> _Digital Server Connection_ to open the new server connection dialog.

3. In the _New Digital Server Connection dialog_, fill in the _server host name_, _user name_ (same as your Business Manager user name) and _password_ (same as your Business Manager password) fields.

4. Once done, click on _Next_.

   ![](/assets/images/blog/sfcc-install2.png)

5. In the _Code Staging Directory_ dialog, choose _version1_ for _Target version directory_ and click _Finish_

   ![](/assets/images/blog/sfcc-install3.png)

6. The Digital API will begin to download at this point (you can see the progress on the bottom right corner of Eclipse). Wait for it to complete.

Congratulations 🎉! You now have a fully working development environment for SFCC.

In part 2 we will use our environment to create a storefront (the term SFCC uses for an online commerce experience/website) that will serve as the host for our developed cartridge.

To read more about SFCC and its capabilities, refer to the [official SFCC documentation](https://documentation.demandware.com/DOC2/index.jsp).
