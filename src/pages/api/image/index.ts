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
    // case "GET":
    //   // Get data from your database

    //   res.status(200).json({ success: true });
    //   break;
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
              quantity: req.body.cartId,
            },
          });

          res.status(200).json({ success: true, data: data });
        } else {
          throw new Error("카트 아이디를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.log("카트에 담기 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
