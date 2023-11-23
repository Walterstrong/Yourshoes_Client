import axios from "axios";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { Comments } from "types/follow";
import { CommentsSearchObj } from "types/others";
import { http } from "app/lib/config";

class CommentApiService {
  private readonly path: string;

  constructor() {
    this.path = "http://178.16.142.232:3003";
  }

  public async createComment(data: any) {
    try {
      const result = await axios.post(this.path + "/comment/create", data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const comment: Comments = result.data.data;
      return comment;
    } catch (err: any) {
      console.log(`ERROR::: getChosenComment ,${err.message}`);
      throw err;
    }
  }

  async getTargetComments(data: CommentsSearchObj): Promise<Comments[]> {
    try {
      const url = `/comment/target?comment_ref_product_id=${data.comment_ref_product_id}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);

      const comments: Comments[] = result.data.data;
      return comments;
    } catch (err: any) {
      console.log(`ERR::: getTargetComments ${err.message}`);
      throw err;
    }
  }

  public async CommentArticleDelte(art_id: string) {
    try {
      let url = `/comment/target/delete/${art_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      return true;
    } catch (err: any) {
      console.log(`ERROR::: getChosenArticle ,${err.message}`);
      throw err;
    }
  }
}

export default CommentApiService;
