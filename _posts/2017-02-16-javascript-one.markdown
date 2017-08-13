---
layout: post
title:  "我的第一篇文章!"
date:   2017-02-16 20:17:31 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---
## 目的：
在制作个人网站的时候，我需要在header里面加入各大社交网站的直链，可以让更多人，找到我，提供他们的想法。并且去实现那个想法。
## 展现方式：
是以一种点击图标的的形式，展示不同社交网站的二维码或者是链接。在开发过程中遇到很多有意思的坑，想分享给大家，希望可以给看到本文的小伙伴提供点帮助。
## 使用技巧
由于在一开始，我们就用了多个程序来进行区分不同事件点击之后，显示不同的图片的功能。但是在一段时间之后发现这样子的代码谈不上什么有价值的，所以我重新花了点时间，把代码重新架构了一番。清理了冗余代码，同时也把程序优化了。
优化之后的程序只要将植入代码，就可以实现简单的点击不同按钮,相同位置展示不同图片功能。
## 项目结构：
```
├──index             // 示例 index
│   ├──js
│   │   └──index.js
│   ├──css
│   │   └──index.js
```
## index.html详解
首先页面header排版，设置具体结构
```html
├── div            // 示例 header
│   ├── div
│   │   └── img
│   │   └── img
│   │   └── img
```
在每个img中添加onclick="hImage()"属性，并给每个"hImage()"中加入"1-3"值；设置这个值，是为了在index.js的hImage()函数中做出对应的判断。
``` html
<img class="h-image" onclick="hImage(1)" width="50" height="25" alt="图标1" title="1">
```
```html
<!--主框架-->
<div class="h-box">
    <div style="color: #fff;text-align: center">
        <img class="h-image" onclick="hImage(1)" width="50" height="25" alt="图标1" title="1">
        <img class="h-image" onclick="hImage(2)" width="50" height="25" alt="图标2" title="2">
        <img class="h-image" onclick="hImage(3)" width="50" height="25" alt="图标3" title="3">
    </div>
</div>
```
### 模态框
``` html
├── div            // 示例 模态框
│   ├── div
│   │   └── div
│   │   └── img
│   │   └── h1
```
第一层div设置模态框显示之后的透明色背景。
第二层div主要是做模态框显示之后的内容的框架
第二层div下面的div是关闭模态框按钮。里面加入 onclick="hShow()" 函数，该函数负责关闭模态框
``` html
<div onclick="hShow()">×</div>
```
第二层div下面的 img 则是展示不同图标点击之后，显示的二维码
第二层div下面的 h1 则是展示不同图标点击之后，显示的提示信息
这里的模态框设置
使用position中的fixed，来设置模态框的位置与样式。同
```html
<!--模板-->
<div class="h-module">
    <!--放置二维码图片-->
    <div>
        <!--设置模态框关闭按钮-->
        <div onclick="hShow()">×</div>
        <!--图片放置路径-->
        <img id="hhtImg" src="" alt="">
        <h1 id="hText"></h1>
    </div>
</div>
```
## index.js详解
```js
var hModule = document.getElementsByClassName('h-module');//获取模态框中的关闭按钮属性
var hhtImg = document.getElementById("hhtImg");//设置模态框不同位置按钮点击之后展示的属性图片属性
var hText=document.getElementById("hText");//设置模态框显示之后的提示信息
/*hImage函数
 * 由于图片只有一张，所以同时设置title属性以示区分
 * 通过 switch语句判断点击不同按钮，
 * 在模态框展示不同的图片。
 */
function hImage(e) {
    console.log();
    switch (e) {
        case 1:
            //hhtImg.src为设置需要展示的图片的地址
            hhtImg.src = "http://oigzh9iic.bkt.clouddn.com/%E4%BA%AB%E6%9C%88%E4%BC%9A%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg";
            hhtImg.title = "这里是" + e;//此处设置鼠标悬浮于图片时显示的文字
            hText.innerHTML="这里是二维码" + e;//此出设置模态框显示之后，展示提示文字的内容
            break;
        case 2:
            hhtImg.src = "http://oigzh9iic.bkt.clouddn.com/%E4%BA%AB%E6%9C%88%E4%BC%9A%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg";
            hhtImg.title = "这里是" + e;
            hText.innerHTML="这里是二维码" + e;
            break;
        case 3:
            hhtImg.src = "http://oigzh9iic.bkt.clouddn.com/%E4%BA%AB%E6%9C%88%E4%BC%9A%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg";
            hhtImg.title = "这里是" + e;
            hText.innerHTML="这里是二维码" + e;
            break;
    }
    hModule[0].style.display = "block";
}
/*hShow函数
 * 功能：关闭模态框；
 * 由于原生js中，获取参数的值
 * 之后，其属性为数组形式；
 * 需要设置下标，再去设置style属性，
 * 或者是其他属性
 * */
function hShow() {
    hModule[0].style.display = "none";
}
```