## 프로젝트 정보

React js v18
<br />
상태관리 : mobx v6
<br />
라우팅 : react-router-dom v6
<br />
CSS : tailwindcss v3
<br />

## 개발 인원

F/E : 1명
<br />

## 개발 기간
2일

## 클라이언트 요구사항

1. Sign-in / Sign-up
- "/" 경로에서 로그인/회원가입 모두 할 수 있게 해주세요.
  - 페이지 안에 이메일 입력창, 비밀번호 입력창, 제출 버튼이 포함된 형태로 구성해주세요
- 이메일과 비밀번호의 유효성 검사기능을 구현해주세요.
  - 이메일 조건: @ 포함
  - 비밀번호 조건: 8자 이상
  - 입력된 이메일과 비밀번호가 위 조건을 만족할 때만 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 /todo 경로로 이동해주세요
  - 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
  - 응답받은 JWT는 로컬 스토리지에 저장해주세요
- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
  - 로컬 스토리지에 토큰이 있는 상태로 / 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
  - 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 / 경로로 리다이렉트 시켜주세요
<br />  
2. Todo List

- /todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시되어야 합니다.
- 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가되도록 해주세요
- 투두 리스트의 수정, 삭제 기능을 구현해주세요
  - 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화되고 투두 리스트의 내용을 수정할 수 있도록 해주세요
  - 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소할 수 있도록 해주세요
  - 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제되도록 해주세요

## 이슈 공유
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

## 우리의 Todo List Web App을 소개합니다. - tutorials
1. Sign-in, Sign-up
- 우리 사이트를 처음 이용한다면 Sign Up을 눌러서 회원가입을 진행해보세요 😊
<br />

![스크린샷 2022-08-19 오전 12 30 13](https://user-images.githubusercontent.com/90183279/185435012-47846be1-ccc9-411b-845e-e71c1ab486cf.png)

<br />

- 회원가입에 성공한다면 별도의 로그인은 필요 없습니다. 😀 바로 서비스를 이용해보세요.

<br />
<br />

2. Todo List
- 일정 등록하는 방법을 알아볼까요?
  - 여기 보이는 입력창에 작성하려는 내용을 작성합니다.  
<br />

![스크린샷 2022-08-19 오전 12 35 41](https://user-images.githubusercontent.com/90183279/185435887-1d7dc0a1-d948-45e3-8b2a-512fae75ac2f.png)

<br /> 

  - Create 버튼을 클릭하거나 Enter 키를 누르면 등록이 완료됩니다. 
<br />

![스크린샷 2022-08-19 오전 12 38 00](https://user-images.githubusercontent.com/90183279/185436359-ef8db209-9d05-44b5-9329-7f9591db215d.png)

<br /> 
- Todo를 Update 하고 싶습니다.
  - 이 아이콘을 클릭하면, 수정할 수 있는 입력창이 생성됩니다.
<br />

![스크린샷 2022-08-19 오전 12 47 35](https://user-images.githubusercontent.com/90183279/185438558-f088798a-5c1f-40a9-85f0-c00769f049fd.png)

<br />
  - 입력창에 수정하려는 내용을 작성합니다.
<br />

![스크린샷 2022-08-19 오전 12 49 00](https://user-images.githubusercontent.com/90183279/185438860-25037648-74a7-43cd-a851-1bd264768091.png)

<br />
  - 일정을 완료했다면 이 아이콘을 클릭하세요
<br />

![스크린샷 2022-08-19 오전 12 50 06](https://user-images.githubusercontent.com/90183279/185439092-7044ddb1-4606-4f6e-b225-c9df7d986f87.png)

<br />
  - 내용도 작성이 끝났고, 아이콘도 잘 선택했다면, Submit 버튼을 누르거나 Enter 키를 누르면 Update가 완료됩니다.
<br />

![스크린샷 2022-08-19 오전 12 51 17](https://user-images.githubusercontent.com/90183279/185439286-db507a02-5557-4fe7-b2aa-9a76f5b478d8.png)

<br />
- Todo를 삭제하고 싶어요!
  - Todo를 삭제하고 싶다면 오른쪽 끝단의 Delete Icon을 클릭해주세요.
<br />

![스크린샷 2022-08-19 오전 12 52 35](https://user-images.githubusercontent.com/90183279/185439546-2449d1d3-a9d6-4a6a-91ed-5790c675effb.png)

<br />
  - 단! 다시한번 묻지 않으니, 다시 한번 생각하고 삭제해야겠지요? 😅
<br />
3. Logout
- 화면 최상단의 Logout 버튼을 클릭하면 Logout 됩니다.
<br /> 

![스크린샷 2022-08-19 오전 12 53 16](https://user-images.githubusercontent.com/90183279/185439688-2add2063-d9b7-41cd-9b89-76e5ab3e66e9.png)

<br />




