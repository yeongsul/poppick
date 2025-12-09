'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/stores/useCart';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/src/lib/api';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { useCreateOrder } from '@/src/hooks/queries';

export default function CartPage() {
  const router = useRouter();
  const { items, remove, updateQuantity, clear, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const createOrder = useCreateOrder();

  // 상품 정보 가져오기
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // 장바구니 아이템을 상품 정보와 매칭
  const cartItemsWithDetails = items.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    return {
      ...cartItem,
      product: product || null,
    };
  });

  const handleQuantityChange = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      remove(productId);
    } else {
      updateQuantity(productId, newQty);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0 || isLoading) return;

    try {
      setIsLoading(true);

      const payload = {
        items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
        popupStoreId: items[0]?.popupStoreId ?? 'default-store',
        pickupDate: new Date().toISOString().split('T')[0],
        pickupTime: '12:00',
      };

      const order = await createOrder.mutateAsync(payload);

      // 장바구니 비우고 티켓 페이지로 이동
      clear();
      router.push(`/ticket/${order.id}`);
    } catch (err: any) {
      setMessage(err?.message || '주문 처리 중 오류가 발생했습니다');
      setTimeout(() => setMessage(null), 2500);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 헤더 */}
            <div className="bg-primary px-6 py-6">
              <h1 className="text-2xl font-bold text-white">장바구니</h1>
              <p className="text-white/80 mt-1">
                {items.length}개의 상품이 담겨있습니다
              </p>
            </div>

            {/* 장바구니 내용 */}
            <div className="p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    장바구니가 비어있습니다
                  </h3>
                  <p className="text-gray-500 mb-6">
                    관심있는 상품을 장바구니에 담아보세요!
                  </p>
                  <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 transition-colors"
                  >
                    쇼핑 계속하기
                  </button>
                </div>
              ) : (
                <>
                  {/* 장바구니 아이템 목록 */}
                  <div className="space-y-4 mb-8">
                    {cartItemsWithDetails.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                      >
                        {/* 상품 이미지 */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product?.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg
                                className="w-8 h-8"
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
                          )}
                        </div>

                        {/* 상품 정보 */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {item.product?.name || '상품 정보 없음'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.product?.brand || ''}
                          </p>
                          <p className="text-lg font-bold text-primary mt-1">
                            {formatPrice(item.priceEach)}
                          </p>
                        </div>

                        {/* 수량 조절 */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.productId, item.qty - 1)
                            }
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <MinusIcon className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.productId, item.qty + 1)
                            }
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <PlusIcon className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* 소계 */}
                        <div className="text-right min-w-0">
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(item.priceEach * item.qty)}
                          </p>
                        </div>

                        {/* 삭제 버튼 */}
                        <button
                          onClick={() => remove(item.productId)}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* 주문 요약 */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-gray-700">
                          총 {items.reduce((sum, item) => sum + item.qty, 0)}개
                          상품
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(getTotalPrice())}
                        </span>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={clear}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          전체 삭제
                        </button>
                        <button
                          onClick={handleCheckout}
                          disabled={isLoading}
                          className="flex-1 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? '처리중...' : '주문하기'}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </>
  );
}
