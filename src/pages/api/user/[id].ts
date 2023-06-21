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
  const { id } = req.query;

  switch (method) {
    case "GET":
      // User 정보 가져오기
      try {
        const data = await prisma.user.findUnique({
          where: { id: id as string },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(
          "사용자 주소를 불러오는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }

      break;

    case "PUT":
      try {
        await prisma.user.update({
          where: {
            id: id as string,
          },
          data: {
            name: req.body.name,
          },
        });

        res.status(200).json({ success: true });
      } catch (error) {
        console.log(
          "유저 정보를 업데이트 하는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
