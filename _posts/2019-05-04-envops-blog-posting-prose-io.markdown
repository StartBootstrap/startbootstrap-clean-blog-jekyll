---
layout: post
title:  "[Jekyll Blog] Prose.io 연동으로 포스팅을 쉽게! 배포는 더 쉽게!"
subtitle:   "Prose.io"
categories: envops
tags: envops blog github pages jekyll prose io markdown editor
comments: true
---


## 개요
> `Prose.io`와 Github Pages를 연동하여 `더 쉽게 수정하고 배포하는` 방법을 알려드립니다.  
  
- 목차
	- [Prose.io란?](#proseio란) 
	- [Prose.io 회원가입 및 Github 연동](#proseio-회원가입-및-git-연동)
	- [Prose.io로 포스트 수정하기](#proseio로-포스트-수정하기)
  

## Prose.io란?
---
Jekyll과 Git을 사용하면서 디자인에 집중하거나 웹 프로그래밍의 기능에 집중하거나 배포 시 SFTP 등을 이용하여 변경된 파일을 일일이 기억하고 하나씩 클릭하여 업로드하는 글쓰기에 집중되지 않는 혹은 반복적이고 불편한 작업에서 크게 해방되었다.  

이 정도 수준이면 충분히 만족할 만 하지만 사람은 더 편한 환경을 찾기 마련이다. 낯선 장소에서 블로그를 수정할 일이 생긴다면 Git을 설치하고 Clone 명령어를 수행하고 다시 Commit, Push하는 작업을 피할 수는 없기 때문이다. 

게다가 수정하고 싶은 부분이 아주 작은 부분일 때 더욱 그렇다. 글을 수정하는데 걸리는 시간은 겨우 10초 정도인데, 환경을 구성하고 배포를 위한 시간이 5분이 걸린다면 능률이 떨어질 수 밖에 없다. 이런 불편함을 해결하고 싶다면? 

답은 [`Prose.io`](http://prose.io/)다. 분명 Jekyll 기반의 정적 컴파일을 해야 HTML로 변환이 될텐데 신기하게도 FTP 또는 DB에 직접 붙어서 글을 수정하는 것 같은 느낌을 받게된다. 연동도 매우 간단하다. 백번 설명하는 것보다 직접 연동하여 사용해보자.
  
> __Prose.io__ ?  
> Prose provides a beautifully simple content authoring environment for CMS-free websites. 
> It's a web-based interface for managing content on GitHub.
  

## Prose.io 회원가입 및 Github 연동
---
1. Github에 로그인 후, [`Prose.io`](http://prose.io/)에 접속하자. `AUTHORIZE ON GITHUB` 버튼을 클릭하면, Prose라는 써드파티 App이 Github으로의 접근권한을 요청하는 화면으로 이동하게 된다. 
![그림1](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-1.jpg)
  
2. `Authorize prose`를 클릭하여 Prose의 Github 접근을 허용해준다.
![그림2](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-2.jpg)
  
3. 패스워드를 입력한 후, `Confirm password`를 클릭한다.
![그림3](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-3.jpg)
  
Git의 Project들이 전부 연동된 것을 확인할 수 있다. 이것으로 연동이 끝났다! 
![그림참쉽죠](https://theorydb.github.io/assets/img/fun/bob-rose.jpg)
참~ 쉽죠?
  

## Prose.io로 포스트 수정하기
---
연동을 완료하였으니, 테스트로 포스트 하나를 간단히 수정해보자.  

1. 아래 그림과 같이 블로그 Project 우측의 `View Project`를 클릭한다.  
![그림4](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-4.jpg)
  
2. 블로그 글들이 담긴 폴더를 클릭한다.(Jekyll은 대부분 `_posts`폴더에 작성한 글들이 모여있다.)
![그림5](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-5.jpg)
  
3. 아무글이나 하나 선택하여 `Edit` 버튼을 클릭하면, markdown 편집기가 열려 글을 수정할 수 있다. 
![그림6](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-6.jpg)
  
4. `미리보기`(눈 모양) 버튼을 클릭하면 미리보기로 중간 중간 수정이 잘 되고 있는지 확인할 수 있다. (필자의 경우 개요 맨 뒤에 `느낌표` 하나를 추가해보았다. 미리보기로도 잘 보여진다.)
![그림7](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-7.jpg)
  
5. 수정이 완료되면 아래 그림과 같이 `저장`버튼을 누른다. 저장이 완료되면 `COMMIT` 버튼을 눌러 배포한다.
> * 수정내역 알림 : 수정 전,후 변경된 부분을 하이라이트로 알려준다.
> * 권장사항 반영 : markdown 권장 문법에 어긋나게 작성한 것은 자동으로 보정해준다.   
![그림8](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-8.jpg)
  
6. 블로그에 접속하면 수정한 사항이 정상적으로 반영된 것을 확인할 수 있다.
![그림9](https://theorydb.github.io/assets/img/envops/2019-07-04-envops-blog-posting-prose-io-9.jpg)
  

이제 Prose를 이용하여 어디서든 쉽게 블로그의 글을 수정할 수 있게 되었다. 관련 Eco 환경이 점점 좋아지고 있기 때문에 굳이 프로그래머가 아니더라도 누구든 쉽게 Jekyll 기반의 블로그를 운영할 수 있는 세상이 되어가고 있다. 프로그래머와 거리가 먼 분일지라도 필자의 블로그와 구글 검색을 통해 도전해시길 추천드린다.   
 