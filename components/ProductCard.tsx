'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/stores/useCart';
import type { Product } from '@/src/types';

type Props = {
  item: Product;
  showAddToCart?: boolean;
};

export default function ProductCard({ item, showAddToCart = false }: Props) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState<string | null>(null);

  const handleAddToCart = () => {
    const result = cart.add({
      productId: item.id,
      qty,
      priceEach: item.price,
      popupStoreId: item.popupStoreId,
    });

    if (result.success) {
      setShowMessage('장바구니에 추가되었습니다!');
      setTimeout(() => setShowMessage(null), 2000);
    } else {
      if (window.confirm(result.message)) {
        cart.clear();
        cart.add({
          productId: item.id,
          qty,
          priceEach: item.price,
          popupStoreId: item.popupStoreId,
        });
        setShowMessage('장바구니에 추가되었습니다!');
        setTimeout(() => setShowMessage(null), 2000);
      }
    }
  };

  if (showAddToCart) {
    return (
      <div className="card p-4 hover:shadow-lg transition-all duration-200">
        <div className="relative h-40 w-full mb-3">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover rounded-xl"
            unoptimized
          />
        </div>

        <div className="space-y-3">
          <div>
            <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
            <div className="text-sm text-gray-500 mb-2">{item.brand}</div>
            <div className="text-primary font-bold text-lg">
              {item.price.toLocaleString()}원
            </div>
          </div>

          {/* 태그 */}
          <div className="flex gap-1 flex-wrap">
            {item.tags?.map((t) => (
              <span key={t} className="badge text-xs">
                {t}
              </span>
            ))}
          </div>

          {/* 수량 선택 및 장바구니 추가 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">수량:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full btn-primary text-sm py-2"
            >
              장바구니에 추가
            </button>
          </div>
        </div>

        {/* 알림 메시지 */}
        {showMessage && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
            {showMessage}
          </div>
        )}
      </div>
    );
  }

  // 기존 링크 형태 (상품 상세 페이지로 이동)
  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-40 w-full mb-3">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover rounded-xl"
          unoptimized
        />
      </div>
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-2">
          <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
          <div className="text-sm text-gray-500">{item.brand}</div>
        </div>
        <div className="text-primary font-bold text-lg">
          {item.price.toLocaleString()}원
        </div>
      </div>
      <div className="mt-3 flex gap-1 flex-wrap">
        {item.tags?.map((t) => (
          <span key={t} className="badge text-xs">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
