import { MeLiked, MeViewed } from "./product";
import { Member } from "./user";

export interface CommentInput {
  art_content: string;
  art_image: string;
  bo_id: string;
}

export interface BoArticle {
  _id: string;
  comment_content: string;
  comment_status: string;
  comment_likes: string;
  comment_views: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
  me_viewed: MeViewed[];
  me_rated:MeRated[]:
}


