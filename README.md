## ☀️ 시현 영상

👉 [보러가기](https://www.youtube.com/watch?v=eLuiGcd2uWM)
<br />

## ☀️ Secret Todo란?

- 누구에게도 공유하고 싶지 않은 비밀스러운 Todo List를 관리 할 수 있습니다.

<br />

## ☀️ Secret Todo 핵심 기능

- Todo List 일정 등록, 삭제, 편집

<br />

## ☀️ 개발 인원 및 기간

- 개발기간 : 2022/08/17 ~ 2022/08/18 (총 2일)

- 개발 인원
  - F/E(1명) : 김민석
  - B/E : wanted
    <br />

## ☀️ 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"/><img src="https://img.shields.io/badge/MobX-FF9955?style=flat-square&logo=MobX&logoColor=white"/><img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>
<br />

## ☀️ 구현 기능

💁🏻 공통
Response HTTP Status에 따라 Toast 메시지가 나타나도록 설정했습니다.

💁🏻 Sign-in / Sign-up

- 공통
  - 하나의 경로에서 Sign-in, Sign-up을 할 수 있도록 라우팅을 구현했습니다.
  - 이메일은 @ 포함하도록 유효성 검사를 하고, 시각적으로 표현되도록 구현했습니다.
  - 비밀번호는 8자 이상 입력하도록 유효성 검사를 하고, 시각적으로 표현되도록 구현했습니다.
  - 유저가 지정된 서식을 모두 만족해야 Sign-in, Sign-up 버튼이 활성화 됩니다.
  - Sign-in시 발급 받은 JWT Token이 있다면 todo 페이지로 리다이렉트 됩니다.
- Sign-in
  - 지정된 서식을 모두 만족하고, 패스워드가 틀리지 않았다면 Sign-in을 할 수 있습니다.
- Sign-up
  - 이미 등록된 Email이 아니고, 지정된 서식을 만족하면 Sign-up을 할 수 있습니다.
  - Sign-up에 성공하면 todo 페이지로 리다이렉트 됩니다.

<br />

💁🏻 Todo List

- 서버와 통신이 연결되지 않는 다면 로딩 스피너가 나타납니다.
- Sign-in시 발급 받은 JWT Token이 없다면 Sign-in 페이지로 리다이렉트 됩니다.
- 저장된 데이터가 없다면 Not a Data가 표기됩니다.
- 입력창에 아무것도 입력하지 않는다면 Create 버튼이 비활성화 됩니다.
- todo list가 수정 모드라면 Create 버튼이 비활성화 됩니다.
- 입력창에 내용을 입력하고, Create 버튼을 클릭하거나 Enter 키를 입력하면 todo list가 등록됩니다.
- 한 개의 게시물이라도 등록한다면 페이지네이션 기능이 활성화 됩니다.
- 한 페이지에서 10개까지 보이고, 20개, 30개가 보이도록 설정할 수 있습니다.
- 등록된 게시물은 수정 할 수 있으며, Pen 아이콘을 클릭하면 수정모드가 활성화 됩니다.
- 수정 입력 창에 아무것도 입력하지 않으면, 제출 할 수 없도록 버튼이 비활성화 됩니다.
- 수정할 내용을 입력하고 이모티콘을 클릭하면 완료 여부를 수정할 수 있고, Submit 버튼을 클릭하면 수정이 완료됩니다.
- 수정을 취소하고 싶다면 Submit 버튼 오른쪽의 'Cancel'을 클릭하면 취소 할 수 있습니다.
- 삭제하고 싶은 게시물이 있다면, Pen 아이콘 오른쪽의 Delete 아이콘을 클릭하면 삭제 할 수 있습니다.(단, 재확인 삭제 요청은 하지 않습니다)

<br />

## ☀️ 이슈 공유

클릭한 버튼이 가리키고 있는 게시물의 id를 선택하여 게시물의 내용을 Update 하는 것이 가장 오랜 시간이 소요되었습니다.

- 해결 방법은 의외로 매우 간단했습니다 현재 게시물의 id와 유저가 클릭한 id가 일치하면 Update 모드가 되게끔 하면 됩니다.
- list.id는 게시물의 id번호이고, todoDataStore.isTodoContentEditId는 유저가 클릭한 게시물의 id번호입니다.
- switch문이기 때문에 list.id === todoDataStore.isTodoContentEditId 이면 return 문이 실행됩니다.

```javascript
{(() => {
  switch (list.id) {
    case todoDataStore.isTodoContentEditId:
      return (
        ...your code
      );
    default:
  }
})()}
```

## ☀️ 우리의 Todo List Web App을 소개합니다. - tutorials

1. Sign-in, Sign-up

- 우리 사이트를 처음 이용한다면 Sign Up을 눌러서 회원가입을 진행해보세요 😊
  <img src="https://user-images.githubusercontent.com/90183279/185435012-47846be1-ccc9-411b-845e-e71c1ab486cf.png" width="400" height="400"/>

- 회원가입에 성공한다면 별도의 로그인은 필요 없습니다. 😀 바로 서비스를 이용해보세요.
  <br />

2. Todo List

- 일정 등록하는 방법을 알아볼까요?

  - 여기 보이는 입력창에 작성하려는 내용을 작성합니다.  
     <br />
    <img src="https://user-images.githubusercontent.com/90183279/185435887-1d7dc0a1-d948-45e3-8b2a-512fae75ac2f.png" width="400" height="400"/>

  - Create 버튼을 클릭하거나 Enter 키를 누르면 등록이 완료됩니다.
    <br />
    <img src="https://user-images.githubusercontent.com/90183279/185436359-ef8db209-9d05-44b5-9329-7f9591db215d.png" width="400" height="400"/>

<br />

- Todo를 Update 하고 싶습니다.

  - 이 아이콘을 클릭하면, 수정할 수 있는 입력창이 생성됩니다.
    <br />
    <img src="https://user-images.githubusercontent.com/90183279/185438558-f088798a-5c1f-40a9-85f0-c00769f049fd.png" width="400" height="400"/>

  - 입력창에 수정하려는 내용을 작성합니다.
    <br />
    <img src="https://user-images.githubusercontent.com/90183279/185438860-25037648-74a7-43cd-a851-1bd264768091.png" width="400" height="100"/>

  - 일정을 완료했다면 이 아이콘을 클릭하세요
    <br />
    <img src="https://user-images.githubusercontent.com/90183279/185439092-7044ddb1-4606-4f6e-b225-c9df7d986f87.png" width="400" height="100"/>

  - 내용도 작성이 끝났고, 아이콘도 잘 선택했다면, Submit 버튼을 누르거나 Enter 키를 누르면 Update가 완료됩니다.
    <br />
    <img src="https://user-images.githubusercontent.com/90183279/185439286-db507a02-5557-4fe7-b2aa-9a76f5b478d8.png" width="400" height="100"/>

<br />

- Todo를 삭제하고 싶어요!

  - Todo를 삭제하고 싶다면 오른쪽 끝단의 Delete Icon을 클릭해주세요.
    <br />
    <img src="https://user-images.githubusercontent.com/90183279/185439546-2449d1d3-a9d6-4a6a-91ed-5790c675effb.png" width="400" height="100"/>

  - 단! 다시한번 묻지 않으니, 다시 한번 생각하고 삭제해야겠지요? 😅
    <br />

3. Logout

- 화면 최상단의 Logout 버튼을 클릭하면 Logout 됩니다.
  <br />
  <img src="https://user-images.githubusercontent.com/90183279/185439688-2add2063-d9b7-41cd-9b89-76e5ab3e66e9.png" width="400" height="400"/>
