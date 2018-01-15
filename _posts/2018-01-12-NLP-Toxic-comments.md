---
layout: post
title: NLP EDA
---

Nowadays, people exchange over trillions of words per day. Especially, people want to raise their voices for things that they care. However, threat and harassments in online can make people to stop expressing their voices and give up looking other people's opinion. By this, platforms want to create models to check comments' degree and limit or completely ban the users who threat and harass others.

This is one of competition from Kaggle, Toxic Comment Classification Challenge. According to the description, 
"...The Conversation AI team, a research initiative founded by Jigsaw and Google (both a part of Alphabet) are working on tools to help improve online conversation. One area of focus is the study of negative online behaviors, like toxic comments (i.e. comments that are rude, disrespectful or otherwise likely to make someone leave a discussion). So far they’ve built a range of publicly available models served through the Perspective API, including toxicity. But the current models still make errors, and they don’t allow users to select which types of toxicity they’re interested in finding (e.g. some platforms may be fine with profanity, but not with other types of toxic content)...".

The dataset is from Wikipedia's talk page edits' comments. I challenge to build a multi-label classification that capable to detect different types of toxicity such as threats, obscenity, insults, and identity-based hate. In this post, I want to use my NLP skills in exploratory data analysis.  

## EDA


### About Data

![an image alt text](/images/toxic_comments/data_size.png "Data Size")

I open train and test data and check the size of data. Train dataset has 95,851 lines and test dataset has 226,998 lines of data, which is 30:70 train and test split. 




![an image alt text](/images/toxic_comments/train_tail.png "Train Tail part")

When I look inside of train set, there are 8 columns, id, comment_text, toxic, severe_toxic, obscene, threat, insult, and identity_hate. Therefore, I analyze comment_text columns to check characteristics of each target. 


### Data Analysis


In this stage, I explore the data and find out characteristics of each target. 

![an image alt text](/images/toxic_comments/with_clean_comments.png "Number of Each Class")

First, I look the size of each target with comparing with the clean comment. There are 86,061 clean comments out of 95,861 total train set. 

![an image alt text](/images/toxic_comments/without_clean_comments.png "Number of Each harmful Class")

In the non-clean comment, most of the comments are classified as toxic, obscene, and insults. 

![an image alt text](/images/toxic_comments/comments.png "Frequent Words on Each Class")


Lastly, I use Wordcloud to find out what kind of words are frequently come out in each class.



## Next Steps


In this post, I use my exploratory data analysis skills to check and see the characteristics of data. However, my EDA stage is still on-going. I plan to engineer features to reveal inside of each harmful class. After that, I plan to use several classification techniques to build models that determine toxic comments. To be continued. 