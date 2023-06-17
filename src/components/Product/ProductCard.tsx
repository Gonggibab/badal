import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageType } from "common/types/image";
import NoImage from "components/NoImage";
import ImageIcon from "assets/icon/image.svg";

type ProductCardProps = {
  id: string;
  image?: ImageType;
  title: string;
  price: number;
};

export default function ProductCard({
  id,
  image,
  title,
  price,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div
        className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg 
          bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 animate-pulse"
      >
        <div className="flex items-center justify-center w-full h-full animate-pulse">
          <ImageIcon className="w-12 h-12 text-gray-100" />
        </div>

        {image ? (
          <Image
            className="object-cover object-center transition-all group-hover:opacity-75"
            src={image.secure_url}
            alt="상품 이미지"
            fill
            sizes="100vw 100vh"
            placeholder="blur"
            blurDataURL={image.secure_url}
          />
        ) : (
          <NoImage />
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {price.toLocaleString("ko-KR")} 원
      </p>
    </Link>
  );
}
