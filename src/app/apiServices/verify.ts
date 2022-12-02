import Cookie from "universal-cookie";
import MemberApiService from "./memberApiService";

const cookie = new Cookie();
let member_data: any = null;

if (cookie.get("access_token")) {
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
