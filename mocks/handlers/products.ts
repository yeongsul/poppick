import { http, HttpResponse } from 'msw';
import { products } from '../db/products';
import { getSlots } from '../db/slots';

export const productHandlers = [
  // 상품 목록
  http.get('/api/products', () => HttpResponse.json(products)),

  http.get('/api/products/:id', ({ params }) => {
    const { id } = params as { id: string };
    const p = products.find((p) => p.id === id);
    if (!p) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(p);
  }),

  // 특정 상품의 타임슬롯
  http.get('/api/products/:id/slots', ({ params }) => {
    const { id } = params as { id: string };
    return HttpResponse.json(getSlots(id));
  }),
];
