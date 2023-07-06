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
  const {
    query: { userId },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        let data;
        if (userId) {
          data = await prisma.review.findMany({
            where: { userId: userId as string },
            orderBy: {
              createdAt: "desc",
            },
            include: {
              product: true,
            },
          });
        } else {
          data = await prisma.review.findMany({
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          });
        }

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(
          "리뷰 주문 정보를 불러오는 중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }
      break;

    // case "POST":
    //   try {
    //     const data = await prisma.order.create({
    //       data: {
    //         orderId: req.body.orderId,
    //       },
    //     });

    //     res.status(200).json({ success: true, data: data });
    //   } catch (error) {
    //     console.log("주문 정보 저장중 에러가 발생했습니다. " + error);
    //     res.status(500).json({ success: false, error: error });
    //   }
    //   break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
