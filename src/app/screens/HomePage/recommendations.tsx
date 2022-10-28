import React from "react";
import { Container, Stack, Box, Avatar } from "@mui/material";

export function Recommendations() {
  return (
    <div className="top_article_frame">
      <Container
        maxWidth="lg"
        sx={{ mb: "50px", mt: "60px" }}
        style={{ position: "relative" }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className={"category_title"}>Tavsiya qilingan maqolalar</Box>
          <Stack className="article_main" flexDirection="row">
            <Stack className="article_container">
              <Box className="article_category">Ko'p ko'rilgan</Box>
              <Stack className="article_box">
                <Box
                  className="article_img"
                  sx={{
                    backgroundImage: `url(https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg?auto=compress&cs=tinysrgb&w=800)`,
                  }}
                ></Box>
                <Box className="article_info">
                  <Box className="article_main_info">
                    <div className="article_author">
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className="author_username">Walter</span>
                    </div>
                    <span className="author_title">
                      Eng ajoyib va shirin taomlar shu yerda
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>
              <Stack className="article_box">
                <Box
                  className="article_img"
                  sx={{
                    backgroundImage: `url(https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
                  }}
                ></Box>
                <Box className="article_info">
                  <Box className="article_main_info">
                    <div className="article_author">
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className="author_username">Bill</span>
                    </div>
                    <span className="author_title">
                      Vatan tamini shu yerda his qiling
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>
              <Box className="article_category" sx={{ mt: "5px" }}>
                Ko'p yoqtirilgan
              </Box>
              <Stack className="article_box">
                <Box
                  className="article_img"
                  sx={{
                    backgroundImage: `url(https://images.pexels.com/photos/1247677/pexels-photo-1247677.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load)`,
                  }}
                ></Box>
                <Box className="article_info">
                  <Box className="article_main_info">
                    <div className="article_author">
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className="author_username">Jayms</span>
                    </div>
                    <span className="author_title">
                      Eh!!! ming marta ko'guncha bir marta yeb ko'ring
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>
              <Stack className="article_box">
                <Box
                  className="article_img"
                  sx={{
                    backgroundImage: `url(https://images.pexels.com/photos/2452277/pexels-photo-2452277.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load)`,
                  }}
                ></Box>
                <Box className="article_info">
                  <Box className="article_main_info">
                    <div className="article_author">
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.svg"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className="author_username">Shawn</span>
                    </div>
                    <span className="author_title">
                      Ushbu shirinlik sizga betakror tam uyg'unligini beradi
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>
            </Stack>
            <Stack className="article_container">
              <Box className="article_category">Mashhurlar</Box>
              <Box className="article_news">
                <h1 style={{ color: "orange" }}>TViewer</h1>
              </Box>
              <Box className="article_news">
                <h1 style={{ color: "orange" }}>TViewer</h1>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
