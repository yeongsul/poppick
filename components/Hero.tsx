'use client';

import Header from './Header';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 헤더 */}
      <Header />

      {/* 메인 팝업스토어 이미지 배경 */}
      <div
        className="relative h-96 sm:h-[500px] lg:h-[600px] bg-cover bg-center bg-no-repeat rounded-b-2xl"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&fit=crop&q=80&sat=-25')`,
        }}
      >
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/40 rounded-b-2xl"></div>

        {/* 콘텐츠 */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              {/* 메인 헤딩 */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
                <span className="text-cyan-400">
                  팝업스토어를 검색해보세요!
                </span>
              </h2>

              {/* 서브텍스트 */}
              <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
                특별한 순간을 만나는 팝업 경험을 찾아보세요
              </p>

              {/* 배지들 */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white">
                  한정 기간
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white">
                  독점
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white">
                  큐레이션
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
