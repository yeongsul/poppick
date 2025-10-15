import type { PopupStore } from '@/src/types';

export const popupStores: PopupStore[] = [
  {
    id: 'store-dugout-market',
    name: '더그아웃 마켓',
    description: '유니폼, 응원 굿즈와 다양한 콜라보 상품을 만나보세요!',
    location: '대구광역시 수성구',
    image:
      'https://images.unsplash.com/photo-1695038610476-0e91ed9d9555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&fit=crop&q=80&sat=-25',
    tags: ['야구굿즈', '한정판', '유니폼', '응원', '콜라보'],
    category: '팬덤·스포츠',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    operatingHours: {
      start: '10:00',
      end: '18:00',
    },
  },
  {
    id: 'store-tomato-shop',
    name: '토마토 상점',
    description: '귀여운 토마토와 고양이',
    location: '마포구 홍대',
    image: '/images/popup-stores/store-tomato-shop-popup-store.png',
    tags: ['토마토', '고양이', '귀여움', '문구'],
    category: '리빙·테크',
    startDate: '2025-09-15T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    operatingHours: {
      start: '09:00',
      end: '21:00',
    },
  },
  {
    id: 'store-drawing-day',
    name: '드로잉데이',
    description: '국내 인기 일러스트 작가들과 함께하는 드로잉 콜라보 팝업',
    location: '성수동 언더스탠드애비뉴',
    image:
      'https://images.unsplash.com/photo-1616627981347-315c73207041?w=800&fit=crop&q=80',
    tags: ['일러스트', '콜라보', '아트상품', '팬굿즈'],
    category: '컬처(전시·체험)',
    startDate: '2025-10-12T00:00:00Z',
    endDate: '2025-10-26T23:59:59Z',
    operatingHours: {
      start: '11:00',
      end: '20:00',
    },
  },

  {
    id: 'store-zen-craft',
    name: '젠 크래프트',
    description: '마음의 평화를 찾는 수제 공예와 차의 세계',
    location: '마포구 홍대',
    image:
      'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&fit=crop&q=80&sat=-30',
    tags: ['수제공예', '차', '명상'],
    category: '푸드·카페',
    startDate: '2025-09-15T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    operatingHours: {
      start: '09:00',
      end: '21:00',
    },
  },
  {
    id: 'store-scents-of-seoul',
    name: '센츠 오브 서울',
    description: '서울의 네 가지 계절을 향기로 담은 감각적인 향기 팝업스토어',
    location: '연남동 경의선책거리',
    image:
      'https://images.unsplash.com/photo-1545840716-c82e9eec6930?w=800&fit=crop&q=80',
    tags: ['향기', '디퓨저', '감성굿즈', '계절별테마'],
    category: '리빙·테크',
    startDate: '2025-10-05T00:00:00Z',
    endDate: '2025-11-05T23:59:59Z',
    operatingHours: {
      start: '10:30',
      end: '20:30',
    },
  },
  {
    id: 'store-pixel-arcade',
    name: '픽셀 아케이드',
    description:
      '레트로 감성 속으로! 클래식 게임과 굿즈, 체험이 함께하는 팝업 전시',
    location: 'DDP 디자인랩',
    image:
      'https://images.unsplash.com/photo-1632256347173-298f7407d1df?w=800&fit=crop&q=80',
    tags: ['게임', '레트로', '굿즈', '체험'],
    category: '컬처(전시·체험)',
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-11-17T23:59:59Z',
    operatingHours: {
      start: '12:00',
      end: '21:00',
    },
  },
  {
    id: 'store-sweet-studio',
    name: '스위트 스튜디오',
    description: '먹는 즐거움에 보는 재미까지, 디자인 디저트 팝업카페',
    location: '망원동 한강공원 근처',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&fit=crop&q=80',
    tags: ['디저트', '디자인', '체험카페', '한정판매'],
    category: '리빙·테크',
    startDate: '2025-10-20T00:00:00Z',
    endDate: '2025-11-10T23:59:59Z',
    operatingHours: {
      start: '11:30',
      end: '20:00',
    },
  },
  {
    id: 'store-jeju-moment',
    name: '제주 모먼트',
    description: '제주 로컬 브랜드가 서울에 찾아온 감성 제주 위크',
    location: '성수동 성수연방',
    image:
      'https://images.unsplash.com/photo-1654509480655-327cc2b46f86?w=800&fit=crop&q=80',
    tags: ['로컬', '제주브랜드', '감성마켓', '소품샵'],
    category: '패션·뷰티',
    startDate: '2025-10-25T00:00:00Z',
    endDate: '2025-11-05T23:59:59Z',
    operatingHours: {
      start: '11:00',
      end: '20:00',
    },
  },
  {
    id: 'store-eco-future',
    name: '에코 퓨처',
    description: '지속가능한 미래를 위한 친환경 혁신 제품',
    location: '서초구 방배동',
    image:
      'https://images.unsplash.com/photo-1572202808998-93788f6d39da?w=800&fit=crop&q=80&sat=-25',
    tags: ['친환경', '지속가능', '혁신'],
    category: '리빙·테크',
    startDate: '2025-09-10T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    operatingHours: {
      start: '11:00',
      end: '19:00',
    },
  },
  {
    id: 'store-urban-vintage',
    name: '어반 빈티지',
    description: '도시적 감각의 빈티지 컬렉션과 아트',
    location: '용산구 이태원',
    image:
      'https://images.unsplash.com/photo-1624911104820-5316c700b907?w=800&fit=crop&q=80&sat=-20',
    tags: ['빈티지', '아트', '도시적'],
    category: '패션·뷰티',
    startDate: '2025-09-20T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
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
      'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800&fit=crop&q=80&sat=-25',
    tags: ['디지털웰빙', '마음챙김', '스마트'],
    category: '리빙·테크',
    startDate: '2025-09-25T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    operatingHours: {
      start: '10:30',
      end: '19:30',
    },
  },
];

export function findPopupStore(id: string) {
  return popupStores.find((store) => store.id === id) ?? null;
}
