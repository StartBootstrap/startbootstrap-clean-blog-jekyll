---
layout:     post
title:      "Django 처음 시작 하기"
date:       2017-07-17 17:00:00
author:     "신윤기"
header-img: "img/post-bg-02.jpg"
---

# Django 처음 프로젝트를 만들어 봄

python manage.py --help 치면 안내 나옴

그 중에 startapp 명령어를 통해 startapp blog를 만든다

blog 디렉토리 생성됨


## 앱을 프로젝트에 등록
상위 디렉토리의 settings파일에서 installed app에 등록

    #askdjango/settings.py  
    INSTALLED_APPS = [  
        'django.contrib.admin',  
        'django.contrib.auth',  
        'django.contrib.contenttypes',  
        'django.contrib.sessions',  
        'django.contrib.messages',  
        'django.contrib.staticfiles',  
        'blog',  
    ]
Tip: blog 등록하고 , 꼭 쓸 것(나중에 다른 앱 등록 시에 오류 나지 않도록 해줌)

## views 파일에 들어가서 함수 정의해줄 것

## urls 파일 만들기
1. django.conf.urls 에서 import url할 것
2. views import 할 것

## urls을 연결시킬 것(askdjango/urls)
1. include를 만들 것
2. url blog를 설정

##blog 밑에 template/blog 만들고 template 파일 만들기

Tip: templates이 반영 안 되면 서버 다시 띄우기












