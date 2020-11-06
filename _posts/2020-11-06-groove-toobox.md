---
layout: post
title: 'Groove Toolbox'
subtitle: 'ISMIR 2020 paper on drum pattern analysis'
excerpt: 'ISMIR 2020 paper on drum pattern analysis'
date: 2020-11-06
author: Alejandro Delgado
author-id: alejandro
background: /posts/abbey-road/head.jpg
---

Here we take a look at a lovely [paper](https://program.ismir2020.net/poster_2-13.html) by Fred Bruford et al. that presents and evaluates a set of engineered features for drum pattern analysis in the symbolic domain. It gathers both new and pre-existing features in literature, grouped in rhythm features, similarity metrics, and microtiming features. The final [toolbox](https://github.com/fredbru/GrooveToolbox), written in Python, is evaluated on drum loop similarity perception experiments, where the authors are able to find significant correlations between features and similarity scores.

## Toolbox

The Groove Toolbox is a comprehensive framework for modelling perceptual qualities of drum loops. The authors decided to implement those pre-existing algorithms that were proven to be perceptually relevant and that could handle different onset velocities. They also introduced six new features, including two similarity models and four microtiming features.

<figure class="figure w-100">
  <img src="{{ '/posts/abbey-road/table1.png' | relative_url }}" alt="Table." class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption text-center" markdown="1">
  List of features and similarity measures currently implemented in the GrooveToolbox. New features are in bold.
  </figcaption>
</figure>

## Evaluation

Evaluation yt al.

## Use Cases

Use cases yt al.



