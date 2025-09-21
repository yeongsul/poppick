import type { Order } from '@/src/types';
import { products } from './products';

function toISO(date: Date) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString();
}

// 메모리 상태
export let orders: Order[] = [];

export function createOrder(
  items: { productId: string; qty: number }[],
  popupStoreId: string,
  pickupDate: string,
  pickupTime: string,
): Order | { error: string } {
  // 상품 검증
  for (const it of items) {
    const product = products.find((p) => p.id === it.productId);
    if (!product) return { error: `Product not found: ${it.productId}` };
    if (product.popupStoreId !== popupStoreId) {
      return {
        error: `Product ${it.productId} does not belong to store ${popupStoreId}`,
      };
    }
  }

  // 주문 생성
  const now = new Date();
  const order: Order = {
    id: 'ord_' + Math.random().toString(36).slice(2, 8),
    createdAt: toISO(now),
    popupStoreId,
    items: items.map((i) => ({
      productId: i.productId,
      qty: i.qty,
      priceEach: products.find((p) => p.id === i.productId)?.price ?? 0,
    })),
    totalPrice: items.reduce((sum, i) => {
      const price = products.find((p) => p.id === i.productId)?.price ?? 0;
      return sum + price * i.qty;
    }, 0),
    pickupTime,
    pickupDate,
    status: 'paid',
  };
  orders.unshift(order);
  return order;
}

export function getOrder(id: string) {
  return orders.find((o) => o.id === id) ?? null;
}
