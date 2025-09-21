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
    name: '세라믹 명상 그릇',
    brand: '젠 크래프트',
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=800&fit=crop&q=80',
    price: 89000,
    tags: ['태양광', '친환경'],
    popupStoreId: 'store-eco-future',
  },
  {
    id: 'eco-bamboo-speaker',
    name: '대나무 블루투스 스피커',
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
      'https://images.unsplash.com/photo-1506629905312-8d4e9a51ed76?w=800&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1571390295919-a97e1ba8455a?w=800&fit=crop&q=80',
    price: 320000,
    tags: ['수면', '웰빙'],
    popupStoreId: 'store-mindful-tech',
  },
];

export function findProduct(id: string) {
  return products.find((p) => p.id === id) ?? null;
}

export function getProductsByStore(storeId: string) {
  return products.filter((p) => p.popupStoreId === storeId);
}
