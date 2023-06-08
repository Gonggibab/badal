"use client";

import ProductCard from "common/components/Product/ProductCard";

export default function Product() {
  const renderPosts = testProductCardData.map((data) => {
    return (
      <ProductCard
        key={data.id}
        id={data.id}
        image={data.image}
        title={data.title}
        price={data.price}
      />
    );
  });

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
            {renderPosts}
          </div>
        </div>
      </section>
    </main>
  );
}

const testProductCardData = [
  {
    id: "1",
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "레시틴 콩크림",
    price: 38000,
  },
];
