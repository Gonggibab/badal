import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  data?: any;
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  const secretKey = process.env.PAYMENTS_SECRET!;
  const authKey = btoa(secretKey + ":");

  switch (method) {
    case "POST":
      // 토스 결제 승인 요청하기
      try {
        const confirm = await axios.post(
          "https://api.tosspayments.com/v1/payments/confirm",
          {
            paymentKey: req.body.paymentKey,
            amount: req.body.amount,
            orderId: req.body.orderId,
          },
          {
            headers: {
              Authorization: `Basic ${authKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        res.status(200).json({ success: true, data: confirm.data });
      } catch (error) {
        console.log("토스 결제 승인 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
