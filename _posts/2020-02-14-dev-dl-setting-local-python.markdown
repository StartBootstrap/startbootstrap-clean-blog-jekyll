---
layout: post
title:  "[Setup] 딥러닝 개발 환경 구축 한방에 끝내기"
subtitle:   "How to build a deep learning environment with python"
categories: dev
tags: dl data science ai python local deep learning setup build
comments: true
---


## 개요
> 딥러닝이라는 긴 여정을 위한 첫 단계. `딥러닝 개발 환경 구축`을 위한 포스팅입니다. 환경설정으로 인한 시간낭비를 최소화 하고자 대부분의 내용을 `총정리`합니다.
  
- 목차
	- [사전 확인사항 및 GPU 준비](#사전-확인사항-및-gpu-준비)
	- [아나콘다(Anaconda) 설치](#아나콘다anaconda-설치)
	- [텐서플로(TensorFlow)를 위한 사전 호환성 검토](#텐서플로tensorflow를-위한-사전-호환성-검토)
	- [Visual Studio 2019 설치](#visual-studio-2019-설치)
	- [CUDA 10.1 설치](#cuda-101-설치)
	- [cuDNN v7.6.5 설치](#cudnn-v765-설치)
  - [가상 개발 환경 만들기 및 접속](#가상-개발-환경-만들기-및-접속)
  - [텐서플로 및 기타 라이브러리 설치](#텐서플로-및-기타-라이브러리-설치) 
  - [설치 환경 테스트](#설치-환경-테스트) 
  - [PyTorch 설치](#pytorch-설치) 
  - [마치며...](#마치며) 


## 사전 확인사항 및 GPU 준비
---
시간낭비를 방지하기 위해 먼저 아래의 `구축할 기술 스택`을 확인하시기 바란다. Ubuntu 등 Linux 환경은 시간이 나는대로 별도의 포스팅을 통해 기술할 예정이다. Mac은 2019년도 말 Nvidia와 결별했으므로 작성하지 않을 예정이다.

더불어 귀차니즘 때문에 딥러닝 및 머신러닝 학습을 포기하는 일이 없도록 거의 모든 환경 설정을 다룰 예정이다. 따라서 상단 개요의 `목차`를 잘 확인하시어 불필요한 부분은 건너뛰며 시간을 절약하시기 바란다. GPU 없이도 작업이 가능한 경우 상당 부분 건너뛸 수 있다.

* __구축할 기술 스택__
  - Window10 64-bit 
  - Python 3.7 (아나콘다 conda 4.7.12)
  - TensorFlow GPU 2.0
  - CUDA Toolkit 10.1 update2
  - NVIDIA® GPU drivers 418.x or higher.
  - Visual Studio 2019
  - cuDNN v7.6.5
  - LightGBM, XGBoost 등

* __GPU 체크__
  - __1. 내 PC에 장착된 GPU 모델 확인__  
    [윈도우키+X] > 장치관리자 클릭 > 디스플레이 어댑터 클릭 > 모델명 확인
    ![모델 확인](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-2.png)
  - __2. Nvidia 제품이 아니라면 구매 후 다시 읽어주시기 바란다.__  
    물론 AMD나 Intel에서도 OpenCL 프레임워크로 딥러닝을 활용할 수는 있으나 결코 쉽지 않은 영역이다. 관심있으면 [딥러닝프레임워크 비교](https://www.slideshare.net/JunyiSong1/ss-75552936)를 참고하시기 바란다.
  - __3. 내 GPU가 CUDA 툴킷을 활용할 수 있는지 [Nvidia](https://developer.nvidia.com/cuda-gpus)에 접속하여 확인한다.__  
    아래 그림과 같이 `CUDA-Enabled GeForce and TITAN Products` 버튼을 클릭하면 좌측에 PC, 우측에 노트북 기준의 모델별 Capability가 나오는데 목록에 존재하지 않거나 3.0 미만이면 활용할 수 없다.
    ![CUDA](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-1.png)

이상이 없다면 본격적으로 설치를 진행하자.

## 아나콘다(Anaconda) 설치
---
아나콘다는 파이썬 기반의 범용 패키지로 머신러닝을 비롯한 과학 계산용도로 인기가 좋다. 아나콘다 대신 Python을 직접 설치할 수도 있지만 필요한 패키지를 전부 찾아 pip 명령어로 별도로 설치해야 하거나, XGBoost 등 윈도우에서 설치가 까다로운 패키지들도 쉽게 설치할 수 있기 때문에 본 장에서는 아나콘다를 설치한다. 더욱이 텐서플로는 공식적으로 윈도우에서 아나콘다 배포판을 설치할 것을 권장한다.

* [아나콘다 공식 사이트](https://www.anaconda.com/distribution/)에 접속하여 다운로드 한다. Download 버튼을 누르면 OS 및 32/64-Bit와 일치하는 버전이 자동으로 다운로드된다.  
  ![아나콘다](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-3.png)

* 아래 그림과 같은 단계를 제외하고는 다운로드 된 파일(필자의 경우 Anaconda3-2019.10-Windows-x86_64.exe)을 실행한 후 디폴트 설정대로 `Next`만 눌러나가면 된다. 아래 그림을 만나게 될 경우 `체크박스 2개 모두 체크` 후 Install을 누른다. (체크 시 이미 기존에 설치된 Python이 있는 경우 충돌 이슈가 있는데 그런 상황을 맞닥드리는 고수분께서는 현명하게 알아서 체크 옵션을 조절할 능력이 되므로 초보자의 기준으로 설명한다.)  
  ![아나콘다 체크옵션](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-4.png)

* 설치 완료 후, 시작버튼 > Anaconda > Anaconda Prompt 를 클릭하면 윈도우 명령프롬프트(cmd)와 비슷한 화면이 나온다. 아래 그림과 같이 `python`이라고 입력 시 Python의 버전이 나온다면 정상적으로 설치된 것이다. `Ctrl+Z` 명령어로 빠져나온 후 `conda --version` 명령어를 통해 아나콘다의 버전도 확인해본다.  
  ![버전확인](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-5.png)
  만약 아나콘다를 최신 버전으로 업데이트 하고 싶을 경우 Anaconda Prompt를 관리자 권한으로 실행하여 아래와 같이 명령어를 입력한다. 여기에선 생략한다.
  ```
  conda update -n base -c defaults conda   # 아나콘다 업그레이드
  conda update --all                       # 파이썬 패키지 업그레이드
  ```

## 텐서플로(TensorFlow)를 위한 사전 호환성 검토 
---
본 장에서는 텐서플로를 설치하기 위해 CUDA, cuDNN, Visual Studio와의 호환성을 먼저 검토한다. 흔히들 tensorflow-gpu를 처음 설치할 때 한번에 성공하는 사람이 드문데 바로 이 호환성 문제를 너무 쉽게 생각하기 때문이다. 필자의 동료들도 질문하는 분들이 많아 이 참에 호환성을 검토하는 방법을 짚고 넘어가려 한다.(최초 설치 뿐만아니라 추후 최신 버전의 업그레이드시에도 참고하시기 바란다.)  

텐서플로를 설치하려면 당연히 공식문서를 확인해야 한다. <https://www.tensorflow.org/install>에 접속하면 먼저 상단에 지원 가능한 시스템이 나온다. 앞 장에서 윈도우10에 아나콘다를 설치한 것도 그냥 설치한 것이 아니라 사실 호환성을 검토하여 Python 3.5–3.7, Windows 7 or later의 요건을 확인 후 설치한 것이므로 반드시 본 문서를 버전별로 숙지하고 설치해야 한다.  (그냥 감으로 때려맞추며 설치했다간 나중에 전부 다 재설치하는 봉변을 겪게 될지도 모른다.)

공식문서를 보자. 좌측 메뉴에 여러 특성들이 안내 되어있지만 이 중 눈여겨봐야 할 메뉴는 `GPU 지원`이다. 아래 그림과 같이 표시한 부분이 핵심이다. 
![지원가능한 GPU](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-6.png)

* __Hardware requirements__
  + CUDA-enabled GPU cards 항목이 첫번째 장에서 소개한 지원 가능한 GPU 목록 링크이다. 이미 확인했으므로 건너뛴다.

* __Software requirements__
  + 첫번째, `NVIDIA® GPU drivers` 항목을 클릭하면 드라이버를 다운로드 받는 창이 뜬다. `CUDA 10.1 requires 418.x or higher.`라고 명시가 되어있으므로 우리 PC에 설치된 드라이버의 버전은 당연히 418. 버전 이상이어야 한다. 아닐 경우 아래와 화면과 같이 붉은색으로 표시한 부분에 내 PC의 GPU 정보를 입력 후 최신버전을 다운로드 받아 설치한다.
  ![드라이버 다운로드](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-7.png)

  + 두번째, `CUDA® Toolkit`은 CUDA 툴킷에 대한 요건이다. TensorFlow >= 2.1.0 이상인 경우에 CUDA 10.1을 지원한다는 것을 알 수 있다. 항목을 클릭하면 아래 화면과 같이 `CUDA Toolkit 10.1 update2`라는 10.1 버전의 최신 정보가 보인다. 우측의 `Versioned Online Documentation`를 클릭해서 조금 더 자세히 살펴보자.
  ![CUDA Toolkit](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-8.png)

* __CUDA Toolkit v10.1.243 문서__
  + 클릭하면 CUDA Toolkit 가이드가 나오는데 `Installation Guides > Installation Guide Windows`을 차례대로 클릭해보자. 아래 붉은색으로 표시한 부분에서 Cuda 10.1이 윈도우 10에서 지원한다는 사실과 컴파일러 도구로 Visual Studio 2019 16.x 버전을 설치해야 한다는 것을 알게 되었다.
  ![System Requirements](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-9.png)
  
이것으로 호환성을 위한 조사는 거의 끝났다. 비록 영어지만 공식 문서에 관련된 모든 정보가 꼼꼼하고 친절하게 기입되어있다. 추가적인 정보가 필요한 분들은 나머지 항목들도 유심히 살펴보시기 바란다.

## Visual Studio 2019 설치 
---
위에서 조사한바와 같이 윈도우 환경에서 컴파일러 도구로 Visual Studio가 필요하다는 것을 확인했다. Visual Studio를 설치하는 목적은 LightGBM, Surprise등의 패키지를 활용하기 위함이므로 Visual Studio 2019용 Build Tools을 설치해도 되는데 컴퓨터 비전을 위한 전처리 등 OpenCV의 활용 가능성을 위해 여기서는 Community 라이센스를 설치한다. 버전은 위에서 확인한대로 2019을 설치한다.

* <https://visualstudio.microsoft.com/ko/downloads/>에 접속하여 아래 그림과 같이 Visual Studio 2019 Community 버전을 다운로드한다.
  ![Visual Studio 2019 Community](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-10.png)

* 다운로드 한 파일을 더블클릭하여 설치 중 아래 화면과 같이 `C++를 사용한 데스크톱 개발`에 클릭한 후 설치한다.
  ![C++](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-11.png)


## CUDA 10.1 설치 
---
위에서 호환성 조사 시 접속했던 [CUDA Toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive)에 다시 접속한다.

* `CUDA Toolkit 10.1 update2 (Aug 2019)`을 클릭한 후 아래와 같이 PC 환경에 맞는 값을 선택 후 다운로드 한다.
  ![CUDA 다운로드](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-12.png)

* 다운로드가 완료되면 해당 파일을 관리자 권한으로 실행하여 설치한다. 

## cuDNN v7.6.5 설치 
---
마찬가지로 [software_requirements](https://www.tensorflow.org/install/gpu#software_requirements)에 다시 접속한다. `CUPTI`는 CUDA Toolkit과 같이 제공된다고 명시되어 있으므로 별도의 설치가 필요없다. `cuDNN SDK`을 클릭한다.

* [cudnn](https://developer.nvidia.com/cudnn) 페이지로 연결되는데 `Download cuDNN` 버튼을 클릭한다. 이어서 `Login`버튼을 클릭하여 로그인한다. 계정이 없는 경우 새로 만들어야 하는데 로그인 화면 하단의 `Login with your social account`를 클릭하면 페이스북 등의 SNS 계정으로 보다 쉽게 가입할 수 있다. 이메일 본인인증 및 간단한 설문조사를 마치고 나면 아래 화면과 같이 다운로드 페이지가 활성화된다. `cuDNN Library for Windows 10`을 클릭하여 다운로드한다.
  ![cuDNN 다운로드](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-13.png)

* 설치 방법은 역시 공식문서에 자세히 나와있다. [install-windows](https://docs.nvidia.com/deeplearning/sdk/cudnn-archived/cudnn_765/cudnn-install/index.html#install-windows) 링크를 참고하면 된다. 일단 다운로드 받은 파일을 압축풀기 하면 `cuda` 폴더 밑에 `bin, include, lib` 등 3개의 폴더가 존재함을 확인할 수 있다. 3개의 폴더를 복사하여 CUDA가 설치된 폴더인 `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1` 폴더에 그대로 붙여넣기(덮어씌우기) 하면 된다.

* 3. 윈도우 명령프롬프트에서 `control sysdm.cpl > 고급 탭 선택 > 환경변수 버튼`을 클릭한다. 시스템 변수에 `CUDA_PATH` 변수의 값이 잘 지정되었는지 확인하고, 없으면 공식 문서에서 언급한 바와 같이 다음의 환경변수를 추가한다.(일반적으로 별도의 환경변수를 추가할 필요는 없다.)
  ```
  Variable Name: CUDA_PATH 
  Variable Value: C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1 
  ```

## 가상 개발 환경 만들기 및 접속
---
이로써 GPU를 활용하기 위한 사전 환경설정은 끝났다. 이제 본격적으로 텐서플로 등의 패키지를 설치해야 하는데 그 전에 `가상 개발환경`을 구성한다. 이를 구성하는 이유는 `프로젝트 별로 파이썬의 라이브러리 사용여부 및 버전이 다를 경우` 충돌을 방지하기 위해서이다. 

예를들어 최근 텐서플로 2.0 버전이 출시되었는데 1.x 버전을 사용하던 기존 프로젝트의 레거시 규모가 거대할 경우 2.0 버전으로 포팅을 완료하기 전까지는 1.x 버전을 활용해야 한다. 그런데 지금처럼 텐서플로 2.0을 활용하여 신규 프로젝트를 진행하고 싶은 경우 버전 충돌이 일어난다. 이를 피하기 위해서 프로젝트 단위별로 가상 환경을 구성하는 것이 중요하다.

* 우선 아나콘다 프롬프트에 접속한 후(시작버튼 > Anaconda > Anaconda Prompt), 아래와 같이 test용 폴더를 만든다.
```
(base) C:\projects\dl\test>
```

* 이어서 필요 시 아나콘다의 버전을 최신화한다. (현 버전이 마음에 들면 건너뛰어도 무방하다.)
```
(base) conda update -n base -c defaults conda
```

* 새로운 가상환경을 만든다. (참고로, 쉽게 예시를 들기 위해 가상환경 이름을 test로 사용하였으나, 보통은 `tensorflow2_py37`와 같이 프레임워크 및 버전에 맞게 명명한다.)
```
(base) conda create -n test python=3.7
```

* 가상환경으로 접속한다.
```
(base) C:\projects\dl\test>activate test
```


## 텐서플로 및 기타 라이브러리 설치
---
가상환경에 접속하면 프롬프트 맨 앞이 (base) -> (test)로 변경되는 것을 확인할 수 있다. 이제 가상환경에 필요한 버전의 텐서플로와 기타 필요 라이브러리를 설치한다.

* `쥬피터 노트북`과 관련된 라이브러리를 제일 먼저 설치한다.
```
(test) conda install -n test ipython notebook jupyter 
```

* 개발중인 프로젝트가 의존성 및 버전 등에 민감한 경우, 아래와 같이 라이브러리의 `특정 버전`을 같이 명시할 수도 있다.
```
(test) conda install -n test numpy==1.16.4 # numpy의 특정 버전을 설치하고 싶은 경우 버전 명시
```

* 다음으로 머신러닝 및 딥러닝에 자주 활용되는 패키지를 설치한다. 패키지명 각각의 기능이 궁금하다면 예전에 작성한 [머신러닝을 위한 파이썬의 도구들](https://theorydb.github.io/review/2019/06/05/review-book-intro-ml-py/#%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%9D%98-%EB%8F%84%EA%B5%AC%EB%93%A4scikit-learn-%EB%93%B1)을 참고하시기 바란다.
```
(test) conda install -n test numpy scipy matplotlib spyder pandas seaborn 
scikit-learn h5py pillow matplotlib tqdm 
```

* tensorflow를 설치한다.
```
(test) conda install -n test tensorflow-gpu 
```

* keras를 설치한다.
텐서플로 2 버전부터는 케라스가 내장되어 별도의 설치가 필요없으나 이전 버전인 경우 아래와 같이 설치한다.
```
(test) conda install -n test keras 
```

마지막으로 일반적인 방법으로는 설치되지 않는 까다로운 패키지들을 설치해보자.

* 먼저 그라디언트 부스팅으로 자주 활용되는 `xgboost`를 설치해보자. 위 방식과 동일하게 일반적인 방법으로 설치하면 "The following packages are not available from current channels"이라는 오류메시지가 나온다. 

  이럴 경우 보통 설치 명령어에 `-c conda-forge` 옵션을 추가하면 해결되는 경우가 많다. 이는 conda install에서 제공하는 다운로드 기본 채널에 패키지가 존재하지 않아서 발생하는 문제인데 conda-forge 옵션을 통해 검증된 패키지들이 모인 채널에서 강제로 다운로드 받아 설치하겠다는 옵션이다. 
  
  하지만 xgboost는 이 방법으로도 해결되지 않는다. 이럴 경우 최상의 솔루션은 위에서 언급한 바와 같이 공식 문서에서 찾는 것이다. <https://anaconda.org/anaconda/py-xgboost>링크에 접속하면 윈도우 64비트 버전의 xgboost를 설치하는 방법이 안내되므로 아래와 같이 해당 페이지에서 제시하는 명령어로 설치하면 이상없이 설치된다.
  ```
  (test) conda install -n test -c anaconda py-xgboost
  ```

* 마찬가지로 `catboost`도 위와 같이 공식문서를 참고하여 설치한다.
  ```
  (test) conda install -n test -c conda-forge catboost
  ```

* 동일하게 `lightgbm` 등도 위와 같이 설치한다.
  ```
  (test) conda install -n test -c conda-forge lightgbm   # lightgbm
  (test) conda install -n test -c conda-forge pydotplus  # pydotplus
  (test) conda install -n test -c conda-forge pydot      # pydot
  ```

* 그 외 `scikit-image, patsy, statsmodels, opencv` 등 별도로 필요한 라이브러리를 설치한다.

* 설치가 모두 완료되었다면 이제 마지막 단계이다. 지금 구축한 가상환경을 ipython kernel로 등록한다.
```
python -m ipykernel install --user --name test
```

이상으로 라이브러리 설치를 마친다. 그 외 Kaggle 혹은 실무 프로젝트의 필요에 의해 다른 패키지 설치가 필요한 경우 <https://anaconda.org/conda-forge/lightgbm>와 같은 공식문서 혹은 검색을 활용하시기 바란다.


## 설치 환경 테스트
---
이제 모든 준비는 끝났다. 남은 것은 지금까지 설치한 환경이 잘 돌아가는지 테스트하는 것이다. 

* 아나콘다 프롬프트에서 가상환경에 접속한 후 아래의 명령어로 `주피터 노트북에 접속`한다.
```
(test) C:\projects\dl\test>jupyter notebook
```
아래와 같이 예쁜(?) 쥬피터 노트북이 <http://localhost:8888/tree> 주소로 실행되는 것을 볼 수 있다. 우측의 `New` 버튼을 클릭하여 위에서 ipython kernel로 등록한 `test`를 선택한 후 아래 예제를 차례로 실행해본다.
![쥬피터 노트북](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-14.png)

* 텐서플로 GPU 버전 설치여부 확인
빈 셀에 아래의 코드를 입력한 후 
```
import tensorflow
from tensorflow.python.client import device_lib
print(device_lib.list_local_devices())
```
`Shift + Enter` 단축키를 누르면 아래 그림과 같은 GPU 정보를 확인할 수 있다. 
![tensorflow-gpu](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-15.png)

이를 통해 tensorflow(CPU버전)가 아닌 tensorflow-gpu가 이상없이 설치되었음을 확인할 수 있다. 추가로 GPU 모델은 GeForce GTX 1660 Ti이고(~~스펙이 낮다고 비웃지 마시길...ㅜㅜ 이것도 와이프 몰래 사비를 털어서 어렵게 어렵게 장만했습니다.~~), compute capability는 7.5이며, 메모리는 약 4GB 정도 된다는 것을 확인할 수 있고 GPU는 1개가 있음 등의 정보를 확인할 수 있다.

* 그 외 기타 패키지들이 정상적으로 설치되었는지 아래의 코드를 통해 확인한다.
```
import tensorflow
from tensorflow import keras
import pandas
import sklearn
import scipy
import numpy
import matplotlib
import pydotplus
import pydot
import h5py
print('tensorflow ' + tensorflow.__version__)
print('keras ' + keras.__version__)
print('pandas ' + pandas.__version__)
print('sklearn ' + sklearn.__version__)
print('scipy ' + scipy.__version__)
print('numpy ' + numpy.__version__)
print('matplotlib ' + matplotlib.__version__)
print('h5py ' + h5py.__version__)
```

별다른 이상이 없다면 아래와 같은 결과가 나올 것이다.
```
tensorflow 2.0.0
keras 2.2.4-tf
pandas 1.0.1
sklearn 0.22.1
scipy 1.4.1
numpy 1.18.1
matplotlib 3.1.3
h5py 2.10.0
```

## PyTorch 설치
---
PyTorch는 Tensorflow와 함께 딥러닝 프레임워크의 양대 산맥이라고 할 수 있다. 몇 년 전만해도 NLP 분야에 자주 활용되었으나, 최근 2020년에 이르러 가장 많이 활용되는 딥러닝 프레임워크로 자리매김하는 등 파죽지세로 경쟁 프레임워크를 압도하고 있고 연구 결과를 구현하는데 애용되고 있기에 반드시 배워둘 필요가 있다. 

Tensorflow 1.x 대 버전에 비해 Define-By-Run 방식을 채택하여 직관적인 코드 설계가 가능하며 가독성 측면에서 유리하다. Computational Graphs를 빠르고 쉽게 분석할 수 있다는 점도 큰 장점이다. 덕분에 연구자들의 코드 구현에 있어 큰 사랑을 받아왔으며, <https://paperswithcode.com/> 와 같은 연구 결과를 코드로 구현하는 사이트에서 Pytorch로 구현한 코드가 상당한 포션을 차지하고 있다는 점에서 그 인기가 입증되고 있다고 볼 수 있다. 

Tensorflow는 Auto ML 등의 방대한 라이브러리 및 GCP 클라우드 호환이라는 나름 고유의 장점이 있고 2.0 이후로는 Define-By-Run 방식을 채택하고 있어 PyTorch와 기능상 큰 차이가 없지만 아직 대부분의 오픈 소스 및 레퍼런스들이 1.x 버전 대의 코드로 공유되고 있다는 단점이 있다. 

본 파트에서는 PyTorch를 설치하는 방법을 정리해 본다.


* 먼저 Anaconda Prompt 셀에 접속하여 Tensorflow를 설치할 때와 마찬가지로 새로운 가상 환경을 만든다. 여기에서는 가상환경의 이름으로 `pytorch17_p38`을 지정하였다.
```
C:\projects\torch> conda create -n pytorch17_p38 python=3.8
```

* 가상환경에 접속한다.
```
C:\projects\torch> conda activate pytorch17_p38
```

* <https://pytorch.org/>에 접속한 후, 스크롤을 내리다보면 아래 그림과 같은 INSTALL PYTORCH 메뉴가 보인다. OS 등 각자의 개발 환경 및 버전을 체크하면 보라색으로 표시한 부분과 같은 install 명령어가 자동 완성된다.
  ![pytorch](https://theorydb.github.io/assets/img/dev/dl/2020-02-14-dev-dl-setting-local-python-16.png)

* 위 명령어에 가상환경을 추가로 지정하여 설치한다.
```
(pytorch17_p38)C:\projects\torch> conda install pytorch torchvision torchaudio cudatoolkit=10.1 -c pytorch -n pytorch17_p38
```

* 주피터 노트북 등 추가로 원하는 라이브러리를 설치한다. 
```
(pytorch17_p38)C:\projects\torch> conda install -n pytorch17_p38 jupyter notebook ipython
```

* conda list 명령어를 통해 원하는 라이브러리가 원하는 버전으로 모두 설치되었는지 확인한다. 부족한 라이브러리는 위 명령어와 같이 추가로 설치한다.
```
(pytorch17_p38)C:\projects\torch> conda list
```

* 구축한 가상환경을 ipython kernel로 등록한다.
```
(pytorch17_p38)C:\projects\torch> python -m ipykernel install --user --name pytorch17_p38
```

* 주피터 노트북에 접속한 후, 방금 등록한 pytorch17_p38 커널을 선택하여 새 파일을 만든다.
```
(pytorch17_p38)C:\projects\torch> jupyter notebook
```

* 노트북 셀에 아래와 같은 import 문을 실행 시 오류가 발생하지 않으면 성공적으로 설치된 것이다.
```
import torch
```


## 마치며...
---
드디어 딥러닝 개발 환경이 구축되었다. 여기까지 따라오시느라 정말 고생하셨다는 말씀을 드리고 싶다. 추후 업무 도메인별, 플랫폼별 별도의 환경설정 방식을 정리하여 하나씩 추가할 예정이다. 특히 캐글에 관련된 환경설정은 한번 반드시 짚고 넘어갈 생각이다.

더불어 딥러닝 개발과 관련하여 예전에 정리한 문서를 링크로 남긴다.
* [[Colab] Google Colab 환경설정 및 사용법](https://theorydb.github.io/dev/2019/08/23/dev-ml-colab/)
* [[Jekyll Blog] 마크다운(Markdown) 사용법 및 예제](https://theorydb.github.io/envops/2019/05/22/envops-blog-how-to-use-md/)
* [[R] R 설치 및 환경구성(10분만에 끝내는)](https://theorydb.github.io/dev/2019/05/01/dev-r-rinstall/)
* [아나콘다 전용 파이참 다운로드](https://www.jetbrains.com/pycharm/promo/anaconda/)

긴 글 읽어주심에 감사드리며 궁금하시거나 문제점이 발생된다면 댓글 부탁드린다. 앞으로 개인적으로 진행했던 흥미로운 예제를 바탕으로 머신러닝 및 딥러닝의 포스팅을 종종 올릴 생각이니 잊지말고 자주 들려주시면 감사하겠다.   

