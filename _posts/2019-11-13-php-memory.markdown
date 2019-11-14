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
이 작은 스크립트에서 몇개의 zval이 사용되고 있을까?<br>
`$a = 'foo';`<br>

물론 1개이다. 그림으로 나타낸다면 아래와 같다.<br>
![](/img/pauli_variables1_custom_0.png)


다음 스크립트를 보자.<br>
`$a = array('foo'=>'bar', 42);`<br>
여기에는 3개가 사용된다. string `bar`, integer `42`, 마지막으로 이를 감싸는 `array` 이다.<br>
그림은 아래와 같다.<br>
![](/img/pauli_variables2_custom_0.png)
여기서 배열의 키인 `foo` 와 `1` 은 `zval`이 아니다. 단순히 value 이다. PHP 에서는 모든 타입이 zvals 인 것을 기억하고 다음 objects 를 보자<br>
```
class Foo {
	public $a = 42;
	protected $bar = 'default';
}
$obj = new Foo;
```
여기서도 3개이다. `$obj` 변수 그리고 각각의 변수들(`$a` 와 `$bar`)
`object`도 `array`와 같이 동작한다. `array`나 `obects` 나 스스로 1개의 `zval` 을 먹고 포함하는 각 변수들마다 모두 `zval`을 먹는다.


# PHP의 변수 관리 방법

PHP가 변수를 복제할 때 어떻게 zval memory를 복제하지 않고 어떻게 똑똑하게 처리하는지 알아보자.
```
$a = 'foo';
$b = $a;
```
![](/img/pauli_variables3_custom_0.png)
위에서 본 `zval` 컨테이너는 노란색 부분과 같다. 회색 부분은 변수이고 실제로 메모리를 소비하지 않는다. 메모리를 잡아먹는 부분은 노란색 `zval` 컨테이너이고, 복제작업으로 인해 해당 `zval`을 가르키는 변수가 증가하여 `refcount` 가 증가했을 뿐이다. 따라서 아래의 두 코드의 메모리 사용량은 동일하다.<br>
```
// code1
$ a = ‘foo’;
$ b = $a;

// code2
$a = ‘foo’;
```

# Copy on write















