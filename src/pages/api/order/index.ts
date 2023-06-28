import prisma from "common/lib/prisma";
import { AddressType, CartItemType } from "common/types/user";
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
          data = await prisma.order.findMany({
            where: { userId: userId as string },
            orderBy: {
              createdAt: "desc",
            },
          });
        } else {
          data = await prisma.order.findMany({
            include: {
              user: true,
            },
          });
        }

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(
          "회원 주문 정보를 불러오는 중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }
      break;

    case "POST":
      try {
        const address: AddressType = req.body.address;
        const items: CartItemType[] = req.body.items;

        const data = await prisma.order.create({
          data: {
            orderId: req.body.orderId,
            paymentKey: req.body.paymentKey,
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            userId: req.body.userId,
            address: {
              postcode: address.postcode,
              address: address.address,
              detailAddress: address.detailAddress,
              name: address.name,
              contact: address.contact,
              memo: address.memo,
            },
            orderItems: items.map((item) => ({
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
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
