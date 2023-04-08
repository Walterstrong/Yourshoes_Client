import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
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
} from "./slice";
import { Member, Restaurant } from "../../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "./selector";
import { BoArticle, SearchMemberArticlesObj } from "types/boArticle";
import { sweetErrorHandling, sweetFailureProvider } from "app/lib/sweetAlert";
import CommunityApiService from "app/apiServices/communityApiService";
import MemberApiService from "app/apiServices/memberApiService";
import { verifiedMemberData } from "app/apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
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
export function VisitMyPage(props: any) {
  /** INITIALIZATIONSS **/

  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );

  const [memberArticlesSearchObj, setMemberArticlesSearchObj] =
    useState<SearchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 6 });
  const [value, setValue] = useState("1");
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

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
  }, [memberArticlesSearchObj, articlesRebuild, followRebuild]);
  /** HANDLERS **/
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
                    />
                    <div className={"order_user_icon_box"}>
                      {/* <img
                        src={
                          chosenMember?.mb_type === "RESTAURANT"
                            ? "/icons/restaurant.svg"
                            : "/icons/user_icon.svg"
                        }
                      /> */}
                    </div>
                  </div>
                  <span className={"order_user_name"}>
                    {chosenMember?.mb_nick}
                  </span>
                  {/* <span className={"order_user_prof"}>
                    {chosenMember?.mb_type}
                  </span> */}
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
                        <img src={"/icons/post.svg"} />
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
                        <img src={"/icons/followers.svg"} />
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
                        <img src={"/icons/following.svg"} />
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
                        <img src={"/icons/post.svg"} />
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
