---
title: "Instalasi Kafka Multi Broker"
subtitle: "Menggunakan 3 Broker dan 3 zookeeper"
date: 2022-06-10 10:10:10 +0800
categories: [blog, kafka]
tags: [kafka]     # TAG names should always be lowercase
pin: 
permalink: '/blog/:title'
author: fawzi
license: true
comments: true
---

![bismillah](/assets/img/bismillah.svg){: class="icon" alt="بسم الله الرحمن الرحيم" style="height:40px"}

Pada tulisan kali ini akan dilakukan penginstalan kafka dengan multi cluster. Dengan VM yang disediakan akan dilakukan instalasi kafka 3 node dan 3 server Zookeeper dengan sistem operasi CentOS 7 dimana dapat diakses remote dengan menggunakan SSH.

![Gambar 0. Topologi](https://i.postimg.cc/4yprZkwB/gambar1.png){: width="400"}
_Desain Kafka_

hal yang pertama dibutuhkan adalah JDK 1.8 penginstalan (saya menggunakan CentOS):

```console
$ sudo yum -y install java-1.8.0-openjdk
```

selanjutnya mendownlowad binari Kafka menggunakan perintah wget.

```console
$ wget https://dlcdn.apache.org/kafka/3.2.0/kafka_2.13-3.2.0.tgz
```

### 1. Konfigurasi Zookeeper (zookeeper.properties)


setelah download maka selanjutnya melakukan pengkstrakan dan juga konfigurasi zookeper dan kafka. Konfigurasi zookeeper dilakukan dalam file zookeeper.properties

```console
$ vim config/zookeeper.properties
```

![Gambar 1. Konfigurasi zookeeper.properties](https://i.postimg.cc/fk4gg2Nm/gambar2.png)
_Konfigurasi zookeeper.properties_

_ticktime_ ini digunakan untuk mengatur lama dari _heartbeats_, dan batas waktu diatur 2000 ms (2 detik).  InitLimit adalah Peningkatan nilai ticktime jika data yang dikelola oleh ZooKeeper besar. SyncLimit untuk menyinkronkan dengan ZooKeeper. Server 1 – 3 merupakan server yang akan di jadikan sebagai zookeeper.
Penulisan server yang digunakan adalah server.id=host:port:port dengan mengatribusikan id server ke setiap mesin dengan membuat file bernama myid, satu untuk setiap server, yang berada di direktori data server itu, seperti yang ditentukan oleh parameter file konfigurasi dataDir. 

![dataDir pada zookeeper.properties](https://i.postimg.cc/Sx4mnVMn/gambar3.png)
_dataDir pada zookeeper.properties_

directory **dataDir** dapat diubah sesuai yang diinginkan. Selanjutnya adalah pembuatan file myid yang menyatakan urutan server tersebut.

```console
$ vim /tmp/zookeeper/myid
$ 1 			#sesuaikan dengan IP dan urutan server
$ :q
```

### 2. Konfigurasi Kafka (server.properties)
Selanjutnya adalah melakukan konfigurasi pada server kafka pada server.properties.

```console
$ vim config/server.properties
```
![Pengaturan broker.id](https://i.postimg.cc/c1Kx2vWL/gambar4.png)
_Pengaturan broker.id_

digunakan untuk mennetukan id dari masing masing kafka broker adalah single kafka.

![Listeners pada server.properties](https://i.postimg.cc/tgCy5TDy/gambar5.png)
_Listeners pada server.properties_


listener digunakan untuk melakukan hubungan antar sesama client. Listener adalah binds dari advertised.lisetener. Listener yang digunakan adalah PLAINTEXT. 

![zookeeper connect](https://i.postimg.cc/mZ0LsTZN/gambar6.png)
_zookeeper connect_

untuk melakukan koneksi pada zookeeper maka harus dilakukan inisialiasi IP dan port pada server.properties.

### 3. Konfigurasi Kafka (server.properties)

• Create: Ini adalah perintah dasar untuk membuat topik Kafka baru.

• Pertitions: Topik yang baru dibuat dapat dibagi dan disimpan dalam satu atau lebih Partisi untuk memungkinkan penskalaan dan penyeimbangan pesan atau beban yang seragam. Pada kali ini hanya membuat 1 partisi berarti tidak melakukan penskalaan pesan

• Replication Factor: Faktor Replikasi menentukan jumlah salinan atau replika Topik di seluruh Cluster Kafka.  Ini dilakukan untuk mereplikasi topic untuk metorelir kesalahan (server mati). 

```console
$ bin/kafka-topics.sh –create –bootstrap-server 172.18.46.120:9092 172.18.46.121:9092 172.18.46.122:9092 –replication-factor 3 –partitions 1 –topic tes-topic
```

### 4. Pembuatan Producer & Consumer

![Pembuatan Producer](https://i.postimg.cc/zXKJD4Vm/gambar7.png)
_Pembuatan Producer_

dalam pembuatan producer sederhana maka dilakukan dengan cara memanggil program kafka-cosole-producer dikuti dengan perintah –topic yang menandakan pada topic mana (yang sudah dibuat) kita akan memproducer  pesan.

![Pembuatan Konsumer](https://i.postimg.cc/L8V2LftN/gambar8.png)
_Pembuatan Konsumer_

dalam pembuatan comsumer maka dilakukan dengan memanggil program kafka-console-consumer dikuti dengan  –topic yang menandakan pada topic mana (yang sudah dibuat).


### REFERESI
[https://www.learningjournal.guru/article/kafka/installing-multi-node-kafka-cluster/](https://www.learningjournal.guru/article/kafka/installing-multi-node-kafka-cluster/)


[https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-ubuntu-20-04)

[https://www.vultr.com/docs/install-apache-kafka-on-centos-8](https://www.vultr.com/docs/install-apache-kafka-on-centos-8)

[https://kafka.apache.org/intro](https://kafka.apache.org/intro)

[https://zookeeper.apache.org/doc/r3.2.2/zookeeperAdmin.html](https://zookeeper.apache.org/doc/r3.2.2/zookeeperAdmin.html)

