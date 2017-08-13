---
layout: post
title:  "js闭包"
date:   2017-03-01 10:03:00 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---
[原文链接](http://www.cnblogs.com/frankfang/archive/2011/08/03/2125663.html)

### 下面是一个简单的闭包
```js
function foo(x) {
    var tmp = 3;
    function bar(y) {
        alert(x + y + (++tmp));
    }
    bar(10);
}
foo(2)
```

### 概念
>闭包就是能够读取其他函数内部变量的函数。也可以理解成：定义再一个函数内部的函数。

### 作用
>理解函数内部与外部的桥梁

### 用途
>1.可以读取函数内部的变量。<br/>
 2.让这些变量始终保持在内存中。

### 实例+分析
>简单来说 getNameFunc() 是一个闭包函数，<br/>
我们在 对象 Object 中，定义了它。<br/>
接着定义了 var that=this;<br/>
并且在 getNameFunc() 里面，return 一个匿名函数，<br/>
return 返回 that.name 和 this.name;<br/>
这个时候发现 that.name; ==>"My Object";<br/>
为什么这个时候 this.name 的值是 "My Object" 而不是"The Window"。<br/>
this.name 这个时候，表示的是内部对象 Object 中定义的 name 的值。<br/>
这个name的值，初始是 "My Object" ，但是在 Object.getNameFunc() 运行之后，<br/>
this 就不在表示 Object ，而是指代全局了。<br/>
那么这样子的话.不论我们如何去定义 this.name 的值。<br/>
全局中，var name = "The Window"; 被定义了。<br/>
我们这个时候 去输出 this.name 的话.结果都是 "The Window"。<br/>
那么为什么在 Object.getNameFunc() 函数运作之后，this 就表示全局了呢？<br/>
getNameFunc();是一个闭包函数。当我们运行它的时候。它被赋予全局变量<br/>
它就被存入到内存中。

```js
var name = "The Window";
var object = {
  name : "My Object",
  getNameFunc : function(){
    var that=this;
    return function(){
      return 'that:'+that.name+';this:'+this.name;
    };
  }
};
console.log(object.getNameFunc()());//that:My Object;this:The Window
```
从技术上来讲，在JS中，每个function都是闭包，因为它总是能访问在它外部定义的数据。
