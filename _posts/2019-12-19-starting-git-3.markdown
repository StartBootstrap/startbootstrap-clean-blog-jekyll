---
layout: post
title: Git 명령어 정리
date: 2019-12-19 00:00:00 +0300
description: # Add post description (optional)
tags: [Git] # add tag
categories: [Git] # add categories
---

포스팅은 못했지만 계속해서 동료들과 객체 지향 설계를 공부하고 있다. 이번 연습과제를 잘 마치면 포스팅해보도록 해야겠다. gitignore의 존재는 알았지만 사용하진 않았는데, 오늘 알게되어 정리해두려고 한다.<br>

`.gitignore` 파일을 우선 생성했다. 위치는 해당 프로젝트의 최상위.<br>
나는 intellij 에서 생성하는 각종 디렉토리, 파일등을 아래처럼 등록했다.
```
.gradle
/build/
*/build/
.gitignore
```

그런데 파일을 등록할 뿐 이미 원격저장소에 올라간 파일들이 지워지진 않는다.<br>
이때 로컬 저장소에는 남기고 원격저장소의 파일을 지우는 명령어(`--cached`)를 찾았다.<br>
```
$ git rm -r --cached 파일명 또는 디렉토리
$ git add *
$ git coomit -m "커밋메시지"
$ git push 
```
위와 같이 진행하면 원격저장소의 데이터만 지워진다.<br>

여기서 `git rm` 을 통해 잘못된 파일을 삭제했을 때는 `git reset HEAD` 를 통해 아직 로컬저장소의 `HEAD` 안에 머물고있는 데이터를 원복시킬 수 있다.