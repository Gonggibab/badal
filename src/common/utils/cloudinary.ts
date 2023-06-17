import axios from "axios";
import crypto from "crypto";

import { CloudinaryImageType } from "common/types/image";

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

const cloudinary = {
  upload: async (image: File): Promise<CloudinaryImageType> => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "focel_image");
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      formData
    );

    return data;
  },
  delete: async (public_id: string) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!;
    const timestamp = new Date().getTime();
    const signature = generateSHA1(
      generateSignature(public_id, apiSecret, timestamp)
    );
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        public_id: public_id,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      }
    );

    return data;
  },
};

export default cloudinary;
