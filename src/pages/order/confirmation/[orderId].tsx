import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { OrderItemType } from "common/types/user";
import OrderItem from "components/Order/OrderItem";

export default function Confirmation() {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);

  // 주문 정보 불러오기
  useEffect(() => {
    const getOrderConfirmData = async () => {
      try {
        console.log(router.query.orderId);
        // const order = await axios.get("/api/order", {
        //   orderId: orderId,
        // });
        // const orderItems: OrderItemType[] = order.data.data.orderItems;
        // setOrderItems(orderItems);
      } catch (error) {
        console.log(
          "결제 승인 및 주문 저장과정에서 에러가 발생했습니다. " + error
        );
      }
    };

    getOrderConfirmData();
  }, [router.query]);

  return (
    <article className="px-4 py-6 flex flex-col items-center justify-start sm:px-6 sm:py-16 lg:px-8">
      <div className="w-full max-w-4xl">
        <p className="ml-1 text-xl font-semibold text-orange-500 tracking-tight">
          감사합니다
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">
          주문이 완료되었습니다.
        </h1>
        <p className="mt-2 ml-1 text-sm leading-7 text-gray-600 tracking-tight">
          빠른 시일내에 배송하도록 하겠습니다.
        </p>

        <p className="mt-8 ml-1 text-base font-semibold leading-7 text-gray-900">
          주문 번호는 <span className="text-orange-500">230618976DA</span>{" "}
          입니다.
        </p>

        <div className="w-full">
          <ul role="list" className="w-full divide-y divide-gray-100">
            {orderItems?.map((item, idx) => {
              return (
                <OrderItem
                  key={idx}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}
