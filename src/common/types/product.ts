import { ImageType } from "./image";
import { UserType } from "./user";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  stock: number;
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
  product: ProductType;
  productId: string;
  user: UserType;
  userId: string;
  rating: number;
  content: string;
  images: ImageType[];
  createdAt: string;
};
