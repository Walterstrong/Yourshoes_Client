import React from "react";
import { Box, Container, Stack } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { useHistory } from "react-router-dom";
import useDeviceDetect from "app/lib/responsive/useDeviceDetect";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events(props: any) {
  const history = useHistory();
  const { isMobile } = useDeviceDetect();
  // const { isMobile } = useDeviceDetect();
  const chosenProductHandler = () => {
    history.push(`/shop/6424af8267fd16fc1a8c416b`);
  };

  const handleClickOpenAlert = () => {
    history.push("/construction");
  };

  const events_list = [
    {
      title:
        "Nike shoes are built to last, designed to perform, and crafted with innovation in mind.",
      img: "/best_shoes/example1.jpeg",
    },
    {
      title:
        "With Nike shoes, you're getting more than just a shoe – you're getting a commitment to quality and excellence.",
      img: "/best_shoes/example2.jpeg",
    },
    {
      title:
        "When it comes to athletic footwear, Nike is synonymous with quality.",
      img: "/best_shoes/example3.jpeg",
    },
    {
      title:
        "Nike shoes are designed to withstand the toughest workouts and still look great.",
      img: "/best_shoes/example4.jpeg",
    },
    {
      title:
        "The quality of Nike shoes is unmatched – they're built to perform and last.",
      img: "/best_shoes/example5.jpeg",
    },
    {
      title:
        "From the materials to the craftsmanship, every aspect of Nike shoes is top-notch.",
      img: "/best_shoes/example6.jpeg",
    },
    {
      title: "When you wear Nike shoes, you know you're wearing the best.",
      img: "/best_shoes/example7.jpeg",
    },
    {
      title:
        "The durability and performance of Nike shoes make them a smart investment for any athlete.",
      img: "/best_shoes/example8.jpeg",
    },
    {
      title: "When it comes to quality, Nike shoes are second to none.",
      img: "/best_shoes/example9.jpeg",
    },
    {
      title:
        "Whether you're a professional athlete or just someone who appreciates quality footwear, Nike has you covered.",
      img: "/best_shoes/example10.jpeg",
    },
    {
      title:
        "With Nike shoes, you can trust that you're getting the best of the best – quality, performance, and style all in one.",
      img: "/best_shoes/example11.jpeg",
    },
  ];
  if (isMobile()) {
    return (
      <div className={"events_frame"}>
        <Container>
          <Stack className={"events_main"}>
            <Box className={"events_text"}>
              <span className={"category_title"}>We recommend this brand</span>
            </Box>
            <Box className={"prev_next_frame2"}></Box>
            <Swiper
              className={"events_info swiper-wrappers"}
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={30}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination2",
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
            >
              {events_list.map((value, number) => {
                return (
                  <SwiperSlide className={"events_info_frame"}>
                    <Box
                      className={"events_img"}
                      onClick={() => handleClickOpenAlert()}
                    >
                      <img src={value.img} className={"events_img"} />
                    </Box>
                    <Box className={"events_desc"}>
                      <Box className={"events_bott"}>
                        <Box className={"bott_left"}>
                          <div className={"event_title_speaker"}>
                            <strong>{value.title}</strong>
                          </div>
                        </Box>
                      </Box>
                    </Box>
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
      <div className={"events_frame"}>
        <Container>
          <Stack className={"events_main"}>
            <Box className={"events_text"}>
              <span className={"category_title"}>We recommend this brand</span>
            </Box>
            <Box className={"prev_next_frame2"}></Box>
            <Swiper
              className={"events_info swiper-wrappers"}
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={30}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination2",
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
            >
              {events_list.map((value, number) => {
                return (
                  <SwiperSlide className={"events_info_frame"}>
                    <Box
                      className={"events_img"}
                      onClick={() => chosenProductHandler()}
                    >
                      <img src={value.img} className={"events_img"} />
                    </Box>
                    <Box className={"events_desc"}>
                      <Box className={"events_bott"}>
                        <Box className={"bott_left"}>
                          <div className={"event_title_speaker"}>
                            <strong>{value.title}</strong>
                          </div>
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Container>
      </div>
    );
  }
}
