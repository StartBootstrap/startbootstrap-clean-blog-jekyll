---
layout: post
title:  "JavaScript事件流學習筆記"
date:   2017-03-15 17:05:00 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---
## 定义
>申明：本文僅限私人學習之用---- [原文](http://www.cnblogs.com/blackwood/archive/2013/03/14/2959195.html)；

>下圖展示了完整的js事件流

<img src="http://images.cnblogs.com/cnblogs_com/blackwood/416364/o_eventpic.jpg"/>
#### 捕獲階段：Document==>ElementHtml==>ElementBody==>ElementDiv
#### 冒泡階段：ElementDiv==>ElementBody==>ElementHtml==>Document

## 分析
>#### 捕獲階段：
document对象首先接收到click事件，然后事件沿DOM树依次向下，一直传播到事件的实际目标。<br/>

>#### 冒泡階段：
IE的事件流叫做事件冒泡（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（ 文档）。

## 事件處理程序
### html事件處理程序
>事件對象：
    event:不是自己定義的，是給元素綁定事件之後，自動生成的局部變量，表示事件對象。
    this:在函數內部，等於事件的目標元素；在函數內部可以像訪問局部變量一樣訪問document及該元素本身的成員。
```js
//如果當前元素是一個表單的輸入元素，則作用域中還會包含訪問表單元素（父元素）的入口
function(){
  with(document){
    with(this.from){
      //元素屬性值
    }
  }
}
```
