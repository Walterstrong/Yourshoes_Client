import { Box, Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import React, { useEffect, useState } from "react";
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
import useDeviceDetect from "app/lib/responsive/useDeviceDetect";

import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
// REDUX SELECTOR
const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants,
  })
);
export function RandomRestaurants(props: any) {
  //** INITIALIZATIONS */
  const history = useHistory();
  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);

  const chosenRestaurantHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };

  const handleClickOpenAlert = () => {
    history.push("/construction");
  };
  const { isMobile } = useDeviceDetect();

  if (isMobile()) {
    return (
      <div className="static_frame">
        <Container>
          <Stack
            style={{ width: "100%", height: "150px", display: "flex" }}
            flexDirection={"row"}
          >
            <Swiper
              className={"restaurant_avatars_wrapper"}
              slidesPerView={2}
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
                    // onClick={props.handleClickOpenAlert}
                    onClick={handleClickOpenAlert}
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
  } else {
    return (
      <div className="static_frame">
        <Container>
          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
          >
            <Swiper
              className={"restaurant_avatars_wrapper"}
              slidesPerView={6}
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
              {randomRestaurants.map((ele: Restaurant, index) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <Fade key={ele._id} right duration={2000} delay={index * 300}>
                    <SwiperSlide
                      onClick={() => chosenRestaurantHandler(ele._id)}
                      style={{ cursor: "pointer" }}
                      key={ele._id}
                      className={"restaurant_avatars"}
                    >
                      <img src={image_path} />
                      <span>{ele.mb_nick}</span>
                    </SwiperSlide>
                  </Fade>
                );
              })}
            </Swiper>
          </Stack>
        </Container>
      </div>
    );
  }
}
