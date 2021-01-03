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

While describing the solution, my idea is to focus more on the overall concepts rather than going into details of the code. All of the solution code was implemented in Python but since my favorite programming language is Swift the short code snippets in this post are gonna be written in Swift. (TODO: ADD LINK TO REPO)

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

For a given input vector **_X_** we don't know the true output **_Y<sub>true</sub>_** so the best thing we can do is to come up with an approximation of it. We can call our approximated output **_Y<sub>pred</sub>_** where we obtain it from passing **_X_** in the solution function **_S_**. On the other hand, the organizers of this competition know the true output for every input vector so they define a loss function **_L(Y<sub>true</sub>,  Y<sub>pred</sub>) &rarr; V_** where the value _V_ is just a float number that represents how far is our **_Y<sub>pred</sub>_**  approximation from the true value **_Y<sub>true</sub>_**. The oraganizers want us to predict values as close as possible to the true ones, so the goal of this competition is to minimize this loss function **_L_**. When we rewrite what we have said before, for a given input **_X_** we need to find a solution function **_S_** that minimizes the loss function **_L(Y<sub>true</sub>,  S(X)) &rarr; V_**.

In order to find a good approximation function the organizers have provided us with a train dataset **_D<sub>train</sub>_**  which is a list of train examples where each example is represented as tuple (**_X_**, **_Y_**). With this dataset at hand we need to find good use of it in order to improve our soulution function **_S_** that we have defined before. Additionaly, there is a test dataset **_D<sub>test</sub>_** where the true **_Y_** values are hidden from us. We need to approximate those values using our solution function. In the end our score is calculated by summing up the values of the loss function **_L_** for every sample in the test dataset.

As you can have guessed by now, the input vector **_X_** will be a subset of the _876_ columns given in each sample in the training data. I say subset because we are not gonna use all of the features that are given to us. The predicted output vector **_Y<sub>pred</sub>_** will be the the probability vector over the MoAs activation meaning that the _i<sup>-th</sup>_ element in this vector represents the probability of the  _i<sup>-th</sup>_ MoA being activated. The [competition loss](https://www.kaggle.com/c/lish-moa/overview/evaluation) function **_L_** is the mean columnwise [log loss](https://www.kaggle.com/dansbecker/what-is-log-loss).

# Solution overview

In this competition I define 3 types of solution pipelines. Let's call them **_level one_**, **_level two_** and **_inference_** solution pipelines. Each of those sub-solutions is presented as a single Jupyter notebook in the github repo(TODO: ADD LINK TO REPO).

### Level one

The level one solution pipeline or the training solution pipeline represents an end-to-end solution for the problem. This means that we can represent it as a function that takes one argument **_D<sub>train</sub>_** which is the training data and returns a solution function **_S(X) &rarr; Y_** which was described in the _Defining the problem_ section. So, basically we can apply this function **_S_** to an unseen data, which is the test dataset in this case, and we can make predictions about which MoAs will get activated. In my case this function **_S_** is represented as a neural network which tries to approximate the *"real"* function **_S_** that produces the correct MoA activations for a given sample. 

Here is a code snippet written in Swift that describes the things that we explained earlier:

~~~swift
struct Dataset {}

func neural_network(train_sample: [Float]) -> [Float] { return [] }

typealias SolutionFunc = ([Float]) -> [Float]

func level_one_solution(train_data: Dataset) -> SolutionFunc { 
  return neural_network(train_sample:) 
}
~~~

_Why am I using Swift? I am using Swift to write code snippets because I have work experience as an iOS developer where Swift is the dominant language. When I started learning Python I found it a lot less readable than Swift. Maybe this is due to the lack of my deeper experience in Python but anyway I love Swift so I will stick to it whenever it is possible :)_

In this code we first define a simple _Dataset_ object which represents the training dataset. Afterwards we define a function _neural_network_ which accepts a _train_sample_ i.e input vector **_X_** and returns a list of float number which is the output vector **_Y<sub>pred</sub>_**. In the end we have _level_one_solution_ function that accepts a Dataset and returns a _SolutionFunc_ which is just cleaner way of writing `([Float]) -> [Float]` which is the Swift's way of defining a function that accepts list of floats as an argument and returns another list of floats. As an example, in the _level_one_function_ we return the previously defined neural network which will approximate the MoA activations for a given train sample. In the real implementation of this function we train a neural network on the given dataset and return it as a solution function to the problem. 

Nothing stops us from creating multiple different _level_one_solution_ functions and afterwards using the weighted average of their outputs in order to hopefully produce a better final **_Y<sub>pred</sub>_** output. In the literature this is called ensambling or blending, you can read more about this on this [blog post](https://mlwave.com/kaggle-ensembling-guide/?lipi=urn%3Ali%3Apage%3Ad_flagship3_pulse_read%3BPZ4T3JLHTu%2BOWNI0d5kFbg%3D%3D). 

I decided to have 4 different _level_one_solutions_ which will lead to 4 different types of neural networks for every function. After execution of the _level_1_ (TODOO: ADD link to github's script) solution script of the code I am going to end up with saved neural network weights for 4 different models.

### Level two

In the previous level we saw that it is perfectly valid to average the outputs of the 4 different _level_one_solutions_ in order to submit a valid solution for the competition. I wanted to see if I can extract more information before averaging the solutions's outputs.

For this level of the solution pipeline we can create new training dataset that will contain the outputs from the models of the previous layers. Let's call this dataset **_D<sub>meta</sub>_** which is also a list of train examples where each example is represented as tuple (**_X_**, **_Y_**). The **_Y_** values will be still the same as in **_D<sub>train</sub>_** but on the other hand the feature vector **_X_** will have completely different values. More precisely, it will be a vector of _824_ float values which is obtained by concatenating the 206 outputs values from the 4 different _level_one_solutions_.

In a broader perspective the _level_two_solution_ function as an input accepts a list of _level_one_solutions_ and returns returns a solution function **_S(X) &rarr; Y_**. 

~~~swift
func generate_train_data(level_one_solutions: [SolutionFunc]) -> Dataset { return Dataset() }

func level_two_solution(level_one_solutions: [SolutionFunc]) -> SolutionFunc {
    let train_dataset = generate_train_data(level_one_solutions: level_one_solutions)
    
    return level_one_solution(train_data: train_dataset)
}
~~~

From this code we can see that the _level_two_solution_ function is not that different from the level one. In the function body It calls one additional function that creates the train dataset and returns a function that trains new model on the newly created dataset. The process where we train a model on the predictions of another model is called stacking. Basically we are stacking models on top of each other. [Here](https://machinelearningmastery.com/blending-ensemble-machine-learning-with-python/) is a nice blog post that describes that. 

_Note: As I can see in the literature the terms stacking, blending and ensambling are sometimes used interchangeably. To the best of my understanding I use the term stacking when the model is trained on predictions from another models and blending or ensambling when the output of multiple models is scaled with some function. This usage may be wrong so take it with a grain of salt._

### Inference solution overview

This is the final Jupyter notebook that gets submitted to the competition. Since we saw the competition's execution time limits it makes sense to have separate notebooks where we do the training of the models and just a single notebook that does inference of all the trained models. In this solution pipeline I instantiate all the different models that were previously used and l am loading the saved training weights.

We can see that the _level_one_solution_ and the _level_two_solution_ functions are returning the same type of output which is a solution function **_S_**. So given a list of solution function **_S_** we can experiments with different blending algorithms in order to find the **_Y<sub>pred</sub>_** value that is the closest to the **_Y<sub>true</sub>_** value.

I decided to go with the weighted average algorithm which just multiplies every solution function **_S<sub>i</sub>_** with a value **_w<sub>i</sub>_** which is called a weight where the weight determines the importance of that solution function to the final predictions. The sum of all the weights should equal to 1.

# Training solution pipeline

The pipeline of training a single neural network on a given dataset for this competition consists of several processes such as: setting up cross-validation strategy, data preprocessing and training a model.

### Cross-validation strategy

After reading a lot of discussions on Kaggle on this and another competitions I realized that the creation of proper cross-validation strategy is one of the most important things in every competition. This directly influences your score because you are optimizing the function that you setup in this part. If your validation loss is not correlated to the private leaderboard then you may experience a [big shake-up](https://www.kaggle.com/c/siim-isic-melanoma-classification/leaderboard) on the final results. [Here](https://machinelearningmastery.com/k-fold-cross-validation/) is a really nice blog post that describes what is k-fold-cross validation.

In this competition's dataset we said that every sample i.e row contains a single _'sig_id'_ value which uniquely identifies that sample. Each sample consists of gene expression and cell viability of a single person. The experiments were setup in a way that for every person there are 6 different samples where each sample has different drug dose and different time recording of the biological activity. There are 2 possible drug doses and 3 different timestamps (24, 48 and 72 hours). So this makes our data not [I.I.D](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables) which easily can lead us into an invalid evaluation of our models. 

Every given drug to a person activates the same set of MoAs. Additionally, in the competition data there is a _csv_ file that describes which drug was used on every sample in the training data. We use this data to improve our setup of the 5-fold-cross validation strategy. 

I took the code for creating the cross validation strategy from this [discussion](https://www.kaggle.com/c/lish-moa/discussion/195195). It is using Drug and MultiLabel stratification strategy and the reasons are the following:

* Drug stratification - The distribution of sampled drugs is not the same so some drugs appear a lot more frequently than other drugs. Those drugs that appear very frequently are also expected to be frequent in the test dataset so they are not assigned to their own fold while drugs that are rare belong to the same fold. 
* MultiLabel stratification - As we said earlier this is multi-label classification problem where some MoAs are a lot more activated than others. For example the MoA _nfkb_inhibitor_ is activated 832 times while the MoA _erbb2_inhibitor_ is activated only once in the training data. While creating the fold data, we need to try to achieve equal activation distribution of each MoA class in every fold. If we are using 5 folds there should be roughly _832/5_ samples where _nfkb_inhibitor_ is active in every fold. This is achievable by using the MultilabelStratifiedKFold class from the [iterative-stratification project]((https://github.com/trent-b/iterative-stratification)).

### Data preprocessing

In my solution I didn't use very much data preprocessing. Before training the model I only scaled the data using QuantileNormalization or RankGaus scalers in order to help the neural network to learn easier. A lot of people on this competition used PCA as additional features to the model but I stayed away from it.

What I found challenging here is the decision for which part of the available data to fit to the scaler and which part of the data to just transform it. I assume that the correct way _by the book_ is to fit the training data and then to just transform the test data. In this way we are not leaking any information from the test data to the train data. I used this way of scaling.

Another way that I think is specific to online data science competition where we know the test features is to scale the data with all the available data (combining the train and test features). Sometimes this process can lead to better results since for every sample in the train data there is a little bit of information about the test data. But this process is risky because we won't know how the models will behave on new unseen data and we can lose some value of the generalization property.

### Training a model - level one

As I said in the _Solution overview_ section, I used 4 different _level_one_solutions_ where each of those solutions was training different neural network with different data preprocessing function.

![alt text](/img/posts/post-01-moa/train_model_explanation.png "Training models pipeline")

After the execution of this pipeline we have 4 models that are capable of providing us a solution for the MoA competition. In fact we can submit each of them separately and check their performances. What is important here to note is that every model was trained with different preprocessing function, so whenever we want to make predictions with that model on new unseen data we need to pass the data to the model's specific data preprocessing function.

In order our blending to be more successful at the end our models need to be more diversified i.e less correlated. If we blend two almost identical models then we are not gonna be getting any new information from the blend it will be just like averaging a single model. While on the other hand if we blend models that have completely different view of the world, the final blended model will have a little bit of both worlds regarding which-one was more real. To make the models more diversified I used 4 different neural network architectures and 4 different data-scaling functions. The 4<sup>th</sup> model which is a 1D-CNN was inspired by the beautiful explanaition of the [solution](https://www.kaggle.com/c/lish-moa/discussion/202256) that achieved second place on this competition. 

As discussed before, I am using 5 fold cross-validation strategy so in every solution function I will end up with 5 different weights for the neural network used in that solution. Additionally, to make the predictions more stable and to reduce the randomness I execute each solution function on 3 different seeds and in the end I average out the predictions of each seed.

### Training the stacked model - level two

When we have successfully trained the 4 separate models we can go one level further and train the stacked model. This training pipeline is almost identical like the previous one, there is just one additional detail that is creating new dataset based on the predictions obtained by the previous models.

![alt text](/img/posts/post-01-moa/meta_model.png "Stacked model")

This is the last model that is trained, so after this process has finished we end up with total of 5 trained models. The first 4 are level one models and can be directly submitted to the competition while the 5<sup>th</sup> stacked model is dependent of the predictions of the previous models. 



# Final submission





