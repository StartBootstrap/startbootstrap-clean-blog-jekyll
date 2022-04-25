---
layout: post
title:  "[Jekyll Blog] 구글 애드센스(Google Adsense) 적용하기"
subtitle:   "How to register Google Adsense"
categories: envops
tags: envops blog github pages jekyll google adsense 
comments: true
---


## 개요
> 블로그에 `구글 애드센스(Google Adsense)`를 등록하는 방법에 대해서 알아봅니다.  
  
- 목차
	- [구글 애드센스(Google Adsense)란?](#구글-애드센스google-adsense란)
	- [애드센스 가입](#애드센스-가입)
	- [애드센스 소스코드 적용](#애드센스-소스코드-적용)  
	- [승인 후 절차](#승인-후-절차)
  
  
## 구글 애드센스(Google Adsense)란? 
---
구글 애드센스(Google Adsense)란 구글의 `수익형 광고 플랫폼`으로 웹사이트 및 블로그 등을 운영하는 사람이라면 누구나 애드센스에 가입하여 광고 수익을 구글과 나눌 수 있다. 

반대로 애드워즈의 경우 광고주를 위한 플랫폼으로 광고 게재를 의뢰하고 구글측에 광고비를 지급한다. 비슷한 플랫폼으로는 `Naver의 애드포스트, MS의 애드센터, Yahoo의 퍼블리셔 네트워크` 등이 있다.

구글 애드센스는 신청 후 승인이 되어야 운영이 가능하므로, 가급적이면 블로그 개설 직후 바로 신청하지 말고 몇개월 정도 포스팅을 꾸준히 등록하고 구글 애널리틱스 등을 통해 유입 정도를 파악한 후 신청하는 것이 좋다. 한가지 유념할 것은 승인 후 `본인 블로그의 광고를 본인이 클릭하게 되면 이용정지`를 당할 수 있기 때문에 주의해야 한다.

본 포스팅에서는 애드센스와의 기술적인 연동만을 다루므로 수익성, 장단점, 유의사항 등은 다루지 않는다. 필요시, 아래 링크를 참고하시기 바란다.
* [애드센스 - 나무위키](https://namu.wiki/w/%EC%95%A0%EB%93%9C%EC%84%BC%EC%8A%A4)
* [구글 애드센스 승인과정과 광고넣기 - 휴식같은 여행으로의 초대](https://invitetour.tistory.com/38)
* ["구글 애드센스 정지 후 30일만에 해제됐네요." - 휴식같은 여행으로의 초대](https://invitetour.tistory.com/128)
* [Average Cost per Click by Country: Where in the World Are the Highest CPCs? - WordStream](https://www.wordstream.com/blog/ws/2015/07/06/average-cost-per-click)
* [구글 애드센스로 돈벌기 쉽지 않은 이유 - 찌소 주식차트분석](https://jjisso.tistory.com/317)

## 애드센스 가입
---
+ 아래 그림과 같이 [Goodle Adesense](https://www.google.com/adsense/)에 접속하여 `시작하기`를 클릭한다.
  ![그림1](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-1.png)
+ 광고를 게재할 `웹사이트 주소, 이메일 주소` 등의 정보를 입력한다.
  ![그림2](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-2.png)
+ `국가`를 선택 후, `이용약관`에 동의한다.
  ![그림3](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-3.png)
+ 수익금을 받기 위한 절차로 `결제 프로필`을 등록한다. 주소 및 연락처 등의 개인정보를 입력한다.
  ![그림4](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-4.png)

## 애드센스 소스코드 적용
---
* 가입 마무리 단계 즈음, 아래 그림과 같이 구글 애드센스 소스 코드를 웹사이트에 `적용`하라는 안내 메시지가 나온다. 
  ![그림5](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-5.png)
  여기서 `data-ad-client` 부분에 명시된 ca-pub로 시작되는 값이 본인의 애드센스 id가 된다. 

* 소스 코드를 웹사이트에 적용하는 방법은 웹사이트 및 블로그 운영방식에 따라 천차만별이다. 일반적으로 위 그림에 안내된 바와 같이 메인 페이지의 <head>태그 사이에 코드를 붙여넣으면 되는데, 워드프레스 사용자의 경우 별도 안내방법이 소개되어 있다. 다만 네이버, 티스토리 등 개인이 소스코드를 직접 관리하지 않는 경우 해당 블로그 메뉴얼을 찾아보거나 구글링을 통해 적용방법을 별도로 찾아야한다. 본 포스팅에서는 Jekyll 기반의 블로그에 적용하는 방법만을 다루며 필자의 블로그를 예시로 적용해 보겠다.

* 먼저 본 블로그의 경우 아래 그림과 같이 `_includes` 폴더 아래에 `post.html, right-side.html, contents.html` 총 3개의 파일에 구글 애드센스를 연동할 수 있는 페이지가 이미 구성되어있다. 
  ![그림8](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-8.png)

* 해당 파일 3개를 열어 `data-ad-client` 속성값을 아래 그림과 같이 위에서 본인이 부여받은 애드센스 id로 입력해준다. 각 파일별로 수정해야 할 부분이 2군데 존재한다.
  ![그림9](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-9.png)
  ![그림10](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-10.png)
  ![그림11](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-11.png)

* 다시 위의 화면으로 돌아가 `코드를 사이트에 붙여넣었습니다.` 부분에 체크한 후, 완료 버튼을 누르면 아래와 같은 메시지를 볼 수 있다.
  ![그림6](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-6.png)
  ![그림7](https://theorydb.github.io/assets/img/envops/2020-04-20-envops-blog-how-to-register-google-adsense-7.png)

* 승인이 완료될 때까지 기다린다. 일반적으로 승인에는 1일 ~ 14일 정도 소요되며 승인될 경우 위에서 신청했던 이메일로 축하 메일이 도착한다.

## 승인 후 절차
---
* 승인이 완료되면 `Congrats!` 메일이 도착한다. `Get started` 버튼을 클릭한다.

* 광고 선택 등 원하는 옵션을 설정하면 블로그에 광고가 게재되는 것을 확인할 수 있다.

* 블로그에 광고가 나오지 않거나 광고의 위치 및 종료 등을 바꾸고 싶을 경우 위 `애드센스 소스코드 적용` 항목의 3개 파일들을 본인이 원하는 형태로 조정해주면 된다. 

* 그 외 광고 코드를 수정하고 싶거나 디스플레이 광고 단위를 변경하는 등의 세부 조정을 원할 경우 아래 AdSense 고객센터의 매뉴얼을 참고하기 바란다.
  + [반응형 광고 코드 수정 방법](https://support.google.com/adsense/answer/9183363?hl=ko)
  + [디스플레이 광고 단위 만들기](https://support.google.com/adsense/answer/9274025?visit_id=637229849626433504-2364562223&rd=1)

> 필자의 경우 본 포스팅을 작성하는 시점에 애드센스를 신청하였기에 승인되는대로 포스팅을 업데이트 할 예정이다. 


