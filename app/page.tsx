'use client';

import { useMemo, useState } from 'react';
import { usePopupStores } from '@/src/hooks/queries';
import { useCart } from '@/stores/useCart';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import CategoryTabs, { Category } from '@/components/CategoryTabs';
import FilterBar from '@/components/FilterBar';
import PopupStoreCard from '@/components/PopupStoreCard';
import AdCard from '@/components/AdCard';
import SkeletonCard from '@/components/SkeletonCard';

export default function HomePage() {
  const { data, isLoading, isError } = usePopupStores();
  const cart = useCart();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<Category>('all');
  const [region, setRegion] = useState('전체');
  const [runningOnly, setRunningOnly] = useState(false);

  const filtered = useMemo(() => {
    const list = data ?? [];
    let arr = list;

    // 카테고리 - 슬러그를 카테고리 라벨로 매핑
    if (cat !== 'all') {
      const categoryMap = {
        style: '패션',
        food: '푸드',
        'living-tech': '라이프스타일',
        culture: '콜라보 굿즈',
        'fandom-sports': '기타',
      };
      const categoryLabel = categoryMap[cat as keyof typeof categoryMap];
      if (categoryLabel) {
        arr = arr.filter((store) => store.category === categoryLabel);
      }
    }

    // 검색 (이름/설명/태그/위치)
    if (query.trim()) {
      const s = query.trim().toLowerCase();
      arr = arr.filter(
        (store) =>
          store.name.toLowerCase().includes(s) ||
          store.description.toLowerCase().includes(s) ||
          store.location.toLowerCase().includes(s) ||
          store.tags?.some((t) => t.toLowerCase().includes(s)),
      );
    }

    // 지역 필터링
    if (region !== '전체') {
      arr = arr.filter((store) => store.location.includes(region));
    }

    // 운영중인 팝업스토어만 필터링
    if (runningOnly) {
      const now = new Date();
      arr = arr.filter((store) => {
        const start = new Date(store.startDate);
        const end = new Date(store.endDate);
        return now >= start && now <= end;
      });
    }

    return arr;
  }, [data, cat, query, region, runningOnly]);

  return (
    <main className="space-y-4">
      {/* 1) 히어로 배너 */}
      <Hero />

      {/* 2) 검색 + 탭 */}
      <section className="card p-4 space-y-4">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryTabs value={cat} onChange={setCat} />
      </section>

      {/* 3) 필터 바 */}
      <section className="card p-4">
        <FilterBar
          region={region}
          onRegionChange={setRegion}
          runningOnly={runningOnly}
          onToggleRunning={() => setRunningOnly((v) => !v)}
        />
      </section>

      {/* 4) 팝업스토어 목록 섹션 */}
      <section className="space-y-4">
        <h3 className="px-1 text-lg font-semibold text-gray-800">
          지금 운영중인 팝업스토어
        </h3>

        {isError && (
          <div className="card p-6 text-red-600">
            목록을 불러오는 중 오류가 발생했습니다.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((store) => (
                <PopupStoreCard key={store.id} store={store} />
              ))}
        </div>

        {/* AD 카드 (중간 배치) */}
        <AdCard />
      </section>

      {/* 비어있을 때 */}
      {!isLoading && filtered.length === 0 && (
        <div className="card p-6 text-gray-600 text-center">
          조건에 맞는 팝업스토어가 없어요.
        </div>
      )}
    </main>
  );
}
