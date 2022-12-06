import { Product } from "./product";
export interface Order {
  _id: string;
  order_total_amount: number;
  order_delivery_cost: number;
  order_status: string;
  mb_id: string;
  createdAt: Date;
  udatedAt: Date;
  //** from aggregations **/
  order_items: OrderItem[];
  product_data: Product[];
}

export interface OrderItem {
  _id: string;
  item_quantity: number;
  item_price: number;
  order_id: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
}
