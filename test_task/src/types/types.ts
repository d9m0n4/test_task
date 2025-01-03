export type ProductT = {
  id: number;
  name: string;
  price: string;
  description: string;
  image?: string;
  hasLike?: boolean;
};

export type FilterTypeT = 'all' | 'favorites';
