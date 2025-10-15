'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 로그인 후 항상 메인 페이지로 이동

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 간단한 로그인 시뮬레이션
    setTimeout(() => {
      // 로컬 스토리지에 사용자 정보 저장
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: 'user-1',
          email: email,
          name: email.split('@')[0],
          joinDate: '2024-01-15',
          avatar: null,
        }),
      );

      setIsLoading(false);
      window.location.href = '/'; // 완전히 새로고침하며 메인으로 이동
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* 로고 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-black text-2xl">P</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">PopPick 로그인</h1>
            <p className="text-gray-600 mt-2">
              팝업 스토어의 특별한 순간을 만나보세요
            </p>
          </div>

          {/* 포트폴리오 데모 안내 */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              포트폴리오 데모용
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              실제 회원가입 없이 아무 이메일로 로그인하시면 바로 체험하실 수
              있습니다!
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('demo@poppick.com');
                  setPassword('demo123');
                }}
                className="text-xs bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg font-medium transition-colors"
              >
                데모 계정 자동 입력
              </button>
            </div>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* 포트폴리오 정보 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              💼 이 프로젝트는 포트폴리오용 데모입니다
              <br />
              실제 계정 생성 없이 위의 데모 계정을 사용하시거나
              <br />
              임의의 이메일로 로그인해보세요
            </p>
          </div>

          {/* 소셜 로그인 (데모용) */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  또는 원클릭 데모
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  // 구글 로그인 시뮬레이션
                  localStorage.setItem(
                    'user',
                    JSON.stringify({
                      id: 'user-google',
                      email: 'google.user@gmail.com',
                      name: '구글 데모 사용자',
                      joinDate: '2024-01-15',
                      avatar: null,
                    }),
                  );
                  window.location.href = '/';
                }}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>🚀 구글 로그인 체험하기</span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
