import { NextResponse } from 'next/server';
import { findProduct } from '@/mocks/db/products';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = findProduct(params.id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
