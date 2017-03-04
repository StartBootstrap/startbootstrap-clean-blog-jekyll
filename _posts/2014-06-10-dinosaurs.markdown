---
layout:     post
title:      "Dinosaurs are extinct today"
subtitle:   "because they lacked opposable thumbs and the brainpower to build a space program."
date:       2014-06-10 12:00:00
author:     "Start Bootstrap"
header-img: "img/post-bg-01.jpg"
---

<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>

<pre>
  <div class="post-preview">
    <a href="{{ post.url | prepend: site.baseurl }}">
        <h2 class="post-title">            {{ post.title }}
        </h2>
        {% if post.subtitle %}
        <h3 class="post-subtitle">
            {{ post.subtitle }}
        </h3>
        {% endif %}
    </a>
    <p class="post-meta">{{ post.date | date: "%m/%d/%Y" }}</p>
</div>
<hr>
</pre>