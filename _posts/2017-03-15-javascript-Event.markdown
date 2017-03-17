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
>#### 事件對象：
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

#### 缺點：
    1.時差問題，用戶可能會在HTML元素一出現在頁面上時，就觸發相應事件，但當時該事件有可能不具備執行條件。
    2.这样扩展事件处理程序的作用域链在不同浏览器中会导致不同结果。不同JavaScript引擎遵循的标识符解析规则略有差异，很可能会在访问非限定对象成员时出错。(高耦合)

### DOM0级事件处理程序
>通过js指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性
```js
//创建
var btn = document.getElementById("myBtn");
btn.onclick=function(){
  alert("Clicked");
}
//删除
btn.onclick=null;
```

### DOM2级事件处理程序
#### addEventListener()
>为指定事件添加处理程序
```js
// 下面这段程序中因为添加了false，所以该事件会在冒泡阶段被触发
var btn=document.getElementById('myBtn');
btn.addEventListener("click",function(){
  alert("this.id");
},false);
// 使用 DOM2 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。
// 这两个事件处理程序会按照添加它们的顺序触发，因此首先会显示元素的ID，其次会显示" Hello world!" 消息。
var btn=document.getElementById("myBtn");
btn.addEventListener("click",function(){
  alert("this.id")
},false);
btn.addEventListener("click",function(){
  alert("Hello World！")
},false);
```

#### removeEventListener()
>删除事件处理程序
```js
// 下面这个函数，虽然看起来合乎逻辑，但是removeEventListener清除的程序与addEventListener绑定的事件不是同一个
var btn=document.getElementById("myBtn");
btn.addEventListener("click",function(){
  alert("Hello World！")
},false);
btn.removeEventListener("click",function(){
  alert("Hello World!");
})
// 我们在这里用另一个例子来表现,这个例子中绑定事件程序与删除事件程序使用了相同的函数
var btn=document.getElementById("myBtn");
var handler = function () {
  alert(this.id);
}
btn.addEventListener("click",handler,false);
btn.removeEventListener("click",handler,false);
```

### 建议
>大多数情况下，都是将事件处理程序添加到事件流的冒泡阶段，这样可以最大限度地兼容各种浏览器。最好只在需要在事件到达目标之前截获它的时候将事件处理程序添加到捕获阶段。如果不是特别需要，我们不建议在事件捕获阶段注册事件处理程序。

## IE事件处理程序
>IE实现了与DOM中类似的两个方法：attachEvent()和detachEvent()。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。由于IE8及更早版本只支持事件冒泡，所以通过attachEvent()添加的事件处理程序都会被添加到冒泡阶段。

### attachEvent()
```js
// 下面这个例子中 事件绑定 时 ,第一个参数用的是 onclick，IE使用attachEvent()与使用DOM0方法的主要区别在于处理程序的作用域。
var btn=document.getElementById("MyBtn");
btn.attachEvent("onclick",function(){
  alert("Clicked");
})
// 在DOM0级方法的情况下，事件处理程序会在其所属元素的作用域内运行；在使用attachEvent()方法的情况下，事件处理程序会在 全局作用域中运行，因此this等于windows。
var btn =document.getElementById("myBtn");
btn.attachEvent("onclick",function(){
  alert(this===window);//true
})
// 添加多个元素的方法
var btn = document.getElementById("myBtn");
var handler=function (){
  alert("Hello World!")
}
var hello=function (){
  alert("hello");
}
btn.attachEvent("onclick",handler);
btn.attachEvent("onclick",hello);
// 执行顺序:多事件绑定，执行顺序是以倒序的方式执行的。
// hello
// Hello World!
```

### detachEvent()
```js
// 移除attachEvent添加的事件处理程序程序
var btn = document.getElementById("myBtn");
var handler = function () {
  alert('Clicked');
}
btn.attachEvent("onclick",handler);
btn.detachEvent("onclick",handler);
```

## 跨浏览器的事件处理程序

### addHandler()|removeHandler()
>这2个方法属于一个名叫EventUtil的对象<br/>
参数：要操作的元素 | 事件名称 | 事件处理接受程序
```js
// 解析：首先判断是否存在DOM2级方法，如果存在==>传入事件类型，事件处理程序函数，和第三个参数方法false（表示冒泡阶段），如果存在的是IE的方法，就采用第二种方法，为了兼容IE8及跟早的版本，此时的时间类型必须加上"on"前缀。最后一种是DOm0级方法，现代的浏览器，一般
var EventUtil={
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on" + type,handler);
    }else {
      element["on" + type] = handler;
    }
  },
  removeHandler:function(element,type,handler){
    if(element.removeEventListener){
      element.removeEventListener(element,type,false);
    }else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    }else{
      element["on"+type]=null;
    }
  }
}
```