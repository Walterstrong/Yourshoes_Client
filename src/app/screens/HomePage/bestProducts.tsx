import { Favorite, Visibility } from "@mui/icons-material";
import { Box, Container, Stack, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import { serverApi } from "../../lib/config";

// REDUX
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { Product } from "types/product";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveBestProducts } from "./selector";
import ProductApiService from "app/apiServices/productApiService";
import { ProductSearch, ProductSearchObj } from "types/others";
import MemberApiService from "app/apiServices/memberApiService";
//** REDUX SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setBestProducts: (data: Product[]) => dispatch(setBestProducts(data)),
});
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
  const { setBestProducts } = actionDispatch(useDispatch());
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const [targetProduct, setTargetProduct] = useState<ProductSearch>({
    page: 1,
    limit: 25,
    order: "product_views",
    restaurant_mb_id: "all",
    product_collection: "all",
    product_size: "all",
    product_color: "all",
    product_type: "all",
  });
  //** HANDLERS */
  const chosenProductHandler = (id: string) => {
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
      .getTargetProducts(targetProduct)
      .then((data) => {
        setBestProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productRebuild]);
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
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    key={product._id}
                    className={"restaurant_avatars"}
                  >
                    <Box
                      className={"dish_box"}
                      key={product._id}
                      onClick={() => chosenProductHandler(product._id)}
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
                        <Button
                          className={"view_btn"}
                          onClick={(e) => {
                            e.stopPropagation();
                            sweetTopSmallSuccessAlert("success", 700, false);
                          }}
                        >
                          <img
                            src={"/icons/shopping_cart.svg"}
                            style={{ display: "flex" }}
                            onClick={(e) => {
                              props.onAdd(product);
                            }}
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
