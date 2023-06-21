import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "persistShippingInfo",
  storage: sessionStorage,
});

// 헤더 Atom
export const isHeaderTranspAtom = atom<boolean>({
  key: "isHeaderTransp",
  default: true,
});

// 모달, 알림 Atoms
export type NotificationAtomType = {
  isOpen: boolean;
  content: string;
  btnTitle?: string;
  callback?: () => void;
};

export const notificationAtom = atom<NotificationAtomType>({
  key: "notification",
  default: {
    isOpen: false,
    content: "",
  },
});

// 사용자 Atoms
export const cartSizeAtom = atom<number>({
  key: "cartSize",
  default: 0,
});

// 주문 Atoms
export const orderAdrsIdAtom = atom<string>({
  key: "orderAdrsId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export type OrderItemsAtomType = {
  id?: string;
  productId: string;
  image?: string | null;
  title: string;
  price: number;
  quantity: number;
};

export const orderItemsAtom = atom<OrderItemsAtomType[]>({
  key: "orderItems",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 마이 페이지 Atoms

export enum Section {
  USER_INFO,
  ORDER_INFO,
}

export const mySectionAtom = atom<Section>({
  key: "mySection",
  default: Section.USER_INFO,
  effects_UNSTABLE: [persistAtom],
});
