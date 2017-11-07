---
title: 'ECMASCRIPT 2015+ - 첫 번째 시간 const, let'
date: 2017-11-06 21:20:00
categories:
- javascript
tags:
- javascript
- ecmascript2015
thumbnail: http://exploringjs.com/es6/ch_variables.html
---

* 작성자 : 서동우

# emcascropt 2015+ - 첫 번째 시간 const, let

ecmascript 2015(줄여서 es2015) 에서 변수를 선언할 때 두 가지의 키워드인 
`const`와 `let`이 추가되었습니다. 그럼 기존에 있던 `var`와 이 두개는 어떤 차이가 있을까요? 그리고 왜 이렇게 두 개의 키워드가 생겨 났을까요? 이 부분에 대해서 한번 생각해보도록 하겠습니다.

## const, let 와 var 의 차이점

기존의 es2015에서 `var`는 아래와 같이 변수를 선언 하였습니다.

```javascript
var a=10;
var b=10;
```

위와 같은 `var`를 이용하여 선언을 할 경우 아래와 같은 2가지의 특징을 가지게 됩니다.

1. 함수 스코프
2. hoisting

예제로 한번 살펴 봅시다.

```javascript
function func() {
    console.log(tmp);   //undefined
    if (true) {
        var tmp = 123;
    }
    console.log(tmp); // 123
}

console.log(tmp)    // tmp는 함수 스코프이기 때문에 에러
```

위의 예시에서 `var`로 선언된 변수는 함수 내에서만 사용이 가능하다는 것을 볼 수 있습니다. 그리고 변수 선언에 `if`문 내 블럭에 위치해 있지만 동일 함수 내 `if`문 블럭 밖에 있는 console.log에서 tmp를 출력할 경우 에러가 아닌 undefined나 123이라는 값으로 표현이 되는 것을 볼 수 있습니다. 위 예제는 실행 시에 아래와 같이 변경이 되어서 실행이 됩니다.

```javascript
function func() {
    var tmp;            //tmp가 hoisting 되어서 가장 위로 올라옴
    console.log(tmp);   //할당 되지 않았기 때문에 undefined
    if (true) {
        tmp = 123;      //123을 할당
    }
    console.log(tmp); // 123
}
```

위와 같이 함수 내에 `var`로 선언된 변수를 실행 시에 함수 가장 위로 올리는 것을 `hoisting`이라고 합니다. 이건 실제 표준에 있는 용어는 아니지만 통상적으로 이렇게 자주 표현을 해서 굳어진 단어 입니다. 

이러한 특징들은 다른 언어 (특히 자바나 C 계열의 언어들)를 공부하고 온 사람들에게 많은 혼란을 주게 되었습니다. 그러서인지 다른 이유인지는 잘 모르겠지만 이번 es2015+에서는 이러한 특징들을 배제하고 다른 언어들과 유사한 특징을 가질 수 있게 새로운 변수 선언 방법이 나오게 되었습니다.

이 선언 방법이 `const`와 `let`을 이용하는 방법입니다. 이 방법의 경우는

1. 함수 scope --> block scope
2. hoisting 이 되지 않음 --> TDZ가 발생할 수 있음

이런 식으로 추가되었습니다. 아래 예제를 한번 보면

```javascript
function func() {
    console.log(tmp);   //변수가 선언되어 있지 않기 때문에 에러
    if (true) {
        const tmp = 123;    //블럭 스코프로 선언
    }
    console.log(tmp); // temp가 선언되어 있지 않기 때문에 에러
}
```

`const`로 선언된 변수 tmp의 경우 if 블럭 내에서 선언이 되었기 떄문에 if 블럭 내에서만 사용이 가능합니다. 그렇기 때문에 양 블럭 밖에 있는 console.log에서는 사용이 불가능합니다.

이해가 되시나요? `for`문을 이용해서 다른 예제도 한번 보도록 하겠습니다.

```javascript
function func() {
    for (var i=0; i < 100; i++) {

    }

    console.log(i);         //100

    for (let j=0; j < 100; j++) {

    }

    console.log(j);         //선언이 되지 않아서 error
}

```
위의 `for`문의 경우 `i`는 `var`로 선언이 되었기 때문에 함수 스코프입니다. `i`의 경우 hoisting 되어서 함수 가장 위에서 선언을 하게 되고 그렇기 때문에 console.log(i) 출력시 100이 나오게 됩니다.   
두 번째 for의 경우는 `let`을 이용하여 선언이 되었습니다. 이 변수는 for 문의 블럭 스코프를 가지게 됩니다. 그래서 for 문 안에 있는 블럭에서만 j를 사용할 수 있고 블럭 밖에서 console.log 로 출력을 할 때 에러가 발생하게 됩니다.

`let`, `const`와 `var`의 차이점을 이젠 알게 되었나요? 그럼 `let`와 `const`의 차이점에 대해서 한번 알아보도록 하겠습니다.

## let 과 const 차이점

`let`과 `const`의 경우는 차이점은 간단합니다. 바로 재할당 가능 여부입니다.

- `const`의 경우는 재할당이 되지 않습니다.
- `let`의 경우는 재할당이 가능합니다.

아래 예제를 보면

```javascript
let a = 10;
const b = 10;

a = 20;     //재할당 가능
b = 20;     //재할당이 안되기 때문에 에러
```

`const`의 경우 재할당이 안되기 떄문에 당연히 초기값을 주지 않는 경우에 에러가 발생합니다.

```javascript
let a;              //가능
const b;            //초기 값을 주지 않았기 때문에 에러
```

`const`의 경우 재할당이 되지 않는다는 것은 = 을 통한 데이터 변경이 되지 않는다는 의미 입니다. 하지만 `object`나 `array`의 경우는 레퍼런스 변수들이기 때문에 `const`통한 변수 선언 시 해당 값의 메모리 주소 값이 저장이 됩니다. 이말은 `object`에 속성을 추가하거나 `array`의 값을 하나 추가를 하더라도 해당 메모리 주소 값은 변경이 되지 않기 때문에 처리가 가능하다는 것을 의미 합니다. 

```javascript
const a = [];

a.push(100);
a.push(200);

console.log(a);     //[100,200]

const b = {};

b.test = 100;

console.log(b);     //{test:100}
```

아래와 같이 메모리 주소 값을 재할당 할 경우에는 에러가 발생합니다.

```javascript
const a = [];

a = [100, 200];     //주소를 재할당 하기 때문에 에러

const b = {};

b = {test:100};     //주소를 재할당 하기 때문에 에러
```

## const, let, var를 어떻게 사용하나요?

우선 es2015+에서는 `var`를 더 이상 사용하지 않기를 권장합니다. `var`가 아직 남아 있는 이유는 기존 es5 이전 소스들과의 하위 호환성 때문입니다. 이제부터는 `var`는 사용하지 않도록 합시다.

그럼 `const`와 `var` 는 어떻게 사용할까요?

1. 우선 `const`사용을 고려해 봅니다. `const`의 경우 재할당을 막아주기 때문에 프로그램 작성하다가 실수를 막아 줄 수 있습니다.
2. 재할당이 꼭 필요한 경우 `let`을 사용합니다.

`let`을 선언하기 전에 꼭 이 표현식이 `const`를 사용해서 표현이 가능한지 확인해보고 될 수 있는 `const`를 사용해서 표현하는 것을 권장합니다.

```javascript
//이것보다
let foo, bar;
if (a === b) {
  foo = a;
  bar = b;
} else {
  foo = b;
  bar = a;
}
//이렇게도 가능
const [foo, bar] = (a === b) ? [a, b] : [b, a];
```

## The temporal dead zone

위에서 `const`와 `let`의 경우는 hoisting을 하지 않기 때문에 TDZ가 발생할 수 있다고 하였습니다. 그럼 여기서 TDZ가 무엇인지 알아보도록 하겠습니다.

```javascript

let tmp = true;
if (true) { // enter new scope, TDZ starts
    // Uninitialized binding for `tmp` is created
    console.log(tmp); // ReferenceError

    let tmp; // TDZ ends, `tmp` is initialized with `undefined`
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
console.log(tmp); // true

```
여기서 첫 번째 console.log(tmp)의 경우 에러가 발생합니다. 아까도 말했지만, `let`, `const`로 선언될 경우 기존 `var`와 다르게 hoisting 되지 않습니다. 그렇기 떄문에 아직 `let`, `const`를 이용해서 선언하지 않는 변수를 호출할 경우 위와 같이 에러가 발생합니다. 이런 에러 발생 구간은 TDZ라고 합니다.위 예제의 경우는 TDZ를 표현해보기 위해서 해본 것이고 보통은 저렇게 프로그램을 작성하지 않을 것 입니다. 내가 모르는 사이에 TDZ를 발생시키는 경우는 아래와 같은 경우가 있습니다.

```javascript
let foo = console.log(foo); // 할당 연산의 경우는 항상 오른 쪽부터 실행하기 떄문에 foo가 선언되지 않았기 떄문에 에러
```
이런 부분은 프로그램을 작성할 때 좀만 신경을 쓰면 피할 수 있는 부분입니다. 

---
- 출처 :
  1. https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
  2. https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const
  3. https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let
  4. https://hyunseob.github.io/2016/11/21/misunderstanding-about-const/