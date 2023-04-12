import { useState, useEffect, useRef } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import { useHistory } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetRestaurants } from "./slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { SearchObj } from "../../../types/others";
import { verifiedMemberData } from "app/apiServices/verify";

// REDUX SLICE
// bu yerda Restaurant[] nomli datani setTopRestaurantsga yuborilayabdi,
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispatch(setTargetRestaurants(data)),
});

// REDUX SELECTOR
const targetRestaurantsRetriever = createSelector(
  retrieveTargetRestaurants,
  (targetRestaurants) => ({
    targetRestaurants,
  })
);

export function AllRestaurants() {
  // ** INITIALIZATIONS *
  const history = useHistory();
  const { setTargetRestaurants } = actionDispatch(useDispatch());
  const { targetRestaurants } = useSelector(targetRestaurantsRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });
  const refs: any = useRef([]);

  useEffect(() => {
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getRestaurants(targetSearchObject)
      .then((data) => setTargetRestaurants(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject]);

  //** HANDLERS */
  const chosenRestaurantHandler = (id: string) => {
    history.push(`/shop/${id}`);
    // const restaurantService = new RestaurantApiService();
    // restaurantService.getChosenRestaurant(`${id}`);
  };

  const searchHandler = (category: string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({ ...targetSearchObject });
  };
  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject });
  };

  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: id,
        group_type: "member",
      });
      assert.ok(like_result, Definer.auth_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeTop,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="all_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          {/* <Box className={"fil_search_box"}>
            <Box className={"fil_box"} style={{ cursor: "pointer" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchHandler("mb_point")}
              >
                Best
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchHandler("mb_views")}
              >
                Common
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchHandler("mb_likes")}
              >
                Trend
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchHandler("createdAt")}
              >
                New
              </Button>
            </Box>
            <Box className={"search_big_box"}>
              <form className={"search_form"} action={""} method={""}>
                <input
                  type={"search"}
                  className={"searchInput"}
                  name={"resSearch"}
                  placeholder={"Searching"}
                />
                <Button
                  className={"button_search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                  Searching
                </Button>
              </form>
            </Box>
          </Box> */}
          <Box className="category_title">All Brands</Box>
          <Stack className={"all_res_box"}>
            {targetRestaurants.map((ele: Restaurant) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <Stack
                  onClick={() => chosenRestaurantHandler(ele._id)}
                  style={{
                    height: "300px",
                    width: "250px",
                    marginRight: "65px",
                    borderRadius: "15px",
                    marginBottom: "35px",
                    marginTop: "25px",
                    cursor: "pointer",
                    backgroundSize: "cover",
                  }}
                >
                  <Box>
                    <img
                      src={image_path}
                      alt=""
                      style={{
                        height: "300px",
                        width: "250px",
                        // marginRight: "35px",
                        borderRadius: "15px",
                        backgroundSize: "cover",
                      }}
                    />
                  </Box>
                  {/* <Button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Favorite
                      onClick={(e) => targetLikeHandler(e, ele._id)}
                      style={{
                        fill:
                          ele?.me_liked && ele?.me_liked[0]?.my_favorite
                            ? "red"
                            : "white",
                      }}
                    />
                  </Button> */}

                  {/* <Typography
                      level="h2"
                      sx={{ fontSize: "md", mt: 2, color: "white" }}
                    >
                      {ele.mb_nick}
                    </Typography> */}

                  {/* <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlinedBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {ele.mb_views}
                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }} />
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <div
                          ref={(element) => (refs.current[ele._id] = element)}
                        >
                          {ele.mb_likes}
                        </div>
                        <FavoriteIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                    </CardOverflow> */}
                </Stack>
              );
            })}
          </Stack>

          <Stack style={{ color: "white" }} className={"bottom_box"}>
            <img className={"line_img_right"} src={"/home/papay.png"} />
            <Pagination
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              }
              page={targetSearchObject.page}
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
            <img className={"line_img_left"} src={"/home/papay.png"} />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
