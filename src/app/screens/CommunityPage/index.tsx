import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import "../../../css/community.css";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TargetArticles } from "./targetArticles";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { BoArticle, SearchArticlesObj } from "types/boArticle";
import { setTargetBoArticles } from "./slice";
import { retrieveTargetBoArticles } from "./selector";
import CommunityApiService from "app/apiServices/communityApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});

// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);
export function CommunityPage(props: any) {
  /** INITIALIZATIONSS **/
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const [value, setValue] = React.useState("1");
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    {
      bo_id: "all",
      page: 1,
      limit: 4,
    }
  );

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchArticlesObj, articlesRebuild]);

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    searchArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticlesObj.bo_id = "all";
        break;
      case "2":
        searchArticlesObj.bo_id = "useful";
        break;
      case "3":
        searchArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...searchArticlesObj });
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticlesObj({ ...searchArticlesObj });
  };

  return (
    <div className={"community_page"}>
      <div className={"community_frame"}>
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"column"} justifyContent={"space-between"}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <TabContext value={value}>
                <Box className={"article_tabs"}>
                  <Box className={"article_sorting"}>
                    <TabList
                      value={value}
                      onChange={handleChange}
                      orientation="vertical"
                      variant="scrollable"
                      // aria-label="Vertical tabs example"
                      style={{ borderColor: "white" }}
                      sx={{
                        // borderRight: 1,
                        // borderColor: "divider",
                        width: "98%",
                      }}
                    >
                      <Tab
                        className="sorting_box"
                        label="All articles"
                        value={"1"}
                      />
                      <Tab
                        className="sorting_box"
                        label="Usefules"
                        value={"2"}
                      />
                      <Tab
                        className="sorting_box"
                        label="Review for Product"
                        value={"3"}
                      />
                      <Tab
                        className="sorting_box"
                        label="Stories"
                        value={"4"}
                      />
                    </TabList>
                  </Box>
                </Box>
                <Stack className={"community_all_frame"} inputMode={"text"}>
                  <Box className={"article_main"}>
                    <TabPanel value={"1"}>
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                        test={"All articles"}
                      />
                    </TabPanel>
                    <TabPanel value={"2"}>
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                        test={"Celebrities"}
                      />
                    </TabPanel>
                    <TabPanel value={"3"}>
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                      />
                    </TabPanel>
                    <TabPanel value={"4"}>
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                      />
                    </TabPanel>
                  </Box>
                </Stack>
              </TabContext>{" "}
            </Stack>
            <Box className={"article_bott"}>
              <Pagination
                count={
                  searchArticlesObj.page >= 3 ? searchArticlesObj.page + 1 : 3
                }
                page={searchArticlesObj.page}
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
        </Container>
      </div>
    </div>
  );
}
