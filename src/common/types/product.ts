import { ImageType } from "./image";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  images: ImageType[];
  detailImage?: ImageType;
  reviews: ReviewType[];
};

export type ProductDetailType = {
  id: string;
  title: string;
  price: number;
  images: string[];
  detailImage: string;
};

export type ReviewType = {
  id: string;
  userId: string;
  name: string;
  rating: number;
  images: string[];
  content: string;
  updatedAt: string;
};
