---
layout: post
title:  "instanceof运算符"
date:   2017-03-02 09:42:00 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---

#### [原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
***

## 语法
```js
object instanceof constructor
```
>参数<br/>
1. object 要检测的对象.<br/>
2. constructor  某个构造函数

## 描述
>instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

```
// 定义构造函数
function C(){}
function D(){}

var o = new C();

// true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof C;

// false，因为 D.prototype不在o的原型链上
o instanceof D;

o instanceof Object; // true,因为Object.prototype.isPrototypeOf(o)返回true
C.prototype instanceof Object // true,同上

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

o instanceof C; // false,C.prototype指向了一个空对象,这个空对象不在o的原型链上.

D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true
```
>需要注意的是，如果表达式 obj instanceof Foo 返回true，则并不意味着该表达式会永远返回true，因为Foo.prototype属性的值有可能会改变，改变之后的值很有可能不存在于obj的原型链上，这时原表达式的值就会成为false。另外一种情况下，原表达式的值也会改变，就是改变对象obj的原型链的情况，虽然在目前的ES规范中，我们只能读取对象的原型而不能改变它，但借助于非标准的__proto__魔法属性，是可以实现的。比如执行obj.__proto__ = {}之后，obj instanceof Foo就会返回false了。

instanceof和多全局对象(多个frame或多个window之间的交互)
>在浏览器中，我们的脚本可能需要在多个窗口之间进行交互。多个窗口意味着多个全局环境，不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数。这可能会引发一些问题。比如，表达式 [] instanceof window.frames[0].Array 会返回false，因为 Array.prototype !== window.frames[0].Array.prototype，因此你必须使用 Array.isArray(myObj) 或者 Object.prototype.toString.call(myObj) === "[object Array]"来判断myObj是否是数组。

## 例子
例子: 表明String对象和Date对象都属于Object类型
>下面的代码使用了instanceof来证明：String和Date对象同时也属于Object类型。

```
var simpleStr = "This is a simple string";
var myString  = new String();
var newStr    = new String("String created with constructor");
var myDate    = new Date();
var myObj     = {};

simpleStr instanceof String; // returns false, 检查原型链会找到 undefined
myString  instanceof String; // returns true
newStr    instanceof String; // returns true
myString  instanceof Object; // returns true

myObj instanceof Object;    // returns true, despite an undefined prototype
({})  instanceof Object;    // returns true, 同上

myString instanceof Date;   // returns false

myDate instanceof Date;     // returns true
myDate instanceof Object;   // returns true
myDate instanceof String;   // returns false
```
演示mycar属于Car类型的同时又属于Object类型
>下面的代码创建了一个类型Car，以及该类型的对象实例mycar. instanceof运算符表明了这个mycar对象既属于Car类型，又属于Object类型。

```
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Honda", "Accord", 1998);
var a = mycar instanceof Car;    // 返回 true
var b = mycar instanceof Object; // 返回 true
```
