import axios from "axios";
import prisma from "common/lib/prisma";
import crypto from "crypto";
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
      const cloudName = process.env.CLOUDINARY_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET!;

      const publicId = id as string;

      try {
        const generateSHA1 = (data: string) => {
          const hash = crypto.createHash("sha1");
          hash.update(data);
          return hash.digest("hex");
        };

        const generateSignature = (
          publicId: string,
          apiSecret: string,
          timestamp: number
        ) => {
          return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        };

        const timestamp = new Date().getTime();
        const signature = generateSHA1(
          generateSignature(publicId, apiSecret, timestamp)
        );

        // 해당 이미지 클라우드에서 삭제
        await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
          {
            public_id: publicId,
            signature: signature,
            api_key: apiKey,
            timestamp: timestamp,
          }
        );

        // DB 에서 삭제
        const image = await prisma.image.delete({
          where: { public_id: publicId },
        });

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
