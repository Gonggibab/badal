import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { OrderType } from "common/types/order";
import { PaymentDataType } from "common/types/tosspayments";
import Modal, { ModalContentType } from "components/Modal";
import PurchaseItem from "components/Order/PurchaseItem";
import Loader from "components/Loader/Loader";
import tossPayment from "common/lib/tossPayment";
import isoTimeToKRdate from "common/utils/isoTimeToKRdate";
import OrderStatus from "components/Order/OrderStatus";

export default function OrderInformation() {
  const router = useRouter();
  const id = router.query.id;
  const [order, setOrder] = useState<OrderType | null>(null);
  const [payment, setPayment] = useState<PaymentDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContentType>({
    title: "",
    content: "",
    btnTitle: "",
    callback: () => {},
  });

  // 주문 정보 불러오기
  useEffect(() => {
    if (!router.isReady) return;

    const getOrderConfirmData = async () => {
      try {
        // 주문 정보 불러오기
        const { data } = await axios.get(`/api/order/${id}`);
        const order: OrderType = data.data;
        setOrder(order);

        // 결제 정보 불러오기
        const paymentData = await tossPayment.getPaymentInfo(order.paymentKey);
        setPayment(paymentData);
      } catch (error) {
        console.log(
          "주문 데이터를 불러오는 도중 에러가 발생했습니다. " + error
        );
      }
    };

    getOrderConfirmData();
  }, [id, router.isReady]);

  const cancelOrder = async () => {
    if (!order || !payment) return;

    setIsModalOpen(true);
    setModalContent({
      title: "주문 취소 요청",
      content: "정말로 해당 주문을 취소 하시겠습니까?",
      btnTitle: "주문 취소",
      callback: async () => {
        await tossPayment.cancelPayment(payment.paymentKey, "고객 변심");

        await axios.put(`/api/order/${order.id}`, {
          status: "CANCLED",
        });
      },
    });

    router.back();
  };

  // const reorder = async () => {
  //   if (!order) return;

  //   try {
  //     await axios.put(`/api/order/${order.id}`, { status: "READY" });
  //   } catch (error) {
  //     console.log("오류가 발생했습니다. " + error);
  //   }
  // };

  const returnRequest = async () => {
    if (!order) return;

    setIsModalOpen(true);
    setModalContent({
      title: "주문 환불 요청",
      content: "정말로 해당 주문에 대해 환불요청 하시겠습니까?",
      btnTitle: "환불 요청",
      callback: async () =>
        await axios.put(`/api/order/${order.id}`, {
          status: "RETURN_REQUESTED",
        }),
    });
  };

  const cancelReturnRequest = async () => {
    if (!order) return;

    setIsModalOpen(true);
    setModalContent({
      title: "환불 요청 취소",
      content: "해당 환불 요청을 취소 하시겠습니까?",
      btnTitle: "환불 취소",
      callback: async () =>
        await axios.put(`/api/order/${order.id}`, {
          status: "READY",
        }),
    });
  };

  return (
    <main className="px-4 py-6 flex flex-col items-center justify-start sm:px-6 sm:py-16 lg:px-8">
      {order && payment && (
        <section className="w-full max-w-2xl">
          <div className="mb-2 w-full flex justify-between items-end">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              주문 번호{" "}
              <span className="text-orange-500">#{order.orderId}</span>
            </h1>

            <p className="shrink-0 text-sm leading-7 text-gray-700">
              {isoTimeToKRdate(order.createdAt).split(" ")[0]}
            </p>
          </div>

          <OrderStatus order={order} payment={payment} />

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

            <div className="w-full flex flex-col gap-x-4">
              {order.status === "READY" && (
                <button
                  type="button"
                  className="mt-4 px-4 py-3 w-full flex justify-center items-center
                    font-medium rounded-md shadow transition-all
                    hover:shadow-lg hover:translate-y-[1px]"
                  onClick={cancelOrder}
                >
                  주문 취소
                </button>
              )}

              {/* {order.status === "CANCLED" && (
                <button
                  type="button"
                  className="mt-4 px-4 py-3 w-full flex justify-center items-center
                    font-medium rounded-md shadow transition-all
                    hover:shadow-lg hover:translate-y-[1px]"
                  onClick={reorder}
                >
                  재주문
                </button>
              )} */}

              {order.status === "IN_DELIVERY" ||
                (order.status === "DONE" && (
                  <button
                    type="button"
                    className="mt-4 px-4 py-3 w-full flex justify-center items-center
                      font-medium rounded-md shadow transition-all
                      hover:shadow-lg hover:translate-y-[1px]"
                    onClick={returnRequest}
                  >
                    반품 요청
                  </button>
                ))}

              {order.status === "RETURN_REQUESTED" && (
                <button
                  type="button"
                  className="mt-4 px-4 py-3 w-full flex justify-center items-center
                    font-medium rounded-md shadow transition-all
                    hover:shadow-lg hover:translate-y-[1px]"
                  onClick={cancelReturnRequest}
                >
                  반품 요청 취소
                </button>
              )}

              <button
                type="button"
                className="mt-4 py-3 w-full flex justify-center items-center
                font-medium text-white bg-orange-500 rounded-md shadow
                hover:shadow-lg hover:translate-y-[1px] hover:bg-orange-400 transition-all"
                onClick={() => router.back()}
              >
                돌아가기
              </button>
            </div>
          </div>
        </section>
      )}

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={modalContent.title}
        content={modalContent.content}
        btnTitle={modalContent.btnTitle}
        callback={modalContent.callback}
      />

      <Loader isLoading={!order || !payment} />
    </main>
  );
}
