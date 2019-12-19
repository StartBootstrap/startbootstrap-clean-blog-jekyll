---
layout: post
title: Git 협업맛보기(Pull Request 후기)
date: 2019-12-05 00:00:00 +0300
description: # Add post description (optional)
tags: [Git] # add tag
categories: [Git] # add categories
---

이번에 동료들과 같이 해볼 스터디 환경에 제일 필요한 것 Pull Request. Git 환경 구성하면서 시행착오가 좀 있었는데 포스팅해보겠다.<br>
대리님은 계속 PR, 풀리퀘스트.. 지금 보면 Pull + Request 라고도 표현했다. 내 돌대가리는 전혀 알아먹을 생각이 없었는지...한참 후에 이 대사를 보고 깨닳았다.

`'회사 기술블로그 repository를 포크떠서 후기 작성하시고 저한테 PR 보내주세요.'`<br>
[git 초보를 위한 풀리퀘스트(pull request) 방법](https://wayhome25.github.io/git/2017/07/08/git-first-pull-request-story/) ..감사합니다....

실무에서 어떻게 쓰는건지 상황파악이 되다보니 쉽게 이해가 되면서도, 다른 사람들은 재밌게 일하는 것 같단 생각이 들었다. 이 기능을 사용하는 환경에서는 코드리뷰는 물론, 어떻게 협업하는 환경일지 궁금하다. 여튼 모르는 사람들도 저 대사를 보면 이해가 확 되지 않을까..

### 1. Fork
타겟이 되는 프로젝트를 일단 Fork 해오자. 내 github에 정상적으로 Fork되면 다음 진행.

### 2. Clone, remote, branch
- 내 로컬저장소에 Fork 해온 저장소를 Clone 하자.<br>
`$ git clone https://github.com/내계정/프로젝트명`<br>

- 내 github 저장소로 올리고 난 후 Pull Request 한다.<br>
`$ git remote add 별명 https://github.com/내계정/프로젝트명`<br>

- branch 생성과 동시에 해당 branch로 진행<br>
`$ git checkout -b 브랜치명`<br>

### 3. add, commit, push
- 소스 수정 작업 진행 후 add, commit<br>
`$ git push <remote 별명> <브랜치명>`<br>
remote 를 원본원격지로 했을 때 push를 하면 아래와 같이 permission 오류가 났다.
```
remote: Permission to */* denied to *.
fatal: unable to access 'https://github.com/*/*/': The requested URL returned error: 403
```
<br>

### 4. Pull Request
- push가 정상적으로 진행된 후 내 github로 접속해보면 `Compare & pull reqeust` 버튼이 활성화 되어있다.<br><br>

### 5. 관리자는 내가 보낸 `pull request`를 보고 `Merge` 여부를 결정하면 된다.<br><br>

### 6. Merge 후 동기화 및 branch 삭제
- Merge가 확정되면 내 로컬로 소스 동기화`(git pull <remote 별명>)`를 진행한 뒤, `git branch -d <브랜치명>`으로 branch까지 삭제. 추가 작업시 branch 생성부터 반복 작업.