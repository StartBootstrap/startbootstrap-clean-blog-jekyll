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

나는 평소 개발하듯 계획 중심적으로 설계를 시작하였고 처음 시작은 회사를 크게 나누었다. 그리고 그것을 또 나누고 가장 아래까지 가게되면 각자에게 동작을 입혔다. 동작을 입히려고하면 막상 떠오르는게 없기도하며 소스로 옮겨보면 현실반영이 되지않았다.(*내가 구현한 어떤 객체가 정말 현실에서도 이런 행동을 하는가? 라는 의구심이 드는..*) 이런 사고(설계)방식은 객체지향에 어울리지 않는 것 같다는 생각이 대리님과 얘기해다보니 알게되었다. (~~아직은 못하는 것일 수 있지만!~~) 그래서 우선 구현하고픈 현실동작을 작성하고 살을 더 붙이는 방식으로 진행하도록 하였다. 즉 개발 방법론 중 폭포수방법론과 애자일방법론의 차이로 생각해볼 수 있다.

우선 나같은 경우는 어쩌면 폭포수와 애자일의 타협을 거쳤는지도 모르겠다.(~~매우 긍정적인편~~)

메인 프로세스부터 보자.
```java
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

우선 구조를 살펴보면 가장 위의 회사(Company)는 마커 인터페이스이다. 그 아래를 2가지로 나눠 Worker interface와 Building interface가 있고 Worker는 Employer class와 Employee class로 나뉜다. Building 은 ResearchFloor 를 가진다.(상속관계이다).

여기서는 직원과 사장 그리고 출근하는 장소인 연구실이 객체가 된다. 직원객체는 집을떠나 연구실 객체에 출근하고 사장은 직원들 출근을 확인한다.(~~쫓겨나기도함~~) 그리고 일을 하면 사장이 보너스주는 시늉을 진행하며 하루가 끝났다. 스스로는 스토리가 맘에든다.

내가 구현한 동작중 출근하는 comeToWork()만 살펴보고 마치도록 해야겠다.
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
해당 내용 중 내게 java 공부가 되는부분은
1. 각 메소드가 특정 타입의 객체를 전달받아 진행하는 부분
2. 객체의 타입에 따라 동작이 달라지는 부분
3. 직원 객체 리스트를 사장이 기억해 가는 부분
4. 그 후 사장이 보너스를 주겠지.