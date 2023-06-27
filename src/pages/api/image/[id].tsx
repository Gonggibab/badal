import prisma from "common/lib/prisma";
import cloudinary from "common/lib/cloudinary";
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
    case "DELETE":
      // Product 정보 삭제하기
      try {
        const image = await prisma.image.delete({
          where: { public_id: id as string },
        });

        // 해당 이미지 클라우드에서 삭제
        await cloudinary.delete(image.public_id);

        res.status(200).json({ success: true, data: image });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
