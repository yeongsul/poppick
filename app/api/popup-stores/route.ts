import { NextResponse } from 'next/server';
import { popupStores } from '@/mocks/db/popupStores';

export async function GET() {
  return NextResponse.json(popupStores);
}
