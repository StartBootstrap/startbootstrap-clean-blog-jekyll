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

`refcount` 는 얼마나 많은 변수들이 이 `zval`을 가르키는지 나타내는 `integer`이다. 예를 들어 `$a = 'foo'` 즉 변수의 값`(foo)`은 위의 `zval` 구조체로 메모리에 저장되고, 각 변수`($a)`는 `zval` 을 가르키게 되는데, 이 때 얼마나 많은 변수들이 가르키고 있는지 알 수 있다.<br>

`is_ref` boolean 을 나타내는 정수이다. default는 0이고, 아직 참조되지 않은 상태를 의미한다.`(&$a in PHP syntax)`<br>
1로 된다면 참조되고 있다는 것을 의미하고, 이 `zval`을 어떻게 가지고 노느냐에 따라 PHP는 크게 변화할 것이다.<br>
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

여기서 배열의 키인 `foo` 와 `1` 은 `zval`이 아니다. 단순히 `value` 이다. 다음 objects 를 보자<br>
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
![](https://papion93.github.io/img/pauli_variables3_custom_0.png)<br><br>
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
![](https://papion93.github.io/img/pauli_variables4_custom_0.png)<br><br>
다른 예제도 있다.
```
$a = "foo";
$b = $a;
$c = $b;
$b = "bar";
unset($a);
```
![](https://papion93.github.io/img/pauli_variables5_custom_0.png)<br><br>
`refcount` 가 어떻게 사용되는지 알 수 있다. `unset` 은 메모리를 감소시키는 것이 아니라 `refcount`를 하나 줄일 뿐이다.<br>
줄이고 난 후 `refcount`가 0이 된다면 PHP는 그제서야 메모리를 해제한다. `refcount` 와 `is_ref`의 값을 확인하려면 Xdebug extension의 `xdebug_debug_zval()`를 사용하여 확인할 수 있다.<br><br>

마지막 예제를 살펴보자. <br>
```
$a = array("foo"=>"bar", 1 => 42);
$b = $a["foo"];
$c = $b;
$b = 18;
unset($a['foo']);
$a[1] = $b;
```
![](https://papion93.github.io/img/pauli_variables6_0.png)<br><br>
동일한 동작임을 확인할 수 있다. `zval`은 0이 되기 이전에는 해제되지 않는다.<br><br>

# Functions (methods)
우선 함수와 메소드는 동일하다.<br>
기억해야 할 것은 함수가 생성될때 각 변수들의 가용 범위라는 것이 같이 생성 된다. 예를들어 전역변수를 제외하고 함수내에서 생성된 변수들은 외부에서 접근할 수 없다.<br><br>
함수의 매개변수와 리턴 값은 각각 `refcount` 가 증가하게끔 되어 있다. 콜스택이 동작하는 동안, 매개변수와 리턴 값에 해당하는 `zval`의 `refcount`을 올리는 것이다. 또 함수의 매개변수에는 PHP에서 제공하는 `func_get_arg()` 혹은 비슷한 기능을 하는 다른 함수로 접근할 수 있다. 기억해야 할 점은 PHP 변수만 `zval` 구조체를 사용하는 것이 아니다. PHP 내부 엔진 또한 동작하면서 얼마든지 사용할 수 있다. 그럴 경우 `refcount`를 올리는 것.<br><br>
PHP가 함수를 벗어나면 그 스택과 매개변수를 파괴한다.  우리가 사용하는 `unset`과 같다. `refcount`가 감소하고 이전과 동일하게 적용된다. 즉 0이되면 메모리를 해제한다. 이는 자동적이며, 프로그래머는 메모리할당과 해제를 모두 할필요가 없다.<br><br>
# References
우선 참조란 PHP에서 & 부호를 사용할때 발생한다.
```
$a = 'string';
$b = &$a;
$b = 1;
```
`$a` 와 `$b`는 모두 같은 value 를 공유하고 있다. 위와 같이 참조를 사용하는 것은 `$a`와 `$b`는 같은 `zval`에 묶는것을 의미한다. 사실 `$a = $b;`와 `$a = &%b;`는 이 단일 라인에서는 동일한 작업이 맞다. 하지만 마지막 라인의 `$b = 1;`에서 Copy On Write는 PHP를 크게 변화시킨다.<br>
![](https://papion93.github.io/img/pauli_variables8_custom_0.png)<br><br>

먼저 &를 사용하여 `is_ref`가 1로 증가한 것을 볼 수 있다. 하지만 `refcount`의 의미는 바뀌지 않는다.<br>

하지만 `is_ref`는 COW가 발생할 때 PHP의 동작을 바꾼다. PHP는 변수들을 더이상 분리하지 않고, 두개의 변수를 묶은 것처럼 동작한다. 간단하고 효율적이지만 주의해서 사용해야한다. 다음 예제를 잘 살펴봐야한다.<br>
```
$a = "string";
$b = &$a;
$c = $b;
```
![](https://papion93.github.io/img/pauli_variables9_custom_0.png)<br><br>
`$c = $b;` 를 주의 깊게 보자.

여기서 PHP는 새로운 메모리를 할당하고 `string`을 복사한다. 이미 참조되었기`(ref_count = 1)` 때문이다. 참조변수가 아니였다면 `refcount`가 3인 `zval`이었을 것이다.<br>
이제는 `$c`를 변경하더라도 `$b`가 변경되는지 않는다. `$c`가 `$b`를 참조하지 않기 때문이다. 참조를 사용할때 우리는 PHP가 예측하지 않는 곳에서 메모리를 복제하는 것을 조심해야한다.<br>

다음 예제를 보자.
```
function foo(&$var)
{
    if (strlen($var) > 3) {
        return $var;
    } else {
        $var .= '_uppercased';
        return strtoupper($var);
    }
}

$value = 'barbaz';
echo foo($value);
```
foo() 함수의 $var는 참조변수로 넘겨졌다. `foo()` 안에서 `$var`의 `is_ref`는 1일 것이다. 여기서 호출한 `stlen()`와 `strtoupper`에서 어떤 동작이 벌어질까? 이 함수들은 `value`에 의해 동작하게 되고(매뉴얼에서 확인가능) `$var`은 참조에 바인딩되며, PHP는 그러한 함수를 호출 할 때마다 메모리를 복제한다.<br>

만약 `strlen()` 등 함수들이 새롭게 할당하여 쓰지않고 참조한다면. 저 함수들은 우리가 제어하는 변수값들을 변경할 수 있게 될 것이다. 우리는 그것을 원하지않고, PHP는 정확히 같은 값을 가진 새로운 값을 만들기 위해 `$var zval`을 복제해서 사용해야만 한다.<br>

`foo()`에 참조변수를 넘기지 않았다면, 중복은 전혀 일어나지 않았을 것이다. 요즘 `barbaz`와 같은 string을 복제하는데에는 nanoseconds가 소요된다. 하지만 배열의 경우는 다르다. 특히 많은 키와 복잡한 배열의 경우.. 배열자체가 복사되므로 매우 많은 리소스가 소요될 수 있다.(PHP 5.5를 실행하는 2013 년 데스크톱 하드웨어에서는 백만 개의 슬롯 배열을 복제하는 데 약 0.3 초 소요)<br>

Memory leak, gc는 다음 포스트에서 작성한다.

[How PHP manages variables](https://entwickler.de/webandphp/how-php-manages-variables-125644.html)







