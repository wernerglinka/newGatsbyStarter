---
template: "blog/blog-post"
draft: false

# Metadata
title: "Instrument Everything"
description: "Instrument Everything - Achieving Test Coverage using Instrumentation"

# Breadcrumbs
breadcrumbs:
  - name: Home
    path: /
  - name: Blog
    path: /blog/1/
  - name: Instrument Everything...

# Fields
date: 2019-04-15
author:
  - Ilai Fallach

blog_title: "Instrument Everything - Achieving Test Coverage using Instrumentation"
categories: Engineering
tags:
  - Instrumentation
  - Code Coverage
  - Test Coverage
  - Testing
  - Code Quality
  - VCL
  - Varnish
  - Fastly

thumbnail: instrument-everything-thumbnail.png
---

As web applications become more and more advanced, placing business application logic on [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) edge servers becomes a necessity.

Great CDN solution providers, like [Fastly](https://www.fastly.com/), offer platforms to write your own logic on their edge servers so that if you need some logic executed efficiently with low latency, or without causing extra load on our backends, we can place it there.

In PerimeterX, we detect bots (non-human clients) and block them from accessing site resources and hurting their business, based on deep analysis of the user's behavior. To minimize the overhead over the requests we monitor and the impact of bots over our customers' infrastructure, we need to apply our detection as early as possible in the request flow - And what place is more appropriate than on the CDN edge?

Let's talk a bit about the Fastly Platform.

> At the core of Fastly is [Varnish](https://varnish-cache.org/), an open source web accelerator that's designed for high-performance content delivery. Varnish is the key to being able to accelerate dynamic content, APIs, and logic at the edge". - [Benefits of Using Varnish](https://www.fastly.com/blog/benefits-using-varnish))

Varnish has a domain specific language called [VCL](https://varnish-cache.org/docs/trunk/users-guide/vcl.html) (Varnish Configuration Language) that lets you influence how each request is being handled.

Here at PerimeterX, we value code quality. After writing our application logic in VCL, we needed to test it. Since Fastly extended Varnish greatly and integrated it deep into their platform, we cannot simply run our logic inside a local varnish instance and run our tests there.

So, the natural thing to do was writing a full-featured End-to-End testing suite. After writing some tests, we ran into a problem - How can we know that our tests really cover all of the important flows and logic?

## TL;DR

In this post we will:

1. Understand what instrumentation is and why it's useful.
2. See how we can apply it for code that is being executed in special environments.
3. Implement an instrumentation mechanism end-to-end for producing code coverage reports for VCL running on the Fastly CDN platform.

If you prefer to dive straight into the source code, we open sourced it, so enjoy: [https://github.com/PerimeterX/remote-code-cover](https://github.com/PerimeterX/remote-code-cover)

## Before Proceeding

I assume you have basic familiarity with the Fastly Platform, VCL and Python. But even if you don't, you will still learn the conpect - which is the most important.

## Enter Instrumentation

> "**Instrumentation** refers to an ability to monitor or measure the level of a product's performance, to diagnose errors, and to write [trace](<https://en.wikipedia.org/wiki/Tracing_(software)>) information." - Wikipedia.

What instrumentation practically aims to achieve is tracking the execution of the code during runtime.

There are generally two types of instrumentation techniques:

### Offline instrumentation

Offline instrumentation is a technique to modify the source code or the byte code at compile time in order to track the execution of the code at runtime. In practice, this means that the code coverage tool injects data collector calls into your source or byte code to record if a line was executed or not.

### On-the-fly instrumentation

This instrumentation process happens on-the-fly during class loading by using a special agent or a special ClassLoader so the source/byte code remains untouched.

_Reference: [https://medium.com/@jonatan_ivanov/code-coverage-not-only-for-unit-tests-419f3c73d00](https://medium.com/@jonatan_ivanov/code-coverage-not-only-for-unit-tests-419f3c73d00)_

As you probably guessed, instrumentation is what allows us to analyze test coverage, and this is what we needed for our End-to-end tests to understand their real effectiveness.

## Implementing your own instrumentation tool

Let's get to business. We will now walk through the creation of an **offline** instrumentation library for VCL that allowed us to get the following results for our tests:

![coverage example](/assets/images/blog/instrument-everything/image-1.png)
<br>

### How it usually works

Most of the offline instrumentation tools out there initialize some global in-memory data structure and inject logic to the source code to update that data structure in every line of code when it's executed.

### How we did it

Since Varnish does not keep state between requests, and the only way to transfer data between subroutines is using headers which is costly in memory (Varnish workspace), we decided to utilize local variables and logging (via Syslog) to send instrumentation tracing data during runtime. Let's see an example:

**Original Code:**

```ruby
sub vcl_recv {
#FASTLY recv

	if (req.method != "HEAD" && req.method != "GET" && req.method != "FASTLYPURGE") {
		return(pass);
	}

	return(lookup);
}
```

**Instrumented Code:**

```ruby
sub vcl_recv {
	declare local var.log_8 BOOL;
   	declare local var.log_5 BOOL;
   	declare local var.log_4 BOOL;
#FASTLY recv
   	set var.log_4 = true;
  	if (req.request != "HEAD" && req.request != "GET" && req.request != "FASTLYPURGE") {
    	set var.log_5 = true;
    	log "syslog " req.service_id " Px-Instrumentation :: main," + if(var.log_4, "4 ", "") + if(var.log_5, "5 ", "");
    	return(pass);
  	}
  	set var.log_8 = true;
  	log "syslog " req.service_id " Px-Instrumentation :: main," + if(var.log_4, "4 ", "") + if(var.log_5, "5 ", "") + if(var.log_8, "8 ", "");
  	return(lookup);
  	log "syslog " req.service_id " Px-Instrumentation :: main," + if(var.log_4, "4 ", "") + if(var.log_5, "5 ", "") + if(var.log_8, "8 ", "");
}
```

So, what happened here?

1. We declared BOOL local variables at the beginning of the subroutine for each tested line.
2. Before line number N, we set `var.log_N` to `true` to indicate that this line was executed.
3. Before any return from the subroutine, we sent a log message with our VCL file name ("main") and space-separated line numbers that were executed.
4. We ignored comments and other lines of code that are not interesting for code execution coverage.

If we call our endpoint with a GET request, we see the following log lines in our syslog endpoint:

```
...
Feb 28 13:46:05 cache-fra19141 Px-Instrumentation[380410]: main,4 8
...
```

And indeed, after parsing these logs nicely in HTML we ended up with:

![coverage example](/assets/images/blog/instrument-everything/image-1.png)
<br>

From here, we can easily extend our analysis and use-cases further:

- Calculate test coverage percentage (I doubt that setting some percentage threshold as a KPI for success is a good idea on its own, for more information on this, I advise reading [Test Coverage - Martin Fowler](https://martinfowler.com/bliki/TestCoverage.html)).
- Count how many times the lines of code were executed to track down performance issues.

> **Important note:** it's probably not a good idea to upload instrumented code to a production environment. Under heavy load, all of these Syslogs will probably not behave well.

### End to End Implementation

To integrate this method well with our End-to-End testing framework, we needed to automate the whole instrumentation and report generation process.

To accomplish this, we built a python CLI application with a simple "cover" command that does everything for us. The main flow of the application:

1. Use Fastly REST API to fetch the existing VCL code from the Fastly Service that is provided as a CLI argument.
2. Inject instrumentation logic into the existing code.
3. Upload the new code including a syslog log sink definition (the target for the logs) to the service as a new version and activate it.
4. Spin up a Ngrok and Syslog Server docker containers. The Ngrok container exposes a TCP URL that is forwarded to the Syslog server container to ingest instrumentation logs.
5. _(Run our usual End-to-End tests pointing to the service endpoint)_
6. Parse and process the logs into a coverage object that contains instrumentation metadata.
7. Produce a nice looking HTML report based on the coverage object.

Let's see how it's done, step-by-step (for the sake of brevity some of the helper methods are removed):

#### 1. Fetch existing VCL code from the service

This is easily done via Fastly's REST API:

```python
def get_all_custom_vcls(service_id, version):
    url = 'https://api.fastly.com/service/{}/version/{}/vcl'.format(service_id, version)
    response = requests.request('GET', url, headers={...})
    return response.json()
```

Calling this method returns our VCLs as a list of dictionaries:

```json
[
  {
    "content": "<vcl code>",
    "main": <is_main_vcl>,
    "name": "<vcl_name>",
    "service_id": "<service_id>",
    "version": <version>
  },
  ...
]
```

#### 2. Inject the instrumentation logic

Injecting the instrumentation source code is a tricky task. The best way to achieve that is by defining a grammar for the VCL language and then use it to parse the code as an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (Abstract Syntax Tree) and then inject the code before the appropriate nodes.

We took a simpler approach of iterating over the code lines and identifying entry points where we want to inject our instrumentation code (subroutine definitions omitted for brevity):

```python
def add_instrumentation(name, content):
    lines = content.split('\n')
    original_line_count = 1
    instrumented_lines = []
    subroutine_parenthesis_stack = []
    sub_tested_line_numbers = []
    tested_line_numbers = []
    cur_subroutine_decl_line_number = 0
    in_subroutine = False
    in_synthetic = False

    for raw_line in lines:
        stripped_line = strip_line(raw_line)
        is_tested = do_test_line(stripped_line)
        l_ws_cou = count_leading_whitespaces(raw_line)

        def add_log_line(subroutine_decl_line_number=cur_subroutine_decl_line_number, my_l_ws_cou=l_ws_cou):
            instrumented_lines.append(get_var_line(original_line_count, tested_line_numbers, sub_tested_line_numbers,
                                                   instrumented_lines, subroutine_decl_line_number, my_l_ws_cou))

        if is_line_sub_header(stripped_line):
            # if we reached a sub header, we add the log for it *after*
            # the line since we can't log outside subroutines
            in_subroutine = True
            instrumented_lines.append(raw_line)
            cur_subroutine_decl_line_number = len(instrumented_lines)
            subroutine_parenthesis_stack.append(original_line_count)
        elif not in_subroutine:
            instrumented_lines.append(raw_line)
        elif in_subroutine:
            if stripped_line[:11] == 'synthetic {':
                add_log_line(subroutine_decl_line_number=cur_subroutine_decl_line_number,
                             my_l_ws_cou=2)
                in_synthetic = True
                if stripped_line[-2:] == '};':
                    in_synthetic = False
            elif in_synthetic:
                if stripped_line[-2:] == '};':
                    in_synthetic = False
            elif has_close_params(is_tested, stripped_line):  # is_close_parens
                subroutine_parenthesis_stack.pop()
                if end_of_subroutine(in_subroutine, subroutine_parenthesis_stack):
                    instrumented_lines.append(get_syslog_line(name, sub_tested_line_numbers, 2))
                    sub_tested_line_numbers = []
                    in_subroutine = False
                elif has_open_params(is_tested, stripped_line):
                    add_log_line()
                    subroutine_parenthesis_stack.append(original_line_count)
            elif has_open_params(is_tested, stripped_line):  # is_open_parens
                add_log_line()
                subroutine_parenthesis_stack.append(original_line_count)
            elif is_return_line(stripped_line):
                add_log_line()
                instrumented_lines.append(get_syslog_line(name, sub_tested_line_numbers, l_ws_cou))
            elif is_tested:
                add_log_line()

            instrumented_lines.append(raw_line)

        original_line_count += 1

    instrumented_content = '\n'.join(instrumented_lines)
    return instrumented_content, original_line_count, tested_line_numbers
```

It's not important to understand exactly what's going on here, except that we implemented the instrumentation behavior mentioned above.

Then, we store the instrumentation map, that will later allow us to process the logs to output an execution coverage of the source code:

```python
instrumentation_mapping[name] = {  # Each key is a vcl file
    'original_content': original_vcl_source_code,
    'orig_line_count': original_vcl_line_count,
    'tested_line_count': amount_of_lines_we_tested,  # Excluding empty lines, comments, etc..
    'tested_line_numbers': original_line_numbers_that_we_test
}
```

#### 3. Upload the instrumented code to Fastly

Clone our active Fastly service version:

```python
def clone_version(service_id, version):
    url = 'https://api.fastly.com/service/{}/version/{}/clone'.format(service_id, version)
    response = requests.request('PUT', url, headers={...})
    return response.json()['number']
```

Replace the instrumented VCLs. For each VCL file:

```python
def delete_custom_vcl(service_id, version, name):
    url = 'https://api.fastly.com/service/{}/version/{}/vcl/{}'.format(service_id, version, name)
    response = requests.request('DELETE', url, headers={...})

def create_custom_vcl(service_id, version, vcl_object):
    url = 'https://api.fastly.com/service/{}/version/{}/vcl'.format(service_id, version)
    response = requests.request('POST', url, headers={...}, data=urlencode(vcl_object))
```

Reserve a Ngrok TCP address (requires a premium Ngrok account - [dashboard.ngrok.com/reserved](https://dashboard.ngrok.com/reserved))

_In the formal version, we also support using an external proxy, like [localtunnel](https://localtunnel.github.io/www/), for the job._

Create a Fastly logging endpoint of type Syslog that points to the reserved TCP address:

```python
def create_syslog_endpoint(service_id, version):
	syslog_object = {
        'name': '<syslog_endpoint_name>',
        'address': '<reserved_tcp_address>',
        'hostname': '<reserved_tcp_address>',
        'port': <reserved_tcp_port>,
    }
    url = 'https://api.fastly.com/service/{}/version/{}/logging/syslog'.format(service_id, version)
    response = requests.request('POST', url, headers={...}, data=urlencode(syslog_object))
```

Finally, activate the version:

```python
def activate_version(service_id, version):
    url = 'https://api.fastly.com/service/{}/version/{}/activate'.format(service_id, version)
    response = requests.request('PUT', url, headers={...})
```

#### 4. Listen for incoming logs

Let's spin up a Ngrok and Syslog local instances, this can be easily done using docker straight from our python code using the `docker` (install with `pip install docker`) package:

```python
def run_syslog_server(logs_path):
    client = docker.from_env()
    volumes = ['{}:/var/log'.format(logs_path)]
    container_handle = client.containers.run(image='balabit/syslog-ng:latest', command='--no-caps', stdout=True,
                                             stderr=True, remove=True, detach=True, volumes=volumes,
                                             name='instrumentation-syslog-ng')
    return container_handle

def run_ngrok(auth_token, remote_addr):
    client = docker.from_env()
    syslog_name = 'instrumentation-syslog-ng'
    command = 'ngrok tcp --authtoken {} --remote-addr {}:{} {}:514'.format(auth_token, remote_addr[0], remote_addr[1],
                                                                           syslog_name)
    links = {syslog_name: syslog_name}
    container_handle = client.containers.run(image='wernight/ngrok:latest', command=command, stdout=True,
                                             stderr=True, remove=True, detach=True, links=links,
                                             name='instrumentation-ngrok')
    return container_handle
```

The `run_syslog_server` subroutine receives a `logs_path` parameter that we used as the volume target on our host to receive the logs from the syslog server container.

The `run_ngrok` subroutine forwards all incoming traffic to the `instrumentation-syslog-ng` hostname, that is our syslog server container hostname.

#### 5. Run your tests on the Fastly service endpoint

Now, we simply run the End-to-End tests on the Fastly service endpoint. The logs will be forwarded to the `logs_path` on our machine.

#### 6. Process the logs

The logs are lines of the form:

```
Feb 28 13:46:05 cache-fra19141 Px-Instrumentation[380410]: main,4 8
```

To process them, we create a unique set of line numbers (`4, 8`) per vcl file name (`main`). Then, we calculate the report using the following subroutine (where `processed_logs` is the unique set and `instrumentation_mapping` is the mapping we computed earlier):

```python
def calculate_coverage(instrumentation_mappings, processed_logs):
    """
    Given the parameters, returns a coverage object that contains the needed data for the report
    :param dict instrumentation_mappings: a dictionary of
    key: name, value: properties that includes instrumentation mappings
    :param list processed_logs: a list of processed logs that contain the coverage information
    :return dict: coverage object
    """
    coverage_object = {}
    files = {}
    global_tested_line_count = 0
    global_covered_line_count = 0
    for name, vcl_mapping in instrumentation_mappings.items():
        tested_line_count = vcl_mapping['tested_line_count']
        original_content = vcl_mapping['original_content']
        logs = logs_by_name_line[str(vcl_mapping['name_mapping'])]
        covered_line_numbers = logs.keys()
        covered_line_count = len(logs)
        tested_line_numbers = vcl_mapping['tested_line_numbers']
        uncovered_line_numbers = [line for line in tested_line_numbers if line not in covered_line_numbers]
        files[name] = {
            'name': name,
            'coverage_line_percentage': calc_percentage(covered_line_count, tested_line_count),
            'covered_line_count': covered_line_count,
            'tested_line_count': tested_line_count,
            'total_line_count': len(original_content.split('\n')),
            'original_content': original_content,
            'tested_line_numbers': tested_line_numbers,
            'uncovered_line_numbers': uncovered_line_numbers,
            'covered_line_numbers': covered_line_numbers
        }
        global_tested_line_count += tested_line_count
        global_covered_line_count += covered_line_count
    coverage_object['files'] = files
    return coverage_object
```

For each VCL file, we compute the following statistics:

1. `coverage_line_percentage`: the percentage of lines we covered out of the total tested lines
2. `covered_line_count`: the number of lines we covered
3. `tested_line_count`: the number of lines we test
4. `original_content`: the original vcl file string
5. `tested_line_numbers`: the line numbers that were tested
6. `uncovered_line_numbers`: the line numbers that were not covered
7. `covered_line_numbers`: the line numbers that were covered

#### 7. Generate an HTML report

We now have all the information we need to generate an exact line coverage report.

```python
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

def generate_html_report(coverage_object):
    """
    Given a coverage object returns an html report
    :param dict coverage_object:
    :return list(string), string: html files, css file
    """
    lexer = get_lexer_by_name('ruby', stripall=True)
    formatter = HtmlFormatter(linenos=True, cssclass='source')
    source_code_template = fs_util.read_file(path.join(CUR_DIR, '..', 'assets', 'instrumentation', 'code_cover.jinja2'))
    html_files = {}
    file_names = coverage_object['files'].keys()
    for file_name, file_coverage in coverage_object['files'].items():
        source = highlight(file_coverage['original_content'], lexer, formatter)
        source_lines = source.split('\n')
        # find the start of the code
        indices = [i for (i, line) in enumerate(source_lines) if '<td class="code"><div class="source"><pre>' in line]
        if len(indices) != 1:
            raise Exception('No suitable pre code entries found')
        uncovered_line_numbers_offset = [indices[0] + i - 1 for i in file_coverage['uncovered_line_numbers']]
        for i in uncovered_line_numbers_offset:
            source_lines[i] = '<span class="uncovered">{}</span>'.format(source_lines[i])
        covered_line_numbers_offset = [indices[0] + i - 1 for i in file_coverage['covered_line_numbers']]
        for i in covered_line_numbers_offset:
            source_lines[i] = '<span class="covered">{}</span>'.format(source_lines[i])
        source = '\n'.join(source_lines)
        result = string_util.render_template_with_variables(source_code_template, {
            'title': '{}.vcl'.format(file_name),
            'file_names': file_names,
            'file': file_coverage,
            'source': source
        })
        html_files[file_name] = result
    return html_files
```

And the `jinja2` template we are using for generating the coverage report:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{{ title }}</title>
    <link rel="stylesheet" type="text/css" href="highlight.css" />
  </head>
  <body>
    <div class="header">
      <h2>{{ title }}</h2>
      <p class="stats">
        {{ file['coverage_line_percentage'] }}% Lines ({{
        file['covered_line_count'] }}/{{ file['tested_line_count'] }})
      </p>
    </div>
    {{ source }}
  </body>
</html>
```

We decided to use the great package `pygments` (install with `pip install pygments`) to highlight our code along with neat line numbers beside them. Notice that we used the `ruby` lexer since it's (somewhat) similar in syntax. Then, we find the lines that were covered/uncovered and inject a `<span>` element that will color them appropriately using CSS rules.

**That's it!**

When we open the resulting HTML file we can see our coverage like in the original example:

![coverage example](/assets/images/blog/instrument-everything/image-1.png)
<br>

## Summary

In this post, we've learned what instrumentation is, how to apply it in special environments and went through an end-to-end implementation of an instrumentation mechanism for producing code coverage reporting for the VCL language on top of the Fastly Platform.

We can apply this method for every environment out there and get insights into our code during runtime.

We open sourced the tool, that currently supports Fastly VCL environments, and we plan to extend it to other environments that need instrumentation and code coverage. Feel free to use the tool, explore the code and contribute!

#### [https://github.com/PerimeterX/remote-code-cover](https://github.com/PerimeterX/remote-code-cover)
