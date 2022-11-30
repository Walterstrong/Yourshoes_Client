import axios from "axios";
import assert from "assert";
import { serviceApi } from "../lib/config";
import { Restaurant } from "../../types/user";
import { SearchObj } from "../../types/others";
import { Definer } from "../lib/Definer";

class RestaurantApiService {
  private readonly path: string;

  constructor() {
    this.path = serviceApi;
  }

  async getTopRestaurants() {
    try {
      const url = "/restaurants?order=top&page=1&limit=4";
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result, Definer.general_err1);

      console.log("result:::", result.data.state);
      const top_restaurants: Restaurant[] = result.data.data;
      return top_restaurants;
    } catch (err: any) {
      console.log(`ERR::: getTopRestaurants ${err.message}`);
      throw err;
    }
  }

  async getRestaurants(data: SearchObj) {
    try {
      const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result, Definer.general_err1);

      console.log("result:::", result.data.state);
      const restaurants: Restaurant[] = result.data.data;
      return restaurants;
    } catch (err: any) {
      console.log(`ERR::: getRestaurants ${err.message}`);
      throw err;
    }
  }
}

export default RestaurantApiService;
