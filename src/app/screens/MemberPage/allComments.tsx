import React from "react";
import { Container, Rating, Stack } from "@mui/material";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";

import assert from "assert";
import { Definer } from "app/lib/Definer";
import DeleteIcon from "@mui/icons-material/Delete";
import MemberApiService from "app/apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "app/lib/sweetAlert";
import { verifiedMemberData } from "app/apiServices/verify";
import CommentApiService from "app/apiServices/commentApiService";
import { Comments } from "types/follow";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
export function AllComments(props: any) {
  const { targetComments, setCommentsRebuild } = props;

  //** HANDLERS */

  const targetLikeComment = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "comment",
      });
      assert.ok(like_result, Definer.auth_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setCommentsRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeComment,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const CommentDelteHAndler = async (art_id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      let confirmation = window.confirm("Are you sure to delete your article?");
      if (confirmation) {
        const commentApiService = new CommentApiService();
        const comment_result = await commentApiService.CommentArticleDelte(
          art_id
        );
        assert.ok(comment_result, Definer.auth_err1);
        await sweetTopSmallSuccessAlert("success", 700, false);
        props.setCommentsRebuild(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="allcomments_page">
      <Container className="allcomments_page_container">
        <Stack className="accordion_comment">
          {targetComments?.map((comment: Comments) => {
            const image_member = comment?.member_data?.mb_image
              ? `http://localhost:3003/${comment?.member_data?.mb_image}`
              : "/auth/default_user.svg";
            return (
              <Stack className={"all_comment"}>
                <Stack>
                  <Stack className="comment">
                    <Stack className="comment_avatar">
                      <img
                        className="comment_avatar_image"
                        src={image_member}
                        alt=""
                      />
                    </Stack>
                    <Stack
                      className="comment_desc"
                      style={{ padding: "0 10px 5px", width: "auto" }}
                    >
                      <Stack
                        className="comment_author"
                        style={{ padding: "0 0 5px" }}
                      >
                        {comment?.member_data?.mb_nick}
                      </Stack>
                      <Stack className="metadata">
                        <div>
                          <Rating
                            value={comment?.product_rating}
                            // text={`${product.numReviews} reviews`}
                          />
                        </div>
                        <div className="days">
                          {moment(comment?.createdAt).format("YY-MM-DD HH:mm")}
                        </div>
                        <div>
                          <span
                            style={{
                              marginLeft: "150px",

                              fontSize: "16.25px",
                            }}
                          >
                            {comment?.comment_likes}
                          </span>
                          <Checkbox
                            sx={{ mt: "-11px" }}
                            icon={<ThumbUpOffAltIcon />}
                            checkedIcon={
                              <ThumbUpOffAltIcon style={{ color: "red" }} />
                            }
                            id={comment._id}
                            onClick={targetLikeComment}
                            //*@ts-ignore*/
                            checked={
                              comment?.me_liked &&
                              comment?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </div>
                        {(verifiedMemberData?._id === comment.member_data._id ||
                          verifiedMemberData?.mb_type === "ADMIN") && (
                          <DeleteIcon
                            style={{
                              color: "black",
                              marginLeft: "2px",
                              marginTop: "-2px",
                              cursor: "pointer",
                            }}
                            onClick={() => CommentDelteHAndler(comment?._id)}
                          />
                        )}
                      </Stack>
                      <Stack className="text">{comment?.comment_content}</Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}
