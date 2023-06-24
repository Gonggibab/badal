import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "components/ProductCard";
import Loader from "components/Loader/Loader";
import { ProductType } from "common/types/product";

export default function Product() {
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
    <main className="w-screen h-full flex flex-col items-center justify-between">
      <section className="bg-white w-full h-full">
        <div
          className="mx-auto max-w-2xl px-4 py-16 pt-10 
          sm:px-6 sm:py-24 sm:pt-20 lg:max-w-7xl lg:px-8"
        >
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Product</h2>
          <h3 className="mb-10 text-md font-normal tracking-tight text-gray-700">
            우리의 제품을 만나보세요
          </h3>

          <div
            className="grid grid-cols-1 gap-x-6 gap-y-10 
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
        </div>

        <Loader isLoading={!productData} bgTransparent={true} />
      </section>
    </main>
  );
}
