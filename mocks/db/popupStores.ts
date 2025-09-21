import type { PopupStore } from '@/src/types';

export const popupStores: PopupStore[] = [
  {
    id: 'store-neon-nights',
    name: '네온 나이트',
    description: '사이버펑크와 스트리트웨어가 만나는 미래적 공간',
    location: '강남구 청담동',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&fit=crop&q=80&sat=-20',
    tags: ['사이버펑크', '스트리트웨어', '한정판'],
    category: '패션',
    startDate: '2024-12-19T00:00:00Z',
    endDate: '2025-01-15T00:00:00Z',
    operatingHours: {
      start: '10:00',
      end: '20:00',
    },
  },
  {
    id: 'store-zen-craft',
    name: '젠 크래프트',
    description: '마음의 평화를 찾는 수제 공예와 차의 세계',
    location: '마포구 홍대',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop&q=80&sat=-30',
    tags: ['수제공예', '차', '명상'],
    category: '라이프스타일',
    startDate: '2024-12-19T00:00:00Z',
    endDate: '2025-02-10T00:00:00Z',
    operatingHours: {
      start: '09:00',
      end: '21:00',
    },
  },
  {
    id: 'store-eco-future',
    name: '에코 퓨처',
    description: '지속가능한 미래를 위한 친환경 혁신 제품',
    location: '서초구 방배동',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop&q=80&sat=-25',
    tags: ['친환경', '지속가능', '혁신'],
    category: '기타',
    startDate: '2024-12-19T00:00:00Z',
    endDate: '2025-01-28T00:00:00Z',
    operatingHours: {
      start: '11:00',
      end: '19:00',
    },
  },
  {
    id: 'store-metaverse-fashion',
    name: '메타버스 패션',
    description: '가상과 현실을 넘나드는 NFT 패션 콜라보',
    location: '강남구 신사동',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&fit=crop&q=80&sat=-25',
    tags: ['NFT', '메타버스', '디지털'],
    category: '기타',
    startDate: '2024-12-19T00:00:00Z',
    endDate: '2025-01-14T00:00:00Z',
    operatingHours: {
      start: '10:00',
      end: '22:00',
    },
  },
  {
    id: 'store-urban-vintage',
    name: '어반 빈티지',
    description: '도시적 감각의 빈티지 컬렉션과 아트',
    location: '용산구 이태원',
    image:
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&fit=crop&q=80&sat=-20',
    tags: ['빈티지', '아트', '도시적'],
    category: '기타',
    startDate: '2024-12-19T00:00:00Z',
    endDate: '2025-02-25T00:00:00Z',
    operatingHours: {
      start: '12:00',
      end: '20:00',
    },
  },
  {
    id: 'store-mindful-tech',
    name: '마인드풀 테크',
    description: '디지털 웰빙과 마음챙김을 위한 스마트 솔루션',
    location: '서울시 중구 명동',
    image:
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&fit=crop&q=80&sat=-25',
    tags: ['디지털웰빙', '마음챙김', '스마트'],
    category: '기타',
    startDate: '2024-12-19T00:00:00Z',
    endDate: '2025-03-12T00:00:00Z',
    operatingHours: {
      start: '10:30',
      end: '19:30',
    },
  },
];

export function findPopupStore(id: string) {
  return popupStores.find((store) => store.id === id) ?? null;
}
