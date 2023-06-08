import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  image: string;
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
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          className="transition-all group-hover:opacity-75"
          src={image}
          alt="상품 이미지"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        ₩ {price.toLocaleString("ko-KR")}
      </p>
    </Link>
  );
}
