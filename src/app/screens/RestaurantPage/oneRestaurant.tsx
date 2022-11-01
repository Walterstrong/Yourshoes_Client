import React from "react";
import { Container, Stack, Box, Button, Badge } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import { Favorite, FavoriteBorder, MonetizationOn } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const restaurant_list = Array.from(Array(10).keys());
const product_list = Array.from(Array(4).keys());

export function OneRestaurant() {
  return (
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection="column" alignItems="center">
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>TexasDeBrazil Restaurant</p>
              <Box className="Single_search_big_box">
                <form className="Single_search_form" action="" method="">
                  <input
                    className="Single_searchInput"
                    type={"search"}
                    name="Single_resSearch"
                    placeholder="Qidiruv"
                  />
                  <Button
                    className="Single_button_search"
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Izlash
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>
          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className="prev_btn restaurant-prev">
              <ArrowBackRoundedIcon
                sx={{ fontSize: 40 }}
                style={{ color: "white" }}
              />
            </Box>
            <Swiper
              className="restaurant_avatars_wrapper"
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
            >
              {restaurant_list.map((ele, index) => {
                return (
                  <SwiperSlide
                    style={{ cursor: "pointer" }}
                    key={index}
                    className="restaurant_avatars"
                  >
                    <img src={"/restaurant/top5.jpg"} />
                    <span>Burak</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className="next_btn restaurant-next"
              style={{ color: "white" }}
            >
              <ArrowForwardRoundedIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            width="90%"
            sx={{ mt: "65px" }}
          >
            <Box className="dishs_filter_box">
              <Button variant="contained" color="secondary">
                new
              </Button>
              <Button variant="contained" color="secondary">
                price
              </Button>
              <Button variant="contained" color="secondary">
                likes
              </Button>
              <Button variant="contained" color="secondary">
                views
              </Button>
            </Box>
          </Stack>
          <Stack className="dish_category_box" flexDirection={"column"}>
            <div className="dish_category_main">
              <Button variant="contained" color="secondary">
                boshqa
              </Button>
              <Button variant="contained" color="secondary">
                desert
              </Button>
              <Button variant="contained" color="secondary">
                ichimlik
              </Button>
              <Button variant="contained" color="secondary">
                salad
              </Button>
              <Button variant="contained" color="secondary">
                ovqatlar
              </Button>
            </div>
          </Stack>
          <Stack className="dish_wrapper">
            {product_list.map((ele, index) => {
              const size_volume = "normal size";
              return (
                <Box className="dish_box">
                  <Box
                    className="dish_img"
                    sx={{ backgroundImage: `url("/restaurant/top5.jpg")` }}
                  >
                    <div className="dish_sale">{size_volume}</div>
                    <Button className="like_view_btn" style={{ left: "36px" }}>
                      <Badge badgeContent={8} color="primary">
                        <Checkbox
                          icon={<FavoriteBorder style={{ color: "white" }} />}
                          id={`${index}`}
                          checkedIcon={<Favorite style={{ color: "red" }} />}
                          checked={true}
                        />
                      </Badge>
                    </Button>
                    <Button className="view_btn">
                      <img
                        src={"/icons/shopping_cart.svg"}
                        style={{ display: "flex" }}
                      />
                    </Button>
                    <Button
                      className="like_view_btn"
                      style={{ display: "flex" }}
                    >
                      <Badge badgeContent={1000} color="primary">
                        <Checkbox
                          icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                        />
                      </Badge>
                    </Button>
                  </Box>
                  <Box className="dish_desc">
                    <span className="dish_title_text">Shirin qovurma</span>
                    <div className="dish_desc_text">
                      <MonetizationOn />7
                    </div>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>

      <div className="review_for_restaurant">
        <Container
          maxWidth="lg"
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="category_title">Oshxona haqida fikrlar</Box>
          <Stack
            flexDirection={"row"}
            display="flex"
            justifyContent={"space-between"}
            width="100%"
          >
            {Array.from(Array(4).keys()).map((ele) => {
              return (
                <Box className="review_box">
                  <Box className="flex" justifyContent={"center"}>
                    <img src={"/restaurant/top5.jpg"} className="review_img" />
                  </Box>
                  <span className="review_name">Rayhon Asadova</span>
                  <span className="review_prof">Foydalanuvchi</span>
                  <p className="review_desc">
                    Menga bu oshxonaning taomi juda yoqadi. Hammaga tavsiya
                    qilaman!!!
                  </p>
                  <div className="review_starts">
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
        <Box className="category_title">Oshxona haqida</Box>
        <Stack
          display="flex"
          flexDirection="row"
          width={"90%"}
          sx={{ mt: "70px" }}
        >
          <Box
            className="about_left"
            sx={{ background: `url("/restaurant/top5.jpg")` }}
          >
            <div className="about_left_desc">
              <span>Burak</span>
              <p>Eng mazzali oshxona</p>
            </div>
          </Box>
          <Box className="about_right">
            {Array.from(Array(3).keys()).map((ele, index) => {
              return (
                <Box display="flex" flexDirection={"row"} key={index}>
                  <div className="about_right_img"></div>
                  <div className="about_right_desc">
                    <span>Bizning mohir oshpazlarimiz</span>
                    <p>
                      Bizning oshpazlarimiz dunyo taniydigan oliygohlarda malaka
                      oshirib kelishgan
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
          <Box className="category_title">Oshxona manzili</Box>
          <iframe
            style={{ marginTop: "60px" }}
            src="https://www.google.com/maps/place/%D0%A0%D0%B0%D0%B9%D1%85%D0%BE%D0%BD/@41.3225422,69.230487,15.47z/data=!4m5!3m4!1s0x0:0x9c5015eab678e435!8m2!3d41.3226993!4d69.2289191?hl=ko"
            width="1320"
            height={"500"}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
