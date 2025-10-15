'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useCart } from '@/stores/useCart';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  avatar: string | null;
}

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { items } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  // 메인 페이지인지 확인
  const isMainPage = pathname === '/';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // 항상 단순하게 로그인 페이지로만 이동

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('poppick-cart');
    setUser(null);
    setIsUserMenuOpen(false);
    router.push('/');
  };

  const cartItemCount = items.reduce((total, item) => total + item.qty, 0);

  return (
    <header className={`relative z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 ${
      isMainPage ? 'rounded-t-2xl' : 'rounded-2xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-black text-primary">PopPick</span>
          </Link>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-4">
            {user ? (
              /* 로그인된 상태 */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="사용자 메뉴"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-6 h-6 text-gray-600" />
                  )}
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>

                {/* 사용자 드롭다운 메뉴 */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      프로필
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      주문 내역
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      설정
                    </Link>
                    <hr className="my-1" />
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* 로그인되지 않은 상태 */
              <Link
                href="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <UserCircleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">로그인</span>
              </Link>
            )}

            {/* 장바구니 */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="장바구니"
            >
              <ShoppingCartIcon className="w-6 h-6 text-gray-600" />

              {/* 장바구니 아이템 개수 */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 배경 클릭 시 메뉴 닫기 */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}
