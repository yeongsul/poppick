import type { Product } from '@/src/types';

export const products: Product[] = [
  // 네온 나이트 상품들
  {
    id: 'neon-hoodie',
    name: '사이버 후드',
    brand: '네온 나이트',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&fit=crop&q=80',
    price: 129000,
    tags: ['사이버펑크', '한정판'],
    popupStoreId: 'store-neon-nights',
  },
  {
    id: 'neon-sneakers',
    name: 'LED 스니커즈',
    brand: '네온 나이트',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&fit=crop&q=80',
    price: 199000,
    tags: ['LED', '한정판'],
    popupStoreId: 'store-neon-nights',
  },
  {
    id: 'neon-cap',
    name: '홀로그램 캡',
    brand: '네온 나이트',
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&fit=crop&q=80',
    price: 55000,
    tags: ['홀로그램', '스트리트'],
    popupStoreId: 'store-neon-nights',
  },

  // 젠 크래프트 상품들
  {
    id: 'zen-tea-set',
    name: '명상 차 세트',
    brand: '젠 크래프트',
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&fit=crop&q=80',
    price: 85000,
    tags: ['명상', '수제'],
    popupStoreId: 'store-zen-craft',
  },
  {
    id: 'zen-incense',
    name: '수제 향',
    brand: '젠 크래프트',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&fit=crop&q=80',
    price: 45000,
    tags: ['향', '수제공예'],
    popupStoreId: 'store-zen-craft',
  },
  {
    id: 'zen-ceramics',
    name: '명상 그릇',
    brand: '젠 크래프트',
    image:
      'https://images.unsplash.com/photo-1630396427043-c0fe3fb0d228?w=800&fit=crop&q=80',
    price: 120000,
    tags: ['세라믹', '명상'],
    popupStoreId: 'store-zen-craft',
  },

  // 에코 퓨처 상품들
  {
    id: 'eco-solar-charger',
    name: '태양광 보조배터리',
    brand: '에코 퓨처',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop&q=80',
    price: 89000,
    tags: ['태양광', '친환경'],
    popupStoreId: 'store-eco-future',
  },
  {
    id: 'eco-bamboo-speaker',
    name: '재활용 플라스틱 블루투스 스피커',
    brand: '에코 퓨처',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop&q=80',
    price: 125000,
    tags: ['대나무', '스피커'],
    popupStoreId: 'store-eco-future',
  },
  {
    id: 'eco-smart-planter',
    name: '스마트 식물 관리 시스템',
    brand: '에코 퓨처',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&fit=crop&q=80',
    price: 180000,
    tags: ['스마트', '식물'],
    popupStoreId: 'store-eco-future',
  },

  // 메타버스 패션 상품들
  {
    id: 'meta-nft-shirt',
    name: 'NFT 디지털 티셔츠',
    brand: '메타버스 패션',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&fit=crop&q=80',
    price: 95000,
    tags: ['NFT', '디지털'],
    popupStoreId: 'store-metaverse-fashion',
  },
  {
    id: 'meta-ar-glasses',
    name: 'AR 패션 안경',
    brand: '메타버스 패션',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&fit=crop&q=80',
    price: 250000,
    tags: ['AR', '메타버스'],
    popupStoreId: 'store-metaverse-fashion',
  },

  // 어반 빈티지 상품들
  {
    id: 'urban-vintage-jacket',
    name: '어반 빈티지 데님',
    brand: '어반 빈티지',
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&fit=crop&q=80',
    price: 145000,
    tags: ['빈티지', '도시적'],
    popupStoreId: 'store-urban-vintage',
  },
  {
    id: 'urban-art-print',
    name: '한정 아트 프린트',
    brand: '어반 빈티지',
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&fit=crop&q=80',
    price: 75000,
    tags: ['아트', '한정판'],
    popupStoreId: 'store-urban-vintage',
  },

  // 마인드풀 테크 상품들
  {
    id: 'mindful-meditation-app',
    name: '스마트 명상 기기',
    brand: '마인드풀 테크',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&fit=crop&q=80',
    price: 199000,
    tags: ['명상', '스마트'],
    popupStoreId: 'store-mindful-tech',
  },
  {
    id: 'mindful-sleep-tracker',
    name: '수면 최적화 링',
    brand: '마인드풀 테크',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&fit=crop&q=80',
    price: 320000,
    tags: ['수면', '웰빙'],
    popupStoreId: 'store-mindful-tech',
  },

  // 더그아웃 마켓 상품들
  {
    id: 'dugout-uniform',
    name: '한정판 홈 유니폼',
    brand: '더그아웃 마켓',
    image:
      'https://images.unsplash.com/photo-1735421924560-5d0393e0f788?w=800&fit=crop&q=80',
    price: 119000,
    tags: ['야구굿즈', '유니폼', '한정판'],
    popupStoreId: 'store-dugout-market',
  },
  {
    id: 'dugout-cap',
    name: '응원 캡 모자',
    brand: '더그아웃 마켓',
    image:
      'https://images.unsplash.com/photo-1530398257477-3e1b0b0ed605?w=800&fit=crop&q=80',
    price: 32000,
    tags: ['야구굿즈', '응원', '모자'],
    popupStoreId: 'store-dugout-market',
  },
  {
    id: 'dugout-bat',
    name: '미니 기념 배트',
    brand: '더그아웃 마켓',
    image:
      'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&fit=crop&q=80',
    price: 25000,
    tags: ['야구굿즈', '기념품', '콜라보'],
    popupStoreId: 'store-dugout-market',
  },

  // 토마토 상점 상품들
  {
    id: 'tomato-notebook',
    name: '토마토 고양이 노트',
    brand: '토마토 상점',
    image:
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&fit=crop&q=80',
    price: 8500,
    tags: ['토마토', '고양이', '문구'],
    popupStoreId: 'store-tomato-shop',
  },
  {
    id: 'tomato-sticker-set',
    name: '토마토 스티커 세트',
    brand: '토마토 상점',
    image:
      'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&fit=crop&q=80',
    price: 6000,
    tags: ['토마토', '스티커', '귀여움'],
    popupStoreId: 'store-tomato-shop',
  },
  {
    id: 'tomato-plush',
    name: '토마토 고양이 인형',
    brand: '토마토 상점',
    image:
      'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&fit=crop&q=80',
    price: 28000,
    tags: ['토마토', '고양이', '인형'],
    popupStoreId: 'store-tomato-shop',
  },

  // 드로잉데이 상품들
  {
    id: 'drawing-postcard',
    name: '일러스트 엽서 세트',
    brand: '드로잉데이',
    image:
      'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800&fit=crop&q=80',
    price: 12000,
    tags: ['일러스트', '엽서', '아트상품'],
    popupStoreId: 'store-drawing-day',
  },
  {
    id: 'drawing-poster',
    name: '한정판 아트 포스터',
    brand: '드로잉데이',
    image:
      'https://images.unsplash.com/photo-1690609535059-16b0c240be9b?w=800&fit=crop&q=80',
    price: 25000,
    tags: ['일러스트', '포스터', '콜라보'],
    popupStoreId: 'store-drawing-day',
  },
  {
    id: 'drawing-tote-bag',
    name: '일러스트 에코백',
    brand: '드로잉데이',
    image:
      'https://images.unsplash.com/photo-1610282081854-9c311350beb9?w=800&fit=crop&q=80',
    price: 18000,
    tags: ['일러스트', '에코백', '팬굿즈'],
    popupStoreId: 'store-drawing-day',
  },

  // 센츠 오브 서울 상품들
  {
    id: 'scents-spring-diffuser',
    name: '봄 향기 디퓨저',
    brand: '센츠 오브 서울',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&fit=crop&q=80',
    price: 45000,
    tags: ['향기', '디퓨저', '계절별테마'],
    popupStoreId: 'store-scents-of-seoul',
  },
  {
    id: 'scents-candle-set',
    name: '서울 시즌 캔들 세트',
    brand: '센츠 오브 서울',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&fit=crop&q=80',
    price: 52000,
    tags: ['향기', '캔들', '감성굿즈'],
    popupStoreId: 'store-scents-of-seoul',
  },
  {
    id: 'scents-perfume',
    name: '한강 석양 오드퍼퓸',
    brand: '센츠 오브 서울',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&fit=crop&q=80',
    price: 68000,
    tags: ['향기', '퍼퓸', '감성굿즈'],
    popupStoreId: 'store-scents-of-seoul',
  },

  // 픽셀 아케이드 상품들
  {
    id: 'pixel-tshirt',
    name: '8비트 캐릭터 티셔츠',
    brand: '픽셀 아케이드',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&fit=crop&q=80',
    price: 35000,
    tags: ['게임', '레트로', '굿즈'],
    popupStoreId: 'store-pixel-arcade',
  },
  {
    id: 'pixel-keychain',
    name: '픽셀 아트 키링',
    brand: '픽셀 아케이드',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&fit=crop&q=80',
    price: 12000,
    tags: ['게임', '레트로', '키링'],
    popupStoreId: 'store-pixel-arcade',
  },
  {
    id: 'pixel-poster',
    name: '클래식 게임 포스터',
    brand: '픽셀 아케이드',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&fit=crop&q=80',
    price: 22000,
    tags: ['게임', '레트로', '포스터'],
    popupStoreId: 'store-pixel-arcade',
  },

  // 스위트 스튜디오 상품들
  {
    id: 'sweet-macaron-box',
    name: '디자인 마카롱 박스',
    brand: '스위트 스튜디오',
    image:
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&fit=crop&q=80',
    price: 28000,
    tags: ['디저트', '마카롱', '한정판매'],
    popupStoreId: 'store-sweet-studio',
  },
  {
    id: 'sweet-cake',
    name: '시그니처 케이크',
    brand: '스위트 스튜디오',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&fit=crop&q=80',
    price: 45000,
    tags: ['디저트', '케이크', '디자인'],
    popupStoreId: 'store-sweet-studio',
  },
  {
    id: 'sweet-cookie-set',
    name: '아트 쿠키 세트',
    brand: '스위트 스튜디오',
    image:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&fit=crop&q=80',
    price: 18000,
    tags: ['디저트', '쿠키', '체험카페'],
    popupStoreId: 'store-sweet-studio',
  },

  // 제주 모먼트 상품들
  {
    id: 'jeju-candle',
    name: '제주 감귤 캔들',
    brand: '제주 모먼트',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&fit=crop&q=80',
    price: 22000,
    tags: ['로컬', '제주브랜드', '캔들'],
    popupStoreId: 'store-jeju-moment',
  },
  {
    id: 'jeju-eco-bag',
    name: '제주 감성 에코백',
    brand: '제주 모먼트',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&fit=crop&q=80',
    price: 15000,
    tags: ['로컬', '에코백', '감성마켓'],
    popupStoreId: 'store-jeju-moment',
  },
  {
    id: 'jeju-soap-set',
    name: '제주 천연 비누 세트',
    brand: '제주 모먼트',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&fit=crop&q=80',
    price: 32000,
    tags: ['로컬', '제주브랜드', '소품샵'],
    popupStoreId: 'store-jeju-moment',
  },
];

export function findProduct(id: string) {
  return products.find((p) => p.id === id) ?? null;
}

export function getProductsByStore(storeId: string) {
  return products.filter((p) => p.popupStoreId === storeId);
}
