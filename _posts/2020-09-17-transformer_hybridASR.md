---
layout: post
title: Transformer based acoustic modeling for hybrid speech recognition - A review
subtitle: Review of the paper presented in ICAASP2020
date: 2020-09-17
author: Emir Demirel
author-id: QMUL1
background: /posts/transformer_hybridASR/
--- 



In this blogpost, we take a look into one of the best performing systems in *hybrid speech recognition* which was presented in the paper *"TRANSFORMER-BASED ACOUSTIC MODELING FOR HYBRID SPEECH RECOGNITION (...,ICAASP,2020)"*. The transformer architecture has been a popular neural network design since it's introduction in \cite. In this paper, the authors successfully implement the transformer architecture in a hybrid speech recognition setting and managed to get competetive results with the state of the art. 

Before going into details of the hybrid transformer model, let's give a little bit of context about speech recognition.

Speech recognition can be considered as the task of predicting the most likely word sequence given an acoustic observation, which can be expressed by the equation below:

\begin{equation*}
\widehat{\mathbf{w}} = argmax(P(\mathbf{w}|\mathbf{X})) = argmax(P(\mathbf{X}|\mathbf{w}) P(\mathbf{w}))
\end{equation*}

In this equation the variable \mathbf{X} can be vectors of spectrogram, MFCC features, waveform signal, etc. P(\mathbf{X}|\mathbf{w}) and P(\mathbf{w}) are referred as *the acoustic* and *the language model* respectively.

There are two popular approaches for predicting this word likelihood in the state-of-the-art in automatic speech recognition (ASR) systems: Hybrid-ASR and End-to-end ASR. In the latter, the goal is to train a deep neural network to learn the complete mapping between acoustic feature vectors and alphabetic characters that form words. End-to-end ASR paradigms such as encoder-decoder or neural transducer approaches have been experiencing growing popularity due to their simplicity and them requiring lesser domain knowledge for building a pipeline. 

Hybrid-ASR is usually composed of separate acoustic, language and pronunciation models and generally uses a Finite State Transducer (FST) to decode given acoustic observations into word sequences. Even though hybrid approach might require domain knowledge from multiple disciplines, like speech, linguistics and phonetics, it has been the preferred option for many industrial applications due to its robustness and requiring less data for a good performance.


<figure class="figure">
  <img src="{{ '/posts/transformer_hybridASR/hybridasr.png' | relative_url }}" alt="Hybrid ASR pipeline." class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption" markdown="1">
  Hybrid ASR pipeline.
  </figcaption>
</figure>

The paper of subject targets at adapting a successful strategy in one paradigm - end-to-end ASR - to another - hybrid-ASR. The authors achieve this via implementing the Transformer architecture (Figure below) to build the acoustic model in hybrid-ASR setting. 

Transformer architecture is based on the **self-attention** mechanicsm which is an operation within neural networks that applies a weighted summation over a certain context window of the input node of a hidden layer. The weights of the summation are learned through gradient optimization which updates the parameters of a dot product between input (key) and context (query) matrices. Self-attention is usually applied with multiple heads to learn more diverse information from data. This overall mechanism is referred as **multi-head (self)-attention**, which is denotes as MHA in Figure...

<figure class="figure">
  <img src="{{ '/posts/transformer_hybridASR/mha.png' | relative_url }}" alt="Hybrid ASR pipeline." class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption" markdown="1">
  One layer of transformer. MHA stands for multi-head attention
  </figcaption>
</figure>


Self-attention comes with two major advantages. First one is that the computational complexity to learn temporal context dependencies is lesser compared to RNNs and CNNs. Secondly, the attention operation can be parallelized, which makes the optimization easier.

On the other hand, transformer has one major disadvantage. The output of the transformer layer is permutation invariant to input vectors, i.e the order of the input vector sequence is not encoded in the attention operation. The authors circumvent this problem through frame stacking and adding a 2D CNN (namely a pretrained 2 layer VGG model) in the backend to serve as positional encoders. (ref)

<figure class="figure">
  <img src="{{ '/posts/transformer_hybridASR/embedding.png' | relative_url }}" alt="Hybrid ASR pipeline." class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption" markdown="1">
    Positional embeddings before the transformer layer
  </figcaption>
</figure>

The performance of the so-called hybrid-Transformer shows better **Word Error Rate** results compared to some other strong speech recognition models (Figure ...). The authors achieve their best results via sequence discriminative training of **chenones** (ref) and RNNLM lattice rescoring which is denoted as one of the best resulting ASR systems by the date of this blogpost. 

<figure class="figure">
  <img src="{{ '/posts/transformer_hybridASR/sota.png' | relative_url }}" alt="results" class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption" markdown="1">
  </figcaption>
</figure>

