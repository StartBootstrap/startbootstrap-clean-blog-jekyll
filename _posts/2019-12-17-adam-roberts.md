---
layout: post
title: 'Interview with Adam Roberts'
subtitle: "A Google Brain researcher's thoughts on music generation and creativity"
excerpt: "A Google Brain researcher's thoughts on music generation and creativity"
date: 2019-12-17
author: Ondřej Cífka
author-id: ondrej
background: /posts/adam-roberts/splash.png
---

[Adam Roberts](https://research.google/people/104881/) is a software engineer and machine learning researcher at Google Brain, working on music and art generation as part of the [Magenta](https://magenta.tensorflow.org/) project.
He got his PhD in Computational Biology at UC Berkeley and before joining Google Brain, he worked in the Google Play Music Knowledge team.
I met Adam in November at the [ISMIR](https://ismir2019.ewi.tudelft.nl/) conference, where he was presenting some of the music generation work together with his colleagues from Magenta, and I took this opportunity to ask him a few questions.

#### We have seen many interesting papers about music generation this year at ISMIR. What are your highlights?

I was really excited by progress in many areas of MIR research that I believe will help us improve music generation in the future.
For example, there were multiple papers releasing very useful datasets (e.g., [SUPRA](https://supra.stanford.edu/)[^1] and the [Harmonix Set](https://github.com/urinieto/harmonixset)[^2]) that can be used for training generative models.
There were also improvements in such things as beat detection (e.g., Böck et al.[^3]) and transcription, which will help provide even more useful data. As far as generation specifically, I was really excited to see Donahue et al.'s applying transfer learning to fine-tune Music Transformer on their [NES](https://github.com/chrisdonahue/nesmdb) dataset.[^4]
Finally, I'm always happy to see people building really useful tools for creators like Smith et al.'s [Unmixer](https://unmixer.ongaaccel.jp/).[^5]

#### You have worked with different generative models (RNNs, Transformers, VAEs, etc.). What are some differences in the behavior of these models that you noticed when applying them to music? Are there any trade-offs to consider when choosing the architecture?

Yes, there are a ton of trade-offs!
Transformers seem to capture long-term structure and expressivity better than RNNs, but they tend to be slower at inference-time, which makes them difficult to use in a real-time setting.
VAEs (see our [MusicVAE](https://g.co/magenta/musicvae) model) are one way of enabling more control over the generative process on top of continuation -- trivially provided by language models -- but their implementations in the symbolic music space have so far been limited to RNNs.
Thus, the quality of their outputs has been constrained by the architecture in addition to trade-offs between supporting accurate reconstructions or better sampling.
GANs are another model type that so far has had limited success in the symbolic generation space, but the "perceptual" loss they provide could lead to much better outputs versus the standard autoregressive maximum-likelihood/reconstruction losses typically used.

#### Magenta is all about "exploring the role of machine learning as a tool in the creative process". Earlier this year, you released [Magenta Studio](https://magenta.tensorflow.org/studio/), which makes such tools readily available to music creators. Do you hear back from the users? Do you have examples of music produced with Magenta Studio?

We have gotten a lot of positive feedback from early adopters,[^6] but I think it's a bit too early to know what effect these types of tools will have on music composition and production.
YACHT [composed an album](https://magenta.tensorflow.org/chain-tripping) using the same MusicVAE models before Magenta Studio existed and have spoken a bit about their experience in various publications.
I'd imagine more professionals have used the software but may not be as eager to advertise that it has become a part of their technique.
In the end, I think there will be a huge benefit in setting up this type of feedback loop with creators in discovering what tools they want and also sparking collaborations and data sharing.

#### What are your thoughts on evaluating computer-generated art? Can we assess its quality in a meaningful way, or should we just be evaluating the user experience when using the model/algorithm as this "tool in the creative process"?

I think it's up to the (co-)creators and consumers to decide when art is good.  Human evaluation and curation, at a minimum, will be necessary for the foreseeable future. If art is created but nobody is there to enjoy it, is it still even art?

#### Do you think machines by themselves can be creative? Are we eventually going to be able to generate truly novel and interesting art fully automatically, just by extrapolating from art produced in the past?

I think you can't really remove the human from the loop here either. The best art to come out of these systems has a lot of human involvement both in the development and training stage as well in curation and post-production.  I'm not sure if it will be possible or desirable to have completely machine-generated art that doesn't get stale over time. It needs to move with the cultural zeitgeist. Also, if such a system were to exist, who is actually the artist: the model or the people who created it?


## References

[^1]: Zhengshan Shi, Craig Sapp, Kumaran Arul, Jerry McBride, Julius Smith. "SUPRA: Digitizing the Stanford University Piano Roll Archive." In *Proceedings of the 20th International Society for Music Information Retrieval Conference (ISMIR)*, 2019. <https://doi.org/10.5281/zenodo.3527858>
[^2]: Oriol Nieto, Matthew McCallum, Matthew Davies, Andrew Robertson, Adam Stark, Eran Egozy. "The Harmonix Set: Beats, Downbeats, and Functional Segment Annotations of Western Popular Music." In *Proceedings of the 20th International Society for Music Information Retrieval Conference (ISMIR)*, 2019. <http://doi.org/10.5281/zenodo.3527870>
[^3]: Sebastian Böck, Matthew Davies, Peter Knees. "Multi-Task Learning of Tempo and Beat: Learning One to Improve the Other." In *Proceedings of the 20th International Society for Music Information Retrieval Conference (ISMIR)*, 2019. <http://doi.org/10.5281/zenodo.3527850>
[^4]: Chris Donahue, Huanru Henry Mao, Yiting Ethan Li, Garrison Cottrell, Julian McAuley. "LakhNES: Improving Multi-instrumental Music Generation with Cross-domain Pre-training." In *Proceedings of the 20th International Society for Music Information Retrieval Conference (ISMIR)*, 2019. <http://doi.org/10.5281/zenodo.3527902>
[^5]: Jordan Smith, Yuta Kawasaki, Masataka Goto. "Unmixer: An Interface for Extracting and Remixing Loops." In *Proceedings of the 20th International Society for Music Information Retrieval Conference (ISMIR)*, 2019. <http://doi.org/10.5281/zenodo.3527938>
[^6]: Adam Roberts, Jesse Engel, Yotam Mann, Jon Gillick, Claire Kayacik, Signe Nørly, Monica Dinculescu, Carey Radebaugh, Curtis Hawthorne, Douglas Eck. "Magenta Studio: Augmenting Creativity with Deep Learning in Ableton Live." In *Proceedings of the International Workshop on Musical Metacreation (MUME)*, 2019. <https://ai.google/research/pubs/pub48280>
