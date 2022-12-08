import assert from "assert";
import axios from "axios";
import { serverApi } from "../lib/config";
import { CartItem } from "../../types/others";
import { Definer } from "../lib/Definer";

class OrderApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
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
}

export default OrderApiService;
