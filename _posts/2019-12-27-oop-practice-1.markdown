---

layout: post
title: 객체지향 설계 연습하기
subtitle: 객체지향적인 설계를 연습하고 Java와도 친해져보는 시간
date: 2019-12-27 00:00:00 +0300
description: # Add post description (optional)
tags: [java, oop]
categories: [java]

---

## '회사'를 객체지향적으로 설계하고 구현하자

2번째 과제로는 회사를 설계해보기로 했다. 주목적은 현실에 있는 것들을 객체지향적으로 옮겨보는 것이다. 최종 설계까지 나의 과정은 이렇다.

나는 평소 개발하듯 계획중심으로 설계를 시작하였다. 처음 시작은 회사를 크게 나누고 그것을 또 나누고 가장 아래까지 가게되면 이제 각자에게 동작을 입혔다. 막상 동작을 입히려고하면 떠오르는게 없기도하고, 그것을 소스로 옮겨보면 현실반영이 되지않았다.(*이 객체가 정말 이런 행동을 하는가?*) 이런 사고식은 객체지향에 어울리지 않는 것 같다는 생각이 대리님과 얘기해다보니 알게되었다. (~~아직은 못하는 것일 수 있지만!~~) 그래서 우선 구현하고픈 현실동작(스토리)을 작성하고 살을 계속 붙여가며 불리는 방식으로 진행하도록 하였다.

그림

우선 구조를 살펴보면 가장 위의 회사(Company)는 마커 인터페이스이다. 그 아래를 2가지로 나눠 Worker interface와 Building interface가 있고 Worker는 Employer class와 Employee class로 나뉜다. Building 은 ResearchFloor 를 가진다.(상속관계이다).

메인 프로세스부터 보자.
```
public class OneDayWorkProcess {

    /**
     * Instantiates a new One day work process.
     */
    public OneDayWorkProcess() {
    }

    /**
     * Processing.
     */
    public void processing() {

        Worker jun = new Employee("Jun");
        Worker cho = new Employee("Cho");
        Worker ceo = new Employer("Park");

        jun.leaveHome();
        cho.leaveHome();
        ceo.leaveHome();

        System.out.println("-----------출근중");

        ResearchFloor rsh = new ResearchFloor();
        rsh.comeToWork(jun);
        rsh.comeToWork(cho);
        rsh.comeToWork(ceo);

        System.out.println("-----------출근 확인");
        rsh.checkWorker(((Employer) ceo));

        System.out.println("-----------업무 시작");
        jun.work();
        cho.work();
        ceo.work();

        System.out.println("-----------업무 종료");
        ((Employer) ceo).stopWork();

        System.out.println("-----------보너스");
        ((Employer) ceo).payBonus();

    }
}

----------------------------------------------------

Jun 집을 떠난다.
Cho 집을 떠난다.
Park 집을 떠난다.
-----------출근중
Jun: 안녕하세요
Cho: 안녕하세요
안녕하세요 Park 사장님, 반갑지만 사장님방으로 가세요.
-----------출근 완료
Park: Jun아 출근잘했니?
Park: Cho아 출근잘했니?
-----------업무 시작
Jun 일한다.
Cho 일한다.
Park도 일한다.
-----------업무 종료
Jun야 오늘은 여기까지해!
Cho야 오늘은 여기까지해!
-----------보너스
이번달은 Jun 너 보너스!
```

여기서는 직원과 사장 그리고 출근하는 장소인 연구실이 객체가 된다. 직원객체는 집을떠나 연구실 객체에 출근하고 사장은 직원들 출근을 확인한다.(~~쫓겨나기도함~~) 그리고 일을 하다보면 사장은 업무를 중지시키고 보너스를 주는 시늉을 하며 하루가 끝난다. 스스로는 스토리가 맘에든다. 처음이라 이렇게 쉬운 것도 추상화 계층 설계와 나름 깔끔한 스토리를 위해 몹시 고민한 결과물이다.

추상화 계층도 보았고 메인스토리도 보았으니, 나에게 java 공부가 되었던 ResearchFloor class만 더 살펴보고 마치도록 해야겠다. [Github 더보기](https://github.com/PAPION93/Object-Oriented/tree/sj/src/main/java/personal/oop/practice3/company)
```
public class ResearchFloor implements Building {

    private List<Worker> workers;
    private Employer ceo;

    public ResearchFloor() {
        this.workers = new ArrayList<>();
    }

    @Override
    public boolean comeToWork(Worker worker) {
        if (worker instanceof Employee) {

            System.out.println(worker.getName() + ": 안녕하세요");
            workers.add(worker);

        } else if (worker instanceof Employer) {

            System.out.println("안녕하세요 " + worker.getName() + " 사장님, 반갑지만 사장님방으로 가세요.");
            ceo = (Employer) worker;
            ceo.rememberWorkers(workers);

        } else {
            return false;
        }
        return true;
    }

    @Override
    public void checkWorker(Employer employer) {
        for (Worker worker : workers) {
            System.out.println(employer.getName() + ": " + worker.getName() + "씨 출근 잘했어요?");
        }
    }
}
```
해당 클래스를 구현하면서 java 공부가 되었던 부분을 정리해보면
1. 각 메소드가 특정 타입의 객체를 전달받아 진행하는 부분
2. 객체의 타입에 따라 동작이 달라지는 부분
3. 직원 객체 리스트를 사장이 기억해 가는 부분
4. 그 후 사장이 보너스를 주겠지

<br>

## 마치며
일단 회사 설계를 해보면서 회사의 추상화구조를 잡았더라도 각 객체들의 동작을 현실성있게 구현하는 부분이 도저히 생각나질 않았었다. 나에게 객체지향적인 사고에 나름 큰 도움이 되었던 과제였던 것 같고 다음 과제가 몹시 기대되는 수준이다. 부끄럽지만 이런식으로 내맘대로 설계하는 것도 엄청 재밌는 것 같다.


