'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/src/types';

type Props = { item: Product };

export default function EventCard({ item }: Props) {
  return (
    <Link
      href={`/product/${item.id}`}
      className="card p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative h-40 w-full mb-3">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover rounded-xl"
          unoptimized
        />
      </div>
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-2">
          <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
          <div className="text-sm text-gray-500">{item.brand}</div>
        </div>
        <div className="text-primary font-bold text-lg">
          {item.price.toLocaleString()}원
        </div>
      </div>
      <div className="mt-3 flex gap-1 flex-wrap">
        {item.tags?.map((t) => (
          <span key={t} className="badge text-xs">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
