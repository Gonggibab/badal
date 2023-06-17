import { atom } from "recoil";

const cartSizeAtom = atom<number>({
  key: "cartSize",
  default: 0,
});

export default cartSizeAtom;
