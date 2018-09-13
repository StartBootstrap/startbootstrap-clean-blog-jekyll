---
layout: page
title: Posts by Tags
description: A list of all tags used in the blog.
background: '/img/bg-default.jpg'
permalink: /post-tags/
---
<p>
    {% for tag in site.tags %}
    <!-- Here's a hack to generate a "tag cloud" where the size of
    the word is directly proportional to the number of posts with
    that tag. -->
    <a href="/tags/{{ tag[0] }}/" 
    style="font-size: {{ tag[1] | size | times: 4 | plus: 10 }}px">
        {{ tag[0] }} | 
    </a>
    {% endfor %}
</p>
