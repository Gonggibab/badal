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
    case "POST":
      // Address 정보와 저장하기
      try {
        const isNewDefault = req.body.isNewDefault;

        if (!req.body.userId) {
          const data = await prisma.address.create({
            data: {
              name: req.body.name,
              contact: req.body.contact,
              postcode: req.body.postcode,
              address: req.body.address,
              detailAddress: req.body.detailAddress,
              memo: req.body.memo,
            },
          });

          res.status(200).json({ success: true, data: data });
        } else {
          // 기존 기본 배송지 초기화
          if (isNewDefault) {
            const prevDefault = await prisma.address.findMany({
              where: {
                AND: [
                  {
                    userId: req.body.userId,
                  },
                  {
                    isDefault: true,
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
                isDefault: false,
              },
            });
          }

          const data = await prisma.address.create({
            data: {
              userId: req.body.userId,
              name: req.body.name,
              contact: req.body.contact,
              postcode: req.body.postcode,
              address: req.body.address,
              detailAddress: req.body.detailAddress,
              memo: req.body.memo,
              isDefault: isNewDefault,
            },
          });

          res.status(200).json({ success: true, data: data });
        }
      } catch (error) {
        console.log(
          "사용자 주소를 저장하는 도중 에러가 발생했습니다. " + error
        );
        res.status(500).json({ success: false, error: error });
      }

      break;

    case "PUT":
      // Address 수정하기
      try {
        console.log(req.body);
        const isDefault = req.body.isDefault;

        // 기존 기본 배송지 초기화
        if (isDefault) {
          const prevDefault = await prisma.address.findMany({
            where: {
              AND: [
                {
                  userId: req.body.userId,
                },
                {
                  isDefault: true,
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
              isDefault: false,
            },
          });
        }

        const data = await prisma.address.update({
          where: { id: req.body.id },
          data: {
            userId: req.body.userId,
            name: req.body.name,
            contact: req.body.contact,
            postcode: req.body.postcode,
            address: req.body.address,
            detailAddress: req.body.detailAddress,
            memo: req.body.memo,
            isDefault: isDefault,
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
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
