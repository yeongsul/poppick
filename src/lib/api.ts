import axios from 'axios';
import type {
  Product,
  Timeslot,
  Order,
  EventCategory,
  PopupStore,
} from '@/src/types';

// MSW를 사용한 API 호출
export async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get('/api/products');
  return data;
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
}

export async function getTimeslots(productId: string): Promise<Timeslot[]> {
  const { data } = await axios.get(`/api/products/${productId}/slots`);
  return data;
}

export async function getOrders(): Promise<Order[]> {
  const { data } = await axios.get('/api/orders');
  return data;
}

export async function getOrder(id: string): Promise<Order> {
  const { data } = await axios.get(`/api/orders/${id}`);
  return data;
}

export async function createOrder(payload: {
  items: { productId: string; qty: number }[];
  popupStoreId: string;
  pickupDate: string;
  pickupTime: string;
}): Promise<Order> {
  const { data } = await axios.post('/api/orders', payload);
  return data;
}

export async function getEventCategories(): Promise<EventCategory[]> {
  const { data } = await axios.get<EventCategory[]>('/api/event-categories');
  return data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getPopupStores(): Promise<PopupStore[]> {
  const { data } = await axios.get('/api/popup-stores');
  return data;
}

export async function getPopupStore(id: string): Promise<PopupStore> {
  const { data } = await axios.get(`/api/popup-stores/${id}`);
  return data;
}

export async function getStoreProducts(storeId: string): Promise<Product[]> {
  const { data } = await axios.get(`/api/popup-stores/${storeId}/products`);
  return data;
}
