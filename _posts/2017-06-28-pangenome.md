---
layout:     post
title:      "Bacterial Pangenome"
subtitle:   "A new way of looking at bacteria and pathogenesis"
date:       2017-06-28 12:00:00
author:     "AlgaeBrown"
header-img: "img/post-bg-02.jpg"
comments: true
categories: [Research]
tags: [literature review]
---

# K. pneumoniae pangenome analysis 
[original](http://www.pnas.org/content/112/27/E3574.full)

- methods:
    - 328 genomes
- result:
    - core genome (conserved in all): 1743
	- common genes (>95% present): 1888
	- accessory genes: most are rare (66% <5% prevalance), 而且用GC content 計算應該是別的物種偷來的
	- pangenome size: 29886
	- open genome
	
每一個 genome 除了1743 core 還有 中位數 3000 多個 accessory gene
	
## K. penumoniae 演化上有三個大群(phylogroup) Kp I, II, III
- methods：
    - phylogenic analysis: split network, maximum likelihood
	phylogenic network is **different** from phylogenic network. The former allows one node to haove **only one** parent, while the latter allows **more than one** parent, under the assumption that gene loss, duplication or horizontal gene transfer occur during evolution. [Ref: Wiki](https://en.wikipedia.org/wiki/Phylogenetic_network)[Ref: review article](https://academic.oup.com/mbe/article/23/2/254/1118872/Application-of-Phylogenetic-Networks-in)
	- mean pairwise **nucleotide** divergence
	- PCA on accessory genes
- results：
    - **Unlikely** that homologous recombination occur between phylogroups, as groups diverge on nucleotide level
	- three groups poscess distinct groups of accessory genes
	> three phylogroups are distinct species, as 96% identity between phylogroups (commonly-used cutoff for "species")
	> exist some barrier (environmental, mechanical, selection...etc) that stop them from exchanging genetic material
	- in this study, genomes used are mostly (87%) Kp I, which is long considered of most clinical importance (being pathogenic). Kp II is mostly carriage while Kp III are of bovine origin.

## 因為他們只有 Kp I 所以接下來就不停的只討論它
- method
    - ML phylogeny, neibor-joining split network
	- RAMI
	- MLST sequence type
	- fineSTRUCTURE: consist with phylogenic analysis
	- [lineage accumulation curve](http://www.annualreviews.org/doi/abs/10.1146/annurev-ecolsys-121415-032254)
- results:
    - the phylogenic network is deep branching --> Kp I seperate into nearly 157 **lineages** very early
	- lineage accumulation curve 表示應該要多收集更多 sample 才可以好好地研究 Kp I since it is so diverse...
	
### Kp I 的致病性
- 分析這些 Kp I 的來源（Hospital-acquired or Community acquired; invasive or carriage)，多數 linage 都 **只出現一次**，所以沒有哪個linage 比較厲害。 也就是說
> 致病性應該不是 core genome 造成的，攏系 accessory gene ㄟ陰謀啦
- 另外還有看看已知的致病基因有沒有都出現在 invasive 的lineage...我沒有很仔細看

## Kp and antibiotic resistance
- some are in the core genome `core AMR genes`
    - in all three phylogroups: --> originate from K. pneumoniae
	    - in chromosome: LEN, OKP, SHV
		- from horizontal gene transfer: FosA, oqxAB
- other 78 AMR genes are detected in 150/288 isolates. `acquired AMR genes`
    - no linage specificity
	- associated with **region**
	- should be from horizontal gene transfer
    - occur most in **human-associated phylogroup**: KpI and IIb
	     - KpI: more common in **carriage** than invasive
		 - ESBL is very popular, especially in KpII
		 - **nonsomical** > community-acquired
	- these genes are likely of **plasmid-origin**, for 67/150 isoaltes identified in the PlasmidFinder database 
	- 出現多次的linage 多為 MDR 擁有最多 AMR gene 的

## Kp 可能會又抗藥又致病

# 山洞裡的細菌
	人們一直說抗藥性基因是從環境中不致病菌偷來的，若你把所有有潛力成為抗藥性基因的基因都加入一個（數學上的）集合，這個集合就叫做resistome，人們認為大部分我們覺得很新奇的抗藥性，其實只是致病的菌從 resistome 這個大字典裡面拿了一些出來用。
	所以有人為了要更加了解抗藥性，他們就去山洞裡挖了一隻我沒聽過的菌，就叫它做 LC231吧！他們真的有「挖」，因為據說那個山洞的土壤已經 4*10^6 年沒有和外界接觸了，因此他們相信這土裡的 LC231 一定是最純樸的 **鄉下細菌**，從來沒有被人們濫用的抗生素霸凌、也沒有交上醫院裡 pathogenic 的壞朋友。
	現在 sequencing 實在太便宜了，為了要更加認識 LC231，他們就帶它去定序了;又用了三十來種抗生素挑戰它，不挑戰還好，一挑戰嚇死人！這LC231 居然不客氣地可以抗一大堆抗生素，且比市面上的 S. aureus 厲害八倍。「原來 LC231 是隱於市的高人啊！」這下子他們對 
