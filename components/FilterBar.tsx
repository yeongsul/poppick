'use client';

type Props = {
  region: string;
  onRegionChange: (v: string) => void;
  runningOnly: boolean;
  onToggleRunning: () => void;
};

export default function FilterBar({
  region,
  onRegionChange,
  runningOnly,
  onToggleRunning,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm">
        <label className="text-gray-500">지역</label>
        <select
          className="border rounded-lg px-3 py-1.5"
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
        >
          <option value="전체">전체</option>
          <option value="서울">서울</option>
          <option value="수도권">수도권</option>
          <option value="부산">부산</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={runningOnly}
          onChange={onToggleRunning}
        />
        진행 중만
      </label>
    </div>
  );
}
