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
import useDeviceDetect from "app/lib/responsive/useDeviceDetect";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
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
  const { isMobile } = useDeviceDetect();
  const { newProducts } = useSelector(newProductsRetriever);
  const refs: any = useRef([]);
  const { setNewProducts } = actionDispatch(useDispatch());
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const [timeRemainingArray, setTimeRemainingArray] = useState<string[]>([]);

  const formatTimeRemaining = (endTime: string): string => {
    const now = new Date();
    const endDate = new Date(endTime);
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      return "00:00:00";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days > 0 ? `${days}d ` : ""}${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const [targetProductSearchObj, setTargetProductsSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 15,
      order: "discount.value",
      product_name: "all",
      restaurant_mb_id: "all",
      product_collection: "all",
      product_size: "all",
      product_color: "all",
      product_type: "all",
    });
  //** HANDLERS */

  const chosenDishHandler = (id: string) => {
    history.push(`/shop/product/${id}`);
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

  const handleClickOpenAlert = () => {
    history.push("/construction");
    props.setPath();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemainingArray(
        newProducts.map((product: Product) =>
          formatTimeRemaining(product.discount.endDate)
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [newProducts]);

  if (isMobile()) {
    return (
      <div className="top_restaurant_frame">
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Box className="category_title_mobile">On Sale</Box>
            <Stack
              style={{ width: "100%", display: "flex" }}
              flexDirection={"row"}
            >
              <Swiper
                className={"restaurant_avatars_wrapper"}
                slidesPerView={1}
                centeredSlides={false}
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
                {newProducts.map((product: Product, index: number) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;

                  return (
                    <SwiperSlide
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      key={product._id}
                      onClick={handleClickOpenAlert}
                    >
                      <Box
                        className={"dish_box"}
                        key={product._id}
                        onClick={() => handleClickOpenAlert}
                      >
                        <Box
                          className={"dish_img"}
                          sx={{
                            backgroundImage: `url(${image_path})`,
                            cursor: "pointer",
                          }}
                        >
                          {product.discountedPrice !== 0 ? (
                            product.discount?.type === "amount" ? (
                              <Box className="discount_fon">
                                -{product.discount?.value}
                              </Box>
                            ) : (
                              <Box className="discount_fon">
                                {product.discount?.value}%
                              </Box>
                            )
                          ) : (
                            <Button
                              className={"like_view_btn"}
                              style={{
                                left: "25px",
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
                                    <RemoveRedEyeIcon
                                      style={{ color: "red" }}
                                    />
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
                          )}

                          <Button
                            className={"like_view_btn"}
                            style={{
                              right: "25px",
                              // backgroundColor: "rgba(238, 228, 228, 0.909)",
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
                                onClick={() => handleClickOpenAlert}
                                checked={
                                  product?.me_liked &&
                                  product?.me_liked[0]?.my_favorite
                                    ? true
                                    : false
                                }
                              />
                            </Badge>
                          </Button>
                          <span className={"discount_timer"}>
                            {timeRemainingArray[index] !== "00:00:00"
                              ? timeRemainingArray[index]
                              : ""}
                          </span>
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
                            {product.discountedPrice ? (
                              <>
                                <MonetizationOnIcon
                                  style={{
                                    color: "red",
                                  }}
                                />
                                <span
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  {product.discountedPrice}
                                </span>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    marginLeft: "8px",
                                    // textDecorationThickness: "0.25px",
                                    textDecorationLine: "0.1px",
                                  }}
                                >
                                  {product.product_price}
                                </span>
                              </>
                            ) : (
                              <>
                                <MonetizationOnIcon />
                                <span>{product.product_price}</span>
                              </>
                            )}

                            <Box>
                              <ShoppingCartIcon
                                style={{
                                  bottom: "15px",
                                  right: "60px",
                                  position: "absolute",
                                  width: "100px",
                                  height: "30px",
                                }}
                                onClick={(e) => {
                                  props.onAdd(product);
                                  e.stopPropagation();
                                  sweetTopSmallSuccessAlert(
                                    "success",
                                    700,
                                    false
                                  );
                                }}
                              />
                            </Box>
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
  } else {
    return (
      <div className="top_restaurant_frame">
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Box className="category_title">On Sale</Box>
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
                {newProducts.map((product: Product, index: number) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  let discountedPrice = Math.floor(product.discountedPrice);
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
                          {product.discountedPrice !== 0 ? (
                            product.discount?.type === "amount" ? (
                              <Box className="discount_fon">
                                -{product.discount?.value}
                              </Box>
                            ) : (
                              <Box className="discount_fon">
                                {product.discount?.value}%
                              </Box>
                            )
                          ) : (
                            <Button
                              className={"like_view_btn"}
                              style={{
                                top: "1px",
                                left: "5px",
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
                                    <RemoveRedEyeIcon
                                      style={{ color: "red" }}
                                    />
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
                          )}

                          <Button
                            className={"like_view_btn"}
                            style={{
                              right: "25px",
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
                          <span className={"discount_timer"}>
                            {timeRemainingArray[index] !== "00:00:00"
                              ? timeRemainingArray[index]
                              : ""}
                          </span>
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

                          <Box className="dish_text_box">
                            <Box className={"dish_desc_text"}>
                              {product.discountedPrice ? (
                                <>
                                  <MonetizationOnIcon
                                    style={{
                                      color: "red",
                                    }}
                                  />
                                  <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    {discountedPrice}
                                  </span>
                                  <span
                                    style={{
                                      textDecoration: "line-through",
                                      marginLeft: "8px",
                                      // textDecorationColor: "red",
                                      textDecorationThickness: "0.8px",
                                    }}
                                  >
                                    {product.product_price}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <MonetizationOnIcon />
                                  <span>{product.product_price}</span>
                                </>
                              )}
                            </Box>
                            <Box>
                              <ShoppingCartIcon
                                style={{
                                  marginRight: "20px",
                                  color: "#85139e",
                                  position: "relative",
                                  width: "80px",
                                  height: "30px",
                                  transition:
                                    "transform 0.7s ease, margin-right 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "rotate(-15deg) translateX(0px)";
                                  e.currentTarget.style.marginRight = "10px";
                                  e.currentTarget.style.color = "10px";
                                  e.currentTarget.style.color = "red";
                                  e.currentTarget.style.opacity = "0.8";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "rotate(0deg) translateX(0px)";
                                  e.currentTarget.style.marginRight = "20px";
                                  e.currentTarget.style.color = "#85139e";
                                }}
                                onClick={(e) => {
                                  props.onAdd(product);
                                  e.stopPropagation();
                                  sweetTopSmallSuccessAlert(
                                    "success",
                                    700,
                                    false
                                  );
                                }}
                              />
                            </Box>
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
}
