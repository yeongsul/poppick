export interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  avatar: string | null;
}

export interface UserStats {
  totalOrders: number;
  visitedStores: number;
  totalSpent: number;
}

export const users: User[] = [
  {
    id: 'user-1',
    email: 'user@poppick.com',
    name: '팝픽 사용자',
    joinDate: '2024-01-15T00:00:00.000Z',
    avatar: null,
  },
  {
    id: 'user-2',
    email: 'test@example.com',
    name: '테스트 유저',
    joinDate: '2024-03-20T00:00:00.000Z',
    avatar: null,
  },
];

export const userStats: Record<string, UserStats> = {
  'user-1': {
    totalOrders: 12,
    visitedStores: 8,
    totalSpent: 456000,
  },
  'user-2': {
    totalOrders: 5,
    visitedStores: 3,
    totalSpent: 180000,
  },
};
