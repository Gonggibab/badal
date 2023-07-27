import axios from "axios";

import { ImageType } from "common/types/image";

const cloudinary = {
  upload: async (images: File[]): Promise<ImageType[]> => {
    const cloudImage: ImageType[] = [];
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "focel_image");
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        formData
      );

      const imageData = cloudinaryRes.data;

      cloudImage.push({
        asset_id: imageData.asset_id,
        public_id: imageData.public_id,
        signature: imageData.signature,
        url: imageData.url,
        secure_url: imageData.secure_url,
        createdAt: imageData.created_at,
      });
    });

    await Promise.all(uploadPromises);

    return cloudImage;
  },
};

export default cloudinary;
