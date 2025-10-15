import { NextResponse } from 'next/server';
import { eventCategories } from '@/mocks/db/eventCategories';

export async function GET() {
  return NextResponse.json(eventCategories);
}