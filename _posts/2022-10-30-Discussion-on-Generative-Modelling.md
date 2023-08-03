---
layout: post
title: "Discussion Generative Modelling"
date: 2022-09-30 23:45:13 -0400
background: '/img/posts/05.jpg'
---


A generative model simulates how the data is generated
in the real world. “Modeling” is understood in almost every science as
unveiling this generating process by hypothesizing theories and testing
these theories through observations. For instance, when meteorologists
model the weather they use highly complex partial differential equations
to express the underlying physics of the weather. Or when an astronomer
models the formation of galaxies s/he encodes in his/her equations of
motion the physical laws under which stellar bodies interact. The same
is true for biologists, chemists, economists and so on. Modeling in the
sciences is in fact almost always generative modeling.


Let’s use x as the vector representing the set of all observed variables
whose joint distribution we would like to model. Note that for notational
simplicity and to avoid clutter, we use lower case bold (e.g. x) to denote
the underlying set of observed random variables, i.e. flattened and
concatenated such that the set is represented as a single vector. See
section A.1 for more on notation.
We assume the observed variable x is a random sample from an
unknown underlying process, whose true (probability) distribution p∗(x)
is unknown. We attempt to approximate this underlying process with a
chosen model pθ(x), with parameters θ:
x ∼ pθ(x) (1.1)
Learning is, most commonly, the process of searching for a value of
the parameters θ such that the probability distribution function given
by the model, pθ(x), approximates the true distribution of the data,
denoted by p∗(x), such that for any observed x:
pθ(x) ≈ p∗(x) (1.2)
Naturally, we wish pθ(x) to be sufficiently flexible to be able to
adapt to the data, such that we have a chance of obtaining a sufficiently
accurate model. At the same time, we wish to be able to incorporate




Continuing with the relay race example from section 16.1, suppose we nameAlice’s ﬁnishing timet0, Bob’s ﬁnishing timet1, and Carol’s ﬁnishing timet2.
As we saw earlier, our estimate oft1depends ont0. Our estimate oft2dependsdirectly ont1but only indirectly ont0. 
We can draw this relationship in a directedgraphical model, illustrated in ﬁgure 16.2.
Formally, a directed graphical model deﬁned on variablesxis deﬁned by adirected acyclic graphGwhose vertices are the random variables in the model, anda set oflocal conditional probability distributions p(xi| P aG(xi)), whereP aG(xi) gives the parents ofxiinG. 
The probability distribution overxis givenbyp(x) = Πip(xi| PaG(xi)). (16.1)
In our relay race example, this means that, using the graph drawn in ﬁgure 16.2,p(t0, t1, t2) = p(t0)p(t1| t0)p(t2| t1). (16.2)
This is our ﬁrst time seeing a structured probabilistic model in action. Wecan examine the cost of using it, to observe how structured modeling has manyadvantages relative to unstructured modeling.



<img src="/img/directed-model-exp.png" alt="Directed-model-example">


## Parameterizing Conditional Distributions with Neural Networks
In case of neuralnetwork based image classification LeCun et al., 1998, for example,neural networks parameterize a categorical distribution pθ(y|x) over a
class label y, conditioned on an image x.

p = NeuralNet(x) (1.4)

pθ(y|x) = Categorical(y; p) (1.5)

where the last operation of NeuralNet(.) is typically a softmax() function
such that summation pi = 1.


The joint
distribution over the variables of such models factorizes as a product of prior and conditional distributions:

<img src="/img/directed-model-formula.png" alt="Directed-model-formula">


A more flexible way to parameterize such conditional distributions is with neural networks. In this case,
neural networks take as input the parents of a variable in a directed graph, and produce the distributional parameters η over that variable:

η = NeuralNet(P a(x)) (1.7)

pθ(x/P a(x)) = pθ(x/η) (1.8)

We will now discuss how to learn the parameters of such models, if all the variables are observed in the data.


## V.I. Learn to see steps of modelling as probability definitions


