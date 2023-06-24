import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import { OrderType } from "common/types/order";
import { PaymentDataType } from "common/types/tosspayments";
import PurchaseItem from "components/Order/PurchaseItem";
import Loader from "components/Loader/Loader";
import isoTimeToKRdate from "common/utils/isoTimeToKRdate";

export default function Confirmation() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [payment, setPayment] = useState<PaymentDataType | null>(null);

  const secretKey = process.env.NEXT_PUBLIC_PAYMENTS_SECRET!;
  const authKey = btoa(secretKey + ":");

  // 주문 정보 불러오기
  useEffect(() => {
    if (!router.query.orderId || !authKey) return;

    const getOrderConfirmData = async () => {
      try {
        // 주문 정보 불러오기
        const { data } = await axios.get(`/api/order/${router.query.orderId}`);
        const order: OrderType = data.data;
        setOrder(order);

        // 결제 정보 불러오기
        const paymentRes = await axios.get(
          `https://api.tosspayments.com/v1/payments/${order.paymentKey}`,
          {
            headers: {
              Authorization: `Basic ${authKey}`,
            },
          }
        );
        setPayment(paymentRes.data);
      } catch (error) {
        console.log(
          "주문 데이터를 불러오는 도중 에러가 발생했습니다. " + error
        );
      }
    };

    getOrderConfirmData();
  }, [authKey, router.query]);

  return (
    <main className="px-4 py-6 flex flex-col items-center justify-start sm:px-6 sm:py-16 lg:px-8">
      {order && payment && (
        <section className="w-full max-w-2xl">
          <p className="ml-1 text-xl font-semibold text-orange-500 tracking-tight">
            감사합니다
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">
            주문이 완료되었습니다.
          </h1>
          <p className="mt-2 ml-1 text-sm leading-7 text-gray-600 tracking-tight">
            빠른 시일내에 배송하도록 하겠습니다.
          </p>

          <p className="mt-8 mb-4 ml-1 text-base font-semibold leading-7 text-gray-900">
            주문 번호는 <span className="text-orange-500">{order.orderId}</span>{" "}
            입니다.
          </p>

          <div
            className="pt-6 pb-4 w-full grid grid-cols-1 border-y border-gray-300 
              md:grid-cols-3"
          >
            <figure
              className="col-span-2 w-full mb-4 pb-4 border-b border-gray-200 
                md:m-0 md:p-0 md:border-0"
            >
              <h1 className="font-semibold">배송 정보</h1>
              <p className="mt-4 text-sm text-gray-700 leading-6">
                {order.address.name} <br />
                {order.address.contact} <br />
                {`(${order.address.postcode}) ${order.address.address}`} <br />
                {order.address.detailAddress}
              </p>
            </figure>
            <figure className="col-span-1 w-full">
              <h1 className="font-semibold">결제 정보</h1>
              <p className="mt-4 text-sm text-gray-700 leading-6">
                결제방법: {payment.method} <br />
                승인일시: {isoTimeToKRdate(payment.approvedAt)} <br />
              </p>
            </figure>
          </div>

          <div className="w-full flex- flex-col">
            <ul role="list" className="w-full divide-y divide-gray-100">
              {order.orderItems?.map((item, idx) => {
                return <PurchaseItem key={idx} item={item} />;
              })}
            </ul>

            <div className="py-4 w-full flex justify-between items-center text-sm border-t border-gray-300">
              <p>총 금액</p>
              <p className="font-semibold">
                {order.price.toLocaleString("ko-KR")} 원
              </p>
            </div>

            <Link
              href={"/product"}
              className="mt-4 py-3 w-full flex justify-center items-center
              font-medium text-white bg-orange-500 rounded-md shadow
              hover:shadow-lg hover:translate-y-[1px] hover:bg-orange-400 transition-all"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </section>
      )}

      <Loader isLoading={!order || !payment} />
    </main>
  );
}
