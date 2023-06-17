import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { OrderConfirmType } from "common/types/order";

export default function Success() {
  const searchParams = useSearchParams();

  const secretKey = process.env.NEXT_PUBLIC_PAYMENTS_SECRET!;
  const orderId = searchParams.get("orderId"); // 결제 키
  const paymentKey = searchParams.get("paymentKey"); // 결제 키
  const paymentType = searchParams.get("paymentType"); // NORMAL or BRANDPAY
  const amount = searchParams.get("amount"); // NORMAL or BRANDPAY
  const authKey = btoa(secretKey + ":");

  // 서버로 결제 승인 요청 보내기
  useEffect(() => {
    if (!authKey || !paymentKey || !orderId || !authKey) return;

    const getOrderConfirmData = async () => {
      const confirm: OrderConfirmType = await axios.post(
        "https://api.tosspayments.com/v1/payments/confirm",
        { paymentKey: paymentKey, amount: amount, orderId: orderId },
        {
          headers: {
            Authorization: `Basic ${authKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(confirm);
      return confirm;
    };
  }, [amount, authKey, orderId, paymentKey]);

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
    </div>
  );
}
