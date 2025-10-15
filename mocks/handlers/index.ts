import { productHandlers } from './products';
import { orderHandlers } from './orders';
import { eventCategoryHandlers } from './event-categories';
import { popupStoreHandlers } from './popup-stores';
import { slotHandlers } from './slots';
import { userHandlers } from './users';

export const handlers = [
  ...popupStoreHandlers,
  ...productHandlers,
  ...slotHandlers,
  ...orderHandlers,
  ...eventCategoryHandlers,
  ...userHandlers,
];
