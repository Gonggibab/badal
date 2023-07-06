# FO:CEL
FO:CEL 화장품 판매 쇼핑몰 제작 프로젝트.

> ### 배포 주소
[https://focel.vercel.app/](https://focel.vercel.app/)

> ### 개발기간 및 인원
- 2023.6.10 ~ 진행중
- 개인 프로젝트
<br/>

## 💁&nbsp; 시작 가이드

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

## 🌟&nbsp; 기술 스택

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

## 🖥️&nbsp; 스크린샷

<br/>

## ⚙️&nbsp; 주요 기능
체크가 되지 않은 것은 구현 중 혹은 구현 예정인 기능들 입니다.

> ### 사용자 기능
- [x] 네이버, 카카오 간편 로그인
- [x] 상품 장바구니 추가 삭제
- [x] 제품 주문 및 결제 (토스 페이먼츠 도입)
- [x] 유저 정보 수정 및 주문 관리
- [ ] 구매 제품 리뷰 작성

> ### 관리자 기능
- [x] 상품 목록 확인, 검색 그리고 상품 추가, 삭제, 편집
- [ ] 주문 목록 확인, 검색, 필터 그리고 주문 상태 업데이트
- [ ] 사용자 목록 확인, 검색 그리고 사용자 정지
- [ ] 사용자 통계 및 판매량, 주문현황등 종합 관리자 대시보드 
<br/>

## 🤔&nbsp; 고민했던 문제들
> ### 로그인 구현과 Next-auth 라이브러리
쇼핑몰의 가장 기본적인 기본이지만 그만큼 중요한 중요한 기능인 로그인, 즉 인증과 인가 과정을 어떻게 이번 프로젝트에서 구현하면 좋을지 고민이 있었다.

직접 모든 기능을 구현하면 좋은 경험이 될 수 있겠지만 풀스택 개발로 인해 시간적인 부담이 있었다. 
또 최근에 [로그인에 대한 개념](https://velog.io/@gonggi_bab/Next-Auth-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A1%9C%EA%B7%B8%EC%9D%B8) 이나 [토큰 및 세션 저장에 대한 고민](https://velog.io/@gonggi_bab/%EC%BF%A0%ED%82%A4%EC%99%80-%EC%9B%B9-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%B3%B4%EC%95%88) 등 로그인 관련 고민과 공부를 하기도 했으며 간편 로그인을 도입해 사용자 편의성을 챙길 수 있다는 이유등으로 라이브러리를 도입하기로 결정했다.

그중에서도 Nextjs 프레임워크와 서버리스 구조로 개발하고 있던 이번 프로젝트에 딱 맞는 `Next-auth` 라이브러리를 도입했다. (워낙 편리하다고 소문이 자자해 그냥 궁금해서 써보고 싶은 이유도 있었다 ㅎㅎ) Oauth를 이용한 로그인 과정을 코드 몇 줄로 구현할 수 있었고 클라이언트에서 로그인 세션에 바로 접근할 수 있는 훅을 제공해 주는 등 정말로 편리한 기능들을 많이 제공 해줬다.

하지만 편리한 만큼 수 많은 오류들을 마주했다. 네이버 로그인 이후 세션 `name` 이 `undefined` 가 찍히는 문제. 로그인 시 자동으로 DB와 연동시켜주는 `adapter` 기능 오류. 배포 환경에서 `NEXT_SECRET` 미설정 오류등... ( 사실 오류라기 보단 나의 무지에서 나오는 실수들에 가까웠다 )

이러한 문제들을 어떻게 해결하고 프로젝트에 성공적으로 도입했는지는 [이 블로그 링크](https://velog.io/@gonggi_bab/Next-Auth-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A1%9C%EA%B7%B8%EC%9D%B8)에 자세하게 정리했다.

<br/>

## 😏&nbsp; 느낀점

<br/>

## 부록
### ERD
![FOCEL ERD](https://github.com/Gonggibab/focel/assets/83758021/9e4ef114-f96b-4370-a5ab-29dc92a66521)
<br/>

### 시스템 구조
![focel_sys_design](https://github.com/Gonggibab/focel/assets/83758021/fb8b2bd7-26ed-4f9f-a421-428ed72c36a7)
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
