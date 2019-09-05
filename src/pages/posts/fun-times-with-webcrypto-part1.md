---
template: "blog/blog-post"
draft: false

# Metadata
title: "Fun Times With WebCrypto — Part 1: PBKDF2"
description: "Deriving a PBKDF2 key from a known set of parameters"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Fun Times With WebCrypto...

# Fields
date: 2018-02-22
author:
  - Johnny Tordgeman

blog_title: "Fun Times With WebCrypto — Part 1: PBKDF2"
categories: Engineering
tags:
  - WebCrypto
  - JavaScript

thumbnail: webcrypto1-logo.jpg
---

![webcrypto logo](/assets/images/blog/webcrypto1-logo.jpg)<br>
<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@williambout?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from William Bout"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">William Bout</span></a>

This week, my teammate — [Ram Valsky](https://medium.com/@ram_37412) and I received a very unique task: To convert a crypto-related module we wrote in Node to JavaScript using WebCrypto. Since both Ram and I love anything crypto-related, our reaction was as follows:

<div style="left: 0px; width: 100%; max-width: 480px; height: 0px; position: relative; padding-bottom: 78.125%;">
<iframe src="https://giphy.com/embed/5GoVLqeAOo6PK" style="top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>
<p><a href="https://giphy.com/gifs/excited-screaming-jonah-hill-5GoVLqeAOo6PK">via GIPHY</a></p>

## Short Introduction to PBKDF2

PBKDF2 (Password Based Key Derivation Function), like the name implies, is a function used to derive a key from a password which can then be used as a cryptographic key by an encryption algorithm. It aims to reduce the vulnerability of encryption keys to brute force and dictionary attacks.

**When is it used?
**A key derivation function is typically used to secure a password storage and to create a cryptographic key from a password or passphrase (i.e. key stretching).

**What is the advantage of PBKDF2 on top of other hash functions?
**Hash function is designed to be quick while PBKDF2 is purposely slow. The slowing is achieved by adding big number of iterations and a long random salt, which makes the brute force attack on key created with PBKDF2 much harder.

## Deriving a PBKDF2 key

Our first task was to derive a PBKDF2 key from a known set, comprised of a hash function, secret password, salt, iteration count and [IV](https://en.wikipedia.org/wiki/Initialization_vector) length.

We begin by creating the signature for our _getDerivation_ function:

<script src="https://gist.github.com/pxjohnny/91a27b737f37439798a274f7bc50df98.js"></script>

To derive a key using WebCrypto we needed to use the deriveBits function of the crypto.subtle object. There was one caveat though: deriveBits needs the secret password as a CryptoKey object while we only had a string 😕

While browsing through the WebCrypto documentation over at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) we noticed the importKey function. This function basically returns a promise which resolves to a aCryptoKey object based on its parameter. Looking at the input parameters list we noticed something important: A password must be given as either an ArrayBuffer or a JSONWebKey. This is where [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode) class comes into play. TextEncoder exposes the encode function which takes a string parameter and returns a [Uint8Arra](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/Uint8Array)y object, which we can then use for the importKey function!

<script src="https://gist.github.com/pxjohnny/7239e29848bb39fed32e77422520af78.js"></script>

Now that we have transformed our password to aCryptoKey we could use it to derive the hashed key. As mentioned above, we are going to use the deriveBits function to do so. Before calling the deriveBits function we should create an object that holds the configuration for it:

<script src="https://gist.github.com/pxjohnny/9a7e9f61201cd3148729207612830e77.js"></script>

👉 Please note that just like the importKey function, deriveBits requires the salt to be passed as an ArrayBuffer and not a simple string.

Calling deriveBits require three parameters:

1. The parameters object we created earlier

1. The secret key we imported earlier

1. The number of **bits** we wish to derive

<script src="https://gist.github.com/pxjohnny/2177a234578eddc56a917c42ee12c30e.js"></script>

😱 You may be asking — Why did we multiply the keyLength by 8?

<div style="left: 0px; width: 100%; max-width: 480px; height: 0px; position: relative; padding-bottom: 56.25%;">
<iframe src="https://giphy.com/embed/9lMoyThpKynde" style="top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>
<p><a href="https://giphy.com/gifs/adventure-time-math-finn-the-human-9lMoyThpKynde">via GIPHY</a></p>

If you recall in the beginning of the post I mentioned we are going to decrypt an object that was encrypted in NodeJS. NodeJS uses bytes, so the key length we used (48) was, in reality, 48 bytes.
WebCrypto however, uses bits. Thus to tell WebCrypto we wish to derive 48 bytes from the deriviation, we multiple it by 8 and get the bits value of the key length (48\*8=384).

## Sum it all up!

WebCrypto syntax may seem strange at times, but it’s actually pretty easy to use. We found out using bits instead of strings makes things easier to work with, as no conversion is done to them in the process.

In part 2 we will describe how to use the PBKDF2 key that we derived and use it with the encryption and decryption modules of WebCrypto.

🔥 Special thanks to [Ram Valsky](https://medium.com/@ram_37412) and [Barak Amar](https://medium.com/@nopcoder) for helping me with this post!
