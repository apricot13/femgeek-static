---
title: Why I moved to a static site
description:  Why I switched my blog over from wordpress to a static site
date: 2020-12-31 
tags:
  - eleventy
layout: post
---

There are various reasons I spent a solid 24 hours forcing myself to port over my blog. 

The main one being, I'm lazy af. Have you ever tried to upgrade a wordpress installation thats on wordpress v3.8! (its on v5.6 at the time of writing) The PHP version is woefully outdated and I'm pretty sure there was a spider crawling about in my SQL database.

I've been quite fortunate in that when I setup my linode I locked it down so much. I used cloudflare and some intense caching but all that made it really hard to keep up to date with security updates. I followed (and still follow) this excellent guide [how to setup your linode](https://feross.org/how-to-setup-your-linode/) every time I setup a new machine but I just dont have the time any more to spend maintaining servers. 

I've ported my site over to [11ty](https://www.11ty.dev/) I uhmned and ahhed between this and gatsby but for the sake of simplicity I chose eleventy. I'm glad I did. [The code is all public](https://github.com/apricot13/femgeek-static).

What I've lost in the move is the download counter for my freebies it wasn't a requirement but it was nice to see if people were using them!

I also haven't setup comments yet. I'm considering a little node app on heroku that will comb github issues and rebuild the blog with them included. I didn't want to use something hosted elsewhere though.