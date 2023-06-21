import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

import {
  cartSizeAtom,
  orderAdrsIdAtom,
  orderItemsAtom,
} from "common/recoil/atom";
import { OrderConfirmType } from "common/types/tosspayments";
import Loader from "components/Loader/Loader";

export default function Success() {
  const { data } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderAdrsId = useRecoilValue(orderAdrsIdAtom);
  const setCartSize = useSetRecoilState(cartSizeAtom);
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);

  const secretKey = process.env.NEXT_PUBLIC_PAYMENTS_SECRET!;
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const authKey = btoa(secretKey + ":");

  // 서버로 결제 승인 요청 보내기
  useEffect(() => {
    if (
      !data?.user ||
      !orderId ||
      !paymentKey ||
      !amount ||
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

        const order = await axios.post("/api/order", {
          orderId: confirmData.orderId,
          paymentKey: confirmData.paymentKey,
          title: `${orderItems[0].title} ${
            orderItems.length - 1 > 0 ? `외 ${orderItems.length - 1}개` : ""
          }`,
          price: orderItems.reduce((acc, item) => acc + item.price, 0),
          image: orderItems[0].image,
          userId: data.user?.id!,
          addressId: orderAdrsId,
          items: orderItems,
        });

        // 주문 완료된 카트 아이템들 삭제
        await Promise.all(
          Array.from(orderItems).map(
            (item) => item.id && axios.delete(`/api/user/cart/item/${item.id}`)
          )
        );
        setCartSize(0);
        setOrderItems([]);

        router.push(`/order/confirmation/${order.data.data.id}`);
      } catch (error) {
        console.log(
          "결제 승인 및 주문 저장과정에서 에러가 발생했습니다. " + error
        );
      }
    };

    getOrderConfirmData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, authKey, data, orderAdrsId, orderId, paymentKey]);

  return <Loader isLoading={true} />;
}
