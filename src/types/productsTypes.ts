export type Product = {
  _id: number;
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

export type MyProducts = {
  _id: number;
  user_id: number;
  state: string;
  createdAt: string;
  updatedAt: string;
  products: {
    _id: number;
    name: string;
    extra: {
      type: string;
      location: string;
      subLocation: string;
      meetingTime: string;
    };
    price: number;
    quantity: number;
    seller_id: number;
    image: {
      path: string;
      name: string;
      originalname: string;
    };
  }[];
};

export type LikeProducts = {
  _id: number;
  product: {
    _id: number;
    name: string;
    extra: {
      type: string;
      subLocation: string;
      meetingTime: string;
    };
    quantity: number;
    buyQuantity: number;
    price: number;
    mainImages: {
      path: string;
      name: string;
      originalname: string;
    }[];
  };
};




