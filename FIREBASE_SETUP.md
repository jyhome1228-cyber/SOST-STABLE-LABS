# SOST Firebase 문의 관리자 설정

## 구조

- `contact.html` → Firestore `inquiries` 컬렉션에 문의 저장
- `admin.html` → Firebase Authentication 관리자 로그인
- 관리자 이메일 → `planus253@naver.com`
- 관리자 기능 → 문의 검색, 상태 변경, 관리자 메모, 이메일 회신

## 1. Firebase 웹 앱 만들기

Firebase Console에서 프로젝트를 만든 뒤 **프로젝트 설정 → 내 앱 → 웹 앱 추가**를 진행합니다.

발급된 설정값을 `js/firebase-config.js`의 `firebaseConfig`에 붙여 넣습니다.

```js
const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...'
};
```

## 2. Authentication 설정

1. Firebase Console → Authentication → 시작하기
2. 로그인 제공업체 → **이메일/비밀번호** 활성화
3. 사용자 → 사용자 추가
4. 이메일: `planus253@naver.com`
5. 관리자용 비밀번호 입력

승인된 도메인에 아래 주소를 추가합니다.

- `sostlabs.com`
- `www.sostlabs.com`
- `jyhome1228-cyber.github.io`

## 3. Firestore 생성

1. Firebase Console → Firestore Database → 데이터베이스 만들기
2. 프로덕션 모드 선택
3. 위치 선택
4. 규칙 탭에서 저장소의 `firestore.rules` 내용을 복사해 게시

## 4. 확인 주소

- 문의 폼: `https://sostlabs.com/contact.html`
- 관리자: `https://sostlabs.com/admin.html`

관리자 페이지는 메뉴에 노출되지 않으며, `planus253@naver.com` 계정만 Firestore 문의를 조회하거나 수정할 수 있습니다.

## 5. 권장 보안 추가

공개 문의 폼의 자동 스팸을 줄이려면 이후 Firebase App Check 또는 CAPTCHA를 추가합니다.
