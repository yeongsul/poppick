'use client';
import QRCode from 'qrcode.react';

export function TicketQR({ value }: { value: string }) {
  return <QRCode value={value} size={180} />;
}
