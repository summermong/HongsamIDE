# HongsamIDE 💻
- 구름 2차 팀 프로젝트로, 알고리즘 문제를 풀 수 있는 Web IDE입니다.
  
    - 유저의 선호도에 맞게 다크 모드를 설정할 수 있습니다.
    - 마이 페이지에서 인증 후 닉네임과 비밀번호, 프로필 사진을 바꿀 수 있습니다.
    - 검색어에 해당되는 문제, 레벨에 맞는 문제를 조회할 수 있습니다.
    - 문제를 클릭하면 IDE 서브 도메인으로 라우팅 되고, 코드를 컴파일러로 전송합니다.
    - 결과에 따라 정답, 오답의 결과를 도출할 수 있습니다.
    - 함께 문제를 논의할 수 있도록 문제별 채팅방에서 채팅을 나눌 수 있습니다.

## R&R
- FE 강경규: Web IDE UI/타이머
- **FE 황윤: 메인 UI/로그인 및 회원가입/다크 모드/문제 목록 페이지/마이 페이지/채팅**
- BE 박서연: 회원가입/로그인 및 회원가입/마이 페이지/채팅
- BE 이동우: CICD 및 인프라/Web IDE
  
## 기술 스택
- FE: React, Tailwind, CSS module
- BE: Java Spring boot, Mysql, Lambda, Redis
- DevOps: Docker, Jenkins, AWS
- Com: Github, Slack, Discord, Notion

## 인프라 구조
![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDliUZ%2FbtsyMc1otHV%2FTq7LccQDTvRqSUO1E4V7ok%2Fimg.png)

## 폴더 구조
```plaintext
📦src
 ┣ 📂Components
 ┃ ┣ 📜DarkModeToggle.js
 ┃ ┣ 📜DarkModeToggle.module.css
 ┃ ┣ 📜Nav.js
 ┃ ┣ 📜Nav.module.css
 ┃ ┣ 📜PasswordConfirm.js
 ┃ ┣ 📜PasswordConfirm.module.css
 ┃ ┣ 📜QuestionContainer.js
 ┃ ┣ 📜QuestionPageBtn.js
 ┃ ┣ 📜UserInfoModifyModal.js
 ┃ ┗ 📜UserInfoModifyModal.module.css
 ┣ 📂Pages
 ┃ ┣ 📜Chat.js
 ┃ ┣ 📜Chat.module.css
 ┃ ┣ 📜Login.js
 ┃ ┣ 📜Login.module.css
 ┃ ┣ 📜Main.js
 ┃ ┣ 📜Main.module.css
 ┃ ┣ 📜Mypage.js
 ┃ ┣ 📜Mypage.module.css
 ┃ ┣ 📜Question.js
 ┃ ┣ 📜Question.module.css
 ┃ ┣ 📜Signup.js
 ┃ ┗ 📜Signup.module.css
 ┣ 📂api
 ┃ ┗ 📜AuthContext.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜reset.css
```

## 시연 영상 (이미지 클릭 시 새 페이지에서 재생됩니다.)
- 전체 시연 영상
  [![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbfdCrW%2FbtsBofVUUuE%2FBdKhY4T7q86UX97rgDVP51%2Fimg.png)]([https://tv.kakao.com/v/442042915](https://tv.kakao.com/v/442953438)https://tv.kakao.com/v/442953438)
  
