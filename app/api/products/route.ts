import { NextResponse } from 'next/server';

const products = [
  {
    id: 'pp-hoodie',
    name: 'PopPick Hoodie',
    brand: 'Brand A',
    image: '/img/hoodie.jpg',
    price: 59000,
    tags: ['한정'],
    popupStoreId: 'store-cool-run',
  },
  {
    id: 'pp-tumbler',
    name: 'Logo Tumbler',
    brand: 'Brand A',
    image: '/img/tumbler.jpg',
    price: 29000,
    tags: ['MD'],
    popupStoreId: 'store-cool-run',
  },
  {
    id: 'pp-cookie',
    name: 'Cookie Box',
    brand: 'Brand B',
    image: '/img/cookie.jpg',
    price: 12000,
    tags: ['디저트'],
    popupStoreId: 'store-artisan-bakery',
  },
];

export async function GET() {
  return NextResponse.json(products);
}