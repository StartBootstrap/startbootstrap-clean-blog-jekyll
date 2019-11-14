---

layout: post

title: PHP의 변수 관리법

date: 2019-11-13 00:00:00 +0300

description: # Add post description (optional)

tags: [PHP] # add tag

categories: [PHP] # add categories

---
# PHP의 변수 관리

첫 회사로 입사하여 PHP를 주로 사용하여 개발해왔다. 최근 메모리누수에 관해 언급이 되었고, PHP의 메모리 구조에 대해 알아보고자 한다. ~~이 돌대가리는 이제서야 이걸 알아본다.~~

시작해보자.

우선 PHP의 변수는 C 구조인 zval 이라는 구조체에 정의된다.

```
struct _zval_struct {
    zvalue_value value;			/* value */
    zend_uint refcount __gc;
    zend_uchar type;			/* active type */
    zend_uchar is_ref __gc;
};
```
`zvalue_value value` 는 실질적인 값이다. (an integer, a string, and object…)<br>
메모리 관리는 `refcount, is_ref` 2개의 필드와 연관이 있다. <br>

`refcount` 는 얼마나 많은 변수들이 이 `zval`을 가르키는지 나타내는 `integer`이다. 즉 변수의 값은 위의 `zval` 구조체로 메모리에 저장되고, 각 변수는 이 `zval` 을 가르키게 되는데, 이 때 얼마나 많은 변수들이 가르키고 있는지 나타낸다.<br>

`is_ref` boolean 을 나타내는 정수이다. default는 0이고, 아직 참조되지 않은 상태를 의미한다.`(&$a in PHP syntax)`<br>
1로 된다면 참조되고 있다는 것을 의미하고, 이 zval을 어떻게 가지고 노느냐에 따라 PHP는 크게 변화할 것이다.<br>
<br>
# Composite types
이 스크립트에서 몇개의 zval이 사용되고 있을까?<br>
`$a = 'foo';`<br>
물론 1개이다. 그림으로 나타낸다면 아래와 같다.<br>

![](https://papion93.github.io/img/pauli_variables1_custom_0.png)<br>

다음 스크립트를 보자.<br>
`$a = array('foo'=>'bar', 42);`<br>
여기에는 3개가 사용된다. string `bar`, integer `42`, 마지막으로 이를 감싸는 `array` 이다. 그림은 아래와 같다.<br>

![](https://papion93.github.io/img/pauli_variables2_custom_0.png)<br>

여기서 배열의 키인 `foo` 와 `1` 은 `zval`이 아니다. 단순히 value 이다. 다음 objects 를 보자<br>
```
class Foo {
	public $a = 42;
	protected $bar = 'default';
}
$obj = new Foo;
```
여기서도 3개이다. `$obj` 그리고 각각의 변수들(`$a` 와 `$bar`)<br>
`object`도 `array`와 같이 동작한다. `array`와 `obects` 모두 스스로 1개의 `zval` 을 먹고 포함하는 각 변수들마다 `zval`을 먹는다.
<br>
# PHP의 변수 관리 방법
PHP가 변수를 복사할 때 어떻게 zval memory를 복제하지 않고 어떻게 처리하는지 알아보자.
```
$a = 'foo';
$b = $a;
```
![](https://papion93.github.io/img/pauli_variables3_custom_0.png)<br>
회색 부분은 변수이며 실제로 메모리를 소비하지 않는다. 메모리를 잡아먹는 부분은 노란색 `zval` 컨테이너이다. 복제작업으로 인해 해당 `zval`을 가르키는 변수가 증가하였고, 그에 따라  `refcount` 가 증가했을 뿐이다. 따라서 아래의 두 코드의 메모리 사용량은 동일하다.<br>
```
// code1
$ a = ‘foo’;
$ b = $a;

// code2
$a = ‘foo’;
```
하나의 변수를 더 사용하여 낭비하는것처럼 보이지만, 사실은 `refcount` 만 증가할 뿐이다.
<br>
# Copy on write
Copy On Write (줄여서 COW)는 메모리 절약을 위한 속임수이다. 소프트웨어 엔지니어링에서 많이 사용되고, 기존 `zval`의 변수 외에 새로운 값을 쓸 때 실제 메모리가 할당된다. 아래의 코드와 그림을 통해 이해해보자.
```
$a = "foo";
$b = $a;
$a = 17;
```
![](https://papion93.github.io/img/pauli_variables4_custom_0.png)<br>
다른 예제도 있다.
```
$a = "foo";
$b = $a;
$c = $b;
$b = "bar";
unset($a);
```
![](https://papion93.github.io/img/pauli_variables5_custom_0.png)<br>
`refcount` 가 어떻게 사용되는지 알 수 있다. `unset` 은 메모리를 감소시키는 것이 아니라 `refcount`를 하나 줄일 뿐이다.<br>
줄이고나서 `refcount`가 0이 된다면 PHP는 메모리를 해제한다.










