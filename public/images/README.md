# 이미지 에셋 가이드

이 폴더는 PopPick 프로젝트의 정적 이미지 파일을 저장합니다.

## 폴더 구조

```
images/
├── popup-stores/     # 팝업스토어 대표 이미지
├── products/         # 상품 이미지
├── categories/       # 카테고리 아이콘/배너
└── logos/           # 브랜드 로고 및 앱 로고
```

## 사용 방법

### 1. HTML img 태그
```typescript
<img src="/images/popup-stores/store-neon-nights.jpg" alt="네온 나이트" />
```

### 2. Next.js Image 컴포넌트 (권장)
```typescript
import Image from 'next/image';

<Image
  src="/images/popup-stores/store-neon-nights.jpg"
  alt="네온 나이트"
  width={800}
  height={600}
  priority // 중요한 이미지는 우선 로드
/>
```

### 3. CSS background
```typescript
<div style={{ backgroundImage: `url('/images/popup-stores/store-neon-nights.jpg')` }} />
```

## 이미지 최적화 권장 사항

- **포맷**: WebP 또는 JPEG (PNG는 투명도 필요 시)
- **팝업스토어 이미지**: 1200x800px 권장
- **상품 이미지**: 800x800px 권장
- **로고**: SVG 또는 PNG (투명 배경)
- **파일명**: kebab-case 사용 (예: store-neon-nights.jpg)

## Mock 데이터 연동

이미지를 추가한 후 `mocks/db/` 파일에서 URL을 업데이트하세요:

```typescript
// mocks/db/popupStores.ts
{
  id: 'store-neon-nights',
  name: '네온 나이트',
  image: '/images/popup-stores/store-neon-nights.jpg', // ← 이렇게 변경
}
```
