---
layout: post
title: AI Carbon Footprint 
subtitle: The carbon impact of AI
excerpt: The carbon impact of AI
date: 2020-11-04
author: Giorgia Cantisani
author-id: giorgia
---

The topic of this blog is the carbon footprint of artificial intelligence. I thought this was a relevant topic to discuss as **we, as researchers, are part of the emission process**, even if we are mostly unaware of it. I believe it is ethically essential to be aware of the consequences that can derive from training our models and try to introduce some **guidelines and best practices** in our research community.

##### Climate change
First, let us recall the consequences of climate change, even if they are under our eyes every day. The United Nations declared climate change a [*“defining crisis of our time”*](https://www.un.org/en/un75/climate-crisis-race-we-can-win), and most climate scientists agree that human activity is its main driver ([Climate project](https://www.climaterealityproject.org/)). The effects of climate change are not only the rise of temperatures and the melting of glaciers but also [[1]](https://www.un.org/en/un75/climate-crisis-race-we-can-win):

- food and water emergency due to the soil degradation and the increase of temperatures;
- extreme meteorological events such as heatwaves, hurricanes, which are becoming more frequent and intense. 90% of them are classed as climate-related.

This creates competition for land, food, and water, leading to socio-economic tensions and mass displacement [1]. More than 140 million people, mostly from the south of the world, will be forced to migrate by 2050 [1]. According to a [Stanford University research](https://earth.stanford.edu/news/climate-change-has-worsened-global-economic-inequality#gs.g3u2y5), the economic gap between the world’s richest and poorest countries is 25% larger today than it would have been without global warming.

**Urgent actions are needed** to avoid an environmental catastrophe, including bringing emissions to zero by the middle of the twenty-first century and limiting the average global warming to 1.5 °C [1]. Technology has, of course, a central role in fighting this crisis.

##### The role of AI
In this light, it has become an urgent matter to consider AI technology’s role, which plays a dual role in the crisis. On the one hand, it can help reduce climate change effects, such as modelling and developing solutions to fight it. On the other hand, **AI is itself a significant emitter of carbon**. 

Below you can see a visual map extracted from an essay of 2018 titled [‘Anatomy of an AI system’](https://anatomyof.ai/) that shows the impact of an AI device on a global scale. The authors took as an example Amazon Echo and followed its impact from manufacturing to usage. They analysed its impact in terms of social work, data, and resources required during its lifespan.

<figure class="figure w-100">
  <img src="{{ '/images/blog/Carbon2020/ai-anatomy-map_1.jpg' | relative_url }}" alt="ai-anatomy-map" class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption text-center" markdown="1">
  Map extracted from the essay ‘Anatomy of an AI system’
  </figcaption>
</figure>

In the whole map, the place where we as researchers come into the game and play an active role is the little section below, related to training an AI system and eventually preparing and labelling the data.

<figure class="figure w-100">
  <img src="{{ '/images/blog/Carbon2020/ai-anatomy-map_2.jpg' | relative_url }}" alt="ai-anatomy-map-detail" class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption text-center" markdown="1">
  Detail of the map extracted from the essay ‘Anatomy of an AI system’
  </figcaption>
</figure>

##### Red VS Green AI
In 2019, a team from MIT analysed some natural language processing (NLP) models available online [[2]](https://arxiv.org/abs/1906.02243). The researchers estimated the energy consumption in kilowatts required to train them and converted them into approximate **carbon emissions and electricity costs**. In the figure, you can see the estimated CO2 emissions from training standard NLP models, compared to everyday consumption.

They estimated that the carbon footprint of training a single big language model is equal to around 300,000 kg of carbon dioxide emissions, which is of the order of magnitude higher than other familiar consumptions. Always in the same paper, the authors quantified the **computational cost of R&D** for a new NLP model. This cost is the one we as researchers and engineers should consider, as it reflects the actual carbon footprint of a project.

<figure class="figure w-100">
  <img src="{{ '/images/blog/Carbon2020/NLP.JPG' | relative_url }}" alt="NLP" class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption text-center" markdown="1">
  Tables extracted from [2]
  </figcaption>
</figure>

In a paper from 2019, Roy Schwartz and collaborators observed that a linear gain in performance requires an exponentially larger model leading to substantial carbon emissions [[3]](https://arxiv.org/pdf/1907.10597.pdf) . They called this trend **‘red AI’**, that is, ‘buying’ stronger results using massive computing. Their study enumerated three factors making AI research red: 

- the cost of executing the model on a single example; 
- the training dataset size, which controls the number of times the model is executed; 
- the number of hyperparameters, which controls how many times the model is trained. 

They analysed papers from top conferences and observed that the majority prioritised accuracy over efficiency (90% from the 2018 Computational Linguistics, 80% from the 2018 NeurIPS, and 75% from the 2019 Conference on Computer Vision and Pattern Recognition). In the same paper, the authors defined ‘green AI’ as [*“AI research that yields novel results without increasing computational cost, and ideally reducing it”*](https://arxiv.org/pdf/1907.10597.pdf), opposite to red AI. Green AI considers efficiency as a critical evaluation criterion. Ideally, this type of research would level the possibilities of academia versus big tech companies, whose research is often facilitated by impressive computational resources.

A **virtuous example in audio research** is [SuDoRM-RF [4]](https://arxiv.org/pdf/2007.06833.pdf), a novel deep architecture for efficient universal sound source separation. It extracts multi-resolution temporal features through successive depth-wise convolutional down-sampling and aggregates them using a nonparametric interpolation scheme. This way, the authors can significantly reduce the required number of layers while still capturing effectively long-term temporal dependencies. The proposed model performs similarly or even better than state-of-the-art models while requiring significantly less computational resources in terms of the number of trainable parameters, number of floating-point operations, memory allocation, and time.

<figure class="figure w-100">
  <img src="{{ '/images/blog/Carbon2020/sudo-rm-rf.JPG' | relative_url }}" alt="sudo-rm-rf" class="figure-img img-fluid mx-auto d-flex">
  <figcaption class="figure-caption text-center" markdown="1">
  Separation performances alongside their computational requirements for performing inference on CPU (I) and a backward update step on GPU (B) for one second of input audio or equivalently 8000 samples [4].
  </figcaption>
</figure>

Even if this is a virtuous example, there is no estimate of carbon emissions and energy consumption. Mainly, the problem is the **absence of a standard of measurement** and the intrinsic difficulties in measuring it.

The emissions are related to the training [server’s location](https://www.electricitymap.org/map) and the energy grid it uses, the training procedure’s length, and the training’s hardware. Thus, it is tough to measure and requires specific knowledge. Therefore, we can take advantage of **libraries and tools** that do the work for us, for example:

- [ML CO2 IMPACT](https://mlco2.github.io/impact/#home) [[5]](https://arxiv.org/pdf/1910.09700.pdf)
- [experiment-impact-tracker](https://github.com/Breakend/experiment-impact-tracker) [[6]](https://arxiv.org/pdf/2002.05651.pdf)
- [carbontracker](https://github.com/lfwa/carbontracker) [[7]](https://arxiv.org/pdf/2007.03051.pdf)

##### Quantify the energy account
The consumed energy consists of the **amount of energy needed to power the computational system** is measured in Joules (J) or Watt-hours (Wh). It is given mostly by the cooling of the system and by the server/storage alimentation [6]:

- cooling (50%)
- lighting (3%)
- power conversion (11%)
- network hardware (10%)
- server/storage (26%)

We can further break down the server and storage component into DRAM, CPUs, and GPUs’ contributions. Accurate accounting for all these components requires complex modelling and varies depending on workload. Most carbon/energy trackers consider DRAM/CPUs/GPUs consumption and account for the other components through the **PUE (Power Usage Effectiveness) factor **[6]. This factor rescales the power metrics by an average projected overhead of different elements. This way, one can evaluate the impact of her/his experiment only without considering background processes.

Carbon emissions are typically measured in CO2eq, which is the amount of carbon released into the atmosphere due to the project [6]. Sometimes (especially in regulations), it is considered the financial impacts through carbon’s social cost (SC-CO2), which measures the long-term damage done by CO2 [6].  To measure it, one should use the per-country social cost of carbon, which accounts for different risk country profiles.

We can estimate carbon emissions by understanding the local energy grid’s carbon intensity and the system’s energy consumption [6]. The **carbon intensity** corresponds to the grams of CO2eq emitted per kWh of energy used and is determined by the energy sources supplying the grid:

- coal power: 820 gCO2eq/ kWh
- hydroelectricity: 24 gCO2eq/ kWh


Thus, running our job in countries where the energy supply is green can be crucial. There is not a necessary need to eliminate computation-heavy models, as shifting training resources to low carbon regions will immediately reduce carbon emissions with little impact on us [6]. (e.g., [training the same model in Quebec than in Lettonia will reduce CO2eq by 30 times!](https://www.electricitymap.org/map))       


##### Guidelines
In conclusion, we, as researchers, should think about:

- report training time, computational resources, and sensitivity to hyperparameters
- make a cost-benefit (accuracy) analysis of our models
- prioritise computationally efficient hardware and algorithms
- quantify energy consumption and carbon emission
- move jobs in low carbon regions

Check out these excellent initiatives:

- [Tech Workers Coalition](https://techworkerscoalition.org/climate-strike/)
- [SustaiNLP 2020](https://sites.google.com/view/sustainlp2020/shared-task)

Looking forward to seeing something similar in the MIR community!

##### References:

[1] https://www.un.org/en/un75/climate-crisis-race-we-can-win

[2] Strubell, Emma, Ananya Ganesh, and Andrew McCallum. "Energy and policy considerations for deep learning in NLP." arXiv preprint arXiv:1906.02243 (2019).

[3] Schwartz, Roy, et al. "Green ai." arXiv preprint arXiv:1907.10597 (2019).

[4] Tzinis, Efthymios, Zhepei Wang, and Paris Smaragdis. "Sudo rm-rf: Efficient networks for universal audio source separation." 2020 IEEE 30th International Workshop on Machine Learning for Signal Processing (MLSP). IEEE, 2020.

[5] Lacoste, Alexandre, et al. "Quantifying the carbon emissions of machine learning." arXiv preprint arXiv:1910.09700 (2019).

[6] Henderson, Peter, et al. "Towards the Systematic Reporting of the Energy and Carbon Footprints of Machine Learning." arXiv preprint arXiv:2002.05651 (2020).

[7] Anthony, Lasse F. Wolff, Benjamin Kanding, and Raghavendra Selvan. "Carbontracker: Tracking and predicting the carbon footprint of training deep learning models." arXiv preprint arXiv:2007.03051 (2020).



