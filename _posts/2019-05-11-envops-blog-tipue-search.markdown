---
layout: post
title:  "[Jekyll Blog] Tipue Search를 이용하여 블로그 검색 기능 만들기"
subtitle:   "Tipue Search 플러그인"
categories: envops
tags: envops blog github pages jekyll site search tipue
comments: true
---


## 개요
> `Tipue Search`를 활용하여, 블로그 검색 기능을 구축한 과정에 대한 기록입니다.  
  
- 목차
	- [Tipue Search란?](#tipue-search란) 
	- [Tipue Search 설치](#tipue-search-설치)
	- [Tipue Search 환경설정](#tipue-search-환경설정)
	- [최적화 적용을 위한 디테일 마무리](#최적화-적용을-위한-디테일-마무리)
  
  
## Tipue Search란?
---
블로그를 운영하다보니 검색 기능이 필요해졌다. 시간이 지날수록 포스트 개수가 늘어나게 되는 것은 당연한 일이기 때문이다. 기술 블로그는 다른 이들과 기술을 공유하는 목적도 있지만 개인적으로 효율적인 기억 관리를 위해 활용하기도 하는데, 정작 본인이 필요한 포스트의 위치가 기억나지 않아 한참 해맨다면 블로그 운영이 무슨 의미가 있을까? 그래서 검색기능을 만들어보기로 결심하였다!
  
* __검색 기능을 뭘로 만들지?__  
우리나라 개발 환경의 고질적인 병폐일까? 검색 기능을 구현하기 위해 가장 먼저 떠오른 것이 슬프게도 DB였다. Oracle, Mysql, Pgsql,... 어떤것을 운영할까? 클라우드를 이용해야 하나?

* __아! 맞다. 이 블로그는 Jekyll로 만들었지!__  
당연히 데이터가 DB에 있어야 DB 검색을 활용할 수 있다. 정적 컴파일러 Jekyll로 제작된 블로그에 DB는 당연 고려대상이 아니다. 그렇다면 Front-End 기술을 이용해야 한다는 의미니깐.. JavaScript를 이용해서 만들어야 하나? 고민하던 중 sitemap.xml, feed.xml이 생각났다. XML 기반의 Data가 구조적으로 모여있으니 XML 파싱을 이용하여 검색 기능을 구현해야겠다 마음먹던 중 귀차니즘이 밀려왔다. ~~난 Front-End 기술을 공유하기 위해 블로그를 만든것이 아닌데.. 데이터 사이언스 기술 공유가 목적인데..~~ 이걸 굳이 만들어야 하나?^^;   

* __Jekyll도 있는데 Front-End 검색 기능이 없겠어?__  
위대한 구글신께 물어보니 역시나 훌륭한 site search plugin을 발견하게 되었다. 그 이름하여 [`Tipue Search`](http://www.tipue.com/search/)! 메인 페이지를 들어가보니 대문에 `제이쿼리를 활용하여 만들었고 무료이며 빠르다`라고 자랑하고 있다. (실제로 자랑 할 만 하다.) 쓸만한지 테스트가 필요하시면 본 블로그 좌측메뉴 About 밑에 붙어있는 검색창을 사용해보시기 바란다.   
  

## Tipue Search 설치(Window PC 버전)
---
필자의 블로그에 구현된 기능이 맘에 드셨다면 바로 설치를 시작해보자.  

1. Github Repository 접속 : [`https://github.com/jekylltools/jekyll-tipue-search`](https://github.com/jekylltools/jekyll-tipue-search)  
![그림1](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-1.jpg)  
2. `Clone or download` 를 클릭하여, `jekyll-tipue-search-master.zip` 파일을 다운받아 압축을 푼다.    
3. 압축을 풀면 나오는 `search.html`파일을 본인의 깃헙 블로그 최상위 디렉토리(예: C:\githubPages\theorydb.github.io)에 복사한다.
![그림2](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-2.jpg)    
![그림3](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-3.jpg)    
4. `압축을 푼 폴더/assets/`안에 있는 `tipuesearch` 폴더를 본인의 깃헙 블로그 `최상위 디렉토리/assets/`(예: C:\githubPages\theorydb.github.io\assets\tipuesearch)아래에 복사한다.
![그림4](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-4.jpg)    

이것으로 설치는 끝났다. 참 쉽죠~?  
이제 환경설정을 통해 블로그에 적용해 보자.
   

## Tipue Search 환경설정  
---
Jekyll 테마에 따라 설정이 약간 다를 수 있다. 본 블로그의 테마는 `Clean Blog`로, 동일한 테마를 사용하시는 경우 그대로 적용하면 된다. (운영중인 테마가 달라 적용에 어려움이 있는 경우 맨 하단의 Disqus에 댓글을 남겨주시면 아는 범위내에서 최대한 설명해 드리겠습니다.)   

1. `본인의 깃헙 블로그 최상위 디렉토리/_config.yml` (예:C:\githubPages\theorydb.github.io\_config.yml) 파일을 열어 맨 아래에 다음의 코드를 추가한다.
	```yml
	tipue_search:
		include:
			pages: false
			collections: []
		exclude:
			files: [search.html, index.html, tags.html]
			categories: []
			tags: []
	```
![그림5](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-5.jpg)     
>* include 부분의 `pages: false`의 설정은 pages 레이아웃에 해당하는 일반 html페이지는 검색하지 않겠다는 것을 의미한다.(포스트 내용 검색에 집중하기 위함) 
>* exclude 부분의 `search.html, index.html, tags.html` 페이지는 검색에서 제외하겠다는 것을 의미한다.  

1. `본인의 깃헙 블로그 최상위 디렉토리/_includes/head.html` (예: C:\githubPages\theorydb.github.io\_includes\head.html) 파일을 열어 `META`영역 제일하단, `LINKS`영역 바로 위의 위치에 다음의 코드를 추가한다.  
	```javascript
	<!-- tipuesearch -->
	<link rel="stylesheet" href="/assets/tipuesearch/css/tipuesearch.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="/assets/tipuesearch/tipuesearch_content.js"></script>
	<script src="/assets/tipuesearch/tipuesearch_set.js"></script>
	<script src="/assets/tipuesearch/tipuesearch.min.js"></script>
	```
![그림6](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-6.jpg)  
  
1. `본인의 깃헙 블로그 최상위 디렉토리/search.html` (예: C:\githubPages\theorydb.github.io\search.html) 파일을 열어 아래 그림과 같이 설정한다.  
![그림7](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-7.jpg)  
> * `layout : page` 부분은 포스팅이 담기는 레이아웃 명칭이다.(테마에 따라 다를 수 있음) 
> * `permalink: /search/` 부분은 다음 단계에서 설정할 검색어 및 버튼 Element의 form 태그 내 action 속성과 일치시켜야 한다.
> * `'wholeWords' : false` 속성은 한글 검색을 가능하게 하는 옵션이다.
> * `'showTime' : false` 속성은 검색이 완료되기 까지 소요된 시간을 표시하는 옵션이다.
> * `'minimumLength' : 1` 속성은 최소 검색 글자수에 대한 설정으로 필자는 한단어 이상이면 검색가능하게 설정하였다.  
> * 그 외의 옵션은 Tipue 메인홈페이지 [`Tipue Search`](http://www.tipue.com/search/)에 접속하여 `Options in the .tipuesearch() method`에서 상세하게 확인할 수 있다. 
  
1. 마지막으로 `본인의 깃헙 블로그 최상위 디렉토리/_includes/sidebar.html` (예: C:\githubPages\theorydb.github.io\_includes\sidebar.html) 파일을 열어 아래 그림과 같이 설정한다.  
> [주의사항]
> `sidebar.html` 페이지를 수정하는 이유는 필자가 검색창을 붙이길 원하는 위치의 페이지가 sidebar.html이기 때문입니다. 
> 본인의 블로그에 검색창을 붙일 위치를 정한 후 해당 파일 및 파일 내 위치를 정한 후 해당 부분을 수정해야합니다.  

	```html
    <form action="/search">
      <div class="tipue_search_left">
        <img src="{{ "/assets/tipuesearch/search.png" | relative_url }}" class="tipue_search_icon">
      </div>
      <div class="tipue_search_right">
        <input type="text" name="q" id="tipue_search_input" pattern=".{1,}" title="At least 1 characters" required></div>
      <div style="clear: both;"></div>
    </form>
	```  
![그림8](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-8.jpg)  
> * `action="/search"` 설정은 위의 search.html 파일의 permalink 속성과 일치시킨것이다.
> * `pattern=".{1,}"` 속성은 검색어가 1글자 이상이면 검색을 허용한다는 의미로 활용하는 정규표현식 설정이다. 
> * `title="At least 1 characters"` 설정은 위의 pattern을 지키지 않은 채 검색을 시도할 경우 나타나는 알림메시지 문구이다.
  
1. 설치가 마무리 되었으므로 아래 그림과 같이 검색이 잘 동작하는지 확인한다.
![그림9](https://theorydb.github.io/assets/img/envops/2019-07-03-envops-site-search-9.jpg)   
   
## 최적화 적용을 위한 디테일 마무리  
---
Tipue Search의 디폴트 기능만 설치된 상태이므로 필자는 블로그에 보다 친화적으로 어울릴 수 있도록 기능을 수정해보았다. 이번 단계는 귀차니즘 가동 시 건너뛰셔도 무방하다. 

1. `검색 입력창` 사이즈 조정을 위해 `C:\githubPages\theorydb.github.io\assets\tipuesearch\css\tipuesearch.css`의 CSS 속성을 변경하였다.  
	```css
	#tipue_search_input
	{
	     color: #333;
	     max-width: 150px;
	     max-height: 20px;
		padding: 17px;
		border: 2px solid #626591;
		border-radius: 0;
		-moz-appearance: none;
		-webkit-appearance: none;
	     box-shadow: none; 
		outline: 0;
		margin: 0;
	}
	```

1. `검색버튼(돋보기모양)`이 좌측 메뉴의 배경색에 가려져 잘 보이지 않아 색상을 조절하였고, 본 테마의 img 태그 CSS 속성이 검색창 모양을 삐뚫어져 보이게 만들어 해당 태그의 CSS속성을 상속받아 사이즈를 수정하였다. 마찬가지로 `C:\githubPages\theorydb.github.io\assets\tipuesearch\css\tipuesearch.css` 파일에서 아래와 같이 CSS 속성을 변경하였다.  
	```css
	.tipue_search_icon
	{
	     width: 19px;
	     height: 19px;
	     margin-bottom: 0rem;
	     background-color: #626591;
	}
	.tipue_search_left
	{
	     float: left;
	     padding: 10px 5px 0 0;
	     color: #e3e3e3;
	     max-height: 20px;
	}
	```

이로써 Tipue Search 오픈소스를 활용하여 블로그에 멋진 검색 기능을 구축하였다. 다음 기능으로는 Jekyll 기반 블로그의 `Disqus` 댓글 기능 추가에 대하여 포스팅 할 예정임을 미리알려드린다.  


> Jekyll 기반의 깃헙 페이지 블로그 구축 포스팅은 계속될 예정입니다. 처음 구축하는 방법부터 올리려고 했는데 시간 부족으로 계속 미루고 있네요^^; 포스팅 순서가 어긋나더라도 차후 개인적으로 구현하려는 목표가 모두 완성되는대로 `구축을 위한 설계도` 개념의 포스팅에서 통합 정리 및 링크부여를 통해 가급적 편하게 보시며 구축하실 수 있도록 노력하겠습니다. 읽어주셔서 감사합니다. 