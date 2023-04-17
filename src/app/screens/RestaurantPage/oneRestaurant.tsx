import { useState, useEffect } from "react";
import {
  // Accordion,
  Box,
  Button,
  Container,
  Stack,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
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
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenRestaurant,
  setRandomRestaurants,
  setTargetProducts,
} from "./slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { ProductSearchObj, SearchObj } from "../../../types/others";
import { Product } from "../../../types/product";
import {
  retrieveRandomRestaurants,
  retrieveTargetProducts,
  retrieveChosenRestaurant,
} from "./selector";
import { useHistory, useParams } from "react-router-dom";
import ProductApiService from "../../apiServices/productApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { Navigation } from "swiper";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
import Rotate from "react-reveal/Rotate";

const actionDispatch = (dispatch: Dispatch) => ({
  setRandomRestaurants: (data: Restaurant[]) =>
    dispatch(setRandomRestaurants(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// REDUX SELECTOR
const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants,
  })
);
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

export function OneRestaurant(props: any) {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  //** INITIALIZATIONS */
  const history = useHistory();
  //**//
  let { restaurant_id } = useParams<{ restaurant_id: string }>();
  //**//
  const { setRandomRestaurants, setChosenRestaurant, setTargetProducts } =
    actionDispatch(useDispatch());
  //**//
  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  //**//
  const [chosenRestaurantId, setChosenRestaurantId] =
    useState<string>(restaurant_id);

  const [targetProductSearchObj, setTargetProductsSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 6,
      order: "product_reviews",
      restaurant_mb_id: restaurant_id,
      product_name: "all",
      product_collection: "all",
      product_size: "all",
      product_color: "all",
      product_type: "all",
    });

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  useEffect(() => {
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getRestaurants({
        page: 1,
        limit: 10,
        order: "random",
      })
      .then((data) => setRandomRestaurants(data))
      .catch((err) => console.log(err));
  }, [chosenRestaurantId]);

  useEffect(() => {
    const restaurantService = new RestaurantApiService();

    restaurantService
      .getChosenRestaurant(chosenRestaurantId)
      .then((data) => setChosenRestaurant(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenRestaurantId, targetProductSearchObj, productRebuild]);

  const handleSearchIconClick = () => {
    // Perform the search with the searchValue
    console.log(
      "targetProductSearchObj.product_name:",
      targetProductSearchObj.product_name
    );
  };
  //** HANDLERS */
  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
  };
  //
  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_name = event.target.value;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
  };
  //
  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
  };
  //
  const searchTypeHandler = (type: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_type = type;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
  };
  //
  const searchSizeHandler = (size: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_size = size;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
  };
  //
  const searchColorHandler = (color: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_color = color;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
  };
  //
  const searchPageHandler = (event: any, value: number) => {
    targetProductSearchObj.page = value;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
  };
  //
  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId(id);
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
    history.push(`/shop/${id}`);
  };
  //
  const chosenDishHandler = (id: string) => {
    history.push(`/shop/product/${id}`);
  };
  //
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

  return (
    <div className={"single_restaurant"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar_big_box"}>
            <Box className={"top_text"}>
              <p>{chosenRestaurant?.mb_nick}</p>
              <Box className={"Single_search_big_box"}>
                <form className={"Single_search_form"} action={""} method={""}>
                  <input
                    type={"search"}
                    className={"Single_searchInput"}
                    name={"Single_resSearch"}
                    placeholder={"Searching"}
                    onChange={changeNameHandler}
                  />
                  <Button className={"Single_button_search"}>
                    <SearchIcon onClick={handleSearchIconClick} />
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>
          <Stack
            style={{ width: "90%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "25px" }}
          >
            <Box className={"prev_btn restaurant-prev"}>
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40 }}
                style={{ color: "white" }}
              />
            </Box>
            <Swiper
              className={"restaurant_avatars_wrapper"}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
            >
              {randomRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className={"restaurant_avatars"}
                  >
                    <img src={image_path} />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className={"next_btn restaurant-next"}
              style={{ color: "white" }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex", minHeight: "1000px" }}
            flexDirection={"row"}
          >
            <Stack className={"dish_category_box"}>
              <Stack>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  className="filter_box"
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>Collection</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <RadioGroup name="use-radio-group" defaultValue="all">
                        <FormControlLabel
                          value="all"
                          label="All"
                          onClick={() => searchCollectionHandler("all")}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="formal"
                          label="Formal"
                          onClick={() => searchCollectionHandler("formal")}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="running"
                          label="Running"
                          onClick={() => searchCollectionHandler("running")}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="training"
                          label="Training"
                          onClick={() => searchCollectionHandler("training")}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="sports"
                          label="Sports"
                          onClick={() => searchCollectionHandler("sports")}
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Typography>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                >
                  <AccordionSummary
                    aria-controls="panel4d-content"
                    id="panel4d-header"
                  >
                    <Typography>Sorting by</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RadioGroup name="use-radio-group" defaultValue="createdAt">
                      <FormControlLabel
                        value="createdAt"
                        label="New"
                        onClick={() => searchOrderHandler("createdAt")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="product_price"
                        label="Price"
                        onClick={() => searchOrderHandler("product_price")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="product_likes"
                        label="Likes"
                        onClick={() => searchOrderHandler("product_likes")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="product_views"
                        label="Views"
                        onClick={() => searchOrderHandler("product_views")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="product_reviews"
                        label="Reviews"
                        onClick={() => searchOrderHandler("product_reviews")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="discount.value"
                        label="On Sale"
                        onClick={() => searchOrderHandler("discount.value")}
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography>Type</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <RadioGroup name="use-radio-group" defaultValue="All">
                        <FormControlLabel
                          value="All"
                          label="All"
                          onClick={() => searchTypeHandler("all")}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="men"
                          label="Men"
                          onClick={() => searchTypeHandler("men")}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="women"
                          label="Women"
                          onClick={() => searchTypeHandler("women")}
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                  >
                    <Typography>Color</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RadioGroup name="use-radio-group" defaultValue="All">
                      <FormControlLabel
                        value="All"
                        label="All"
                        onClick={() => searchColorHandler("all")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="white"
                        label="White"
                        onClick={() => searchColorHandler("white")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="green"
                        label="Green"
                        onClick={() => searchColorHandler("green")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="blue"
                        label="Blue"
                        onClick={() => searchColorHandler("blue")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="red"
                        label="Red"
                        onClick={() => searchColorHandler("red")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="black"
                        label="Black"
                        onClick={() => searchColorHandler("black")}
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                  className="filter_box_2"
                >
                  <AccordionSummary
                    aria-controls="panel4d-content"
                    id="panel4d-header"
                  >
                    <Typography>Size</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RadioGroup name="use-radio-group" defaultValue="All">
                      <FormControlLabel
                        value="All"
                        label="All"
                        onClick={() => searchSizeHandler("all")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="270"
                        label="270"
                        onClick={() => searchSizeHandler("270")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="275"
                        label="275"
                        onClick={() => searchSizeHandler("275")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="280"
                        label="280"
                        onClick={() => searchSizeHandler("280")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="285"
                        label="285"
                        onClick={() => searchSizeHandler("285")}
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="290"
                        label="290"
                        onClick={() => searchSizeHandler("290")}
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </Stack>
            <Stack className={"dish_wrapper"}>
              {targetProducts.map((product: Product, index) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                let discountedPrice = Math.floor(product.discountedPrice);
                return (
                  <Fade
                    key={product._id}
                    bottom
                    duration={1500}
                    delay={index * 300}
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
                          <Box className="discount_fon">
                            {product.discount?.value}%
                          </Box>
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

                          <Box>
                            <ShoppingCartIcon
                              style={{
                                bottom: "35px",
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
                  </Fade>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
        <Stack style={{ color: "white" }} className={"bottom_box"}>
          <img className={"line_img_right"} src={"/home/papay.png"} />
          <Pagination
            count={
              targetProductSearchObj.page >= 3
                ? targetProductSearchObj.page + 1
                : 3
            }
            page={targetProductSearchObj.page}
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
            onChange={searchPageHandler}
          />
          <img className={"line_img_left"} src={"/home/papay.png"} />
        </Stack>
      </Container>
    </div>
  );
}
