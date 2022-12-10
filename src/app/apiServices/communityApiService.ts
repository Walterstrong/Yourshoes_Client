import { serverApi } from "app/lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { SearchObj } from "types/others";
import { BoArticle, SearchArticlesObj } from "types/boArticle";

class CommunityApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTargetArticles(data: SearchArticlesObj) {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERR::: getTargetArticles ,${err.message}`);
      throw err;
    }
  }
}

export default CommunityApiService;
