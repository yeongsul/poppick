'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/stores/useCart';
import { usePopupStore, useProduct, useCreateOrder, useOrders } from '@/src/hooks/queries';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const cart = useCart();
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const { data: store } = usePopupStore(cart.popupStoreId || undefined);
  const { data: orders } = useOrders();
  const createOrder = useCreateOrder();

  // 픽업 가능한 시간 슬롯 생성 (30분 간격)
  const generateTimeSlots = useCallback(() => {
    if (!store) {
      return [
        '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
        '19:00', '19:30'
      ];
    }

    const slots = [];
    const start = parseInt(store.operatingHours.start.split(':')[0]);
    const end = parseInt(store.operatingHours.end.split(':')[0]);

    // 오늘 날짜인지 확인
    const today = new Date().toISOString().split('T')[0];
    const isToday = pickupDate === today;

    let currentTime = 0;
    if (isToday) {
      // 오늘 날짜인 경우에만 현재 시간을 고려
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      currentTime = currentHour * 60 + currentMinute; // 분 단위로 변환
    }


    for (let hour = start; hour < end; hour++) {
      // 00분 슬롯
      const slot00 = hour * 60; // 분 단위로 변환
      if (!isToday || slot00 > currentTime) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
      }

      // 30분 슬롯
      const slot30 = hour * 60 + 30; // 분 단위로 변환
      if (!isToday || slot30 > currentTime) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }

    return slots;
  }, [store, pickupDate]);

  // 픽업 가능한 날짜 생성 (현재 날짜 기준으로 동적 생성)
  const generateAvailableDates = useCallback(() => {
    if (!store) {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    }

    const dates = [];
    const today = new Date();

    // 팝업스토어가 이미 종료된 경우, 현재 날짜부터 30일간 제공
    // 팝업스토어가 진행 중인 경우, 현재 날짜부터 종료일까지 제공
    const endDate = new Date(store.endDate);
    const isStoreEnded = endDate < today;

    let availableEndDate;
    if (isStoreEnded) {
      // 스토어가 종료된 경우, 현재 날짜부터 30일간
      availableEndDate = new Date(today);
      availableEndDate.setDate(today.getDate() + 30);
    } else {
      // 스토어가 진행 중인 경우, 종료일까지
      availableEndDate = endDate;
    }


    // 오늘부터 availableEndDate까지 날짜 생성
    for (
      let d = new Date(today);
      d <= availableEndDate;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(d.toISOString().split('T')[0]);
    }

    return dates;
  }, [store]);


  // 날짜가 변경될 때 시간 선택 초기화
  useEffect(() => {
    if (pickupDate) {
      setPickupTime('');
    }
  }, [pickupDate]);

  const handleOrder = async () => {
    if (!store || !pickupDate || !pickupTime || cart.items.length === 0) return;

    setIsOrdering(true);
    try {
      const result = await createOrder.mutateAsync({
        items: cart.items.map((item) => ({
          productId: item.productId,
          qty: item.qty,
        })),
        popupStoreId: store.id,
        pickupDate,
        pickupTime,
      });

      setOrderId(result.id);
      cart.clear();
    } catch (error) {
      alert('주문에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsOrdering(false);
    }
  };

  if (orderId) {
    return (
      <main className="space-y-6">
        <section className="card p-6 text-center">
          <div className="text-green-600 text-2xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h1>
          <p className="text-gray-600 mb-6">주문번호: {orderId}</p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn">
              홈으로
            </Link>
            <Link href={`/ticket/${orderId}`} className="btn-primary">
              QR 티켓 보기
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return (
      <main className="space-y-6">
        <h1 className="text-2xl font-bold">주문 내역</h1>

        {/* 장바구니 링크 */}
        <section className="card p-4">
          <Link href="/" className="text-primary hover:underline">
            ← 쇼핑 계속하기
          </Link>
        </section>

        {/* 주문 내역 목록 */}
        {orders && orders.length > 0 ? (
          <section className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">주문 #{order.id}</h2>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {order.totalPrice.toLocaleString()}원
                    </div>
                    <div className={`text-sm px-2 py-1 rounded text-white ${
                      order.status === 'paid' ? 'bg-green-500' :
                      order.status === 'fulfilled' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`}>
                      {order.status === 'paid' ? '결제완료' :
                       order.status === 'fulfilled' ? '픽업완료' : '취소됨'}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">픽업 날짜: </span>
                      <span>{new Date(order.pickupDate).toLocaleDateString('ko-KR')}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">픽업 시간: </span>
                      <span>{order.pickupTime}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-gray-600 text-sm">주문 상품: </span>
                    <span className="text-sm">
                      {order.items.map(item => `${item.productId} (${item.qty}개)`).join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/ticket/${order.id}`}
                    className="btn-primary text-sm"
                  >
                    QR 티켓 보기
                  </Link>
                  {order.status === 'paid' && (
                    <button className="btn text-sm">
                      픽업 완료 처리
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="card p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">
              주문 내역이 없습니다
            </h2>
            <p className="text-gray-600 mb-4">첫 주문을 해보세요!</p>
            <Link href="/" className="btn-primary">
              팝업스토어 둘러보기
            </Link>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">장바구니</h1>

      {/* 팝업스토어 정보 */}
      {store && (
        <section className="card p-4">
          <h2 className="font-semibold mb-2">픽업 장소</h2>
          <div className="text-gray-600">
            📍 {store.name} | {store.location}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            운영시간: {store.operatingHours.start} - {store.operatingHours.end}
          </div>
        </section>
      )}

      {/* 장바구니 상품들 */}
      <section className="card p-6">
        <h2 className="font-semibold mb-4">주문 상품</h2>
        <div className="space-y-4">
          {cart.items.map((item) => (
            <CartItemRow key={item.productId} item={item} />
          ))}
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>총 금액</span>
            <span className="text-primary">
              {cart.getTotalPrice().toLocaleString()}원
            </span>
          </div>
        </div>
      </section>

      {/* 픽업 시간 선택 */}
      <section className="card p-6">
        <h2 className="font-semibold mb-4">픽업 시간 선택</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* 날짜 선택 */}
          <div>
            <label className="block text-sm font-medium mb-2">픽업 날짜</label>
            <select
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border rounded-xl px-3 py-2"
            >
              <option value="">날짜를 선택하세요</option>
              {generateAvailableDates().map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short',
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* 시간 선택 */}
          <div>
            <label className="block text-sm font-medium mb-2">픽업 시간</label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full border rounded-xl px-3 py-2"
              disabled={!pickupDate}
            >
              <option value="">시간을 선택하세요</option>
              {generateTimeSlots().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 주문하기 버튼 */}
      <section className="card p-6">
        <button
          onClick={handleOrder}
          disabled={!pickupDate || !pickupTime || isOrdering}
          className={`w-full btn-primary ${
            !pickupDate || !pickupTime || isOrdering
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {isOrdering ? '주문 처리 중...' : '주문하기'}
        </button>
      </section>
    </main>
  );
}

// 장바구니 아이템 행 컴포넌트
function CartItemRow({ item }: { item: any }) {
  const cart = useCart();
  const { data: product } = useProduct(item.productId);

  if (!product) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.brand}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => cart.updateQuantity(item.productId, item.qty - 1)}
          className="w-8 h-8 rounded border flex items-center justify-center"
        >
          -
        </button>
        <span className="w-8 text-center">{item.qty}</span>
        <button
          onClick={() => cart.updateQuantity(item.productId, item.qty + 1)}
          className="w-8 h-8 rounded border flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <div className="font-medium">
          {(item.priceEach * item.qty).toLocaleString()}원
        </div>
        <button
          onClick={() => cart.remove(item.productId)}
          className="text-sm text-red-600 hover:underline"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
