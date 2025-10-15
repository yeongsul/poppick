import { NextResponse } from 'next/server';
import { products } from '@/mocks/db/products';

export async function GET() {
  return NextResponse.json(products);
}