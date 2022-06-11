---
layout: post
title: "Connect MySQL with Kafka"
subtitle: "Only Using kafka connect standalone"
background: "/img/posts/Juni/11/2134515-558578874.jpeg"
---
<h1 style="text-align: center;">بسم الله الرحمن الرحيم</h1>


Saya berharap disini sudah melakukan instalasi mysql pada server / machine yang digunakan. Jika belum coba lihat dokumentasi [berikut](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7)  untuk melakukan instalasi mysql pada CentOS. Sebenarnya bisa pada OS apa saja ya teman teman, hanya saja disini saya menggunakan CentOS.

Secara default, cluster database MySQL dilengkapi dengan pengguna (user), doadmin, yang memiliki akses penuh ke setiap database yang akan kita buat. Daripada menggunakan doadmin untuk mengakses database, sebaiknya buat pengguna _(user)_ tambahan yang hanya memiliki hak istimewa _(privileges)_ yang dibutuhkan, mengikuti prinsip hak istimewa _(privileges)_.

MySQL menetapkan _(privileges)_ berdasarkan nama akun, yang terdiri dari nama pengguna dan nama host dalam format
`'nama_pengguna'@'nama_host'`. Kita dapat menentukan host berdasarkan nama `('user_name'@'localhost')`, alamat IP `('user_name'@'198.51.100.1')`, atau menggunakan karakter _wildcard_ (seperti `%`, seperti pada `'user_name'@'%'`, yang cocok dengan semua host).

### 1. Membuat User  dengan previlages
Untuk memberikan semua hak istimewa pada database tertentu kepada pengguna, Anda dapat menggunakan perintah berikut:

```
mysql > GRANT ALL ON example_database.* TO 'example_user'@'%';
```

saya akan mulai dengan perintah pembuatan user, dimana memasuki mysql pada root dan membuat user dengan perintah `CREATE USER` diikuti dengan password dengan perintah `IDENTIFIED BY`. Setelah melakukan pembutan user selanjunya adalah memberikan hak istimewa ke pada user tersebut dengan perintah  `GRANT ALL PRIVILEGES ON *.* TO 'fawzi'@'localhost' WITH GRANT OPTION;`

```sh
$ mysql -u root -p
    > CREATE USER 'fawzi'@'localhost' IDENTIFIED BY 'P@ssw0rd';
    > CREATE USER 'fawzi'@'%' IDENTIFIED BY 'P@ssw0rd';
    > GRANT ALL PRIVILEGES ON *.* TO 'fawzi'@'localhost' WITH GRANT OPTION;
    > GRANT ALL PRIVILEGES ON *.* TO 'fawzi'@'%' WITH GRANT OPTION;
    > flush privileges;
```

### 2. Membuat Databases dan Table

setelah melakukan pembuata user langkah selanjutnya adalah pembuatan database dan table sebagai data yang akan kita lakukan koneksi untuk proses streaming. Perintah berikut adalah perintah sederhana dari mysql. untuk lebih jelasnya bisa dilihat pada potingan [berikut](https://www.mysqltutorial.org/mysql-create-database/)

pembuatan databases dan tabel.

```sh
> create database fawzi;
> use fawzi;
> CREATE TABLE banklist(
	rollno INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	bank_name VARCHAR(90) NOT NULL, 
	city VARCHAR(18) NOT NULL, 
	state VARCHAR(2) NOT NULL, 
	cert INTEGER  NOT NULL, 
	acquiring_institution VARCHAR(65) NOT NULL, 
	closing_date VARCHAR(9) NOT NULL, 
	fund INTEGER  NOT NULL);
```
Pada databases tersebut saya menggunakan databases bernama `fawzi`, dengan tabel bernama `banklist` yang berisikan tipe data seperti gambar dibawah ini

<img title="Describe Databases" alt="" src="/img/posts/Juni/11/back-1.png">

dimana pada Field Rollno  menjadi _auto_increment_ yang memungkinkan untuk datapa melakukan pengisian data manual ketika dimasukkan tanpa inisialisaasi. selanjutnya yang lain hanya data dummy saja dan boleh atau tidak untuk diiisi.

### 3. Download Confluent HUB JDBC Connector
Konektor _source_ dan _sink_ JDBC memungkinkan kita untuk bertukar data antara database relasional dan Kafka. Konektor _source_ JDBC memungkinkan kita untuk mengimpor data dari database relasional apa pun (SQL, MySQL, PostgreSQL, dan lainnya) dengan [driver JDBC](https://www.confluent.io/hub/confluentinc/kafka-connect-jdbc) ke topik Kafka. langkah pertama yang kita lakukan adalah menginstallnya dengan perintah berikut.

```sh
$ mkdir connect
$ cd connect
$ wget https://d1i4a15mxbxib1.cloudfront.net/api/plugins/confluentinc/kafka-connect-jdbc/versions/10.4.1/confluentinc-kafka-connect-jdbc-10.4.1.zip
$ unzip confluentinc-kafka-connect-jdbc-10.4.1
```
pertama saya membuat directory conncer untuk mengumpulkan konector menjadi satu dan tidak berantakan hehehe. lalu kita unzip saja ya.

Setelah Mendownload JDBC connector, selanjutnya mendownload mysql connector pada java 8 dengan perintah berikut.

```sh
$ wget https://ftp.jaist.ac.jp/pub/mysql/Downloads/Connector-J/mysql-connector-java-8.0.29.tar.gz
$ tar -zvf mysql-connector-java-8.0.29.tar.gz
```
copy mysql-connector-java-8.0.29.jar di `kafka_2.13-3.2.0/connect/confluentinc-kafka-connect-jdbc-10.4.1/lib` (ini adalah directory saya)
```
$ cp mysql-connector-java-8.0.29.jar ~/kafka_2.13-3.2.0/connect/confluentinc-kafka-connect-jdbc-10.4.1/lib/
```
### 4. Pembuatan Properties MySQL connector

Langkah selanjutnya adalah melakukan pembuatan properties, yang akan dijalnkan oleh kafka. saya menamakannya `source-quickstart-mysql.properties` temen temen bisa mengganti sesuai dengan yang diinginkan menggunakan (dot).properties saya meletakkannya di `/kafka_2.13-3.2.0/connect/confluentinc-kafka-connect-jdbc-10.4.1/etc/`.

```sh
$ vim source-quickstart-mysql.properties
```
	→ name=connect-mysql
	→ connector.class=io.confluent.connect.jdbc.JdbcSourceConnector
	→ tasks.max=1
	→ connection.url=jdbc:mysql://172.18.46.120:3306/fawzi?user=fawzi&password=P@ssw0rd
	→ mode=incrementing
	→ incrementing.column.name=rollno

```sh
$ wq:
```
pastikan tidak ada typo, ingat `fawzi` sebagai databases dan juga user :) selanjutnya saya memasukkan passowrd `P@ssw0rd`

penjelasan :

__"name"__: Menetapkan nama untuk konektor baru Kita.

__"connector.class"__: Mengidentifikasi nama plugin konektor. kita menggunakan JDBC dari confluent.

__“tasks.max”__ : Jumlah tugas untuk konektor ini, atau bisa disebut juga berapa banyak yang akan terhubung dengan konector ini

__“connection.url"__ : link ke database dengan user dan password

__"topic.prefix"__ : Masukkan awalan topik. Konektor secara otomatis membuat topik Kafka menggunakan konvensi penamaan: `<topic.prefix><tableName>`. Tabel dibuat dengan properti: topic.creation.default.partitions=1 dan topic.creation.default.replication.factor=3. Jika Anda ingin membuat topik dengan spesifik

__“mode”__ : Mode untuk memperbarui tabel setiap kali tabel disurvei. 

__"increamenting.column.name"__ = Masukkan nama kolom Incrementing untuk mengaktifkan mode incrementing. Mode ini menggunakan dua kolom, kolom stempel waktu yang mendeteksi baris baru dan yang dimodifikasi, dan kolom dengan penambahan ketat yang menyediakan ID unik global untuk pembaruan sehingga setiap baris dapat diberi offset aliran unik.

__table.whitelist__ : Daftar tabel untuk disertakan dalam penyalinan. Gunakan daftar yang dipisahkan koma untuk menentukan beberapa tabel (misalnya: “Pengguna, Alamat, Email”).

### 5. Pengaturan Connect Standalone pada Kafka
ubah bootstap-server sesuai dengan yang digunakan, ubah schema menjadi false, dan tambahkan __plugin path__.

```
$ vim config/connect-standalone.properties
```

<img title="connect-standalone.properties" alt="s" src="/img/posts/Juni/11/gambar1.png">

<img title="connect-standalone.properties" alt="s" src="/img/posts/Juni/11/gambar2.png">

### 6.  Menjalankan kafka connector
Ekhem, jalanin aja deh connectornya sembari lihat lihat logs nya ya barang kali ada error. xixixixi.
  
```sh
$ kafka_2.13-3.2.0/bin/connect-standalone.sh kafka_2.13-3.2.0/config/connect-standalone.properties kafka_2.13-3.2.0/connect/confluentinc-kafka-connect-jdbc-10.4.1/etc/source-quickstart-mysql.properties
```
### 7. Finishing
selanjutnya kita akan melakukan pengiriman data, kita akan memasukkan data melalui mysql server.

```sh
> insert into banklist
    (bank_name, city, state, cert acquiring_institution, closing_date, fund) 
    values 
    ('BCA', 'indonesia', 'ID', 12, 'idk', 'idk2', 123);
```
cobalah untuk membuat beberapa tabel yang akan dikirimkan.
berikut data yan telah saya  _dummy_.


<img title="connect-standalone.properties" alt="s" src="/img/posts/Juni/11/gambar3.png">

Dengan menjalankan connector maka kita dapat melihat topic dengan menggunakan perintah berikut

```sh
$ kafka_2.13-3.2.0/bin/kafka-topics.sh --bootstrap-server 172.18.46.121:9092 172.18.46.120:9092 172.18.46.122:9092 –list
```
<img title="List Topic" alt="s" src="/img/posts/Juni/11/gambar4.png">

Jalankan perintah consumer 

```
$ bin/kafka-console-consumer.sh --bootstrap-server 172.18.46.121:9092 172.18.46.120:9092 172.18.46.122:9092 --topic coba-banklist –from-beginning
```
<img title="List Topic" alt="s" src="/img/posts/Juni/11/gambar5.png">

Semoga bermanfaat.
    
### REFERESI
[https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7)

[https://docs.digitalocean.com/products/databases/mysql/how-to/modify-user-privileges/](https://docs.digitalocean.com/products/databases/mysql/how-to/modify-user-privileges/)

[https://www.mysqltutorial.org/mysql-create-database/](https://www.mysqltutorial.org/mysql-create-database/)

### RESSOURCE
[Driver JDBC Confluent](https://www.confluent.io/hub/confluentinc/kafka-connect-jdbc)

[MySQL Connector Java](https://ftp.jaist.ac.jp/pub/mysql/Downloads/Connector-J/mysql-connector-java-8.0.29.tar.gz)