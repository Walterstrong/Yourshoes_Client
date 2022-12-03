import { CookieSharp } from "@mui/icons-material";
import Cookies from "universal-cookie";
import MemberApiService from "./memberApiService";

const cookies = new Cookies();
let member_data: any = null;

if (cookies.get("access_token")) {
  const memberDataJson: any = localStorage.getItem("member_data")
    ? localStorage.getItem("member_data")
    : null;

  member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
} else {
  localStorage.removeItem("member_data");
}

console.log("== verify==");
console.log(member_data);

export const verifiedMemberData = member_data ? member_data : null;
