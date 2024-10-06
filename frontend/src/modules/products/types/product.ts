export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  available_quantity: number;
  attachments: string[];
  reviews: review[];
  // rating: number;
  seller: string;
}

export type review = {
  user: string;
  rating: number;
  comment: string;
};
