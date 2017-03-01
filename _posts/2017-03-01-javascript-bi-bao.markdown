---
layout: post
title:  "写给初级JS程序员的JavaScript闭包(译)"
date:   2017-03-01 16:06:00 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---
[原文链接](http://web.archive.org/web/20080209105120/http:/blog.morrisjohns.com/javascript_closures_for_dummies)
# 闭包不是魔术
>这个页面解释了closures，以便程序员可以理解它们 - 使用有效的JavaScript代码。它不是用于古茹或功能程序员。
一旦核心概念被解构，闭包不难理解。然而，他们不可能通过阅读任何学术论文或面向学术的信息来了解他们！
本文主要面向有主流语言编程经验的程序员，他们可以阅读以下JavaScript函数：
```js
function sayHello(name) {
  var text = 'Hello ' + name;
  var say = function() { console.log(text); }
  say();
}
sayHello('Joe');
```

### 闭包的实例
>两句话摘要：<br/>
##### &nbsp;&nbsp;&nbsp;&nbsp;.它是一个可以引用其范围内的变量（在第一次声明时），被赋值给变量，作为参数传递给函数或作为函数结果返回的表达式。<br/>
##### &nbsp;&nbsp;&nbsp;&nbsp;.闭包是一个堆栈框架，当函数开始执行时被分配，并且在函数返回之后不被释放（就好像“堆栈框架”在堆上分配而不是堆栈！）。<br/>

以下代码返回对函数的引用：
```js
function sayHello2(name) {
  var text = 'Hello ' + name; // Local variable
  var say = function() { console.log(text); }
  return say;
}
var say2 = sayHello2('Bob');
say2(); // logs "Hello Bob"
```
>大多数JavaScript程序员将会理解在上面的代码中如何将一个函数的引用返回给一个变量。如果你没有，那么你需要在你可以学习闭包。AC程序员会认为函数返回一个指向函数的指针，变量sayAlert和say2都是指向函数的指针。

>在指向函数的C指针和对函数的JavaScript引用之间存在关键的区别。在JavaScript中，您可以将函数引用变量看作具有指向函数的指针 以及指向闭包的隐藏指针。

>上面的代码有一个闭包，因为匿名函数function（）{alert（text）; } 在另一个函数中声明，在这个例子中为sayHello2（）。在JavaScript中，如果在另一个函数中使用function关键字，则要创建一个闭包。

>在C和大多数其他常用语言函数返回后，所有的局部变量不再可访问，因为堆栈帧被销毁。

>在JavaScript中，如果在另一个函数中声明一个函数，那么在从调用的函数返回后，局部变量仍然可以访问。这是上面演示的，因为我们调用函数say2（）; 之后我们从sayHello2（）返回。请注意，我们调用的代码引用变量text，它是函数sayHello2（）的局部变量。

```js
function() { console.log(text); } // Output of say2.toString();
```
>看看输出say2.toString()，我们可以看到代码引用的变量text。匿名函数可以引用text保存值的值'Hello Bob'，因为局部变量sayHello2()保存在闭包中。

>神奇的是，在JavaScript中，函数引用还具有对其创建的闭包的秘密引用 - 类似于如何委托是方法指针加上对对象的秘密引用。

***

# 更多例子
出于某种原因，当你阅读关于它们的闭包似乎真的很难理解，但当你看到一些例子，你可以点击他们的工作（它花了我一段时间）。我建议仔细阅读示例，直到你了解它们如何工作。如果你开始使用闭包没有完全了解它们如何工作，你很快就会创建一些非常古怪的错误！
### 例3
>此示例显示不复制局部变量 - 它们通过引用保留。它是一种像在外部函数退出时在内存中保留一个堆栈框架！

```js
function say667() {
  // Local variable that ends up within closure
  var num = 42;
  var say = function() { console.log(num); }
  num++;
  return say;
}
var sayNumber = say667();
sayNumber(); // logs 43
```

### 例4
>所有三个全局函数具有对同一闭包的公共引用，因为它们都在单个调用中声明setupSomeGlobals()。<br>

```js
var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
  // Local variable that ends up within closure
  var num = 42;
  // Store some references to functions as global variables
  gLogNumber = function() { console.log(num); }
  gIncreaseNumber = function() { num++; }
  gSetNumber = function(x) { num = x; }
}

setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();
gLogNumber(); // 42

oldLog() // 5
```
>这三个函数具有对同一闭包的共享访问 - setupSomeGlobals()当定义三个函数时的局部变量。<br/>
>注意，在上面的例子中，如果setupSomeGlobals()再次调用，则创建一个新的闭包（stack-frame！）。老gLogNumber，gIncreaseNumber，gSetNumber变量将覆盖新的具有新功能关闭。（在JavaScript中，当你声明另一个函数内的函数，里面的功能（s）是/再次重新创建每个外部函数被调用时）。

### 例5
>这是一个真正的困扰，许多人，所以你需要了解它。要非常小心，如果你在一个循环中定义一个函数：从闭包的局部变量不会像你可能会想的那样。

```js
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        result.push( function() {console.log(item + ' ' + list[i])} );
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    // Using j only to help prevent confusion -- could use i.
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

 testList() //logs "item2 undefined" 3 times
 ```
>line result.push（function（）{console.log（item +''+ list [i]）}在结果数组中添加一个对匿名函数的引用三次。如果你不熟悉匿名函数， 就如：

```js
pointer = function() {console.log(item + ' ' + list[i])};
result.push(pointer);
```
>注意，当运行示例时，“item2 undefined”会提醒三次！ 这是因为就像前面的例子一样，buildList的局部变量只有一个闭包。 当在fnlist [j]（）上调用匿名函数时; 它们都使用相同的单个闭包，并且它们使用该闭包内的i和项的当前值（其中i具有值3，因为循环已完成，并且项具有值'item2'）。 注意，我们从0索引，因此项目的值为item2。 并且i ++将i增加到值3。

### 例6
>此示例显示，闭包包含在退出前在外部函数中声明的任何局部变量。 注意，变量alice实际上是在匿名函数之后声明的。 匿名函数首先声明; 并且当调用该函数时，它可以访问alice变量，因为alice在同一范围内（JavaScript变量提升）。 另外sayAlice（）（）只是直接调用从sayAlice（）返回的函数引用 - 它完全与以前做过的相同，但没有临时变量。

```js
function sayAlice() {
    var say = function() { console.log(alice); }
    // Local variable that ends up within closure
    var alice = 'Hello Alice';
    return say;
}
sayAlice()();// logs "Hello Alice"
```
>Tricky：还要注意，say变量也在闭包内，并且可以被可能被声明的任何其他函数访问sayAlice()，或者它可以在内部函数内被递归地访问。

### 例7
>最后一个例子显示每个调用为局部变量创建一个单独的闭包。 每个函数声明没有单个闭包。 每个函数的调用都有一个闭包。

```js
function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1,2,3];
    var ref = someRef;
    return function(x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            '; anArray: ' + anArray.toString() +
            '; ref.someVar: ' + ref.someVar + ';');
      }
}
obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;
```

***
## 概要
>如果一切似乎完全不清楚，那么最好的办法是玩的例子。阅读解释比理解示例困难得多。我对闭包和堆栈框架等的解释在技术上是不正确的 - 它们是用于帮助理解的粗略简化。一旦基本的想法是grokked，你可以提取细节后。

## 总结:
>1.当你function在另一个函数里面使用时，使用闭包。

>2.每当在函数中使用eval（）时，都会使用闭包。 eval的文本可以引用函数的局部变量，在eval中甚至可以使用eval（'var foo = ...'）创建新的局部变量

>3.当在函数中使用新的Function（...）（Function构造函数）时，它不会创建闭包。 （新函数不能引用外层函数的局部变量。）

>4.JavaScript中的闭包就像保留所有局部变量的副本，就像函数退出时一样。

>5.最好是认为闭包始终只创建一个函数的入口，局部变量将添加到闭包中。

>6.每次调用具有闭包的函数时，都会保存一组新的局部变量（假定函数在其中包含函数声明，并且对该函数的引用要么返回，要么以某种方式保留外部引用 ）。

>7.两个函数可能看起来像它们具有相同的源文本，但是具有完全不同的行为，因为它们的“隐藏”闭包。 我不认为JavaScript代码实际上可以找出一个函数引用是否有闭包。

>8.如果你试图做任何动态源代码修改（例如：myFunction = Function（myFunction.toString（）。replace（/ Hello /，'Hola'））;），如果myFunction是一个闭包 当然，你永远不会想到在运行时做源代码字符串替换，但...）。

>9.可以在函数内的函数声明中获得函数声明 - 你可以在多个级别获得闭包。

>10.我认为通常闭包是函数和捕获的变量的术语。 注意，我在本文中不使用这个定义！

>11.我怀疑JavaScript中的闭包不同于通常在函数式语言中发现的闭包。

## 链接:
>1.Douglas Crockford的模拟[私有属性和一个对象的私有方法](http://www.crockford.com/javascript/private.html)，使用闭包。

>2.一个伟大的解释如何闭包可以导致[内存泄漏在IE](https://www.codeproject.com/Articles/12231/Memory-Leakage-in-Internet-Explorer-revisited)如果你不小心。

## 感谢
>如果你刚刚学到了闭包（在这里或其他地方！），那么我有兴趣任何反馈从您的任何更改，你可能建议，可以使本文更清楚。 发送电子邮件至morrisjohns.com（morris_closure @）。 请注意，我不是JavaScript的上师 - 也不是关闭。
