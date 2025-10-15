'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { UserCircleIcon, PencilIcon, CalendarIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  avatar: string | null;
}

interface UserStats {
  totalOrders: number;
  visitedStores: number;
  totalSpent: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);

      try {
        // 사용자 정보 가져오기
        const userResponse = await fetch(`/api/users/me?userId=${parsedUser.id}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user');
        const userJson = await userResponse.json();

        // 사용자 통계 가져오기
        const statsResponse = await fetch(`/api/users/me/stats?userId=${parsedUser.id}`);
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');
        const statsJson = await statsResponse.json();

        setUser(userJson);
        setStats(statsJson);
        setEditName(userJson.name);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // fallback to localStorage data
        setUser(parsedUser);
        setEditName(parsedUser.name);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/users/me?userId=${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      });

      if (!response.ok) throw new Error('Failed to update user');

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600 mt-4">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-primary px-6 py-8">
            <h1 className="text-2xl font-bold text-white">프로필</h1>
            <p className="text-white/80 mt-1">회원 정보를 관리하세요</p>
          </div>

          {/* 프로필 정보 */}
          <div className="p-6">
            <div className="flex items-start space-x-6">
              {/* 아바타 */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserCircleIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <button className="mt-3 text-sm text-primary hover:underline flex items-center">
                  <PencilIcon className="w-4 h-4 mr-1" />
                  사진 변경
                </button>
              </div>

              {/* 사용자 정보 */}
              <div className="flex-1">
                <div className="space-y-4">
                  {/* 이름 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    {isEditing ? (
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditName(user.name);
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold text-gray-900">{user.name}</span>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="text-primary hover:underline text-sm flex items-center"
                        >
                          <PencilIcon className="w-4 h-4 mr-1" />
                          수정
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 이메일 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <div className="flex items-center space-x-2 text-gray-900">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  {/* 가입일 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">가입일</label>
                    <div className="flex items-center space-x-2 text-gray-900">
                      <CalendarIcon className="w-5 h-5 text-gray-400" />
                      <span>{formatDate(user.joinDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 통계 */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats?.totalOrders || 0}</div>
                <div className="text-sm text-gray-600 mt-1">총 주문 수</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats?.visitedStores || 0}</div>
                <div className="text-sm text-gray-600 mt-1">방문한 팝업스토어</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">₩{stats?.totalSpent.toLocaleString() || 0}</div>
                <div className="text-sm text-gray-600 mt-1">총 구매 금액</div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/orders')}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                주문 내역 보기
              </button>
              <button
                onClick={() => router.push('/settings')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}