import { useState, useEffect, useRef } from "react";
import { Box, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetRestaurants } from "./slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { SearchObj } from "../../../types/others";
import Bounce from "react-reveal/Bounce";

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
    order: "random",
  });

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
  };

  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject });
  };

  return (
    <div className="all_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">All Brands</Box>
          <Stack className={"all_res_box"}>
            {targetRestaurants?.map((ele: Restaurant) => {
              const image_path = `http://178.16.142.232:3003/${ele.mb_image}`;
              return (
                <Bounce bottom duration={2000}>
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
                  </Stack>
                </Bounce>
              );
            })}
          </Stack>

          <Stack style={{ color: "white" }} className={"bottom_box"}>
            <img
              className="line_img_right"
              src="/home/papay.png"
              alt="Papaya fruit"
            />

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
            <img className={"line_img_left"} src={"/home/papay.png"} alt="" />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
