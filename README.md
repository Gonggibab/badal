# FO:CEL
FO:CEL 화장품 판매 쇼핑몰 제작 프로젝트.

> ### 배포 주소
[https://focel.vercel.app/](https://focel.vercel.app/)

> ### 개발기간 및 인원
- 2023.6.10 ~ 진행중
- 개인 프로젝트
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

## 주요 기능
체크가 되지 않은 것은 구현 중 혹은 구현 예정인 기능들 입니다.

> ### 사용자 기능
- [x] 네이버, 카카오 간편 로그인
- [x] 상품 장바구니 추가 삭제
- [x] 제품 주문 및 결제 (토스 페이먼츠 도입)
- [ ] 유저 정보 수정 및 주문 관리

> ### 관리자 기능
- [x] 상품 목록 확인, 검색 그리고 상품 추가, 삭제, 편집
- [ ] 주문 목록 확인, 검색, 필터 그리고 주문 상태 업데이트
- [ ] 사용자 목록 확인, 검색 그리고 사용자 정지
- [ ] 사용자 통계 및 판매량, 주문현황등 종합 관리자 대시보드 
<br/>

## 해결했던 문제들

<br/>


## 느낀점

<br/>

## 부록
### ERD
![Blank diagram](https://github.com/Gonggibab/focel/assets/83758021/865c2e27-255d-4ed0-a92e-14172945fc54)
<br/>

### 시스템 구조
![focel_sys_design](https://github.com/Gonggibab/focel/assets/83758021/c0e53dba-9ba2-40a9-8c56-82b83a10d2c6)
<br/>

### 폴더 구조
```
    .
    ├── public                  # 정적 자산 폴더
    ├── src                     
    │   ├── assets              
    │   │   └── icon            # 아이콘 파일
    │   │   └── images          # 사진 파일
    │   ├── common              
    │   │   ├── lib             # ORM 연결 함수
    │   │   ├── recoil          # Recoil atom
    │   │   ├── types           # 타입 지정
    │   │   └── utils           # 앱 전체에 사용되는 기능들
    │   ├── components          # 컴포넌트들
    │   ├── pages               # 페이지 라우터 파일
    │   │   └── api             # Nextjs API 라우터
    │   │   └── admin           # 어드민 관련 페이지
    └── └── styles              # 글로벌 CSS 파일
```
<br/>
