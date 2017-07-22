---
layout:     post
title:      "URLConf and Regular Expression"
date:       2017-07-18 17:00:00
author:     "신윤기"
header-img: "img/post-bg-02.jpg"
---

# Url Conf
setting.py에 가면 root_urlconf
이것을 최상위 url
sub url은 include로 표현
urlpatterns라는 리스트 항상 있어야 함

url conf에서는 url 매칭하고 그 매칭된 url과 매칭되는 함수를 매칭
(?P)


# 앱 만들면 해야할 것
1. settings.py에 등록
2. urls.py 만들기
3. 최상위 url에 앱 url 적어놓기


# view 함수 설정
1. 모든 view 함수는 request를 첫 번째 인자로 받는다(사용자가 넘겨준 Data )





