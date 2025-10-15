import { NextResponse } from 'next/server';
import { orders, createOrder } from '@/mocks/db/orders';

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, popupStoreId, pickupDate, pickupTime } = body;

    if (!items || !popupStoreId || !pickupDate || !pickupTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = createOrder(items, popupStoreId, pickupDate, pickupTime);

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}