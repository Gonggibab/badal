import { ImageType } from "./image";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  images: ImageType[];
  detailImage?: ImageType;
  options: OptionType[];
  reviews: ReviewType[];
};

export type ProductDetailType = {
  id: string;
  title: string;
  price: number;
  images: string[];
  detailImage: string;
};

export type OptionType = {
  id: string;
  title: string;
  optionItems: OptionItemType[];
};

export type OptionItemType = {
  id: string;
  title: string;
  value: number;
  stock: number;
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
