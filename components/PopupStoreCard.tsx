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

  const getOperatingStatus = () => {
    const now = new Date();
    const start = new Date(store.startDate);
    const end = new Date(store.endDate);

    // 운영 기간이 아닌 경우
    if (now < start) {
      return { status: '준비중', color: 'bg-gray-100 text-gray-600' };
    }
    if (now > end) {
      return { status: '종료', color: 'bg-red-100 text-red-600' };
    }

    // 운영 기간 내에서 시간 확인
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = store.operatingHours.start.split(':').map(Number);
    const [endHour, endMinute] = store.operatingHours.end.split(':').map(Number);
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (currentTime >= startTime && currentTime <= endTime) {
      return { status: '운영중', color: 'bg-green-100 text-green-800' };
    } else {
      return { status: '영업종료', color: 'bg-orange-100 text-orange-600' };
    }
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
          {(() => {
            const { status, color } = getOperatingStatus();
            return (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>
                {status}
              </span>
            );
          })()}
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
