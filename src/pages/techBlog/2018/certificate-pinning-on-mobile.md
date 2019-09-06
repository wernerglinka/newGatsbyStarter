---
template: "blog/blog-post"
draft: false

# Metadata
title: "Certificate Pinning on Mobile Applications"
description: "Deriving a PBKDF2 key from a known set of parameters"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: Certificate Pinning on Mobile Applications...

# Fields
date: 2018-03-06
author:
  - Ram Valsky

blog_title: "Certificate Pinning on Mobile Applications"
categories: Engineering
tags:
  - HTTPS
  - SSL
  - Certificate Pinning
  - SSL Pinning
  - Mobile Security
  - Best Practice

thumbnail: adrien-296945-unsplash.jpg
---

![m logo](/assets/images/blog/adrien-296945-unsplash.jpg)<br>
<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@adrien?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Adrien"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">Adrien</span></a>

When developing a mobile application securing the communication of the application with the backend server is critical to protect the users data and transactions. The first step in securing this communication channel is ensuring it is encrypted, typically using HTTPS to secure the connection.

HTTPS (or [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security), the protocol used to secure the transport layer for HTTPS) provides two main benefits:

- A secured method to encrypt the communication, preventing eavesdroppers access to the delivered data

- Verify that the application is communicating with the specified backend service/server, and not some other malicious server trying to hijack the application (like in the case of a Man in the Middle attack)

While TLS is the De Facto standard for web security, you will find that counting on TLS alone is not enough.

What is missing is the verification that the server’s certificate is exactly the one that you expect and trust, and not some tampered certificate that was signed by some different Certificate Authority (CA). This is where the key difference between a web browser and a native mobile application comes handy: while a browser can be used to access any site or server, a native mobile application typically “knows” in advance with which servers it should communicate, giving the ability to the application developer to add further restrictions on the servers it access and its communication settings.

## Introducing certificate pinning

When a TLS connection is created, the client by default checks two things:

- The requested hostname matches the subject name in the server’s certificate
- The server’s certificate has a valid chain of trust, all the way to the root certificates

Certificate and Public Key Pinning is the process of associating the hostname with a specific certificate or public key. This association means that the client, on top of the standard certificate validation done when establishing a TLS connection to the specific hostname, will also verify the additional associated restriction on the certificate.

This additional restriction protects the user from unauthorized attackers trying to hijack the connection and take control of communication to a specific host, even when they managed to produce a valid certificate that isn’t the one the application owner approved.

Such attacks can happen by getting certificates from rogue and compromised CAs, as witnessed in recent years where attackers managed to get a legitimate certificate for domains they don’t own, for example the attack on Comodo in 2011 resulted in issuance of 9 rogue certificates for mail.google.com, www.google.com, login.yahoo.com, login.skype.com, addons.mozilla.org and login.live.com.

While attacks on CA authority are very dangerous and can immediately put millions of people at risk, they are less common than the emerging trend of phishing attacks targeting the end user. Mobile users are tricked into installing a malicious root certificate in phishing attacks and through social engineering, while connecting to public networks or infecting users with malware through malicious mobile applications.

By issuing a rogue certificate, or manipulating the client’s root certificate attackers can get around the basic safety controls of TLS, however, when pinning is used, without getting a hold of the actual pinned certificate or the key-pair used to issue the certificate, the attacker won’t be able to manipulate the user to trust the rogue server.

## What can be done with malicious certificate?

<div style="left: 0px; width: 100%; max-width: 480px; height: 0px; position: relative; padding-bottom: 78.125%;">
<iframe src="https://giphy.com/embed/1q24y15S8DIcw" style="top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>
<p><a href="https://giphy.com/gifs/1q24y15S8DIcw">via GIPHY</a></p>

Rogue certificates allow attackers to execute variety of MITM attacks.
MITM attack is when someone can eavesdrop or alter the communication between the client and the server. MITM attack do not require physical access to a device.  
Attacker can use rogue certificate to redirect users into illegitimate sites and servers that are indistinguishable from the real site and servers, such that a client who does not use certificate pinning will not be able to tell the difference because the certificate validation will pass. The attacker can easily steal the users private data and perform transactions on his behalf.

An attacker can use malicious certificate to abuse any API. The first step of such attack is inspection of the network traffic.
Inspection of the traffic from mobile device can be easily done using network inspection tools like Charles, Burp and MITM proxy.

Using these tools the attacker can watch all your API calls, learn the protocols you use and the endpoints you communicate with even when the traffic is encrypted by TLS. To execute this, the attacker only needs your application installed on his mobile device with his own homemade root certificate added to the list of trusted CAs. In many cases learning your protocol from the network traffic is sufficient to execute large scale attacks on your API such as DDOS, ATO and scraping without even running your mobile application nor a real mobile device.

Only in case network inspection is not sufficient to execute the attack, the attacker would go further for reverseing your application. In most cases attackers do not have the tools, the resources or the incentive to go this deep, thus they will continue to their next target.

Two major things that need to be done in order to prevent MITM attacks:

1. Educate users not to install custom certificates on their device.

1. Implement certificate pinning.

Because educating the users is a long process and frankly it’s not in your hands, i recommend going for certificate pinning!

## Recommended actions

Certificate pinning means storing a copy of your server’s certificate on the application to ensure that only TLS connections to servers with matching certificate will be made. Certificate pinning will protect your network traffic from being inspected and prevent your users private information from being stolen by attacker even when the user has malicious certificate installed.

### How to handle certificate pinning error?

In case the application encounters certificate pinning verification failure, the application can adopt one of two behaviors:

1. Soft fail - Let the application create connection with the server and log the verification failure in the system

1. Hard fail - Stop the application from creating connection with the server. This is the more secure way, but can hurt the user experience.

### What exactly should you store/pin?

There are two options:

1. Pin the certificate

1. Pin the public key (SPKI)

There are cons and pros to both of the options, but the recommended one is pinning the public key. Pinning the certificate seems like the easy solution, but actually Pinning the public key gives your more flexibility. Typically certificates are valid for one or two years, so when pinning the certificate the application won’t be able to operate once the certificate expires. When pinning your public key, or the public key of the CA, you can easily issue new certificate and revoke an existing certificate without breaking your existing application, as long as the new certificate is issued with a CSR using your pinned key-pair.

### Which public key should you pin?

There are many options here, you can pin any of the public keys in the certificate chain of trust. If you think you are less likely to be breached then your root CA you should pin your certificate’s public key. We recommend choosing a good trusted CA authority and pin the root CA public key as it less likely that it will be breached and usually the validity time of root CA is much longer than your certificate’s validity time.
whichever certificate you choose to pin, we recommend always to have a backup certificate that will be pinned in your application.

In mobile applications it is not recommended to pin certificates that are not under control of your organization as certificates can get expired or replaced at any moment without you having the ability to update the pinned values without pushing new application version and forcing your users to upgrade.

## Summary

Certificate pinning is an important security enhancement, that needs to be implemented with care.
