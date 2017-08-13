---
layout: post
title:  "原生Ajax学习笔记"
date:   2017-02-26 17:15:00 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---

## 示例
> 这里先展示一个比较复杂的应用写法，原理什么的看下面介绍。<br/>
> 注意，本例是学习笔记，[学习地址](http://www.imooc.com/learn/250)<br/>
>[源码](http://img.mukewang.com/down/54f903090001276f00000000.zip)

```js
document.getElementById("save").onclick = function() {
  var request = new XMLHttpRequest();
  request.open("POST", "server.php");
  var data = "name=" + document.getElementById("staffName").value
                      + "&number=" + document.getElementById("staffNumber").value
                      + "&sex=" + document.getElementById("staffSex").value
                      + "&job=" + document.getElementById("staffJob").value;
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.send(data);
  request.onreadystatechange = function() {
    if (request.readyState===4) {
            if (request.status===200) {
                document.getElementById("createResult").innerHTML = request.responseText;
            } else {
                alert("发生错误：" + request.status);
            }
        }
    }
}
```
# Ajax
>其实原理很简单的。就是调用 XMLHttpRequest 对象来实现前端与后台的数据通信！

#### 第一步：实例化 XMLHttpRequest 对象
```js
var request = new XMLHttpRequest();
```

#### 第二步：调用 open() 方法
>open(Method[数据传输方法: POST \| GET ], URL , async[true（异步）\| false（同步）] );

```js
request.open("GET", "server.php?number=" + document.getElementById("keyword").value);
```

#### 第三步：调用 setRequestHeader
>这里已经有人把 setRequestHeader 内容很详细的介绍一遍了，这里就不做太多的解释。[传送门](https://sjolzy.cn/XMLHTTP-methods-and-parameters-in-the-setRequestHeader.html)

```js
request.open("GET", "server.php?number=" + document.getElementById("keyword").value);
```

#### 第四步：调用 send() 方法
> send方法接受一个参数，作为请求主体发送的数据。<br/>
##### 注意:如果没有参数，则必须填写 null<br/>
request.send(参数\|null)
##### 由于send的请求是同步的，请求得到服务器响应之后。响应的数据会自动填充XHR对象的属性
```js
console.log(request.responseText);//响应主体被返回的文本
console.log(request.responseXML);//与 responseText 以字符串返回 HTTP 响应不同，responseXML 以 XML 返回响应。ResponseXML 属性返回 XML 文档对象，可使用 W3C DOM 节点树的方法和属性来检查和解析该对象。
```
##### request.status
>[Ajax status和statusText状态对照表](http://www.itxueyuan.org/view/6454.html)<br/>
>0：未初始化。尚未调用open()方法。<br/>
>1：启动。已调用open()方法,但尚未调用send()方法。<br/>
>2：发生。已调用send()方法，但尚未接收到响应。<br/>
>3：接受。已经接收到部分响应数据。<br/>
>4：完成。已经接收到响应数据，并且可以在客户端使用。<br/>
```js
console.log(request.status);//响应的HTTP状态
console.log(request.statusText);//HTTP状态的说明
```

#### 第五步：调用 onreadystatechange 事件处理程序
>##### request.onreadystatechange<br/>
&nbsp;&nbsp;&nbsp;&nbsp;当请求被发送到服务器时，我们需要执行一些基于响应的任务。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;每当 readyState 改变时，就会触发 onreadystatechange 事件。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;readyState 属性存有 XMLHttpRequest 的状态信息。<br/>
如下所示：我们通过if语句判断 request.readyState 的响应数据，进行数据处理。

```js
request.onreadystatechange = function () {
  if (request.readyState === 4) {
    console.log(request.readyState);
      if (request.status === 200) {
        document.getElementById("createResult").innerHTML = request.responseText;
      } else {
        alert("发生错误：" + request.status);
    }
  }
}
```

#### 第六步：待补充