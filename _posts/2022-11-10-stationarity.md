---
layout: post
title: "Stationarity in Python"
subtitle: "tests and the reason behind"
author:  Gabriela Filipkowska
date: 2022-11-10 -0400
edit: 2022-11-21
background: '/img/bg-post.jpg'
---

## Background

Before we jump into looking if our time series are stationary or not. Firstly, we need to understand what it means and why it is important.

What does stationary time series mean? It simply means that its joint probability distribution is time-invariant.
In a regression model, the ordinary least squares (OLS) estimators are not consistent for non-stationary series and the standard statistical 
tests are not valid. Meanwhile, many of statistical tests assume that the data is stationary. Therefore, making it very important to consider 
when doing some data analysis.


## Tests for unit root and stationarity in Python

There are a many unit-root and stationarity tests available. However, here, I will focus on the most popular ones, i.e. Augmented Dickey-Fuller ('ADF') 
and Phillips-Perron ('PP'), and for checking the stationarity, Kwiatkowski-Phillips-Schmidt-Shin ('KPSS'). ADF and PP tests test a null hypothesis that the 
process contains the unit root against the alternative that the process in weakly stationary. Whereas the KPSS test tests the null hypothesis of the process being 
weakly stationary against the alternative that the process contains a unit root.

