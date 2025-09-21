import { http, HttpResponse } from 'msw';
import { popupStores, findPopupStore } from '../db/popupStores';
import { getProductsByStore } from '../db/products';

export const popupStoreHandlers = [
  // 팝업스토어 목록 조회
  http.get('/api/popup-stores', () => {
    return HttpResponse.json(popupStores);
  }),

  // 특정 팝업스토어 조회
  http.get('/api/popup-stores/:id', ({ params }) => {
    const { id } = params;
    const store = findPopupStore(id as string);

    if (!store) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(store);
  }),

  // 특정 팝업스토어의 상품들 조회
  http.get('/api/popup-stores/:id/products', ({ params }) => {
    const { id } = params;
    const store = findPopupStore(id as string);

    if (!store) {
      return new HttpResponse(null, { status: 404 });
    }

    const products = getProductsByStore(id as string);
    return HttpResponse.json(products);
  }),
];

