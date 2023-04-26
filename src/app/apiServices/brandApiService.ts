import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config";
import { Brand } from "../../types/user";
import { SearchObj } from "../../types/others";
import { Definer } from "../lib/Definer";
import { Product } from "types/product";

class BrandApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getNewProducts() {
    try {
      const url = "/brands?order=top&page=1&limit=4";
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const new_products: Product[] = result.data.data;
      return new_products;
    } catch (err: any) {
      console.log(`ERR::: getTopBrands ${err.message}`);
      throw err;
    }
  }

  async getBestProducts(data: SearchObj) {
    try {
      const url = `/brands?order=${data.order}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERR::: getBrands ${err.message}`);
      throw err;
    }
  }

  async getBrands(data: SearchObj) {
    try {
      const url = `/brands?order=${data.order}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const brands: Brand[] = result.data.data;
      return brands;
    } catch (err: any) {
      console.log(`ERR::: getBrands ${err.message}`);
      throw err;
    }
  }

  async getChosenBrand(id: string) {
    try {
      const url = `/brands/${id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const brand: Brand = result.data.data;
      return brand;
    } catch (err: any) {
      console.log(`ERR::: getChosenBrand ${err.message}`);
      throw err;
    }
  }
}

export default BrandApiService;
