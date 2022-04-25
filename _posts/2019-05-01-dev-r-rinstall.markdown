---
layout: post
title:  "[R] R 설치 및 환경구성(10분만에 끝내는)"
subtitle:   "R 설치 및 환경구성(10분만에 끝내는)"
categories: dev
tags: r install
comments: true
---

## 개요
> `R`을 활용한 데이터 분석의 첫관문. 설치 및 환경구성에 관한 포스트입니다.
  
- 목차
	- [R이란 무엇인가?](#r이란-무엇인가) 
	- [R설치(Window PC 버전)](#r설치window-pc-버전)
	- [R Studio설치(Window PC 버전)](#r-studio설치window-pc-버전)
	- [R Studio 환경설정](#r-studio-환경설정)
  
## R이란 무엇인가?
---
R은 __데이터 분석을 위한 통계 및 그래픽스를 지원하는 오픈소스__로 Python과 더불어 데이터 분석을 위한 도구로 가장 널리 활용되고 있다. Python이 범용 언어로서 개발자가 보다 선호하는 도구임에 비해 R은 IT 비전공자의 경우에도 널리 사용되는 장점이 있다. 머신러닝, 통계는 물론 금융, 그래픽스, 논문작성 등 다양한 분야에 활용되고 있으며 [`CRAN`](http://cran.r-project.org/web/views/)에서 이를 가능하게 하는 다양한 패키지를 제공한다. 더불어 참조할 수 있는 레퍼런스가 다양하고, Eco환경이 훌륭하여 데이터 분석을 위한 최고의 도구임에 손색이 없다고 할 수 있겠다.

## R설치(Window PC 버전)   
---
R의 설치는 그 어떤 개발언어의 IDE 설치 과정보다 쉽다.  

1. R 공식사이트에 접속 후, `Download > CRAN`을 클릭 : [`http://www.r-project.org/`](http://www.r-project.org/)  
![그림1](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-1.png)   
2. Ctrl+F을 눌러 `Korea` 검색 후, 원하는 사이트 아무데나 클릭  
![그림2](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-2.png)
3. `Download R for Windows` 클릭  
![그림3](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-3.png)
4. `base` 클릭  
![그림4](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-4.png)
5. `Download R 3.6.0for Windows` 클릭 (버전은 계속 변경됨)   
![그림5](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-5.png)
6. 다운로드 완료 후, `R-3.6.0-win.exe`파일을 더블 클릭하여 설치(디폴트로 `Next`만 누르면 설치됨)   
![그림6](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-6.png)
7. 정상적으로 설치되었는지 확인하기 위해, 아래와 같이 소스코드를 입력  
```r
print("welcome")
```
8. 그림과 같이 입력한 문자열이 그대로 나오면 정상적으로 설치가 완료된 것이다. 
![그림7](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-7.png)


## R Studio설치(Window PC 버전)   
---
R Studio는 R 프로그램을 보다 편리하게 활용하기 위한 IDE(통합개발환경)으로 GUI를 지원하며 프로젝트 관리 및 패키지 설치 관리, 환경 설정을 용이하게 해주므로 개발 생산성 향상을 위해 반드시 설치하는 것이 좋다. 마찬가지로 R만큼 설치과정이 단순하다.  

1. R Studio 공식사이트에 접속 후, `Download RStudio`버튼을 클릭 : [`https://www.rstudio.com/`](https://www.rstudio.com/)  
![그림8](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-8.png)   
2. Free 버전 `DOWNLOAD` 버튼을 클릭(그 외 버전은 사용제품으로 비용을 지불해야 한다.)  
![그림9](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-9.png)
3. `RStudio 1.2.1355-Windows 7+ (64bit)` 버튼을 클릭(버전은 계속 변경됨)  
![그림10](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-10.png)
4. 다운로드 완료 후, `RStudio-1.2.1335.exe`파일을 더블 클릭하여 설치(디폴트로 `Next`만 누르면 설치됨)  
![그림11](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-11.png)
5. 설치가 완료되면 윈도우 시작버튼을 눌러 하단 검색창에 `rstudio`를 입력 후, 검색된 프로그램을 클릭하여 실행한다.   
![그림18](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-18.png)
7. 정상적으로 설치되었는지 확인하기 위해, `Console`탭에서 아래와 같이 소스코드를 입력  
```r
print("welcome")
```
8. 그림과 같이 입력한 문자열이 그대로 나오면 정상적으로 설치가 완료된 것이다. 
![그림12](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-12.png)

## R Studio 환경설정   
---
R Studio을 보다 편리하게 사용하기 위한 몇가지 Tip을 소개한다.

1. 편집기 `인코딩` 방식 변경
   - 그림과 같이 `Tools> Global Options > Code > Saving > Change버튼 > UTF-8선택` 순서로 클릭)  
   ![그림13](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-13.png)
   - 설정을 변경하면 자동으로 R를 껐다 켤것인지 묻는데 `Yes`를 눌러준다.
   ![그림14](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-14.png)

2. 편집기 코딩 폰트 등 스타일 변경 : `Tools> Global Options > Appearance > 폰트, 사이즈, 테마 등 선택`  
   ![그림17](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-17.png)

3. 화면 레이아웃 변경 : `Tools> Global Options > Pane Layout > 화면 위치별 원하는 레이아웃 선택`  
   ![그림16](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-16.png)

4. 자동줄바꿈 기능 해제 : `Tools> Global Options > Code > Editing > Soft-wrap R source files 체크해제`  
   ![그림15](https://theorydb.github.io/assets/img/dev/r/2019-05-01-dev-r-rinstall-15.png)  
   ※ 참고로 코드 실행 시 `Ctrl+Enter`키를 누르면 멀티라인 실행이 가능하다.


이로써 R을 사용하기 위한 사전작업이 모두 완료되었다. 다음 포스트에는 간단한 R의 사용방법에 대하여 설명하겠다.

