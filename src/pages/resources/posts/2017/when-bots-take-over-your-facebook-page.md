---
template: "blog/blog-post"
draft: false

# Metadata
title: "When Bots Take Over Your Facebook Page"
description: "As people’s lives become more attached to the internet, cyber attacks will have more of an impact. One of the most pressing threats is the growth of botnets, or networks of compromised computers that can be leveraged for a variety of nefarious purposes"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Resources
    path: /resources/
  - name: Blog
    path: /resources/blog/
  - name: When Bots Take Over Your Facebook Page

# Fields
date: 2017-03-30
author:
  - Omri Iluz

blog_title: "When Bots Take Over Your Facebook Page"
categories: Thought Leadership
tags:
  - account-takeover
  - brute-force

thumbnail: bots-take-over-facebook.png

canonical_overwrite: https://www.thecipherbrief.com/when-bots-take-over-your-facebook-page
---

_As originally published in [The Cipher Brief](https://www.thecipherbrief.com/when-bots-take-over-your-facebook-page)_

**As people’s lives become more attached to the internet, cyber attacks will have more of an impact. One of the most pressing threats is the growth of botnets, or networks of compromised computers that can be leveraged for a variety of nefarious purposes. The Cipher Brief spoke with Omri Iluz, the CEO and Co-founder of PerimeterX, about the evolution of bots, the threat they pose, and how industry is looking to mitigate the harm they create.**

**The Cipher Brief: We hear a lot about bots spreading “fake news” on social media platforms. Could you describe what bots are and how they go about disseminating disinformation?**

**Omri Iluz:** Bots are essentially just software that has evolved through the years. We like to categorize them into four generations. The first generation bot is very simple and might be able to scrape data off of your website. A second-generation bot is a little bit smarter. It knows how to log in. We see them trying to attack every day, essentially trying to take over an account. A third-generation bot is starting to look like a normal machine. It can do anything on any website, such as post comments on Facebook. But you can still identify it because it doesn’t come from a user machine.

A fourth-generation bot is a user infected with malware that is simply controlling the user’s browser. They don’t need to take over your email, because you log in to your email yourself, and the bot now has access to it. It can send and receive emails in the background. Once it infects you, it doesn’t need to break your password. It just lives inside of your computer.

From the perspective of the defenders on the websites, the activity appears to be a normal machine, with a normal user and a normal browser. It is much harder to distinguish normal activity from a bot. For example, the bot would wait for you to login to Facebook and bypass all the security checks. Then it would post in your name.

What we see now is botnets, or networks of bots, that generate fake users. They will take your Google information and make a Facebook profile, and now they control the posts. If they control a million Facebook accounts, they can post whatever they want and “like” each other. Suddenly you have articles that could contain any kind of content that you want or drive any political agenda. A million “likes” on a post gets attention anywhere in the world.

**TCB: How do botnets affect attribution?**

**OI:** A botnet opens the door for the attacker to go through what looks like real devices. Look at the Internet of Things (IoT) botnet, Mirai. One of the surprises for everyone in the industry was that a lot of traffic – hundreds of thousands of nodes – came from normal networks, such as people’s homes and stores with cameras. It became hard for the defenders to determine whether it was a human or not. With a botnet, the traffic isn’t just coming from China or Russia, it is coming from hotels in the U.S. and other normal locations.

**TCB: So how do you stop a botnet? I have heard of law enforcement actually hacking into botnets to disable them. What is the method for doing that?**

**OI:** The method of taking over botnets, as the FBI is doing, has been known for a while. When someone writes a new tool and creates a botnet, he would also try to hack into other botnets and steal nodes from them. Law enforcement is just using the same thing to shut down the botnets.

Industry is now starting to take a very different approach. It says that identifying a bot is hard, almost impossible, but identifying humans is still possible. So if I can say, “You move your mouse like a human being, you interact with the website like a human being, your phone gives me all the signals of a real device – I see the sensor information, I see the battery – then I can allow you access.” And if I am not seeing all that, then I am going to block access.

Industry is going to be able to identify the non-human visitors, the bot, but not by looking at their signatures. Companies have tried to look at the signatures of bots before, but this is just a cat-and-mouse game. If they identify the signature of a botnet and start blocking it, the attacker can simply modify that signature a little bit, and now he is able to get in again. Human behavior, on the other hand, is human behavior. If you are able to identify human behavior, then you are able to block any bot.

[...Read the full article](https://www.thecipherbrief.com/when-bots-take-over-your-facebook-page).
