import type { Timeslot } from '@/src/types';
import { products } from './products';

function toISO(date: Date) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString();
}

export function generateTimeslots(
  productId: string,
  open = '10:00',
  close = '22:00',
  interval = 10,
  cap = 20,
): Timeslot[] {
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  const start = new Date();
  start.setHours(oh, om, 0, 0);
  const end = new Date();
  end.setHours(ch, cm, 0, 0);

  const slots: Timeslot[] = [];
  for (
    let t = new Date(start);
    t < end;
    t = new Date(t.getTime() + interval * 60000)
  ) {
    const next = new Date(t.getTime() + interval * 60000);
    const hh = String(t.getHours()).padStart(2, '0');
    const mm = String(t.getMinutes()).padStart(2, '0');
    slots.push({
      id: `${productId}-${hh}${mm}`,
      productId,
      start: toISO(t),
      end: toISO(next),
      remaining: cap,
    });
  }
  return slots;
}

// 메모리 상태 (핸들러에서만 mutate)
export let slotsByProduct: Record<string, Timeslot[]> = Object.fromEntries(
  products.map((p) => [
    p.id,
    generateTimeslots(p.id, '10:00', '22:00', 10, 15),
  ]),
);

// 유틸
export function getSlots(productId: string): Timeslot[] {
  return slotsByProduct[productId] ?? [];
}
