# 🎪 PopPick - 팝업스토어 예약 & 사전주문 플랫폼

> 타임슬롯 기반 예약과 실시간 장바구니를 지원하는 팝업스토어 통합 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=flat-square&logo=tailwind-css)
![React Query](https://img.shields.io/badge/TanStack_Query-5.56.2-FF4154?style=flat-square&logo=react-query)

## 🚀 주요 기능

### 🏪 팝업스토어 통합 관리

- **다중 스토어 지원**: 여러 팝업스토어를 하나의 플랫폼에서 통합 관리
- **카테고리별 분류**: 패션, 푸드, 라이프스타일, 콜라보 굿즈 등 다양한 카테고리
- **실시간 검색 & 필터링**: 지역, 카테고리, 운영 상태별 필터링 지원
- **자동 회전 히어로 배너**: 운영중인 팝업스토어를 5초마다 자동으로 전환하는 캐러셀

### 📅 스마트 예약 시스템

- **타임슬롯 기반 예약**: 30분 단위로 예약 가능한 시간대 제공
- **실시간 가용성 체크**: 현재 시간 기준 예약 가능 시간 자동 계산
- **동적 날짜 생성**: 팝업스토어 운영 기간에 따른 예약 가능 날짜 생성
- **운영 상태 실시간 업데이트**: 날짜와 운영시간을 모두 체크하여 정확한 상태 표시 (운영중/영업종료/오픈 예정/종료됨)

### 🛒 고도화된 장바구니

- **크로스 스토어 제한**: 다른 팝업스토어 상품 동시 주문 방지
- **실시간 상태 관리**: Zustand 기반 클라이언트 상태 관리
- **로컬 스토리지 연동**: 브라우저 재시작 후에도 장바구니 내용 유지
- **주문 생성 연동**: 장바구니 → 주문 생성(API) → QR 티켓 페이지 흐름 지원

### 📱 모바일 최적화 UI/UX

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **한글 폰트 최적화**: Pretendard (본문), S-CoreDream (제목) 적용
- **직관적인 네비게이션**: 사용자 친화적인 인터페이스
- **QR 코드 티켓**: 주문 완료 후 픽업용 QR 코드 자동 생성

### 👤 사용자 기능

- **로그인/프로필 관리**: localStorage 기반 사용자 정보 관리
- **주문 내역**: 과거 주문 내역 조회 및 QR 티켓 재발급
- **설정 페이지**: 알림, 언어, 개인정보 설정 (데모 UI)

## 🛠 기술 스택

### Frontend

- **Next.js 14** (App Router)
- **TypeScript** 
- **Tailwind CSS**
- **Heroicons**

### 상태 관리

- **Zustand** 
- **TanStack React Query**
- **MSW (Mock Service Worker)**

### API & 데이터

- **Next.js API Routes** - 서버리스 API 엔드포인트 (기본 데이터 공급원)
- **Mock 데이터**: `mocks/db/` 폴더에서 중앙화된 데이터 관리 (API Routes가 직접 사용)
- **MSW**: `NEXT_PUBLIC_MSW=enabled` 설정 시 브라우저 레벨 모킹 활성화, 기본은 비활성
- **타입 안전성**: TypeScript로 완벽하게 타입 정의된 데이터 구조

### 주요 라이브러리

- **qrcode.react** - QR 코드 생성
- **Axios** - HTTP 클라이언트
- **Pretendard & S-CoreDream** - 한글 웹폰트

## 📂 프로젝트 구조

```
poppick/
├── app/                    # Next.js App Router
│   ├── api/               # Next.js API Routes
│   │   ├── popup-stores/  # 팝업스토어 API
│   │   ├── products/      # 상품 API
│   │   ├── orders/        # 주문 API
│   │   ├── users/         # 사용자 API
│   │   └── event-categories/ # 카테고리 API
│   ├── globals.css        # 전역 스타일 & 폰트
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지 (팝업스토어 목록)
│   ├── cart/              # 장바구니
│   ├── login/             # 로그인
│   ├── profile/           # 프로필
│   ├── settings/          # 설정
│   ├── orders/            # 주문 내역
│   ├── product/[id]/      # 상품 상세 & 예약
│   ├── popup-store/[id]/  # 팝업스토어 상세
│   └── ticket/[orderId]/  # QR 티켓 생성
├── components/            # 재사용 가능한 컴포넌트
│   ├── Header.tsx         # 헤더 (네비게이션, 장바구니)
│   ├── Hero.tsx           # 자동 회전 히어로 캐러셀
│   ├── PopupStoreCard.tsx # 팝업스토어 카드
│   ├── SearchBar.tsx      # 검색 바
│   └── CategoryTabs.tsx   # 카테고리 탭
├── src/
│   ├── hooks/queries.ts   # React Query 훅
│   ├── lib/api.ts         # API 함수
│   └── types/index.ts     # TypeScript 타입 정의
├── mocks/                 # Mock 데이터 & 핸들러
│   ├── db/               # 중앙화된 mock 데이터
│   │   ├── popupStores.ts # 팝업스토어 데이터
│   │   ├── products.ts    # 상품 데이터
│   │   ├── orders.ts      # 주문 데이터
│   │   └── users.ts       # 사용자 데이터
│   ├── handlers/         # MSW 핸들러 (선택적)
│   └── browser.ts        # MSW 브라우저 설정
├── stores/               # Zustand 스토어
│   └── useCart.ts        # 장바구니 상태 관리
└── public/
    └── images/           # 이미지 에셋
        ├── popup-stores/ # 팝업스토어 이미지
        ├── products/     # 상품 이미지
        ├── categories/   # 카테고리 아이콘
        └── logos/        # 브랜드 로고
```

## 🎯 핵심 기능 구현

### 1. Next.js API Routes + Mock 데이터

```typescript
// app/api/popup-stores/route.ts
import { NextResponse } from 'next/server';
import { popupStores } from '@/mocks/db/popupStores';

export async function GET() {
  return NextResponse.json(popupStores);
}
```

### 2. 자동 회전 히어로 캐러셀

```typescript
// components/Hero.tsx
useEffect(() => {
  if (activeStores.length <= 1) return;
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % activeStores.length);
  }, 5000); // 5초마다 자동 전환
  return () => clearInterval(interval);
}, [activeStores.length]);
```

### 3. 운영 상태 실시간 계산

```typescript
const getStoreStatus = () => {
  const now = new Date();
  const startDate = new Date(store.startDate);
  const endDate = new Date(store.endDate);

  if (now < startDate) return 'upcoming'; // 오픈 예정
  if (now > endDate) return 'ended'; // 종료됨

  // 운영시간 체크
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const [startHour, startMin] = store.operatingHours.start
    .split(':')
    .map(Number);
  const [endHour, endMin] = store.operatingHours.end.split(':').map(Number);
  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;

  if (currentTime >= startTime && currentTime <= endTime) {
    return 'open'; // 운영중
  }
  return 'closed'; // 영업종료
};
```

### 4. 실시간 타임슬롯 관리

```typescript
const generateTimeSlots = useCallback(() => {
  const slots = [];
  const start = parseInt(store.operatingHours.start.split(':')[0]);
  const end = parseInt(store.operatingHours.end.split(':')[0]);

  const today = new Date().toISOString().split('T')[0];
  const isToday = pickupDate === today;

  for (let hour = start; hour < end; hour++) {
    // 30분 단위 슬롯 생성, 현재 시간 이후만 표시
    if (!isToday || hour * 60 > currentTime) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
}, [store, pickupDate]);
```

### 5. 장바구니 상태 관리 (Zustand)

```typescript
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      popupStoreId: null,
      add: (item) => {
        const state = get();
        // 다른 팝업스토어 상품 체크
        if (state.popupStoreId && state.popupStoreId !== item.popupStoreId) {
          return {
            success: false,
            message: '다른 팝업스토어의 상품이 장바구니에 있습니다.',
          };
        }
        // 장바구니 추가 로직
      },
    }),
    { name: 'poppick-cart' },
  ),
);
```

### 6. 타입 안전성 보장

```typescript
export type PopupStore = {
  id: string;
  name: string;
  category: '패션' | '라이프스타일' | '푸드' | '콜라보 굿즈' | '기타';
  operatingHours: { start: string; end: string };
  startDate: string;
  endDate: string;
  // ... 기타 속성
};

export type Order = {
  id: string;
  items: OrderItem[];
  pickupDate: string;
  pickupTime: string;
  status: 'paid' | 'fulfilled' | 'canceled';
};
```

## 🚦 설치 및 실행

### 데모

- 배포 URL: https://poppick-a98y11pbm-suls-projects-38d800ec.vercel.app/

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. MSW 활성화 (선택사항)

MSW를 사용하려면:

```bash
npx msw init public/ --save
NEXT_PUBLIC_MSW=enabled npm run dev
```

### 4. 빌드 및 배포

```bash
npm run build
npm run start
```

## 🎨 디자인 시스템

### 폰트

- **본문**: Pretendard (CDN)
- **제목**: S-CoreDream-7ExtraBold (CDN)

### 컬러 팔레트

- **Primary**: `#fe4f41` (코랄 레드)
- **Secondary**: `#2f57b5` (로얄 블루)
- **Accent**: `#060047` (미드나잇 블루)
- **BG Soft**: `#F7F7F9` (라이트 그레이)

### 반응형 브레이크포인트

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

## 📱 주요 페이지

| 경로                | 설명                   | 주요 기능                                       |
| ------------------- | ---------------------- | ----------------------------------------------- |
| `/`                 | 팝업스토어 메인 페이지 | 자동 회전 히어로, 검색, 필터링, 카테고리별 조회 |
| `/popup-store/[id]` | 팝업스토어 상세        | 스토어 정보, 운영 상태, 상품 목록               |
| `/product/[id]`     | 상품 상세 & 예약       | 타임슬롯 선택, 장바구니 담기                    |
| `/cart`             | 장바구니               | 상품 수량 조절, 주문 생성, 티켓 이동            |
| `/orders`           | 주문 내역              | Mock 주문 내역 조회, QR 티켓 재발급             |
| `/ticket/[orderId]` | QR 티켓                | 픽업용 QR 코드 생성                             |
| `/login`            | 로그인                 | 사용자 인증                                     |
| `/profile`          | 프로필                 | 사용자 정보 및 통계                             |
| `/settings`         | 설정                   | 알림, 언어, 계정 관리 (일부 데모)               |

## 🏗️ 아키텍처 특징

### 프론트엔드 중심 설계

- **Next.js API Routes**: 실제 백엔드 없이 API 엔드포인트 구현
- **Mock 데이터 중앙화**: `mocks/db/`에서 모든 데이터 관리
- **타입 안전성**: TypeScript로 완벽한 타입 체크

### 상태 관리 전략

- **서버 상태**: React Query로 캐싱 및 동기화
- **클라이언트 상태**: Zustand로 장바구니 등 관리
- **영속성**: localStorage로 브라우저 재시작 후에도 유지

### 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **코드 스플리팅**: App Router의 자동 코드 스플리팅
- **캐싱 전략**: React Query의 stale-while-revalidate

## 🔧 향후 개선 계획

- [ ] **카테고리 필터링 버그 수정** (현재 진행중)
- [ ] **푸시 알림** (픽업 시간 알림)
- [ ] **위치 기반 서비스** (주변 팝업스토어 추천)
- [ ] **리뷰 시스템** (상품 및 스토어 리뷰)
- [ ] **관리자 대시보드** (스토어 운영자용)
- [ ] **다국어 지원** (영어, 일본어)
- [ ] **다크모드 지원**

## 프로젝트 관련 정보

**포트폴리오 목적으로 개발된 프로젝트입니다.**

- 실제 결제 및 주문 처리는 시뮬레이션입니다.
- Next.js API Routes + Mock 데이터로 실제 서버 연동 효과를 구현했습니다.
- 포트폴리오용으로 개발되었으나, 실제 서비스 수준의 완성도를 목표로 했습니다.
- 일부 설정 기능(알림, 언어)은 UI만 구현된 데모입니다.

---

> 💡 **Tech Stack Highlights**: Next.js 14 App Router, TypeScript, Zustand, TanStack Query, Tailwind CSS, Next.js API Routes
