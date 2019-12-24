---
layout: post
title: 기술블로그 만들기 - GitHub
subtitle: Jykyll, Github을 통해 첫 블로그 탄생
date: 2019-09-10 00:00:00 +0300
img: software.jpg # Add image post (optional)
tags: [기술블로그, git, jekyll] # add tag
categories: [블로그] # add categories
---

#### - git
- github 첫시작
- 프로젝트 작성해보기
- 내 사이트 세팅하기
- git 다뤄보기

#### - markdown
- HarooPad 사용중

#### - jekylltheme
- 테마 선택완료
- 카테고리 추가할 것

_ _ _

#### 설치 및 세팅
1. [Git 설치](https://git-scm.com/)
2. Git Bash 실행
```
git config --global user.name "깃허브네임"
git config --global user.email "깃허브이메일"
```

3. [[Jekyll] fork](http://jekyllthemes.org/)
- 테마 선택 후 Homepage -> Fork

4. Repository name 수정
5. css 경로 수정

- - -

##### 글 작성
6. [하루패드 설치](http://pad.haroopress.com/)
7. `_post` 디렉토리에 `yyyy-mm-dd-적당한이름.md` 파일 만들고 마크다운으로 작성
- `2019-09-10-first-my-board.md`  의 최종 url `https://papion93.github.io/first-my-board/`
-  파일 상단에 [front matter] 작성.
- layout: post # 레이아웃(필수). `page` 레이아웃을 사용하면 목록에 보이지 않는 글을 쓸 수 있음.
- title: '제목' # 제목(필수)
- author: `lastname.firstname` # 필자(필수).
- tags: `[tag1,tag2,tag3,...]` # 태그 목록(선택). 특수문자없이 사용`#`~~를 실수로 넣었는데 post 클릭 불가..바로 아래 image 404..~~
- categories: `[categories]` # 해당 포스트 카테고리명
- image: http://... # 커버이미지 url(선택)
- date: `YYYY-MM-DD HH:MM:SS` # 발행일(필수)

- - -

#### 글 업로드
8. Git Bash 실행
```
cd d:/ # 설치경로
git clone http://github.com/닉네임/저장소이름
```

9. 7번과 같이 작성
10. 업로드
```
cd papion93.github.io # 저장소로 이동
git status # 파일 상태 확인, 모든 수정된 파일 빨간색 출력
git add * # 커밋할 데이터 지정
git status # 커밋이 가능한 파일들 초록색으로 출력
git commit -m "커밋메시지"
git remote -v # 저장소 확인하기!
git push # 커밋 데이터들 밀어넣기!
```

참고자료: [깃허브 블로그 만들기(1)](https://recoveryman.tistory.com/321?category=635733), [kakao.github.io](https://github.com/kakao/kakao.github.io/blob/master/README.md)
