'use client';

import { useMemo } from 'react';

type Props = {
  categories: string[];
  activeCat: string;
  onCatChange: (c: string) => void;
  keyword: string;
  onKeywordChange: (v: string) => void;
  sort: 'popular' | 'latest' | 'priceAsc' | 'priceDesc';
  onSortChange: (s: Props['sort']) => void;
  onlyOpen: boolean;
  onOnlyOpenChange: (v: boolean) => void;
};

export default function CatalogControls({
  categories,
  activeCat,
  onCatChange,
  keyword,
  onKeywordChange,
  sort,
  onSortChange,
  onlyOpen,
  onOnlyOpenChange,
}: Props) {
  const sorts = useMemo(
    () => [
      { value: 'popular', label: '인기순' },
      { value: 'latest', label: '최신순' },
      { value: 'priceAsc', label: '낮은 가격' },
      { value: 'priceDesc', label: '높은 가격' },
    ],
    [],
  );

  return (
    <section className="card p-4 space-y-4">
      {/* 검색바 */}
      <div className="relative">
        <input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="2023 THE COLOR RUN"
          className="w-full rounded-xl border px-4 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          aria-label="검색"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg border"
        >
          {/* search icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>
      </div>

      {/* 탭 (언더라인) */}
      <div className="flex gap-4 overflow-x-auto border-b">
        {categories.map((c) => {
          const active = c === activeCat;
          return (
            <button
              key={c}
              onClick={() => onCatChange(c)}
              className={`relative pb-2 text-sm whitespace-nowrap text-gray-600 hover:text-gray-900
                ${active ? 'text-gray-900' : ''}`}
            >
              {c}
              {active && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 정렬 + 진행중 */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as Props['sort'])}
            className="appearance-none border rounded-lg px-3 py-2 pr-8 text-sm"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            ▾
          </span>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300"
            checked={onlyOpen}
            onChange={(e) => onOnlyOpenChange(e.target.checked)}
          />
          진행 중
        </label>
      </div>
    </section>
  );
}
