import { Prisma } from "@prisma/client";
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

  switch (method) {
    case "POST":
      // CartItem 데이터베이스에 추가하기
      try {
        // 카트 아이디 가져오기
        const cart = await prisma.cart.findUnique({
          where: { userId: req.body.userId },
        });

        if (cart) {
          const data = await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: req.body.productId,
              title: req.body.title,
              image: req.body.image,
              price: req.body.price,
              quantity: req.body.quantity,
            },
          });

          res.status(200).json({ success: true, data: data });
        } else {
          throw new Error("카트 아이디를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // 이미 존재하는 아이템을 카트에 추가하려는 경우 발생하는 에러 (Unique constraint)
          if (error.code === "P2002") {
            console.log("카트에 동일한 물품을 넣을 수 없습니다. " + error);
            res.status(400).json({ success: false, error: error });
          }
        }

        console.log("카트에 담기 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
