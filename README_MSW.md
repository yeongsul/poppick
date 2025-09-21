# PopPick Mock API (MSW) — A 옵션

## Endpoints
- `GET /api/products` → Product[]
- `GET /api/products/:id` → Product
- `GET /api/products/:id/slots` → Timeslot[] (10분 간격, 잔여수량 포함)
- `GET /api/orders` → Order[]
- `GET /api/orders/:id` → Order
- `POST /api/orders` → Order 생성(재고 차감, status: paid)

## 설치/실행
```bash
# PopPick 루트에서
npx msw init public/ --save
# 개발 실행(목 API 켜기)
NEXT_PUBLIC_MSW=enabled npm run dev
```

## 파일 위치
- `mocks/db.ts` — 인메모리 DB & 유틸
- `mocks/handlers.ts` — 엔드포인트 정의
- `mocks/browser.ts` — 브라우저 워커 부트스트랩
- `src/types.ts` — 타입
- `lib/api.ts` — axios 래퍼
