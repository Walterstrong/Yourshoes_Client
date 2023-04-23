import { Box, Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveRandomRestaurants } from "./selector";
import { Restaurant } from "types/user";
import { Swiper, SwiperSlide } from "swiper/react";
import { serverApi } from "app/lib/config";
import { useHistory } from "react-router-dom";
import useDeviceDetect from "app/lib/responsive/useDeviceDetect";
import Fade from "react-reveal/Fade";

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
      <Container className="static_frame">
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
