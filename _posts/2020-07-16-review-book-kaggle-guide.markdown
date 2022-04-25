---  
layout: post  
title: "[리뷰] 캐글 가이드"  
subtitle: "전 세계 데이터 과학자와 소통하고, 경쟁하고, 성장하기"  
categories: review  
tags: review book kaggle 데이터 과학 경진대회 notebook 
comments: true  
header-img: img/review/2020-07-16-review-book-kaggle-guide-1.png
---  
  
> `동양북스` 출판사의 `"캐글 가이드(사카모토 도시유키 저/박광수 역)"`를 읽고 작성한 리뷰입니다.  

![표지](https://theorydb.github.io/assets/img/review/2020-07-16-review-book-kaggle-guide-1.png)  

---

본 도서는 `캐글 사용법`을 다룬 안내서이다.

캐글 마스터가 되기 위한 데이터 과학 기법을 깊이있게 분석한다거나 최신 기술을 연구 및 구현하는 책이라기 보다는, 캐글의 전반적인 메뉴를 전부 훑어보고 다른 과학자들과 소통하는 방법을 살펴보며 마스터가 되기 위한 절차 및 캐글의 분위기나 문화를 엿보는 구성 등으로 이루어져있다. 

특히 `저자와 함께 경진대회에 참여하여 점수와 순위를 높여보는 실습 과정`은 본 도서의 백미라 할 수 있다. 

이 책은 크게 3개의 파트로 구성되어 있으며, 각각 `캐글 플랫폼`에 대한 설명, `노트북`의 활용법, `경진대회 및 마스터`가 되는 방법을 다루고 있다.

파트별 내용을 아래와 같이 간략히 요약해본다.

---

* [캐글](https://www.kaggle.com/) 플랫폼 소개  
  + 메뉴 소개  
    - 데이터 과학 경진대회 플랫폼으로 구글에서 인수했다. 약 15만명이 활동중이다.
    - Compete : 현재 진행중이거나 과거 진행했던 경진대회 목록
    - Data : Dataset 모음
    - Notebooks : 과거에는 커널로 불리웠음. 실제 경진대회를 위한 코드 모음
    - Discuss  
      + Forum : 일반적인 데이터 과학 주제에 관한 토론
      + Topic : 경진대회와 관련된 토론
      + Getting Started : 초보자들을 위한 공간
      + Q & A : 질의응답
      + Learn : 캐글 데이터 과학 강의에 대한 질의응답
      + Product Feedback : 캐글 플랫폼에 대한 건의사항
    - Courses : 데이터 과학에 관련된 강좌 및 교육
    - More  
      + Jobs : 데이터 과학자 구인구직
      + 그 외 랭킹, 블로그 등
    ![Jobs](https://theorydb.github.io/assets/img/review/2020-07-16-review-book-kaggle-guide-2.png)  

  + 경진대회 종류   
    Compete > All Competetions > All Categories를 선택하면 다양한 카테고리의 경진대회 리스트가 등장한다.
    - Getting Started : 초보자 연습용 / 필기체 숫자 인식, 타이타닉 생존 예측 등
    - Playground : 놀이터. 흥미로운 문제 위주 
    - Traveling Santa : 수학 알고리즘으로 문제 해결 (순회, 최단경로 문제 등)
    - NCAA ML Competition : 전미 대학 체육 협회 관련 경기 결과 예측
    - ImageNet Object Localization Challenge : 연구용 경진대회
    - Ciphertext Challenge : 암호문 해독 도전 
    - Predicting Molecular Properties : 물리학 데이터 경진대회 (원자 사이 자기 상호작용 예측 등)
    - NFL Punt Analytics : 미식축구협회 경진대회. 개선안을 제안. 프레젠테이션을 제출. 심사위원이 결정
    - Generative Dog Images : GAN. 강아지 사진 그리기 경진대회. 프로그래머가 2단계 심사

  + 활용방법  
    - 회원가입, Courses 수강
    - 캐글러 등급  
      Novice > Contributor > Expert > Master > Grandmaster(최고등급)
      ![Level](https://theorydb.github.io/assets/img/review/2020-07-16-review-book-kaggle-guide-3.png)  
    - 메달 획득 방법  
      + 경진대회 : 경진대회 10% 내 동메달, 5% 내 은메달, 상위10팀+0.2% 내 금메달
      + Datasets, Notebooks : 5 Votes 동메달, 20 Votes 은메달, 50 Votes 금메달
      + Discussion 메달 : 1 Votes 동메달, 5 Votes 은메달, 10 Votes 금메달
    - 등급 상향 조건  
      ![Level](https://theorydb.github.io/assets/img/review/2020-07-16-review-book-kaggle-guide-5.png)  
    - `컨트리뷰터 등급` 오르기  
      + 튜토리얼을 완료한 등급으로 주요서비스를 모두 사용하면 됨
      + Profile : 이름, 직업, 소속, 거주지, 휴대폰, Bio(자기소개) 입력
      + Discuss > Forums > Getting Started > New Topic 으로 새 게시물 올리기
      + UpVote 추천하기 + Reply 답장 작성
      + `경진대회` 참가하기   
        - 경진대회 검색어 : Digit Recognizer in:competitions 
        - 상단 Notebooks 클릭 > Chainer-MNISTClassifier-base 노트북 선택 (저자작품) > Copy and Edit(Fork Kernel) > Save Version 클릭 > Save & Run All(Commit) 선택 후 Save
        - 뒤로가기(메인메뉴) > 우측 상단 My Profile 클릭 > Notebooks 메뉴에서 방금 복사한 노트북 확인 가능 > 우측 Output 클릭 > submission.csv 선택 > Submit 클릭 > Leaderboard 페이지 자동이동 > Jump to your position on the leaderboard 클릭하면 순위 확인 가능
        - 본 예제 코드를 설명 후, 정확도를 2단계 더 높여 순위를 갱신하는 과정 안내

---

* `노트북` 활용법  
  + 공개된 노트북에 댓글 및 추천 기능으로 캐글러끼리의 교류가 가능
  + 커널타입 : 스크립트 타입(선택한 코드만 실행 시 Run > Run Selection 클릭)과 노트북 타입
  + 경진대회 이름으로 명명한 디렉토리를 지정하여 파일을 위치시킬 것
  + 우측 상단의 Share 클릭 시 공개 / 비공개 설정 가능
  + 그 외 우측 Setting 메뉴를 통해 인터넷 접속 여부 등 다양한 옵션 설정이 가능
  + Dataset 업로드 : Data > +New Dataset > Enter Dataset Title > Select Files to Upload 클릭
  + 좌측 하단 Console 버튼을 클릭하면 pip install 명령어를 통해 외부 패키지 추가 가능 (!기호 활용)

---

* 경진대회 및 마스터 되기  
  + 노트북의 발전 과정  
    - 베이스라인 > 데이터 분석 > 포크 > 병합
    - 예) Jigsaw Unintended Bias in Toxicity Classification 경진대회의 `7개 발전 흐름`
      ![Level](https://theorydb.github.io/assets/img/review/2020-07-16-review-book-kaggle-guide-4.png) 
    - 프라이빗 리더보드는 머신러닝 알고리즘의 역사를 공부할 때 유용
  + 규칙 확인하기 : 피처 그룹에 따른 가중치 적용, 리더보드 점수 1일 확인가능 횟수, 노트북 전용 경진대회 유무(인터넷 및 외부 데이터 사용 불가) 등
  + 데이터 꼼꼼히 살펴보기 : ex) Santander Value Prediction Challenge  
    - 행보다 열이 더 많다. 64%의 특정 열을 삭제해도 점수가 변하지 않음을 발견
    - 종속변수 누설이 발견되기도 함
  + [입상한 솔루션 한번에 살펴보기](https://github.com/interviewBubble/Data-Science-Competitions)
  + 파일 용량 제한 : 20GB
  + Kaggle API : 로컬컴퓨터에 연결가능  
    - API 설치 > API 토큰 json 다운로드 
    - 주요 `명령어`
      ```python
      $ kaggle competitions list # 경진대회 목록
      $ kaggle competitions download 경진대회이름 # 경진대회 파일 다운로드
      $ kaggle competitions submissions 경진대회이름 # 리더보드 점수 확인
      $ kaggle competitions submit -f submissions.csv -m "메시지" 경진대회이름 # 제출
      $ kaggle kernels output ID/노트북이름 # 실행 결과 다운로드
      ```
  + 유용한 라이브러리 : LightGBM, fast.ai

---

개인적으로 캐글을 사용한지는 2년이 넘었는데도 책에서 워낙 상세한 기능과 Tip을 소개한 덕분에 그동안 모르고 있던 Tip들을 상당수 챙길 수 있었다.

위에 요약된 사항을 훑어보면 책에서 대략 어떤 내용을 다루는지 확인할 수 있을 것이다. 요약 내역들은 극히 큰 흐름만 정리해보았기에 내용이 어려울 수 있으나 실제 도서에는 각 단계 과정 하나하나 자세한 설명과 더불어 스크린 샷이 캡쳐되어있어 매우 쉽게 따라할 수 있다.

개인적으로 본 도서 최고의 백미는 `노트북의 발전 과정`을 설명한 파트이다. 캐글을 알고 나서 노트북의 일반적인 발전 흐름을 이해하는데 반년은 걸린 것 같다. 아무래도 캐글 플랫폼의 글 대다수가 원어로 되어있다보니 읽는데 시간이 걸리고 읽어도 전체 흐름이 잘 파악되지 않는다. 

한창 경진대회에 참여하다보니 노트북이 저런 흐름대로 공개된 사실을 알게 되었는데 경진대회에 처음 참여하는 사람이라면 본 도서가 엄청난 시행착오와 시간을 줄여줄 것이다. 더불어 Review 논문을 작성하듯이, `머신러닝 기술의 발전과정을 한 눈에 정리`할 수 있는 좋은 계기가 될 것이다.

또 다른 눈에 띄는 장점으로는 중간에 3개 정도의 예제를 통해 `저자를 따라 경진대회에 참여할 수 있다`는 점을 들고 싶다. 특히, Digit Recognizer in:competitions 경진대회의 경우 저자가 작성한 코드와 개념도 상세히 분석하고 2번의 개선 과정을 통해 `총 3회에 걸쳐 점수를 높이는 과정`에서 캐글에 대한 감을 90% 이상 익힐 수 있을 것이라 본다.

그 외 캐글 플랫폼에 대한 설명이 거의 하나도 `누락없이` 설명되어있다는 점, 각 단계의 설명은 초등학생도 따라할 수 있을 정도로 `상세한 설명`과 더불어 `시각 자료`로 이해를 돕는다는 점에서 높은 점수를 주고 싶다.

캐글에 관한 책은 시중에 많지 않다. 머신러닝 알고리즘과 데이터 과학 자체에 집중하기도 충분히 바쁘고 어렵기 때문에 캐글에 처음 참여하는 분은 이 책을 통해 캐글을 시작한다면 상당히 많은 시간을 절약함과 동시에 매우 편하게 경진대회에 참여할 수 있을 것이다. 

캐글 입문자 혹은 활용 방법의 난이도에 막혀 중도 포기하신 분께 강력히 추천한다.


* [책소개 - 캐글 가이드](http://www.yes24.com/Product/Goods/90964592?scode=032&OzSrank=1)


