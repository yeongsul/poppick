'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PopupStore } from '@/src/types';

type Props = { store: PopupStore };

export default function PopupStoreCard({ store }: Props) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}.${date.getDate()}`;
  };

  const isActive = () => {
    const now = new Date();
    const start = new Date(store.startDate);
    const end = new Date(store.endDate);
    return now >= start && now <= end;
  };

  return (
    <Link
      href={`/popup-store/${store.id}`}
      className="card p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative h-40 w-full mb-3">
        <Image
          src={store.image}
          alt={store.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover rounded-xl"
          unoptimized
        />
        {/* 운영 상태 표시 */}
        <div className="absolute top-2 right-2">
          <span
            className={`badge text-xs font-medium ${
              isActive()
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isActive() ? '운영중' : '준비중'}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{store.description}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>📍 {store.location}</span>
          <span>
            {formatDate(store.startDate)} - {formatDate(store.endDate)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {store.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="badge text-xs">
                {tag}
              </span>
            ))}
            {store.tags.length > 2 && (
              <span className="badge text-xs">+{store.tags.length - 2}</span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {store.operatingHours.start} - {store.operatingHours.end}
          </div>
        </div>
      </div>
    </Link>
  );
}
