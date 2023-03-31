import ProductApiService from "../app/apiServices/productApiService";
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
  product_size?: string;
  product_color?: string;
  product_type?: string;
}
export interface ProductSearch {
  page: number;
  limit: number;
  order: string;
  restaurant_mb_id?: string;
  product_collection?: string;
  product_size?: string;
  product_color?: string;
  product_type?: string;
}

export interface CommentsSearchObj {
  page: number;
  limit: number;
  comment_ref_product_id?: string;
}

export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export interface ChatMessage {
  msg: string;
  mb_id: string;
  mb_nick: string;
  mb_image: string;
}
export interface ChatGreetMsg {
  text: string;
}

export interface ChatInforMsg {
  total: number;
}

export interface ProductNew {
  page: number;
  limit: number;
  order: string;
  product_collection?: string;
  product_size?: string;
  product_color?: string;
  product_type?: string;
}
