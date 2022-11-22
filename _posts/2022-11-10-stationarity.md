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

To begin with, lets create time series:

```python
> import numpy as np
> import matplotlib.pyplot as plt

> mean, standard_dev = 0, 1
> errors = np.random.normal(mean, standard_dev, 1000)
> y_1 = []
> for i in range(0,1000):
>     y_1.append(errors[i])  
> plt.plot(y_1)
```

    
![png](/img/posts/stationarity/constant.png)
    

To test this series we run the following code:

```python
> from arch.unitroot import PhillipsPerron
> print(PhillipsPerron(y_1, trend='c'))
```

         Phillips-Perron Test (Z-tau)    
    =====================================
    Test Statistic                -31.959
    P-value                         0.000
    Lags                               22
    -------------------------------------
    
    Trend: Constant
    Critical Values: -3.44 (1%), -2.86 (5%), -2.57 (10%)
    Null Hypothesis: The process contains a unit root.
    Alternative Hypothesis: The process is weakly stationary.
    


```python
> from arch.unitroot import ADF
> print(ADF(y_1, method = 'bic', trend='c'))
```

       Augmented Dickey-Fuller Results   
    =====================================
    Test Statistic                -31.923
    P-value                         0.000
    Lags                                0
    -------------------------------------
    
    Trend: Constant
    Critical Values: -3.44 (1%), -2.86 (5%), -2.57 (10%)
    Null Hypothesis: The process contains a unit root.
    Alternative Hypothesis: The process is weakly stationary.
    


```python
> from arch.unitroot import KPSS
> print(KPSS(y_1, trend='c'))
```

        KPSS Stationarity Test Results   
    =====================================
    Test Statistic                  0.157
    P-value                         0.369
    Lags                                2
    -------------------------------------
    
    Trend: Constant
    Critical Values: 0.74 (1%), 0.46 (5%), 0.35 (10%)
    Null Hypothesis: The process is weakly stationary.
    Alternative Hypothesis: The process contains a unit root.
    

For the PP and ADF tests, we were able to reject the null hypothesis, whereas for the KPSS we were not able to do this. 
However, since they have somewhat opposite hull hypotheses, all three results point on the corresponding series being stationary.

For trending series:

```python
> x=np.arange(0, 10, 0.01)
> y_2 = []
> for i in range(0,1000):
>    y_2.append(x[i]+errors[i])  
> plt.plot(y_2)
```


    
![png](/img/posts/stationarity/trending.png)
    



```python
> print(PhillipsPerron(y_2, trend='c'))
> print("")
> print(ADF(y_2, method = 'bic', trend='c'))
> print("")
> print(KPSS(y_2, trend='c'))
```

         Phillips-Perron Test (Z-tau)    
    =====================================
    Test Statistic                 -8.205
    P-value                         0.000
    Lags                               22
    -------------------------------------
    
    Trend: Constant
    Critical Values: -3.44 (1%), -2.86 (5%), -2.57 (10%)
    Null Hypothesis: The process contains a unit root.
    Alternative Hypothesis: The process is weakly stationary.
    
       Augmented Dickey-Fuller Results   
    =====================================
    Test Statistic                 -0.746
    P-value                         0.834
    Lags                               11
    -------------------------------------
    
    Trend: Constant
    Critical Values: -3.44 (1%), -2.86 (5%), -2.57 (10%)
    Null Hypothesis: The process contains a unit root.
    Alternative Hypothesis: The process is weakly stationary.
    
        KPSS Stationarity Test Results   
    =====================================
    Test Statistic                  5.072
    P-value                         0.000
    Lags                               19
    -------------------------------------
    
    Trend: Constant
    Critical Values: 0.74 (1%), 0.46 (5%), 0.35 (10%)
    Null Hypothesis: The process is weakly stationary.
    Alternative Hypothesis: The process contains a unit root.
    
Here, since we did not allow for tending series, two of the test results illustrate that the series may be non-stationary.