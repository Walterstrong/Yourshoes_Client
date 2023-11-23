import axios from "axios";
import assert from "assert";

import { Product } from "../../types/product";
import { Definer } from "../lib/Definer";
import { ProductSearchObj } from "../../types/others";
class ProductApiService {
  private readonly path: string;

  constructor() {
    this.path = "http://178.16.142.232:3003";
    // bu yerda url pathi hosil qilib olinayabdi
  }

  async getTargetProducts(data: ProductSearchObj) {
    try {
      const url = "/products";
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERR::: getTargetProducts ${err.message}`);
      throw err;
    }
  }

  async getChosenDish(dish_id: string) {
    try {
      const url = `/products/${dish_id}/`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", Definer.general_err1);
      console.log("state:::", result.data.state);
      const product: any = result.data?.data;
      return product;
    } catch (err: any) {
      console.log(`ERROR::: getChosenDish ${err.message}`);
    }
  }
}

export default ProductApiService;
