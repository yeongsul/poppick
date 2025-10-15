'use client';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = '당신의 마음에 드는 팝업스토어를 검색해보세요!',
}: Props) {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={submit} className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-accent"
        aria-label="검색"
      />
      {/* ✅ 테두리/배경 없는 아이콘 버튼 */}
      <button
        type="submit"
        aria-label="검색"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-0 h-5 w-5 flex items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </button>
    </form>
  );
}
