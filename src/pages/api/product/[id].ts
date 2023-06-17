import prisma from "common/lib/prisma";
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
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
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
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
