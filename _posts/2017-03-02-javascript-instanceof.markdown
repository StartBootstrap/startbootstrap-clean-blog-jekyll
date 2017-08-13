---
layout: post
title:  "instanceof运算符在数组中的使用"
date:   2017-03-02 09:42:00 +0800
categories: jekyll update
header-img: "http://oigzh9iic.bkt.clouddn.com/contact-bg.jpg"
---

确定一个对象在全局中是否为数组
```js
var colors=['aa','bb','cc'];//创建包含三个字符串的数组
if (colors instanceof Array){
			alert(1)
}else {
			alert(0)
}
//最后输出 1，说明该对象为数组
```
