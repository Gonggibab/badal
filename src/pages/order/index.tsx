import { useEffect, useRef } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

export default function Order() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const selector = "#payment-widget";
  const clientKey = process.env.NEXT_PUBLIC_PAYMENTS_CLIENT!;

  const customerKey = "8-X2_Fv00mheTNL34hqNj"; // 이후에 고객 디비 아이디로 교체
  const price = 38000; // 결제 가격

  const getUserInfo = () => {};

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        price
      );
      paymentWidget.renderAgreement("#agreement");

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [clientKey]);

  const onPaymentClicked = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="flex flex-col items-center justify-between">
      <section className="relative w-screen h-screen ">
        주문 페이지
        <div id="payment-widget" />
        <div id="agreement" />
        <button onClick={onPaymentClicked}>결제하기</button>
      </section>
    </article>
  );
}
