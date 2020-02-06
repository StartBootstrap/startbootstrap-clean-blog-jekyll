---
layout: post
title: 사용하면서 익힌 Git 내용정리
subtitle: 간단한 git 내용(명령어)을 정리해봅시다.
date: 2019-12-19 00:00:00 +0300
description: # Add post description (optional)
tags: [git] # add tag
categories: [git] # add categories
---

git을 사용하면서 알게된 내용등을 정리해보자.  

##### 1. gitignore  
[.gitignore](https://git-scm.com/docs/gitignore) 을 먼저 살펴보자면 아래와 같다.  
나는 intellij 에서 생성하는 각종 디렉토리, 파일등을 아래처럼 등록했다. 필요한 소스 외에는 모두 등록했다.

```
.gradle
/build/
*/build/
!gradle/wrapper/gradle-wrapper.jar
*/out/

*.log
*/*.log
default.xml
default-aegnt.xml
mybatis-config.xml
MANIFEST.MF

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
.idea/
*.iws
*.iml
*.ipr
/out/

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/

### DEFAULT ###
log/
classes/
```
<br>

##### 2. 원격 저장소에만 존재하는 데이터 지우기  
gitignore 파일을 등록해도 이미 원격저장소에 올라간 파일들이 지워지진 않는다.  
이때 로컬 저장소에는 남기고 원격저장소의 파일을 지우는 방법은 아래처럼 하면된다.
```
$ git rm -r --cached .
$ git add *
$ git commit -m "커밋메시지"
$ git push 
```
위와 같이 진행하면 원격저장소에만 있는 모든 데이터를 지운 뒤 로컬저장소의 데이터를 다시 추가하는데, 이렇게하면 gitignore에 등록된 파일만 삭제가 된다.<br>
<br>

##### 3. git add 취소하기  
아래 명령어로 아직 로컬저장소의 `HEAD(마지막 커밋 스냅샷, 다음 커밋의 부모 커밋)` 안에 머물고있는 데이터를 원복시킬 수 있다.  
```
$ git reset HEAD [file]
```
<br>

##### 4. git commit 확인 및 취소하기  
```
# commit 목록 확인
$ git log

# 1. commit을 취소하고 해당 파일들을 staged 상태로 워킹 디렉터리에서 보존
$ get reset --soft HEAD^

# 2. commit을 취소하고 해당 파일들을 unstaged 상태로 워킹 디렉터리에서 보존
$ get reset --mixed HEAD^
$ get reset HEAD^

# 3. commit을 취소하고 해당 파일들을 unstaged 상태로 워킹 디렉터리에서 삭제
$ get reset --hard HEAD^
```
<br>

##### 5. commit에 빠뜨린 파일을 commit 하기  
커밋을 했는데 Stage 하는 것을 깜빡하고 빠트린 파일이 있으면 아래와 같이 고칠 수 있다.
```
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```
<br>

### 참고자료
[2.4 Git의 기초 - 되돌리기](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EB%90%98%EB%8F%8C%EB%A6%AC%EA%B8%B0), [7.7 Git 도구 - Reset 명확히 알고 가기](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0#_git_reset)