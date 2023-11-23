import { Box, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { BoArticle } from "types/boArticle";

import MemberApiService from "app/apiServices/memberApiService";
import assert from "assert";
import { Definer } from "app/lib/Definer";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "app/lib/sweetAlert";
import { verifiedMemberData } from "app/apiServices/verify";
import CommunityApiService from "app/apiServices/communityApiService";

export function TargetArticles(props: any) {
  const targetLikeProduct = async (e: any) => {
    const { setArticlesRebuild } = props;
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.auth_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const ArticleDelteHAndler = async (art_id: string) => {
    const { setArticlesRebuild } = props;
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      let confirmation = window.confirm("Are you sure to delete your article?");
      if (confirmation) {
        const communityService = new CommunityApiService();
        const like_result = await communityService.ArticleDelte(art_id);
        assert.ok(like_result, Definer.auth_err1);
        await sweetTopSmallSuccessAlert("success", 700, false);
        setArticlesRebuild(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="community_wrap">
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `http://localhost:3003/${article.art_image}`
          : "/community/default_article.svg";
        const mb_image_url = article?.member_data?.mb_image
          ? `http://localhost:3003/${article?.member_data?.mb_image}`
          : "/auth/default_user.svg";
        return (
          <Link
            className={"all_article_box"}
            sx={{ textDecoration: "none" }}
            href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
          >
            <Box
              className={"all_article_img"}
              sx={{ backgroundImage: `url(${art_image_url})` }}
              // onClick={(article) => chosenDishHandler(article)}
            ></Box>
            <Box className={"all_article_container"}>
              <Box
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                flexDirection={"row"}
                display={"flex"}
              >
                <img
                  src={mb_image_url}
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                  alt=""
                />
                <span
                  className={"all_article_author_user"}
                  style={{ marginLeft: "20px", backgroundSize: "cover" }}
                >
                  {article?.member_data.mb_nick}
                </span>
                <span
                  className={"all_article_title"}
                  style={{ marginLeft: "80px", backgroundSize: "cover" }}
                >
                  {article?.bo_id}
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <p className={"all_article_desc"}>"{article?.art_subject}"</p>
              </Box>
              <Box>
                <Box
                  className={"article_share"}
                  style={{ width: "100%", height: "auto" }}
                  sx={{ ml: "25px" }}
                >
                  <Box
                    className={"article_share_main"}
                    style={{
                      color: "black",
                      // marginLeft: "150px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <span>
                      {moment(article.createdAt).format("YY-MM-DD HH:mm")}
                    </span>
                    <Checkbox
                      style={{ color: "#85139e", marginLeft: "40px" }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article._id}
                      onClick={targetLikeProduct}
                      /*@ts-ignore*/
                      checked={
                        article?.me_liked && article?.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                    />
                    <span style={{ marginRight: "18px" }}>
                      {article?.art_likes}
                    </span>
                    <Checkbox
                      icon={<RemoveRedEyeIcon style={{ color: "#85139e" }} />}
                      checkedIcon={
                        <RemoveRedEyeIcon style={{ color: "red" }} />
                      }
                      checked={
                        article?.me_viewed && article?.me_viewed[0]?.my_view
                          ? true
                          : false
                      }
                    />
                    <span style={{ marginLeft: "18px", color: "#85139e" }}>
                      {article?.art_views}
                    </span>
                    {(verifiedMemberData?._id === article.member_data._id ||
                      verifiedMemberData?.mb_type === "ADMIN") && (
                      <DeleteIcon
                        style={{ color: "#85139e", marginLeft: "18px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          ArticleDelteHAndler(article?._id);
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
