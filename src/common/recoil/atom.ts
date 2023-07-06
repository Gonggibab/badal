import { AddressType, CartItemType } from "common/types/user";
import { AtomEffect, atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "persistShippingInfo",
  storage: sessionStorage,
});

// NextJS Hydration 에러 해결 코드.
// 출처: https://stackoverflow.com/questions/68110629/nextjs-react-recoil-persist-values-in-local-storage-initial-page-load-in-wrong
const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
});

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

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
export const cartItemsAtom = atom<CartItemType[]>({
  key: "cartItems",
  default: [],
  effects_UNSTABLE: [persistAtomEffect],
});

// 주문 Atoms
export const isUserOrderAtom = atom<boolean>({
  key: "isUserOrder",
  default: false,
  effects_UNSTABLE: [persistAtomEffect],
});

export const orderAdrsAtom = atom<AddressType | null>({
  key: "orderAdrs",
  default: null,
  effects_UNSTABLE: [persistAtomEffect],
});

export type OrderItemsAtomType = {
  id?: string;
  productId: string;
  image?: string | null;
  title: string;
  price: number;
  quantity: number;
};

export const orderItemsAtom = atom<OrderItemsAtomType[] | null>({
  key: "orderItems",
  default: null,
  effects_UNSTABLE: [persistAtomEffect],
});

// 마이 페이지 Atoms
export enum Section {
  USER_INFO,
  ORDER_INFO,
  REVIEW_MNGT,
}

export const mySectionAtom = atom<Section>({
  key: "mySection",
  default: Section.USER_INFO,
  effects_UNSTABLE: [persistAtomEffect],
});
