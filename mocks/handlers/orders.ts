import { http, HttpResponse } from 'msw';
import { orders, createOrder, getOrder } from '../db/orders';

export const orderHandlers = [
  http.get('/api/orders', () => HttpResponse.json(orders)),

  http.post('/api/orders', async ({ request }) => {
    const body = (await request.json()) as {
      items: { productId: string; qty: number }[];
      popupStoreId: string;
      pickupDate: string;
      pickupTime: string;
    };
    const result = createOrder(
      body.items,
      body.popupStoreId,
      body.pickupDate,
      body.pickupTime,
    );
    if ('error' in result) {
      return new HttpResponse(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return HttpResponse.json(result, { status: 201 });
  }),

  http.get('/api/orders/:id', ({ params }) => {
    const { id } = params as { id: string };
    const order = getOrder(id);
    if (!order) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(order);
  }),
];
