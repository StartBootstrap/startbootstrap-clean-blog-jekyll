---
layout: post
title: Linux 포트 포워딩하기(프록시서버 세팅)
subtitle: Linux iptables NAT 사용법 기록하기
date: 2019-09-19 00:00:00 +0300
description: # Add post description (optional)
tags: [network, linux] # add tag
categories: [network] # add categories
---

### 개요
 내부 네트워크의 서버(client라고 지칭)를 해당 프록시 서버를 통해 외부 서버(server라고 지칭)와 데이터를 주고 받도록 설정한다.  
> ex) client(1.1.1.1) -> 프록시 서버(eth0:2.2.2.2, eth1:192.168.0.2) -> server(3.3.3.3)  
<br>

##### 1. client는 내부망으로 프록시 서버까지 데이터 전송.  
> client(1.1.1.1:80) => 프록시 서버(192.168.0.2:80)  
<br>

##### 2. 프록시 서버에서 외부 서버로 목적지IP 변경, 소스지IP는 프록시 서버IP의 외부IP(2.2.2.2)로 변경하여 데이터 전송  
> 프록시 서버(2.2.2.2:80) => 외부 서버(3.3.3.3:80)  

```
# DNAT(LAN -> EX)
-A PREROUTING -i eth1 -d 192.168.0.2 -p tcp -m tcp --dport 80 -j DNAT --to-destination 3.3.3.3:80

# SNAT
-A POSTROUTING -s 1.1.1.1 -p tcp -m tcp -j SNAT --to-source 2.2.2.2
```
<br>

##### 3. 외부 서버에서 프록시 서버로 데이터 전송시 client로 포트 포워딩
> 외부 서버(3.3.3.3:80) => 프록시 서버(192.168.0.2:80) => client(1.1.1.1:80)

```
# DNAT
-A PREROUTING -i eth0 -s 3.3.3.3 -p tcp -m tcp -j DNAT --to-destination 1.1.1.1:80

# SNAT
-A POSTROUTING -s 3.3.3.3 -p tcp -m tcp -j SNAT --to-source 192.168.0.2
```
<br>

##### 4. 마스커레이딩
> -A POSTROUTING -o eth0 -s 2.2.2.2 -j MASQUERADE  

- 내부 네트워크에 있는 컴퓨터가 방화벽 기능을 하는 리눅스 서버(또는 게이트웨이/프록시)를 통해서 외부로 데이터 등을 보내려고 할 때, 리눅스 서버가 그 컴퓨터를 '마스커레이딩'한다고 말한다.  
<br>

##### 추가 내용
 - iptables chain `PREROUTING ➡ route ➡ FORWARD ➡ POSTROUTING `
 - 3번 당시 프록시 서버는 client의 정보를 알 수 없음. 그래서 routing table에 default gateway 따로 설정 추가  
 
```
route add -net 1.1.1.1 netmask 255.255.255.255 gw 192.168.0.1 dev eth1
```