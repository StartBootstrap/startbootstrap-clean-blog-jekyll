---
layout:     post
title:      "Working with Servers: survival guide!"
subtitle:   "minimalism lol"
date:       2017-12-02 12:00:00
author:     "AlgaeBrown"
header-img: "img/post-bg-04.jpg"
comments: true
---
This is **super short** survival guide to share with you how to work with linux server. I am not an expert regarding to this. But I will make sure that this article can help you **survive**. So let's get started!

# connecting to the other computer using `ssh`

1. First you need to have `ssh` on **YOUR** computer!
Mac OS users, I don't think you will need to install anything.
Arch linux users, please `pacman -S openssh`.
Windows users, that's a little bit tricky. Try using `mintty`, git shell, OR CHANGE YOUR OS to linux (joking lol)

2. `ssh USERNAME@host.public.ip` connects you to the server!
> However, if the remote computer does not have a public IP, you may `ngrok` on THAT computer to open a door for you to access.
> this way you need to ask the owner of the remote computer for the **port number**
> modify to the command to  `ssh -p PORT_NUMBER YOUR_ID@0.tcp.ngrok.io`

3. type the password and congrats you're now inside that computer :)

# use `tmux`, to open multiple windows and to prevent information loss in case you get disconnected from your server

What is tmux? It's something that helps maintaining your process on the remote computer even your local computer goes to sleep (or internet's dead).
It also has other functionalities, for example, to have multiple tabs so that you can work very fast (conditioned on you're familiar with the shortcuts lol).

for detailed tmux commands, please visit [cheatsheet](https://gist.github.com/MohamedAlaa/2961058)

# Moving files from local computer to server: `rsync`

some people may know `scp`, but `rsync` is better for it will not restart all upload/downloads if the connection is accidentaly lost. `rsync` will only sync one way, and will compare the file lists and contects between local and server.

for detailed rsync commands, please visit [rysnc tutorial](https://www.tecmint.com/rsync-local-remote-file-synchronization-commands/)

# Code on the server: you will need an editor that can work solely in the terminal! It's `emacs` (or `vim`)

I don't know how to use `vim`. But I know a little bit about emacs. I have to admit that without a mouse, and the right-clicks, marking  regions, it INITIALLY feels **miserable** to code.
But soon I got used to it.

The general concept of using emacs is to:
1. install emacs `sudo apt install emacs24-nox`
2. clone someone's init.el: this is the thing that help you add function to emacs. I clone yfwu's init.el. It includes python modes and blablabla (and it sufficient for my survival lol). You may search the web to get some newbie pack (?).
3. start learning those commands:
- `C-x C-f` opens a new/existing file
- `C-x 0` closes the window
- `C-x 3` splits the window in my FAVORITE way
- `C-x b` shows you the active buffers
- `C-g` when you accidentaly press some unknown shortcut. it will terminate that shortcut whatever it is. Then you can start again! yeah.
- `C-k` cuts the whole line
- `C-y` is paste
- `C-@` to mark-set and use `C-w` to cut, `M-w` to copy, `C-y` to paste
- `C-x C-s` saves the file
- `M-x something` opens that something. The only one that I've used was: `M-x shell` lol
- most importantly, `C-x C-c` to leave emacs if you're pissed.

That's all I need to survive.
There are, of course, A LOT OF fancy functions helping you to work **very efficiently** with emacs. For those functions, I will refer you to the best tutorial (but in Chinese) [Emacs 101](https://github.com/emacs-tw/emacs-101-beginner-survival-guide)

These's are all I know to survive with my Ubuntu server. Hope this helps.
