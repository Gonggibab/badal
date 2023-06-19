export type CartType = {
  id: string;
  items: CartItemType[];
};

export type CartItemType = {
  id: string;
  productId: string;
  image?: string;
  title: string;
  price: number;
  quantity: number;
};

export type ShippingInfoType = {
  id: string;
  idDefault: boolean;
  name: string;
  contact: string;
  postcode: string;
  address: string;
  detailAddress: string;
  memo: string;
};

export type OrderItemType = {
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

export type AddressType = {
  id: string;
  idDefault: boolean;
  postcode: string;
  address: string;
  detailAddress: string;
  name: string;
  contact: string;
  memo: string;
};
