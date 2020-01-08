---

layout: post
title: [mysql] 서비스중인 대용량 테이블 Update 하기
subtitle: 대용량 테이블의 모든 행을 수정하여 최단시간내 서비스에 적용하기
date: 2020-01-07 00:00:00 +0300
description: # Add post description (optional)
tags: [DB]
categories: [DB]

---

# 대용량 테이블의 암호화된 데이터를 복호화하기

> ALTER TABLE 은 Table Lock 으로 인해 제외
> 임시테이블로 옮긴 뒤 해당 데이터 복호화 -> 원본 테이블의 실시간 Insert, Update, Delete 적용할 수 없어 제외


#### 1. Trigger를 사용하여 원본 테이블의 Insert, Update, Delete 발생시 Log Table로 그 고유번호와 종류를 Insert 한다.

#### 2. 최초 Trigger 실행하여 첫 Insert row의 고유번호를 기준으로 삼아 원본테이블의 데이터를 복호화하면서 해당 row까지 새로운 복호화 테이블로 Insert

#### 3. 해당 row 바로이전까지 Insert를 완료하면 만들어놓은 데몬을 실행하여 Log 테이블에 작성한 변경된 내용을 새로운 테이블에 적용해준다.

#### 4. 소스 배포시에는 데몬이 계속해서 포지션을 따라왔기 때문에 잠시동안만 해당 테이블의 변경사항을 막고, Log 테이블의 데이터를 모두 처리하는 것을 확인하면 테이블명을 변경한다.

#### 5. 완료