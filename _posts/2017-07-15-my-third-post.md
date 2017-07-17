---
layout:     post
title:      "Django 처음 시작 하기"
date:       2017-07-17 17:00:00
author:     "신윤기"
header-img: "img/post-bg-02.jpg"
---

# Django 프로젝트 첫 시작
cmd 창을 켜서 다음을 입력  
```
python manage.py startapp blog
```

## 앱을 프로젝트에 등록
blog의 상위 디렉토리에 있는 settings파일에 blog를 installed app으로 등록
```python
#askdjango/settings.py  
INSTALLED_APPS = [  
      'django.contrib.admin',  
      'django.contrib.auth',  
      'django.contrib.contenttypes',  
      'django.contrib.sessions',  
      'django.contrib.messages',  
      'django.contrib.staticfiles',  
      'blog',  
    ]
```  
*Tip: blog 등록하고 `,`를 꼭 쓸 것
(나중에 다른 앱 등록 시에 오류 나지 않도록 해줌)*

## views 파일에 들어가서 함수 정의해줄 것
```python
#blog/views.py
def post_list(request):
    return render(request, 'blog/post_list.html')
```

## blog 앱 내에 urls 파일 만들기
```python
#blog/urls.py
from django.conf.urls 에서 import url
from . import views import

```

## urls를 연결시키기
```python
#askdjango/urls.py
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^blog/', include('blog/urls')),
]
```

##blog 밑에 template/blog 만들고 template 파일 만들기
```html
#blog/templates/blog/post_list.html
<h1>Askdjango</h1>
<p>안녕하세요. 여러분의 파이썬/장고 페이스메이커가 되겠습니다</p>
<li><a href="http://localhost:8000/blog/"></a>주소로 접속해보세요</li>
<li>템플릿 경로를 다음과 같이 설정하는 이유는 후에 설명합니다.</li>
```
*Tip: templates이 반영 안 되면 서버 다시 띄우기*

### 본 포스트는 nomade.kr의 강의를 정리한 내용입니다










