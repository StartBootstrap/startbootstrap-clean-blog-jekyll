---
layout:     post
title:      "Annotation Objects"
subtitle:   "生物人的 python 好朋友"
date:       2017-06-27 12:00:00
author:     "AlgaeBrown"
header-img: "img/post-bg-03.jpg"
comments: true
categories: [Bioinformatics Tech]
tags: [Python, Biopython]
---

# 前言

在介紹了 Sequence Object 之後，要來介紹 annotation Object. 這東西講起來，就是一個為了各種 bioinformatics 的檔案設計的強大切割器。一個常見的 fasta 檔案長起來大概是這樣：
```
>YP_005224301.1 flavodoxin [Klebsiella pneumoniae subsp. pneumoniae HS11286]
MADITLISGSTLGSAEYVAEHLAEKLEEAGYSTEIQHGPLVDDLQAQGIWLIISSTHGAGDVPDNLVPFY
DALQEKQADLSAVRFGAIGIGSREYDTFCGAIDKLEAALKACGAKQIGETLKINVLEHEIPEDPAEIWLG
SWKNLL
```

第一行有`>`作為開頭的，就是一些拉里拉雜的資訊。確切的意思不是今天的重點，但是這些你大概很難不用它繼續做事情。譬如說第一個`YP_005`那串應該是id 之類的東，透過它你可以找到和它相關的其他資訊。

總而言之，那一串很重要。所以你會想把它放到表格（dataframe或其他東西)裡面一起做事情嘛。這時候你就需要切切割割。其實我覺得這一章沒有什麼重點，只是你一定要記得：**有現成的parser了，請不要自己再寫了！**

# fasta 用 SeqIO.read()讀進來就會自己生成 annotation Object 啦
樓上的 fasta 可以在這裡[下載](https://www.ncbi.nlm.nih.gov/protein/378976160?report=fasta)

```
record = SeqIO.read('sequence.fasta','fasta')
```
會回傳
```
SeqRecord(seq=Seq('MADITLISGSTLGSAEYVAEHLAEKLEEAGYSTEIQHGPLVDDLQA\
QGIWLIIS...NLL', SingleLetterAlphabet()), id='YP_005224301.1', na\
me='YP_005224301.1', description='YP_005224301.1 flavodoxin [Kleb\
siella pneumoniae subsp. pneumoniae HS11286]', dbxrefs=[])
```
所以你呼叫`record.seq` 就可以輕鬆得到他的整個 sequence 存在 sequence object 裡，開心ㄅ？不過要注意，它預設的 alphabet 是『隨便』（`Single Letter Alphabet()`)。 

要不要來呼叫看看 `record.id`?

# Genbank file 也可依樣畫葫蘆，而且會吃進來更多ㄉ東西

[不知 genbank 是三小檔案的可以看這裡](https://www.ncbi.nlm.nih.gov/protein/YP_005224301.1)

```
record2 = SeqIO.read('sequence.gp', 'genbank')
```

讀進那個連結裡的 genbank 檔案之後，會回傳以下：

```
SeqRecord(seq=Seq('MADITLISGSTLGSAEYVAEHLAEKLEEAGYSTEIQHGPLVDDLQAQGIWLIIS...NLL', IUPACProtein()), id='YP_005224301.1', name='YP_005224301', description='flavodoxin [Klebsiella pneumoniae subsp. pneumoniae HS11286].', dbxrefs=['BioProject:PRJNA84387', 'Assembly:GCF_000240185.1'])
```

有妹有發現它會自動認出這是 protein 了！

還有一個隱藏版資訊, 藏在 SeqFeature object 裡頭！

呼叫`record2.features`看看吧！

# 來介紹 sequence feature object

結果你呼叫 `record2.features` 得到了這些：
```
[SeqFeature(FeatureLocation(ExactPosition(0), ExactPosition(146)), type='source'), SeqFeature(FeatureLocation(ExactPosition(0), ExactPosition(146)), type='Protein'), SeqFeature(FeatureLocation(ExactPosition(0), ExactPosition(146)), type='Region'), SeqFeature(FeatureLocation(ExactPosition(0), ExactPosition(146)), type='CDS')]
```

生物人應該超有感！這些真是他ㄇ重要的資訊ㄎㄎ。

裡面還有一層又一層的 object 幫你把重要的資訊萃取出來。[需要的時候再去看吧!現在講只會讓你睡著而已！](http://biopython.org/DIST/docs/tutorial/Tutorial.html#htoc38)

# 不同檔案間的互相轉換：`.format`是我們麻吉

接續剛剛 genbank file 的例子，我們可以把它變成fasta file!
```
record.format('fasta')
```
然後就會得到
```
'>YP_005224301.1 flavodoxin [Klebsiella pneumoniae subsp. pneumoniae HS11286].\nMADITLISGSTLGSAEYVAEHLAEKLEEAGYSTEIQHGPLVDDLQAQGIWLIISSTHGAG\nDVPDNLVPFYDALQEKQADLSAVRFGAIGIGSREYDTFCGAIDKLEAALKACGAKQIGET\nLKINVLEHEIPEDPAEIWLGSWKNLL\n'
```

酷吧！現在你可能覺得為什麼不去下載一份fasta就好了？但是當你有 6000 個檔案要再跑一次下載可能會有點居居。

# 結論

要記得有現成的parser 就不要再 re-invent the wheels!

# Reference

Biopython Tutorial [Ch4 Sequece Annotation Objects](http://biopython.org/DIST/docs/tutorial/Tutorial.html#htoc38)
