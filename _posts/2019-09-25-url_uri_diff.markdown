---
layout: post
title: URL과 URI
subtitle: URL과 URI의 개념 그리고 차이를 알아보자
date: 2019-09-19 00:00:00 +0300
description: # Add post description (optional)
tags: [web] # add tag
categories: [WEB] # add categories
---

### URI
- 인터넷에 있는 자원을 나타내는 유일한 주소이다
- URI는 자원을 식별한다(locator). 그것은 구문에 의한 URI 계획, 권한, 경로, 쿼리 및 파편을 포함한다. 예를 들어 http:는 URI 체계다.

### URL
- 네트워크 상에서 자원이 어디 있는지를 알려주기 위한 규약이다.
- URL(Uniform Resource Locator)이라는 용어는 URI의 서브셋을 말하며, 자원을 식별하는 것 외에 일차 액세스 메커니즘(예: 해당 네트워크 "위치")을 설명함으로써 자원을 찾는 수단을 제공한다.<br>

### URN
- URN(Uniform Resource Name) 이라는 용어는 해당 위치와 무관한 리소스를 식별하는 데 사용된다. 예제 난:ISBN:1-23-432536-5<br>

### URI와 URL 간의 차이점 요약

- URI는 URL이거나 URN이다.<br>
- URL은 URI의 하위집합이다. URI 계획 중 하나를 사용하여 리소스를 식별한다.<br>
- URN은 URI의 하위집합이다. 그것은 그것의 위치와 무관한 자원을 식별한다.<br>

어떤 것이 URL인지 URI인지 의심스러울 때마다 URI를 단어로 사용하여 식별하십시오. URI가 슈퍼세트니까.<br>

* * *

위 설명 정도가 깔끔한 것 같다. 다른 예제들은 의심이 많이 가는 부분이 있다.(파일 위치로 URL 구분하는 등..) 추가 정리를 해보자면

URI는 어떤 자원에 접근하기 위한 식별자로 쓰인다. URI의 하위개념으로 URL, URN이 있고 예를 들면 아래와 같다. 
- 자원에 접근하기 위해 사용되는 절차
- 어떤 자원을 가지고 있는 특정한 컴퓨터
- 컴퓨터 상의 특정 자원의 이름(파일의 이름)

그 중에 가장 보편적인 방법 중 하나는 URL 이고..<br>
URL은 해당 자원의 또렷한 주소이다. 그 문법은 해당 URL에 맞는 프로토콜을 알고 그와 동일한 프로토콜로 접속해야 한다.(ftp, http, telnet 등)<br>

참고자료:  https://javapapers.com/servlet/uri-and-url-difference/, https://uroa.tistory.com/20


