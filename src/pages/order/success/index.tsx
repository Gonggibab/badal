import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

import {
  cartItemsAtom,
  isUserOrderAtom,
  orderAdrsAtom,
  orderItemsAtom,
} from "common/recoil/atom";
import { OrderType } from "common/types/order";
import Loader from "components/Loader/Loader";
import tossPayment from "common/lib/tossPayment";
import sendMessage from "common/utils/sendMessage";

export default function Success() {
  const { data } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderAdrs = useRecoilValue(orderAdrsAtom);
  const isUserOrder = useRecoilValue(isUserOrderAtom);
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);

  const secretKey = process.env.NEXT_PUBLIC_PAYMENTS_SECRET!;
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const authKey = btoa(secretKey + ":");

  // 서버로 결제 승인 요청 보내기
  useEffect(() => {
    if (isUserOrder && !data) return;

    if (
      !orderId ||
      !paymentKey ||
      !amount ||
      !authKey ||
      !orderAdrs ||
      !orderItems
    )
      return;

    const confirmOrder = async () => {
      try {
        const confirmData = await tossPayment.approveRequest(
          paymentKey,
          amount,
          orderId,
          authKey
        );

        const orderRes = await axios.post("/api/order", {
          orderId: confirmData.orderId,
          paymentKey: confirmData.paymentKey,
          title: `${orderItems[0].title} ${
            orderItems.length - 1 > 0 ? `외 ${orderItems.length - 1}개` : ""
          }`,
          price: orderItems.reduce((acc, item) => acc + item.price, 0),
          image: orderItems[0].image,
          userId: data?.user?.id,
          address: orderAdrs,
          items: orderItems,
        });
        const order: OrderType = orderRes.data.data;

        // 주문 완료 문자 발송
        sendMessage(
          order.address.contact,
          order.title,
          String(order.price),
          order.orderId
        );

        // 주문 완료된 카트 아이템들 삭제
        await Promise.all(
          Array.from(orderItems).map(
            (item) => item.id && axios.delete(`/api/user/cart/item/${item.id}`)
          )
        );
        setCartItems([]);
        setOrderItems(null);

        router.push(`/order/confirmation/${order.id}`);
      } catch (error) {
        console.log(
          "토스 결제 승인 및 주문 저장 과정에서 에러가 발생했습니다. " + error
        );
      }
    };

    confirmOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    amount,
    authKey,
    data,
    isUserOrder,
    orderAdrs,
    orderId,
    orderItems,
    paymentKey,
  ]);

  return <Loader isLoading={true} />;
}
