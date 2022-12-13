import { Member } from "./user";

export interface MeFollowed {
  follow_id: string;
  subscriber_id: string;
  my_following: boolean;
}

export interface Follower {
  _id: string;
  follow_id: string;
  subscriber_id: string;
  createdAt: Date;
  updateAt: Date;
  subscriber_member_data: Member;
  me_followed: MeFollowed[] | null;
}

export interface Following {
  _id: string;
  follow_id: string;
  subscriber_id: string;
  createdAt: Date;
  updateAt: Date;
  follow_member_data: Member;
}

export interface FollowSearchObj {
  page: number;
  limit: number;
  mb_id: string;
}
