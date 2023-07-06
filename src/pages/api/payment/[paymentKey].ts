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
  const { paymentKey } = req.query;
  const secretKey = process.env.PAYMENTS_SECRET!;
  const authKey = btoa(secretKey + ":");

  switch (method) {
    case "GET":
      // 결제 정보 가져오기
      try {
        const paymentRes = await axios.get(
          `https://api.tosspayments.com/v1/payments/${paymentKey}`,
          {
            headers: {
              Authorization: `Basic ${authKey}`,
            },
          }
        );

        res.status(200).json({ success: true, data: paymentRes.data });
      } catch (error) {
        console.log(
          "토스 결제 정보를 불러오는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
