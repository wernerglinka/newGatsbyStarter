---
template: "blog/blog-post"
draft: false

# Metadata
title: "Prevent Online Hoarding: How To Prevent Inventory Exhaustion Attacks"
description: "Online product hoarding continues to become a bigger problem for retailers and customers everyday. Learn how PerimeterX Bot Defender stops them!"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techblog/
  - name: Prevent Online Hoarding...

# Fields
date: 2016-12-16
author:
  - Inbar Raz

blog_title: "How ‘hoarder’ bots steal sales from online retailers"
categories: Research
tags:
  - hoarding
  - scalping,
  - application layer denial of service
  - e-commerce security

related_posts:

thumbnail: how-hoarder-bots-steal.png

canonical_overwrite: https://www.internetretailer.com/commentary/2016/12/16/how-hoarder-bots-steal-sales-online-retailers
---

_As originally published in [Internet Retailer](https://www.internetretailer.com/commentary/2016/12/16/how-hoarder-bots-steal-sales-online-retailers)_

These malicious automated attackers continually add hot products to shopping carts, depleting the inventory an e-retailer believes it has available to ship.

Especially during the holiday shopping season, e-commerce websites face a growing variety of automated attacks, from DDoS and Account Take-Over through content and price scraping to [Scalping](https://blog.perimeterx.com/sneaker-bots/) of limited stock items. One type of attack that is less known, but highly disruptive, is Hoarding.

In nature, [Hoarding](https://en.wikipedia.org/wiki/Hoarding) is a general term for a behavior that leads people or animals to accumulate food or other items during periods of scarcity. In e-commerce, Hoarding is the act of constantly adding an item to the shopping cart, without ever completing a purchase. The intent is to deny the hot product from legitimate customers and block the retailer from selling it by keeping it out of stock.

Online stores typically take an item out of the available inventory once it is added to the shopping cart, in order to enable the buyer to complete the purchase and not find out that it is out of stock by the time he checks out. Retailers typically leave an item there for 10-15 minutes before concluding the shopper has left the site and returning the merchandise to inventory. A Hoarding bot will constantly add the item to the shopping cart. When the cart empties and the items get returned back to the general inventory, the bot will quickly add them again.

A legitimate customer might do this once or twice, to keep options open, for example, while checking prices and availability at a competing online store. An automated attack, however, will make many attempts and try to lock up the retailer’s inventory and thus sabotage the sale by preventing other buyers from getting limited stock items. Incidentally, this actually allows an attacker to establish that an item is a limited stock item: Once you can’t add it to your cart anymore—you can figure out the inventory level.

One recent holiday-shopping day, at 00:00:01 UTC, PerimeterX identified an attacker browsing the website of one of our e-commerce customers, a retailer that was conducting a special sales event. After spending about 15 minutes looking at the products on sale, the attacker selected a target product and the attack began.

During the two-and-a-half hour attack, the attacker visited the product page roughly 3,500 times, of which nearly 500 included an attempt to add the chosen item to the shopping cart. The speed of operation, coupled with other behavioral characteristics of the attack, led us to the conclusion that the attacker was using bots (automation tools) to carry out the attack.

Whenever the shopping cart time limit exceeded and the items were returned to the general inventory, the bot would immediately go back to trying to add the items to the cart. However, at no time during the attack was the checkout process completed. No items were actually purchased, and the attack had a clear start and finish.

The first graph shows the number of times the hoarder visited and “watched” the product page. In this graph you can see the clear and sudden start and finish of traffic, as well as the volume of page access during the 150 minutes of the attack:

![](/assets/images/blog/Hoarding1_duration_volume.png)

The second graph shows actual attempts by the bot to add the product to the shopping cart:

![](/assets/images/blog/Hoarding1_addtocart.png)

As the special sales event progresses, you can see that the number of _successful_ attempts by the bot it there for 10-15 minutes shown in the third graph it there for 10-15 minutes declined, as other buyers got their foot in the door and the amount of products remaining in stock decreases. The gaps represent the time it takes for the shopping cart to expire and the stock to be returned to general inventory availability:

![](/assets/images/blog/Hoarding1_addedtocart.png)

Another attack, on a different retailer, started one morning at 09:35:53 UTC and lasted close to 18 hours. It included over 25,000 attempts to add the product to the shopping cart. The graph below shows the distribution of “Add to Cart” attempts over the duration of the attack:

![](/assets/images/blog/Hoarding2_addtocart.png)

Unlike the previous attack, this time the bot was not acting on one target SKU alone, but simultaneously targeted three different products that were on sale:

![](/assets/images/blog/Hoarding2_products.png)

The three products were not deemed as equally important to the attacker, and one of them had 50% of the entire effort directed at it.

## Hoarding: Far-reaching sabotage of online retailers’ business

Online retailers place great importance on stocking hot products to attract consumer traffic, in particular during the holiday shopping season. They take significant risk by “betting” on inventory decisions months in advance.

When bots hoard products, the damage to retailers is multi-faceted:

### Bad bots prevent real customers from buying

Hoarding is actually a particular form of an _Application-Layer Denial-of-Service_ attack. In traditional Denial-of-Service attacks, an attacker abuses the application in order to strain the server and prevent it from operating correctly. In the case of Hoarding, we are looking at a pinpointed business-level denial of service: By exhausting stock without actually purchasing it, the retailer is blocked from selling the product and generating the expected revenue, while also denying the service from legitimate buyers.

Legitimate customers may hoard items on a small scale, but bots can heavily impact the revenue stream of the retailer.

### Malicious bots impact revenue, margins and your customers’ trust

The consequence of Hoarding starts with losing revenue of the hoarded products. It’s a sell that never happens.

It proceeds to impact margins, since after it becomes apparent that hoarded stock was not actually sold, the retailers must aggressively discount in order to move the hoarded inventory, and by then the initial demand has subsided.

Even worse, when the product has an expiration date, for instance tickets to a sports match or a concert, then the unsold inventory can translate to 100% monetary loss -- and frustrated customers, who might never return.

### Malicious bots can distort Open-to-Buy

Many retailers use the proceeds of the sale from one season to fund purchases for subsequent seasons.This is known as the “open-to-buy”, or in consumer terms, your checkbook balance. If merchants can not sell the merchandise for one season, the amount of merchandise they are allowed to buy for the subsequent seasons is reduced. Hoarding impacts sales of hot products in demand and can influence the “open-to-buy” for retailers, as they carefully manage their balance sheets. Bot attacks on key items across a retailer’s assortment could result in substantial short and long term business consequences.

## What can retailers do to prevent such attacks?

### Identify whether your shopper is human or bot

First and foremost, it is necessary to understand that since speed and scale is the name of the game here, most of these attacks are automated. They are carried out by bots/scripts/tools and not by humans, and will likely repeat themselves. As a result, they are easily scalable: An attack could originate in one IP address, but it might as well originate in thousands of different IP addresses, each representing a potentially unique entity.
Determine accurately whether you are dealing with a human or a malicious bot and establish appropriate defenses before attacks wreak havoc on your site.

### Define shopping cart policies

Comparing to the experience in a brick-and-mortar store can help in determining a policy here. A buyer can ask the cashier or salesperson to hold an item for him while he is still shopping, but the store will not hold it for longer than the defined store policy.
The same should apply online: Limiting the absolute time during which users can hold items, for instance by restricting the amount of times they can add the item back to cart, will force the hoarded items back into the general inventory more often, and by that increase the chance of real buyers snagging a product.
Obviously one can limit these stricter policies to limited stock items, that by nature are more likely to be a target for hoarders.
