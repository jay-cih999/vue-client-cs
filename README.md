# vue-client-qna
Q&A Service web 화면입니다.

### 고객문의 접수 & 답변 개발 화면 입니다.

### 1. 프로젝트 구성(Client)

* UI Framework : Vue.js(ver.2)
* IDE Tool : Visual Studio Code
---
### 2. 실행 방법

1. Source Code Download
```
git clone 
```
2. node module 설치
```
cd vue-client-cs
npm install
```
3. 실행
```
npm run serve
```
4. 접속
```
chrome 에서 http://localhost:8080 으로 접속
```
5. 단위테스트
```
npm run test:unit
```
---

### 3. 문제 해결 전략
* 고객용 페이지 와 상담사용 페이지 구분 : vue pages 기능을 활용하여 router / store / main 을 구분하여 출력되도록 처리
* 고객 문의 등록 : validation 는 server 측에서 하도록 처리
* 고객 문의 상세 조회 : 비밀번호를 입력 받아 확인 후 조회 처리
* 상담사 문의 목록 Polling : 최초 할당인 상태만 출력되며, setInterval 을 이용하여 10초마다 search 함수 호출 하도록 처리
* 상담사 문의 할당 : 문의 상태가 할당 인 경우에만 할당하기 버튼을 출력하여 처리
* 상담사 문의 답변 : 본인이 할당 받은 문의가 아닐 경우는 server 에서 처리


### 4. 화면

