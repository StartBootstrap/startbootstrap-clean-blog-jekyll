---
layout: post
title: Meet an MIR Researcher
subtitle: An interview with Dr. Sergio Oramas
excerpt: An interview with Dr. Sergio Oramas
date: 2019-11-27
author: Karim M. Ibrahim
author-id: karim
background: /posts/Sergio_Oramas_interview/delft.jpg
---

During [ISMIR 2019](https://ismir2019.ewi.tudelft.nl/), we got the chance to have a talk with [Sergio Oramas](http://sergiooramas.com/). Sergio is a researcher in Music Data Science, specialized in **Recommender Systems**, **Natural Language Processing**, and **Deep Learning** with **audio** and **text**. He got his PhD in 2017 at the Music Technology Group of the Pompeu Fabra University in Barcelona. He is currently working as a Research Scientist at Pandora. He is also an Assistant Professor of Machine Learning at the Pompeu Fabra University. He has more than 20 publications in top-tier peer-reviewed conferences and journals and holds a B.S. in Computer Science, a B.A. in Musicology, and a Major in Jazz Composition. He also works as a composer for films and produces his own songs. He sings and plays guitar, timple (a kind of ukulele from the Canary Islands), and synthesizers.

<figure class="figure w-100">
  <img src="{{ '/posts/Sergio_Oramas_interview/sergio_photo.jpg' | relative_url }}" alt="Sergio during our interview" class="figure-img img-fluid mx-auto d-flex" style="width: 500px;"/>
  <figcaption class="figure-caption text-center">
  Sergio during our interview at ISMIR 2019 
  </figcaption>
</figure>

#### Hello Sergio, it is nice to have you here. ISMIR is a great occasion to meet all the MIR researchers. We want to take the occasion to get to know you and discuss some of the hot topics on MIR. For starters, Could you please introduce yourself? 
 
Thanks, it is nice to be here. About me, I did my PhD at Pompeu Fabra University with Xavier Serra. My PhD was about Natural Language Processing (NLP) applied to music recommendation and classification. At first, I started with the long tail problem, where most of the tracks are not discovered or listened to. My motivation was that I have a band and we needed to reach the crowd and get our audience. But how can a band find the right crowd? 
So, I decided to work with the text. I found the text to be more interesting than audio. Especially, that there is a lot of text about music on the internet that is not being used. So, I started learning more about NLP and how to work with text. Afterward, I went to Pandora for an internship where I started working with audio instead. I learned more about using audio and deep learning there. Then, I found that the text is interesting but the audio is even more interesting, especially with the recent progress in deep learning. Finally, I decided to work with both and move to multi-modal approaches and get the best out of both worlds.

#### I totally understand. I am more comfortable working with audio, but it is always useful to extend knowledge by combining different domains... So, after your PhD you started working full-time for Pandora, how is that? 
It is nice. After my PhD, I started working with Pandora remotely from Barcelona with 2 other researchers all working remotely in Europe. Sometimes I would have meetings at night with the people working in California, but it is not a problem. It was complicated to move to California so I stayed in Barcelona and agreed to work remotely. 
 
#### That is a very nice arrangement. So what are you working on currently? 
Currently, I am working on voice queries, which is understanding what the user is asking for in the voice commands. We try to understand the request, identify the entities and/or the tags in the request to find the right item in the catalog. It is not so simple because there are different words used to describe the same things which need a solution. Also sometimes, the tags would overlap with an entity, i.e. some artists or albums have the same name as a tag and we need to identify both. I do not work with audio so much at the moment though. The queries are often transformed into text, which is someone else’s work, and then I work with the text to identify the tags and entities in the query. 

#### So people are not just asking for a specific track, but rather certain tags or playlists? 
Yes, there are different commands. I am working with the "play music" command, which can be a track, tag, or context. For example, people can ask for music for a certain activity, location, or even some demographics. The most complicated part is that tags overlap a lot with entity names (e.g. artists or tracks), which is more complicated to solve. 

#### That is indeed very interesting and I do not recall finding a lot of work about this problem. You have published any recent papers about this work already?
Not yet. It is hard to get accepted in NLP conferences when working on music and specifically when it is an industrial application. And in ISMIR, I have never really found a lot of interaction with people when working with NLP. So I am thinking of starting a workshop about NLP applied in MIR, which would be an interesting venue for people who are working on both topics to get together.  

#### That definitely would be a great idea. I am looking forward to hearing more about it... So let’s talk a little about music recommendation as it is one of the key topics in MIR that both of us worked on. How did you approach it during your internship in Pandora? 
In my internship, I worked mainly on the cold-start problem using audio. It is easy to recommend tracks that people are already listening to, but it is harder to recommend the rest of the catalog. Some of this work is going already into production, but I am not working on that anymore so I do not know the current state.

#### I see. Well, many of the current approaches, especially collaborative filtering, are working quite well and provide a decent recommendation. In your opinion, what are some of the future directions that would need more attention to improve the recommendation process? 
One interesting problem is the multi-stakeholder recommendations. Currently, we are only recommending based on what the user likes and dislikes. For example, we need to consider the artist or the record label as well. Instead of optimizing the metrics of the user satisfaction only, we could optimize the metrics for the rest of those stakeholders which is an interesting work. 

#### Yes that is a very interesting problem. I had a discussion with one of the ISMIR attendees earlier about the same problem. One common question we had was: what could the artist metrics be? How do you recommend according to an artist's needs?? I mean the artist would want to be recommended and there are no likes or dislikes or bad recommendations from the artist's point of view, are there? 
Maybe the artist is harder to define, but perhaps for genres, you want to balance between the recommendations of different genres. I am not very sure because I didn’t work on it yet but it is an interesting problem. 

#### Indeed. Don’t you think that we would be interfering too much in the decision of what people listen to? I mean if one genre or artist is more popular, maybe it is because they earned it and we shouldn’t interfere? 
Yes, that’s true. But what is the reason why people are listening to popular artists? Maybe it is also because we enforced it somehow. So it needs more study for sure. 

#### Another point, Don't you think the current music streaming create passive users, where users usually just listen to whatever they have on or some already created playlists, without really knowing the artist or the album? If we really give good recommendations, aren’t we creating more of these passive users who do not interact as much with the artists? 
Ah, that is totally true. Even me as a consumer I care more about listening to new music, so I put the radio or recommendations, and it is true you listen to them and you don’t have much information about them. But someone has said something relevant recently, we need to give the user some control over the recommendation. For example, have the option to select different modes, for example, "explore mode", or "more obscure tracks of this artist", or "similar tracks related to that artist" or just "popular tracks". And also, we need more transparency about the recommendations to understand why things are being recommended and to get the user more involved in the process and the music listening experience. 

#### Indeed that is a great idea. Well, Sergio, it was very nice meeting you. Wish you the best and hope to see you again. 
Thank you, same to you. 
