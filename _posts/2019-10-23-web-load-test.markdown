---
layout: post
title: WEB 부하 테스트시 확인할 설정
date: 2019-10-13 00:00:00 +0300
description: # Add post description (optional)
tags: [web, linux] # add tag
categories: [web, linux] # add categories
---

## 환경 : client-쓰레드개수로 컨트롤, server - php-fpm 제외 nginx로만 구성
#### 서버 리소스 확인용

## client config
##### - 해당 user 프로세스 실행 가능 개수 늘려주기

`/etc/security/limits.conf `
```
# nproc - max number of processes
# nofile - max number of open file descriptors

client            soft    nofile          100000
client            hard    nofile          100000
client            soft    nproc           100000
client            hard    nproc           100000
```
* * *
## server config

##### - nginx worker 설정
```
worker_processes            auto;

events {
    worker_connections  8192;
}
```
<br>
##### - 커널 설정

스레드를 6500개에서 더 올라갈때 오류가 발생하였다. 아래와 같이 확인해보았다.

`/vag/log` 에서 아래와 같은 오류메시지를 떨궜는데 구글링해보니 커넥션 개수관련 문제인 듯 하다.
`kernel: nf_conntrack: table full, dropping packet` 

- 대규모 트래픽 서비스시 발생가능해보인다.
- netfilter는 네트워크에서 발생하는 커넥션에 대해 해당 내용들을 기록하고 추적하기 위한 모듈이다.
- nf_conntrack 모듈이 활성화된 상태에서 연결을 기록하는 table의 크기를(default: 65536) 초과할 경우, 그 이후 수신되는 packet들은 drop되게 된다.

1. nf_conntrack module 확인
`# lsmod | grep nf_conntrack`

2. conntrack table 최대 크기 확인
`# cat /proc/sys/net/nf_conntrack_max`

3. nf_conntrack 현재 접속 카운트
`# watch -d cat /proc/sys/net/netfilter/nf_conntrack_count`

sysctl.conf의 하단에 net.nf_conntrack_max = 원하는 최대치 값<br>
저장후 sysctl -p 로 적용

참고 : https://medium.com/naver-cloud-platform/nf-conntrack-full%EB%A1%9C-%EC%9D%B8%ED%95%9C-packet-drop-%EB%8C%80%EC%9D%91-2586146e6714
