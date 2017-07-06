---
title:      "Crawlie"
subtitle:   "Elixir London Meetup presentation"
#header-img: "img/headers/atom_modified.png"
disqus_identifier: "Crawlie - Elixir London Meetup presentation"
date:       2017-07-05 2:00:00
published:  true
---

Last year, I saw Jose Valim give his keynote at the Elixir Warsaw conference (????), where he talked about
the motivation for his new Elixir libraries: [GenStage](TODO) and [Flow](TODO). 
Even though I heard about those before, it was the keynote when I "got" what the libraries were good for 
and why they were neat - and I decided to play around with them.

When I came back to London I started working on a small project that would make use of GenStage and Flow - [Crawlie the crawler](https://github.com/nietaki/crawlie). Since then the project took shape and allowed me to learn a bit about concurrent event processing pipelines in Elixir. As I'll probably be ramping down the work around Crawlie now and focus on other things (I have my eye on Riak Core and architecting distributed apps in Elixir in general) I thought it might be a good idea to share what I have learned with others who want to try GenStage and Flow.



[![talk thumbnail](/img/crawlie/talk-thumb.png)](https://skillsmatter.com/skillscasts/10497-crawlie-lessons-learned-about-genstage-and-flow)

Here are [the slides](http://slides.com/nietaki/crawlie) if you want to click along or copy the code:

<iframe src="//slides.com/nietaki/crawlie/embed?style=light" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<!--more-->

It is a bit dry, but if you want to get started on GenStage and Flow anyways, it might help you bootstrap yourself quicker and avoid some pitfalls.

There's many more recorded talks [on the meetup's SkillsMatter site](), touching a diverse set of subjects, from the basics to [some really advanced Ecto implementation details](TODO ecto presentation) - have a look around while you're there.

As always, I'm happy to hear any and all feedback :)
