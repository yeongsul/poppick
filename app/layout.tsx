import './globals.css';
import Providers from './providers';
import Link from 'next/link';

export const metadata = {
  title: 'PopPick',
  description: '팝업스토어 예약 & 사전주문',
  themeColor: '#E90064',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-4">
          {/* 내비게이션 헤더는 히어로에서 처리하므로 제거 */}
          {/* ✅ MSW 시작 후에만 children 렌더 */}
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
