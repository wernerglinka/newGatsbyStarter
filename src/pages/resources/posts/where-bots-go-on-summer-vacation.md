---
template: "blog/blog-post"
draft: false

# Metadata
title: "Where Bots Go On Summer Vacation"
description: "Bots are impacting our everyday lives, now competing with us on our vacation searches. Online travel sites need to take into account bot traffic to provide accurate pricing and stay competitive. As bots continue to mimic human behavior, bot mitigation should top of mind for travel websites."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: Where Bots Go On Summer Vacation

# Fields
date: 2019-07-31
author:
  - Liel Strauch

blog_title: "Where Bots Go On Summer Vacation"
categories: Thought Leadership
tags:
  - Scraping
  - automated attacks
  - bot attacks
  - e-commerce-security

thumbnail: bot-vacation.jpg
---

![Where Bots Go On Summer Vacation](/assets/images/blog/bots-vacation.jpg)<br>

**With each passing vacation season, bot traffic to travel sites continues to grow, often outpacing real human searches. Most popular destinations for the bots include Iceland, Bangkok, Los Angeles, and New York.**

You won’t see them in the security lines and they are unlikely to sit next to you in First Class. But summer travel is not just a human phenomenon. Each summer, an army of bots descend on travel sites across the web, checking out prices of flights and hotels in a literally mindless quest to scrape intelligence. So where do the bots want to chill by the pool or take in the city sights? Over the July 4, 2019 holiday weekend, we saw an interesting trend: bot searches for airport codes such as Los Angeles and New York City airports were similar to humans. However, bots largely ignored airports like Denver and Las Vegas, that were vacation targets for human searches. So what the bot is happening here?

## The Bots of Summer

Numbering in the billions, bot armies are unleashed against each other by competing online travel agencies and travel aggregation engines seeking to gain an advantage for their pricing algorithms. In less savory instances, the bots will hoard tickets and prevent real humans from making travel arrangements by making plane or hotel reservations that they never intend to pay for, leaving the highly perishable inventory stranded in online shopping carts. In worst-case scenarios, bots can actually drive up prices and cause planes to fly empty and hotels to run half-full. Because we work closely with leading airlines, online travel agencies, and hospitality chains, we spend a lot of time watching malicious and unauthorized travel bot activities. Here’s what we found in our latest deep dive.

## Bots and Humans Search for Travel Together

Not surprisingly, the volume of bot traffic spikes around the same times that human interest in travel sites spike. This makes perfect sense because bots are a proxy for human interest, filtered through the lens of travel-oriented companies seeking better intelligence for pricing and inventory decisions. The charts below show considerable overlaps between when bots and humans are searching the most.

![Bots and Humans Search for Travel Together](/assets/images/blog/bots-vacation/human-bots-traffic-overtime.jpg)<br>

## Travel Bots Growing As Percentage of Travel Traffic

According to internal research, the percentage of bot traffic to online travel sites has grown by 37 percent on average over the past year. Bot traffic regularly topped 10 percent of total traffic for an extended period between February and May in 2019. During that same period in 2018, bot traffic never hit that mark. We suspect the increase in the presence and volume of bots is driven by two factors. The first is the lower costs and lower barriers to entry of operating bots. The second is the intensifying competition between large travel aggregators that often run big price scraping operations online, powered by bots.  
![Traffic trend increase](/assets/images/blog/bots-vacation/bot-human-traffic-trend-increase.jpg)<br>

## Do Bots Travel More In Winter Or Summer?

The PerimeterX research team looked at the bot and human travel over the past six months for signs of seasonality. Bots do appear to make up a smaller percentage of traffic during warmer summer months and a higher percentage during the colder winter months. This may be due to the fact that bots are checking for summer travel, during March and April, before the season actually begins..

![Bots and Humans Search for Travel Together](/assets/images/blog/bots-vacation/bots-traffic-overtime.jpg)<br>

## Where Were Bots Going in Summer 2019?

During July 2019, overall traffic - humans and bots - hit many of the most popular airports hard. These included the three New York metro airports (LaGuardia, John F. Kennedy, Newark), Las Vegas, the London airports (Heathrow, Gatwick, City of London), and the Bangkok airport. In some instances, bot traffic to some airport codes actually outstripped live human traffic. For example, Keflavík International Airport (KEF) in Iceland was hammered by bots, as was Palma de Mallorca Airport (PMI) in Spain. Berlin and Hamburg airports also saw more bot than human traffic. In fact, more bot traffic than human traffic can badly skew the pricing algorithms of the travel agencies. We suspect the Iceland and Mallorca traffic was driven by bots checking on prices during a fare war. Fare wars can intensify bot traffic as travel aggregators, airlines and online travel agencies (OTAs) play a cat-and-mouse game with their algorithms, closely observing price and availability of seats on other outlets in order to fine-tune their offers and maximize revenues.

![US, Europe and Asia traffic comparison](/assets/images/blog/bots-vacation/us-europe-asia.jpg)<br>

## Where Do The Travel Bots Live In the Cloud?

In order to understand the sources of the travel bot traffic, we looked at where each bot’s IP address was hosted. We found, unsurprisingly, that cloud and hosting platforms served as the main launchpad for the travel bots. Amazon represented the biggest bot hotel in the cloud at 35 percent in both 2018 and 2019. Curiously, when we tracked trends year-over-year, Google Cloud and Cogent Communication grew the most. Bot sightings were up from 2018 to 2019, 2.2 percent at Google and 3.1 percent at Cogent. Bot traffic tripled to 7.5 percent year-over-year at Google and doubled to 6.7 percent at Cogent. It is likely that these are favored hosts for bots because these services provide for easy purchase of IP addresses, as well as rapid and affordable setup of virtual machines and hosts without imposing significant security checks or validations.

![Travel bot IP trends](/assets/images/blog/bots-vacation/traffic-trend-2018-pie.jpg)<br><br>
![Travel bot IP trends](/assets/images/blog/bots-vacation/traffic-trend-2019-pie.jpg)<br>

## Conclusion: Wheels Up For Bots, Flying Higher, And Higher

We learned that bot activity is on the rise at travel sites, that bots search more for summer vacations than winter vacations, and that bot traffic is often higher volume than human traffic to specific travel destinations. We also noted a fairly large shift in the preferred hosting platforms for bot networks focused on travel. If you are a travel agency, aggregator or in a related business, you should be extremely concerned about the skewed data of your pricing algorithms. Bot traffic should always be taken into account in the pricing algorithms, to stay relevant and increase immunity to competitor manipulation.

We will continue to check on travel bots so stay tuned for updates to see what we learn about the busiest travel periods of the year - including the Thanksgiving period in the United States and the summer months in Europe.
