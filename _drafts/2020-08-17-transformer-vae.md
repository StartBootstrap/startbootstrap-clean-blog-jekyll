---
layout: post
title: 'Transformer VAE'
subtitle: 'Summary of an ICASSP 2020 paper about music representation learning'
excerpt: 'Summary of an ICASSP 2020 paper about music representation learning'
date: 2020-08-17
author: Ondřej Cífka
author-id: ondrej
background: /posts/transformer-vae/splash.png
---

<!-- scripts for MIDI playback -->
<script src="https://cdn.jsdelivr.net/npm/focus-visible@5/dist/focus-visible.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.8.21/Tone.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@magenta/music@1/es6/core.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@magenta/music@1/es6/protobuf.js"></script>
<script src="https://github.com/cifkao/html-midi-player/releases/download/v0.0.1/html-midi-player.js"></script>

<style>
  midi-visualizer, midi-player {
    display: block;
  }

  midi-visualizer svg {
    height: 60px;
  }
</style>


This is the first of a series of blog posts about ICASSP 2020 papers.
Today's paper is _[Transformer VAE: A Hierarchical Model for Structure-Aware and Interpretable Music Representation Learning](https://doi.org/10.1109/ICASSP40776.2020.9054554){:target="_blank"}_ by researchers from CMU, NYU Shanghai and Hooktheory.[^1]

The goal of this work is to learn a music representation which is both _structure-aware_ (capturing dependencies at different time scales) and _interpretable_ (in the sense that it can be decomposed into units with easily discernible meanings).
More specifically, the authors want to find a ‘concise’ representation of melodies where repeated segments (with possible variations) are encoded by referring to their first occurrence.
One possible application is what the authors refer to as _context transfer_, where we want to develop a given piece of music ‘following the music flow of another piece’.

The work combines two popular approaches – _variational autoencoders_[^2] (VAEs) and _Transformers_[^3] – to propose the _Transformer VAE_.
VAEs are a type of autoencoder that tries to learn a nicely organized representation space by making some assumptions about the distribution of latent codes.
The Transformer, on the other hand, is a powerful type of neural network originally applied to the machine translation task and is known to be capable of capturing dependencies at different time scales, just as the authors want.
I will try to explain how the paper builds upon these two approaches, but given their popularity and to keep the post relatively short, I will not fully explain them, so it might help to have some idea about them.

## The model
Probably the best starting point is the original Transformer architecture,[^3] consisting of an encoder and a decoder.
Originally, the input to the encoder would be an English sentence, and the output of the decoder would be its translation into the target language.
In this paper, on the other hand, the input is a melody, and because we are in an autoencoding scenario, the model is trained to produce the same melody as its output.
And, as with any autoencoder, we are then interested by the representation _between_ the encoder and the decoder (i.e. the output of the last encoder layer) – this representation is called the _latent code_ and denoted $$z$$.

At every layer, Transformers work with sequences of representation vectors where each vector corresponds to a specific position in the input.
In this specific application, the Transformer works on the level of bars.
To achieve this, every bar is first encoded using a _local encoder_ before being passed to the Transformer encoder, and similarly, every output of the Transformer decoder is passed through a _local decoder_ to generate the corresponding bar.

<figure class="figure">
  <img src="{{ '/posts/transformer-vae/architecture.svg' | relative_url }}" alt="The model architecture." class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption" markdown="1">
  An overview of the Transformer VAE architecture. The local encoder and decoder make sure that each bar $$x_1,\ldots,x_T$$ is encoded separately so that the Transformer operates on representations of bars.
  </figcaption>
</figure>

The Transformer encoder and decoder both have a similar architecture, consisting of _self-attention_ and _feed-forward_ layers.
While the feed-forward layers act on each position (bar) independently, the self-attention layers essentially allow every position to fetch information from any other position, creating a representation where each bar is ‘aware’ of its context.
The situation in the decoder is possibly a bit confusing because of the interplay between self-attention (attention of a given position to previous positions in the decoder) and _inter-attention_ (attention to positions in the encoder representation), but this is not so important for understanding the paper, so I will gracefully avoid discussing it here.

The model as I just described it would still not learn a particularly _interpretable_ representation. To achieve interpretability, the authors propose two changes to the Transformer architecture:

1. Apply _masking_ to all (self-)attention layers, ensuring that when generating a given bar, the model does not have access to any information about the following bars. (Note: The decoder self-attention is already masked in the original Transformer; the authors of Transformer VAE extend the masking to the rest of the model.)

   The motivation for this is that the authors want the content of repeated bars to be fully encoded in the representation of the first occurrence. By preventing both the encoder and the decoder from looking at future positions, we are simply making sure that all the information about a given bar is encoded in positions up to that bar and does not leak into the following positions.

2. The authors also want to reduce redundancy, making sure that the content of repeated bars is encoded only once. Combined with the first constraint, this means that the content should be encoded _only_ in the first occurrence of each repeated bar, and all other occurrences should merely refer to that occurrence.
   To this end, the authors turn the Transformer into a VAE,[^2] imposing the assumption that the latent codes $$z$$ follow a Gaussian prior distribution $$p(z)=\mathcal{N}(0,1)$$.

   In VAEs, the output of the encoder parameterizes a normal distribution $$q(z|x)=\mathcal{N}(\mu,\sigma^2)$$, called the _posterior_, and we have the additional KL term in the loss function: $$D_{KL}\left[q(z|x)\middle\|p(z)\right]$$.
   The practical effect of this KL term is that it tries to push the posterior $$q(z|x)$$ closer to the prior $$p(x)$$, and this can be interpreted as trying to make the latent code _less informative_ (as opposed to the reconstruction term, which is trying to make it as informative as possible).
   Therefore, the model should only store each piece of information at a single position, because encoding it repeatedly would result in a higher KL term.

## Context transfer

To show that the Transformer VAE has the desired properties, the authors perform ‘context transfer’: they encode two melodies, $$x^{(1)}$$ and $$x^{(2)}$$ to obtain the respective latent codes $$z^{(1)}$$ and $$z^{(2)}$$, then run the decoder on the sequence $$z^{(1)}_1,z^{(2)}_2,z^{(2)}_3,\ldots,z^{(2)}_T$$, i.e. with the first bar swapped.
The result is quite interesting, and indeed does sometimes give the impression of the first bar of $$x^{(1)}$$ being developed in the ‘style’ of $$x^{(2)}$$, as the authors claim:

<figure class="figure" role="group" style="max-width: 100%;">
  <figure>
    <figcaption class="figure-caption">Input 1: Mary Had A Little Lamb</figcaption>
    <midi-visualizer src="{{ '/posts/transformer-vae/midi/Mary.mid' | relative_url }}" type="staff" id="viz11"></midi-visualizer>
    <midi-player src="{{ '/posts/transformer-vae/midi/Mary.mid' | relative_url }}" sound-font visualizer="#viz11"></midi-player>
  </figure>
  <figure>
    <figcaption class="figure-caption">Input 2: Jingle Bells</figcaption>
    <midi-visualizer src="{{ '/posts/transformer-vae/midi/Jingle%20Bells.mid' | relative_url }}" type="staff" id="viz12"></midi-visualizer>
    <midi-player src="{{ '/posts/transformer-vae/midi/Jingle%20Bells.mid' | relative_url }}" sound-font visualizer="#viz12"></midi-player>
  </figure>
  <figure>
    <figcaption class="figure-caption">Output. Notice the repetition in the 3<sup>rd</sup> bar</figcaption>
    <midi-visualizer src="{{ '/posts/transformer-vae/midi/Mary_Jingle%20Bells.mid' | relative_url }}" type="staff" id="viz13"></midi-visualizer>
    <midi-player src="{{ '/posts/transformer-vae/midi/Mary_Jingle%20Bells.mid' | relative_url }}" sound-font visualizer="#viz13"></midi-player>
  </figure>
</figure>

Other times, the model seems to get a bit confused:

<figure class="figure" role="group" style="max-width: 100%;">
  <figure>
    <figcaption class="figure-caption">Input 1: Twinkle Twinkle, Little Star</figcaption>
    <midi-visualizer src="{{ '/posts/transformer-vae/midi/littlestar+8.mid' | relative_url }}" type="staff" id="viz21"></midi-visualizer>
    <midi-player src="{{ '/posts/transformer-vae/midi/littlestar+8.mid' | relative_url }}" sound-font visualizer="#viz21"></midi-player>
  </figure>
  <figure>
    <figcaption class="figure-caption">Input 2: Ode To Joy</figcaption>
    <midi-visualizer src="{{ '/posts/transformer-vae/midi/Joy.mid' | relative_url }}" type="staff" id="viz22"></midi-visualizer>
    <midi-player src="{{ '/posts/transformer-vae/midi/Joy.mid' | relative_url }}" sound-font visualizer="#viz22"></midi-player>
  </figure>
  <figure>
    <figcaption class="figure-caption">Output. Some unexpected turns</figcaption>
    <midi-visualizer src="{{ '/posts/transformer-vae/midi/littlestar+8_Joy.mid' | relative_url }}" type="staff" id="viz23"></midi-visualizer>
    <midi-player src="{{ '/posts/transformer-vae/midi/littlestar+8_Joy.mid' | relative_url }}" sound-font visualizer="#viz23"></midi-player>
  </figure>
</figure>

More examples are provided [here](https://drive.google.com/open?id=1Su-8qrK__28mAesSCJdjo6QZf9zEgIx6){:target="_blank"}.

## Conclusion

While the experimental results of the paper are somewhat limited overall, I believe they show a promising direction for music and sequence generation.
I hope future work can shed some light on how general the approach is, in particular:
- The approach seems to hinge on the fact that it’s ‘cheaper’ (in terms of the KL term) to encode a repeated segment as a reference to the first occurrence than to encode its content directly. I wonder how the model would behave when trained on longer sequences, where position may be more expensive to encode.
- Will the approach generalize to more complex musical structures (full scores)? Or will the dependencies between different segments be too complex to encode concisely?
- How about text and other modalities?
  Would the approach scale to enormous models like GPT-3,[^4] so that we can, for example, take the first chapter of a novel and develop it in the style of a different book?


## References

[^1]: J. Jiang, G. G. Xia, D. B. Carlton, C. N. Anderson and R. H. Miyakawa. "Transformer VAE: a hierarchical model for structure-aware and interpretable music representation learning." In *2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)*, 2020. <https://doi.org/10.1109/ICASSP40776.2020.9054554>{:target="_blank"}
[^2]: D. P. Kingma, M. Welling. "Auto-encoding variational Bayes." In *The 2nd International Conference on Learning Representations (ICLR)*, 2013. <https://arxiv.org/abs/1312.6114>{:target="_blank"}
[^3]: A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A. N. Gomez, L. Kaiser, I. Polosukhin. "Attention is all you need." In *Advances in Neural Information Processing Systems*, 2017. <https://arxiv.org/abs/1706.03762>{:target="_blank"}
[^4]: T. B. Brown, B. Mann, N. Ryder, M. Subbiah, J. Kaplan, P. Dhariwal, A. Neelakantan, P. Shyam, G. Sastry, A. Askell, S. Agarwal, A. Herbert-Voss, G. Krueger, T. Henighan, R. Child, A. Ramesh, D. M. Ziegler, J. Wu, C. Winter, C. Hesse, M. Chen, E. Sigler, M. Litwin, S. Gray, B. Chess, J. Clark, C. Berner, S. McCandlish, A. Radford, I. Sutskever, D. Amodei. "Language models are few-shot learners." *arXiv*, 2020. <https://arxiv.org/abs/2005.14165>{:target="_blank"}
