import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import makeNaverSigniture from "common/utils/makeNaverSigniture";

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
  const { contactNum, title, price, orderId } = req.body;

  switch (method) {
    case "POST":
      try {
        const timestamp = String(new Date().getTime());
        const serviceId = process.env.NAVER_SENS_SERVICE_KEY!;
        const accessKey = process.env.NAVER_API_ACCESS!;
        const secretKey = process.env.NAVER_API_SECRET!;
        const signature = makeNaverSigniture(
          timestamp,
          accessKey,
          secretKey,
          serviceId
        );

        const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;

        const headers = {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key": accessKey,
          "x-ncp-apigw-signature-v2": signature,
        };

        const data = {
          type: "SMS",
          from: "01072282595",
          subject: "FO:CEL 주문완료",
          content: `FO:CEL 주문완료.\n제품명: ${title}\n결제금액: ${price} 원\n주문번호: \[${orderId}\]`,
          messages: [
            {
              to: contactNum.replace(/\D/g, ""),
            },
          ],
        };
        await axios.post(url, data, { headers });

        res.status(200).json({ success: true });
      } catch (error) {
        console.log("메세지를 보내는 중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
