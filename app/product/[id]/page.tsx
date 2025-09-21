'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useProduct,
  useTimeslots,
  useCreateOrder,
  useOrders,
} from '@/src/hooks/queries';
import SlotPicker from '@/components/SlotPicker';
import Link from 'next/link';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { data: product, isLoading: loadingP } = useProduct(id);
  const { data: slots, isLoading: loadingS } = useTimeslots(id);
  const createOrder = useCreateOrder();
  const { refetch: refetchOrders } = useOrders();

  const [qty, setQty] = useState(1);
  const [slotId, setSlotId] = useState<string | undefined>(undefined);
  const [orderId, setOrderId] = useState<string | null>(null);

  const canOrder = useMemo(
    () => !!product && !!slotId && qty > 0,
    [product, slotId, qty],
  );

  useEffect(() => {
    // 슬롯 목록 갱신 시, 선택 초기화
    setSlotId(undefined);
  }, [id]);

  if (loadingP || loadingS) {
    return (
      <main className="space-y-6">
        <section className="card p-6">
          <div className="h-5 w-1/3 bg-gray-100 rounded mb-4" />
          <div className="h-40 bg-gray-100 rounded-xl mb-4" />
          <div className="h-4 w-1/2 bg-gray-100 rounded" />
        </section>
      </main>
    );
  }

  if (!product || !slots) {
    return (
      <main className="space-y-6">
        <section className="card p-6 text-red-600">
          상품 정보를 불러오지 못했습니다.
        </section>
      </main>
    );
  }

  const submit = async () => {
    if (!canOrder || !slotId) return;
    const res = await createOrder.mutateAsync({
      items: [{ productId: product.id, qty }],
      popupStoreId: product.popupStoreId || 'default-store',
      pickupDate: new Date().toISOString().split('T')[0],
      pickupTime: slotId,
    });
    setOrderId(res.id);
    await refetchOrders();
  };

  return (
    <main className="space-y-6">
      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <div className="text-gray-600 mb-4">{product.brand}</div>
        <div className="h-48 bg-gray-100 rounded-xl mb-4" />
        <div className="flex items-center justify-between">
          <div className="text-primary font-semibold text-lg">
            {product.price.toLocaleString()}원
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 rounded-xl border"
              aria-label="수량 감소"
            >
              -
            </button>
            <div className="w-10 text-center">{qty}</div>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-2 rounded-xl border"
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h3 className="font-semibold mb-3">예약 시간 선택 (10분 간격)</h3>
        <SlotPicker slots={slots} selectedId={slotId} onSelect={setSlotId} />
      </section>

      <section className="flex gap-3">
        <button
          onClick={submit}
          disabled={!canOrder || createOrder.isPending}
          className={`btn-primary ${
            !canOrder ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {createOrder.isPending ? '예약 생성 중…' : '예약 & 주문 생성'}
        </button>

        <Link href="/orders" className="btn">
          내 주문내역 보기
        </Link>

        {orderId && (
          <Link href={`/ticket/${orderId}`} className="btn-accent">
            QR 티켓 보기
          </Link>
        )}
      </section>
    </main>
  );
}
