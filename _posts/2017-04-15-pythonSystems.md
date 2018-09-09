---
layout:     post
title:      "Python Systems"
subtitle:   "笨卜吉程式讀書筆記"
date:       2017-04-15 12:00:00
author:     "AlgaeBrown"
header-img: "img/post-bg-03.jpg"
comments: true
---

這篇是摘錄書本「Introducing Python］ Chapter 10 所讀到比較不熟悉的東西。

# Chmod
## File permission
在 Unix 下面，打 `ls -al` 會冒出這一大堆亂七八糟的文字
```bash
drwxr-xr-x 12 hermuba hermuba  4096 Apr 15 19:58 .
drwxr-xr-x  3 root    root     4096 Apr  4 16:09 ..
-rw-------  1 hermuba hermuba  1695 Apr 15 18:17 .bash_history
-rw-r--r--  1 hermuba hermuba   220 Apr  4 16:09 .bash_logout
-rw-r--r--  1 hermuba hermuba  3914 Apr  6 09:59 .bashrc
-rw-r--r--  1 hermuba hermuba  3825 Apr  6 09:59 .bashrc-miniconda3.bak
```

而前面 `-rw-r--r--` 就記錄了每個檔案或資料夾有哪些 user 有權力去使用他。

1. 第一個字 `-` 代表這是個檔案(file)； `d` 代表這是個資料夾(directory)
2. 後面的九個字，三個三個為單位，描述三種 user: Owner, group, other 可以對這個東西做些什麼事情。
3. 一個user的三個字，`r` 代表可以讀取(read)； `w` 代表可以寫入(write，就是「改檔案內容」的意思)； `x` 代表可以去執行(execute)；  `-` 代表你不准做這件事。

所以 `-rw-r--r--` 代表
1. 他是file
2. Owner 可以 read and write, but not allowed to execute
3. Group and Other people are only allowed to read the file.

## chmod 只是用來改變檔案的權限的指令，如此而已
所以上一篇的exercise，有人寫好shell script 卻無法執行的話，應該是因為你沒有權限 execute 他。 解決方式就是：
```bash
chmod +x your_bash.sh
```

Python 中 os module 也可以提供此功能：
``` python
os.chmod('oops.txt', 0o400)
```
後面那串是octal，有夠難用； 凡人如我還是乖乖使用模組 [stat](https://docs.python.org/3.6/library/stat.html)
``` python
import stat
os.chmod('oops.txt', stat.S_IRUSR)
```

# Process and Subprocess
## 什麼是 Process?
在 windows 底下當機的時候，常常會打開 Task Manager 把當掉的程式殺掉。在 Task manager 裡面看到一個一個在跑的東西就叫做一個 Process. 

書裡是這樣寫的：
> When you run an individual program, your operating system creates a single **process**.

Photoshop 是一個 process, word是一個process, 連task manager 本身都是一個。

## 伸出你的賊手來： subprocess

在 python 中的 `subprocess` module，允許我們從 python interpreter 這個 process 中，伸出賊手，起始或結束別人的 Process， 甚至可以偷吃別人的 output。

```python
import subprocess
subprocess.getoutput('date -u | wc')
```
這樣會吃到的是： `date -u | wc` 的output

## multiprocessing
multiprocess 可以做啥？
> You can run a Python function as a separate process or even run multiple independent processes in a single program with the multiprocessing module.

``` python
import os
import multiprocessing

```
> 看到這裡你一定黑人問號.jpg，所以ㄋ？我會 subprocess, multiprocessing 是要衝三小？能吃ㄇ？ㄏㄏ

## 一切都是為了平行運算
(以下截取自 Introducing python ch11: Concurrency)