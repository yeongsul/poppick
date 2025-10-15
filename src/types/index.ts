// ---- PopPick types ----

export type EventCategory = {
  slug: string;
  label: string;
  icon?: string;
  order?: number;
};

export type PopupStore = {
  id: string; // ex) "store-cool-run"
  name: string; // ex) "2025 THE COOL RUN"
  description: string;
  location: string;
  image: string;
  tags: string[];
  category:
    | '패션·뷰티'
    | '푸드·카페'
    | '리빙·테크'
    | '컬처(전시·체험)'
    | '팬덤·스포츠';
  startDate: string; // ISO string
  endDate: string; // ISO string
  operatingHours: {
    start: string; // ex) "10:00"
    end: string; // ex) "20:00"
  };
};

export type Product = {
  id: string; // ex) "pp-hoodie"
  name: string;
  brand: string;
  image: string; // public/ 경로 또는 URL
  price: number; // KRW
  tags: string[];
  popupStoreId: string; // 어느 팝업스토어의 상품인지
};

export type Timeslot = {
  id: string; // ex) "pp-hoodie-1010"
  productId: string; // ex) "pp-hoodie"
  start: string; // ISO string
  end: string; // ISO string
  remaining: number; // 잔여 수량
};

export type OrderItem = {
  productId: string;
  qty: number;
  priceEach: number; // 주문 시점 가격 스냅샷
};

export type Order = {
  id: string; // ex) "ord_ab12cd"
  createdAt: string; // ISO
  popupStoreId: string; // 어느 팝업스토어의 주문인지
  items: OrderItem[];
  totalPrice: number;
  pickupTime: string; // 픽업 시간 (ex: "14:30")
  pickupDate: string; // 픽업 날짜 (ISO string)
  status: 'paid' | 'fulfilled' | 'canceled';
};
