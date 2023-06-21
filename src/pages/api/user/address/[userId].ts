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
  const { userId } = req.query;

  switch (method) {
    case "GET":
      // Address 정보 가져오기
      try {
        const data = await prisma.address.findMany({
          where: { userId: userId as string },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(
          "사용자 주소를 불러오는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }

      break;
    case "POST":
      // Address 정보와 저장하기
      try {
        const isNewDefault = req.body.isNewDefault;

        // 기존 기본 배송지 초기화
        if (isNewDefault) {
          const prevDefault = await prisma.address.findMany({
            where: {
              AND: [
                {
                  userId: userId as string,
                },
                {
                  idDefault: true,
                },
              ],
            },
          });

          await prisma.address.updateMany({
            where: {
              id: {
                in: prevDefault.map((adrs) => adrs.id),
              },
            },
            data: {
              idDefault: false,
            },
          });
        }

        const data = await prisma.address.create({
          data: {
            userId: userId as string,
            name: req.body.name,
            contact: req.body.contact,
            postcode: req.body.postcode,
            address: req.body.address,
            detailAddress: req.body.detailAddress,
            memo: req.body.memo,
            idDefault: isNewDefault,
          },
        });

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        console.log(
          "사용자 주소를 저장하는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
