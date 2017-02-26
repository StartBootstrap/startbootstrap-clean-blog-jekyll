---
layout: post
title:  "原生Ajax学习笔记"
date:   2017-02-26 17:15:00 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---

# 示例
> 这里先展示实际使用方式，原理什么的以后再说了。

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