export type Product = {
  name: string;
  extra: {
    type: string;
    location: string;
    subLocation: string;
    meetingTime: string;
  };
  quantity: number;
  buyQuantity: number;
  price: number;
  createdAt: string;
  bookmarks: number;
  replies: number;
  mainImages: {
    name: string;
    originalname: string;
    path: string;
  }[];
};

