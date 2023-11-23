import axios from "axios";
import assert from "assert";

import { Restaurant } from "../../types/user";
import { SearchObj } from "../../types/others";
import { Definer } from "../lib/Definer";
import { Product } from "types/product";

class RestaurantApiService {
  private readonly path: string;

  constructor() {
    this.path = "http://localhost:3003";
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
      console.log(`ERR::: getTopRestaurants ${err.message}`);
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
      console.log(`ERR::: getRestaurants ${err.message}`);
      throw err;
    }
  }

  async getRestaurants(data: SearchObj) {
    try {
      const url = `/brands?order=${data.order}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const restaurants: Restaurant[] = result.data.data;
      return restaurants;
    } catch (err: any) {
      console.log(`ERR::: getRestaurants ${err.message}`);
      throw err;
    }
  }

  async getChosenRestaurant(id: string) {
    try {
      const url = `/brands/${id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const restaurant: Restaurant = result.data.data;
      return restaurant;
    } catch (err: any) {
      console.log(`ERR::: getChosenRestaurant ${err.message}`);
      throw err;
    }
  }
}

export default RestaurantApiService;
