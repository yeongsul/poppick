'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import {
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true
  });
  const [language, setLanguage] = useState('ko');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('poppick-cart');
      router.push('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      localStorage.clear();
      router.push('/');
    }
  };

  if (!user) {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          {/* 헤더 */}
          <div className="bg-primary px-6 py-6">
            <h1 className="text-2xl font-bold text-white">설정</h1>
            <p className="text-white/80 mt-1">앱 설정을 관리하세요</p>
            <div className="mt-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white/90 text-sm">
                ℹ️ 아래 설정들은 데모용 UI입니다. 실제 기능은 구현되지 않았습니다.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* 알림 설정 */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <BellIcon className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">알림 설정</h2>
                <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">데모용</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 pl-9">실제 알림 발송 기능은 구현되지 않았습니다</p>
              <div className="space-y-4 pl-9">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">이메일 알림</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">주문 확인 및 중요 업데이트</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">푸시 알림</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">새로운 팝업스토어 및 특가 정보</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">마케팅 알림</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">프로모션 및 이벤트 정보</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={(e) => setNotifications(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* 언어 설정 */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <GlobeAltIcon className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">언어 설정</h2>
                <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">데모용</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 pl-9">다국어 지원 기능은 구현되지 않았습니다</p>
              <div className="pl-9">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>


            {/* 계정 관리 */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <ShieldCheckIcon className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">계정 관리</h2>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>로그아웃</span>
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 py-3 px-6 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                  <span>계정 삭제</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}