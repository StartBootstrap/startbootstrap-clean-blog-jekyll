---
layout: post
title: 웹 동접 부하 테스트
date: 2019-10-13 00:00:00 +0300
description: # Add post description (optional)
tags: [web, linux] # add tag
categories: [web, linux] # add categories
---

# 서버 튜닝

##### nginx worker 설정

```
worker_processes            auto;

events {
    worker_connections  8192;
}
```
- `worker_processes` 는 CPU혹은 CPU Core 의 총 갯수와 동일하게 맞춘다.
 - grep processor /proc/cpuinfo | wc -l CPU 갯수
 - 하지만 보통은 4개 정도가 넘어가면 이미 최대 성능치일 경우가 많다.
- `worker_connections`은 `worker_process`가 받을 수 있는 클라이언트 갯수이다.
 - 총 접속 가능 클라이언트 갯수(MaxClients)는 worker_processes * worker_connections로 지정된다.
 - Reverse Proxy 상태에서는 worker_processes * worker_connections / 4 이 값은 ulimit -n의 결과값(open files)보다 작아야 한다. 필요시 `limit.conf` 튜닝할 것.

##### kernel 설정

초당 동접 6500에서 더 상승하지 못하고 클라이언트에서 아래 메세지를 뱉으며 서버로 접속하지 못했다.
`CURL ERROR:7(Failed to connect to IP: Cannot assign requested address)`


서버측에서 확인결과 동접수가 현저히 줄어들었고,
`/vag/log/message` 에서 아래와 같은 오류메시지를 확인했다.
`Oct 23 15:34:56 MSG2 kernel: __ratelimit: 2291 callbacks suppressed`
`Oct 23 15:34:56 MSG2 kernel: nf_conntrack: table full, dropping packet.`
요청 과부하로 2291의 요청을 수신하지 않았고 packet이 drop 됐다는 것으로 보인다.
이 때문인지 `ifconfig` 에는 `RX overruns` 의 수치만 조금 올라갔다. (dropped 패킷은 발생하지 않았다?)

`overruns : RX overruns is a number of received packets that experienced fifo overruns, caused by rate at which a buffer gets full and kernel isn't able to empty it`
overruns은 커널이 버퍼를 비우는 속도보다 버퍼가 가득 차는 비율로 인해 발생한 것이다.


각설하고 `nf_conntrack` 에 관해 조금 찾아보니 아래와 같다.
- netfilter는 네트워크에서 발생하는 커넥션에 대해 해당 내용들을 기록하고 추적하기 위한 모듈이다.
- nf_conntrack 모듈이 활성화된 상태에서 연결을 기록하는 table의 크기를(default: 65536) 초과할 경우, 그 이후 수신되는 packet들은 drop되게 된다.


해당 문제에 관해 동접을 증가시키려면 아래와 같이 설정이 필요하다. 

1 . nf_conntrack module 확인<br>
`# lsmod | grep nf_conntrack`

2 . conntrack table 최대 크기 확인<br>
`# cat /proc/sys/net/nf_conntrack_max`

3 . nf_conntrack 현재 접속 카운트<br>
`# watch -d cat /proc/sys/net/netfilter/nf_conntrack_count`

`sysctl.conf`의 하단에 `net.nf_conntrack_max = 원하는 최대치 값` 추가<br>
저장후 `sysctl -p` 로 적용


자 이제 다시 부하를 주고 테스트를 했다. 만명의 동접을 원했고 서버측에서 nginx access.log 를 통해 초당 만명의 동접을 확인했으나, 얼마 지나지 않아 같은 현상이 또다시 발생했다. 이 때 수정한 것은 `nginx`의 `Keepalive` 설정이다.

테스트 당시 10으로 설정되어있던 `keepalive` 를 0 으로 수정하여 끄면 발생하지 않는다.
하지만 `keepalive` 는 지속적인 호출이 있는 경우 적절히 사용하는 것이 필요하여 무작정 끌 수 없다. 적절한 시간을 정하는 것이 중요하다.


[네이버 클라우드 플랫폼 - nf_conntrack full로 인한 Packet Drop 대응](https://medium.com/naver-cloud-platform/nf-conntrack-full%EB%A1%9C-%EC%9D%B8%ED%95%9C-packet-drop-%EB%8C%80%EC%9D%91-2586146e6714), [nginx 기본 설정](https://kwonnam.pe.kr/wiki/nginx/performance)
