import prisma from "common/lib/prisma";
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
  const { title } = req.query;

  switch (method) {
    case "GET":
      console.log(title);
      // Product 같은 이름 찾아서 반환
      try {
        const data = await prisma.product.findUnique({
          where: { title: title as string },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
