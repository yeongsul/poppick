import { NextResponse } from 'next/server';
import { userStats } from '@/mocks/db/users';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user-1';

  const stats = userStats[userId];

  if (!stats) {
    return NextResponse.json(
      { error: 'User stats not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(stats);
}
