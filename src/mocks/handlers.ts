import { http, HttpResponse } from 'msw';
import { products, slotsByProduct, orders, createOrder, getOrder } from './data';

export const handlers = [
  // Products
  http.get('/api/products', () => HttpResponse.json(products)),
  http.get('/api/products/:id', ({ params }) => {
    const p = products.find(x => x.id === params.id);
    if (!p) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(p);
  }),

  // Timeslots for a product
  http.get('/api/products/:id/slots', ({ params }) => {
    const slots = slotsByProduct[String(params.id)];
    if (!slots) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(slots);
  }),

  // Orders
  http.get('/api/orders', () => HttpResponse.json(orders)),
  http.get('/api/orders/:id', ({ params }) => {
    const o = getOrder(String(params.id));
    if (!o) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(o);
  }),
  http.post('/api/orders', async ({ request }) => {
    const body = await request.json() as any;
    if (!body?.items?.length) return HttpResponse.json({ error: 'No items' }, { status: 400 });
    const result = createOrder(body.items);
    if ('error' in result) return HttpResponse.json(result, { status: 409 });
    return HttpResponse.json(result, { status: 201 });
  }),
];
