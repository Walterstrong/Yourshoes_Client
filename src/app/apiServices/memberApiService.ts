import axios from "axios";
import assert from "assert";
import { http://localhost:3003 } from "../lib/config";
import { Definer } from "../lib/Definer";
import { Member, MemberUpdateData } from "../../types/user";
import { MemberLiken } from "../../types/others";

class MemberApiService {
  private readonly path: string;

  constructor() {
    this.path = http://localhost:3003;
    // bu yerda url pathi hosil qilib olinayabdi
  }

  public async loginRequest(login_data: any) {
    try {
      const result = await axios.post(this.path + "/login", login_data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERR::: loginRequest ${err.message}`);
      throw err;
    }
  }

  public async signupRequest(signup_data: any) {
    try {
      const result = await axios.post(this.path + "/signup", signup_data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      console.log(member);
      return member;
    } catch (err: any) {
      if (err.response?.status === 400) {
        // Handle the specific error for duplicate mb_nick
        console.log(`ERR::: signupRequest: ${err.response?.data?.message}`);
        throw new Error(err.response?.data?.message);
      } else {
        console.log(`ERR::: signupRequest ${err.message}`);
        throw err;
      }
    }
  }

  public async logOutRequest() {
    try {
      const result = await axios.get(this.path + "/logout", {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const logout_result = result.data.state;

      return logout_result == "success";
    } catch (err: any) {
      console.log(`ERR::: logOutRequest ${err.message}`);
      throw err;
    }
  }

  public async memberLikeTarget(data: any) {
    try {
      const url = "/member-liken";
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);
      const like_result: MemberLiken = result.data.data;
      return like_result;
    } catch (err: any) {
      console.log(`ERR::: memberLikeTarget ${err.message}`);
      throw err;
    }
  }

  public async getChosenMember(id: string) {
    try {
      const url = `/member/${id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);

      const member: Member = result.data.data;
      return member;
    } catch (err: any) {
      console.log(`ERR::: getChosenMember ${err.message}`);
      throw err;
    }
  }

  public async updateMemberData(data: MemberUpdateData) {
    try {
      let formData = new FormData();
      formData.append("mb_nick", data.mb_nick || "");
      formData.append("mb_phone", data.mb_phone || "");
      formData.append("mb_address", data.mb_address || "");
      formData.append("mb_description", data.mb_description || "");
      formData.append("mb_image", data.mb_image || "");

      const result = await axios(`${this.path}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR::: updateMemberData ,${err.message}`);
      throw err;
    }
  }
}

export default MemberApiService;
