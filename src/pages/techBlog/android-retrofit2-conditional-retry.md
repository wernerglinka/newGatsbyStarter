---
template: "blog/blog-post"
draft: false

# Metadata
title: "Conditionally Retry Asynchronous Network Calls on Android Using Retrofit 2"
description: "A short post demonstrating a possible solution for performing conditional based retry calls using retrofit2"

# Breadcrumbs
breadcrumbs:
  - name: TechBlog
    path: /techBlog/
  - name: What is a Sneaker Bot...

# Fields
date: 2018-05-08
author:
  - Johnny Tordgeman

blog_title: "Conditionally Retry Asynchronous Network Calls on Android Using Retrofit 2"
categories: Engineering
tags:
  - Java
  - Android
  - Retrofit

thumbnail: blog/blog-thumbnails/retrofit-1.jpg
---

Developing a mobile application comes with its own set of issues that you need to take care of. One of those issues is the possibility of a lousy network connection. An unstable network can cause your app’s API calls to fail, resulting in a poor user experience if not handled right.

One way to handle such case is to use a Retrofit/OKHTTP feature called Interceptors to retry the failed request. There is one catch though  — Interceptors are designed to be as simple and logic-less as possible, and if you do decide to add more logic to an Interceptor, and make a call to a server to get some data to decide what to do next based on that — you would have to do it synchronously.

Since one of the SDKs I use is callback based and cannot be called synchronously, I had to come up with a different approach. While searching the usual StackOverflow threads looking for a direction, I came across this awesome post by [Pallav Ahooja](https://medium.com/@PallavAhooja) called [Easily Retrying Network Requests on Android With Retrofit 2](https://medium.com/shuttl/easily-retrying-network-requests-on-android-with-retrofit-2-ee4b4b379eb7).

The post demonstrates how to achieve a retry using a new object called RetryableCallback which implements OKHTTP’s callback object and add some logic to it to handle retry. This approach works great if you want to base your retry on counters, meaning if a request failed retry it X times. I needed to base my retry logic on data from a callback based function and as such i needed to make some changes to the solution, which I’m going to list right here…

<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/3og0ITQOC5wlyk8ffy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

## The APIHelper class

The first class i created is APIHelper, which exposes two functions:

- **enqueueWithRetry** — replaces Retrofit’s enqueue function for async methods.
- **isCallSucess** — the logic that determines if a server call was successful or not.

The code for this class is as follows:

```java
package retro.sampleapp.com;

import android.util.Log;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class APIHelper {
    public static <T> void enqueueWithRetry(Call<T> call, final Callback<T> callback) {
        call.enqueue(new RetryableCallback<T>(call) {

            @Override
            public void onFinalResponse(Call<T> call, Response<T> response) {
                Log.d("APIHelper", "reached onFinalResponse");
                callback.onResponse(call, response);
            }

            @Override
            public void onFinalFailure(Call<T> call, Throwable t) {
                Log.d("APIHelper", "reached onFinalFailure");
                callback.onFailure(call, t);
            }
        });
    }

    public static boolean isCallSuccess(Response response) {
        int code = response.code();
        return (code >= 200 && code < 400);
    }
}
```

Looking at the function, we can see the real magic happens inside the `RetryableCallback` class which is in charge of handling the call and its responses.

## The RetryableCallback class

The heart of this method is the `RetryableCallback` class, which its implementation is as follows:

```java
package retro.sampleapp.com;

import android.util.Log;
import java.io.IOException;
import retrofit2.Callback;
import retrofit2.Call;
import retrofit2.Response;

public abstract class RetryableCallback<T> implements Callback<T> {

    private static final String TAG = RetryableCallback.class.getSimpleName();
    private final Call<T> call;

    public RetryableCallback(Call<T> call) {
        this.call = call;
    }

    @Override
    public void onResponse(Call<T> call, Response<T> response) {
        if (!APIHelper.isCallSuccess(response)) {
            if (response.code() == 403) {
                Log.d("RetryableCallback", "reached 403, check condition and retry if needed");
                try{
                    authHandler.getUpdatedToken(new ResponseCallback(newToken) { // an example of an async call with callback
                        @Override
                        public void onSuccess() {
                            retryCall(); // if the response succeeded retry the original call
                        }
                        public void onFailure(IOException e) {
                            Log.d("RetryableCallback", "token refresh failed :(");
                        }
                    }
                } catch (IOException e) {
                    // do something with the exception
                }
            }
        } else {
            onFinalResponse(call, response); // no need to do any retry, pass the response and the call to the final callback
        }
    }

    @Override
    public void onFailure(Call<T> call, Throwable t) {
        Log.d("RetryableCallback", t.getMessage());
        if (t.getMessage().contains("Server")) { // if error contains some keyword, retry the request as well. This is just an example to show you can call retry from either success or failure.
            retryCall();
        } else
            onFinalFailure(call, t); // if not, finish the call as a failure
    }

    public void onFinalResponse(Call<T> call, Response<T> response) { // to be overriden by calling class

    }

    public void onFinalFailure(Call<T> call, Throwable t) { // to be overriden by calling class
    }

    private void retryCall() {
        call.clone().enqueue(this); // clone the original call and enqueue it for retry
    }

}
```

Once everything is in place, you can use the new API using the following code snippet:

```java
Call<AppVersion> appVersionCall = apiInterface.getVersion(data); // a sample call using Retrofit.
APIHelper.enqueueWithRetry(appVersionCall, new Callback<AppVersion>() {
    @Override
    public void onResponse(Call<AppVersion> call, Response<AppVersion> response) {
        Log.d("callbackResponse", "Yay it worked! response is: " + response.toString());
    }

    @Override
    public void onFailure(Call<AppVersion> call, Throwable t) {
        Log.d("callbackResponse", "oh now, an error :(");
    }
});
```

<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/26xBuum7KaBa23Jy8" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

And there you have it. A relatively simple way of performing retry for an asynchronous Retrofit call based on pre-defined conditions. The `RetryableCallback` class can be even further enhanced by adding time outs, secondary rules etc. making your request retry logic smarter and more efficient :)

🎉 Special thanks to [Guy Bary](https://medium.com/@guybary) and [Yaron Schwimmer](https://medium.com/@yarons) for all their help with this post!
