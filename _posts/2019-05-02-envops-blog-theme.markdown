---
layout: post
title:  "[Jekyll Blog] 블로그 테마(Themes) 고르기 및 환경설정 "
subtitle:   "Choose and customize Themes"
categories: envops
tags: envops blog github pages jekyll themes personal preferences 
comments: true
---


## 개요
> 블로그 구축의 첫 관문. `테마`를 고르고 `GitHub 저장소`에 등록하기 위한 사전 지식에 대하여 알아봅니다.  

- 목차
	- [Jekyll Themes 고르기](#jekyll-themes-고르기)
	- [`Clean Blog` 테마를 선택한 이유](#clean-blog-테마를-선택한-이유)
  
## Jekyll Themes 고르기   
---
이전글 [(개요) 블로그를 만들어 봅시다!](https://theorydb.github.io/envops/2019/05/01/envops-blog-intro/)에서 Jekyll 블로그를 선택한 이유를 말씀드렸다. 여기까지 읽고 계시다면 이미 Jekyll 블로그를 구축하는데 관심이 있는 독자일 것이다. 그렇다면 Jekyll 테마에는 어떤 것들이 있으며 선정하는 기준에 대해서 언급해 보겠다.

* __Jekyll Themes 제공 사이트__  
  대부분의 오픈소스 개발자들이 그러하듯 지킬 역시 많은 양의 테마를 오픈 소스로 제공하고 있다. 아래 사이트에 접속하시면 무료로 제공되는 테마를 원없이 구경하고 선택하실 수 있다. 오히려 많아서 선택하기 어려울 지경이다. 
  + <http://jekyllthemes.org/>  
  + <https://jekyllthemes.io/free>
  + <http://themes.jekyllrc.org/>
  + <https://github.com/topics/jekyll-theme>
![그림1](https://theorydb.github.io/assets/img/envops/2019-05-02-envops-blog-theme-1.jpg)
  
* __Jekyll Themes의 선정기준__  
  아래 기준에서 반드시 포함시킬 요소를 미리 염두에 둔다면 위 사이트에서 테마를 고르기 더 쉬워질 것이다.
  + 모바일에서도 보기 편한 `반응형`인가?
  + `한글 폰트` 가독성이 좋은가?
  + `커스터마이징`하기 쉬운 구조인가?
  + 레이아웃, 줄간격 등 `디자인` 요소가 마음에 드는가?
  + 검색, 태그, 댓글, syntax highlighting, Summary, Google Analytics, 수식입력 등 `기능` 지원 여부
  

## `Clean Blog` 테마를 선택한 이유  
---
필자가 선정한 테마는 [`Clean Blog`](https://blackrockdigital.github.io/startbootstrap-clean-blog/)이다. 이유는 다음과 같다.

* 깔끔한 디자인으로 `Simple is best` 철학이 돋보임
* 반응형 지원으로 모바일 가독성에도 손색이 없음
* 한글 폰트가 다른테마 대비 마음에 듬
* 커스터마이징이 편리함
  
혹시 필자가 선정한 블로그가 크게 마음에 들지 않으신다면 아래 후보군을 참고하시기 바란다. 필자도 아래 후보군들이 꽤 마음에 들어서 많은 고민을 했다. 필자에게는 낙점되지 못 했지만 독자분들께는 더 마음에 드실지도 모른다. 

* __후보군__ 
  + Clean Blog : <https://blackrockdigital.github.io/startbootstrap-clean-blog/>  
  + folio : <http://bogoli.github.io/-folio/>
  + Hydejack : <https://hydejack.com/blog/>
  + EXAMPLE POST : <http://the-development.github.io/flex/>
  + Read Only : <https://html5up.net/read-only>
  + Mediator : <https://blog.base68.com/>
  + Skinny Bones : <https://mmistakes.github.io/skinny-bones-jekyll/>
  + lanyon : <https://github.com/poole/lanyon>

맘에드는 테마를 선택하셨다면 다음글[GitHub 연동 및 Jekyll 설치](https://theorydb.github.io/envops/2019/05/03/envops-blog-github-pages-jekyll/)에서 GitHub 연동 및 Jekyll 설치를 통해 웹서버에서 실행하는 방법을 배워보겠다. 


