export interface ListProps {
  title: string;
  type: 'buy' | 'sell';
  total: number;
  remain: number;
  location: string;
  due?: string;
  price?: number;
  date: string;
  like: number;
  comments: number;
  imageScr?: string;
}