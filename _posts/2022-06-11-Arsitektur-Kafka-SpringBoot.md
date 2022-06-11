---
layout: post
title: "Kafka End to End (Part 1)"
subtitle: "File Stream kafka using SpringBoot"
background: "/img/posts/Juni/11_1/back1.jpeg"
---
<h1 style="text-align: center;">بسم الله الرحمن الرحيم</h1>


<img title="Arsitektur Kafka Aplikasi Pembayaran" alt="" src="/img/posts/Juni/11_1/gambar1.png">

Pada postingan ini akan membahas, membuat arsitektur kafka. Pada kesempatan ini saya akan membuat arsitektur kafka sederhana dimana terdiri dari 3 buah broker, zookeeper dan akan dilakukan streaming pada sebuah file yang berisi JSON dan melakukan streaming data kedalam masih masih topic yang disesuakan dengan jenis pesan, hasil Pesan akan diterima oleh consumer menggunakan freamwork SpringBoot. Selanjutany juga akan menerima pesan URI dengan http method POST.


## 1. Pembuatan Arsitektur Kafka
1. __Broker & Zookeeper__
pada Kafka Cluster akan digunakan Dengan VM yang disediakan akan dilakukan instalasi kafka 3 node dan 3 server Zookeeper dengan sistem operasi CentOS 7 dengan masing IP 172.18.46.120 (Broker 1 & zookeeper 1), 172.18.46.121 (Broker 2 & zookeeper 2),  dan 172.18.46.122 (Broker 3 & zookeeper 3) 
2. __FileStream.txt__ 
FileStream berupa file txt yang  setiap barisnya akan mengikrimkan (produce) pesan dari topic masing masing sesuai dengan type dari pesan secara langsung.
3. __APP__ 
Batasan Dari APP hanya berupa consumer dengan SpringBoot untuk mengconsume pesan dari topic.

## 2. Topic - Topic

<img title="Producer Java FileStreams" alt="" src="/img/posts/Juni/11_1/gambar2.png">
Setiap baris pesan JSON yang terdapat pada file streaming masing masing akan di kririmkan sesuai dengan Type. Dimana terdapat 3 tpye :

    • Type “db” akan mengirimkan pesan pada topic 1 dengan nama topic “daftar_bank”
      data sample : 
      {"Type":"db", "nama_bank":"BCA", "kota":"Jakarta", "tabungan":1000,"nama":"fawzi"}

    • Type “k” akan mengirimkan pesan pada topic 2 dengan nama topic “kredit”
      data sample:
      {"Type":"k", "nama_bank":"BCA", "jumlah":20000, "nama":"Ibal"}

    • Type “d” akan mengirimkan pesan pada topic 3 dengan nama topic “debit”
      data sample:
      {"Type":"k", "nama_bank":"BCA", "jumlah":20000, "nama":"Ibal"}


<img title="Consumer Java FileStream" alt="" src="/img/posts/Juni/11_1/gambar3.png">

Setiap pesan yang telah dikirimkan ke topic melalui FileStreaming maka akan diterima (consume) oleh App dengan pesan sesuai pada topic.

<img title="Consumer Java FileStream" alt="" src="/img/posts/Juni/11_1/gambar4.png">

Selanjutnya adalah proram untuk mengirimkan pesan melaluit metode HTPP post yang akan dikirimkan pada topic 4 yang bernama transaksi data berupa JSON, di dalam pesan transaksi akan terdapat pesan kredit atau debit, pesan ini pula yang akan diteruskan ke topic kredit atau topic debit.

      data sample:
      {"Type":"k", "nama_bank":"BCA", "jumlah":20000, "nama":"Ibal"} atau
      {"Type":"d", "nama_bank":"BRI", "jumlah":4323, "nama":"Ibal"}

## 3. Lampiran
<img title="Consumer Java FileStream" alt="" src="/img/posts/Juni/11_1/gambar5.png">

<img title="Consumer Java FileStream" alt="" src="/img/posts/Juni/11_1/gambar6.png">

<img title="Consumer Java FileStream" alt="" src="/img/posts/Juni/11_1/gambar7.png">

# REFERENSI
[https://data-flair.training/blogs/kafka-workflow/](https://data-flair.training/blogs/kafka-workflow/)

[https://learnbyinsight.com/2020/07/26/beginner-guide-to-understand-kafka/](https://learnbyinsight.com/2020/07/26/beginner-guide-to-understand-kafka/)

[https://medium.com/event-driven-utopia/understanding-kafka-topic-partitions-ae40f80552e8](https://medium.com/event-driven-utopia/understanding-kafka-topic-partitions-ae40f80552e8)

[https://reflectoring.io/spring-boot-kafka/](https://reflectoring.io/spring-boot-kafka/)

[https://strimzi.io/blog/2019/07/19/http-bridge-intro/](https://strimzi.io/blog/2019/07/19/http-bridge-intro/)