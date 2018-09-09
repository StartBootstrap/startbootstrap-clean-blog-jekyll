---
layout:     post
title:      "生物人碰上 python2 和 python3 衝突"
subtitle:   "笨卜吉學習日誌"
date:       2017-03-23 12:00:00
author:     "AlgaeBrown"
header-img: "img/post-bg-03.jpg"
comments: true
---

# Python 2 和 Python 3版本衝突
bioinformatics 許多工具是使用python 2，然而我是安裝python 3.6.0。
今天是遇到這樣的問題，在安裝 Comprehensive Antibiotic Database(CARD) RGI 的時候，因版本衝突無法使用

# 操作環境：
在遠端 vultr arch 上有安裝 miniconda, py3.6.0

# conda 可以 create 新的 python envirionment
```
conda create -n py27 python=2.7 anaconda
```
這句話在供三小ㄋ？ 創造一個叫「py27」的環境，安裝的是 anaconda 的 python 2.7

 [Read Documentation](https://conda.io/docs/py2or3.html#create-a-python-2-7-environment)

記得你每一次要用他，就要叫他出來~不然電腦還是持續在py3.6的環境

# 要怎麼叫他出來
```
source activate py27
```

然後做你需要用 py2.7 做的事情

# 做完之後要記得退出 py2.7 的環境，回到 py3
```
source deactivate py27
```

