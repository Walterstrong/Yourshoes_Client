import React, { ChangeEvent, useRef, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { serverApi } from "app/lib/config";
import { BoArticle } from "types/boArticle";
import assert from "assert";
import { Definer } from "app/lib/Definer";
import MemberApiService from "app/apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "app/lib/sweetAlert";

export function MemberPosts(props: any) {
  const {
    chosenMemberBoArticles,
    renderChosenArticleHandler,
    setArticlesRebuild,
  } = props;

  //** HANDLERS */
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.auth_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeHandler,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Box className={"post_content"}>
      {chosenMemberBoArticles.map((article: BoArticle) => {
        const image_path = article.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/default_article.svg";
        return (
          <Stack className={"all_article_box"} sx={{ cursor: "pointer" }}>
            <Box
              className={"all_article_img"}
              sx={{
                backgroundImage: `url(${image_path})`,
              }}
            ></Box>
            <Box className={"all_article_container"}>
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src={
                    article?.member_data?.mb_image
                      ? `${serverApi}/${article.member_data.mb_image}`
                      : "/auth/default_user.svg"
                  }
                  width={"35px"}
                  height={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className={"all_article_author_user"}>
                  {article?.member_data?.mb_nick}
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className={"all_article_title"}>{article?.bo_id}</span>
                <p className={"all_article_desc"}>{article?.art_subject}</p>
              </Box>
              <Box>
                <Box
                  className={"article_share"}
                  style={{ width: "100%", height: "auto" }}
                  sx={{ mb: "10px" }}
                >
                  <Box
                    className={"article_share_main"}
                    style={{
                      color: "#fff",
                      marginLeft: "150px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {moment(article?.createdAt).format("YY-MM-DD HH:mm")}
                    </span>
                    <Checkbox
                      sx={{ ml: "40px" }}
                      icon={<FavoriteBorder />}
                      id={article?._id}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      checked={
                        article?.me_liked && article?.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                      onClick={targetLikeHandler}
                    />

                    <span style={{ marginRight: "18px" }}>
                      {article?.art_likes}
                    </span>

                    <Checkbox
                      icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                      checkedIcon={
                        <RemoveRedEyeIcon style={{ color: "red" }} />
                      }
                      checked={
                        article?.me_viewed && article?.me_viewed[0]?.my_view
                          ? true
                          : false
                      }
                    />
                    <span style={{ marginLeft: "18px" }}>
                      {article?.art_views}
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}
