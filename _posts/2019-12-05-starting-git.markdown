---
layout: post
title: Git 기초정리
date: 2019-12-05 00:00:00 +0300
description: # Add post description (optional)
tags: [Git] # add tag
categories: [Git] # add categories
---

사내에서 따로 Git이나 분산 버전 관리 시스템을 사용하지 않는다.. 사수는 아니지만 친하게 지내면서 많이 도와주시고 매사 긍정적이신 대리님~~(보고계십니까..?)~~의 권유로 같이 객체지향 설계 공부를 시작하기로 했다. 혼자 Github 블로그 포스팅 할때나 간단히 사용했었지만 이번에 정말 기초부터 다시 공부하며 남겨놓으려 한다.

# Git 저장소 만들기

새로운 저장소 만들기<br>
`$ git init`

새로 만든 디렉토리나 이미 파일이 있는 디렉토리에서 `git init` 명령을 실행하면 Git은 데이터를 저장하고 관리하는 `.git` 디렉토리를 만든다. 이 디렉토리를 복사하기만 해도 저장소가 백업 된다. [Git의 내부](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EB%82%B4%EB%B6%80-Plumbing-%EB%AA%85%EB%A0%B9%EA%B3%BC-Porcelain-%EB%AA%85%EB%A0%B9#ch10-git-internals)

Git이 파일을 관리하게 하려면 저장소에 파일을 추가하고 커밋해야 한다. `git add` 명령으로 파일을 추가하고 `git commit` 명령으로 커밋한다:
```
$ git add LICENSE
$ git commit -m 'initial project version'
```

### 기존 저장소를 Clone 하기
다른 프로젝트에 참여하려거나(Contribute) Git 저장소를 복사하고 싶을 때 `git clone` 명령을 사용한다.
`git clone` 을 실행하면 프로젝트 히스토리를 전부 받아온다. 실제로 서버의 디스크가 망가져도 클라이언트 저장소 중에서 아무거나 하나 가져다가 복구하면 된다. (서버에만 적용했던 설정은 복구하지 못하지만 모든 데이터는 복구된다. [자세히](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-%EC%84%9C%EB%B2%84%EC%97%90-Git-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0#_getting_git_on_a_server))

`git clone <url>` 명령으로 저장소를 Clone 한다. `libgit2` 라이브러리 소스코드를 Clone 하려면 아래과 같이 실행한다.

`$ git clone https://github.com/libgit2/libgit2`<br>
이 명령은 “libgit2” 라는 디렉토리를 만들고 그 안에 .git 디렉토리를 만든다. 그리고 저장소의 데이터를 모두 가져와서 자동으로 가장 최신 버전을 Checkout 해 놓는다. libgit2 디렉토리로 이동하면 Checkout으로 생성한 파일을 볼 수 있고 당장 하고자 하는 일을 시작할 수 있다.

아래과 같은 명령을 사용하여 저장소를 Clone 하면 `libgit2`이 아니라 다른 디렉토리 이름(`mylibgit`)으로 Clone 할 수 있다.<br>
`$ git clone https://github.com/libgit2/libgit2 mylibgit`


# Git 수정하고 저장소에 저장하기
워킹 디렉토리의 모든 파일은 크게 `Tracked(관리대상임)`와 `Untracked(관리대상이 아님)`로 나눈다.

`Tracked` 파일은 이미 스냅샷에 포함돼 있던 파일이다. Tracked 파일은 또 Unmodified(수정하지 않음)와 Modified(수정함) 그리고 Staged(커밋으로 저장소에 기록할) 상태 중 하나이다. 간단히 말하자면 Git이 알고 있는 파일이라는 것이다.

그리고 나머지 파일은 모두 `Untracked` 파일이다. `Untracked` 파일은 워킹 디렉토리에 있는 파일 중 스냅샷에도 Staging Area에도 포함되지 않은 파일이다. 처음 저장소를 Clone 하면 모든 파일은 Tracked이면서 Unmodified 상태이다. 파일을 Checkout 하고 나서 아무것도 수정하지 않았기 때문에 그렇다.

마지막 커밋 이후 아직 아무것도 수정하지 않은 상태에서 어떤 파일을 수정하면 Git은 그 파일을 Modified 상태로 인식한다. 실제로 커밋을 하기 위해서는 이 수정한 파일을 Staged 상태로 만들고, Staged 상태의 파일을 커밋한다. 이런 라이프사이클을 계속 반복한다.

![](https://papion93.github.io/img/lifecycle.png)<br><br>

### 파일의 상태 확인하기
```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```
위의 내용은 파일을 하나도 수정하지 않았다는 것을 말해준다.<br>
`Tracked` 파일은 하나도 수정되지 않았다는 의미다. `Untracked` 파일은 아직 없어서 목록에 나타나지 않는다. 그리고 현재 작업중인 브런치도 알 수 있다. [Git 브랜치](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EB%B8%8C%EB%9E%9C%EC%B9%98%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80#ch03-git-branching)

### 파일을 새로 추적하기
```
$ echo 'My Project' > README
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add file..." to include in what will be committed)

    README
nothing added to commit but untracked files present (use "git add" to track)
```
프로젝트에 READEME 파일을 생성해보자. README 파일은 새로 만든 파일이기 때문에 `git status` 를 실행하면 `Untracked files`에 들어 있다. Git은 `Untracked` 파일을 아직 스냅샷(커밋)에 넣어지지 않은 파일이라고 본다.

`$ git add README`<br>
위 명령 후 `git status`로 확인하면 README 파일이 `Tracked` 상태이며 커밋에 추가될 `Staged` 상태라는 것을 확인할 수 있다.

* git add 명령은 파일을 새로 추적할 때도 사용하고 수정한 파일을 Staged 상태로 만들 때도 사용한다. Merge 할 때 충돌난 상태의 파일을 Resolve 상태로 만들때도 사용한다. add의 의미는 프로젝트에 파일을 추가한다기 보다는 다음 커밋에 추가한다고 받아들이는게 좋다. git add 명령을 실행하여 CONTRIBUTING.md 파일을 Staged 상태로 만들고 git status 명령으로 결과를 확인해보자.


### 파일 무시하기
`.gitignore` 파일에 등록하여 관리하지 않는다. [예제](https://github.com/github/gitignore)


### 변경사항 커밋하기
수정한 것을 커밋하기 위해 `Staging Area`에 파일을 정리했다. `Unstaged` 상태의 파일은 커밋되지 않는다는 것을 기억해야 한다. Git은 생성하거나 수정하고 나서 `git add` 명령으로 추가하지 않은 파일은 커밋하지 않는다. 그 파일은 여전히 `Modified` 상태로 남아 있다. 커밋하기 전에 `git status` 명령으로 모든 것이 `Staged` 상태인지 확인할 수 있다. 그 후에 `git commit` 을 실행하여 커밋한다.<br>


여기까지 정말 기본적인 Git 기초를 봤다. 기초적인 내용은 더 있지만 이 외에는 필요할 때 찾아 알아두면 될거 같고 당장 필요한 내용을 다음 포스팅으로 보겠다.

