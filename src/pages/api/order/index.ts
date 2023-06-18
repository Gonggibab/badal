import prisma from "common/lib/prisma";
import { CartItemType } from "common/types/user";
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
      try {
        const items: CartItemType[] = req.body.items;

        const data = await prisma.order.create({
          data: {
            orderId: req.body.orderId,
            paymentKey: req.body.paymentKey,
            userId: req.body.userId,
            addressId: req.body.addressId,
            orderItems: {
              create: items.map((item) => ({
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
              })),
            },
          },
          include: {
            orderItems: true,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("주문 정보 저장중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
