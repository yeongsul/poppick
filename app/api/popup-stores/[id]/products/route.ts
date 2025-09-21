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
  {
    id: 'pp-croissant',
    name: 'Artisan Croissant',
    brand: 'Brand B',
    image: '/img/croissant.jpg',
    price: 8000,
    tags: ['베이커리'],
    popupStoreId: 'store-artisan-bakery',
  },
  {
    id: 'pp-eco-bag',
    name: 'Eco Friendly Bag',
    brand: 'Green Tech',
    image: '/img/eco-bag.jpg',
    price: 25000,
    tags: ['친환경'],
    popupStoreId: 'store-green-tech',
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const storeProducts = products.filter(p => p.popupStoreId === params.id);
  return NextResponse.json(storeProducts);
}