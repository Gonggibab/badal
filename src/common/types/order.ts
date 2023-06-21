import { AddressType } from "./user";

export type OrderItemType = {
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

export enum OrderStatus {
  READY = "READY",
  IN_DELIVERY = "IN_DELIVERY",
  DONE = "DONE",
  CANCLED = "CANCLED",
  REFUND_REQUESTED = "REFUND_REQUESTED",
  REFUND_COMPLETE = "REFUND_COMPLETE",
}

export type OrderType = {
  id: string;
  orderId: string;
  paymentKey: string;
  status: OrderStatus;
  title: string;
  price: number;
  image: string;
  address: AddressType;
  orderItems: OrderItemType[];
  createdAt: string;
};
