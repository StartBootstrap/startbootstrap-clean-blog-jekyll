---
title: 'TypeScript 5분만에 맛보기'
date: 2017-11-06 19:00:00
categories:
- TypeScript
tags:
- TypeScript
- Getting Started
thumbnail: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
---

* 작성자 : 이기승

### 설치
- [node.js](https://nodejs.org) 설치
- TypeScript 설치
	- $ npm install -g typescript
- TypeScript Tool (편한거로 쓰자)
	- [Visual Studio Code](https://code.visualstudio.com/Download)
	- [WebStorm](https://www.jetbrains.com/webstorm/download) (유료)

### TypeScript Compile
*TypeScript 확장자는 .ts 입니다.*

`greeter.ts` 파일을 만들고 아래 코드를 입력 해봅시다.
```javascript
// greeter.ts
// 파라미터 명은 person 이며 string 타입으로 된 파라미터를 받는다.
function greeter(person: string) {
	return "Hello, " + person;
}

let user = "Keeseung.Lee";

document.body.innerHTML = greeter(user);
```

TypeScript를 Javascript로 Compile 합니다.

```
$ tsc greeter.ts
```

컴파일 결과로 `greeter.js`로 파일이 생성됩니다.
```javascript
// greeter.js
function greeter(person) {
    return "Hello, " + person;
}
var user = "Keeseung.Lee";
document.body.innerHTML = greeter(user);
```

### Type annotation
greeter 함수의 파라미터 person은 string 타입으로 되어있습니다.
greeter 함수에 Array 타입의 파라미터를 넣어 호출 하도록 변경하여 컴파일해 보았습니다.
```javascript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```
컴파일 하면 아래와 같은 오류가 발생합니다.
```
greeter.ts(7,35): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```
greeter 함수를 파라미터 없이 호출 할 경우에는 파라미터 수가 일치 하지 않는다는 오류가 발생 하게됩니다.
```
greeter.ts(7,27): error TS2554: Expected 1 arguments, but got 0.
```

오류가 발생하였지만 `greeter.js` 파일은 생성 됩니다. 코드에 오류가 있어도 TypeScript 파일을 컴파일 할 수 있습니다. 하지만 원하는 대로 코드가 동작하지 않을 수 있으니 주의 하시기 바랍니다.

### Interfaces
여기서는 firstName 및 lastName 필드가 있는 인터페이스를 사용합니다.

TypeScript에서 두개의 필드가 내부 구조와 호환이 된다면 implements 없이도 인터페이스가 요구하는 모양으로 인터페이스를 구현할 수 있습니다.
```javascript
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Keeseung", lastName: "Lee" };

document.body.innerHTML = greeter(user);
```


### Classes
마지막으로 클래스를 사용하여 예제를 확장해 보겠습니다. TypeScript는 class 기반으로 되어있는 객체 지향 프로그래밍과 같이 new 연산자를 제공 합니다.

Student 클래스에 생성자와 필드들을 만듭니다.
Notice that classes and interfaces play well together, letting the programmer decide on the right level of abstraction.

그리고 생성자에 사용하는 파라미터에 public을 넣으면 자동으로 해당 파라미터 명으로된 프로퍼티가 생성됩니다.

```javascript
class Student {
    fullName: string;
    constructor(public firstName: string, public lastName: string) {
        this.fullName = firstName + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Keeseung", "Lee");

document.body.innerHTML = greeter(user);
```
Re-run tsc greeter.ts and you’ll see the generated JavaScript is the same as the earlier code. Classes in TypeScript are just a shorthand for the same prototype-based OO that is frequently used in JavaScript.




---
- 출처 : https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
