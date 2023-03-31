import { Favorite, Visibility } from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  IconButton,
  Link,
  Typography,
} from "@mui/joy";
import { Box, Container, Stack, Button } from "@mui/material";
import CardContent from "@mui/joy/CardContent";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
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
// REDUX

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { Restaurant } from "../../../types/user";
import { serverApi } from "../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { Product } from "types/product";
import { retrieveBestProducts } from "./selector";
//** REDUX SELECTOR */

const bestProductsRetriever = createSelector(
  retrieveBestProducts,
  (bestProducts) => ({
    bestProducts,
  })
);

export function BestProducts(props: any) {
  //** INITIALIZATIONS */

  const history = useHistory();
  const { bestProducts } = useSelector(bestProductsRetriever);
  const refs: any = useRef([]);

  //** HANDLERS */

  const chosenProductHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  };
  const goRestaurantHandler = () => history.push("/restaurant");
  const targetLikeBest = async (e: any, id: string) => {
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
    <div className="best_restaurant_frame">
      {/* <img
        src={"icons/line_group.svg"}
        style={{ position: "absolute", left: "6%", transform: "rotate(90deg)" }}
      /> */}
      <Container sx={{ paddingTop: "23px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Best Products</Box>
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
              {bestProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;

                return (
                  <SwiperSlide
                    // onClick={() => chosenRestaurantHandler(product._id)}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    key={product._id}
                    className={"restaurant_avatars"}
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
