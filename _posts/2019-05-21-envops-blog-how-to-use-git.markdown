---
layout: post
title:  "[Jekyll Blog] (운영에 필요한) GitHub & Jekyll 사용법"
subtitle:   "GitHub & Jekyll"
categories: envops
tags: envops blog github pages jekyll  
comments: true
---


## 개요
> 이전에 올린 포스팅 [GitHub 연동 및 Jekyll 설치](https://theorydb.github.io/envops/2019/05/03/envops-blog-github-pages-jekyll/)는 최초 구축(1회성)에 포커스를 맞추고 있다. 이번 글은 매일 사용하게 되는 글쓰기 즉, `운영에 초점을 맞춰` GitHub & Jekyll 사용법을 다뤄보려한다.  
  
- 목차
	- [Git & GitHub. 꼭 써야 하나요?](#git--github-꼭-써야-하나요)
	- [(최초 1번만 참고) 회사에서만 작성하다가 처음으로 집에서 수정할 일이 생겼다.](#최초-1번만-참고-회사에서만-작성하다가-처음으로-집에서-수정할-일이-생겼다)
	- [(매일 참고) 집, 회사 가리지 않고 아무데서나 작하고 싶다.](#매일-참고-집-회사-가리지-않고-아무데서나-작성하고-싶다)  
	- [더 알고 싶다면…](#더-알고-싶다면)
  
  
## Git & GitHub. 꼭 써야 하나요? 
---
Git은 분산(`여러명`이 수정할 수 있다.)버전(`최최..종`을 자동으로 관리해준다.)관리시스템이며, GitHub는 Git으로 생산된 산출물이 저장되는 Git저장소라고 할 수 있겠다. 지역저장소를 관리하기 위한 도구가 Git이며, 원격저장소의 집합체가 GitHub이다.

* __Git을 쓰는 대표적인 이유__  
  + 여러분이 지금 작성하고 있는 파일은 절대 최종 파일이 아니다.
  + 기껏 회사에서 수정했건만.. 집에 있는 파일 또 수정해야 하나? USB, 클라우드 활용도 지겹다.
  + 열심히 고쳤는데 다른 사람이 고치면서 내가 수정한 것 다 날라갔다.
  ![그림1](https://theorydb.github.io/assets/img/fun/final-real.jpg)

* __Git Bash vs Git GUI__  
  + Git을 사용하기 위한 인터페이스는 크게 2가지 방법으로 나뉜다. 
  + `Bash`란 커맨드 모드로 텍스트 기반의 명령어를 통해서 Git을 사용하는 방법이고, `GUI`는 화면을 마우스로 제어하여 Git을 사용하는 방법이다. 
  + 처음에는 GUI가 편하다. 다만 갈수록 복잡해지는 기능을 숙달하기에는 직관적이지 않고 사용하기 어려워진다. 태생이 리눅스 버전을 관리하기 위한 용도로 개발되었기 때문에 Bash 모드에 적응하는 것이 Git의 활용도를 높이는 길이다. 

* __프로그램 소스코드 관리에만 쓰는거 아니예요?__  
  + 아니다. 물론 프로그램 소스 관리에 주로 사용되지만 `그 어떤 문서`도 관리 및 공유가 가능하다. 예를들어 [`개발 블로그 모음`](https://github.com/theorydb/awesome-devblog)페이지는 일반문서로 깃헙으로 관리되고 있다.
  

## (최초 1번만 참고) 회사에서만 작성하다가 처음으로 집에서 수정할 일이 생겼다.
---
먼저 블로그를 작성하려는 장소(PC, 노트북 등)가 변경 시 `최초 1회에 한하여 셋팅`해야 하는 내용을 다룬다. 이미 블로그를 운영중이라는 가정하에 작성하였으므로 아직 블로그를 구축하지 않은 분들은 [GitHub 연동 및 Jekyll 설치](https://theorydb.github.io/envops/2019/05/03/envops-blog-github-pages-jekyll/)를 참고하시기 바란다. 

* __1. Git 설치 및 내 블로그 복사(Clone)__
  + Git 설치
    먼저 Git을 다운로드하기 위해 아래 그림과 같이 <https://git-scm.com/>에 접속하여 Download 메뉴를 클릭한다. PC OS버전에 맞는(필자의 경우는 Windows 64-bit) Git 설치파일을 다운로드 받아 설치한다. 
    ![그림6](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-6.jpg)
    이후 설치는 디폴트 설정 그대로 `Next` 버튼만 누르면 된다.

  + 폴더 생성 및 Git Bash 실행
    - 내 블로그를 다운로드(복사)할 `폴더를 생성`한다. (필자의 경우는 보통 C:\githubPages\theorydb.github.io 위치에서 블로그를 관리한다.)
	- 해당 폴더에 들어가 마우스 우클릭 후 `Git Bash Here`를 선택하여 Git Bash창을 실행시킨다.

  + Git 사용자 등록
    Git Bash창 프롬프트에서 아래와 같은 명령어로 본인 GitHub 계정을 등록한다.
    ```git
	$ git config --global user.name "사용자"
	$ git config --global user.email "사용자 이메일"
    ```  
	예를들면, 필자는 아래와 같이 설정한다. 참고로 Git Bash창에서의 붙여넣기는 우클릭 혹은 `Shift+Insert` 단축키를 활용하면 된다. (Git Bash창에서는 대부분의 리눅스 명령어 사용이 가능하다.)
    ```git
    $ git config --global user.name "MIN-HEO"
    $ git config --global user.email "theorydb@gmail.com"
	```

  + 내 블로그 다운받기(원격저장소 PC에 Clone)  
    본인의 블로그를 올린 GitHub 원격저장소에 접속하여 아래 그림과 같이 `Clone` 명령어를 복사한다.
    ![그림7](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-7.jpg)

    Git Bash창에서 아래 그림과 같이 `git clone + [복사한 Clone 명령어]` 형태로 붙여넣기한다.
    ```git
    $ git clone https://github.com/theorydb/theorydb.github.io.git
    ```
    ![그림8](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-8.jpg)  
    엔터키를 치면 위에서 만든 폴더에 내 블로그 파일이 복사될 것이다. 


* __2. Ruby & Jekyll 설치__
  + Ruby 설치
    - 루비 인스톨러 공식페이지 <https://rubyinstaller.org/downloads/>에 접속하자. 아래 그림과 같이 `=>`로 표시된 Ruby+Devkit 2.5.5-1 (x64)을 클릭하여 다운로드 한 후 Next만 누르며 디폴트로 설치하면 된다.
      ![그림9](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-9.jpg)  

  + Ruby Prompt 실행
    - 아래 그림과 같이 윈도우 검색창에서 `Start Command Prompt with Ruby`를 실행한다.
    ![그림10](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-10.jpg)

    - 아래 그림과 같이 프롬프트 상에서 `chcp 65001`를 실행한다. 인코딩을 부여하기 위한 명령어로 실행하지 않을 경우 이후 진행될 온갖 명령어에서 오류가 발생하므로 꼭 진행한다.
    ```ruby
    > chcp 65001
    ```
    ![그림11](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-11.jpg)

    - 위에서 블로그를 Clone했던 폴더로 이동한다. (아래 명령어는 필자의 예시로, 여러분이 지정한 경로로 이동하여야 한다.)
    ```ruby
    C:\>cd "C:\githubPages\theorydb.github.io"
    ```
  + Jekyll 라이브러리 설치
    - Ruby의 gem 명령어를 활용하여 아래 그림과 같이 Jekyll 및 필요한 라이브러리를 설치한다. (참고로, gem이란 python의 pip install과 유사한 기능으로 라이브러리를 설치할 수 있도록 지원하는 도구다.)
    ```ruby
    C:\githubPages\theorydb.github.io>gem install bundler jekyll minima jekyll-feed tzinfo-data rdiscount
    ```
    ![그림12](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-12.jpg)
	"Successfully..." 메시지가 반복해서 보이다가 "XX gems installed" 문구가 나오면 성공적으로 설치된 것이다.

  + Jekyll 초기화 설정
    - 블로그를 Clone했던 폴더에서 아래 코드와 같이 초기화 설정을 진행한다.
    ```ruby
    C:\githubPages\theorydb.github.io>jekyll new theorydb.github.io
    ```

	- 위 초기화 과정은 생각보다 많은 에러를 경험하는 부분이기에 자주 발생하는 오류 몇가지를 정리해본다.
	* (`트러블슈팅 1`) You have already activated i18n 1.8.2, but your Gemfile requires i18n 0.9.5. 오류 발생 시 :
	  project의 버전과 jekyll 설치된 버전이 달라서 발생하는 의존성 문제로 bundler를 설치함으로써 해결할 수 있다.
	  ```ruby
	  > gem install bundler
      > bundle install
      > bundle exec jekyll new theorydb.github.io  # 기존 명령어 앞에 "bundle exec"을 추가하여 재 실행 
	  ```
	* (`트러블슈팅 2`) Could not find public_suffix-3.1.1 ... (Bundler::GemNotFound) 오류 발생 시 : 
	  bundle을 최신버전으로 업데이트 해준다.
	  ```ruby
	  > bundle update
	  ```
	  혹은 아래와 같이 오류에 명시된 특정 패키지별로 최신버전을 지정하여 설치해준다.
      ```ruby
	  > gem install public_suffix --version 3.1.1
	  ```

* __3. 블로그 접속__
  + Jekyll 서버 구동 및 블로그 접속
    - 드디어 모든 준비과정이 끝났다. 지킬 서버를 구동해보자.
    ```ruby
    C:\githubPages\theorydb.github.io> bundle exec jekyll serve
    ```
    ![그림13](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-13.jpg)

    - 웹브라우저를 실행하여 `http://127.0.0.1:4000/`주소로 접속해보자. Apache 등 웹서버를 설치하지 않았지만 블로그가 로컬에서 아래 그림과 같이 잘 실행되고 있음을 확인할 수 있다.  
    ![그림14](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-14.jpg)


이로써 새로운 기기에서의 블로그 포스팅을 위한 준비 과정이 끝났다. 위에서 언급한 바와 같이 본 설치과정은 처음 1회만 성공하면 다음부터는 별로 고려할 일이 없다. 

이어서 매일 포스팅을 작성하는 과정에서 필요한 명령어를 정리해보겠다. 어려움이 있으시다면 댓글을 남겨주시기 바란다.


## (매일 참고) 집, 회사 가리지 않고 아무데서나 작성하고 싶다.
---
이제 Git과 Jekyll을 사용하기 위한 환경 구축은 끝났다. 본 장에서는 업무상 긴급한 업무가 발생하여 `집에서 수정하여 올린 후, 회사에서 수정한 내용을 다운로드 후 다시 수정하여 올리는` 시나리오를 가정하여 설명드리고자 한다.

* __1. 최신파일 다운로드(`Pull`)__  
  + 파일을 작성하기에 앞서 각각의 기기별 상황을 살펴보자.
    * GitHub(원격저장소) : 서비스 운영중인 최종버전 상태
    * 집PC(지역저장소) : 마지막으로 업로드 한 시점이 1년전이라 GitHub와 비교할 경우 최근 1년동안 작성한 A,B,..등의 파일이 없다.
    * 회사PC(지역저장소) : 현 시점엔 GitHub와 동일한 상태이지만 집PC에서 Z라는 문서를 만들어서 올리게 되면 역시 불일치가 발생하게 된다.

  + 이러한 불일치 상황 때문에 파일을 작성하기 전 가장 먼저 해야할 작업은 GitHub의 최신버전 파일을 다운로드 받아 갱신하는 일이다.
    블로그를 Clone한 최상위 폴더에서 Git Bash를 실행한 후, 아래 코드와 같이 최신파일을 다운로드(Pull) 한다.
    ```git
     $ git pull # 다운로드
	 $ git log  # 커밋내용 확인
    ```

* __2. `새로운 파일`을 작성한다.__  
  + Jekyll 활용(정적컴파일 테스트 기능) : `시작`버튼 -> start command prompt with ruby -> 블로그 최상위 폴더 이동(예: C:\githubPages\theorydb.github.io) -> `bundle exec jekyll serve` ([바로 위 챕터 "3.블로그 접속" 참고](#최초-1번만-참고-회사에서만-작성하다가-처음으로-집에서-수정할-일이-생겼다))
  + 마크다운(Markdown) 사용법 및 예제 : 본 블로그 [게시글](https://theorydb.github.io/envops/2019/05/22/envops-blog-how-to-use-md/) 참고

* __3. 아래 코드와 같이 수정한 파일을 포함한 모든 파일을 `로컬 저장소에 업로드(Staging)` 한다.__  
  ```git
  $ git add --all 
  (혹은)$ git add test.txt # 수정한 파일만 올리는 경우 
  ```
  ![그림15](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-15.jpg)

  (`트러블슈팅`) warning: LF will be replaced by CRLF in Gemfile.lock. 오류 발생 시 : 
  시스템 간 개행문자(Line Feed)가 달라서 발생하는 문제이다. 리눅스는 LF, 윈도우는 CRLF을 사용하기 때문이다. 
  협업자간 시스템이 동일하다면 autocrlf 기능을 활용하여 아래와 같은 명령어로 해결할 수 있다. 
  ```git
  $ git config --global core.autocrlf true # 윈도우끼리 사용하는 경우 
  $ git config --global core.autocrlf true input # 리눅스, 맥끼리 사용하는 경우
  ```

* __4. 수정된 파일들을 `로컬저장소에 업로드(Commit)`한다.__  
  ```git
  $ git commit -m "updates at HOME"
  ```
  ![그림16](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-16.jpg)

* __5. 로컬저장소에 커밋된 파일을 `원격저장소에 업로드(Push)`한다.__   
  업로드 도중 본인의 GitHub 아이디와 비밀번호 인증을 통과해야 업로드가 성공적으로 완료된다. (매번 인증이 귀찮을 경우 SSH 원격접속 기능을 활용할 수도 있다.)
  ```git
  $ git push -u origin master
  ```
  ![그림17](https://theorydb.github.io/assets/img/envops/2019-05-03-envops-blog-github-pages-jekyll-17.jpg)

* __6. 여러분의 블로그 URL(`https://[username].github.io`)에 접속하면 수 분 이내로 수정된 사항이 반영된 것을 확인할 수 있다.__

이상으로 2개 이상의 기기에서 작업을 수행하는 경우 운영방법을 알아보았다. 이와 같은 상황에서는 `풀(Pull) & 푸쉬(Push)를 습관화`하는 것이 좋다는 것을 유념하자.


## 더 알고 싶다면...  
---
개인 블로그는 보통 자기자신 즉, 1인이 관리하기 때문에 위에서 다룬 시나리오와 같이 장소(혹은 기기)가 변경되는 경우 외에는 버전 관리에 큰 이슈가 생기지 않는다. 

하지만 사내 기술 블로그와 같이 팀원들과 협업하여 관리하게 되는 경우는 어떻게 될까? 수정한 시점의 차이로 인해 A, B가 지역저장소에 소유한 두 파일이 서로 약간씩 다른 충돌 문제가 발생할 수 있다. 

더 깊게 다루고 싶지만 본 블로그의 운영 취지와는 맞지않아 생략한다. 더 관심있는 분들은 [[리뷰] Do it! 지옥에서 온 문서관리자 깃&깃허브 입문](https://theorydb.github.io/review/2019/12/26/review-book-git-github/) 포스팅에서 보다 자세한 이슈 사항을 정리하였다. Git관련 여러 도서를 보았지만 제법 난이도가 있기에 본 리뷰에서 소개한 책이 초보자 분들께는 가장 추천하고 싶은 도서이다.

보다 많은 기능을 배우고 싶다면 아래 링크들을 참고하시기 바란다.   
* GitHub 공식 가이드 : <https://guides.github.com/activities/hello-world/>
* 누구나 쉽게 이해할 수 있는 Git 입문 : <https://backlog.com/git-tutorial/kr/>
* 버전관리를 들어본적 없는 사람들을 위한 DVCS - Git : <https://www.slideshare.net/ibare/dvcs-git>
* svn 능력자를 위한 git 개념 가이드 : <https://www.slideshare.net/einsub/svn-git-17386752>

지금까지 GitHub & Jekyll 기반의 블로그 운영 방법에 대해 알아보았다. 블로그, 문서, 프로그래밍 소스코드 가릴것 없이 중복과 버전 관리로 인한 스트레스가 해결되시길 바란다.  
