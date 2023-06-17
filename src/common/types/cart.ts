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
