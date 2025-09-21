'use client';
import { TicketQR } from '@/components/TicketQR';

export default function TicketPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  return (
    <main className="space-y-6">
      <section className="card p-6 flex flex-col items-center gap-3">
        <h2 className="text-xl font-semibold">QR 티켓</h2>
        <TicketQR value={JSON.stringify({ orderId, v: 1 })} />
        <div className="text-sm text-gray-600">주문번호: {orderId}</div>
      </section>
    </main>
  );
}
