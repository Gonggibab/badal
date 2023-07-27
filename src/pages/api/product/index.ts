import prisma from "common/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import { ImageType } from "common/types/image";

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
    case "GET":
      // 모든 Product 데이터 가져오기
      try {
        const data = await prisma.product.findMany({
          include: {
            images: true,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    case "POST":
      const images: ImageType[] = req.body.images;
      const detailImage: ImageType[] = req.body.detailImage;
      console.log(detailImage);

      try {
        // Product 데이터베이스에 추가하기
        const product = await prisma.product.create({
          data: {
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
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

        if (detailImage && detailImage.length > 0) {
          await prisma.detailImage.create({
            data: {
              productId: product.id,
              asset_id: detailImage[0].asset_id,
              public_id: detailImage[0].public_id,
              signature: detailImage[0].signature,
              url: detailImage[0].url,
              secure_url: detailImage[0].secure_url,
            },
          });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.log("제품 추가 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
