export type TModal = 'none' | 'login' | 'setNickName' | 'HeaderMenu';

export type TCategory = {
  id: number;
  name: string;
};

export type TResponseBookItemInfo = {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  mallType: string;
  stockStatus: string;
  mileage: number;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  customerReviewRank: number;
  bestRank: number;
  subInfo: object;
};

export type TOtherLink = '교보문고' | '예스24';
