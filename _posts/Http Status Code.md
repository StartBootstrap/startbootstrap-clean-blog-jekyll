---
layout:     post
title:      "Http Status Code"
date:       2017-07-20 17:00:00
author:     "신윤기"
header-img: "img/post-bg-02.jpg"
---

# "Http Status Code #


지정 record가 없는 경우 500오류가 되어서는 안 된다!

제목에 링크 걸기
```python
{% for post in post_list %}
    <ul>
        {{ post.id }}
        <a href="/blog/{{ post.id }}/">
        {{ post.title }}
        </a>
    </ul>

{% endfor %}
```
이렇게 지정하고

```python
#blog/urls.py
url(r'^(?P<id>\d+)/$', views.post_detail)
```
이렇게 해놓으면
post.id를 설정하면 view.post_detail로 링크가 연결이 된다.