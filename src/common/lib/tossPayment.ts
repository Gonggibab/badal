import axios from "axios";
import { OrderConfirmType, PaymentDataType } from "common/types/tosspayments";
import { nanoid } from "nanoid";

const secretKey = process.env.PAYMENTS_SECRET!;
const authKey = btoa(secretKey + ":");

const tossPayment = {
  approveRequest: async (
    paymentKey: string,
    amount: string,
    orderId: string
  ): Promise<OrderConfirmType> => {
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
    return confirm.data;
  },
  getPaymentInfo: async (paymentKey: string): Promise<PaymentDataType> => {
    const paymentRes = await axios.get(
      `https://api.tosspayments.com/v1/payments/${paymentKey}`,
      {
        headers: {
          Authorization: `Basic ${authKey}`,
        },
      }
    );
    return paymentRes.data;
  },
  cancelPayment: async (
    paymentKey: string,
    cancelReason: string
  ): Promise<PaymentDataType> => {
    const idempotencyKey = nanoid();

    const cancelRes = await axios.post(
      `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
      { cancelReason: cancelReason },
      {
        headers: {
          Authorization: `Basic ${authKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
      }
    );
    return cancelRes.data;
  },
};

export default tossPayment;
