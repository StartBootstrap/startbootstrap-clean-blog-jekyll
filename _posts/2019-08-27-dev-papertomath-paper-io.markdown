---
layout: post
title:  "[Paper] 논문 읽는법, 쓰는법, 투고하는법"
subtitle:   "Insight, back to basics"
categories: dev
tags: papertomath data science insight analysis basics modeling practice
comments: true
---

## 개요
>  논문과 연구에 거리가 멀어진 셀러던트 직장인이 저처럼 `늦깍이 나이에 연구에 철이 들어 논문에 관심이 많아지셨다면` 본 포스팅을 꼭 읽어주세요. 학사출신 실무자가 논문을 잙읽고, 잘쓰고, 잘투고할 수 있도록 보고 배운 노하우를 공유합니다.

- 목차
	- [논문. 연구. 늦었지만 하지 않을 수 없는...](#논문-연구-늦었지만-하지-않을-수-없는) 
	- [논문을 잘 읽는 방법](#논문을-잘-읽는-방법) 
	- [논문과 관련된 유용한 필수지식](#논문과-관련된-유용한-필수지식) 
	- [논문을 잘 쓰는 방법](#논문을-잘-쓰는-방법) 
	- [논문 투고와 심사](#논문-투고와-심사) 
	- [논문의 인용수와 질적관리](#논문의-인용수와-질적관리)
	- [논문과 영어](#논문과-영어)

- (참고) 내용이 상당히 깁니다. 즐겨찾기를 원하실 경우 목차를 클릭 시 변경되는 URL로 관심 위치까지 같이 저장하시기 바랍니다.  

## 논문. 연구. 늦었지만 하지 않을 수 없는...
---
필자는 연구자도 아니고 석.박사 학위보유자도 아닌 그저 약 10여년간 실무에 몸담아온 직장인으로 학사출신 프로그래머라는 점을 먼저 밝혀둔다. 그런 사람이 왜 논문에 관심이 있는지, 아니 이런글을 쓸 자격이 있는건지 물으실 수도 있겠다. 부끄럽지만 굳이 하나의 자격을 찾자면 `필자처럼 연구에 늦게 철이 든 사람을 위해` 조금이나마 도움이되지 않을까하는 기대 정도다.

다행인 것은 세월이 흐르다보니 나이를 먹었고 덕분에 주위에 아는 연구자분들이 점점 늘어나게 되었다. 그 분들의 조언 그리고 인터넷을 통해 다양한 분들이 각자의 노하우와 견해를 공유해주시는 바 이구동성의 중요한 조언을 모아 본 포스트를 정리하였다. 

데이터 사이언티스트에 관심이 있는 필자에게 논문이란 단순히 관련 직군의 최신 기술을 얻기 위한 정보로서의 가치 뿐만 아니라, 세상에 쌓여온 지식과 실험을 바탕으로 유의미한 인사이트를 얻기 위한 아이디어를 얻는 과정을 위한 스킬을 얻을 수 있다는 점에서 반드시 짚고 넘어가야 하는 산이다.

더불어 필자가 논문에 큰 의미를 부여하는 이유는 일종의 세상을 발전시키데 가장 효율적인 의사소통 수단으로서의 기능 때문이다. 세상 지식에 경계선이 있다면 그리고 그 최전선을 확장시키는 것에 인생의 보람을 느끼는 분이라면 논문과 연구의 중요성은 두말할 나위없다. 보다 자세한 의미는 이미 충분히 표현한 바 [인사이트(Insight)! 다시 기본으로](https://theorydb.github.io/dev/2019/08/25/dev-ml-insight/) 포스팅으로 갈음한다.
![Ph.D.의미](http://academiclifehistories.weebly.com/uploads/9/9/3/4/99343332/published/the-illustrated-guide-to-a-phd1.jpg?1530628082)
※출처 : [PhD pitfalls: Part I – The reality of your contribution](http://academiclifehistories.weebly.com/blog/phd-pitfalls-part-i-the-reality-of-your-contribution)

이제야 겨우 인생에 목표라는 것이 생겼는데 그러기 위해 대학원을 다녀야 하는데 그러려면 돈을 벌어오기는 커녕 되려 돈을 써야한다. 처자식을 먹여살려야 하는 현실속에서 퇴근 후 시간과 주말에 매진할 수 밖에없는 필자와 비슷한 늦깍이 셀러던트 분들께 조금이나마 보탬이 되었으면 좋겠다.

논문을 읽고 쓰는 과정은 꾸준히 노력하고 매진하면 언젠가 기회는 온다는 점에 의미를 두고싶다. 비슷한 처지에서(실은 훨씬 더 가혹한) 본인이 가고 싶은 길을 꿋꿋히 달려오신 [경희대학교 동서의학대학원 박은정 교수님의 일화](https://post.naver.com/viewer/postView.nhn?volumeNo=21735819&memberNo=6687676)는 필자에게도 큰 힘이 된다. 인생의 목적이 분명 부와 명예만은 아니므로 가고싶은 길이 생겼으면 열심히 걸어가보려한다. 

육아와 가족들의 간병으로 20여년의 시간을 뒤로 한 경력 단절 아줌마께서 클래리베이트 애널리틱스(구 톰슨 로이터)가 선정한 연구성과 세계 상위 1% 연구자(HCR)에 2번이나 오르시고 ‘지식창조대상 장관상’을 수상하셨으며 유명대학 정교수에 이르기까지의 멋진 과정을 읽으며 용기를 얻으셨으면 한다. 그 외 연구실 셋방살이, 한국연구재단의 ‘대통령 포스트닥 펠로우십’ 등의 일화를 통해 힘없는 아웃사이더가 연구계의 인싸가 되기 위한 노하우들도 얻을 수 있을것이다.  



## 논문을 잘 읽는 방법
---
세상에 읽어야 할 논문은 정말 많다. 어떻게 읽어야 빠르고 정확하게 이해할 수 있을까? 역지사지(易地思之)라 했다. 가장 확실한 방법은 직접 당사자가 되어봐야 한다. 즉, 논문을 쓰고 심사하는 `저자와 심사자` 입장이 되어보는 것이다. 여기에선 모든 학문범위를 다룰 수 없는 관계로 필자가 관심있는 머신러닝 분야를 사례로 다뤄본다.

* __1. 저자에게서 얻는 착안__  
  저자 입장에서 생각해보자. 내가 논문 저자라면 `연구성과를 명확히 표현함은 물론 심사과정에서 Accept를 얻어내기 위해 최대한 가독성있게 요약 전달하는` 부분을 작성하게 될 것 같다. 독자는 그 부분 먼저 읽어야 하지 않을까? 정리하는 과정에서 Andrew Ng 교수의 조언이 많은 도움이 된다. 저자의 시각과 더불어 도움이 될 사항을 아래와 같이 정리해보았다. [앤드류응 - 스탠포트 CS 230 강의](https://youtu.be/733m6qBH-jI)을 참고하시기 바란다.
 
  + `Review 논문`
    - Review 논문이란 관련 연구분야를 집대성하여 요약한 논문으로 교과서 반영 직전 단계라 말할 수 있을 정도로 연구성과가 잘 정리되어있다.
    - 즉, 관심있는 연구분야가 생겼다면 먼저 Review 논문을 파악함으로써 연구분야에 대한 논문 간 관계도 및 목차를 구성할 수 있게된다.
    - Nature지의 경우 최근 핫토픽을 정리하는 형태로 자주 올라온다. 
    - 참고로, Article은 좀 더 자세한 최신 연구를 다루며, Letter는 좀 더 양이 적은 최신연구를 다룬다.
  + 논문의 목록을 정리 : Review 논문을 통해 읽어야 할 논문 목록을 수집한다.
  + 취사선택 : 목록에서 자세히 읽을 논문과 버릴 논문을 선정한다.
  + 수집한 논문별로 `초록(abstract), 도표(figures)를 먼저` 읽는다.
    - 기본적인 컨셉과 아이디어를 기술하여 전체 맥락을 잡을 수 있다.
  + 다음으로 `도입(introduction), 결론(conclusion), 도표(figures)`를 읽는다.
    - 왜 자신의 논문이 게재 승인되어야 하는지 명확히 설명하기 위해 신중하게 요약한 핵심정수가 담겨있다.
  + 잘 읽었는지 확인하기 `Check-List`
    - 저자가 뭘 해내고 싶어했는가?
    - 이 연구의 접근에서 중요한 요소는 무엇인가?
    - 스스로 이 논문을 이용할 수 있는가? 
    - 참고하고 싶은 다른 레퍼런스에는 어떤 것이 있는가?
  + 추천하는 리딩 습관
    - 읽는데 걸리는 시간 : 관련 연구자 기준 보통 1-3시간 
    - 한 주에 2개씩 꾸준히
    - 알고리즘 : 수식을 직접 쓰면서 이해하고 밑바닥부터 코드로 구현
    - 수식 : 직접 손으로 연산
  + 논문 정독횟수에 따른 ML/DL 지식수준 
    - 5 ~ 20개 : ML/DL 시스템을 적용할 지식은 갖추었지만 최신의 기술을 이해하기에는 부족하다.
    - 50 ~ 100개 : 해당 분야에 대해 자세히 알고 있다.
  + 스터디/커리어의 방향
    - 배울 수 있는 팀으로 : 성장에 도움이 된다.
    - 좋은 프로젝트(직장) 선정 : 세상을 발전시킬 수 있는 가치있는 프로젝트
    - ML/DL을 다른 산업에 적용 : 헬스케어, 천문학, 기후 등
  + 추천 커뮤니티 Site
    - [ML subreddit](https://www.reddit.com/r/MachineLearning/)
    - ML/DL 컨퍼런스 : [NIPS](https://nips.cc/) / [ICML](https://icml.cc/) / [ICLR](https://iclr.cc/) 


* __2. 심사자에게서 얻는 착안__  
  이번에는 심사자의 입장에서 생각해보자. 각 저널에는 논문 심사를 위해 저명한 교수님들로 구성된 Reviewer Pool이 있다. 명망이 높고 활동도 활발한 분들인지라 대부분 일반인들보다 24시간의 밀도가 꽤나 짙을 것이다. 따라서 심사에 많은 시간을 할애하길 원치는 않을 것이다. 즉, `그분들은 그동안의 연구 경험을 바탕으로 한 빠른 Accept/Reject 선별 기술`이 있을것이다. 이를 바탕으로 심사자의 입장이 되어 그 분들의 눈이 되어보자.

  + Cover Letter 및 Abstract  
    `본 연구는 기존 연구와 이런점에서 다르다. 이와 같은 새로운 사실 또는 개선점을 밝힌다.`  
    위와 같은 형식이 없다면 Reject 가능성이 커진다. 논문을 위한 논문일 수 있다고 선입견을 가지게 되는 것이다. 우리는 이런 형식으로 언급된 부분을 먼저읽어 양질의 논문인지, 원하는 내용이 있는지 미리 가늠해봐야 한다.

    심사기준으로는 크게 독창성(Originality), 참신성(Novelty), 혁식적(Innovative) 3가지 기준이 중요한데 비록 기존에 잘 알려진 사실일지라도 해석이나 분석의 방법을 새롭게 하여 차별화된 설명, 혹은 결론으로 이끌 수 있다면 Accept되는 경우도 있다. 다만 이런 유형은 충분히 의미는 있겠지만 공부하는 우리 입장에서는 일단 차순위로 미뤄두는 것이 옳다고 본다.

  + Introduction  
    이 부분은 연구배경, 목적, 필요성, `기존 연구와의 차별성`이 보다 자세히 강조된다. 참고문헌의 약90 %가 참조되는 영역이므로 `참고문헌의 갯수가 적은 논문`은 사전조사가 부실하게 여겨질 가능성이 크다.

  + Clarivate Analytics(구 톰슨 로이터)의 저널 평가지표  
    지금까지 논문 평가에 대한 혜안을 빌려왔다면 저널에 대한 평가를 알아보고 싶을때 저널 평가지표가 도움이 된다.
      - 저널의 IMPACT FACTOR(인용률), Rejection Rate 등의 수치 
      - 저자들의 국제성, 즉 여러 국가와 기관에서의 투고율

  + 기타   
    심사자도 사람이므로 논문을 바라보는 시각과 기준, 각자의 논리 성향이 다양할 수 있음을 염두에 두어야 한다. 저널에 실렸다고 완벽하다고 반드시 읽어야 한다고 판단하는 우에서 벗어날 수 있고, 더불어 작성시에는 충분히 참신하고 자신 있음에도 Reject될 경우 다른 저널에 게재하는 등의 방법을 시도할 필요가 있다.

이와 같이 작성자와 심사자의 입장이 되어 논문을 읽는다면, 입체적으로 비판적인 시각으로 보다 빠른 이해에 도움이 될 것이다.


## 논문과 관련된 유용한 필수지식
---
먼저 논문 및 그 Eco환경에 대해 전혀 모르는 분들은 반드시 본 파트에 정리한 사항들을 먼저 읽어주시기 바란다. 그동안 궁금했던 것들이 한번에 뚫릴것이다. 

* __1. 논문의 `구성요소`__   
  논문을 이루는 큰 구성요소들을 친숙한 말투로 정리해보았다.
  - Title : 우리가 한게 뭐다
  - Author : 누가썼다 + 저자의 소속 기관
  - Abstract : 
    + 요약 : 본 연구는 기존 연구와 이런점에서 다르다. 이와 같은 새로운 사실 또는 개선점을 밝힌다.
    + 판매를 위한 광고용으로도 쓰일 수 있기 때문에 독립된 글로 봐야 한다. 
  - Introduction : 
    + 우리가 한게 뭐다.
    + 왜 중요하냐면, 본 연구는 기존 연구와 이런점에서 다르다. 이와 같은 새로운 사실 또는 개선점을 밝힌다.
    + 참고문헌을 보면 과거에 어떤 사람들이 이런 시도를 했으나, 이 부분이 부족해서 어떤 아이디어를 가지고 어떤 실험을 했다. 
  - Result&Discussion : "실험결과에 대한 논의 후 이런 결과가 나왔다" 반복
  - Conclusion : 
    + 우리가 이런 결론을 얻었다. 미래에는 뭐가 중요하겠다. 
    + 이 기술이 기존과 어떻게 다르고 어떤 장단점이 있다. 주로 이런 의미이고 이게 왜 중요하다.
  - Method : 논문에 활용한 실험 방법, 테크닉 
    + ex) 내가 세포를 어떻게 키웠는지, 어떤 수식으로 분석했는지, 어떤 장비로 측정했는지... 등 
  - Acknowledgements : 
    + 연구비 누구한테 받고, 누가 도와줬고, 저자 중에 누구는 특허권자다
    + 저자 중에 누구는 연구비를 받고있다 명시(공정성을 위해)
  - References : 타 논문 인용 명시, 과거 언급, 기술 

* __2. 논문 및 저널의 `등급`__   
  일반적으로 우수한 논문을 판단하는 기준은 `IF가 높은 저널에 등재`되었는지 여부와 `피인용횟수가 높은 논문`(일반적으로 2-3년은 지나야 쌓임)이라 할 수 있겠다. 일반적으로 인식되는 저널의 등급을 알아보자.

  1. NCS(Nature, Cell, Science)
    - N,S는 대중적 과학전문잡지(짧은논문)
    - C는 전문학술지(의학분야, 전문(全文))
  2. SCI(Science Citation Index, 과학인용색인), SSCI(Social Sciences Citation Index, 사회과학분야), AHIC(Arts&Humanities Citation Index, 인문예술분야)
    - 역사가 더 깊고 개발도상국 등 IT인프라 열악한 국가의 접근성을 위해 유지되고 있음
  3. SCIE(Scienece Citation Index Expanded)
    - Journal information 매체형태 : SCI는 CD/DVD ↔ SCIE는 on-line
  4. SCOPUS
    - 네덜란드 엘스비어(Elsevier) 출판사의 학술연구논문 인용 데이터베이스, 전세계 5천여개 출판사의 21,000여 종 저널타이틀 수록
    - 비영어권 모국어도 등재 기회를 줌
    - 제목, 저자, 요약, 키워드, 그림, 테이블, 참고문헌은 영어로 기재(인용문제)
  5. KCI(Korean Citation Index, 한국연구재단등재지)
    - 국내 우수논문의 해외유출 및 우리말 품격 유지를 위한 한국형 인용색인 DB 및 인용지수 개발, 운영
    - 대학원생들이 본격적으로 해외저널에 논문을 투고하기 전에 논문투고의 경험을 쌓기 위한 연습용으로 전락했다는 비판도 있다.
  6. KCI Nominated(등재후보지)
  7. 학술지 
    - 국내에서 1인당 논문수를 계량화하여 인정함에 따라 논문의 양이 중요해지면서 다양한 학술지가 등장함
    - 등급제 영향으로 군소학회, 대학 연구소까지 등재학술지를 발행함
    - 연구업적 평가에서 좋은 점수를 받기 때문에 논문게재를 편하게, 쉽게하기 위한 편법으로 활용되는 단점이 있다.
  8. 어떤 저널에 투고해야 할까?
    - 저널 홈페이지 Author’s Guide를 반드시 확인 : 저널이 취급하는 연구분야의 주제인 Scope이 다름.
    - Scope에 포함되어있지 않다면 Scope에서 기술된 주제와 어떤 연관이라도 있는 주제임을 억지로라도 이끌어 내야함.
    - Cover Letter에 반드시 적어야 하는 내용이기 때문
    - Cover Letter와 투고논문의 Abstract 및 Keywords를 보고 판단하는 것이 일반적

* __3. `교원`이 되고 싶다면__  
  + 공동저자는 큰 의미가 없음
    - 배점, 가중치가 낮음 
    - 정성적으로도 심사자들에게 좋은 인식을 주지 못함 
    - SCI, SCIE급 단독저자 2~3편 가지고 있는 경쟁자에게 밀리기 쉬움
  + 제1저자(First Author), 아니면 교신저자(Corresponding Author)로서의 논문이 많아야 함
    - 과정 중 학생은 교신저자는 거의 100 % 지도교수이므로 제1저자 논문이 많아야 함
  + 논문과 관련된 교수님의 역할
    - Advise, Supervise, 제1저자, 교신저자, 공동저자
  + Thomson Reuters의 Journal Citation Reports(JCR) 상위 10% ~ 20% 논문은 가산점이 부여되는 추세
  + 인력, 연구장비, 실험장비, 환경은 핑계일 뿐
    - 없으면 없는 대로 아이디어로 승부를 봐야 함
  + Review Article, Book Chapter, Letter to Editor 등은 연구업적에 포함되지 않는 경우가 있음
    - Original Research Article 위주로 인정되는 분위기
  + 박사 후 포닥 및 정출연 등에서 연구과정을 거침 
    - 보통 3년 ~ 5년 간 대학에서 포닥이나 정출연 등에서 연구과정을 거침
    - 3년 ~ 4년 내 SCI, SCIE급 저널논문 10편 정도는 투고하기도 함
  + 초빙에 대한 현실적인 비판
    - 인맥, 학벌 문제로 서류심사 시 전공적합도라는 편리한 항목으로 걸러지기 쉬움
    - 면접도 마찬가지로 나이, 인성, 발전성 등의 주관적 항목에 의해 걸러질 수 있음
    - 명문 일부의 대학을 제외하고는 논문인용수를 많이 따지지 않는 편
    - 극소수 대학들은 일정기간(보통 최근의 2년 ~ 3년)동안 연구업적 외에 발표기간에 관계없이 대표논문을 요구하기도 함
      * 발표논문수도 중요하지만 발표논문의 질도 평가하다는 의미
  + 임용 후 현실에 대한 비판
    - 학생지도, 과제수주, 연구비 비용처리, 서류작성, 행정업무, 학내 파워게임(흔히들 안하면 바보가 된다고 표현) 
    - 외부강연, TV출연, 보직(장.차관, 정출연기관장 등)관련 공부 내지는 연구할 시간이 없다.
    - 상대보다 더 잘해서 이기는 것보다는, 깍아내려서 동등한 수준으로 만드는 것이 더 쉬운 잔혹한 현실  


## 논문을 잘 쓰는 방법
---
논문의 정의를 사전에서 찾아보면 `연구과정을 과학적인 방법에 따라 전개한 체계적인 글`임을 알 수 있다. 먼저 논문의 작성 절차를 정리한 후, 잘 쓰기 위한 Tip을 정리해본다.

* __논문 `작성절차`__   
  1. 무엇을 연구할 것인가?
  2. 참고문헌의 고찰
    - 부실한 검토를 피할것 : 유사논문이 되거나 의도치 않은 표절이 발생할 수 있음
    - 독창성(Originality), 참신성(Novelty), 혁신적(Innovative)이 필요
    - 가독성, 재현성, 정확성, 검증성이 갖춰져야 함
  3. 타당한 문제 해결방법 구상
  4. (객관성 입증을 위한) 실험 혹은 이론적 해석
  5. 문제해결 및 결과도출
  6. 고찰 및 요약

* __`좋은 논문`을 작성하기 위한 Tip__
  1. 기존 연구와의 차별성
    - 독창성(Originality), 참신성(Novelty), 혁식적(Innovative) 중 하나만 만족해도 SCI급
    - 기존 연구에서 부족한 부분 혹은 간과되었던 부분을 새롭게 조명한다거나 틀린 부분을 밝힐 수 있어야 함
    - 변수를 바꾸거나 새로운 시각으로 접근하여 “참신”하거나, “어!! 이렇게도 해석할 수도 있네..”라고 느낄 수 있어야 함
  2. 접근방식에 대한 사고 
    - 방법1 : 예상 > 확인을 위한 실험 > 얻어진 결과를 바탕으로 논문 작성 
    - 방법2 : 아이디어로 초안작성 > 결론, 참고문헌까지 먼저 작성 > Results and Discussion(Verification) 채우기
    - ex) “왜 지금까지 발표된 방정식은 유체역학의 정수력학(Hydrostatic theory)에서 시작하지?", "열역학의 이상기체 상태방정식(Equation of the Ideal Gas Law)으로도 충분히 유도할 수 있을 것 같은데...”
  3. 시각화와 가독성을 위한 배려
    - 포맷(Format)을 반드시 확인
      + SCI/SCIE급에 포함된 논문집의 경우에는 자체 논문양식을 제공하므로 양식에 맞춰 작성
      + Elsevier이나 Springer 계열의 경우에는 논문양식을 제공하지는 않지만 논문의 작성순서, 그림, 테이블, 참고문헌, 글씨체의 크기 및 종류, 단락의 칸 등 형식에 대한 작성법을 지정하고 있기 때문에 요구하는 양식을 맞추어 투고해야 함
    - Excel Graph 등 저품질의 시각화는 지양하고 높은 해상도를 유지할 것
    - 수식이 길어져 생략하는 경우 투고시 Supplement로 따로 보내면 논문심사자에게 호감을 줄 수 있다.
  4. 기타 알베르트 아인슈타인의 조언
    - 지금까지의 누군가 해왔던 동일한 생각으로 접근하면, 어떤 해결 방법도 찾을 수 없다.
    - 모두가 비슷한 생각을 한다는 것은, 아무도 생각하고 있지 않다는 말이다.
      > When all think alike, no one thinks very much.
   
* __`Rejection`을 피하기 위하여__
  - Peer Reviewer는 전문가이므로 본인이 이미 다 알고 있는 것들이라면 차별성이 없다고 판단
  - 최근 5년 이내 Reference가 없으면 Rejection 가능성이 커짐
  - Revision이 통보되었으나 본인의 견해가 옳다고 생각할 경우 대응 예시 
    + "심사위원님 말씀대로 모든 과학적 연구가 실험에 바탕을 두어야 한다면 과학자들이 마주치는 많은 난관을 돌파하기 위해 시도하는 새로운 접근이나 아이디어는 사장될 것이다."
  - 수식에 가독성이 없어서 어렵게 보이도록 작성하면 Rejection 가능성이 커짐
  - 논문 전체의 내용과 결론이 일치하는지 확인
  - 아무리 실험 논문이지만 공학 논문에서 수식이 하나도 없는 것은 이상하다. 
    + 관련 수식을 삽입하고 가능하다면 이론값과 비교하거나 정성적인 해석을 추가하라.
  - 모든 노력을 기울였으나 Rejection된 경우 
    + Reviewer Comment를 잘 활용할 것(실패해도 얻을것은 분명 존재한다.)  
  - 참고로 Elsevier 계열의 저널은 3주 ~ 4주 내 Reviewer Comment(심사평)을 작성하므로 늦어지면 문의해 볼 것 
   
* __`Revision, Reviewer Comment`의 유형__
  - 독자들이 쉽게 이해하기에는 한계가 있을 것 같다. 독자들이 당신 연구에서 적용한 계산을 보다 잘 이해할 수 있도록 계산절차를 설명하는 차트와 그래프를 추가해서 다시 보내라. Major Revision!!
  - 제법 괜찮은 것 같다. 그런데 당신의 연구에 베르누이방정식을 적용해서 계산한 것이 부적절한 것 같다. 이에 대한 설명을 추가해서 다시 보내봐라. Minor Revision!!
  - 문장의 삭제, 수정 검토는 쉬운편 ↔ 방정식이나 그림, 테이블, 논문의 작성순서 등은 많은 시간이 소요됨


## 논문 투고와 심사
---
* __`심사`절차__ 
  - 보통 4개월 ~ 6개월 정도 소요. (길면 2년 가까이 걸리는 경우도 있을정도)
  - 전자투고시스템(Electronic Editorial System)에 투고 : [Submitted to the Journal]
  - Editor-in-Chief에게 전달 : [Editor Invited ↔ Desktop Rejection, Under Review]
  - Desktop Rejection = Re-submission
    + 30 ~ 40% 이탈. Science지의 경우 90% 이탈 
    + 저널이 취급하는 범위와 맞지 않거나 심각한 결여의 결과
    + 한 달에 적으면 200편 많으면 약 300편 정도의 논문이 투고(하루에 7~10편 정도) 
	+ 시간 제약으로 인해 Abstract, Conclusion만 읽는 경우가 많음
	+ Instruction까지만 읽어줘도 감지덕지 => 반드시 타 연구와의 차별성 기술이 필요
	+ NCS는 훨씬 엄격하다.
	  * 우리 저널의 독자가 별로 흥미를 가질 것 같지 않다. 
	  * 우리 저널은 임팩트있고 과학계에 지대한 공헌을 할 수 있는 최신 연구내용만을 다룬다.
  - Associate Editor에게 전달 : [With Editor ↔ ]
    + 투고논문에 논문번호가 부여
    + 동일 연구분야에서 특정주제에 대한 유명한 전문가, 학자들이 평가
  - Peer Reviewr에게 전달(3~5명 / 1~3개월소요)
  - 심사결과확인 : [Rejection, Major Revision, Minor Revision ↔ Required Review Completed]
  - 수정 후 확인 : [Required Review Completed]
  - Accept 후 DOI 등
  - Volume No.와 Page가 없다면 정식 출판논문으로 여기면 안됨
    + 연구업적기간 및 온라인 출판 연구논문의 인정시기에 대해 엄격히 규정

* __동료심사(Peer review)__ 
  - Pool에서 투고논문의 심사에 적합하다고 판단되는 Reviewer에게 심사를 의뢰
  - 편집장과 편집위원들로 구성된 편집위원회에서 추천하여 Pool에 등록시키거나, 
  - 논문을 최초로 특정저널에 투고할 때 저널측에서 투고자인 교신저자에게 Reviewer로서 활동할 수 있느냐고 문의
  - 전자투고시스템에 투고할 때 일반적으로 교신저자가 선호하는 Reviewer 3명을 추천
  - Review시에 이 사람만은 피해달라는 심사자의 기피명단을 요구하기도 함 => 참고문헌의 저자 중 한분을 요구하기도 함
  - 전문적인 지식을 가진 겸손한 Reviewer를 만나야하는데 결정할 수 있는 상황이 아니므로 복불복
  - 심사의견(Reviewer Comment) 작성을 위해 조상부터 알고 있었던 모든 지식을 동원, 관련 논문 다 찾아봐야 함
  - 심사결과도 해당저널에서 평가함 / 저널의 심사탈락율도 저널평가시 중요 지표임
  - 논문투고할 때는 해당저널의 편집위원 구성을 한번쯤 참고하는 것이 좋다.
  - SCI나 SCIE로 등재된 국내저널(물론 영어로 적어야 하고, 투고-심사-수정-게재 혹은 게재불가의 모든 절차가 영어로 진행됨)의 경우는 그들만의 리그인 경우가 많다. 편집진을 보면 90 %가 한국인, 어쩌다가 외국인 1~2명이 ASSOCIATE EDITOR(부편집인)으로 구성.
  - 투고논문 저자들의 소속이 좀 빵빵한 곳은 논문게재가 쉽다. 
    + 해외저널도 그런 경향이 좀 있지만 국내저널의 경우는 좀 심함.
    + 교신저자가 세계적으로 알아주는 대가(??)이거나 특정저널의 EDITOR급이면 게재확률은 승률 80 % 이상
  - 심사위원의 유형
    + 영어문법을 중시하는 사람이 있을 수도 있고, 
    + 투고논문의 양식이 저널의 요구에 일치하는 지를 볼 수도 있고, 
    + 투고논문의 Cover Letter, Abstract, Conclusion만 읽어보고 논문의 가치를 판단하는 사람이 있고 천차만별
    + 저널의 Scope에 맞지 않으면 가차없이 Rejection, 
    + 투고논문의 양식이 저널의 요구사항에 맞지 않거나 영어가 맘에 안들거나해도 바로 Rejection 


## 논문의 인용수와 질적관리
---

* __Open Access Article__  
  - Accept후 누구라도 저널의 홈페이지에서 자유롭게 다운로드 받을 수 있는 서비스
  - 보통 800 ~ 1200달러의 비용 지불
  - Google Scholar 검색 시, pdf 파일이 있다고 할지라도 저자들의 저작권은 이미 출판사가 가지고 있기 때문에 저작권 문제를 염려하여 저자들은 보통 투고시의 심사용 원본파일을 올려놓음. 따라서 저널명, 볼륨, 페이지가 없음
  - 대학이나 연구기관의 경우 저널의 각 출판사들과 년간 일정비용을 지불하고 전자저널시스템을 구축하고 있기 때문에 기관의 소속원이라면 자유롭게 이용할 수 있기도 함.
  - 개발도상국 같은 곳의 연구자들은 IT인프라 전자저널시스템과 같은 것을 이용할 수 없는 환경이 거의 대다수.
  - 그 곳의 연구자들은 어쩔 수 없이 “Open Access Article”의 논문을 많이 참조하고 참고문헌으로 기술.
  - 시스템이 연구자의 피인용수를 올리는 편법인지, 연구자가 비용감수를 불구하고 연구생태계의 성장을 위해 타연구자들에 대한 기여인지 각각 장,단점이 존재함.


## 논문과 영어
---
Reviewer Comment를 받아보면 은근히 영어에 관련된 내용이 많다. 예를들면, "당신히 작성한 영어는 도저히 이해가 안된다. 문장에 약간의 실수들이 있다. 하지만 연구내용이 독창적이고, 관련분야에 기여도가 클것으로 판단한다. 내가 지적한 영어 문장들만 좀 수정해서 다시 보내라." 같은 첨삭을 받게된다. 이렇듯 영어로 발생한 문제를 해결하기 위한 영어 기반의 탬플릿 또는 예시를 Tip으로 정리해본다. 

* __Cover Letter 작성 예시__
  > 
  > Cover letter for submission of our original paper to 저널명  
  > 교신저자명  
  > 저자주소  
  > Date:  

  > Dear Sir,  
  > I wish to submit a new manuscript entitled “논문제목” for consideration by “저널명”.

  > I do confirm that this work is original and has not been published elsewhere nor is it currently under
  > consideration for publication elsewhere.

  > <u>
  > In this paper, I report on the performance improvement of the MSF seawater desalination process. 
  > This will be significant because the production cost of fresh water can be reduced by the brine 
  > re-utilization of the upstream evaporators. The paper should be of interest to readers in the areas of 
  > process and energy saving.

  > I am sure that the submitted paper will provide very useful information to the engineers related with 
  > the vacuum distillation and multi-stage evaporation process.
  > </u>

  > Thank you for your consideration of this manuscript.

  > Sincerely,  
  > 교신저자명

* __장시간 심사 Status가 변하지 않을때 상태확인을 요청하는 메일작성 예시__
  > Dear Dr. ooo.  
  > 
  > I, along with my co-authors, submitted the manuscript (Manuscrpt #) entitled "(Manuscript Title)" 
  > for publication in (Journal Title) as an original paper in Oct., 13, 2016 (Submission Date).
  >
  > Today, we realized that current status/date of the manuscripts has not been changed since 
  > we initially submitted the manuscript.
  > 
  > We are very concerned about the delay of the review process by an error in the review and tracking system. 
  > We would like to ask you to confirm current status of the manuscript.
  > 
  > We look forward to hearing from you.

* __Review Comment 예시__  
  > Reviewer Comment on the manuscript: Heat Pump Seawater Distillation System Using Passive Vacuum Generation System (Manuscript Number: DES-D-16-00704)
  >
  > The submitted article requires a lot of time and patience to the reviewer.  
  > 1. In the scientific or engineering article, the perfect English is not important Although some mistakes in English writing are done in the manuscript it will be good if the authors meanings can be sufficiently transferred to the readers. However, in the submitted article, there are too many awkward English writing.
  >    
  > 2. The words included in the manuscript are about 3000. It is not appropriate for the full length artide. Rather than it will be suitable to the short communication.
  > 
  > However those defaults do not degrade the originality and the novelty of the submitted article. In the reviewers opinion, the submitted artide should be totally re-written and revised, which means that the reviewer's decision is the major revision. If the fully revised article is submitted the reviewer is wiling to re-review again.
  > 
  > The following table is the detailed comment by the reviewer. Although the reviewer knows that some comments would be not proper from the author's viewpoint, it will be useful to improve the authors manuscript for the next submission.
  >
  >  |No|Page|Original Sentence|Comments|
  >  |01|1|in abstract The passive systems that generate vacuum is a reliable systems and could allow heat pumps that uses traditional refrigerant to be used in seawater distillation process by reducing the Saturation temperature of seawater to be matched with the... | Not so easy to understand. Separate the sentence. |

* 출처 : [칼있으마님의 블로그](https://blog.naver.com/choi_s_h)  
영어로 논문을 읽고 작성하는 과정에서 유용한 템플릿이 생길때마다 계속 업데이트 예정이다.

