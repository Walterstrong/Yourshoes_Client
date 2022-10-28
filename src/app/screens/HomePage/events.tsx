import React from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = [
    {
      title: "Boyin Foodga marhamat",
      desc: "Yangicha uslubda va Yangicha tam va yangicha His",
      author: "Abdurahmon Mufid",
      date: "2022/09/01",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/top8.jpeg",
    },
    {
      title: "Boyin Foodga marhamat",
      desc: "Yangicha uslubda va Yangicha tam va yangicha His",
      author: "Abdurahmon Mufid",
      date: "2022/09/01",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/top8.jpeg",
    },
    {
      title: "Boyin Foodga marhamat",
      desc: "Yangicha uslubda va Yangicha tam va yangicha His",
      author: "Abdurahmon Mufid",
      date: "2022/09/01",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/top8.jpeg",
    },
    {
      title: "Boyin Foodga marhamat",
      desc: "Yangicha uslubda va Yangicha tam va yangicha His",
      author: "Abdurahmon Mufid",
      date: "2022/09/01",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/top8.jpeg",
    },
  ];

  return (
    <div className="event_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className="event_main">
          <Box className="event_text">
            <span className="category_title">Hodisalar</span>
          </Box>
          <Box className="prev_next_frame">
            <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-prev"}
              style={{ transform: "rotate(-180deg)" }}
            />
            <div className="dot_frame_pagination swiper-pagination"></div>
            <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-next"}
            />
          </Box>
          <Swiper
            className={"event_info swiper-wrapper"}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
          >
            {events_list.map((value, number) => {
              return (
                <SwiperSlide className="event_info_frame">
                  <div className="event_img">
                    <img src={value.img} className="event_img" />
                  </div>
                  <Box className="event_desc">
                    <Box className="event_bott">
                      <Box className="bott_left">
                        <div className="event_title_speaker">
                          <strong>{value.title}</strong>
                          <div className="event_organizator">
                            <img
                              src="/icons/speaker.svg" //speaker
                              style={{ width: "20px", marginRight: "10px" }}
                            />
                            <p className={"spec_text_author"}>{value.author}</p>
                          </div>
                        </div>
                        <p
                          className={"text_desc"}
                          style={{ marginTop: "10px" }}
                        >
                          {""}
                          {value.desc}
                          {""}
                        </p>
                        <div
                          className="bott_info"
                          style={{ marginTop: "10px" }}
                        >
                          <div className="bott_info_main">
                            <img
                              src="/icons/calendar.svg" //calendar
                              style={{ marginRight: "10px" }}
                            />
                            {value.date}
                          </div>
                          <div className="bott_info_main">
                            <img
                              src="/icons/location.svg" //location
                              style={{ marginRight: "10px" }}
                            />
                            {value.location}
                          </div>
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
