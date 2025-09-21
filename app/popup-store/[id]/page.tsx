'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { usePopupStore, useStoreProducts } from '@/src/hooks/queries';
import { useCart } from '@/stores/useCart';
import ProductCard from '@/components/ProductCard';
import SkeletonCard from '@/components/SkeletonCard';

type Props = {
  params: { id: string };
};

export default function PopupStoreDetailPage({ params }: Props) {
  const { id } = params;
  const { data: store, isLoading: storeLoading } = usePopupStore(id);
  const { data: products, isLoading: productsLoading } = useStoreProducts(id);
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMessage, setShowMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (!searchQuery.trim()) return products;

    const query = searchQuery.trim().toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [products, searchQuery]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  const isActive = () => {
    if (!store) return false;
    const now = new Date();
    const start = new Date(store.startDate);
    const end = new Date(store.endDate);
    return now >= start && now <= end;
  };

  if (storeLoading) {
    return (
      <main className="space-y-6">
        <div className="card p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!store) {
    return (
      <main className="space-y-6">
        <div className="card p-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            팝업스토어를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600">
            요청하신 팝업스토어가 존재하지 않거나 삭제되었습니다.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      {/* 팝업스토어 헤더 정보 */}
      <section className="card p-0 overflow-hidden">
        <div className="relative h-64 sm:h-80">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{store.name}</h1>
              <span
                className={`badge ${
                  isActive()
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {isActive() ? '운영중' : '준비중'}
              </span>
            </div>
            <p className="text-lg mb-2">{store.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>📍 {store.location}</span>
              <span>
                🕐 {store.operatingHours.start} - {store.operatingHours.end}
              </span>
              <span>
                📅 {formatDate(store.startDate)} - {formatDate(store.endDate)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 검색 */}
      <section className="card p-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">상품 목록</h2>
          <div className="flex-1">
            <input
              type="text"
              placeholder="상품 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* 상품 그리드 */}
      <section className="space-y-4">
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                showAddToCart={true}
              />
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <p className="text-gray-600">
              {searchQuery
                ? '검색 조건에 맞는 상품이 없습니다.'
                : '이 팝업스토어에는 아직 상품이 없습니다.'}
            </p>
          </div>
        )}
      </section>

      {/* 태그 표시 */}
      <section className="card p-4">
        <h3 className="font-semibold mb-3">태그</h3>
        <div className="flex gap-2 flex-wrap">
          {store.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 장바구니 상태 및 주문하기 */}
      {cart.items.length > 0 && cart.popupStoreId === store.id && (
        <section className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">장바구니</h3>
            <span className="text-sm text-gray-600">
              {cart.getItemCount()}개 상품
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {cart.items.map((item) => {
              const product = products?.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.productId}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {product.name} x {item.qty}
                  </span>
                  <span className="font-medium">
                    {(item.priceEach * item.qty).toLocaleString()}원
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">총 금액</span>
              <span className="text-lg font-bold text-primary">
                {cart.getTotalPrice().toLocaleString()}원
              </span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => cart.clear()} className="btn flex-1">
                장바구니 비우기
              </button>
              <button
                onClick={() => (window.location.href = '/orders')}
                className="btn-primary flex-1"
              >
                주문하기
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
