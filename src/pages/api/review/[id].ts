import prisma from "common/lib/prisma";
import { ImageType } from "common/types/image";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
      // Review 정보 가져오기
      try {
        const data = await prisma.review.findUnique({
          where: { id: id as string },
          include: {
            product: true,
            images: true,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    case "PUT":
      const images: ImageType[] = req.body.images;

      const product = await prisma.product.findUnique({
        where: {
          title: req.body.title,
        },
      });

      if (!product) throw new Error("잘못된 제품명입니다!");

      try {
        // 해당 Review 업데이트하기
        const data = await prisma.review.update({
          where: { id: id as string },
          data: {
            userId: req.body.userId,
            productId: product.id,
            rating: req.body.rating,
            content: req.body.content,
            updatedAt: new Date(),
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
        console.log("제품 추가 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    case "DELETE":
      // Review 정보 삭제하기
      try {
        const data = await prisma.review.delete({
          where: { id: id as string },
          include: {
            images: true,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("리뷰를 삭제하는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
