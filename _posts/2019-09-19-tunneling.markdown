---
layout: post
title: 터널링 서버 세팅(메모)
subtitle: Linux iptables NAT 사용법 기록하기
date: 2019-09-19 00:00:00 +0300
description: # Add post description (optional)
tags: [network, linux] # add tag
categories: [network] # add categories
---

#### 서버 역할: client와 server 통신간 NAT 및 라우팅, client - server 서로간의 정보는 모르게 한다.

##### ex) client(1.1.1.1) -> 터널링서버(eth0-2.2.2.2, eth1-192.168.0.2) -> server(3.3.3.3)


1 . finance Client 중 보안을 위해 전용선을 통한 내부망으로 터널링서버까지 데이터 전송.  
`ex) finance Client(1.1.1.1:30001) => 터널링서버(192.168.0.2:30001)`
<br>

2 . 터널링서버에서 최종 목적지서버로 목적지IP 변경, 소스지IP는 터널링서버IP의 외부IP(2.2.2.2)로 변경하여 데이터 전송  
`ex) 터널링서버(2.2.2.2:30001) => 최종 목적지서버( 3.3.3.3:30001)`
```
# DNAT(LAN -> EX)
-A PREROUTING -i eth1 -d 192.168.0.2 -p tcp -m tcp --dport 30001 -j DNAT --to-destination 3.3.3.3:30001

# SNAT
-A POSTROUTING -s 1.1.1.1 -p tcp -m tcp -j SNAT --to-source 2.2.2.2
```
<br>

3 . 최종 목적지서버에서 터널링서버로 데이터 전송시 Client로 DNAT, SNAT 하여 전송

`ex) 최종 목적지서버(3.3.3.3:30001) => 터널링서버(192.168.0.2:30001) => finance Client(1.1.1.1:30001)`

```
# DNAT
-A PREROUTING -i eth0 -s 3.3.3.3 -p tcp -m tcp -j DNAT --to-destination 1.1.1.1:30001

# SNAT
-A POSTROUTING -s 3.3.3.3 -p tcp -m tcp -j SNAT --to-source 192.168.0.2
```
<br>

4 . 마스커레이딩

`-A POSTROUTING -o eth0 -s 2.2.2.2 -j MASQUERADE`
- 사설 IP 주소를 서버의 IP로 가장하여 서버와 연결되어 있는 네트워크 호스트와 함께 외부 인터넷 자원을 공유할 수 있도록 해주는 네트워크 고급 기법이다.  
[IP masquerade + iptables 참고](http://egloos.zum.com/enigma777/v/3279346)  
<br>

#### 추가 정보.
 - 순서 : PREROUTING --> 라우팅테이블 --> POSTROUTING 
 - 3번 당시 터널링서버는 finance Client의 정보를 모르는 상태. 그래서 routing table에 finance Client의 ip가 destination 일 경우 전용선 라우터(192.168.0.1)로 라우팅하였음.

`route add -net 1.1.1.1 netmask 255.255.255.255 gw 192.168.0.1 dev eth1`