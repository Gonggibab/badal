import prisma from "common/lib/prisma";
import { ImageType } from "common/types/image";
import cloudinary from "common/utils/cloudinary";
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
    case "GET":
      // Product 정보 가져오기
      try {
        const data = await prisma.product.findUnique({
          where: { id: id as string },
          include: {
            images: true,
            detailImage: true,
            reviews: true,
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
      const detailImage: ImageType = req.body.detailImage;

      try {
        // 해당 Product 업데이트하기
        const product = await prisma.product.update({
          where: { id: id as string },
          data: {
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
          },
        });

        if (images && images.length > 0) {
          await prisma.image.createMany({
            data: images.map((image) => {
              return {
                productId: product.id,
                asset_id: image.asset_id,
                public_id: image.public_id,
                signature: image.signature,
                url: image.url,
                secure_url: image.secure_url,
                createdAt: new Date(image.createdAt),
              };
            }),
          });
        }

        if (detailImage) {
          await prisma.detailImage.create({
            data: {
              productId: product.id,
              asset_id: detailImage.asset_id,
              public_id: detailImage.public_id,
              signature: detailImage.signature,
              url: detailImage.url,
              secure_url: detailImage.secure_url,
              createdAt: new Date(detailImage.createdAt),
            },
          });
        }

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        console.log("제품 추가 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    case "DELETE":
      // Product 정보 삭제하기
      try {
        const product = await prisma.product.delete({
          where: { id: id as string },
          include: {
            images: true,
            detailImage: true,
          },
        });

        // 관련 이미지들 클라우드에서 삭제
        const deletePromises = [];
        if (product.images) {
          deletePromises.push(
            product.images.map(async (img) => {
              await cloudinary.delete(img.public_id);
            })
          );
        }
        if (product.detailImage) {
          deletePromises.push(
            await cloudinary.delete(product.detailImage.public_id)
          );
        }
        if (deletePromises.length > 0) await Promise.all(deletePromises);

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
