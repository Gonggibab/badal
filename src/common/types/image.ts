export type CloudinaryImageType = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string; // jpg
  resource_type: string; //image
  created_at: string; // "2023-06-15T10:07:32Z"
  tags: string[];
  bytes: number;
  type: string; //upload
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
};

export type ImageType = {
  asset_id: string;
  public_id: string;
  signature: string;
  url: string;
  secure_url: string;
  createdAt: string; // "2023-06-15T10:07:32Z"
};
