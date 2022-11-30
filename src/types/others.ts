export interface SearchObj {
  page: number;
  limit: number;
  order: string;
}

export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  restaurant_mb_id?: string;
  product_collection?: string;
}
