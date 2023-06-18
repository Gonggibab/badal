import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { orderAdrsIdAtom } from "common/recoil/atom";
import { OrderConfirmType } from "common/types/order";
import { CartItemType, OrderItemType } from "common/types/user";
import Loader from "components/Loader/Loader";

export default function Success() {
  const { data } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderAdrsId = useRecoilValue(orderAdrsIdAtom);
  const [orderItems, setOrderItems] = useState<OrderItemType[] | null>(null);

  const secretKey = process.env.NEXT_PUBLIC_PAYMENTS_SECRET!;
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const authKey = btoa(secretKey + ":");

  // 서버로 결제 승인 요청 보내기
  useEffect(() => {
    if (
      !data?.user ||
      !authKey ||
      !paymentKey ||
      !orderId ||
      !authKey ||
      orderAdrsId === ""
    )
      return;

    const getOrderConfirmData = async () => {
      try {
        const confirm = await axios.post(
          "https://api.tosspayments.com/v1/payments/confirm",
          { paymentKey: paymentKey, amount: amount, orderId: orderId },
          {
            headers: {
              Authorization: `Basic ${authKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        const confirmData: OrderConfirmType = confirm.data;

        const cart = await axios.get(`/api/user/cart/${data?.user?.id}`);
        const cartitems: CartItemType[] = cart.data.data.items;

        const order = await axios.post("/api/order", {
          orderId: confirmData.orderId,
          paymentKey: confirmData.paymentKey,
          userId: data.user?.id!,
          addressId: orderAdrsId,
          items: cartitems,
        });
        const orderItems: OrderItemType[] = order.data.data.orderItems;
        setOrderItems(orderItems);

        // 주문 완료된 카트 아이템들 삭제
        await Promise.all(
          Array.from(cartitems).map((item) =>
            axios.delete(`/api/user/cart/item/${item.id}`)
          )
        );
        router.push(`/order/confirmation/${order.data.data.id}`);
      } catch (error) {
        console.log(
          "결제 승인 및 주문 저장과정에서 에러가 발생했습니다. " + error
        );
        // 결제 취소 로직 예정
      }
    };

    getOrderConfirmData();
  }, [data, amount, authKey, orderId, paymentKey, orderAdrsId, router]);

  return <Loader isLoading={true} />;
}
