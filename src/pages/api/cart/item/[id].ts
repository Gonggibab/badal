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
    case "PUT":
      try {
        await prisma.cartItem.update({
          where: {
            id: id as string,
          },
          data: {
            quantity: req.body.quantity,
          },
        });

        res.status(200).json({ success: true });
      } catch (error) {
        console.log(
          "카트 아이템을 업데이트 하는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }
      break;

    case "DELETE":
      try {
        await prisma.cartItem.delete({
          where: {
            id: id as string,
          },
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(
          "카트 아이템을 삭제 하는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
