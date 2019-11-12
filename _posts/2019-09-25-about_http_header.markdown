---
layout: post
title: HTTP 헤더 알아보기
date: 2019-09-19 00:00:00 +0300
description: # Add post description (optional)
tags: [web, http, header] # add tag
categories: [WEB] # add categories
---

## 정의. HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 해줍니다.

먼저 HTTP Request에 대해 먼저 알아보자.
요청 메시지는 스펙상 다음과 같이 생겼다.

```
Request-Line
*(( general-header | request-header | entity-header ) CRLF)
CRLF
[ message-body ]
```

Request Line 은 스펙상 [Method SP Request-URI SP HTTP-Version CRLF] 와 같은 형식이다.

1 . Method 의 종류는 OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT, PATCH 등<br>
2 . Request-URI 말그대로 URI 이다. 여기서 URL과 URI의 다른점도 궁금해졌다. 다른 포스트로 간단히 메모하겠다.<br>
3 . 그다음은 HTTP VERSION 이다. HTTP/1.0과 HTTP/1.1 가 있다. 2.0도 있다<br>
4 . CRLF 줄바꿈.<br>

그 다음 헤더의 차례인데 Request 에는 general-header, request-header, entity-header 3종류의 헤더가 있고 필요한 헤더를 사용하면 된다. ( 그렇다면 지정하지 않을 시 헤더없이 전송하는건가? )<br>
추가로 Response 에는 general-header, response-heade, entity-header 3가지이다. general, entity 는 Request와 동일하다.

- General Header : Cache-Control, Connection, Date, Pragma, Trailer, Transfer-Enco, Upgrade, Via, Warning
- Entity Header : Allow, Content-Encoding, Content-Language, Content-Length, Content-Location, Content-MD5, Content-Range, Content-Type, Expires, Last-Modified, extension-header
- Request Header : Accept, Accept-Charset, Accept-Encoding, Accept-Language, Authorization, Expect, From, Host, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Max-Forwards, Proxy-Authorization, Range, Referer, TE, User-Agent
- Response Header : Accept-Ranges, Age, ETag, Location, Proxy-Authenticate, Retry-After, Server, Vary, WWW-Authenticate

결과로 Header 정보는 선택적으로 사용하면 되고, Http Request시 브라우저는 자동으로 생성하는 헤더가 있다.

테스트 - client 에서 curl을 통해 헤더없이 전송하였는데 server에서 출력한 request 헤더 정보는 아래와 같다. curl 또한 마찬가지인 듯 하다.
```
Host: IP:PORT
Accept: */*
Content-Length: 143
Expect: 100-continue
Content-Type: multipart/form-data; boundary=----------------------------33f2aa79ce2a
```

(참조 사이트:https://developer.mozilla.org/ko/docs/Web/HTTP/Headers, https://blog.outsider.ne.kr/888)