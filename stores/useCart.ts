import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  productId: string;
  qty: number;
  priceEach: number;
  popupStoreId: string;
};

type CartState = {
  items: CartItem[];
  popupStoreId: string | null;
  add: (item: CartItem) => { success: boolean; message?: string };
  remove: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clear: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      popupStoreId: null,

      add: (item) => {
        const state = get();

        // 다른 팝업스토어의 상품이 이미 장바구니에 있는 경우
        if (state.popupStoreId && state.popupStoreId !== item.popupStoreId) {
          return {
            success: false,
            message:
              '다른 팝업스토어의 상품이 장바구니에 있습니다. 기존 상품을 제거하고 추가하시겠습니까?',
          };
        }

        // 같은 상품이 이미 있는지 확인
        const existingIndex = state.items.findIndex(
          (i) => i.productId === item.productId,
        );

        if (existingIndex >= 0) {
          // 기존 상품의 수량 업데이트
          const newItems = [...state.items];
          newItems[existingIndex].qty += item.qty;
          set({ items: newItems });
        } else {
          // 새 상품 추가
          set((s) => ({
            items: [...s.items, item],
            popupStoreId: item.popupStoreId,
          }));
        }

        return { success: true };
      },

      remove: (productId) =>
        set((s) => {
          const newItems = s.items.filter((i) => i.productId !== productId);
          return {
            items: newItems,
            popupStoreId: newItems.length === 0 ? null : s.popupStoreId,
          };
        }),

      updateQuantity: (productId, qty) =>
        set((s) => {
          if (qty <= 0) {
            get().remove(productId);
            return s;
          }

          const newItems = s.items.map((i) =>
            i.productId === productId ? { ...i, qty } : i,
          );
          return { ...s, items: newItems };
        }),

      clear: () => set({ items: [], popupStoreId: null }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.priceEach * item.qty,
          0,
        );
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.qty, 0);
      },

    }),
    {
      name: 'poppick-cart', // 로컬 스토리지 키 이름
      version: 1, // 데이터 구조 변경 시 버전 관리
      // 필요한 경우 마이그레이션 로직 추가 가능
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // v0에서 v1으로 마이그레이션
          return {
            ...persistedState,
            popupStoreId: null, // 새로 추가된 필드
          };
        }
        return persistedState;
      },
    },
  ),
);
