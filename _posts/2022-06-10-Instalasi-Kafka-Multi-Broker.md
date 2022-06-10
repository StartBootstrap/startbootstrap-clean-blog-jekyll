---
layout: post
title: "Instalasi Kafka Multi Broker"
subtitle: "Menggunakan 3 Broker dan 3 zookeeper"
background: "/img/posts/Instalasi Kafka/1.jpeg"
---

Pada tulisan kali ini akan dilakukan penginstalan kafka dengan multi cluster. Dengan VM yang disediakan akan dilakukan instalasi kafka 3 node dan 3 server Zookeeper dengan sistem operasi CentOS 7 dimana dapat diakses remote dengan menggunakan SSH.

<img title="Gambar 1. Desain Kafka" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar1.png">

hal yang pertama dibutuhkan adalah JDK 1.8 penginstalan (saya menggunakan CentOS):

```$ sudo yum -y install java-1.8.0-openjdk```

selanjutnya mendownlowad binari Kafka menggunakan perintah wget.

```$ wget https://dlcdn.apache.org/kafka/3.2.0/kafka_2.13-3.2.0.tgz```

### 1. Konfigurasi Zookeeper (zookeeper.properties)


setelah download maka selanjutnya melakukan pengkstrakan dan juga konfigurasi zookeper dan kafka. Konfigurasi zookeeper dilakukan dalam file zookeeper.properties

`$ vim config/zookeeper.properties`

<img title="Gambar 2. Konfigurasi zookeeper.properties" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar2.png">


_ticktime_ ini digunakan untuk mengatur lama dari _heartbeats_, dan batas waktu diatur 2000 ms (2 detik).  InitLimit adalah Peningkatan nilai ticktime jika data yang dikelola oleh ZooKeeper besar. SyncLimit untuk menyinkronkan dengan ZooKeeper. Server 1 – 3 merupakan server yang akan di jadikan sebagai zookeeper.
Penulisan server yang digunakan adalah server.id=host:port:port dengan mengatribusikan id server ke setiap mesin dengan membuat file bernama myid, satu untuk setiap server, yang berada di direktori data server itu, seperti yang ditentukan oleh parameter file konfigurasi dataDir. 

<img title="Gambar 3. dataDir pada zookeeper.properties" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar3.png">

directory **dataDir** dapat diubah sesuai yang diinginkan. Selanjutnya adalah pembuatan file myid yang menyatakan urutan server tersebut.

`$ vim /tmp/zookeeper/myid`

`$ 1 			#sesuaikan dengan IP dan urutan server`

`$ :q`

### 2. Konfigurasi Kafka (server.properties)
Selanjutnya adalah melakukan konfigurasi pada server kafka pada server.properties.

`$ vim config/server.properties`

<img title="Gambar  4. Pengaturan broker.id" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar4.png">

digunakan untuk mennetukan id dari masing masing kafka broker adalah single kafka.

<img title="Gambar 5. Listeners pada server.properties" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar5.png">

listener digunakan untuk melakukan hubungan antar sesama client. Listener adalah binds dari advertised.lisetener. Listener yang digunakan adalah PLAINTEXT. 

<img title="Gambar 6. zookeeper connect" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar6.png">

untuk melakukan koneksi pada zookeeper maka harus dilakukan inisialiasi IP dan port pada server.properties.

### 3. Konfigurasi Kafka (server.properties)

• Create: Ini adalah perintah dasar untuk membuat topik Kafka baru.

• Pertitions: Topik yang baru dibuat dapat dibagi dan disimpan dalam satu atau lebih Partisi untuk memungkinkan penskalaan dan penyeimbangan pesan atau beban yang seragam. Pada kali ini hanya membuat 1 partisi berarti tidak melakukan penskalaan pesan

• Replication Factor: Faktor Replikasi menentukan jumlah salinan atau replika Topik di seluruh Cluster Kafka.  Ini dilakukan untuk mereplikasi topic untuk metorelir kesalahan (server mati).

    $ bin/kafka-topics.sh –create –bootstrap-server 172.18.46.120:9092 172.18.46.121:9092 172.18.46.122:9092 –replication-factor 3 –partitions 1 –topic tes-topic


### 4. Pembuatan Producer & Consumer

<img title="Gambar 7 Pembuatan Producer" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar7.png">

dalam pembuatan producer sederhana maka dilakukan dengan cara memanggil program kafka-cosole-producer dikuti dengan perintah –topic yang menandakan pada topic mana (yang sudah dibuat) kita akan memproducer  pesan.

<img title="Gambar 8 Pembuatan Konsumer" alt="Alt text" src="/img/posts/Instalasi Kafka/gambar8.png">

dalam pembuatan comsumer maka dilakukan dengan memanggil program kafka-console-consumer dikuti dengan  –topic yang menandakan pada topic mana (yang sudah dibuat).



________________________________________________________________________________
### REFERESI

<a href="https://www.learningjournal.guru/article/kafka/installing-multi-node-kafka-cluster/">https://www.learningjournal.guru/article/kafka/installing-multi-node-kafka-cluster/</a>

<a href="https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-ubuntu-20-04">https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-ubuntu-20-04</a>

<a href="https://www.vultr.com/docs/install-apache-kafka-on-centos-8">https://www.vultr.com/docs/install-apache-kafka-on-centos-8</a>

<a href="https://kafka.apache.org/intro">https://kafka.apache.org/intro</a>

<a href="https://zookeeper.apache.org/doc/r3.2.2/zookeeperAdmin.html">https://zookeeper.apache.org/doc/r3.2.2/zookeeperAdmin.html</a>

