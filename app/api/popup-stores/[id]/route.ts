import { NextResponse } from 'next/server';

const popupStores = [
  {
    id: 'store-cool-run',
    name: '2025 THE COOL RUN',
    description: '러닝과 라이프스타일을 결합한 프리미엄 팝업스토어',
    location: '강남구 청담동',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop&q=80&sat=-25',
    tags: ['러닝', '스포츠', '프리미엄'],
    category: '패션' as const,
    startDate: '2024-12-15T00:00:00Z',
    endDate: '2025-01-31T00:00:00Z',
    operatingHours: {
      start: '10:00',
      end: '20:00',
    },
  },
  {
    id: 'store-artisan-bakery',
    name: 'Artisan Bakery Seoul',
    description: '프랑스 전통 베이킹 기법으로 만든 프리미엄 베이커리',
    location: '종로구 북촌',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&fit=crop&q=80&sat=-25',
    tags: ['베이커리', '프랑스', '수제'],
    category: '푸드' as const,
    startDate: '2024-12-20T00:00:00Z',
    endDate: '2025-02-15T00:00:00Z',
    operatingHours: {
      start: '08:00',
      end: '18:00',
    },
  },
  {
    id: 'store-green-tech',
    name: 'Green Tech Innovation',
    description: '친환경 기술과 지속가능한 라이프스타일 체험 공간',
    location: '서초구 방배동',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&fit=crop&q=80&sat=-25',
    tags: ['친환경', '지속가능', '혁신'],
    category: '기타' as const,
    startDate: '2024-12-19T00:00:00Z',
    endDate: '2025-01-28T00:00:00Z',
    operatingHours: {
      start: '11:00',
      end: '19:00',
    },
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const store = popupStores.find(s => s.id === params.id);

  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  return NextResponse.json(store);
}