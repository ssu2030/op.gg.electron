# op.gg.electron
- 개요: op.gg electron 엔지니어 사전 과제

### 01. Prerequisites
- install [Node.js & npm](https://nodejs.org/)

### 02. Project set-up
##### Install the dependencies
``` bash
git clone https://github.com/ssu2030/op.gg.electron.git
```
또는
``` bash
git clone git@github.com:ssu2030/op.gg.electron.git
```

- `npm install`을 실행하여 필요한 라이브러리들을 설치하세요. 
  - package-lock.json 파일이 생성됩니다. 

### 03. Project structure
```
.
+-- deploy // 패키징 시에 생성되는 standalone application 및 installer
+-- dist // 빌드 시에 생성되는 파일들
+-- platform // electron 설정 디렉토리
+-- src // 개발 디렉토리
| +-- common // assets , util 관련 디렉토리
| +-- resource // 이미지 리소스 파일
| +-- page // main page 내 컴포넌트 디렉토리
| +-- store // 프로그램의 상태 및 로직 디렉토리
| +-- Homepage.moudule.scss // homepage 스타일
| +-- Global.scss // 글로벌 스타일
| +-- Homepage.tsx // homepage (메인페이지)
| +-- window.ts // Electron 환경에서의 창 조작에 관련된 디렉토리
| +-- index.tsx // 엔트리 포인트
+-- .gitignore
+-- package-lock.json
+-- package.json
+-- tsconfig.json // 타입스크립트 설정 파일
```

### 04. 실행방법
##### 1. dev mode 실행
``` bash
npm run install
npm run build
npm run electron-dev
```

##### 2. deploy
``` bash
npm run install
npm run build
npm run electron-build
```

### 05. 실행화면
##### 01. 메인 페이지
![1](https://user-images.githubusercontent.com/31645582/197677942-3979f23b-2b1f-47e2-b4a8-ecde690e9e26.PNG)

##### 02. league of legend 실행 중 일 때
![3](https://user-images.githubusercontent.com/31645582/197678034-44da9f46-15eb-443d-87ac-92d538e7af9a.PNG)

##### 03. league of legend 실행 중이 아닐 때
![2](https://user-images.githubusercontent.com/31645582/197678095-33358e04-1dac-4ca4-8ee8-e35ffb3ef708.PNG)

### 06. 주요 패키지 
- league connect
  - lcu api wrapping
- ps-node
  - 실행중인 프로세스 데이터 확인을 위함

### 07. 구현사항
- 헤더: 새로고침, 최대, 최소, 닫기 구현 (구현 완료)
- 메인 페이지 
  - op.gg: iframe 이용 op.gg 연결 (구현 완료)
  - 롤 실행 페이지: 롤 실행 중 일때 (구현 완료)  
  - 발로란트 실행페이지: 발로란트 실행 중 일때 **(구현 미진)**
    - 사유: riot client 실행 이후, valorant의 경우 어떤 call 로 실행중인지에 대한 확인 기능 구현하지 못함
    - league-connect를 이용하여, RiotClientUX를 args로 주게 될 경우 현재 실행중인 client에 대한 state를 가져올 수 있지만 발로란트 관련해서 알 수 있는 방법을 찾지 못했습니다.





