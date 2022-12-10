import { MeLiked } from "./product";
import { Member } from "./user";

export interface BoArticle {
  _id: string;
  art_subject: string;
  art_content: string;
  art_image: string;
  bo_id: string;
  art_status: string;
  art_likes: string;
  art_views: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
}

export interface SearchArticlesObj {
  page: number;
  limit: number;
  bo_id: string;
  order?: string | null;
}
