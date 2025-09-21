import type { Product, Timeslot, Order } from '@/src/types';

function toISO(d: Date) {
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString();
}

export function generateTimeslots(productId: string, open = '10:00', close = '22:00', interval = 10, cap = 15): Timeslot[] {
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  const start = new Date(); start.setHours(oh, om, 0, 0);
  const end = new Date();   end.setHours(ch, cm, 0, 0);

  const out: Timeslot[] = [];
  for (let t = new Date(start); t < end; t = new Date(t.getTime() + interval * 60000)) {
    const next = new Date(t.getTime() + interval * 60000);
    const hh = String(t.getHours()).padStart(2,'0');
    const mm = String(t.getMinutes()).padStart(2,'0');
    out.push({
      id: `${productId}-${hh}${mm}`,
      productId,
      start: toISO(t),
      end: toISO(next),
      remaining: cap,
    });
  }
  return out;
}

// ---- Seed data ----
export const products: Product[] = [
  { id: 'pp-hoodie',  name: 'PopPick Hoodie', brand: 'Brand A', image: '/img/hoodie.jpg',  price: 59000, tags: ['한정'], popupStoreId: 'store-cool-run' },
  { id: 'pp-tumbler', name: 'Logo Tumbler',  brand: 'Brand A', image: '/img/tumbler.jpg', price: 29000, tags: ['MD'], popupStoreId: 'store-cool-run' },
  { id: 'pp-cookie',  name: 'Cookie Box',    brand: 'Brand B', image: '/img/cookie.jpg',  price: 12000, tags: ['디저트'], popupStoreId: 'store-artisan-bakery' }
];

export let slotsByProduct: Record<string, Timeslot[]> = Object.fromEntries(
  products.map(p => [p.id, generateTimeslots(p.id, '10:00', '22:00', 10, 15)])
);

export let orders: Order[] = [];

export function createOrder(items: { productId: string; timeslotId: string; qty: number }[]): Order | { error: string } {
  for (const it of items) {
    const slots = slotsByProduct[it.productId] || [];
    const slot = slots.find(s => s.id === it.timeslotId);
    if (!slot) return { error: `Invalid timeslot for ${it.productId}` };
    if (slot.remaining < it.qty) return { error: `Not enough remaining for ${slot.id}` };
  }
  for (const it of items) {
    const slot = slotsByProduct[it.productId].find(s => s.id === it.timeslotId)!;
    slot.remaining -= it.qty;
  }
  const now = new Date();
  const order: Order = {
    id: 'ord_' + Math.random().toString(36).slice(2, 8),
    createdAt: toISO(now),
    popupStoreId: products.find(p => p.id === items[0].productId)?.popupStoreId ?? 'default-store',
    items: items.map(i => ({
      productId: i.productId,
      qty: i.qty,
      priceEach: products.find(p => p.id === i.productId)?.price ?? 0
    })),
    totalPrice: items.reduce((sum, i) => sum + (products.find(p => p.id === i.productId)?.price ?? 0) * i.qty, 0),
    pickupTime: '14:00',
    pickupDate: toISO(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
    status: 'paid'
  };
  orders.unshift(order);
  return order;
}

export function getOrder(id: string) {
  return orders.find(o => o.id === id);
}
