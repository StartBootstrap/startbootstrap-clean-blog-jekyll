---
layout:     post
title:      "在Windows用Vagrant開Ubuntu的jupyter notebook"
subtitle:   "笨卜吉學習日誌"
date:       2017-02-26 12:00:00
author:     "AlgaeBrown"
header-img: "img/post-bg-03.jpg"
comments: true
---
這一篇是寫給完全沒有受過正規電腦教育的人看，高手就笑一笑吧！有錯誤請不吝指正！謝謝

# 1 Why linux?
因為研究室需求，有些別人做好的東西只能在 linux 環境下跑，在尚沒有 work station 的情形下，只能來個虛擬機將就將就.

# 2 Why not 直接裝linux
因為仍有需求要使用 Adobe 系列東西，且我對 linux 很不熟(上次要裝個東西就搞了一個小時)，暫時無法完全轉換

# 3 Why Vagrant?
因為使用Virtual Box開圖形介面吃掉太多 memory ，所以用cmd會好上一些.
但是Vagrant預設是不會打開圖形介面，所以想要把 Ubuntu(guest)jupyter notebook 用 windows(host) 的瀏覽器開啟

# 4 環境
Ubuntu/Xenial64
Anaconda with python 3.6

# 5 安裝Anaconda
到[ Anaconda 網站](https://www.continuum.io/downloads)複製下載 python 3.6 installer 的網址
~~~~ wget https://repo.continuum.io/archive/Anaconda3-4.3.0-Linux-x86_64.sh ~~~~

然後複製左下角的指令，基本上我對這一行的理解就是你按.exe兩下，是一樣的意思
`bash Anaconda3-4.3.0-Linux-x86_64.sh`

他就會問東問西，問你要把東西裝哪裡，像我這種人一律是按yes = =

裝好之後要重新開機Vagrant
`Vagrant reload`

# 6 更改Jupyter notebook的設定
進入之後要更改jupyter notebook的port由預設的改成8888(原理等回解釋)
`jupyter notebook --generate-config`
然後使用編輯器nano
`nano /.jupyter/jupyter_notebook_config.py`
把這一行`#c.NotebookApp.port = 9999`改成
`c.NotebookApp.port = 8888`


> 在這裡你可能會遇到一個問題，就是電腦問你：「jupyter是啥小？」
> 電腦話會這樣寫: `jupyter: command not found`
> 這時候你大概會快要崩潰，不要崩潰，這只是因為你的terminal不認識jupyter，只要教會他就好惹

> 先檢查.bashrc裏頭有沒有Anaconda安裝時留下的筆跡
> `cat .bashrc`
> 找找看有沒有這一行
> `export PATH="/home/username/anaconda/bin:$PATH`
> 沒有的話恭喜你，找到問題了
> 請趕快把它加進去
> 不要學我這個白癡用gedit，gedit是圖形化介面，用Vagrant怎麼打ㄉ開?
> 請愛用nano
> `nano .bashrc`
> 加入上面那行找不到的
> 存檔~退出！將將

# 7 更改Vangrant的設定
回到Vagrant，現在要把vagrant的指示改掉
打開Vagrant的設定檔，Vagrantfile
`code Vagrantfile`
(沒有使用Visual Studio Code的同學請愛用txt)

uncomment this
`config.vm.network "forwarded_port", guest: 8888, host: 8888`
數字要改對

改完之後記得重新開機Vagrant

# 8 終於要打開Jupyter notebook惹
`jupyter notebook ––ip=0.0.0.0`
ip = 0.0.0.0 是要告訴Vagrant這個東西別的電腦也口以用
然後打開瀏覽器，把網址列打`localhost:8888`

他會要你給他token，阿你就照個terminal上的複製貼上就好惹

呼呼終於終於

# 9 解釋原理
這一串真的很長，但是我們就在做一件事情而已～
把原本在Vagrant裡面的東西讓外面(你的windows電腦)可以讀到

Vagrant是一台虛擬機，什麼是虛擬機，就是他住在你的電腦哩，但他自以為自己是一台電腦
所以你要從windows進去Vagrant裡面，就好像是你要連你媽的電腦一樣，需要用特殊的方法

特殊的方法就是！port
port是啥小，就是電腦和電腦溝通的港口啦！港口的名字都是數字
不同數字的港口有慣例要拿來做某些事
對這個有興趣可以看[WIKI](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)

所以Vagrantfile裡面的這一行
`config.vm.network "forwarded_port", guest: 8888, host: 8888`
是在說從guest(就是尼的虛擬機)8888號港口出去的船要開到host(就是尼的電腦本尊)的港口8888
瀏覽器`localhost:8888`就是本尊的港口，所以你收到資料啦~
至於`c.NotebookApp.port = 8888`是跟jupyter notebook說：「你要出貨到港口8888喔」

港口號碼一定要8888嗎？
會選8888是因為~~吉利~~嘛，當然不是，是依照剛剛說的慣例
8XXX通常就是這樣用的嘛
你爽用1234也是可以囉，要改對就是了嘛
不過要小心，數字小的港口通常都是留給**政府專用**，user不行用囉

# 10 嗚嗚我還是裝不好
那趕快去找高手幫幫忙QQ 我也救不了你了QQ
你應該也看的出來我有多崩潰吧QQ






