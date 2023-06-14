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
    case "GET":
      // 모든 Product 데이터 가져오기
      try {
        const data = await prisma.product.findMany();

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log("제품 정보를 불러오는 도중 에러가 발생했습니다. " + error);
        res.status(500).json({ success: false, error: error });
      }

      break;
    case "POST":
      // Product 데이터베이스에 추가하기
      try {
        const data = await prisma.product.create({
          data: {
            images: req.body.images,
            detailImage: req.body.detailImage,
            title: req.body.title,
            price: req.body.price,
            options: {
              createMany: {
                data: [
                  {
                    title: req.body.optionTitle,
                    // optionItems: {
                    //   createMany: {
                    //     data: [
                    //       {
                    //         title: req.body.optItemTitle,
                    //         value: req.body.optItemValue,
                    //         stock: req.body.optItemStock,
                    //       },
                    //     ],
                    //   },
                    // },
                  },
                ],
              },
            },
          },
        });

        res.status(200).json({ success: true, data: data });
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
