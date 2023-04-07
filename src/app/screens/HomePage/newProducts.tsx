import { Box, Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import { Favorite } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { Product } from "types/product";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Rating from "@mui/material/Rating";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import ProductApiService from "app/apiServices/productApiService";
import { ProductSearchObj } from "types/others";

const actionDispatch = (dispatch: Dispatch) => ({
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
});

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
  const { setNewProducts } = actionDispatch(useDispatch());
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const [targetProductSearchObj, setTargetProductsSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 25,
      order: "createdAt",
      restaurant_mb_id: "all",
      product_collection: "all",
      product_size: "all",
      product_color: "all",
      product_type: "all",
    });
  //** HANDLERS */
  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  };

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "product",
      });
      assert.ok(like_result, Definer.auth_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  useEffect(() => {
    const productApiService = new ProductApiService();
    productApiService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => {
        setNewProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productRebuild]);

  return (
    <div className="top_restaurant_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
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
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    key={product._id}
                  >
                    <Box
                      className={"dish_box"}
                      key={product._id}
                      onClick={() => chosenDishHandler(product._id)}
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
                          style={{
                            left: "36px",
                            backgroundColor: "rgba(238, 228, 228, 0.909)",
                          }}
                        >
                          <Badge
                            badgeContent={product.product_views}
                            color="primary"
                          >
                            <Checkbox
                              icon={
                                <RemoveRedEyeIcon
                                  style={{ color: "#85139e" }}
                                />
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
                        <Box></Box>
                        <Button
                          className={"like_view_btn"}
                          style={{
                            right: "36px",
                            backgroundColor: "rgba(238, 228, 228, 0.909)",
                          }}
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
                                <FavoriteBorder
                                  style={{
                                    color: "#85139e",
                                  }}
                                />
                              }
                              id={product._id}
                              checkedIcon={
                                <Favorite style={{ color: "red" }} />
                              }
                              onClick={targetLikeProduct}
                              checked={
                                product?.me_liked &&
                                product?.me_liked[0]?.my_favorite
                                  ? true
                                  : false
                              }
                            />
                          </Badge>
                        </Button>
                      </Box>
                      <Box className={"dish_desc"}>
                        <div className={"review_stars"}>
                          <Rating value={product?.product_rating} />
                          <span className={"product_reviews"}>
                            ({product.product_reviews})
                          </span>
                        </div>
                        <span className={"dish_title_text"}>
                          {product.product_name}
                        </span>

                        <Box className={"dish_desc_text"}>
                          <MonetizationOnIcon />
                          {product.product_price}

                          <Button
                            className={"view_btn"}
                            onClick={(e) => {
                              props.onAdd(product);
                              e.stopPropagation();
                              sweetTopSmallSuccessAlert("success", 700, false);
                            }}
                          >
                            <ShoppingCartIcon />
                          </Button>
                        </Box>
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
