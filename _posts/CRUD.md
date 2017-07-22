---
layout:     post
title:      "CRUD"
date:       2017-07-20 17:00:00
author:     "신윤기"
header-img: "img/post-bg-02.jpg"
---

# CRUD

##R
1. queryset은 받아서 queryset을 돌려준다(chainig 가능>filter에 and쓰는 것과 동일)

2. queryset에서 제목을 보이게 하고 싶으면 
model에 가서 str만들기
post>>>str(post)>>>post.__str__()
(ModelClass의 메소드로 __str__이 있으니까 파이썬 클래스랑 다를게 없다!)

3. filter쓸 때 and 조건은 편한대로 or조건은 import Q해서 | 쓰기

4. filter만으로는 진짜 query를 보내지 않고 lazy하게 하다가
마지막에 접근,출력,순회 등 어떤 동작이 있을 때에서야 보여줌


5. 기본정렬 순서
Model class 안에 class meta 설정
queryset에서 filter 할 수도 있지만 그렇게 하면 매번 번거로우니까!

6. 검색기능 구현
```python
<form action="" method="get">
    <input type="text" name="q" value="{{ q }}" />
    <input type="submit" value="검색"/>
</form>
```

7. queryset slicing
역순 슬라이싱은 안되고 oreder by 로 반대로 한 다음 슬라이싱 해야함

8. queryset에서 fetch하는 법
get은 1개!
index는 잘 안 쓴다
다수는 for in 구문으로!

queryset.get은 해당되는 데이터가 1개이기를 기대

qs.first()
qs.last()는 doesnotexist예외가 아니라 None을 반환

##C
Create를 하는 방법
1. modeinstance를 생성해서 생성자에 필요한 속성 다 넘겨주고 save
2. ModelManager의 create

##U
Update를 하는 방법
1. 모델 인스턴스를 fetch한 뒤, 필요한 속성하고 모델instance의 save를 통해 저장!

다수를 하고 싶다면 순회를 해서 인스턴스 다 불러내서 save 실행

2. Queryset의 update할 값을 일괄적으로!
개수가 많다면 queryset의 update함수를 사용하는 것이 낫다
```python
queryset = Post.objects.all()
queryset.update(tags="Python, Django")
```

##
Delete를 하는 방법
1. 모델 인스턴스를 불러와서 delete를 함
2. queryset의 delete함수를 활용

##
Debug toolbar 설치
1. pip install로 설치 후
2. installed app에 등록
3. middleware에 등록하고
internal ips 만들어서 setting에 작성
4. url에 패턴 추가
(settings에 Debug가 TRUE, 실제 서비스에서는 False)
5. template에 body태그가 없으면 debug toolbar가 보이지않는다!


**TIP! requirements.txt 만들어서 library목록 저장해놓으면 나중에
```requirements.txt
django==1.10.5
django-debug-toolbar
django-extensions
ipython[notebook]

`pip install -r requirements.txt`로 한번에 개발환경 설치 가능**
