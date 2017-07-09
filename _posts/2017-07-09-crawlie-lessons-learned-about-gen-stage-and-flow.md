---
title:      "Crawlie"
subtitle:   "Elixir London Meetup presentation"
#header-img: "img/headers/atom_modified.png"
disqus_identifier: "Crawlie - Elixir London Meetup presentation"
date:       2017-07-09 2:00:00
published:  true
---
Last year, I saw José Valim give his keynote at the [ElixirLive conference](http://www.elixirlive.com/) in Warsaw, where he talked about
the motivation for his new Elixir libraries: [GenStage](https://github.com/elixir-lang/gen_stage) and [Flow](https://github.com/elixir-lang/flow). 
Even though I heard about those before, it was the keynote when I "got" what the libraries were good for 
and why they were neat - and I decided to play around with them.

When I came back to London I started working on a small project that would make use of GenStage and Flow - [Crawlie the crawler](https://github.com/nietaki/crawlie). Since then the project took shape and allowed me to learn a bit about concurrent event processing pipelines in Elixir. As I'll probably be ramping down the work around Crawlie now to focus on other things (I have my eye on Riak Core and architecting distributed apps in Elixir in general) I thought it might be a good idea to share what I have learned with others who want to try GenStage and Flow.


[![talk thumbnail](/img/crawlie/talk-thumb.png)](https://skillsmatter.com/skillscasts/10497-crawlie-lessons-learned-about-genstage-and-flow){:target="_blank"}

Here are [the slides](http://slides.com/nietaki/crawlie) if you want to click along or copy the code:

<iframe src="//slides.com/nietaki/crawlie/embed?style=light" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<!--more-->

It is a bit dry, but if you want to get started on GenStage and Flow anyways, it might help you bootstrap yourself quicker and avoid some pitfalls. Also: only after watching the recording of the talk afterwards I have noticed how plentiful and distracting all the "umm"s and "ah"s are - I'm going to try to work on it :)

There's many more recorded talks [on the meetup's SkillsMatter site](https://skillsmatter.com/groups/10663-elixir-london-meetup), touching a diverse set of subjects, from the basics to [some really advanced Ecto Sandbox implementation details](https://skillsmatter.com/skillscasts/10173-elixir-london-april-meetup) - have a look around while you're there.

As always, I'm happy to hear any and all feedback :)
