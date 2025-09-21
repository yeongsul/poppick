'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const initMSW = async () => {
      if (process.env.NEXT_PUBLIC_MSW === 'enabled') {
        try {
          const { worker } = await import('@/mocks/browser');
          await worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
          });
        } catch (error) {
        }
      }
      setReady(true);
    };

    initMSW();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          {/* 로고 애니메이션 */}
          <div className="relative mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <span className="text-white font-black text-2xl">P</span>
            </div>
            {/* 펄스 효과 */}
            <div className="absolute inset-0 w-16 h-16 bg-primary rounded-2xl mx-auto animate-ping opacity-20"></div>
          </div>

          {/* 브랜드명 */}
          <h1 className="text-3xl font-black text-primary mb-2 tracking-tight">
            PopPick
          </h1>

          {/* 로딩 바 */}
          <div className="w-64 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full animate-pulse"></div>
          </div>

          {/* 서브 텍스트 */}
          <p className="text-gray-500 text-sm mt-4">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
