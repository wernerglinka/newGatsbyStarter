---
template: "blog/blog-post"
draft: false

# Metadata
title: "When 'Sold Out' Means You’ve Sold Nothing - Hoarder bots deny inventory and steal revenue"
description: "You’re sold out, but have sold nothing. Hoarders lock up your inventory, which nudges prices up, then presells your inventory at a significant markup"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: "When 'Sold Out' Means You’ve Sold Nothing"

# Fields
date: 2018-04-12
author:
  - Corinna Krueger

blog_title: "When 'Sold Out' Means You’ve Sold Nothing - Hoarder bots deny inventory and steal revenue"
categories: Thought Leadership
tags:
  - hoarder
  - bots

thumbnail: not-sold-out.jpg
---

Hoarding, aka Denial of Inventory, sabotages your bottom line. You’re sold out, but have sold nothing. Hoarders lock up your inventory, which nudges prices up, then presells your inventory at a significant markup on a third-party site, buys a few units from you, and has you ship direct to the customer that the hoarder took from you.

![Hoarder bots deny inventory and steal revenue](/assets/images/blog/not-sold-out-large.jpg)<br>

E-commerce websites face a variety of automated attacks, from DDoS and Account Takeover through content and price scraping to scalping of limited-stock items. Less known, but potentially very costly, is the hoarding attack. Also known as denial of inventory, inventory depletion, or inventory exhaustion, hoarding is ruthless and unfair. Due to increased hoarding activity by malicious actors, the OWASP has also added inventory exhaustion to its official list of key threats, and labeled it [“Denial of Inventory”](https://www.owasp.org/images/3/33/Automated-threat-handbook.pdf).

Hoarding is still legal in the United States, although this threat to ecommerce has attracted the attention of Congress and laws may be enacted at the Federal level to criminalize it, in addition to [Scalping](https://www.blumenthal.senate.gov/newsroom/press/release/blumenthal-schumer-udall-and-tonko-announce-draft-of-bicameral-bill-to-block-cyber-grinches-stealing-christmas).

## How eCommerce Hoarding (aka Inventory Exhaustion) Works

Hoarder bots constantly add a product to shopping carts, but never complete a purchase. These automated attackers, by committing hot products to carts, deplete (exhaust) the inventory – or so it appears to the retailer. When a major portion of the available stock is being hoarded, only one person – the attacker - actually knows the retailer’s true inventory level.

## Two Motives

The first motive for hoarding is pure sabotage: to block the retailer from selling a hot product to its own legitimate customers.
The second motive is even more nefarious and infuriating. The hoard-master may try to drive up the market price of the hot product by making it difficult to purchase. This may work best during the holidays, where time urgency surrounds a consumer’s quest to snag a hot product, such as a “new game console” that 10-year-olds are clamoring for, where parents feel compelled to find it.
The hoard-master advertises the item on eBay or Craigslist, meanwhile, at a markup.Once a customer commits to buying at the inflated price, the hoard-master buys – from the retailer - just one of the units it has locked up and instructs the retailer to ship the product to the hoard-master’s customer.

## Profit Without Risk – How is That Legal?

In other words, the hoard-master gets a profit on the arbitrage, without any risk of inventory, advertising, or ownership. It’s much like scalping -- see [our posts on Scalping of the newest Supreme collection](/blog/guaranteed-scarcity-brings-sellouts/) --, but with no financial outlay. It is a perfect business model for the hoard-master, who sells your product, takes advantage of your inventory investment, your warehouse, and your shipping infrastructure – and has a guaranteed profit before spending a cent. It’s somewhat disastrous for the retailer.

## Their Small Gain; Your Huge Loss

The hoard-master’s gain is the markup of all the units sold. The retailer’s losses, in a successful hoarding attack, can be felt in four ways:

1. A **delay for all revenue** stemming from all the inventory the retailer is prevented from selling, which could be hundreds or even thousands of units of its hottest products.
2. If hoarders tie up the retailer’s inventory until demand quiets down, the retailer may be forced to unload units at a discounted price, **hurting its margins**.
3. Retailers may lose **sales of add-on accessories and companion purchases** that customers would make if they were able to purchase the hot product they are trying to buy.
4. Bot attacks on hot products in a retailers assortment can **distort the Open-to-Buy** as retailers carefully manage their balance sheets. The hoarding attack means few or no units actually sell, and there is virtually no revenue to fund more buying by the retailer, in the subsequent season.

In addition, there can be a number of significant and negative consequences of marketing **decisions based on inventory data that is distorted** by the hoarding attack.

## Why Bots Can Get Away with Hoarding All Units of a Product

Online stores typically take an item out of the available inventory once it is added to the shopping cart, allowing the buyer to complete the purchase, rather than lose it to another customer while he or she is entering payment details. Retailers usually leave an item in the shopping cart for 10 to 15 minutes before concluding the shopper has abandoned the purchase.
After that time, the shopping cart releases the merchandise and returns it to available inventory. In a hoarding attack, the units that are released back to inventory won’t stay there long enough for a human customer to buy, because the bot will constantly add the item to a shopping cart again. A legitimate customer might do this once or twice, to keep options open, for example, while checking prices and availability at a competing online store. An automated attack, however, will include many attempts at a high rate, trying to lock up the retailer’s inventory.
The intent is to sabotage sales, by preventing other buyers from getting product that are in limited stock. The attacker is the only entity that knows how many units of the product are locked up in its shopping carts. Once it gets the “Out of Stock” notification, the attacker knows the true inventory level of a product, and can determine whether it is limited enough to force up the price on resale sites and score arbitrage profits.

## Can’t Volumetric Detection See this Repetitive, High-Speed Shopping Cart Activity?

The answer is No. If the attackers use highly distributed attacks, these bots can evade traditional methods of volumetric detection, signature detection, and thus are often invisible to retailers.

## Real-Life Denial of Inventory Attacks

PerimeterX has seen many such hoarding attacks, and documented one that that lasted two and a half hours. The attacker visited a specific product page roughly 3,500 times. Nearly 500 of those visits included an attempt to add the chosen item to the shopping cart.
Whenever the shopping cart’s time limit was exceeded and the product was returned to the general inventory, the bot would immediately resume its attempts to add the available units to a cart. During the attack, no bot ever completed the checkout process, so the retailer was denied revenue for all units the bot hoarded.
Another hoarding attack on a different retailer lasted nearly 18 hours, and included over 25,000 attempts to add a product to shopping carts.

## What Can Retailers Do to Prevent Such Attacks?

The first step is to identify each shopper as a human or bot, since hoarding attacks are automated.
Understand that volumetric detection can be fooled rather easily. An attack can originate from thousands of different IP addresses, with just a few requests from each address. It’s clear that additional defense measures are needed. Behavior analysis of visitor interactions with your product page and shopping carts can identify hoarder, price scraping and other bots, and block their activity.
Looking at the shopping cart, policy changes may be warranted. Setting a shorter time duration for hot items to be held in the cart can help to some degree.

While cart policies can help somewhat, it’s clearly better to stop bots before they even access the shopping cart.
If you suspect you have hoarder or scalper bots on your website, and want to stop them, contact the humans at PerimeterX. Together let’s #KickSomeBOT. [Contact Us](https://www.perimeterx.com/contact-us/)
