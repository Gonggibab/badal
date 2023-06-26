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
  const { id } = req.query;

  switch (method) {
    case "GET":
      // Order 정보 가져오기
      try {
        const data = await prisma.order.findUnique({
          where: { id: id as string },
          include: {
            address: true,
            orderItems: true,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    case "PUT":
      // Order 정보 수정하기
      try {
        const data = await prisma.order.update({
          where: {
            id: id as string,
          },
          data: {
            status: req.body.status,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
