---
layout: post
title: 웹 동접테스트 서버설정
date: 2019-10-13 00:00:00 +0300
description: # Add post description (optional)
tags: [web, linux] # add tag
categories: [web, linux] # add categories
---

# 서버 튜닝

##### - nginx worker 설정
```
worker_processes            auto;

events {
    worker_connections  8192;
}
```

초당 동접 6500에서 더 상승하지 못하고 클라이언트에서 접속하지 못했고, 서버측은 아래와 같다.

`/vag/log/message` 에서 아래와 같은 오류메시지를 확인했다.<br>
`kernel: nf_conntrack: table full, dropping packet` 

- netfilter는 네트워크에서 발생하는 커넥션에 대해 해당 내용들을 기록하고 추적하기 위한 모듈이다.
- nf_conntrack 모듈이 활성화된 상태에서 연결을 기록하는 table의 크기를(default: 65536) 초과할 경우, 그 이후 수신되는 packet들은 drop되게 된다.

1 . nf_conntrack module 확인<br>
`# lsmod | grep nf_conntrack`

2 . conntrack table 최대 크기 확인<br>
`# cat /proc/sys/net/nf_conntrack_max`


3 . nf_conntrack 현재 접속 카운트<br>
`# watch -d cat /proc/sys/net/netfilter/nf_conntrack_count`

sysctl.conf의 하단에 net.nf_conntrack_max = 원하는 최대치 값<br>
저장후 sysctl -p 로 적용

[참고자료](https://medium.com/naver-cloud-platform/nf-conntrack-full%EB%A1%9C-%EC%9D%B8%ED%95%9C-packet-drop-%EB%8C%80%EC%9D%91-2586146e6714)
