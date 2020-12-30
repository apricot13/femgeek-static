---
title: How to show posts on the homepage of eleventy-base-blog
description:  Switching to eleventy for my blogging but needing images on the homepage
date: 2021-01-30
draft: true
tags:
  - eleventy
layout: layouts/post.njk
---
 
I've just finished switching over my wordpress blog to a static site. Theres a few reasons I've done this but thats for another day!

One of the requirements I had was that it show the posts on the homepage but the images were coming back with relative urls.

This is how I displayed the collection content within my template.

```html
&#x7B;% for post in postslist | reverse %&#x7D;
  &#x7B;&#x7B; post.templateContent | safe &#x7D;&#x7D;
&#x7B;% endfor %&#x7D;
``` 

This is what I ended up with for adding in the metadata siteUrl for anything that does not already start with http/https


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

      console.log(env.page)

      tokens[idx].attrs[aIndex][1] = abspath;

    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  }


  eleventyConfig.setLibrary("md", markdownLibrary);
  ```