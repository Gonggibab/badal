import prisma from "common/lib/prisma";
import { ImageType } from "common/types/image";
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
        const data = await prisma.review.findMany({
          where: { userId: userId as string },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            product: true,
            images: true,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(
          "리뷰 주문 정보를 불러오는 중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }
      break;

    case "POST":
      try {
        const product = await prisma.product.findUnique({
          where: {
            title: req.body.title,
          },
        });

        if (!product) throw new Error("잘못된 제품명입니다!");

        const images: ImageType[] = req.body.images;
        const data = await prisma.review.create({
          data: {
            userId: req.body.userId,
            productId: product.id,
            rating: req.body.rating,
            content: req.body.content,
            images: {
              create: images.map((image) => ({
                asset_id: image.asset_id,
                public_id: image.public_id,
                signature: image.signature,
                url: image.url,
                secure_url: image.secure_url,
                createdAt: new Date(image.createdAt),
              })),
            },
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("리뷰 저장중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
