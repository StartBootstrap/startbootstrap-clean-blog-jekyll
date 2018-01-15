---
layout: post
title: Ames House price prediction
---
![an image alt text](/images/ames_housing/house1.png "House")

Ames is a city in Iowa, United States where had a 2010 population of 58,965. In 2010, Ames was ranked ninth on CNN's "Best Places to Live" list. (Ames, Iowa. (2017, December 26). In Wikipedia)
In this project, I try to create a model to predict house price in Ames. 



## EDA

![an image alt text](/images/ames_housing/sale_price.png "Sale Price Distribution")

When I see the distribution of sale price, it is a right-skewed distribution. Most of the sales occur in the range between $100,000 and $ 300,000.


![an image alt text](/images/ames_housing/outliers.png "Lot Area")

One interesting thing I find out from EDA, if lot area is bigger than 40,000, it does not influence sale price. Therefore, if a new dataset has a lot area over 40,000, I should use mean of outliers, which is $ 230,752.47.


## Model
I use gradient boosting regressor to predict sale price of the house in Ames. Gradient boosting regressor is a machine learning method, which builds a prediction model with an ensemble of weak previous models. By this, gradient boosting model finds optimization of the loss function.  Moreover, I find out that following factors are important conditions to determine sale price in Ames.
1. Living Area(Garage Area, Total square feet)
2. New House
3. Neighborhood


![an image alt text](/images/ames_housing/prediction.png "Prediction vs Actual Sale Price")

My model's R^2 is 0.93 and root mean square error is 22,737.25. The scatter shows my prediction against actual sale price. The dotted line represents perfect matched between prediction and actual sale price. 


## Conclusion
My model works better on the range between $100,000 and $300,000, where most of the sales occur. Yet, it has a weakness to predict a house with a higher price. Moreover, it does not have any information on a price that either buyer or seller offers. It may have some influence on a final sale price.


