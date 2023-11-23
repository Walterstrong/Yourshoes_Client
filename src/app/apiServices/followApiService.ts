import axios from "axios";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { SearchObj } from "types/others";
import {
  BoArticle,
  SearchArticlesObj,
  SearchMemberArticlesObj,
} from "types/boArticle";
import { Follower, Following, FollowSearchObj } from "types/follow";
import { http } from "app/lib/config";

class FollowApiService {
  private readonly path: string;

  constructor() {
    this.path = "http://localhost:3003";
  }

  public async getMemberFollowers(data: FollowSearchObj): Promise<Follower[]> {
    try {
      const url = `/follow/followers?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const followers: Follower[] = result.data.data;
      return followers;
    } catch (err: any) {
      console.log(`ERR::: getMemberFollowers ,${err.message}`);
      throw err;
    }
  }

  public async getMemberFollowings(
    data: FollowSearchObj
  ): Promise<Following[]> {
    try {
      const url = `/follow/followings?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const followings: Following[] = result.data.data;
      return followings;
    } catch (err: any) {
      console.log(`ERR::: getMemberFollowings ,${err.message}`);
      throw err;
    }
  }

  public async subscribe(mb_id: string): Promise<boolean> {
    try {
      console.log("mb_id:", mb_id);
      const result = await axios.post(
        this.path + "/follow/subscribe",
        { mb_id: mb_id },
        {
          withCredentials: true,
        }
      );
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      return result.data.data === "subscribed";
    } catch (err: any) {
      console.log(`ERR::: subscribe ,${err.message}`);
      throw err;
    }
  }

  public async unsubscribe(mb_id: string): Promise<boolean> {
    try {
      console.log("mb_id:", mb_id);
      const result = await axios.post(
        this.path + "/follow/unsubscribe",
        { mb_id: mb_id },
        {
          withCredentials: true,
        }
      );
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      return result.data.data === "unsubscribed";
    } catch (err: any) {
      console.log(`ERR::: unsubscribe ,${err.message}`);
      throw err;
    }
  }
}

export default FollowApiService;
