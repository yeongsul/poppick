'use client';

import { Timeslot } from '@/src/types';

type Props = {
  slots: Timeslot[];
  selectedId?: string;
  onSelect: (slotId: string) => void;
};

export default function SlotPicker({ slots, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((s) => {
        const t = new Date(s.start);
        const label = `${String(t.getHours()).padStart(2, '0')}:${String(
          t.getMinutes(),
        ).padStart(2, '0')}`;
        const disabled = s.remaining <= 0;
        const isSel = selectedId === s.id;
        return (
          <button
            key={s.id}
            disabled={disabled}
            onClick={() => onSelect(s.id)}
            className={[
              'px-3 py-2 rounded-xl border text-sm',
              disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isSel
                ? 'bg-primary text-white border-primary'
                : 'bg-white hover:bg-gray-50',
            ].join(' ')}
            aria-label={`${label} 슬롯 ${
              disabled ? '매진' : `잔여 ${s.remaining}`
            }`}
            title={disabled ? '매진' : `잔여 ${s.remaining}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
