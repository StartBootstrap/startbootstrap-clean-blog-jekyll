---
layout:     post
title:      "Model Migration"
date:       2017-07-18 17:00:00
author:     "신윤기"
header-img: "img/post-bg-02.jpg"
---

# Model
1. 모델은 전부 models.Model을 상속받아야함
2. sqlmigrate도 어떻게 할지 보여주지 실제로 하는 것은 아님!
3. 중간 migration만 취소는 불가능-연속적! 따라서 하나만 취소하는 것은 불가능, 새로 수정해서 만들어야 함(앞 마이그레이션에 대해 의존성 있음)
4. blank는 입력, null은 DB에서 
