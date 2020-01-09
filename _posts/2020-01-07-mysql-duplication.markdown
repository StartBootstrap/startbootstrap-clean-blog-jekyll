---

layout: post
title: (mysql) 서비스중인 대용량 테이블 변경하기
subtitle: 대용량 테이블의 모든 행의 변경을 최단시간 서비스중단으로 서비스에 적용하기
date: 2020-01-07 00:00:00 +0300
description: # Add post description (optional)
tags: [db, mysql]
categories: [db, mysql]

---

지속적으로 생성, 수정, 삭제되는 테이블을 서비스 영향 없이 안의 암호화되어 들어갔던 데이터를 복호화하여야 했습니다. 더이상 암호화하여 보관할 필요가 없어졌기 때문입니다. 여러가지 방법을 생각해보았는데 아래와 같습니다.
> 원본 테이블에 칼럼을 추가하여 여기에 복호화데이터를 넣고, 칼럼명을 수정한다.  
>  - 테스트 결과 Table Lock 으로 인해 제외
  
> 임시테이블을 생성해서 원본데이터를 옮겨가며 복호화 진행  
>  - 옮겨가는 건 좋으나 추가로 수정, 삭제되는 데이터를 알 수 없어 제외  


해결방법은 아래와 같습니다.

### 1. Trigger를 사용하여 원본 테이블의 이벤트를 저장한다.

- Log 테이블 생성  
- Insert, Update, Delete 발생시 Log Table로 그 고유번호와 종류를 Insert하게 한다.

아래는 Log 테이블입니다.  
![desc_logtable.jpg](https://papion93.github.io/img/desc_logtable.jpg)  
(모든 데이터를 모두 Insert하면 좋겠지만, 복호화를 진행하여야 하기 때문에 이정도만 저장하였습니다.)  

Trigger는 이렇게 생성할 예정입니다.  
```
DELIMITER $$

CREATE
    TRIGGER `원본테이블_after_insert` AFTER INSERT ON `원본테이블`
    FOR EACH ROW BEGIN
 INSERT INTO 로그테이블 SET num = NEW.num, dml_status = 'insert' ;
END;
$$

CREATE
    TRIGGER `원본테이블_after_update` AFTER UPDATE ON `원본테이블`
    FOR EACH ROW BEGIN
 INSERT INTO 로그테이블 SET num = NEW.num, dml_status = 'update' ;
END;
$$

CREATE
    TRIGGER `원본테이블_after_delete` BEFORE DELETE ON `원본테이블`
    FOR EACH ROW BEGIN
 INSERT INTO 로그테이블 SET num = old.num, dml_status = 'delete' ;
END;
$$

DELIMITER ;
```
<br>
<br>

### 2. 복호화하며 데이터 복제 시작

- 복호화해서 넣을 테이블(즉 복호화테이블)은 원본테이블을 카피하여 생성해둡니다.  
- 위의 Trigger를 일괄 실행하고, 이때 Log테이블에 `dml_status`가 `insert`인 최초 `num`을 확인합니다.  
- 작성해둔 스크립트를 실행하여, `(num-1)` 까지 복호화테이블로 데이터를 복호화하며 `Insert`를 진행합니다.
<br>
<br>

### 3. Log 테이블에 저장중인 발생 이벤트를 데몬으로 실시간 반영 시작

- 2번이 완료되면 만들어놓은 데몬을 실행하여 Trigger를 통해 Log 테이블에 작성중인 이벤트를 복호화테이블에 순차적으로 적용하도록 합니다.
- 데몬은 Log Select -> 원본테이블 Select -> 복호화 -> 복호화테이블에 변경이벤트 적용 순으로 동작합니다.
- Insert 후 Delete 되어 원본데이터가 없는경우를 예외처리해줍니다.
- 복호화테이블에 제대로 복호화되고 있는지 등 데이터를 확인합니다.
<br>
<br>

### 4. 배포시

- 복호화된 데이터를 처리하도록 변경된 소스를 배포 해야합니다. 이때는 잠시 동안 해당테이블의 데이터 변경사항을 막아둡니다. 데몬이 계속 진행해왔기 때문에 금방 완료될겁니다.
- Log테이블의 데이터가 모두 반영되었는지 확인하고, Trigger 삭제 및 데몬을 중지합니다.
- 복호화 테이블과 원본 테이블의 이름을 변경하고 다시 서비스를 시작합니다.

<br>
<br>

### 5. 완료