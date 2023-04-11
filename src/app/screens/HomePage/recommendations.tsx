import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Avatar, Box, Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { BoArticle, SearchArticlesObj } from "types/boArticle";
import { setBestBoArticles } from "./slice";
import { retrieveBestBoArticles } from "./selector";
import CommunityApiService from "app/apiServices/communityApiService";
import TViewer from "app/components/tuiEditor/TViewer";
import { useEffect, useRef, useState } from "react";
import { verifiedMemberData } from "app/apiServices/verify";
import MemberApiService from "app/apiServices/memberApiService";
import DeleteIcon from "@mui/icons-material/Delete";
SwiperCore.use([Autoplay, Navigation, Pagination]);
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBestBoArticles: (data: BoArticle[]) => dispatch(setBestBoArticles(data)),
});

// REDUX SELECTOR
const bestBoArticlesRetriever = createSelector(
  retrieveBestBoArticles,
  (bestBoArticles) => ({
    bestBoArticles,
  })
);

export function Recommendations() {
  const history = useHistory();
  const { setBestBoArticles } = actionDispatch(useDispatch());
  const { bestBoArticles } = useSelector(bestBoArticlesRetriever);
  const refs: any = useRef([]);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  useEffect(() => {
    const communityService = new CommunityApiService();

    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 10,
        order: "art_views",
      })
      .then((data) => setBestBoArticles(data))
      .catch((err) => console.log(err));
  }, [productRebuild]);

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.auth_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const ArticleDelteHAndler = async (art_id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      let confirmation = window.confirm("Are you sure to delete your article?");
      if (confirmation) {
        const communityService = new CommunityApiService();
        const like_result = await communityService.ArticleDelte(art_id);
        assert.ok(like_result, Definer.auth_err1);
        await sweetTopSmallSuccessAlert("success", 700, false);
      }
      setProductRebuild(new Date());
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  //** HANDLERS */
  const chosenArticleHandler = (id: string) => {
    history.push(`/community/single-article/${id}`);
  };

  return (
    <div className={"events_frame"}>
      <Container>
        <Stack className={"events_main"}>
          <Box className={"events_text"}>
            <span className={"category_title"}>Best Articles</span>
          </Box>
          <Box className={"prev_next_frame1"}>
            {/* <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-prev"}
            />
            <div className={"dot_frame_pagination swiper-pagination1"}></div>
            <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-next1"}
              style={{ transform: "rotate(-180deg)" }}
            /> */}
          </Box>
          <Swiper
            className={"events_info swiper-wrapper"}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next1",
              prevEl: ".swiper-button-prev1",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
          >
            {bestBoArticles?.map((article: BoArticle) => {
              const art_image_url = article?.art_image
                ? `${serverApi}/${article.art_image}`
                : "/community/default_article.svg";
              const mb_image_url = article?.member_data?.mb_image
                ? `${serverApi}/${article?.member_data?.mb_image}`
                : "/auth/default_user.svg";
              return (
                <SwiperSlide className={"events_info_frame"}>
                  {" "}
                  <Box
                    className={"all_article_img"}
                    sx={{ backgroundImage: `url(${art_image_url})` }}
                    key={article._id}
                    onClick={() => chosenArticleHandler(article._id)}
                    // onClick={(article) => chosenDishHandler(article)}
                  ></Box>
                  <Box className={"all_article_container"}>
                    <Box
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                      flexDirection={"row"}
                      display={"flex"}
                      key={article._id}
                      onClick={() => chosenArticleHandler(article._id)}
                    >
                      <img
                        src={mb_image_url}
                        width={"35px"}
                        style={{ borderRadius: "50%", backgroundSize: "cover" }}
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
                      <p className={"all_article_desc"}>
                        "{article?.art_subject}"
                      </p>
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
                            marginLeft: "150px",
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
                              article?.me_liked &&
                              article?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                          <span style={{ marginRight: "18px" }}>
                            {article?.art_likes}
                          </span>
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "#85139e" }} />
                            }
                            checkedIcon={
                              <RemoveRedEyeIcon style={{ color: "red" }} />
                            }
                            checked={
                              article?.me_viewed &&
                              article?.me_viewed[0]?.my_view
                                ? true
                                : false
                            }
                          />
                          <span
                            style={{ marginLeft: "18px", color: "#85139e" }}
                          >
                            {article?.art_views}
                          </span>
                          {(verifiedMemberData?._id ===
                            article.member_data._id ||
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
