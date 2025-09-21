import type { EventCategory } from '@/src/types';

export const eventCategories: Readonly<EventCategory[]> = [
  { slug: 'style', label: '패션/뷰티', icon: 'lipstick', order: 1 },
  { slug: 'food', label: '푸드·카페', icon: 'cup', order: 2 },
  { slug: 'living-tech', label: '리빙·테크', icon: 'home', order: 3 },
  { slug: 'culture', label: '컬처(전시·체험)', icon: 'palette', order: 4 },
  { slug: 'fandom-sports', label: '팬덤·스포츠', icon: 'baseball', order: 5 },
];
