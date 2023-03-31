import { useState, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
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
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import moment from "moment";
// import Rating from "@material-ui/lab/Rating";
// import Typography from "@material-ui/core/Typography";
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

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenProduct,
  setChosenRestaurant,
  setTargetComments,
} from "./slice";
import { Product } from "../../../types/product";
import {
  retrieveChosenRestaurant,
  retrieveChosenProduct,
  retrieveTargetComments,
} from "./selector";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import MemberApiService from "../../apiServices/memberApiService";
import CommentApiService from "../../apiServices/commentApiService";
import { verifiedMemberData } from "app/apiServices/verify";
import { Comment, Icon } from "semantic-ui-react";
import { Comments } from "types/follow";
import { CommentsSearchObj } from "../../../types/others";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
  setTargetComments: (data: Comments[]) => dispatch(setTargetComments(data)),
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
  const [expanded, setExpanded] = useState<string | false>("panel2");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  //** INITIALIZATIONS */
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  let { dish_id } = useParams<{ dish_id: string }>();

  const [value, setValue] = useState("2");
  const [targetCommentsSearchObj, setTargetCommentSearchObj] =
    useState<CommentsSearchObj>({
      page: 1,
      limit: 8,
      comment_ref_product_id: dish_id,
    });
  const { setChosenRestaurant, setChosenProduct, setTargetComments } =
    actionDispatch(useDispatch());
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { targetComments } = useSelector(targetCommentsRetriever);

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

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
  }, [productRebuild]);

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

  const handleChangeRating = (event: any) => {
    setRating(event.target.value);
  };

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

  const CommentDelteHAndler = async (art_id: string) => {
    try {
      // stopPropagation();
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
  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            //thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      display: " block",
                      transition: "transform .3s ease",
                      overflow: " hidden",
                    }}
                    src={image_path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            // onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={20}
            slidesPerView={chosenProduct?.product_images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{
              width: "80%",
              height: "140px",
              marginTop: "20px",
              // border: "solid 1px white",
            }}
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide
                  style={{
                    height: "107px",
                    display: "flex",
                  }}
                >
                  <img style={{ borderRadius: "15px" }} src={image_path} />
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
                  const image_member = `${serverApi}/${comment?.member_data?.mb_image}`;

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
                              {verifiedMemberData?._id ===
                                comment.member_data._id && (
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
          ;
        </Stack>
        <Stack className={"chosen_dish_info_container"}>
          <Box className={"chosen_dish_info_box"}>
            <strong className={"dish_txt"}>
              {chosenProduct?.product_name}
            </strong>
            <span className={"resto_name"}>{chosenRestaurant?.mb_nick}</span>
            <Box className={"rating_box"}>
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className={"evaluation_box"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
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

                  <span>{chosenProduct?.product_likes} ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    icon={
                      <RemoveRedEyeIcon
                        style={{ color: "white" }}
                        sx={{ mr: "10px" }}
                      />
                    }
                    checkedIcon={<RemoveRedEyeIcon style={{ color: "red" }} />}
                    checked={
                      chosenProduct?.me_viewed &&
                      chosenProduct?.me_viewed[0]?.my_view
                        ? true
                        : false
                    }
                  />
                  <span>{chosenProduct?.product_views} ta</span>
                </div>
              </div>
            </Box>
            <p className={"dish_desc_info"}>
              <h2>Product description</h2>
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
              <span>${chosenProduct?.product_price}</span>
            </div>
            <div className={"button_box"}>
              <Button
                variant="contained"
                onClick={() => props.onAdd(chosenProduct)}
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
      </Container>
    </div>
  );
}
