import { OrderType } from "./order";
import { ReviewType } from "./product";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  cart?: CartType;
  reviews?: ReviewType[];
  orders?: OrderType[];
  address?: AddressType[];
};

export type CartType = {
  id: string;
  items: CartItemType[];
};

export type CartItemType = {
  id?: string;
  productId: string;
  image?: string;
  title: string;
  price: number;
  quantity: number;
};

export type ShippingInfoType = {
  id: string;
  isDefault: boolean;
  name: string;
  contact: string;
  postcode: string;
  address: string;
  detailAddress: string;
  memo: string;
};

export type AddressType = {
  id?: string;
  isDefault?: boolean;
  postcode: string;
  address: string;
  detailAddress: string;
  name: string;
  contact: string;
  memo: string;
};
