import { NextResponse } from 'next/server';

// 간단한 메모리 저장소 (실제로는 데이터베이스 사용)
let orders: any[] = [];

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newOrder = {
      id: 'ord_' + Math.random().toString(36).slice(2, 8),
      createdAt: new Date().toISOString(),
      popupStoreId: body.popupStoreId || 'store-cool-run',
      items: body.items || [],
      totalPrice: body.items?.reduce((sum: number, item: any) => sum + (item.priceEach * item.qty), 0) || 0,
      pickupTime: body.pickupTime || '14:00',
      pickupDate: body.pickupDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid' as const,
    };

    orders.unshift(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}