import React, { useEffect } from "react";
import { Avatar, Box, Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { BoArticle, SearchArticlesObj } from "types/boArticle";
import {
  setBestBoArticles,
  setTrendBoArticles,
  setNewsBoArticles,
} from "./slice";
import {
  retrieveBestBoArticles,
  retrieveTrendBoArticles,
  retrieveNewsBoArticles,
} from "./selector";
import CommunityApiService from "app/apiServices/communityApiService";
import TViewer from "app/components/tuiEditor/TViewer";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBestBoArticles: (data: BoArticle[]) => dispatch(setBestBoArticles(data)),
  setTrendBoArticles: (data: BoArticle[]) => dispatch(setTrendBoArticles(data)),
  setNewsBoArticles: (data: BoArticle[]) => dispatch(setNewsBoArticles(data)),
});

// REDUX SELECTOR
const bestBoArticlesRetriever = createSelector(
  retrieveBestBoArticles,
  (bestBoArticles) => ({
    bestBoArticles,
  })
);
const trendBoArticlesRetriever = createSelector(
  retrieveTrendBoArticles,
  (trendBoArticles) => ({
    trendBoArticles,
  })
);
const newsBoArticlesRetriever = createSelector(
  retrieveNewsBoArticles,
  (newsBoArticles) => ({
    newsBoArticles,
  })
);

export function Recommendations() {
  /** INITIALIZATIONSS **/
  //**//
  const history = useHistory();
  const { setBestBoArticles, setTrendBoArticles, setNewsBoArticles } =
    actionDispatch(useDispatch());
  const { bestBoArticles } = useSelector(bestBoArticlesRetriever);
  const { trendBoArticles } = useSelector(trendBoArticlesRetriever);
  const { newsBoArticles } = useSelector(newsBoArticlesRetriever);

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_views",
      })
      .then((data) => setBestBoArticles(data))
      .catch((err) => console.log(err));

    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_likes",
      })
      .then((data) => setTrendBoArticles(data))
      .catch((err) => console.log(err));

    communityService
      .getTargetArticles({
        bo_id: "celebrity",
        page: 1,
        limit: 2,
        order: "art_views",
      })
      .then((data) => setNewsBoArticles(data))
      .catch((err) => console.log(err));
  }, []);

  //** HANDLERS */
  const chosenArticleHandler = (id: string) => {
    history.push(`/community/single-article/${id}`);
    // const restaurantService = new RestaurantApiService();
    // restaurantService.getChosenRestaurant(`${id}`);
  };
  return (
    <div className={"top_article_frame"}>
      <Container
        maxWidth="lg"
        sx={{ mb: "50px", mt: "60px" }}
        style={{ position: "relative" }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className={"category_title"}>Tafsiya qilingan maqolalar</Box>
          <Stack className={"article_main"} flexDirection={"row"}>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Ko'p ko'rilgan</Box>
              {bestBoArticles?.map((article: BoArticle) => {
                const art_image_url = article?.art_image
                  ? `${serverApi}/${article?.art_image}`
                  : "/community/default_article.svg";
                return (
                  <Stack
                    className={"article_box"}
                    key={article._id}
                    onClick={() => chosenArticleHandler(article._id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      className={"article_img"}
                      sx={{
                        backgroundImage: `url(${art_image_url})`,
                      }}
                    ></Box>
                    <Box className={"article_info"}>
                      <Box className={"article_main_info"}>
                        <div className={"article_author"}>
                          <Avatar
                            alt="Author_photo"
                            src={
                              article?.member_data?.mb_image
                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                : "/auth/default_user.svg"
                            }
                            sx={{ width: "35px", height: "35px" }}
                          />
                          <span className={"author_username"}>
                            {article?.member_data?.mb_nick}
                          </span>
                        </div>
                        <span className={"article_title"}>
                          {article?.art_subject}
                        </span>
                        <p className={"article_desc"}></p>
                      </Box>
                    </Box>
                  </Stack>
                );
              })}
              <Box className={"article_category"} sx={{ marginTop: "10px" }}>
                Ko'p yoqtirilgan
              </Box>

              {trendBoArticles?.map((article: BoArticle) => {
                const art_image_url = article?.art_image
                  ? `${serverApi}/${article?.art_image}`
                  : "/community/default_article.svg";
                return (
                  <Stack
                    className={"article_box"}
                    key={article._id}
                    onClick={() => chosenArticleHandler(article._id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      className={"article_img"}
                      sx={{
                        backgroundImage: `url(${art_image_url})`,
                      }}
                    ></Box>
                    <Box className={"article_info"}>
                      <Box className={"article_main_info"}>
                        <div className={"article_author"}>
                          <Avatar
                            alt="Author_photo"
                            src={
                              article?.member_data?.mb_image
                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                : "/auth/default_user.svg"
                            }
                            sx={{ width: "35px", height: "35px" }}
                          />
                          <span className={"author_username"}>
                            {article?.member_data?.mb_nick}
                          </span>
                        </div>
                        <span className={"article_title"}>
                          {article?.art_subject}
                        </span>
                        <p className={"article_desc"}></p>
                      </Box>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>

            <Stack className={"article_container"}>
              <Box className={"article_category"}>Mashhurlar</Box>
              {newsBoArticles?.map((article: BoArticle) => {
                return (
                  <Box
                    className={"article_news"}
                    onClick={() => chosenArticleHandler(article._id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TViewer chosenSingleBoArticle={article} />
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
