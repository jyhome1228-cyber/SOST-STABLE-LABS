# Project portfolio assets

프로젝트별 이미지는 아래처럼 폴더를 나눠 저장합니다.

```text
assets/projects/
├─ project-id/
│  ├─ thumbnail.jpg
│  ├─ hero.jpg
│  ├─ 01.jpg
│  ├─ 02.jpg
│  ├─ 03.jpg
│  └─ 04.jpg
```

## 권장 이미지 기준

- 썸네일: 1600 × 1200px 이상, 4:3 비율
- 상세 히어로: 2400 × 1275px 이상, 약 16:8.5 비율
- 상세 갤러리: 2000px 이상, 가로형 권장
- 파일 형식: WebP 또는 최적화된 JPG
- 파일명: 영문 소문자와 숫자 사용

## 프로젝트 등록

`data/projects.js`에 프로젝트 객체를 추가하고 이미지 경로를 입력합니다.

```js
{
  id: 'project-name',
  title: 'Project Name',
  category: 'web',
  thumbnail: './assets/projects/project-name/thumbnail.jpg',
  hero: './assets/projects/project-name/hero.jpg',
  gallery: [
    { image: './assets/projects/project-name/01.jpg', label: 'Main Interface' }
  ]
}
```

상세페이지는 `project-detail.html?id=project-name` 주소로 자동 생성됩니다.
