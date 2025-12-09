'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import {
  ClockIcon,
  MapPinIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  store: {
    name: string;
    location: string;
  };
  pickupDate: string;
  pickupTime: string;
  total: number;
}

export default function OrdersPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // 샘플 주문 데이터
    const sampleOrders: Order[] = [
      {
        id: 'order-001',
        date: '2025-09-20T14:30:00Z',
        status: 'confirmed',
        items: [
          {
            id: 'pp-hoodie',
            name: 'PopPick Hoodie',
            price: 59000,
            quantity: 1,
            image: '/img/hoodie.jpg',
          },
          {
            id: 'pp-tumbler',
            name: 'Logo Tumbler',
            price: 29000,
            quantity: 2,
            image: '/img/tumbler.jpg',
          },
        ],
        store: {
          name: '2025 THE COOL RUN',
          location: '강남구 청담동',
        },
        pickupDate: '2025-09-22',
        pickupTime: '15:00',
        total: 117000,
      },
      {
        id: 'order-002',
        date: '2025-09-18T10:20:00Z',
        status: 'completed',
        items: [
          {
            id: 'pp-cookie',
            name: 'Cookie Box',
            price: 12000,
            quantity: 3,
            image: '/img/cookie.jpg',
          },
        ],
        store: {
          name: 'Artisan Bakery Seoul',
          location: '종로구 북촌',
        },
        pickupDate: '2025-09-19',
        pickupTime: '11:30',
        total: 36000,
      },
    ];

    setOrders(sampleOrders);
  }, [router]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return '주문 대기';
      case 'confirmed':
        return '주문 확인';
      case 'ready':
        return '픽업 대기';
      case 'completed':
        return '완료';
      case 'cancelled':
        return '취소';
      default:
        return '알 수 없음';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-primary px-6 py-6">
            <h1 className="text-2xl font-bold text-white">주문 내역</h1>
            <p className="text-white/80 mt-1">
              나의 팝업스토어 주문을 확인하세요
            </p>
          </div>

          {/* 주문 목록 */}
          <div className="p-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  주문 내역이 없습니다
                </h3>
                <p className="text-gray-500 mb-6">
                  첫 번째 팝업스토어 쇼핑을 시작해보세요!
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  쇼핑 시작하기
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* 주문 헤더 */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-900">
                              주문번호: {order.id}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDate(order.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 주문 상세 */}
                    <div className="p-6">
                      {/* 스토어 정보 */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                        <MapPinIcon className="w-4 h-4" />
                        <span>
                          {order.store.name} · {order.store.location}
                        </span>
                      </div>

                      {/* 픽업 정보 */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                        <ClockIcon className="w-4 h-4" />
                        <span>
                          픽업 예정: {order.pickupDate} {order.pickupTime}
                        </span>
                      </div>

                      {/* 주문 상품 */}
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                수량: {item.quantity}개
                              </p>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 액션 버튼 */}
                      <div className="mt-6 flex space-x-3">
                        <button
                          onClick={() => router.push(`/ticket/${order.id}`)}
                          className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          픽업 티켓 보기
                        </button>
                        {order.status === 'completed' && (
                          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            재주문하기
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
