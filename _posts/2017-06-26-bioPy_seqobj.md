---
layout:     post
title:      "Biopython - Sequence Object"
subtitle:   "生物人的python 好朋友"
date:       2017-06-26 00:00:00
author:     "AlgaeBrown"
header-img: "img/post-bg-04.jpg"
comments: true
categories: [Bioinformatics Tech]
tags: [Python, Biopython]
---

# 前言
今天要介紹 bioPython 的 sequence object。大家可以想想生物界的 sequence 和 一般的 python string 有哪些不一樣？

其實主要的不同，就是：*A 不一定等於A*。聽起來很玄妙，問你一個問題：

protein sequence `AATAATA` 之中的`A` 和 nucleotide sequence `AATATTAT` 的 `A` 相同嗎？

當然不同！前者代表 alanine 而後者代表 adenine。*這也是我們為何需要特殊的 data type — sequence object 來處理此事的原因*

# sequence object 除了裝 string, 還裝了 alphabet

所以當你要弄出一個 sequence object 的時候，最好的習慣是 specify its alphabet.

alphabet 就是告訴 python 我這個 sequence 中會出現哪些字母。
```
from Bio.Seq import Seq
from Bio.Alphabet import IUPAC
mySeq = Seq('AATTAGG', IUPAC.unambiguous_dna)
```


biopython 已經幫你準備好很多組常用的 alphabet，存在`Bio.Alphabet.IUPAC` 裡面。

有很多選擇：
- 具有 *Extended* 命名的通常代表有些怪里怪氣的東西，例如不常見（非那20個胺基酸）或有修飾過的鹼基。
- 具有 *ambiguous* 的代表可以有『我不知道』，像是 nucleotide 中的 `N`

剩下的你可以等之後再去看說明書。

# sequence object 繼承了大部分 str object 有的東西。

所以我只打算題點有不同的地方，或是 bioinformatics 一搞錯就會出災難的地方。

1. count 數的次數是『不重複』的次數

舉例：
```
Seq('AAAA').count('AA')
```
回傳為多少呢？

答案是*2*

2. python 都從 *0* 開始數，很討厭吧！且注意 range `:` 的範圍！

範例：
```
Seq('AAGTGAA')[2:5]
```
會回傳啥呢？

答案是 GTG!

為什麼？因為**python 從零開始數，且最後一個（5) 不會包含在內**。生物學家，你感到非常困擾嗎。

# 因為有了 alphabet 而出現的新問題：
1. concatenate sequence 必須要兩種東西的 alphabet 相加有意義

範例：
```
protein = Seq('AIVIAI', IUPAC.protein)
neucleotide = Seq('ATGATAGC', IUPAC.unambiguous_dna)

protein + neucleotide
```
會出現問題。當然正常人應該不會想這麼做，請問把 protein 和 neucleotide 連接起來是要？

2. concatenate sequence 若有意義，會遵從嚴格的一方。

範例：
```
unspecified = Seq('ATATTAA')
neucleotide = Seq('ATGATAGC', IUPAC.unambiguous_dna) 

unspecified + nucleotide
```
回傳的序列將會是 of IUPAC.unambiguous_dna

3. 但 comparison 不會看 alphabet type

範例：
```
seq1 
seq2 = Seq("ACGT", IUPAC.ambiguous_dna)
seq1 == seq2
```
回傳的是`True`

# 你應該也猜到該有的
有內建很多功能像是 `transcription`, `translation` 還可以指定 translation 的表格，爽吧。

這也是你應該要用 sequence object, instead of pure python string 的原因

# Reference:
Biopython Tutorial Ch3 Sequence Objects





