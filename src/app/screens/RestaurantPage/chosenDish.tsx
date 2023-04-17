import { useState, useEffect } from "react";
import { Container, Stack, Box, Badge } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Favorite, FavoriteBorder, WindowTwoTone } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// REDUX
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
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
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenProduct,
  setChosenRestaurant,
  setTargetComments,
  setTargetProducts,
} from "./slice";
import { Product } from "../../../types/product";
import {
  retrieveChosenRestaurant,
  retrieveChosenProduct,
  retrieveTargetComments,
  retrieveTargetProducts,
} from "./selector";
import "swiper/css";
import "swiper/css/effect-cards";
import { useParams } from "react-router-dom";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import MemberApiService from "../../apiServices/memberApiService";
import CommentApiService from "../../apiServices/commentApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { Comments } from "types/follow";
import { CommentsSearchObj } from "../../../types/others";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { ProductSearchObj, SearchObj } from "../../../types/others";
import { EffectCards } from "swiper";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
  setTargetComments: (data: Comments[]) => dispatch(setTargetComments(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

// REDUX SELECTOR
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const targetCommentsRetriever = createSelector(
  retrieveTargetComments,
  (targetComments) => ({
    targetComments,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

//accordion
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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({}));

export function ChosenDish(props: any) {
  //accordion
  const history = useHistory();
  const [expanded, setExpanded] = useState<string | false>("panel2");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  function handleSwiperInstance(swiper: any) {
    setThumbsSwiper(swiper);
  }
  type SwiperStyleProps = {
    "--swiper-navigation-color": string;
    "--swiper-pagination-color": string;
  };

  const swiperStyle: React.CSSProperties & SwiperStyleProps = {
    // width: "80%",
    // height: "140px",
    // marginTop: "20px",
    "--swiper-navigation-color": "red",
    "--swiper-pagination-color": "blue",
  };
  //** INITIALIZATIONS */
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  let { dish_id } = useParams<{ dish_id: string }>();

  const [value, setValue] = useState("2");

  const {
    setChosenRestaurant,
    setChosenProduct,
    setTargetComments,
    setTargetProducts,
  } = actionDispatch(useDispatch());
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { targetComments } = useSelector(targetCommentsRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const [targetProductSearchObj, setTargetProductsSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 15,
      order: "product_likes",
      restaurant_mb_id: "all",
      product_name: "all",
      product_collection: "all",
      product_size: "all",
      product_color: "all",
      product_type: "all",
    });
  const [targetCommentsSearchObj, setTargetCommentSearchObj] =
    useState<CommentsSearchObj>({
      page: 1,
      limit: 25,
      comment_ref_product_id: dish_id,
    });

  const chosenDishHandler = (id: string) => {
    history.push(`/shop/product/${id}`);
    setProductRebuild(new Date());
  };

  const chosenCommentHandler = (id: string) => {
    targetCommentsSearchObj.comment_ref_product_id = id;
    setTargetCommentSearchObj({ ...targetCommentsSearchObj });
    setProductRebuild(new Date());
  };
  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenDish(dish_id);
      setChosenProduct(product);
      const restaurantService = new RestaurantApiService();
      const restaurant = await restaurantService.getChosenRestaurant(
        product.restaurant_mb_id
      );
      setChosenRestaurant(restaurant);
    } catch (err: any) {
      console.log(`dishRelatedProcess, ERROR`, err);
    }
  };

  useEffect(() => {
    dishRelatedProcess().then();

    const commentApiService = new CommentApiService();
    commentApiService
      .getTargetComments(targetCommentsSearchObj)
      .then((data) => setTargetComments(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [productRebuild]);

  // useEffect(() => {}, [productRebuild, targetProductSearchObj]);

  //** for Creating comments *//
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //** for Creating values *//
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  //** HANDLERS */
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

  const targetLikeComment = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "comment",
      });
      assert.ok(like_result, Definer.auth_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeComment,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const handleCommentRequest = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const is_fulfilled = comment != "" && rating != 0;
      assert.ok(is_fulfilled, Definer.input_err1);
      const comment_data = {
        comment_content: comment,
        product_rating: rating,
        comment_ref_product_id: chosenProduct?._id,
        comment_ref_restaurant_id: chosenProduct?.restaurant_mb_id,
      };
      const commentApiService = new CommentApiService();
      await commentApiService.createComment(comment_data);
      await sweetTopSmallSuccessAlert("success", 700, false);
      handleClose();
      setExpanded("panel1");
      setProductRebuild(new Date());
    } catch (err) {
      console.log(err);
      handleClose();
      sweetErrorHandling(err).then();
    }
  };

  const passwordKeyDownHandler = (e: any) => {
    if (e.key == "Enter") {
      handleCommentRequest();
    }
  };

  const CommentDelteHAndler = async (art_id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      let confirmation = window.confirm("Are you sure to delete your article?");
      if (confirmation) {
        const commentApiService = new CommentApiService();
        const comment_result = await commentApiService.CommentArticleDelte(
          art_id
        );
        assert.ok(comment_result, Definer.auth_err1);
        await sweetTopSmallSuccessAlert("success", 700, false);
        setProductRebuild(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  // const chosenProduct: Product | null = null;

  const discountedPrice: number = Math.floor(
    chosenProduct?.discountedPrice ?? 0
  );
  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="dish_container1">
          <Stack className="chosen_dish_slider">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
            >
              {chosenProduct?.product_images.map((ele: string) => {
                const image_path = `${serverApi}/${ele}`;
                let discountedPrice = Math.floor(chosenProduct.discountedPrice);
                return (
                  <SwiperSlide>
                    <img
                      style={{
                        borderRadius: "25px",
                        width: "100%",
                        height: "90%",
                        // display: " block",
                        // transition: "transform .3s ease",
                        // overflow: " hidden",
                      }}
                      src={image_path}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Stack className="accordion_comment">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                style={{
                  borderRadius: "5px",
                  borderColor: "#160240d5",
                }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    style={{
                      color: "black",
                      fontSize: "15.25px",
                    }}
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    // }}
                  >
                    All reviews
                    <span className={"product_review"}>
                      ({chosenProduct?.product_reviews})
                    </span>
                    <Button
                      variant="text"
                      onClick={handleClickOpen}
                      style={{
                        marginLeft: "200px",
                        color: "black",
                        textTransform: "none",
                        fontSize: "15.25px",
                      }}
                    >
                      <CreateIcon style={{ marginRight: "5px" }} />
                      Write review
                    </Button>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion_details">
                  {targetComments?.map((comment: Comments) => {
                    const image_member = comment?.member_data?.mb_image
                      ? `${serverApi}/${comment?.member_data?.mb_image}`
                      : "/auth/default_user.svg";

                    return (
                      <Stack className={"chosen_dish_comment"}>
                        <Stack>
                          <Stack className="comment">
                            <Stack className="comment_avatar">
                              <img
                                className="comment_avatar_image"
                                src={image_member}
                                alt=""
                              />
                            </Stack>
                            <Stack
                              className="comment_desc"
                              style={{ padding: "0 10px 5px" }}
                            >
                              <Stack
                                className="comment_author"
                                style={{ padding: "0 0 5px" }}
                              >
                                {comment?.member_data?.mb_nick}
                              </Stack>
                              <Stack className="metadata">
                                <div>
                                  <Rating
                                    value={comment?.product_rating}
                                    // text={`${product.numReviews} reviews`}
                                  />
                                </div>
                                <div className="days">
                                  {moment(comment?.createdAt).format(
                                    "YY-MM-DD HH:mm"
                                  )}
                                </div>
                                <div>
                                  <span
                                    style={{
                                      marginLeft: "50px",

                                      fontSize: "16.25px",
                                    }}
                                  >
                                    {comment?.comment_likes}
                                  </span>
                                  <Checkbox
                                    sx={{ mt: "-11px" }}
                                    icon={<ThumbUpOffAltIcon />}
                                    checkedIcon={
                                      <ThumbUpOffAltIcon
                                        style={{ color: "red" }}
                                      />
                                    }
                                    id={comment._id}
                                    onClick={targetLikeComment}
                                    //*@ts-ignore*/
                                    checked={
                                      comment?.me_liked &&
                                      comment?.me_liked[0]?.my_favorite
                                        ? true
                                        : false
                                    }
                                  />
                                </div>{" "}
                                {(verifiedMemberData?._id ===
                                  comment.member_data._id ||
                                  verifiedMemberData?.mb_type === "ADMIN") && (
                                  <DeleteIcon
                                    style={{
                                      color: "black",
                                      marginLeft: "2px",
                                      marginTop: "-2px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      CommentDelteHAndler(comment?._id)
                                    }
                                  />
                                )}
                              </Stack>
                              <Stack className="text">
                                {comment?.comment_content}
                              </Stack>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Stack>
          <Stack className={"chosen_dish_info_container"}>
            <Box className={"chosen_dish_info_box"}>
              <strong className={"dish_txt"}>
                {chosenProduct?.product_name}
              </strong>
              <span className={"resto_name"}>{chosenRestaurant?.mb_nick}</span>{" "}
              {chosenProduct?.discountedPrice ? (
                <span
                  style={{
                    marginTop: "8px",
                    color: "red",
                    textDecoration: "underline",
                    textDecorationColor: "#5d5959",
                  }}
                >
                  {chosenProduct?.discount.value}% Sale
                </span>
              ) : null}
              <Box className={"rating_box"}>
                <div className={"review_stars"}>
                  <Rating
                    name="read-only"
                    value={chosenProduct?.product_rating}
                    readOnly
                  />
                  <span className={"product_reviews"}>
                    ({chosenProduct?.product_reviews})
                  </span>
                </div>
                <div className={"evaluation_box"}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <Button
                      style={{
                        color: "97979",
                      }}
                    >
                      <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                        id={chosenProduct?._id}
                        onClick={targetLikeProduct}
                        checked={
                          chosenProduct?.me_liked &&
                          chosenProduct?.me_liked[0]?.my_favorite
                            ? true
                            : false
                        }
                      />
                    </Button>
                    <span>{chosenProduct?.product_likes} </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      icon={
                        <RemoveRedEyeIcon
                          style={{ color: "97979" }}
                          sx={{ mr: "10px" }}
                        />
                      }
                      checkedIcon={
                        <RemoveRedEyeIcon style={{ color: "red" }} />
                      }
                      checked={
                        chosenProduct?.me_viewed &&
                        chosenProduct?.me_viewed[0]?.my_view
                          ? true
                          : false
                      }
                    />
                    <span>{chosenProduct?.product_views} </span>
                  </div>
                </div>
              </Box>
              <p className={"dish_desc_info"}>
                <h2 style={{ color: "#060864" }}> Product description</h2>
                <ul>
                  <li>Made in USA or Imported</li>
                  <li>Rubber sole</li>
                  <li>
                    Lightweight mesh upper with 3-color digital print delivers
                    complete breathability
                  </li>
                  <li>
                    Durable leather overlays for stability & that locks in your
                    midfoot
                  </li>
                  <li>
                    Lightweight mesh upper with 3-color digital print delivers
                    complete breathability
                  </li>
                  <li>EVA sockliner provides soft, step-in comfort</li>
                  <li>
                    Charged Cushioning midsole uses compression molded foam for
                    ultimate responsiveness & durability
                  </li>
                  <li>
                    Solid rubber outsole covers high impact zones for greater
                    durability with less weight
                  </li>
                </ul>
              </p>
              <Marginer
                direction="horizontal"
                height="1"
                width="100%"
                bg="#000000"
              />
              <div className={"dish_price_box"}>
                <span>Price:</span>
                {chosenProduct?.discountedPrice ? (
                  <>
                    {" "}
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "8px",
                        // textDecorationColor: "red",
                        textDecorationThickness: "0.8px",

                        color: "#85139e",
                        position: "absolute",
                        right: "185px",
                        zIndex: "3",
                      }}
                    >
                      {chosenProduct?.product_price}
                    </span>{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      ${discountedPrice}
                    </span>{" "}
                  </>
                ) : (
                  <span>${chosenProduct?.product_price}</span>
                )}
              </div>
              <div className={"button_box"}>
                <Button
                  className={"button_box1"}
                  variant="contained"
                  onClick={() => {
                    props.onAdd(chosenProduct);
                    sweetTopSmallSuccessAlert("success", 700, false);
                  }}
                >
                  Add Card
                </Button>
              </div>
              <div>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <Box>
                        <FormControl
                          fullWidth
                          style={{
                            marginTop: "15px",
                            width: "120px",
                          }}
                        >
                          <Box
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                          >
                            <Typography component="legend">Rating</Typography>
                            <Rating
                              name="simple-controlled"
                              value={rating}
                              onChange={(event, rating) => {
                                setRating(rating);
                              }}
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </DialogContentText>
                    <TextField
                      style={{
                        height: "50px",
                        width: "500px",
                        marginTop: "15px",
                      }}
                      onChange={handleCommentChange}
                      autoFocus
                      margin="dense"
                      id="comment"
                      label="Write your comment"
                      type="text"
                      fullWidth
                      variant="standard"
                      onKeyPress={passwordKeyDownHandler}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="secondary"
                      style={{
                        marginBottom: "15px",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCommentRequest}
                      variant="contained"
                      color="primary"
                      style={{
                        marginRight: "145px",
                        marginBottom: "15px",
                      }}
                    >
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Box>
          </Stack>
        </Stack>
        <Stack className="dish_container2">
          {" "}
          <Box className="category_title">Similar products</Box>
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
              {targetProducts.map((product: Product) => {
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
                      onClick={() => {
                        chosenDishHandler(product._id);
                        chosenCommentHandler(product._id);
                      }}
                    >
                      <Box
                        className={"dish_img"}
                        sx={{
                          backgroundImage: `url(${image_path})`,
                          cursor: "pointer",
                        }}
                      >
                        <Box className="discount_fon">
                          {product.discountedPrice !== 0 ? (
                            `${product.discount?.value}%Sale`
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
                        </Box>
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

                          <Button
                            className={"view_btn"}
                            onClick={(e) => {
                              props.onAdd(product);
                              e.stopPropagation();
                              sweetTopSmallSuccessAlert("success", 700, false);
                            }}
                          >
                            {product.discountedPrice ? (
                              <ShoppingCartIcon
                                style={{
                                  left: "60px",
                                  position: "absolute",
                                  width: "100px",
                                  height: "30px",
                                }}
                              />
                            ) : (
                              <ShoppingCartIcon
                                style={{
                                  left: "100px",
                                  position: "absolute",
                                  width: "100px",
                                  height: "30px",
                                }}
                              />
                            )}
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
