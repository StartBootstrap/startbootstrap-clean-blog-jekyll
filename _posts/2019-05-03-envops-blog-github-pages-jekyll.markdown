---
layout: post
title:  "[Jekyll Blog] GitHub 연동 및 Jekyll 설치"
subtitle:   "Installing GitHub and Jekyll"
categories: envops
tags: envops github pages blog jekyll install push
comments: true
---


## 개요
> 앞서 선정한 테마를 `GitHub에 연동`하고 `Jekyll을 설치`하여 웹브라우저에 직접 블로그를 띄워봅시다.
  
- 목차
	- [GitHub 회원가입 및 Fork](#github-회원가입-및-fork)
	- [Git 설치 및 Clone](#git-설치-및-clone)
	- [Ruby & Jekyll 설치](#ruby--jekyll-설치)
	- [Jekyll 디렉토리 구조](#jekyll-디렉토리-구조)
	- [파일 수정하기](#파일-수정하기)
	- [GitHub에 올리기](#github에-올리기) 
  - [블로그 운영하기](#블로그-운영하기) 


## GitHub 회원가입 및 Fork
이전글 [블로그 테마(Themes) 고르기 및 환경설정](https://theorydb.github.io/envops/2019/05/02/envops-blog-theme/)에서 멋진 Jekyll 테마를 골랐다는 가정하에 GitHub으로 연동하는 과정을 설명하겠다.

* GitHub 회원가입
  먼저 GitHub <https://github.com/>에 접속 후 아래 그림과 같이 `Sign Up` 버튼을 클릭하여 회원가입을 진행한다.  
  ![그림1](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-1.jpg)
  Username, E-mail, Password 등 간단한 정보를 입력하면 계정이 생성된다.
  
> __사전체크__  
  다음으로 선택한 테마의 소스를 보관할 저장소를 GitHub에 만들어야 한다. 만드는 방법은 크게 2가지가 있다. 하나는 Fork 버튼을 클릭하는 방법이고, 다른 하나는 로그인 후 [Start a Project] 버튼을 클릭하여 직접 Repository를 생성하는 방법이 있다.   
  후자의 경우 _config.yml을 복사한 후 여러 단계를 거쳐야하므로 초보자에게는 복잡하고 어렵다. 따라서 여기서는 전자의 방법을 택한다. 더불어 각자 선택한 테마가 상이할 것이므로 공통으로 필자의 블로그를 Fork하는 방법으로 실습하겠다.  
  만약 초보자라면 필자가 운영중인 테마를 실습삼아 Fork 후 전 과정을 구축하며 미리 시뮬레이션 학습한 후에 선정한 테마를 동일한 방식으로 진행하시며 설치하시는 것을 권장한다.(이런 과정없이 처음부터 한번에 구축하기는 결코 쉽지않다.)
 
* Fork(Clone)을 통한 저장소(Repository) 생성
  필자의 테마 저장소<https://github.com/theorydb/theorydb.github.io>에 접속 후, 아래 그림과 같이 우측 상단의 `Fork` 버튼을 클릭한다.(또는 Clone을 통해 PC에 다운로드 후 Git 설치를 통해 Commit, Push로 올리는 방법도 있는데 여기서는 생략한다. 추후 별도의 포스팅을 통해 Git을 설치하고 사용하는 방법에 대해 설명하겠다. 현 시점에서 소개하기엔 분량이 과하여 집중력을 잃고 자칫 포스팅 전체의 큰 흐름을 잃을까 우려되기 때문이다.) 
  ![그림2](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-2.jpg)
  잠시 기다리면 여러분의 계정에 저장소가 생성되어 필자 블로그의 모든 파일들이 저장소 내에 Copy된 것을 확인할 수 있다.
> __(참고)Reporitory 직접 생성하는 방법__  
> https://github.com/theorydb > repository > new > repository name에 username.github.io 입력 > create repository 버튼을 클릭하면 생성된다.

* Repository name 변경 및 기타설정
  Fork가 완료된 저장소에서 아래 그림과 같이 `Settings`를 클릭하면 최상단에 `Repository name`이 나온다.
  ![그림3](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-3.jpg) 
  가급적 회원가입 시 사용했던 `username`을 이용하여 `username.github.io` 형식으로 저장할 것을 추천한다. 다른 명칭으로 저장할 경우 서브디텍토리가 포함된 보다 복잡한 URL로 접속해야하는 번거로움이 따른다.  

  그 외 동일페이지 하단으로 스크롤하여 내려가면서 Issues 체크, 브랜치는 Master로 설정할것을 권장한다.

* (Tip-생략가능) Fork한 저장소를 초기화(삭제)하고 싶은 경우 
  처음 저장소를 만든다면 실수 및 마음에 드는 형태로 전부 삭제 후 다시 만들고 싶은 경우가 종종 발생한다. 이럴땐 위 3번 과정과 동일한 페이지 맨 밑에 그림과 같은 `Danger Zone`이라는 빨간색으로 둘러쌓인 영역으로 이동한다. `Delete this repository`를 클릭 후 패스워드를 한번 더 입력하게 되면 지금까지 만든 저장소가 전부 삭제된다.
  ![그림4](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-4.jpg)  

* (Tip-생략가능) username이 마음에 안드는 경우
  위 3번 과정에서 URL이 마음에 들지 않아 username을 바꾸고 싶은 경우가 있다. 아래 그림과 같이 `우측상단 프로필 아이콘 클릭 > Settings > Account > Change username 버튼`을 클릭하면 변경 가능하다.
  ![그림5](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-5.jpg)

* 최초의 블로그를 웹브라우저로 접속
  Fork를 통해 아주쉽게 블로그를 완성하였다. 크롬, IE 등 웹브라우저 열어 위에서 설정한 본인의 URL주소 `username.github.io`에 접속하여 페이지가 잘 뜨는지 확인해보자.   

## Git 설치 및 Clone 
---
위 과정을 통해 비록 알맹이는 남의 블로그지만 껍데기만큼은 내 URL로 접속가능한 반쪽자리 블로그가 완성되었다. 당연히 누구도 이 상태로 블로그를 운영하고 싶진 않을 것이다. 다운받아 수정 후 업로드 하는 과정이 필요한데, 이를 위해서 먼저 PC에 Git을 설치해야 한다.

* Git설치
  Git 다운로드 링크 <https://git-scm.com/>에 접속하여 Download 메뉴를 클릭한다. 아래 그림과 같이 본인의 운영체제(OS)와 일치하는 아이콘을 클릭한 후, OS버전에 맞는 Git 설치파일을 다운로드 받아 설치한다.(필자의 경우는 Windows이다.) 
  ![그림6](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-6.jpg)
  설치과정은 별 어려움 없이 디폴트 환경 그대로 `Next` 버튼을 클릭하여 진행해준다.
  
* 위에서 Fork 한 저장소를 PC 내 다운로드 할 폴더를 만든다. 탐색기로 해당 폴더에 들어가 우클릭하면 `Git Bash Here`라는 추가된 메뉴가 보일것이다. 클릭하여 Git Bash창을 실행시킨다.

* Git 사용자 등록을 진행한다.  
```git
	git config --global user.name "사용자"
	git config --global user.email "사용자 이메일"
```  

* 저장소 PC에 Clone 
  위 과정에서 생성한 본인의 블로그 저장소에 접속하여 아래 그림과 같이 `Clone` 명령어를 복사한다.
  ![그림7](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-7.jpg)
  위에서 실행한 Git Bash 실행창에서 아래 그림과 같이 `git clone + [복사한 Clone 명령어]` 형태로 다음과 같이 붙여넣기한다.(우클릭만 하면 붙여넣기 효과)
```git
$ git clone https://github.com/theorydb/theorydb.github.io.git
```
  ![그림8](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-8.jpg)  
  엔터키를 입력하면 위에서 만든 PC내 폴더에 파일이 복사될 것이다. 
  이제 복사한 파일들을 여러분의 환경에 맞게 수정하는 작업을 진행하겠다.  
   
## Ruby & Jekyll 설치
---
파일을 수정하기 전에 먼저 Jekyll을 설치해보자. 우리가 Fork한 테마는 Jekyll 기반으로 개발이 되어있기 때문에 Jekyll을 설치하지 않을 경우 우리가 원하는 방식으로 테마를 수정할 수가 없다. 이전글에서 설명했던 것을 복습하자면 Jekyll은 정적 컴파일러이다. Text로 우리가 작성한 Markdown, _config.yml 등의 파일들은 Jekyll을 통해서 _site폴더내의 산출물로 변환되고 해당 산출물이 WEB에서 실행되는 형태라고 할 수 있다.

* Ruby 설치   
  Ruby는 또 왜 설치해야 하냐고? Jekyll이 Ruby로 만들어져서 그렇다. Ruby를 몰라도 걱정하실 것 없다. 필자도 Ruby를 쓴 경험이 전무하지만 설치과정이 매우 간단하여 어려움 없이 설치 완료하였다. 
  윈도우 OS의 경우 `Ruby와 개발툴킷`을 별도로 설치해줘야 하므로 루비 인스톨러 공식페이지 <https://rubyinstaller.org/downloads/>에 접속하자. 아래 그림과 같이 `=>`로 표시된 Ruby+Devkit 2.5.5-1 (x64)을 클릭하여 다운로드 한 후 Next만 누르며 디폴트로 설치하면 된다.
  ![그림9](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-9.jpg)  

* 아래 그림과 같이 윈도우 검색창에서 `Start Command Prompt with Ruby`를 실행한다.
  ![그림10](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-10.jpg)

* 아래 그림과 같이 프롬프트 상에서 `chcp 65001`를 실행한다. 인코딩을 부여하기 위한 명령어인데 실행하지 않을 경우 이후 진행하게 될 온갖 명령어에서 오류가 발생하므로 꼭 진행하여야 한다.
```ruby
> chcp 65001
```
  ![그림11](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-11.jpg)

* PC내 저장소를 Clone했던 위치로 이동한다. (아래 명령어는 필자의 예시로, 여러분이 지정한 경로로 이동하여야 한다.)
```ruby
C:\>cd "C:\githubPages\theorydb.github.io"
```

* 이제 Ruby에서 지원하는 gem 명령어를 통해 Jekyll은 물론 종속된 필요한 라이브러리를 설치하자. 아래 코드와 그림을 참고하면 된다. 참고로, gem이란 루비에서 제공하는 라이브러를 편리하게 설치할 수 있도록 지원되는 도구다.
```ruby
C:\githubPages\theorydb.github.io>gem install bundler jekyll minima jekyll-feed tzinfo-data rdiscount
```
  ![그림12](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-12.jpg)

* 초기화 설정
  Clone을 끝낸 Repository에 아래 코드와 같이 초기화 설정을 진행한다.
```ruby
C:\githubPages\theorydb.github.io>jekyll new theorydb.github.io
```

* 설치 및 초기화가 완료되면 아래 코드와 그림과 같이 지킬 서버를 구동해보자.
```ruby
C:\githubPages\theorydb.github.io>bundle exec jekyll serve
```
  ![그림13](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-13.jpg)

* 이제 로컬에서 웹브라우저를 실행하여 `http://127.0.0.1:4000/`주소로 접속해보자. Apache 등을 설치하지 않았지만 블로그가 로컬에서 아래 그림과 같이 잘 실행되고 있음을 확인할 수 있다.  
  ![그림14](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-14.jpg)

* 설치는 1회에 걸쳐 끝나기 때문에 앞으로는 위의 복잡한 과정을 전부 숙지할 필요는 없다. 평소 포스팅 작성 시 루비에 접속하여 지킬을 실행하는 정도의 명령어만 알면 되기 때문에 편의상 요약 명령어를 알려드리니 숙지하시기 바란다.
  > `시작` -> start command prompt with ruby -> C:\githubPages\theorydb.github.io -> jekyll serve

* 마무리  
  사실 단순하고 쉬운 과정이었지만 세상 만사가 어디 그렇게 쉬운가.. 분명 위 과정을 따라하시다가 오류가 나신 분도 계실 것이기에 `트러블 슈팅`에 관한 포스팅을 따로 정리할 예정이다. 그때까지는 번거로우시더라도 하단에 댓글을 남겨주시면 대답해 드릴 예정이다. 



## Jekyll 디렉토리 구조  
---
자. 드디어 수정을 위한 모든 과정이 갖추어졌다. 그렇지만 저장소 내 수많은 파일 중 어떤 파일을 어떻게 고쳐야 하는걸까? 필자 역시 처음 Jekyll 블로그를 Clone 후 어떤걸 고쳐야 하는지 막막했던 기억이 있다.  
 
하지만 다행인 것은 많은 폴더와 파일들 중 반드시 고쳐야 하는 것들은 사실 많지 않다는 것이다. 이에 도움이 될 수 있도록 디렉토리 구조를 한 눈에 파악할 수 있도록 하단에 디렉토리 구조에 대한 설명을 추가한다. 
  
특히, `반드시 변경해야 하는 사항을 1번에 명시`하였으니 도움이 되었으면 좋겠다. 참고로 2번 사항은 주로 디자인, 기능을 커스터마이징하는 경우 참조하게 되고 3번 사항은 거의 건드릴 일이 없는 파일들인데 지금은 건너 뛰셨다가 나중에 필요할 때 다시 돌아와 참고하시면 도움이 될 것이다.  

+ __1. 반드시 변경__
  * _featured_tags/             : 카테고리 대분류 폴더
  * _featured_categories/       : 카테고리 소분류(태그) 폴더
  * _data/                      : 개발자 및 운영자, 기타 정보 폴더 (author.yml 수정이 필요)
  * _config.yml                 : 가장 중요한 환경변수 설정 파일
  * README.md                   : GitHub 프로젝트 애서 소개하게 될 글
  * favicon.ico                 : 블로그 접속 시 브라우저 주소창에 표시되는 대표 아이콘
  * about.md                    : About 메뉴 클릭 시 나타나는 블로그에 대한 소개글
  
+ __2. 필요시 변경__  
  * assets/                     : 이미지, CSS 등을 저장 폴더
  * _layouts/                   : 포스트를 감싸기 위한 레이아웃 정의 폴더(페이지, 구성요소 등 UI변경 시 수정)
  * _includes/                  : 재사용을 위한 기본 페이지 폴더
  * Gemfile.lock                : Gemfile에 기록한 레일 기반 라이브러리를 설치 후 기록하는 파일(중복설치 방지)
  * Gemfile                     : 필요한 레일 기반 라이브러리를 자동으로 설치하고 싶을 때 명시하는 설정 파일
  * .gitignore                  : GitHub에 올리고 싶지 않은 파일들은 이 파일에 경로지정 가능(예: _site 산출물, 환경설정, 개인정보, 작성중인 글 등)
  * sitemap.xml                 : 테마의 사이트맵
  * search.html                 : Tipue Search 설치 시, 검색결과를 출력하는 페이지로 활용
  * robots.xml                  : 구글 웹로봇 등 검색엔진 수집 등에 대한 정책을 명시하는 설정파일
  * posts.md                    : 포스트 작성 관련 설정파일
  
+ __3. 변경 필요없음(참고)__  
  * _posts/                     : 포스트를 저장하는 폴더
  * .git/                       : GitHub 연동을 위한 상태정보가 담긴 폴더
  * _site/                      : Jekyll 빌드 생성 결과물 폴더(실제 GitPages에서 WEB으로 보여지는 산출물)
  * .sass-cache/                : 레일 엔진에서 사용하는 캐시 저장폴더(변하지 않는 산출물들에 대한 파싱을 하지 않아 속도보장)
  * _sass/                      : 일종의 CSS 조각파일 저장 폴더
  * _js/                        : JavaScript 저장 폴더 
  * _plugins/                   : 플로그인 저장 폴더(크롬 정책상 어차피 사용안함)
  * LICENSE.md                  : 테마 개발자의 라이센스 설명
  * index.html                  : 블로그 최초 접속 페이지
  * googlea0d1f22cc8208170.html : 구글 검색엔진에 블로그를 등록하는 과정의 소유권 확인 파일
  * feed.xml                    : RSS Feed 활용을 위한 XML
  * browserconfig.xml           : 윈도우8 이상 IE11 접속 시 클라이언트가 요청하는 환경설정 파일(윈도우의 표준 파괴 본능은 여기에도 숨어있다. ㅡ,.ㅡ)
  * 404.md                      : 404 Not Found Page(블로그에 없는 페이지 요청 시 등장하는 페이지)
  * .eslintrc                   : EcmaScript Lint(자바스크립트 협업 개발을 위한 규칙 정의) 환경설정 파일
  * .eslintignore               : EcmaScript Lint 무시할 규칙 지정(전역변수 에러표시 예외처리 등)
  * .babelrc                    : Babel(자바스크립트 컴파일러) 설정파일
  
보다 자세한 사항은 [지킬 한글화 공식 홈페이지](http://jekyllrb-ko.github.io/docs/structure/)를 참고하시기 바란다.

## 파일 수정하기 
---
드디어 파일을 수정해보자. 이제 저장소 내 대충 어떤 파일과 폴더가 있는지도 알았겠다 자신있게 `_config.yml`파일부터 수정해보자. 위에서 명시한바와 같이 가장 중요한 환경설정 파일으로 여러분의 개인화 정보와 관련된 거의 모든 환경변수가 존재한다. 반드시 수정해야 할 파일이다. 저장소 폴더 루트위치에 있는 _config.yml 파일을 아무 편집기로나 열어보면 주석에 자세한 사항이 명시가 되어있다. 주석의 지시대로 여러분의 환경에 맞게 수정하시기 바란다. 
> 참고로 필자의 경로는 `C:\githubPages\theorydb.github.io\_config.yml`이다.
  
더불어, 파일이 제대로 수정되었는지 파악하기 위해선 위에서 말씀드린 로컬사이트에 접속하면 바로 확인이 가능하다. 단, 지금 수정중인 _config.yml 파일의 경우 Jekyll을 껐다 켜줘야 반영된다. Jekyll 로컬 웹서버는 `[CTRL]+C` 단축키를 누르고 Y를 누르면 자동으로 꺼지고 `bundle exec jekyll serve` 명령어를 실행하면 다시 구동되니 참고하시기 바란다. 

  
## GitHub에 올리기
---
드디어 내가 수정한 파일을 GitHub 저장소에 올려보자. 여기까지 따라오시느라 정말 고생 많으셨다. 마지막 관문이니 만큼 조금만 더 힘을 내서 수정된 블로그를 웹에서 감상하시기 바란다.

* Git Bash를 실행한 후, 아래 코드와 같이 수정한 파일을 포함한 모든 파일을 `로컬 저장소에 업로드` 한다.
  ```git
  $ git add --all
  ```
  ![그림15](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-15.jpg)

* 수정된 파일들을 `로컬저장소에 커밋`한다. 
  ```git
  $ git commit -m "updates"
  ```
  ![그림16](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-16.jpg)

* 로컬저장소에 커밋된 파일을 `원격저장소`에 업로드한다. 업로드 도중 본인의 GitHub 아이디와 비밀번호 인증을 통과해야 업로드가   
  성공적으로 완료된다.
  ```git
  $ git push -u origin master
  ```
  ![그림17](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-17.jpg)

* 여러분의 블로그 URL(`https://[username].github.io`)에 접속하면 몇 초 뒤 수정된 사항이 반영된 것을 확인할 수 있다.

## 블로그 운영하기
--- 
위에서 열거한 방법은 최초 구축을 위한 방법으로 블로그 포스팅을 작성하고 운영하며 매일 다루게 되는 방법과는 다르다. 이에 운영하며 필요로 하게 되는 방법들은 간략하게 모아 별도의 포스팅으로 작성하였다. 관심있는 분들은 [[Jekyll Blog] (운영에 필요한) GitHub & Jekyll 사용법](https://theorydb.github.io/envops/2019/05/21/envops-blog-how-to-use-git/)을 참고하시기 바란다.


이로써 여러분의 블로그가 완성되었음을 축하드린다. 다만 Jekyll과 GitHub에 적응하기까지 제법 오랜 시간이 걸릴지도 모른다. 그래서 다음글 [Prose.io 연동으로 포스팅을 쉽게! 배포는 더 쉽게!](https://theorydb.github.io/envops/2019/05/04/envops-blog-posting-prose-io/)에서는 배포없이 좀 더 편하게 포스팅 할 수 있는 방법에 대해 알려드리고자 한다. 

> 필자가 수정 보완한 테마는 Free License이며 별도 동의없이 자유롭게 사용하실 수 있습니다. 마음에 드신다면 [필자의 블로그 저장소](https://github.com/theorydb/theorydb.github.io) [Fork] 버튼 왼쪽에 있는 `[★Star]` 버튼을 눌러주시면 큰 힘이 날 것 같네요. ^^. 긴 글 읽으시느라 고생 많으셨습니다.   