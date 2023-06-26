# FO:CEL
FO:CEL 화장품 판매 쇼핑몰 제작 프로젝트.

<br/>

## 개발기간 및 인원
- 2023.6.10 ~ 진행중
- 개인 프로젝트
<br/>

## 배포 주소
- [https://focel.vercel.app/](https://focel.vercel.app/)
<br/>

## 시작 가이드

> ### 설치 
```bash
$ git clone https://github.com/Gonggibab/focel.git
$ cd focel
```
<br/>

> ### 개발 서버 실행
```bash
$ yarn install
$ yarn dev
```
이후 브라우저에서 [http://localhost:3000](http://localhost:3000) 주소로 들어가면 결과를 볼 수 있습니다.

<br/>

> ### 환경변수
[env.example](https://github.com/Gonggibab/focel/blob/main/env.example) 파일을 참조하여 ```env.local``` 파일을 루트 폴더에 생성하면 됩니다.

<br/>

## 기술 스택
### 언어 / 프레임워크
<div>
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
</div>

### 데이터베이스
<div>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
</div>

### 인프라
<div>
  <img src="https://img.shields.io/badge/Cloudinary-3448c5?style=for-the-badge">
</div>

### 배포
<div>
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>
<br/>

## 스크린샷

<br/>

## 시스템 구조
![focel_sys_design](https://github.com/Gonggibab/focel/assets/83758021/c0e53dba-9ba2-40a9-8c56-82b83a10d2c6)
<br/>


## 폴더 구조
```
    .
    ├── public                  # 정적 자산 폴더
    ├── src                     
    │   ├── assets              # 서버 통신 API 저장 폴더
    │   ├── components          # 컴포넌트들 저장 폴더
    │   │   └── common          # 여러 페이지에서 사용되는 컴포넌트
    │   ├── lib                 # 컴포넌트 제외 여러 기능 파일들 저장
    │   │   ├── hook            # 커스텀 훅 폴더
    │   │   └── util            # 앱 전체에 사용되는 기능들 
    │   ├── pages               # 페이지 라우터 파일
    │   ├── store               # Redux 관리 폴더
    │   └── styles              # 글로벌 CSS 파일 저장
    ├── .env.development        # 개발 환경 변수
    ├── .env.production         # 생산 환경 변수
    ├── .eslintrc.json          # ESLint 환경 설정
    ├── .gitignore              # 무시할 git 파일과 폴더들
    ├── next.config.js          # Next.js 환경 설정
    ├── package-lock.json       # 패키지 버전 저장
    ├── package.json            # 프로젝트 종속성 및 스크립트들
    ├── postcss.config.json     # PostCSS 설정
    ├── README.md               # Readme 파일
    ├── tailwind.config.json    # Tailwind 환경 설정
    ├── tsconfig.json           # TypeScript 환경 설정
    └── yarn.lock               # 패키지 버전 저장
```
<br/>

## 주요 기능

<br/>

## 해결했던 문제들

<br/>


## 느낀점
