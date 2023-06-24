import { useEffect, useState } from "react";
import axios from "axios";

import { ProductType } from "common/types/product";
import ProductCard from "components/ProductCard";

export default function SecondSection() {
  const [productData, setProductData] = useState<ProductType[] | null>(null);

  useEffect(() => {
    // 전체 제품 데이터를 불러온다
    const getProductData = async () => {
      const { data } = await axios.get("/api/product");
      setProductData(data.data);
    };

    getProductData();
  }, []);

  return (
    <section className="p-8 relative w-full flex flex-col">
      <h3 className="mb-6 text-2xl font-medium tracking-tight text-gray-900">
        FO:CEL 대표 상품
      </h3>
      <div
        className="w-full grid grid-cols-1 gap-x-6 gap-y-10 
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        {productData &&
          productData.map((data) => (
            <ProductCard
              key={data.id}
              id={data.id}
              image={data.images && data.images[0]}
              title={data.title}
              price={data.price}
            />
          ))}
      </div>
    </section>
  );
}
