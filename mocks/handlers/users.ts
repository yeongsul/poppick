import { http, HttpResponse } from 'msw';
import { users, userStats } from '../db/users';

export const userHandlers = [
  // 현재 사용자 정보 조회
  http.get('/api/users/me', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || 'user-1';

    const user = users.find(u => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(user);
  }),

  // 사용자 정보 업데이트
  http.patch('/api/users/me', async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || 'user-1';
    const body = await request.json() as { name?: string; avatar?: string | null };

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return HttpResponse.json(
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

    return HttpResponse.json(users[userIndex]);
  }),

  // 사용자 통계 조회
  http.get('/api/users/me/stats', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || 'user-1';

    const stats = userStats[userId];

    if (!stats) {
      return HttpResponse.json(
        { error: 'User stats not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(stats);
  }),
];
