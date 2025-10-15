import { NextResponse } from 'next/server';
import { users } from '@/mocks/db/users';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user-1';

  const user = users.find(u => u.id === userId);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user-1';

  try {
    const body = await request.json();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (body.name !== undefined) {
      users[userIndex].name = body.name;
    }

    if (body.avatar !== undefined) {
      users[userIndex].avatar = body.avatar;
    }

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
