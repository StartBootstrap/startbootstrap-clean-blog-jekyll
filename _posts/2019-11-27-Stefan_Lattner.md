---
layout: post
title: Learning Novel Music Representations
subtitle: An interview with Dr. Stefan Lattner
excerpt: An interview with Dr. Stefan Lattner
date: 2019-11-27
author: Alejandro Delgado
author-id: alejandro
background: /posts/Stefan_Lattner_interview/Stefan_1.jpg
---

Today we were very pleased to do a written interview with [Stefan Lattner](https://csl.sony.fr/team/dr-stefan-lattner/) who, in my view, is one of the most incisive and original researchers in Music Information Retrieval. He is an associate researcher in Sony CSL, and has just defended his [Ph.D. thesis](https://www.researchgate.net/publication/337482494_Modeling_Musical_Structure_with_Artificial_Neural_Networks) at the Austrian Research Institute for Artificial Intelligence (OFAI). His recent work [“Learning Complex Basis Functions for Invariant Representations of Audio”](http://archives.ismir.net/ismir2019/paper/000085.pdf), which won the Best Paper Award at ISMIR 2019, introduced the Complex Autoencoder (CAE), a new learning architecture to extract highly informative features from audio data.

In this interview, Stefan shares his perspectives on a few topics including audio representations for music analysis, the problem of insufficient labelled data in MIR and the impact of his research on his way of experiencing music. If you are an MIR practitioner, this is a 10-min reading you cannot miss.

<div style="text-align:center">
<figure class="figure">
  <img src="/posts/Stefan_Lattner_interview/Stefan_2.jpg" alt="Stefan Lattner" class="figure-img img-fluid mx-auto d-flex" width="500"/>
</figure>
</div>

####In your [ISMIR paper](http://archives.ismir.net/ismir2019/paper/000085.pdf) this year you were looking for audio representations that are invariant to irrelevant transformations given a certain task. Your [past work](https://arxiv.org/pdf/1708.05325.pdf) showcases that spirit as well. Do you think achieving such invariances constitutes a priority in MIR research?

I am not sure about the priority, but the invariant features computed by a Complex Autoencoder (CAE) have some interesting properties, and I particularly like their musical interpretation. When we train the CAE for pitch-shift invariance, we obtain representations of musical intervals. Musically, this makes a lot of sense, because most people have relative pitch perception. Moreover, the compression ratio for these representations considering only the different pitch classes is 1/12. When the CAE is trained for time-shift invariance, the features represent rhythmic structures. For time-shift invariance, we have the same gain/loss as when we perform FFT on signals - we represent some temporal relationships for the cost of temporal precision (and possibly order).

In both cases (pitch-shift and time-shift invariance), the features carry some disentangled (i.e., invariant), mid-level structural information. We could show that this makes a lot of sense when we want to operate in the feature space, for example, when we want to compare the features with each other for self-similarity analysis in audio. But we have to consider that we also loose some information, most of which can be retrieved in the "phase space" of the CAE. Therefore, it has still to be tested for which tasks the features could also be useful as input representations to deep-learning architectures (and if to also input the phase, not only the amplitude information of the data, improves the results).

<div style="text-align:center">
<figure class="figure">
  <img src="/posts/Stefan_Lattner_interview/Stefan_3.jpg" alt="Stefan Lattner (second from left to right) receiving the Best Paper Award at ISMIR 2019" class="figure-img img-fluid mx-auto d-flex" width="500"/>
  <figcaption class="figure-caption text-center" markdown="1">
  Stefan Lattner (second from left to right) receiving the Best Paper Award at ISMIR 2019
  </figcaption>
</figure>
</div>

In any case, it is striking that in many MIR tasks, musical mid- and high-level structure is neglected. Often this makes perfect sense because music-structural cues are simply not informative for the current task. But given the fact that MIR is about music most of the time, a more "musical modeling" of musical mid- and higher-level structure could lead to improvements for some tasks. I think the features computed by a CAE could make musical mid- and higher-level structure in audio more accessible. In drum transcription, for example, representing rhythmic and tonal structure separately could improve the results, but also using invariant self-similarity analysis could add some structural cues to a drum transcription task (because the occurrence probabilities of some percussion types are correlated with sectional transitions). 

Furthermore, there is some potential in learning tempo-invariant features, as well as learning higher-level structure by training the CAE on more abstract representations of audio. Also, the representation of transformations between musical fragments using the phase-difference space of the CAE could lead to another, possibly informative, view on musical data. Transformation learning and invariance learning are two sides of the same coin, and [transformation learning has a lot of potential on its own](http://archives.ismir.net/ismir2019/paper/000085.pdf).

####Some time-frequency representations like the Mel spectrogram are of invaluable use in audio deep learning, as they effectively reduce the dimensionality of input data. What limitations do you see in this approach? Which MIR tasks do you think would be the most affected by them?

There is an ongoing discussion about which input representation is best suited for deep learning in MIR. For speech, it seems the decision for Mel spectrograms (or MFCCs) has been made. For audio and music, it is not decided yet. However, perceptually-motivated compression, like it is the case in Mel, is conceptually intriguing, and perception-driven compression also works well, for example, in MP3 compression. Recently, Mel has even been used for audio generation, and it seems that the low resolution in the high frequencies is not a show-stopper, especially when the spectrogram-inversion is done smartly. Of course, we are losing information with Mel spectrograms. Still, the high resolution in the perceptually critical bands works well for many tasks, and it is remarkable how other representations, like those from a CQT, sometimes lead to much worse results. Of course, when we have enough model capacity, and we want to preserve high-frequency content, using high-resolution FFT or the time-domain of signals directly may be preferable. But if memory- and computation-efficiency is a factor, Mel spectrograms are definitely a good trade-off between compression and preservation of perceptually relevant frequency content.

####What is your perspective on the "lack of data" problem in MIR? Is it that bad?

Compared to other domains, where users readily provide a lot of data, or where the commercial interest is higher, labeled data in MIR is often rare, particularly when it comes to specific, musicological tasks. For example, for years, the MIREX task "repeated section discovery" is performed on only a handful of pieces. In addition, there are some legal problems in Europe when training ML-models on copyright-protected music - a situation that also prevents us from taking a big data approach. On the other hand, I think in academic research a lot of ideas can also be demonstrated on less data, and there exists a line of research concerned with weakly-labeled data, as well as bootstrapping approaches, like student/teacher training, and multi-modality, where different modes "label each other". Of course, we often need a critical mass of data to make some models work at all, but it is the question if simply scaling them up is always a valuable scientific contribution. I am convinced that more compact (but still highly general) models which can learn from fewer data can be considered more "intelligent," and there is still enough room for creative solutions towards that goal.

####Using neural networks can be tough at times, especially when the goal is to surpass the state of the art in a particular task. What is the most important lesson you have learnt over the years in this respect?

Well, I find it not very fascinating to simply use a novel architecture from, for example, the image domain, and apply it to audio to improve the state-of-the-art by a few percentage points. Also, the competition is high for such approaches, and I find it more comfortable to occupy a niche. I think it is essential to understand your task very well and also to draw some inspiration from how humans perform the task. Then models can be designed or adapted accordingly, not by introducing much prior knowledge, but by enabling them to learn what they ought to themselves. It is always a trade-off between the risks involved in breaking new ground and the comfortable certainties when choosing more conventional methods. But taking no risks at all is not very valuable for both the researcher and the scientific community.

####Finally, on the personal side, how does working in MIR impact your relationship with music itself?

People tend to mystify music creation and also defend it as one of the last resorts of human ingenuity. I think that is primarily the case because we still understand too little about the listening process. There is, in fact, no good model of a listener yet, which could act as a cost function for music creation. Since I am working on music creation, I, therefore, focus a lot on these listening mechanisms, which changes how I listen to music myself. But also in music creation, having some theories about why some structural organizations work better than others, can help me a lot. Having said that, I can still enjoy music without having to analyze it continuously, but it is nice to have some theories about why things work well in case I wonder.
