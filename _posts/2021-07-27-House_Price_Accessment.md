---
layout: post
title: "House Price Prediction"
subtitle: 

background: '/img/house_prediction/house.jpg'
---

## House Price Prediction


Thousands of houses are sold everyday. There are some questions every buyer asks himself like: What is the actual price that this house deserves? Am I paying a fair price? In this paper, a machine learning model is proposed to predict a house price based on data related to the house (its size, the year it was built in, etc.). During the development and evaluation of our model, we will show the code used for each step followed by its output. This will facilitate the reproducibility of our work. In this study, Python programming language with a number of Python packages will be used.

### Goal Of Objectives

The main objectives of this study are as follows:

To apply data preprocessing and preparation techniques in order to obtain clean data
To build machine learning models able to predict house price based on house features
To analyze and compare models performance in order to choose the best model


```python
# Importing the libraries
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelBinarizer # one hot encoding
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.metrics import accuracy_score
import xgboost as xgb
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import *
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_predict
import seaborn as sns
```

1)Read the dataset into a data table using Pandas


```python
dataset=pd.read_csv('House_Pricing.csv')
```


```python
dataset.head(3)
```


```python
dataset.dtypes
```


```python
dataset.shape 
```

2) Remove (House number,Unit number,Street Name,Zip Code) columns


```python
dataset=dataset.drop(['house_number', 'unit_number','street_name','zip_code'], axis = 1) 
```

After removing four columns, dataset has 16 columns only.


```python
price_category=dataset['sale_price']
print('Maximum price : ',price_category.max() )
print('Minimum price : ',price_category.min())
print('Mean price :',price_category.mean())
```

3) Convert Y variable (Price) into 2 categories


```python
#set up bins
bin=[664.0,441986.20551249327,22935778.0]
#use pd.cut function can attribute the values into its specific bins
# 'o' means the range between minimum and mean values, '1' means the range between mean and maximum values
category = pd.cut(price_category,bin,labels=['0','1'])  
category = category.to_frame()
#Replace an entire  sale_price and its bin
new_dataset = dataset.assign(sale_price=category)
```

After converting categorical varibales


```python
new_dataset.head(1)
```


```python
# year_built
#descriptive statistics summary
new_dataset['year_built'].describe()
```


```python
plt.hist(new_dataset['year_built'],bins=10)
plt.title('Building Year')
plt.xlabel('Year')
plt.ylabel('Number of Buildings')
sns.despine
```

Looking at the bar plot , Chadstad city has the maximum number of buildings.

Checking the relation between two variables using correlation 


```python
corrmax=round(new_dataset.corr(),2)
```


```python
top_corr_features=corrmax.index
```


```python
fig,ax=plt.subplots(figsize=(12,12))
sns.heatmap(corrmax,vmin=0,vmax=1,square=True,annot=True,linewidth=.5)
```

There's no strong correlation between any two variables. The strongest correlation is between total_sqft and livable_sqft features.


```python
###Try to see how many null values have using heatmap(2-D)dimension ?
sns.heatmap(new_dataset.isnull(),yticklabels=False,cbar=False)
```

After checking 2-dimensional heatmap  , then no missing values 

4) Replace categorical data with one-hot encoded data(Garage type,city)


```python
new_dataset['garage_type'].value_counts()  
```


```python
new_dataset['garage_type'].value_counts().plot(kind='bar')
plt.title('Type of Garge')
plt.xlabel('Garge')
plt.ylabel('Units')
sns.despine
```


```python
# Replace categorical data with one-hot encoded data(Garage type,city)
new_dataset['garage_type']
new_dataset.groupby('garage_type').size()
# convert the data type to category
new_dataset['garage_type'] = new_dataset['garage_type'].astype('category')
```


```python
#label encoding
new_dataset['garage_type_cat']= new_dataset['garage_type'].cat.codes
```


```python
new_dataset.groupby(['garage_type', 'garage_type_cat']).size()
```


```python
df_one_hot = new_dataset.copy()
lb = LabelBinarizer()
lb_results = lb.fit_transform(df_one_hot['garage_type'])
lb_results_df = pd.DataFrame(lb_results, columns=lb.classes_)
```


```python
## concatenate this data to our data set
final_df = pd.concat([df_one_hot, lb_results_df], axis=1)
print('original df dimensions:', new_dataset.shape)
print('one hot encoded df dimensions:', final_df.shape)
```


```python
# Replace categorical data with one-hot encoded data(city)
final_df['city']
final_df.groupby('city').size()
# convert the data type to category
final_df['city'] = final_df['city'].astype('category')
```


```python
#label encoding
final_df['city_cat']= final_df['city'].cat.codes
```


```python
final_df.groupby(['city', 'city_cat']).size()
```


```python
# one hot encoding
df_one_hot = final_df.copy()
lb = LabelBinarizer()
lb_results = lb.fit_transform(df_one_hot['city'])
lb_results_df = pd.DataFrame(lb_results, columns=lb.classes_)
lb_results_df.head()
# concatenate this data to our data set
final_dataset = pd.concat([final_df, lb_results_df], axis=1)
```


```python
print('original df dimensions:', dataset.shape)
print('one hot encoded df dimensions:', final_dataset.shape)
```


```python
df=final_dataset.drop(['garage_type', 'city'], axis=1)  # dropping city and garage_type columns
```


```python
# Check for Missing Values in Dataset
df.isnull().any()
```

find out null values in sale column


```python
#missing values in sale_price column
df.dropna(axis=0, how='any', inplace=True)
```


```python
df.shape
```


```python
#descriptive statistics summary
df['sale_price'].describe()
```


```python
df['sale_price'].value_counts()
```


```python
df['sale_price'].value_counts().plot(kind='bar')
plt.title('Sale Price Unit')
plt.xlabel('Sale')
plt.ylabel('Amount')
sns.despine
```

5) Create the X and y arrays


```python
df_Train=df.iloc[1000:,:] #copying all columns inside df_train
X=df_Train.drop(['sale_price'],axis=1) # dropping sale_price column
y = df.loc[1000:, 'sale_price'].values
```

6) Split the data set in a training set (70%) and a test set (30%)


```python
X_train, X_test, Y_train, Y_test = train_test_split(X, y, test_size=0.3, random_state=0)
```

# Feature Scaling


```python
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)
```

# 7) Define a model, using Random Forest and Gradient Boosting Classifier

# Random Forest Classifier


```python
random_classifier=RandomForestClassifier(
            max_depth=6, max_features=1.0, 
            min_samples_leaf=17,
            n_estimators=500, n_jobs=-1, random_state=0,
            )
```


```python
random_classifier.fit(X_train,Y_train)
```


```python
#Predicting the test set results
y_pred = random_classifier.predict(X_test)
```


```python
y_pred
```


```python
#Accuray Score
accuaracy=accuracy_score(Y_test, y_pred)
print("Random Forest Classifier : %.2f%% "%(accuaracy*100.0))
```


```python
print("Confusion Matrix:")
print(confusion_matrix(Y_test, y_pred))

print("Classification Report")
print(classification_report(Y_test, y_pred))
```

# Random Forest Classifier  Using GridSearch


```python
param_grid = {
    'bootstrap': [True],
    'max_depth': [6],
    'max_features': [1.0],
    'min_samples_leaf': [17],
    'criterion': ['gini'],
    'n_estimators': [500],
    'random_state':[0],
}
```


```python
random_classifier_ = RandomForestClassifier()
```


```python
random_gridsearch = GridSearchCV(random_classifier_, param_grid=param_grid, n_jobs=-1, cv= 2,
                   scoring='accuracy')
```


```python
random_gridsearch.fit(X_train,Y_train)
```


```python
best_parameters = random_gridsearch.best_params_
print(best_parameters)
```


```python
best_result = random_gridsearch.best_score_
print("Score of Random Forest Classifier Using GridSearchCV : %.2f%% " %(best_result*100.0))
```


```python
#Predicting the test set results
y_pred_gridsearch = random_gridsearch.predict(X_test)
```


```python
y_pred_gridsearch
```


```python
#Accuray Score
accuaracy=accuracy_score(Y_test, y_pred_gridsearch)
print("Accuracy of Random Forest Classifier Using GridSearchCV: %.2f%% "%(accuaracy*100.0))
```


```python
print("Confusion Matrix:")
print(confusion_matrix(Y_test, y_pred_gridsearch))

print("Classification Report")
print(classification_report(Y_test, y_pred_gridsearch))
```

# Gradient Boosting Classifier Model


```python
gb_clf = GradientBoostingClassifier(n_estimators=500, learning_rate=0.2, max_features=1.0, max_depth=6, random_state=0)
```


```python
gb_clf.fit(X_train,Y_train)
```


```python
gb_y_pred = gb_clf.predict(X_test)
```


```python
print("Confusion Matrix:")
print(confusion_matrix(Y_test, gb_y_pred))

print("Classification Report")
print(classification_report(Y_test, gb_y_pred))
```


```python
# Accuray Score
accuaracy=accuracy_score(Y_test, gb_y_pred)
print("Accuracy Score of Gradient Boosting Classifier : %.2f%% "%(accuaracy*100.0))
```

# Gradient Boosting Classifier Model Using GridSearch


```python
parameters={
 'learning_rate':[0.1],
 'max_depth': [6],
 'max_features': [1.0],
 'min_samples_leaf': [5],
 'min_samples_split': [12],
 'n_estimators': [500],
  'random_state':[0]
}
```


```python
gb_clf = GradientBoostingClassifier()
```


```python
gb_gridsearch = GridSearchCV(gb_clf,parameters, n_jobs=-1, 
                   cv=2, 
                   scoring='accuracy',
                   verbose=2, refit=True)
```


```python
gb_gridsearch.fit(X_train, Y_train)   
```


```python
best_parameters = gb_gridsearch.best_params_
print(best_parameters)
```


```python
best_result = gb_gridsearch.best_score_
print("Score of Gradient Boosting Classifier Using GridSearchCV : %.2f%% " %(best_result*100.0))
```


```python
gb_gridsearch_y_pred = gb_gridsearch.predict(X_test)
```


```python
gb_gridsearch_y_pred
```


```python
print("Confusion Matrix:")
print(confusion_matrix(Y_test, gb_gridsearch_y_pred))

print("Classification Report")
print(classification_report(Y_test, gb_gridsearch_y_pred))
```


```python
# Accuray Score
accuaracy=accuracy_score(Y_test, gb_gridsearch_y_pred)
print("Accuracy of Gradient Boosting Classifier Using GridSearchCV : %.2f%% "%(accuaracy*100.0))
```

# XGBoost Classifier


```python
xgb_model = xgb.XGBClassifier(n_estimators=500, learning_rate=0.2, max_features=1.0, max_depth=6, random_state=0)
```


```python
xgb_model.fit(X_train, Y_train)
```


```python
xgb_y_pred=xgb_model.predict(X_test)
```


```python
print("Confusion Matrix:")
print(confusion_matrix(Y_test, xgb_y_pred))

print("Classification Report")
print(classification_report(Y_test, xgb_y_pred))
```


```python
# Accuray Score
accuaracy=accuracy_score(Y_test, xgb_y_pred)
print("Accuracy of XGBoost Classifier : %.2f%% "%(accuaracy*100.0))
```

# XGboost Classifier Using GridSearch


```python
xgb_model = xgb.XGBClassifier()

param = {
    "learning_rate": [0.2],
    "max_depth":[6],
    "min_samples_leaf":[3],
    "max_features":[1.0],
    "n_estimators":[500],
    "random_state":[0]
    }

xg_clf_gridsearch = GridSearchCV(xgb_model, param_grid=param, n_jobs=-1, 
                   cv=2, 
                   scoring='accuracy',
verbose=2, refit=True)
```


```python
xg_clf_gridsearch.fit(X_train, Y_train)
```


```python
best_parameters = xg_clf_gridsearch.best_params_
print(best_parameters)
```


```python
best_result = xg_clf_gridsearch.best_score_
print("Score of XGBoost Classifier Using GridSearchCV : %.2f%% " %(best_result*100.0))
```


```python
xgb_gridsearch_y_pred=xg_clf_gridsearch.predict(X_test)
```


```python
print("Confusion Matrix:")
print(confusion_matrix(Y_test, xgb_gridsearch_y_pred))

print("Classification Report")
print(classification_report(Y_test, xgb_gridsearch_y_pred))
```


```python
# Accuray Score
xgcv_accuracy=accuracy_score(Y_test, xgb_gridsearch_y_pred)
print("Accuracy of XGBoost Classifier Using GridsearchCV : %.2f%% "%(accuaracy*100.0))
```

11)  Save the trained model to a file so we can use it in other programs using joblib.dump


```python
from sklearn.externals import joblib
```


```python
joblib.dump(xg_clf_gridsearch,'xgboost_model')
```


```python
load_model=joblib.load('xgboost_model')
```


```python
load_model
```

12)  Find the error rate on the training set


```python
training_error=1-(xg_clf_gridsearch.score(X_train, Y_train))
```


```python
training_error
```

13) Find the error rate on the training set


```python
test_errors=1-xgcv_accuracy
```


```python
test_errors
```

14) Try to give some real values in a list and predict them by loading the file you have saved


```python
# Future prediction valuefor 1 
future_pred=xg_clf_gridsearch.predict([0.0,100.0,200.0,300.0,400.0,500.0,600.0,700.0,800.0,900.0,1000.0,1100.0,1200.0,1300.0,1400.0,1500.0,1600.0,1700.0,1800.0,1900.0,2000.0,2100.0,2200.0,2300.0,2400.0,2500.0,2600.0,2700.0,2800.0,2900.0,3000.0,3100.0,3200.0,3300.0,3400.0,3500.0,3600.0,3700.0,3800.0,3900.0,4000.0,4100.0,4200.0,4300.0,4400.0,4500.0,4600.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0])
```


```python
future_pred   
```


```python
#Future prediction value for 0

future_pred=xg_clf_gridsearch.predict([0.0,12000.0,1100.0,0.0,1400.0,0.0,0.0,1200.0,1800.0,1500.0,0.0,0.0,1600.0,12000.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1600.0,1600.0,1700.0,2.0,0.0,1100.0,0.0,0.0,1400.0,0.0,1600.0,0.0,1200.0,0.0,1200.0,0.0,1500.0,0.0,1300.0,0.0,1700.0,1200.0,0.0,120.0,1220.0,1500.0,4700.0,0.0,0.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0,4700.0])
```


```python
future_pred
```
