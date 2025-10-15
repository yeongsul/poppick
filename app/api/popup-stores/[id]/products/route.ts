import { NextResponse } from 'next/server';
import { getProductsByStore } from '@/mocks/db/products';
import { findPopupStore } from '@/mocks/db/popupStores';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const store = findPopupStore(params.id);

  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  const products = getProductsByStore(params.id);
  return NextResponse.json(products);
}
