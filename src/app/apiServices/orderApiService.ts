import assert from "assert";
import axios from "axios";

import { CartItem } from "../../types/others";
import { Definer } from "../lib/Definer";
import { AnyARecord } from "dns";

class OrderApiService {
  private readonly path: string;

  constructor() {
    this.path = "http://localhost:3003";
  }

  async createOrder(data: CartItem[]) {
    try {
      const url = "/orders/create";
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const order: any = result.data.data;
      console.log("order:", order);
      return true;
    } catch (err: any) {
      console.log(`createOrder, ERROR: ${err.message}`);
      throw err;
    }
  }

  async getMyOrders(order_status: string) {
    try {
      const url = `/orders?status=${order_status}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const orders: any = result.data.data;
      return orders;
    } catch (err: any) {
      console.log(`createOrder, ERROR: ${err.message}`);
      throw err;
    }
  }

  async updateOrderStatus(data: any) {
    try {
      const url = "/orders/edit";
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const order: any = result.data.data;
      return order;
    } catch (err: any) {
      console.log(`updateOrderStatus, ERROR: ${err.message}`);
      throw err;
    }
  }
}

export default OrderApiService;
