---
layout: post
title: Interview with Romain Hennequin
subtitle: A chat about source separation at the ISMIR conference 2019
date: 2020-01-20
author: Kilian Schulze-Forster
author-id: kilian
background: /posts/R_Hennequin_interview/interview_romain.jpeg
--- 

Romain Hennequin is a lead research scientist at Deezer working on music information retrieval. Prior to that, he was a researcher at Audionamix for three years. In 2011 he obtained a PhD from Télécom ParisTech for his work on musical spectrogram decomposition methods. I met him during the ISMIR conference 2019 in Delft and got the opportunity to talk with him about audio source separation.

Audio source separation is the task of extracting one sound source, for example the singing voice, from a mixture of several sources such as a rock song. The topic of my PhD studies is *informed* source separation which means exploiting additional information about the source to be separated, for example the lyrics as information about the singing voice. We discussed how this has been done in the past and how it can be done in a deep learning setting. We also discussed evaluation metrics and their shortcomings.
 
**You worked on source separation about 9 years ago and also very recently. What has changed in the meantime?**
 
Especially the models we are using have changed. 9 years ago, we would mostly use Nonnegative Matrix Factorization (NMF) with some kind of semi-supervision or handcrafted source models that were used inside the factorization. For example, something that worked quite well at this time was to include the source filter model within the NMF framework. What has changed recently is the use of deep learning and the availability of large data sets. 9 years ago, we had only very small data sets of maybe 10 songs which is too small, not diverse, and not representative.
 
**You also worked on informed source separation within the NMF framework while today there is not much work on informing source separation models which are based on deep learning. Do you see any reason for that?**
 
Within NMF it was rather straightforward to incorporate handcrafted models or features. This is probably much harder to do in a deep learning set up. Anyway, handcrafted features are not optimal because you do a lot of choices when designing them and you probably don’t make the optimal choices. I haven’t seen much work that tries to incorporate handcrafted features in deep learning. However, one could try to condition mid-level representations inside the model. We saw one example here at the conference, the conditioned u-net. In general, this means that you have a high-level representation in a low-dimensional space and you could probably try to organize this space according to some external information.
 
**Do you think that it makes sense to inform deep learning based separation models even if they already work very well without additional information?**
 
Supervised deep learning based separation works well if you have exactly the sources you want to separate as separated tracks in your database and if the sources are not too similar. For example, separating vocals from drums is easy while separating piano from guitar is much harder. Separating lead vocals from background vocals, which is not separating two instruments but two functions of the same instrument, could definitely be done better when using extra information.
 
**So, additional information can complement the information in the training data?**
 
Yes, if you have an annotated database with lead vocals and background vocals and you train a deep learning model in a supervised way to separate them it will probably fail. Because learning the function of an instrument requires very high level knowledge about the song. There is definitely some work left to do on those questions.
 
**The evaluation metrics for audio source separation are not ideal. Which metrics do you use and what do you think are the biggest issues?**
 
As everyone, we use the BSS\_eval metrics introduced in 2006. They are very poorly related to perception. So, if you have an improvement of 5 dB on SDR you will hear the difference but if you have less than 0.5 dB difference, it may be hard to notice a difference when listening to the signals.
 
There are other problems which are more related to the implementation of BSS\_eval. The metrics are computed over one second long segments, but they are not defined for frames with a silent target or a silent prediction. This way, when evaluating singing voice separation, we do not measure frames without vocals, which is strange, and we do not consider frames where the model estimates that there is no voice. This is a very big issue. For example, you can gain up to 2 dB in SDR when you remove all frames with low energy – meaning all frames where the model is less sure about the prediction, I tested this.
 
**Some people say that the problem of audio source separation is solved, do you agree?**
 
If you want to separate instruments which are very different from each other like vocals, drums, bass, and other as defined in SiSEC, and if you want to remix them, you should be quite fine with existing models. However, there is still a lot to do when it comes to separating more similar instruments such as trombone and trumpet or piano and guitar. 
 
**What should future source separation research focus on?**
 
Definitely evaluation. Because we cannot tell if we improve if the metrics we are using are not what we want to improve. So, we should avoid fighting with the existing metrics without actually improving something. This needs to be tackled as soon as possible, otherwise we cannot measure our progress. Another aspect is that so far, the progress made by deep learning was in supervised settings. But supervision is limited and you cannot have millions of tracks of every single instrument. So, we need some algorithms that require less supervision. Musical source separation is supposed to be a separation into all the components of the music and this is not what supervised deep learning approaches are doing so far. There is definitely something left to do here too. Also, we usually pre-define how many and which sources the models should separate but we would like that the models are able to find all different instruments without knowing how many there are.
 
**Thank you very much!**

*Comment by Kilian: I was happy that Romain talked about the problem of the BSS\_eval metrics on frames with silent target or silent prediction. I also observed this problem and suggested two new metrics for these cases in my [WASPAA 2019 paper](https://schufo.github.io/files/waspaa_2019_paper.pdf) and made an [implementation available on GitHub](https://github.com/schufo/wiass)*
