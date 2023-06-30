# Delivery-0111

TDD로 해보는 배달 시스템 프로젝트

## Team

|  이름  | email                 | github  |
| :----: | --------------------- | :-----: |
| 이푸름 | pooreum83@gmail.com   | @github |
| 이현규 | fsd76005588@gamil.com | @github |
| 최유영 | waveinyu@gmail.com    | @github |

## ERD

![erd](https://github.com/HanghaePlus-Team-7/Delivery-0111/assets/99732695/655124e7-8aa1-41d0-8adf-27cab1415266)

## 폴더구조

```cmd
root
├ /.github
│  ├ ISSUE_TEMPLATE.md          # Git 이슈 탬플릿
│  └ PULL_REQUEST_TEMPLATE.md   # Git 풀 리퀘스트 템플릿
├ /docker                       # Development, Production ...
├ /prisma                       # Migration ...
├ /src
│  ├  /common                   # 공통 사용 모듈
│  ├  /modules                  # Auth, Cart, Orders, Products, ...
│  └  /prisma                   # Prisma ORM 사용을 위한 PrismaService 정의
├ /test                         # [E2E] Auth, Cart, Orders, Products, ...
└ ~ other files...
```

## 모듈리스트

```json
  "dependencies": {
    ...
    "@nestjs/jwt": "^10.1.0",           // Auth 관련 JSON 토큰 모듈
    "@nestjs/passport": "^10.0.0",      // Auth 관련 인증 모듈
    "@nestjs/swagger": "^7.0.4",        // API 문서 자동화
    "@prisma/client": "^4.16.1",        // Prisma Server와 상호작용하는 주요 컴포넌트
    "class-transformer": "^0.5.1",      // 객체-클래스 변환 모듈
    "class-validator": "^0.14.0",       // 유효성 검사 모듈
    "jsonwebtoken": "^9.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    ...
  },
  "devDependencies": {
    ...
    "@types/babel__core": "^7.20.1",
    "@types/passport-jwt": "^3.0.8",
    "eslint": "^8.42.0",
    "jest": "^29.5.0",                  // 테스트 코드
    "prettier": "^2.8.8",               // 코드컨벤션
    "prisma": "^4.16.1",                // ORM, 데이터베이스 객체 관계 매핑 모듈
    ...
  },
```
