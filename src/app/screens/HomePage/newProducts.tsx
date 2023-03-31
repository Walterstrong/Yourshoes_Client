import { Box, Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { Product } from "types/product";
import { Pagination } from "swiper";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

// REDUX SELECTOR
const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({
    newProducts,
  })
);

export function NewProducts(props: any) {
  //** INITIALIZATIONS */
  const history = useHistory();
  const { newProducts } = useSelector(newProductsRetriever);
  const refs: any = useRef([]);

  //** HANDLERS */
  const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurant/${id}`);
    // const restaurantService = new RestaurantApiService();
    // restaurantService.getChosenRestaurant(`${id}`);
  };
  const targetLikeTop = async (e: any, id: string) => {
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
    <div className="top_restaurant_frame">
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "25px" }}
        >
          <Box className="category_title">New arrivals</Box>
          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
          >
            <Swiper
              className={"restaurant_avatars_wrapper"}
              slidesPerView={4}
              centeredSlides={false}
              spaceBetween={10}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
              }}
            >
              {newProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;

                return (
                  <SwiperSlide
                    onClick={() => chosenRestaurantHandler(product._id)}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    key={product._id}
                    // className={"restaurant_avatars"}
                  >
                    <Box
                      className={"dish_box"}
                      key={product._id}
                      // onClick={() => chosenDishHandler(product._id)}
                    >
                      <Box
                        className={"dish_img"}
                        sx={{
                          backgroundImage: `url(${image_path})`,
                          cursor: "pointer",
                        }}
                      >
                        <Button
                          className={"like_view_btn"}
                          style={{ left: "36px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Badge
                            badgeContent={product.product_likes}
                            color="primary"
                          >
                            <Checkbox
                              icon={
                                <FavoriteBorder style={{ color: "blue" }} />
                              }
                              id={product._id}
                              checkedIcon={
                                <Favorite style={{ color: "red" }} />
                              }
                              // onClick={targetLikeProduct}
                              checked={
                                product?.me_liked &&
                                product?.me_liked[0]?.my_favorite
                                  ? true
                                  : false
                              }
                            />
                          </Badge>
                        </Button>
                        <Button
                          className={"view_btn"}
                          onClick={(e) => {
                            props.onAdd(product);
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping_cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button
                          className={"like_view_btn"}
                          style={{ right: "36px" }}
                        >
                          <Badge
                            badgeContent={product.product_views}
                            color="primary"
                          >
                            <Checkbox
                              icon={
                                <RemoveRedEyeIcon style={{ color: "white" }} />
                              }
                              checkedIcon={
                                <RemoveRedEyeIcon style={{ color: "red" }} />
                              }
                              checked={
                                product?.me_viewed &&
                                product?.me_viewed[0]?.my_view
                                  ? true
                                  : false
                              }
                            />
                          </Badge>
                        </Button>
                      </Box>
                      <Box className={"dish_desc"}>
                        <div className={"review_stars"}>
                          <StarIcon style={{ color: "#F2BD57" }} />
                          <StarIcon style={{ color: "#F2BD57" }} />
                          <StarIcon style={{ color: "white" }} />
                          <StarIcon style={{ color: "white" }} />
                          <StarIcon style={{ color: "white" }} />
                        </div>
                        <span className={"dish_title_text"}>
                          {product.product_name}
                        </span>

                        <div className={"dish_desc_text"}>
                          <MonetizationOnIcon />
                          {product.product_price}
                        </div>
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
