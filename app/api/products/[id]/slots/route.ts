import { NextResponse } from 'next/server';
import { getSlots } from '@/mocks/db/slots';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const slots = getSlots(params.id);
  return NextResponse.json(slots);
}
