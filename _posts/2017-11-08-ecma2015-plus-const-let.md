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

ECMASCRIPT2015(줄여서 es2015로 하겠습니다.) 에서 부터 변수를 선언할 떄 두 가지의 키워드가 추가되었습니다.

`const`와 `let`이 바로 그 것들 입니다. 

그럼 이것들은 기존에 있던 `var`와 무엇이 다를까요? 이제부터 한번 알아보도록 하겠습니다.

## const, let vs var

기존의 es2015에서 `var`는 아래와 같이 사용했습니다.

```javascript
var a=10;
var b=10;
```

자바스크립트에서 변수 선언 시에 몇 가지 특징이 있는데요.

1. 함수 스코프
2. hoisting

이라는 특징입니다.

```javascript
function func() {
    console.log(tmp);   //undefined
    if (true) {
        var tmp = 123;
    }
    console.log(tmp); // 123
}
```

위의 예시는 두 가지의 특징을 전부 보여지고 있는데요, 위와 같이 javascript가 실행 시에 함수 내에 있는 모든 변수를 찾아서 함수 가장 위로 이동을 시킵니다(이 작업을 `hoisting`이라고 합니다). 그렇게 때문에 아래 console.log 출력 시에 tmp 값이 123이 나오게 됩니다. 

```javascript
function func() {
    var tmp;        //tmp가 hoisting 되어서 가장 위로 올라옴
    console.log(tmp);   //undefined
    if (true) {
        tmp = 123;
    }
    console.log(tmp); // 123
}
```

하지만 이런 자바스크립트의 특징은 기존 다른 언어(java 등의 객체 지향 언어들)과 비교해서 다른 방식으로 동작하기 때문에 처음 이해하는데 어려움이 있게 되었습니다.

그래서 이것을 보완하기 위해서 `const`와 `let`이 나오게 되었습니다. 두 개는 기존 `var`와 다르게

1. block 스코프
2. hoisting 이 되지 않음

이런 두 가지의 특징을 가지고 있습니다. 그래서 위의 로직을 아래와 같이 수정할 경우

```javascript
function func() {
    console.log(tmp);   //변수가 선언되어 있지 않기 때문에 에러
    if (true) {
        const tmp = 123;
    }
    console.log(tmp); // temp가 선언되어 있지 않기 때문에 에러
}
```

이런 결과가 나타나게 됩니다. 이해가 되시나요? `for`문을 이용해서 예를 하나 더 들어보도록 하겠습니다.

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
두 번째 for의 경우는 `let`을 이용하여 선언이 되었습니다. 이렇게 선언을 하면 우리와 친숙한 block 스코프를 가지게 됩니다. 그래서 for 문 안에 있는 block에서만 j를 사용할 수 있고 block 밖에서 console.log 로 출력을 할 때 에러가 발생하게 됩니다.

`let`, `const`와 `var`의 차이점을 이젠 알게 되었나요? 그럼 `let`와 `const`의 차이점에 대해서 한번 알아보도록 하겠습니다.

## let vs const

`let`과 `const`의 경우는 차이점는 하나입니다.

- `const`의 경우는 재할당이 되지 않습니다.
- `let`의 경우는 재할당이 가능합니다.

아래 예제를 보시면 바로 이해가 가능하실 것 입니다.

```javascript
let a = 10;
const b = 10;

a = 20;     //재할당 가능
b = 20;     //재할당이 안되기 때문에 에러
```

`const`의 경우 재할당이 안되기 떄문에 당연히 초기값을 주지 않을 경우에도 에러가 발생합니다.

```javascript
let a;              //가능
const b;            //초기 값을 주지 않았기 때문에 에러
```

`const`의 경우 재할당이 되지 않는다는 것이지 `const`를 통해 선언된 배열이나 object의 경우 배열이 추가되거나 object에 키 값을 변경하는 것등은 가능합니다.

```javascript
const a = [];

a.push(100);
a.push(200);

console.log(a);     //[100,200]

const b = {};

b.test = 100;

console.log(b);     //{test:100}

```

이건 왜 가능할까요? 간단한 원리 입니다. 자바스크립트에서 `object`와 `array`의 경우는 레퍼런스 변수입니다. 즉 값을 직접 가지고 있는게 아니고 `object`와 `array` 값의 메모리 주소를 변수에 할당하기 때문에 참조된 메모리 주소를 재할당 하지 않는 이상 에러가 발생하지 않습니다.

아래와 같은 경우는 에러 발생합니다.

```javascript
const a = [];

a = [100, 200];     //주소를 재할당 하기 때문에 에러

const b = {};

b = {test:100};     //주소를 재할당 하기 때문에 에러
```

## const, let, var를 어떻게 사용하나요?

우선 es2015+에서는 `var`를 더 이상 사용하지 않기를 권장합니다. `var`가 아직 남아 있는 이유는 기존 es5 이전 소스들과의 하위 호환성 때문에 있는 것이라서 이제부터는 `const`, `let`을 이용해서 변수를 선언하시면 됩니다.

그럼 `const`와 `var` 는 어떻게 사용할까요?

1. 우선 `const`사용을 고려해 봅니다. 보통 프로그램을 작성하다보면 재할당이 필요하지 않은 경우가 많이 있습니다. 그리고 `const`를 사용할 경우 실수로 재할당을 하는 경우를 방지할 수 있기 때문에 우선 `const` 사용을 고려해봅니다.
2. 그 외 재할당이 필요한 경우 `let`을 사용합니다.

보통 이런 경우는 재할당을 위해 `let`을 사용하는 경우가 있는데 이런 식으로 `const` 를 사용할 수도 있으니 참고 바랍니다.

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

아래 예제를 한번 보면

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
여기서 첫 번째 console.log(tmp)의 경우 에러가 발생합니다. 아까도 말했지만, `let`, `const`로 선언될 경우 기존 `var`와 다르게 hoisting 되지 않습니다. 그렇기 떄문에 아직 `let`, `const`를 이용해서 선언하지 않는 변수를 호출할 경우 위와 같이 에러가 발생합니다. 이런 에러 발생 구간은 tmp라고 합니다. 또 간단하게 아래와 같이 에제에서 에러가 발생합니다.

```javascript
let foo = console.log(foo); // 할당 연산의 경우는 항상 오른 쪽부터 실행하기 떄문에 foo가 선언되지 않았기 떄문에 에러
```

이런 부분이 발생할 수 있기 때문에 잘 고려해서 프로그램을 작성 하도록 합시다.

---
- 출처 :
  1. https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
  2. https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const
  3. https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let
  4. https://hyunseob.github.io/2016/11/21/misunderstanding-about-const/