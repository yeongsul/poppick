'use client';

import { useEventCategories } from '@/src/hooks/queries';

export type Category =
  | 'all'
  | 'style'
  | 'food'
  | 'living-tech'
  | 'culture'
  | 'fandom-sports';

type Props = {
  /** 선택된 카테고리 slug (예: 'all' | 'fashion' | ...) */
  value: Category;
  /** 카테고리 변경 콜백 (slug 반환) */
  onChange: (slug: Category) => void;
};

export default function CategoryTabs({ value, onChange }: Props) {
  const { data: cats, isLoading } = useEventCategories();

  // UI용 목록: '전체' + 서버 카테고리
  const uiCats = [
    { slug: 'all', label: '전체' },
    ...(cats ?? []).map((c) => ({ slug: c.slug, label: c.label })),
  ];

  // 로딩 스켈레톤(간단)
  if (isLoading) {
    return (
      <>
        <div className="md:hidden overflow-x-auto no-scrollbar border-b">
          <div className="flex gap-5 min-w-max px-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-7 w-16 rounded bg-gray-100" />
            ))}
          </div>
        </div>
        <div className="hidden md:block border-b">
          <div className="grid grid-cols-6 gap-2 p-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 rounded bg-gray-100" />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* mobile: 가로 스크롤 */}
      <div className="md:hidden overflow-x-auto no-scrollbar border-b">
        <div className="flex gap-5 min-w-max px-1">
          {uiCats.map((c) => {
            const active = c.slug === value;
            return (
              <button
                key={c.slug}
                onClick={() => onChange(c.slug as Category)}
                className={`relative pb-2 text-sm font-semibold whitespace-nowrap ${
                  active ? 'text-ink' : 'text-gray-600'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {c.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-secondary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* md 이상: 균등 너비 그리드(여러 줄로 자동 래핑) */}
      <div className="hidden md:block border-b">
        <div className="grid grid-cols-6">
          {uiCats.map((c) => {
            const active = c.slug === value;
            return (
              <button
                key={c.slug}
                onClick={() => onChange(c.slug as Category)}
                className={`relative pb-2 text-sm font-semibold text-center ${
                  active ? 'text-ink' : 'text-gray-600'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {c.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-secondary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
