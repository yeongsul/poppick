import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// 앱 엔트리에서 개발 환경에서만 실행 예:
// if (process.env.NODE_ENV === 'development') worker.start();
