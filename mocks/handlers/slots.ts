import { http, HttpResponse } from 'msw';
import { getSlots } from '@/mocks/db/slots';

export const slotHandlers = [
  // 특정 상품의 시간 슬롯 조회
  http.get('/api/products/:productId/slots', ({ params }) => {
    const { productId } = params;
    const slots = getSlots(productId as string);
    return HttpResponse.json(slots);
  }),
];
