---
layout: post
title: "Approaching the MOA tabular data competition on Kaggle"
subtitle: "Solution that achieves medal zone placement on a tabular data Kaggle competition."
date: 2020-12-31
background: '/img/posts/06.jpg'
---

# About

The goal of this blog post is to describe a medal winning solution to the [MOA copmetition](https://www.kaggle.com/c/lish-moa/overview) on Kaggle. Since this was my first ranked competition on Kaggle and I do not have plenty of Data Science experience I would say that this blog post is going to be most suitable for beginners in this domain. 

While describing the solution, my idea is to focus more on the overall concepts rather than going into details of the code. 

# Defining the problem

Lets have two variables **_X_** and **_Y_** and a function **_S(X) &rarr; Y_**. The variable **_X_** represents an input feature vector for the problem which is just an array of float numbers while the target vector **_Y_** is just an array of numbers where each number is either 1 or 0. We need to find implementation for the solution function **_S_** that for a given arbitrary input vector **_X<sub>i</sub>_** it will provide us output vector **_Y<sub>i</sub>_** that we think the best describes the given input **_X<sub>i</sub>_**. 

_But what it means to best describe the given input ?_

For a given input vector **_X_** we don't know the true output **_Y<sub>true</sub>_** so the best thing we can do is to come up with an approximation of it. We can call our approximated output **_Y<sub>pred</sub>_**  where we obtain it from passing **_X_** in the solution function **_S_**. On the other hand, the organizers of this competition know the true output for every input vector so they define a loss function **_L(Y<sub>true</sub>,  Y<sub>pred</sub>) &rarr; V_** where the value _V_ is just a float number that represents how far is our **_Y<sub>pred</sub>_**  approximation from the true value **_Y<sub>true</sub>_**. The oraganizers want us to predict values as close as possible to the true ones, so the goal of this competition is to minimize this loss function **_L_**. When we rewrite what we have said before, for a given input **_X_** we need to find a solution function **_S_** that minimizes the loss function **_L(Y<sub>true</sub>,  S(X)) &rarr; V_**.

In order to find a good approximation function the organizers have provided us with a train dataset **_D<sub>train</sub>_**  which is a list of train examples where each example is represented as tuple (**_X_**, **_Y_**). With this dataset at hand we need to find good use of it in order to improve our soulution function **_S_** that we have defined before. Additionaly, there is a test dataset **_D<sub>test</sub>_** where the true **_Y_** values are hidden from us. We need to approximate those values using our solution function. In the end our score is calculated by summing up the values of the loss function **_L_** for every sample in the test dataset.



# Explanation of the data







For this problem we are given the following data:

* train_features.csv - this file contains the features that are available to us
* 

As a training data for this competition we are given a _csv_ file that contains all the available features for us. Based on this data we should craete a solution that will accept new 



