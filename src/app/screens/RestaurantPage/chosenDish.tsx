import React from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Checkbox from "@mui/material/Checkbox";
import Marginer from "../../components/headers/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
const chosen_list = Array.from(Array(3).keys());

export function ChosenDish() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((ele) => {
              const image_path = `/restaurant/top5.jpg`;
              return (
                <SwiperSlide>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "15px",
                    }}
                    src={image_path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            className="dish_swiper2"
            loop={true}
            spaceBetween={5}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((ele) => {
              const image_path = `/restaurant/top5.jpg`;
              return (
                <SwiperSlide>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={image_path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className="chosen_dish_info_container">
          <Box className="chosen_dish_info_box">
            <strong className="dish_txt">Sweet Sandwich</strong>
            <span className="resto_name">Texas De Brazil</span>
            <Box className="rating_box">
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className="evalutaion_box">
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
                    checked={false}
                  />
                  <span>98 ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>1000 ta</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
              aliquid ad debitis quae quis molestias consequatur amet suscipit?
              Laudantium porro quidem obcaecati voluptates ab distinctio sit
              molestias vero deleniti quaerat, at eius nostrum incidunt. Aut?
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className="dish_price_box">
              <span>Narx:</span>
              <span style={{ marginRight: "40px" }}>USD 11</span>
            </div>
            <div className="button_box">
              <Button variant="contained">Savatga qo'shish</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
