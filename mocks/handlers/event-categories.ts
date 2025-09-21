import { http, HttpResponse } from 'msw';
import { eventCategories } from '../db/eventCategories';

export const eventCategoryHandlers = [
  http.get('/api/event-categories', () => HttpResponse.json(eventCategories)),
];
