---
template: "blog/blog-post"
draft: false

# Metadata
title: 'Bugzilla as a case study on Perl''s "secure" data types'
description: "Perl is considered by some to be a “problematic” language. In my eyes, security problems in Perl projects exist partly because of false-assumptions that developers make."

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Bugzilla as a case study on Perl...

# Fields
date: 2016-01-13
author:
  - Netanel Rubin

blog_title: 'Bugzilla as a case study on Perl''s "secure" data types'
categories: Engineering
tags:
  - bugzilla
  - research
  - perl

thumbnail: bugzilla-and-perl.png
---

## The Problem

Perl is considered by some to be a “problematic” language. In my eyes, security problems in Perl projects exist partly because of false-assumptions that developers make. One of these false-assumptions is the common assumption that hashes and arrays (non-scalar data types) are “secure”, often skipping security checks on them. This can be seen in the following example:

![_hashes_are_secure](/assets/images/blog/hashes-are-secure.png)

This false-assumption exists mainly because regular user-input supposedly can’t create these kinds of data types. Therefore, it is often wrongly assumed that user input will only comprise of scalar data types, such as strings or integers.

In this blog post I’ll try to disprove this assumption, by exploiting a security bug in Bugzilla’s core.
For further information about Perl’s “problematic” nature, you are welcome to watch my recent 32C3 talk – “[The Perl Jam 2: The Camel Strikes Back](https://media.ccc.de/v/32c3-7130-the_perl_jam_2#video)”.

## The Bug(zilla)

Bugzilla, like a lot of other Perl projects, makes heavy use of the “ref” keyword. The “ref” keyword is responsible for returning the variable type, and Bugzilla extensively uses it, especially in its object initialization functions.

Such function is ‘\_load_from_db()’, which can be seen here:

![_load_from_db](/assets/images/blog/bugzilla-load-from-db.png)

It is easy to see that the function acts very differently based on ‘$param’ data type. If ‘$param’ is a scalar, it is converted into an integer by removing all non-numeric characters from it. On the other hand, if it’s a hash, specific keys are extracted from it and used inside the SQL query with no further validation. The reason for these different behaviours, is that Hashes are often considered secure as it is assumed that they can’t be generated from standard user input, and therefore need not be escaped. As you will see, this is a major false-assumption made by the developers.

This means that if we control ‘$param’ value, and, of course, its data type, we will be able to exploit an SQL Injection attack on the system.
Even though controlling ‘$param’ value is easy, controlling its data type will prove to be rather difficult. Thinking about it, it sounds like an impossible thing to do – how can one even control an input parameter’s data type?

Well, the answer lies in how the input is being parsed. Bugzilla uses the ‘CGI.pm’ module, which freely allows setting lists as the input (something an attacker can abuse), but restricts the use of any other data types. In fact, neither hashes nor arrays can be created using this module. Luckily for an attacker, though, ‘CGI.pm’ is not the only module parsing the user input. Another module assigned to that task is the XMLRPC module.

Bugzilla implemented several methods of communicating with the system API remotely: Using REST API, JSONRPC, and our XMLRPC. When a user sends an XMLRPC request, the server parses it using the XMLRPC standard, _which allows the use of arrays and dictionaries as input types_. Because of that, Bugzilla also allows the use of these non-standard data types as parameters in its RPC functions.
It is important to note that this behaviour is not the problem. Allowing hashes and arrays in RPCs is a convenient feature used in many projects.

The problem is that the input data-type check is missing on several occasions in this RPC. One of those occasions can be seen in the ‘get()’ function inside the ‘bug’ web service module:

![get](/assets/images/blog/bugzilla-get.png)

As we control ‘$params’, we control ‘$ids’, and because the input came from the RPC module, we are not restricted to scalar-only values as input and can also use arrays and hashes.

So we can insert a hash into ‘Bug->check()’, and cause an SQLI if we insert a hash into ‘\_load_from_db()’, but we still need to correlate between the two.

This correlation is, in fact, very obvious. Since ‘check()’ is responsible for extracting a specific bug out of the database, it uses the ‘\_load_from_db()’ function to do so. Because ‘check()’ assumes hash arguments are entirely system controlled, and are not dangerous, it passes them as-is into ‘\_load_from_db()’. And this is the real problem. This is where the “secure” data types false-assumption enables us to exploit an SQLI freely, without any special permissions.

This security bug allows an unauthenticated attacker to perform an SQL Injection attack in the Bugzilla platform, effectively allowing the complete compromise of the server in some cases.

In Bugzilla’s case, enabling Perl’s “Taint Mode” would restrict our injection. Taint Mode is basically a “safe mode” for Perl applications that makes sure that input is validated prior to its usage in dangerous functions such as ‘open()’, ‘eval()’, or even DB functions such as ‘selectrow()’. As with any language-specific built-in-security-mechanism, “Taint Mode” cannot be counted on solely, mainly because it can be disabled, removed, or changed by 3rd party entities.

Without “Taint Mode”, the severity of this vulnerability would be massive, effectively exposing the entire database to any attacker on any Bugzilla installation worldwide.

## The Takeaways

It is easy to make false-assumptions in any language, whether it's C, Java, or Python. The problem starts when these false-assumptions are part of the language common practices.

If you happen to still use Perl in a CGI enviroment, The best advice I can give you is to either switch to PSGI, or to a whole different langauge, because CGI and CGI.pm are deprecated (in Perl) and should not be used.

But the most important lesson is - DO NOT assume. Don't assume your input is of any specific data type, don't assume Hashes are secure, just don't assume, as most of the time you will be wrong.
