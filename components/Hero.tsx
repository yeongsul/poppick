'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getPopupStores } from '@/src/lib/api';
import Header from './Header';

export default function Hero() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: allStores = [] } = useQuery({
    queryKey: ['popup-stores'],
    queryFn: getPopupStores,
  });

  // 운영 중인 팝업스토어만 필터링
  const activeStores = allStores.filter((store) => {
    const now = new Date();
    const startDate = new Date(store.startDate);
    const endDate = new Date(store.endDate);
    return now >= startDate && now <= endDate;
  });

  const currentStore = activeStores[currentIndex];

  // 자동 슬라이드 (5초마다 전환)
  useEffect(() => {
    if (activeStores.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeStores.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeStores.length]);

  // 팝업스토어 상세 페이지로 이동
  const handleStoreClick = () => {
    if (currentStore) {
      router.push(`/popup-store/${currentStore.id}`);
    }
  };

  // 이전/다음 슬라이드
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + activeStores.length) % activeStores.length,
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % activeStores.length);
  };

  // 로딩 중이거나 데이터 없을 때 기본 UI
  if (!currentStore) {
    return (
      <section className="relative overflow-hidden">
        <Header />
        <div className="relative h-96 sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-primary to-purple-600 rounded-b-2xl">
          <div className="absolute inset-0 bg-black/40 rounded-b-2xl"></div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
                  팝업스토어를 검색해보세요!
                </h2>
                <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
                  특별한 순간을 만나는 팝업 경험을 찾아보세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      {/* 헤더 */}
      <Header />

      {/* 메인 팝업스토어 슬라이더 */}
      <div
        className="relative h-96 sm:h-[500px] lg:h-[600px] cursor-pointer"
        onClick={handleStoreClick}
      >
        {/* 슬라이드 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-2xl transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url('${currentStore.image}')`,
          }}
        >
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/40 rounded-b-2xl hover:bg-black/30 transition-colors"></div>
        </div>

        {/* 콘텐츠 */}
        <div className="relative z-10 h-full flex items-center px-8 sm:px-10 lg:px-12 xl:px-12">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              {/* 카테고리 배지 */}
              <div className="mb-4">
                <span className="px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-sm font-bold text-white">
                  {currentStore.category}
                </span>
              </div>

              {/* 팝업스토어 이름 */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-3 sm:mb-4 text-white">
                {currentStore.name}
              </h2>

              {/* 설명 */}
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-3 sm:mb-4 leading-relaxed">
                {currentStore.description}
              </p>

              {/* 위치 */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6">
                📍 {currentStore.location}
              </p>

              {/* 태그들 */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {currentStore.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs sm:text-sm font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 네비게이션 버튼 (2개 이상일 때만 표시) */}
        {activeStores.length > 1 && (
          <>
            {/* 이전 버튼 */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 text-white hover:text-white/70 transition-all duration-200 drop-shadow-2xl"
              aria-label="이전 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* 다음 버튼 */}
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 text-white hover:text-white/70 transition-all duration-200 drop-shadow-2xl"
              aria-label="다음 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* 인디케이터 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {activeStores.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-white'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`슬라이드 ${idx + 1}로 이동`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
