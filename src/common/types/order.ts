import { AddressType, OrderItemType } from "./user";

export type OrderType = {
  id: string;
  orderId: string;
  paymentKey: string;
  status: string;
  address: AddressType;
  orderItems: OrderItemType[];
  createdAt: string;
};
