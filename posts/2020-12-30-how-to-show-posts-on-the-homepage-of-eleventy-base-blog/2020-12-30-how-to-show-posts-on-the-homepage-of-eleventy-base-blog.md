---
title: How to show posts on the homepage of eleventy-base-blog
description:  Switching to eleventy for my blogging but needing images on the homepage
date: 2020-01-30
tags:
  - eleventy
layout: post
---
  
I've just finished switching over my wordpress blog to a static site. I've had to make a few compromises and theres a few reasons for the switchover but thats for another day!

One of the requirements I had was that I wanted it show the full post on the homepage but I had an issue then where the images were coming back with relative urls and not displaying.



```liquid
{%- raw -%}
{% set absolutePostUrl %}{{ post.url | url | absoluteUrl(metadata.url) }}{% endset %}
{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) | safe }}
{%- endraw -%}
```



Another long winded solution that may be of help to someone googling is this method. It lets you modify the image url with a custom renderer.

My blog is based on the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) so it uses markdownIt to parse the markdown. I added a renderer that looks to see if an image url starts with http or https and if it doesn't it adds the rest of the url to it.

This is how I displayed the collection content within my template.



```liquid
{%- raw -%}
{% for post in postslist | reverse %}
  {{ post.templateContent | safe }}
{% endfor %}
{%- endraw -%}
``` 


This is what I ended up with for adding in the metadata siteUrl for anything that does not already start with http/https. Messy but it works. 


```js
  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });


  var defaultRender = markdownLibrary.renderer.rules.image;
  markdownLibrary.renderer.rules.image = function (tokens, idx, options, env, self) {

    const token = tokens[idx];
    const aIndex = token.attrIndex('src');
    const link = token.attrs[aIndex][1];
    

    if(/(http(s?)):\/\//i.test(link)) {
    
    } else {
      var abspath = '';
      abspath += env.metadata.url;
      if(env.page.url.charAt(0) === '/') {
        abspath += env.page.url.substring(1);
      }
      
      abspath += "/" + link;

      tokens[idx].attrs[aIndex][1] = abspath;

    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  }


  eleventyConfig.setLibrary("md", markdownLibrary);
  ```