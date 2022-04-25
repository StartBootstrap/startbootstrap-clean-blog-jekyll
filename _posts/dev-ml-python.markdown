---
layout: post
title:  "[Basic] Python 핵심 정리"
subtitle:   "Insight, back to basics"
categories: dev
tags: ml data science insight analysis basics modeling practice
comments: true
---

## 개요
> 프로그래밍의 기본을 숙지한다는 전제하에, 다른 언어에 비해 Python만이 가지는 `차이점`에 초점을 맞춰 핵심만 정리한 포스팅입니다.

* 목차
	- [Python 핵심 정리](#) 


## Python 핵심 정리 
---
* 기본 특징 
  - Python은 데이터 처리에 강점을 가진다. 데이터를 모은다. 셋 혹은 N차원으로 다룬다. 덕분에 filter-map-reduce, 벡터, 행렬을 사용할 수 있다.
  - 쉽다. 정확히는 머리속에 떠오르는 알고리즘의 이식에 있어 편의를 제공한다.(문법과 패턴이 준비되어 있다.) 기존 C, Java 언어에 익숙한 사람들은 되려 선입견 때문에 익히기 어려운 기능도 있다. 본 포스팅은 Java 등에서 보기 어려웠던 문법과 기능을 위주로 소개한다.

* 기본 기능 
  - 대소문자 구분 / complex type(복소수형) 존재 / 

* 연산자
  - 비교문 우선순위 : 괄호 > not > and > or 
  - 나머지(%), 거듭제곱(**), 

* 변수와 데이터셋
  동적 프로그래밍에는 변수의 데이터형(type)이 없기 때문에 값이 의해 데이터 형이 정해진다. 
  - 데이터의 모음인 데이터셋은 리스트, 딕셔너리, 튜플, 셋 4가지가 존재. 
  - 데이터셋의 초기화 : 값은 없지만 형을 지정하고 싶을 때 기호 혹은 함수를 활용.
  ```python 
  a = "test" # 일반변수(숫자, 문자, boolean 등)는 값에 의해 형이 정해진다.
  a = [] # 리스트 : 여러형 가능, .append(), .extend(), .remove(), len() 가능
  a = {} # 딕셔너리 : key-value, .items(), .keys(), .values() 가능
  a = () # 튜플
  a = set() # 셋(집합) : 값이 존재할 경우 {}으로 선언, 합-교-차집합 가능(|,&,-), 

* 슬라이스(Slice)
  - 문자열, for, Numpy array, pandas.loc 등에서 활용
  - ```python
    "Python"[-1:] # 결과 : 'n' # -1인덱스(시작이상) ~ 0인덱스(끝미만)
    ```
    |  | P |  | y |  | t |  | h |  | o |  | n |  |
    | 0|   | 1|   | 2|   | 3|   | 4|   | 5|   | 6|
    |-6|   |-5|   |-4|   |-3|   |-2|   |-1|   |  |
    
  - 

* 딕셔너리 변환
  ```python
  dic.keys() # [key1,..keyN]
  dic.values() # [value1,..valueN]
  dic.items() # [(key1,value2),..(keyN,valueN)]
  ```

* 함수
  함수를 만들면 동일한 기능을 재사용할 수 있다. 모든 특징이 다 들어간 아래의 함수 하나를 구현해본다. 하나만 익혀두면 모든 함수의 기능을 해석할 수 있다.
  ```python
	# 선언부
	def test(x, y=10):  # 기본인자 : 인자값 지정 가능, 뒤에 일반 파라미터 지정 불가.
		if(x > y):
			return # 값을 지정하지 않으면, None 리턴
		a = x + y
		b = x - y
		return a, b # 다중값 리턴 가능

	# 호출측
	a = test(y=5, x=1) # a=None
	a = test(y=5, x=10) # a=(6, -4)
	a, b = test(y=5, x=10) # a=6, b=-4
  ```


## Jupyter Notebook 
---

* 함수 도움말


