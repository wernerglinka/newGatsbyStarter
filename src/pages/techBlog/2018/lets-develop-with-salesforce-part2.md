---
template: "blog/blog-post"
draft: false

# Metadata
title: "Let's Develop With SFCC - Part 2: Creating a Development Storefront"
description: "A blog series about developing a cartridge for Salesforce Commerce Cloud"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techblog/
  - name: Lets Develop With SFCC - Part 2

# Fields
date: 2018-07-12
author:
  - Johnny Tordgeman

blog_title: "Let's Develop With SFCC - Part 2: Creating a Development Storefront"
categories: Engineering
tags:
  - JavaScript
  - SFCC

related_posts:

thumbnail: sfcc-part2-1.jpg
---

![post logo](/assets/images/blog/sfcc-part2-1.jpg)<br>

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@mikepetrucci?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Mike Petrucci"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Mike Petrucci</span></a>

Missed part 1? Catch up [right here](https://www.perimeterx.com/blog/lets-develop-with-salesforce-part1/)!

In this segment of the "Let's Develop with Salesforce Commerce Cloud" we are going to setup a storefront. A storefront is basically the term SFCC uses for an e-commerce website, but it can also refer to just about any application, be it a native mobile app or an in-house employee benefits portal. A storefront is a foundational concept of SFCC development, as everything you develop for the platform is, ultimately, hosted on a storefront.

## Setting up SiteGenesis

To help us get started quickly with our site, SFCC provides us with a full fledge sample e-commerce site called SiteGenesis which includes all sort of sample objects such as ISML templates, controllers and scripts.
To install the SiteGenesis storefront:

1. In Eclipse, go to **File** > **New** > **Other**.

2. Select _SiteGenesis Storefront_ and click _Next_.

3. Enter a root name and location for your storefront and select which digital server to attach the SiteGenesis to. Click _finish_.

![](/assets/images/blog/sfcc-sitegenesis-1.gif)

<br>When finished, you will see some new objects in your Project Explorer:

- A folder named **&lt;root name&gt;\_core** — contains all the core elements of the website, such as: images, pages, css files etc.

- A folder named **&lt;root name&gt;\_controllers** — contains all the JavaScript controllers that contain the logic of the site.

- A folder named **&lt;root name&gt;\_pipelines** — the same as controllers, but uses legacy pipelines instead of JavaScript.

❤️ Please note:
These folders are, in essence, cartridges. Cartridges are a fundamental concept of Commerce Cloud, used for packaging and deploying code. In Part 3 we are going to build our very own cartridge so take a minute and have a look at the content of these folders and how they are organized.

The new cartridges will now be uploaded to the Business Manager site. In order to use any of them however, we will have to register them first.

## Registering the SiteGenesis Cartridges

Registering a cartridge is done through Business Manager and is simply a matter of adding the cartridge name to a list of used cartridges.

It is important to note the order of importance of the list. Contrary to what you may expect, the order of importance goes from left to right, meaning the cartridges at the left take precedence over cartridges at the end of the path.

To register the core cartridges on your site:

1. In Business Manager click **Administrations** > **Sites** > **Manage Sites**.

2. Click the **Settings** tab.

3. Under **Cartridges** add **&lt;root name&gt;\_core** to the cartridges list as the first item.

4. Add **&lt;root name&gt;\_controllers** to the list (separated by a colon) to add the JavaScript controllers functionality, or **&lt;root name&gt;\_pipelines** for the Pipelines functionality. Click **Apply** to save the changes.

The end result should be **&lt;root name&gt;\_core:&lt;root name&gt;\_controllers** in case of controllers, or **&lt;root name&gt;\_core:&lt;root name&gt;\_pipelines** for pipelines.

![](/assets/images/blog/sfcc-sitegenesis-2.gif)

## Viewing SiteGenesis

Now that our cartridges are uploaded and registered, we ready to roll! Head over to your site url, and if all went well you should be greeted with the following:

![](/assets/images/blog/sfcc-sitegenesis-3.png)

<br>
And there you have it. A full fledged e-commerce website running on SFCC waiting for our custom cartridge 🎉.

In Part 3, we will develop a custom cartridge — which is how you can add custom business logic and functionality to your site.

To read more about SFCC and its capabilities, refer to the [official SFCC documentation](https://documentation.demandware.com/DOC2/index.jsp).
