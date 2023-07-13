import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
/** OTHERS **/
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
import TViewer from "../../components/tuiEditor/TViewer";
import { MySettings } from "./mySettings";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
  setTargetComments,
} from "./slice";
import { Member } from "../../../types/user";

import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
  retrieveTargetComments,
} from "./selector";
import { BoArticle, SearchMemberArticlesObj } from "types/boArticle";
import { sweetErrorHandling, sweetFailureProvider } from "app/lib/sweetAlert";
import CommunityApiService from "app/apiServices/communityApiService";
import MemberApiService from "app/apiServices/memberApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { AllComments } from "./allComments";
import { Comments } from "types/follow";
import CommentApiService from "app/apiServices/commentApiService";
import { CommentsSearchObj } from "types/others";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
  setTargetComments: (data: Comments[]) => dispatch(setTargetComments(data)),
});

// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);

const targetCommentsRetriever = createSelector(
  retrieveTargetComments,
  (targetComments) => ({
    targetComments,
  })
);
export function VisitMyPage(props: any) {
  /** INITIALIZATIONSS **/

  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
    setTargetComments,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { targetComments } = useSelector(targetCommentsRetriever);

  const [memberArticlesSearchObj, setMemberArticlesSearchObj] =
    useState<SearchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 6 });
  const [value, setValue] = useState("1");
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [commentsRebuild, setCommentsRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);
  const [targetCommentsSearchObj, setTargetCommentSearchObj] =
    useState<CommentsSearchObj>({
      page: 1,
      limit: 25,
      comment_ref_product_id: "all",
    });
  useEffect(() => {
    if (!verifiedMemberData) {
      sweetFailureProvider("Please login first", true, true);
    }

    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();
    communityService
      .getMemberCommunityArticles(memberArticlesSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
    memberService
      .getChosenMember(verifiedMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberArticlesSearchObj, articlesRebuild, followRebuild]);
  /** HANDLERS **/

  useEffect(() => {
    const commentApiService = new CommentApiService();
    commentApiService
      .getTargetComments(targetCommentsSearchObj)
      .then((data) => setTargetComments(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsRebuild]);

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
    memberArticlesSearchObj.page = value;
    setMemberArticlesSearchObj({ ...memberArticlesSearchObj });
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order_user_img"}>
                    <img
                      src={verifiedMemberData?.mb_image}
                      className={"order_user_avatar"}
                      alt=""
                    />
                  </div>
                  <span className={"order_user_name"}>
                    {chosenMember?.mb_nick}
                  </span>
                </Box>
                <Box className={"user_media_box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
              </Box>

              <Box className={"my_page_menu"}>
                <TabList
                  onChange={handleChange}
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider", width: "98%" }}
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div
                        className={`menu_box ${value} `}
                        onClick={() => setValue("1")}
                      >
                        <img src={"/icons/post.svg"} alt="" />
                        <span>My articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div
                        className={`menu_box ${value} `}
                        onClick={() => setValue("2")}
                      >
                        <img src={"/icons/followers.svg"} alt="" />
                        <span>
                          Followers: {chosenMember?.mb_subscriber_cnt}
                        </span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div
                        className={`menu_box ${value} `}
                        onClick={() => setValue("3")}
                      >
                        <img src={"/icons/following.svg"} alt="" />
                        <span> Followings: {chosenMember?.mb_follow_cnt}</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"4"}
                    component={() => (
                      <div
                        className={`menu_box ${value} `}
                        onClick={() => setValue("4")}
                      >
                        <img src={"/icons/post.svg"} alt="" />
                        <span>Write article</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"6"}
                    component={() => (
                      <div
                        className={`menu_box ${value} `}
                        onClick={() => setValue("6")}
                      >
                        <SettingsIcon />
                        <span>My settings</span>
                      </div>
                    )}
                  />
                  {verifiedMemberData?.mb_type === "ADMIN" && (
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"7"}
                      component={() => (
                        <div
                          className={`menu_box ${value} `}
                          onClick={() => setValue("7")}
                        >
                          <SettingsIcon />
                          <span>All Comments</span>
                        </div>
                      )}
                    />
                  )}
                </TabList>
              </Box>
            </Stack>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className={"menu_name"}>My articles</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts
                      actions_enabled={true}
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        className={"bottom_box"}
                        style={{ marginLeft: "300px", marginTop: "50px" }}
                      >
                        <Pagination
                          count={
                            memberArticlesSearchObj.page >= 3
                              ? memberArticlesSearchObj.page + 1
                              : 3
                          }
                          page={memberArticlesSearchObj.page}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              style={{ color: "white" }}
                              color={"secondary"}
                            />
                          )}
                          onChange={handlePaginationChange}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers
                      actions_enabled={true}
                      mb_id={verifiedMemberData?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing
                      actions_enabled={true}
                      mb_id={verifiedMemberData?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Write article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor
                      setValue={setValue}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"5"}>
                  <Box className={"menu_name"}>Chosen article</Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>
                <TabPanel value={"7"}>
                  <Box className={"menu_name"}>All comments</Box>
                  <Box className={"menu_content"}>
                    <AllComments
                      targetComments={targetComments}
                      commentsRebuild={commentsRebuild}
                      setCommentsRebuild={setCommentsRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"6"}>
                  <Box className={"menu_name"}>Change my info</Box>
                  <Box className={"menu_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
