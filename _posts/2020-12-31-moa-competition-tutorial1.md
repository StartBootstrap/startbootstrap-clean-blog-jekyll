---
layout: post
title: "Approaching the MoA tabular data competition on Kaggle"
subtitle: "Solution that achieves medal zone placement on a tabular data Kaggle competition."
date: 2020-12-31
background: '/img/posts/06.jpg'
---

> # "Can you improve the algorithm that classifies drugs based on their biological activity?"

# About

The goal of this blog post is to describe a medal winning solution to the [MoA competition](https://www.kaggle.com/c/lish-moa/overview) on Kaggle. Since this was my first ranked competition on Kaggle and I do not have plenty of Data Science experience I would say that this blog post is going to be most suitable for beginners in this domain. 

While describing the solution, my idea is to focus more on the overall concepts rather than going into details of the code. 

# Competition explanation

The MoA abbreviation in the title of the competition stands for Mechanisms of Action. I do not have any domain knowledge for this competition so here are some defenition that I took from the competition page where they describe some of the needed terms in order to understand the data better.

**_What is the Mechanism of Action (MoA) of a drug?_** 

_"In the past, scientists derived drugs from natural products or were inspired by traditional remedies. Very common drugs, such as paracetamol, known in the US as acetaminophen, were put into clinical use decades before the biological mechanisms driving their pharmacological activities were understood. Today, with the advent of more powerful technologies, drug discovery has changed from the serendipitous approaches of the past to a more targeted model based on an understanding of the underlying biological mechanism of a disease. In this new framework, scientists seek to identify a protein target associated with a disease and develop a molecule that can modulate that protein target. As a shorthand to describe the biological activity of a given molecule, scientists assign a label referred to as mechanism-of-action or MoA for short."_

**_How do we determine the MoAs of a new drug?_**

_"One approach is to treat a sample of human cells with the drug and then analyze the cellular responses with algorithms that search for similarity to known patterns in large genomic databases, such as libraries of gene expression or cell viability patterns of drugs with known MoAs._

_In this competition, you will have access to a unique dataset that combines gene expression and cell viability data. The data is based on a new technology that measures simultaneously (within the same samples) human cells’ responses to drugs in a pool of 100 different cell types (thus solving the problem of identifying ex-ante, which cell types are better suited for a given drug). In addition, you will have access to MoA annotations for more than 5,000 drugs in this dataset. Note that since drugs can have multiple MoA annotations, the task is formally a multi-label classification problem."_

In more concrete terms we have training data that contains _23 814_ rows where each row has _876_ columns. Each row represents a single sample in the experiments and it is associated with a unique identifier _sig_id_. Additionaly, we have a target dataset that contains _23 814_ rows and _207_ columns where 1 column is for the _sig_id_ while the other 206 are representing the unique MoA targets. So, for every sample in the training data we have associated target vector in the target dataset that represents which MoAs are activated given the sample gene expressions and cell viability. Our solutions are scored on a new test dataset that contains around _12 000_ rows with the same 876 feature columns and we need to predict the activated MoAs for every sample in this dataset.

This competition belongs to the "Code competition" class of the possible [Kaggle competition types](https://www.kaggle.com/docs/competitions#kernels-only-FAQ). For this competition your solution must finish under 2 hours if it runs on GPU or under 9 hours if it runs on CPU. While the competition lasted our solutions were evaluated on 25% of the test data which is known as public leaderboard. When the competition officially ends they are evaluated on the rest of the test data and we get the final standings which are known as private leaderboard. What is really interesting and challenging in the final days of the competition is that you can select only 2 solutions that will be scored on the private leaderboard. So, you need to be careful to not overfit the public leaderboard and select models the generalize the best on new data. This was tricky for me because I had submitted over 150 solutions and I had to choose only 2, but I managed to make a good selection and after revealing the private leaderboard I jumped over 850 positions.

If you are interested in reading more of the competition insights here is a really nice [discussion](https://www.kaggle.com/c/lish-moa/discussion/184005) that explains some of the things in more details and if you are more interested in deep exploratory data analysis [here](https://www.kaggle.com/headsortails/explorations-of-action-moa-eda) is a nice notebook that does that .

# Defining the problem

Let's have two variables **_X_** and **_Y_** and a function **_S(X) &rarr; Y_**. The variable **_X_** represents an input feature vector for the problem which is just an array of float numbers while the target vector **_Y_** is just an array of numbers where each number is between 0 or 1. We need to find implementation for the solution function **_S_** that for a given arbitrary input vector **_X<sub>i</sub>_** it will provide us output vector **_Y<sub>i</sub>_** that we think the best describes the given input **_X<sub>i</sub>_**. 

_But what it means to best describe the given input ?_

For a given input vector **_X_** we don't know the true output **_Y<sub>true</sub>_** so the best thing we can do is to come up with an approximation of it. We can call our approximated output **_Y<sub>pred</sub>_**  where we obtain it from passing **_X_** in the solution function **_S_**. On the other hand, the organizers of this competition know the true output for every input vector so they define a loss function **_L(Y<sub>true</sub>,  Y<sub>pred</sub>) &rarr; V_** where the value _V_ is just a float number that represents how far is our **_Y<sub>pred</sub>_**  approximation from the true value **_Y<sub>true</sub>_**. The oraganizers want us to predict values as close as possible to the true ones, so the goal of this competition is to minimize this loss function **_L_**. When we rewrite what we have said before, for a given input **_X_** we need to find a solution function **_S_** that minimizes the loss function **_L(Y<sub>true</sub>,  S(X)) &rarr; V_**.

In order to find a good approximation function the organizers have provided us with a train dataset **_D<sub>train</sub>_**  which is a list of train examples where each example is represented as tuple (**_X_**, **_Y_**). With this dataset at hand we need to find good use of it in order to improve our soulution function **_S_** that we have defined before. Additionaly, there is a test dataset **_D<sub>test</sub>_** where the true **_Y_** values are hidden from us. We need to approximate those values using our solution function. In the end our score is calculated by summing up the values of the loss function **_L_** for every sample in the test dataset.

As you can have guessed by now, the input vector **_X_** will be a subset of the _876_ columns given in the training data. I say subset because we are not gonna use all of the features that are given to us. The output vector **_Y_** will be the the probability vector over the MoAs activation meaning that every _i<sup>-th</sup>_ element in this vector represents the probability of the  _i<sup>-th</sup>_ MoA being activated. The [competition loss](https://www.kaggle.com/c/lish-moa/overview/evaluation) function **_L_** is the mean columnwise [log loss](https://www.kaggle.com/dansbecker/what-is-log-loss).


