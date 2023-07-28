import prisma from "common/lib/prisma";
import { OrderStatus } from "common/types/order";
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
    query: { userId, status, gte, lte },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const tStatus = status!?.length > 0 ? (status as string) : undefined;
        const startDate =
          gte && gte !== "null" ? new Date(gte as string) : undefined;
        const endDate =
          lte && lte !== "null" ? new Date(lte as string) : undefined;

        let orderStatus;
        orderStatus = tStatus ? (tStatus.split(",") as OrderStatus[]) : [];

        const data = await prisma.order.findMany({
          where: {
            userId: userId as string,
            status: { in: orderStatus },
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          include: {
            user: !userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

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
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
