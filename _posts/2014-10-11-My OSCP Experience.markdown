---
title: My OSCP Review
layout: post
permalink: /OSCP
---

####OSCP

So I recently took the OSCP course offered by Offensive Security. Not only will this course push your critical and
lateral thinking to the limits, it will test your determination for sure. Before I started even thinking about 
signing up for the course, I read several reviews online. Some of them made OSCP look out of my league. Some of them 
made the course sound very challenging but just as rewarding. I dont have any real world information security 
experience. I thought about signing up for several weeks, debating whether I should wait until I am finished with my 
graduate degree or just diving straight in. I decided to just go ahead and sign up. I wasnt going to be any more 
prepared by postponing the course. So two weeks later after registering for OSCP, I received my lab manual and course 
videos via email and began working through the material. You will have around 40+ hours of video and roughly 350+ 
pages in the manual. It took me 60 days to work through that material and finish the exercises. There was a ton of information.
 
Afterwards, I moved on to the best part of this course, the labs. The labs contained roughly 50-55 hosts of varous 
operating systems, with different configurations and applications/services running on each. I was able to own the 
first few hosts quite easily with metasploit. It was all downhill after that. Whenever I hit a wall on a particular host
, I was able to vent my frustrations on the offsec irc channel. Here you will find the admins and other students. The 
admins are willing to provide hints, provided that you did your due dilligence in enumeration. I had the chance to meet
some pretty cool and intelligent people while taking the course. We hopped on irc to share ideas, expertise, and brag 
about the last host we pwned. After another 30 days, I was able to obtain root/SYSTEM privileges on 48 hosts in total. 
The most memorable of the lot was gh0st, Pain, Sufference, and Jack. Some of these werent necessarily the most 
difficult in the labs but I learned the most from them. I think the difficulty of hacking away at any host in the lab 
is subjective to the persons skill level and knowledge. Prior to starting the course, I had some preparation. I spent 
about 3 weeks watching assembly language tutorials for Windows and Linux at securitytube.net . I also spent more than 
a month getting familiar with metasploit and running exploits against my own virtual machines. I even spent some time 
working with python. This was not nearly enough to prepare for the OSCP course. With that being said, I think offsec 
does a great job of providing you with the basics and then unleashing you to conduct your own research to learn more.
 
Well, my lab time was expiring and it was time to schedule my exam. I had read hints that suggested taking breaks, 
eating a good breakfast, and most of all, enumerating EVERYTHING. The exam tasks you with hacking another network 
within 24 hours. There are restrictions on metasploit usage and a few other special conditions. Each host in the exam 
network is worth a certain amount of points. You will need a minimum number of points to pass the exam. You are also 
strongly advised to turn in a penetration testing report, detailing all of the steps taken to compromise hosts within 
the lab and exam. It is crucial that you take detailed notes while working in the labs. Unfortunately, I was not able 
to get an exam date that started in the morning so I scheduled for 5 pm. Once five oclock came around, I received my 
exam packet within 3 minutes. My first attempt fell short of success. I was only able to obtain root/system privileges 
on two hosts and a limited shell on a third. When the fail email came, it hit me like a rock. I spent so much time and 
energy on this course. It really hurt to fail. After a day or two of sulking I thought about the mistakes I made. I only
took one break during the entire exam. I didnt enumerate everything, I didnt even eat a substantial meal during those
24 hours, and I worked way too fast. I probably missed some critical details. After a day or two of sulking in my 
defeat, I mustered up the courage to take the exam again. This time around, I had written out an attack plan. When to 
take breaks, how much time to spend on enumeration for each host, things to check for in enumeration, etc. Eight hours 
into my exam, I managed to take down two hosts. I spent the next ten hours pouring over scan results and information I 
obtained about the third host. I discovered that I made the biggest mistake I could make. I made an assumption. One of 
my classmates always reminded me during the course to never EVER EVER make assumptions. Long story short, I obtained 
system privileges on the third host and had enough points to pass the exam!

Go to [Offensive Securitys](http://www.offensive-security.com) site to learn more about what they have to offer.

Here are some sites you should visit before you think about taking the course

1. [Security Tube](http://securitytube.net/)
2. [Metasploit Unleashed Tutorials](http://www.offensive-security.com/metasploit-unleashed/Main_Page)
3. [Nebula Privilege Escalation Tutorials](http://exploit-exercises.com/nebula)
