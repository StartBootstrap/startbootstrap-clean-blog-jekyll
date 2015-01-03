---
title:      "Google engineers meetup"
subtitle:   "and good advice from Joshua Bloch"
date:       2011-10-18 12:00:00
---

This thursday, in the lecture hall of the Biology Departament of University of Warsaw, Google organized a meetup with their engineers, celebrating the official launch of their new office in Warsaw. The event started with [Joshua Bloch](http://pl.wikipedia.org/wiki/Joshua_Bloch)’s, lecture, which was a treat for the attendees, most of whom were [MIM UW](http://www.mimuw.edu.pl/) students, almost filling the room.

Joshua presented code snippets that don’t do what you might expect them to, by invoking constructs that may lead to unforseen behavior. Majority of those constructs weren’t Java-exclusive and could have been presented in C++ or even python.  The well known issues were covered, e.g. String comparison, operator precedence, working with floating-point variables, implicit conversion. But there also were topics I haven’t ever thought about, like regular expressions that match same patterns but differ hugely in their efficiency.

It wouldn’t be right for me to try to recreate his lecture, especially that all the “puzzlers” that were presented are also covered
in [Joshua’s book](http://www.amazon.com/gp/product/032133678X/ref=as_li_ss_tl?ie=UTF8&tag=almdon-20&linkCode=as2&camp=217145&creative=399369&creativeASIN=032133678X), which he kept shamelessly plugging;) I’d just like to give you an example of a sick, twisted piece of code you
aren’t likely to encounter in real life situation, but you might as well learn from it. Here is the last puzzler of the lecture

{% gist nietaki/79c4b94cf3c47a719d9f %}

…it seemed pretty straightforward: the first println is a decoy, and in the second one, the 012345 is an (more precisely 5349) integer written in octal, so this program should print:

    66666
    548559

Well it doesn’t. The second number in the third line is not an ” int 54321″ but a “long 5432″. And believe me, the “l” at the end looked even more like a “1″ on the slides ;)

Here are the conclusions of the lecture

* When creating a long primitive, use the 123L format instead of 123l.
* Not everyting is as it seems, so it’s good to understand the tools you’re using.
* Good IDEs and tools like [FindBugs](http://findbugs.sourceforge.net/) are definitely worth using.
* You should look into [TDD](http://en.wikipedia.org/wiki/Test-driven_development).
* You should buy Josuha Bloch’s books ;)

Maybe I should add, that the 4th item on the list wasn’t mentioned in the lecture but seems like a logical conclusion to me ;)

The next lecturer was Walfredo Cirne, who touched the surface of good practices in the design and usage of “cloud” type systems, and said a surprising amount about [Agile](http://en.wikipedia.org/wiki/Agile_software_development) software development methodologies e.g. – code review, pair programming, and TDD. Pretty interesting, especially the parts the readers could relate to.

The lecture ended with Onufry Wojtaszczyk telling us about what he does as a Google engineer and he made it perfectly clear how much he loves it.

The subject of Google recruiting and jobs wasn’t really covered, except for the “a Google employee should be smart and get things done” part, so here’s an infographic about getting hired by Google:

[![getting hired by Google]({{ site.baseurl }}/img/jobvine-infographic.png)]({{ site.baseurl }}/img/jobvine-infographic.png)
