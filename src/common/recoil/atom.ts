import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "persistShippingInfo",
  storage: sessionStorage,
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
