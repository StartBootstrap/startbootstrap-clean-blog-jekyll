---
layout: post
title: "Hands On : Kafka End to End (Part 2)"
subtitle: "Hands ON : File Stream kafka using SpringBoot"
background: "/img/posts/Juni/11_1/back1.jpeg"
---
<h1 style="text-align: center;">بسم الله الرحمن الرحيم</h1>

Setelah sebelumnya melakukan perancangan arsitektur kafka, pada dokumentasi ini akan melakukan pembuatan langsung atau praktik dari arsitektur yang telah dibuat. Langkah awal adalah melakukan pembuatan topic dimana topicnya terdiri dari daftar_bank, debit, kredit dan transaksi. pertama kita melakukan pembuatan topic dengan nama `daftar_bank`, `kredit` dan `debit`.

<img title="Pembuatan Topic" alt="" src="/img/posts/Juni/11_2/gambar1.png">

Selanjutnya adalah melakukan pembuatan program java, pembuatan program meliputi :
  1. _FileProducer_, untuk melakukan streaming dari file, yang akan mengirimkan pesan sesuai dengan topic dari jenis pesan yang telah ditentukan.
  
  2. _FileConsumer_, aplikasi consumer dengan java yang akan menerima pesan dari topic.
  
  3. _PostProducer_, adalah sebuah program yang akan mengirimkan pesan melaui HTTP Method Post ke topic transaksi
  
  4. _PostConsumer_, yang terakhir adalah melakukan pengelompokan message sesuai dengan type pesan yang dibawa.

## 1. Penginstalan Dependensi (CentOS 7)

Agar mempermudah membangun sebuah program maka dibutuhkan tools yang mendukung, tools yang dibutuhkan antara lain adalah Java Development Kit atau JDK dimana versi yang digunakan adalah JDK 18 dan Maven. Apache Maven adalah Java Build Tools yang menggunakan konsep Project Object Model (POM). POM tersebut berisi informasi dan konfigurasi yang digunakan Maven untuk membuat project.

__1. Penginstalan JDK 18__
```sh
 $ wget https://download.oracle.com/java/18/latest/jdk-18_linux-x64_bin.rpm
 $ sudo rpm -Uvh jdk-18_linux-x64_bin.rpm 
  ```
__2. Konfigurasi JDK 18 Environment__
```sh
  $ cat <<EOF | sudo tee /etc/profile.d/jdk18.sh
		export JAVA_HOME=/usr/java/default
		export PATH=\$PATH:\$JAVA_HOME/bin EOF
  $ source /etc/profile.d/jdk18.sh
  $ java -version
  ```
  <img title="Cek Versi Java" alt="" src="/img/posts/Juni/11_2/gambar2.png">

__3. Penginstalan Maven__	
  ```
  $ wget https://dlcdn.apache.org/maven/maven-3/3.8.5/binaries/apache-maven-3.8.5-bin.tar.gz
$ tar -zvf  apache-maven-3.8.5-bin.tar.gz
```
__4. Konfigurasi maven environment__	
  ```
  $ vim ~/.bashrc
	(Tambahkan Maven_HOME lalu exit)
	$ source ~/.bashrc
  ```

<img title=" export maven home" alt="" src="/img/posts/Juni/11_2/gambar3.png">

## 2. Program FileProducer

berikut merupakan contoh dari isi file example.txt

<img title="data dummy example.txt" alt="" src="/img/posts/Juni/11_2/gambar4.png">

Saat melakukan File Producer, dibutuhkan konfigurasi dari untuk menghubungkan koneksi kesetiap broker.

<img title="properties program File Producer" alt="" src="/img/posts/Juni/11_2/gambar5.png">

Properties ini dibuat agar memudahkan pengaturan konfigurasi pada program. Selanjutnya pada kode program akan melakukan path terhadap properties. Berikut beberapa penjelasan perintah yang dilakukan.

```
JSONObject topics = new JSONObject((String) props.get("list.topic"));
```
perintah ini akan membaca "list.topic" topic yang terdapat dalam properties dimana list berupa JSON dan key “type” (string).

```
Producer<String, String> producer = new KafkaProducer<>(props);
```

ini merupakan Init dari koneksi kafka

```
FileReader fileReader = new FileReader((String) props.get("file.path"));
BufferedReader bufReader = new BufferedReader(fileReader);
```

Perintah ini akan mengambil lokasi dari path File Producer yang telah di inisialisasi pada properties sebelumnya.

Selanjutnya akan dilakukan perulanan untuk seriap baris dari file yang sedang dibaca oleh program. Program akan memuat (payload) isi file setiap barisnya dengan kondisi :
    
  1. Jika program membaca pesan  sesuai dengan type tehadap topic yang sudah diinisialisasi pada properties maka program akan mengirimkan pesan sesuai topic.

  2. Jika Program membaca pesan, namun tidak ada pesan yang memiliki type yang sesuai maka program akan mengirimkan perintah error “tidak ada topic yang relevan”

  3. Jika dalam baris file terdapat baris yang kosong makan program akan menunggu selama 5 detik sampai ada baris berikutnya

  4. file log akan tersimpan dalam folder ./log/ denagn nama tes.log

setelah melakukan pengkodean, dengan menggunakan IDE selanjutnya adalah proses deploy program ke server. Kode ini dibuil dengan menggunakan maven dengan dependensi :

    • flink-java
    • kafka-clients
    • json
    • log4j

dengan mengirimkan source kode ke server dan melakukan build

```$ mvn clean compile```

dari perintah ini akan menghasilkan file jar `producer.jar` Setelah melakukan Build selanjutnya adalah pengetesan program pada server.

<img title="Log File program FileProducer" alt="" src="/img/posts/Juni/11_2/gambar6.png">


## 3. Program FileConsumer
Pada program ini menggunakan spring boot untuk mengirimkan pesan dari topic kepada APP. Langkah pertapa yang dilakukan adalah melakukan generate depedensi pada website [https://start.spring.io/](https://start.spring.io/) dengan menggunakan spring boor versin 2.7, JDK 18 dan di build dengan Maven. Sementara depensi yang perlukan antara lain Spring Boot Dev Tools, Spring for Apache Kafka dan cloud stream.

<img title="Interface Spring initializr" alt="" src="/img/posts/Juni/11_2/gambar7.png">

selanjutnya melakukan pengkodean dari paket project yang telah digenerate. Pada program ini akan dibuat beberapa Package, diantaranya ialah :
1. __Config__ : berisi java.java dengan nama KafkaConfiguration yang berisi konfigurasi dari kafka broker dan consumer config mewakili setiap topic yang akan menerima pesan (consume)
2. __Listener__ : berisi java.java KafkaConsumer yang berisi program `@Servis` dan `@KafkaListener` yang akan membuat pesan yang diterima berdasarkan package config
3. __model__ : berisi class-class java yang akan menginisialisasi type pesan setiap topic terdiri dari DaftarBank, Debit, Kredit yang mewakili setiap topic dan berisi inisialisasi dari type pesan yang di bawa oleh topic

Pada Package  dilakukan inisialisasi serta pembuatan setter, getter dan container dari setiap class.

<img title="Debit.java pada package Config" alt="" src="/img/posts/Juni/11_2/gambar8.png">

ini akan melakukan inisialisasi dari pesan yang akan diterima dari topic. pada Package Config dilakukan perintah :

<img title="KafkaConfiguration.java" alt="" src="/img/posts/Juni/11_2/gambar9.png">

dengan menggunakan ConsumerFactory yang akan menginisialisasi key dan value dari kafka consumer dimana  akan memanggil class dari package model ututk setiap class yang mewakili topic, padda gambar 9 melakukan ConsumerFactory terhadap class Debit. Dengan memanggil Consumer.Config untuk menginisialisasi Bootstap-Server, Group_ID, key dan Value. Dilakukan hal yang sama pada class class lainnya

Selanjutnya  package  listener pada KafkaConsumer.java akan melakukan `@service` dengan menjadikan `@KafkaListener` pada setiap topic sehingga menungkinkan menerima pesan.

<img title="KafkaConsumer.java" alt="" src="/img/posts/Juni/11_2/gambar10.png">


juga melakukan inisialsasi topics, groupId  containerFactory.
Setlah program berhasil jalan dan tanpa eror selanjutnya melakukan deploytment ke server dengan melakukan build menggunakan maven.

```
$ mnv clean install package
$ java -jar name.jar
```
Setelah berhasil melakukan build maka dihasilkan filde jar yang akan di running

## 4. Program PostProducer
Program ini juga masih menggunakan spring boot dan depedensi yang sama dari program sebelumya. Dalam program ini terdapat 4 package diantaranya :

1. controller, berisi java class bernama KreditControl yang berisi tentang perintah `@PostMapping` yang akan melakukan pengiriman pesan melalui HTTP Method melalu /post 
2. model,  berisi java class bernama kredit, hanya berisi inisialisi dari type pesan yang akan dikirimkan
3. producerconfig, berisi java class yang mengatur konfigurasi Producer Kafka
4. service, berisikan java class untuk melakukan @service terhadap topic yang akan memproduksi pesan

pada `Kredit.java` berisi inisialisasi sebagai berikut

<img title="Inisialiasi tipe data untuk topic" alt="" src="/img/posts/Juni/11_2/gambar11.png">

pada `KreditControll.java` berisi perintah sebagai berikut.

<img title="Melakukan Producer service" alt="" src="/img/posts/Juni/11_2/gambar12.png">

pada KafkaProducerConfig dilakukan hal yang sama seperti sebelumnya ialah melakukan inisialisasi bootsrap server , key serta valuenya

<img title="Melakukan Konfigurasi kafka" alt="" src="/img/posts/Juni/11_2/gambar13.png">

IP Server yang menjalankan program ini yang akan IP yang menjalankan springboot pada port 8080, pengujian respon HTTP Method Post menggunakan postman.

<img title="Pengujian Respon" alt="" src="/img/posts/Juni/11_2/gambar14.png">

Setlah program berhasil jalan dan tanpa eror selanjutnya melakukan deploytment ke server dengan melakukan build menggunakan maven.
```
$ mnv clean install package	
$ java -jar name.jar
```

Setelah berhasil melakukan build maka dihasilkan filde jar yang akan di running

## 5. Program PostConsumer

Program ini juga masih menggunakan spring boot dan depedensi yang sama dari program sebelumya. Terdapat 3 Package diantaranya :
1. binding,  yang berisi StreamBinding.java berisi interface yang akan memisakan antara pesan kredit atau debit yang diterima oleh PostProducer
2. Model, berisi java class bernama kredit, hanya berisi inisialisi dari type pesan yang akan dikirimkan
3. Services, yang berisi StreamService.java akan melakukan Stream sesuai dengan pesan yang di bawa

program binding
<img title=" Java binding" alt="" src="/img/posts/Juni/11_2/gambar15.png">

Program Services
<img title=" Java binding" alt="" src="/img/posts/Juni/11_2/gambar16.png">

<img title=" Java binding" alt="" src="/img/posts/Juni/11_2/gambar17.png">


# Source Code
[https://github.com/FawziLinggo/PostConsumer](https://github.com/FawziLinggo/PostConsumer)

[https://github.com/FawziLinggo/KafkaConsumerSpringBoot](https://github.com/FawziLinggo/KafkaConsumerSpringBoot)

# REFERENSI
[https://computingforgeeks.com/how-to-install-java-18-on-centos-fedora/](https://computingforgeeks.com/how-to-install-java-18-on-centos-fedora/)

[https://medium.com/@acep.abdurohman90/mengenal-maven-sebagai-java-build-tools-5ba752f75812](https://medium.com/@acep.abdurohman90/mengenal-maven-sebagai-java-build-tools-5ba752f75812)


[https://www.matawebsite.com/blog/apa-itu-postman-dan-bagaimana-menggunakan-postman-untuk-menguji-api](https://www.matawebsite.com/blog/apa-itu-postman-dan-bagaimana-menggunakan-postman-untuk-menguji-api)