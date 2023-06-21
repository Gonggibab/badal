import { useEffect, useState } from "react";
import axios from "axios";

import { OrderStatus, OrderType } from "common/types/order";
import OrderCard from "./OrderCard";
import Loader from "components/Loader/Loader";

type OrderSectionProps = {
  userId: string | undefined;
};

export default function OrderSection({ userId }: OrderSectionProps) {
  const [orders, setOrders] = useState<OrderType[] | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (!userId) return;

      const orderRes = await axios.get(`/api/order?userId=${userId}`);
      const orders: OrderType[] = orderRes.data.data;
      setOrders(orders);
    };

    getUserData();
  }, [userId]);

  return (
    <section className="mt-4 relative w-full max-w-4xl">
      {orders && (
        <>
          <div className="my-4 w-full flex flex-col rounded-md shadow">
            <div className="mx-auto w-full max-w-3xl flex justify-between">
              <figure
                className="py-4 w-full flex flex-col justify-center items-center 
            text-sm font-semibold sm:py-10"
              >
                출고대기
                <p className="mt-4 text-base text-orange-500 sm:text-lg">
                  {
                    orders.filter((order) => order.status === OrderStatus.READY)
                      .length
                  }{" "}
                  <span className="text-xs text-gray-700">개</span>
                </p>
              </figure>
              <figure
                className="py-4 w-full flex flex-col justify-center items-center 
                text-sm font-semibold sm:py-10"
              >
                배송중
                <p className="mt-4 text-base text-orange-500 sm:text-lg">
                  {
                    orders.filter(
                      (order) => order.status === OrderStatus.IN_DELIVERY
                    ).length
                  }{" "}
                  <span className="text-xs text-gray-700">개</span>
                </p>
              </figure>
              <figure
                className="py-4 w-full flex flex-col justify-center items-center 
                text-sm font-semibold sm:py-10"
              >
                배송완료
                <p className="mt-4 text-base text-orange-500 sm:text-lg">
                  {
                    orders.filter((order) => order.status === OrderStatus.DONE)
                      .length
                  }{" "}
                  <span className="text-xs text-gray-700">개</span>
                </p>
              </figure>
              <figure
                className="py-4 w-full flex flex-col justify-center items-center 
                text-sm font-semibold sm:py-10"
              >
                취소/반품
                <p className="mt-4 text-base text-orange-500 sm:text-lg">
                  {
                    orders.filter(
                      (order) =>
                        order.status === OrderStatus.CANCLED ||
                        order.status === OrderStatus.REFUND_REQUESTED ||
                        order.status === OrderStatus.REFUND_COMPLETE
                    ).length
                  }{" "}
                  <span className="text-xs text-gray-700">개</span>
                </p>
              </figure>
            </div>
          </div>

          <div className="my-4 pt-4 w-full grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </>
      )}

      <Loader isLoading={!orders} />
    </section>
  );
}
