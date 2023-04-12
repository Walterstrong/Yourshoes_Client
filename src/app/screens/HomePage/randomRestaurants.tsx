import { Box, Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import React from "react";
import Marginer from "../../components/marginer";
import { retrieveRandomRestaurants } from "./selector";
import { Restaurant } from "types/user";
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
import { serverApi } from "app/lib/config";
import { useHistory } from "react-router-dom";
// REDUX SELECTOR
const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants,
  })
);
export function RandomRestaurants() {
  //** INITIALIZATIONS */
  const history = useHistory();
  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);

  const chosenRestaurantHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };
  return (
    <div className="static_frame">
      <Container>
        {/* <Box>
          <span className={"category_title"}>Our brands</span>
        </Box> */}
        <Stack style={{ width: "100%", display: "flex" }} flexDirection={"row"}>
          <Swiper
            className={"restaurant_avatars_wrapper"}
            slidesPerView={7}
            centeredSlides={false}
            spaceBetween={30}
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
        </Stack>
      </Container>
    </div>
  );
}
