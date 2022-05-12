---
layout: post
title: "Variational Inference Gaussian Mixture Model"
subtitle: "When point estimate does not work, Bayesian inference comes into picture"
# date: 2021-06-06 10:45:13 -0400
background: '/img/posts/Gaussian/probability_distribution.png'
---



Variational inference methods in Bayesian inference and machine learning are techniques which are involved in approximating intractable integrals. Most of the machine learning techniques involves finding the point estimates (Maximum likelihood estimation (MLE), Maximum a posteriori estimate (MAP)) of the latent variables, parameters which certainly do not account for any uncertainty. For taking account of uncertainty in point estimates, an entire posterior distribution over the latent variables and parameters is approximated.

&nbsp;&nbsp;&nbsp;&nbsp;


![](/img/posts/Gaussian/2.png){:height="250px" width="700px" }

&nbsp;&nbsp;&nbsp;&nbsp;


For approximation of posterior distribution, which involves intractable integrals variational inference methods are applied for making the calculation tractable (having some kind of close form mathematically !!) i.e. which does not involve calculation of marginal distribution of the observed variables P(X).



&nbsp;&nbsp;&nbsp;&nbsp;


![2](/img/posts/Gaussian/3.png){:height="150px" width="700px" }

&nbsp;&nbsp;&nbsp;&nbsp;

The marginalisation over Z to calculate P(X) is intractable, because of the search space of Z is combinatorially large, thus we seek an approximation, using variational distribution Q(Z) with it’s own variational parameters.

&nbsp;&nbsp;&nbsp;&nbsp;

## Variational Inference as an Optimisation problem

Since we are trying to approximate a true posterior distribution p(Z\|X) with Q(Z), a good choice of measure for measuring the dissimilarity between the true posterior and approximated posterior is Kullback–Leibler divergence (**KL-divergence**),


![2](/img/posts/Gaussian/4.png){:height="100px" width="700px" }

&nbsp;&nbsp;&nbsp;

which is basically expectation of difference in log of two probability distribution with respect to approximated distribution. Considering KL divergence as an optimisation function, it needs to be minimised with respect to variational parameters of the variational distribution Q(Z). Since calculating KL divergence itself involves the calculation of posterior distribution P(Z\|X), the calculation of dissimilarity in-terms of KL divergence needs to be expressed where we come across **Evidence lower bound** (ELBO). The above expression KL divergence can be written in terms of ELBO as

![2](/img/posts/Gaussian/5.png){:height="25px" width="700px" }

in which log evidence log P(X) is constant with respect to Q(Z), maximising the term L(Q) (Evidence lower bound) minimises KL divergence. By choosing an appropriate choice of Q(Z), L(Q) becomes maximizable and tractable to compute.

## Mean field approximation

The mean field approximation assumes that all the hidden variables are independent of each other, which simplifies the joint distribution of hidden variables as the product of marginal distribution of each hidden variable.


![2](/img/posts/Gaussian/6.png){:height="150px" width="700px" }

where N is the no. of the hidden variables. It can be shown that best distribution qⱼ(Zⱼ) for maximising ELBO can be estimated as

![2](/img/posts/Gaussian/7.png){:height="50px" width="700px" }

which is expectation of log joint probability distribution of observed and latent variables taken over variables which do not include Zⱼ. This type above equations can be simplified into functions of hyper-parameters of the prior distribution over the latent variable and expectation of the latent variables which is not being calculated. These type of equation create circular between the parameters of the distribution over the variables being calculated and expectation of variables not being calculated, this section of circular dependencies will be more clear in the following section. This circular dependence of distribution of parameters of the variational distribution suggest an iterative update procedure same as **Expectation-Maximisation** algorithm.


# Variational inference in Gaussian mixture model
<!-- <img align="middle" width="300" height="300" src="/img/posts/Gaussian/8.png"> -->

<p align="center">
  <img width="460" height="300" src="/img/posts/Gaussian/8.png">
</p>
Consider the above Bayesian Gaussian mixture model in plate notation, where square plates denotes the hyper-parameters, large circular plates denotes latent variables and filled-in objects denotes known values.

Here we are considering a finite Bayesian Gaussian mixture model with K components for a data-set of N X D dimension data-set with unknown parameters (mean vectors and precision matrix). For a graphical model to be in Bayesian setting, we need to define some prior (initial believes) on the unknown parameters for component weights (π), mean vectors (μ_{i=1…K}), precision matrix (Λ_{i=1…K})and latent variable (Z = z₁,…zn) for each of the observation present in the data, representing to which component does the observation belong to¹.


<p align="center">
  <img width="460" height="300" src="/img/posts/Gaussian/9.jpeg">
</p>


<!-- ![2](/img/posts/Gaussian/9.jpeg){: aligh ='center'} -->


* K-dimension Symmetric Dirichlet distribution prior for components weights, with each hyper-parameter set to α₀.
* Wishart distribution prior on the precision matrix with known hyper-parameters (W₀, ν₀).
* Categorical distribution, for each of the latent variable with K-dimensional vector in which only one of the element is 1, rest are 0.
* Multivariate Normal Gaussian distribution on the means of components on of the mixture model, with known hyper parameter μ₀,β₀.

The joint probability distribution of the variables can be written as



![2](/img/posts/Gaussian/10.png){:height="40px" width="700px" }

where the factorisation of joint probability distribution into individual distribution is dependent upon the way the graphical model is described. Individual factors can be written as:


<!-- ![2](/img/posts/Gaussian/11.jpeg){:height="300px" } -->
<p align="center">
  <img width="460" height="300" src="/img/posts/Gaussian/11.jpeg">
</p>




where,


![2](/img/posts/Gaussian/12.png){:height="200px" width="700px" }

where ν is the degree of freedom and D is the dimension of the scale matrix for Wishart distribution and the dimensionality of each data point.

Since we have to approximate true posterior distribution **P(Z,μ,Λ,π \| X)** with a variational distribution of latent variables i.e. with **Q(Z,μ,Λ,π)**. The variational distribution can be factorised into individual factors according to the assumption of mean-field approximation.

<!-- ![2](/img/posts/Gaussian/13.png) -->
<p align="center">
  <img width="400" height="20" src="/img/posts/Gaussian/13.png">
</p>

Now using the equation for the best variation distribution for each parameters, first let us calculate for Q*(Z), we focus only on the terms containing Z and take expectation over the other latent variable which is as follows:

![2](/img/posts/Gaussian/14.png){:height="100px" width="700px" }

where, ⟨ ⟩ symbol denotes the expectation over the latent variables³ which are in the subscript of it. Substituting the expression for **p(X \| Z, μ, Λ)**, **p(Z \| π)** in the above expression we get

![2](/img/posts/Gaussian/15.gif)

![2](/img/posts/Gaussian/16.png){:height="200px" width="700px" }

![2](/img/posts/Gaussian/17.gif)

<!-- ![2](/img/posts/Gaussian/18.gif){:height="50px" width="500px" } -->
<p align="center">
  <img width="150" height="100" src="/img/posts/Gaussian/18.gif">
</p>

where rₙₖ is expressed as

<p align="center">
  <img width="150" height="50" src="/img/posts/Gaussian/19.gif">
</p>

Thus the best q*(Z) is product of categorical distribution for each of latent variables with parameters rₙₖ for k = 1…K.

Now similarly we evaluate best variational distribution for of the other variables and according to our graphical model we can express **Q(π,μ,Λ)** as product of **Q(π)** and **Q(μ,Λ)**. Then we can write,

<p align="center">
  <img width="400" height="150" src="/img/posts/Gaussian/20.png">
</p>

<p align="center">
  <img width="400" height="150" src="/img/posts/Gaussian/21.gif">
</p>


taking exponential on the both sides of the above equation, this formulation is the form of Dirichlet distribution q*(π) ~ Dir(α), with parameters

<p align="center">
  <img width="200" height="25" src="/img/posts/Gaussian/22.gif">
</p>

Finally, we can derive best variational distribution parameters for **q*(μₖ,Λₖ)**



<p align="center">
  <img width="500" height="100" src="/img/posts/Gaussian/23.png">
</p>

after some mathematical manipulations, the variation distribution assumes a form of Gaussian-Wishart distribution which is given by:

<p align="center">
  <img width="400" height="50" src="/img/posts/Gaussian/24.png">
</p>

with parameters **mₖ, βₖ, Wₖ, νₖ** which are defined as:

<p align="center">
  <img width="400" height="300" src="/img/posts/Gaussian/25.png">
</p>

All the parameters defined above **( mₖ, βₖ, Wₖ, νₖ)** are somehow dependent upon the categorical distribution parameter rₙₖ, which in turn is also dependent upon the above defined parameters. For evaluation rₙₖ, certain expression need to expressed which are as follows:



<p align="center">
  <img width="500" height="200" src="/img/posts/Gaussian/26.png">
</p>

where **ψ** is log derivative of multinomial gamma function. The circular dependence of these parameters of variational distribution leads iterative update procedure of these parameters that alternates between two steps and **is guaranteed to converge with respect to maximisation of ELBO or the minimisation of KL divergence between the true posterior** and the approximate posterior over the latent variables. The iterative update procedure which alternate between two steps are as follows:


* An E-step (Estimation step) that computes the value of rₙₖ using the current values of all other parameters.
* An M-step (Update step) that uses new rₙₖ value to update all other parameters.



## Evidence lower bound calculation

For the variational mixture of Gaussian the lower bound is given by²:


<p align="center">
  <img width="500" height="75" src="/img/posts/Gaussian/27.png">
</p>

The various terms involved in the calculation of bounds are as follows:

<p align="center">
  <img width="500" height="200" src="/img/posts/Gaussian/28.png">
</p>

<p align="center">
  <img width="500" height="150" src="/img/posts/Gaussian/29.png">
</p>

<p align="center">
  <img width="500" height="200" src="/img/posts/Gaussian/30.png">
</p>


where C(α) and B(W,ν) were defined earlier and H[q(Λₖ)] is the entropy of the Wishart distribution. For the convergence of the algorithm Evidence lower bound is to be taken as the convergence criterion, i.e. the algorithm is set to converge when there is no significant improvement in the convergence criterion.


## Implementation of the above algorithm to a real life data-set


Considering the scaled version of [**Old faithful data-set**](https://www.stat.cmu.edu/~larry/all-of-statistics/=data/faithful.dat), which when graphically plotted, depicts only two cluster present within the data-set.

<p align="center">
    <img width="500" height="400" src="/img/posts/Gaussian/31.png" >
</p>

On application of the above **Variational Expectation-Maximisation** algorithm on the data-set with K=6 components, with suitable values of hyper-parameters and proper initialisation of the parameters of variational distribution, we see that the algorithm converges with only two components as expected.


<p align="center">
    <img width="600" height="1000" src="/img/posts/Gaussian/32.png" >
</p>

The above plots depicts cluster assignment of data points to cluster at various iteration, in which no. of colours present within a plot depicts number of total cluster. From the last plot it is evident that the algorithm converges with cluster only. For the below plot we can see that the evidence lower bound converges after 100 more iterations being close to zero, which shows that algorithm was able to approximate the true posterior distribution of the latent variables with variational distribution.

<p align="center">
    <img width="600" height="400" src="/img/posts/Gaussian/33.png" >
</p>

The code for the above implementation is available at: [https://github.com/ashkush/Variational-inference-Gaussian-mixture-model](https://github.com/ashkush/Variational-inference-Gaussian-mixture-model)

# References

* [Variational Bayes methods](https://en.wikipedia.org/wiki/Variational_Bayesian_methods)

* C. Bishop: Pattern Recognition and Machine Learning, Springer, 2010 (Ch. 9–11 & Appendix B)

* [http://sap.ist.i.kyoto-u.ac.jp/members/yoshii/lectures/pattern_recognition/2017/20170606-npb-gmm.pdf](http://sap.ist.i.kyoto-u.ac.jp/members/yoshii/lectures/pattern_recognition/2017/20170606-npb-gmm.pdf)





