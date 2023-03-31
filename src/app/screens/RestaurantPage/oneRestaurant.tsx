import { useState, useEffect } from "react";
import {
  // Accordion,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
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
      limit: 8,
      order: "createdAt",
      restaurant_mb_id: restaurant_id,
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

  //** HANDLERS */
  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
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

  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId(id);
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductsSearchObj({ ...targetProductSearchObj });
    history.push(`/restaurant/${id}`);
  };
  //
  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
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
              <p>{chosenRestaurant?.mb_address}</p>
              <Box className={"Single_search_big_box"}>
                <form className={"Single_search_form"} action={""} method={""}>
                  <input
                    type={"search"}
                    className={"Single_searchInput"}
                    name={"Single_resSearch"}
                    placeholder={"Searching"}
                  />
                  <Button
                    className={"Single_button_search"}
                    // variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Searching
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
              {targetProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;

                return (
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
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
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
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      {/* <div className={"review_for_restaurant"}>
        <Container
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
      {/* <Box className={"category_title"}>Oshxona haqida fikrlar</Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {Array.from(Array(4).keys()).map((ele, index) => {
              return (
                <Box className={"review_box"} key={index}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img
                      src={"/community/cute_girl.jpg"}
                      className={"review_img"}
                    />
                  </Box>
                  <span className={"review_name"}>Rayhon Asadova</span>
                  <span className={"review_prof"}>Foydalanuvchi</span>
                  <p className={"review_desc"}>
                    Menga bu oshxonaning taomi juda yoqadi. Hammaga tafsiya
                    qilaman!!!
                  </p>
                  <div className={"review_stars"}>
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </div>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </div>

      <Container className="member_reviews">
        <Box className={"category_title"}>Oshxona haqida</Box>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          width={"90%"}
          sx={{ mt: "70px" }}
        >
          <Box
            className={"about_left"}
            sx={{
              backgroundImage: `url(${serverApi}/${chosenRestaurant?.mb_image})`,
            }}
          >
            <div className={"about_left_desc"}>
              <span>{chosenRestaurant?.mb_nick}</span>
              <p>{chosenRestaurant?.mb_description}</p>
            </div>
          </Box>
          <Box className={"about_right"}>
            {Array.from(Array(3).keys()).map((ele, index) => {
              return (
                <Box display={"flex"} flexDirection={"row"} key={index}>
                  <div className={"about_right_img"}></div>
                  <div className={"about_right_desc"}>
                    <span>Bizning mohir oshpazlarimiz</span>
                    <p>
                      Bizning oshpazlarimiz dunyo taniydigan oliygohlarda malaka
                      oshirib kelishdan
                    </p>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack
          sx={{ mt: "60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>{chosenRestaurant?.mb_address}</Box>
          <iframe
            style={{ marginTop: "60px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
            width="1320"
            height="500"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack> */}
      {/* </Container> */}
    </div>
  );
}
