import React, { useEffect, useState } from "react";
import { Box, Stack, Link } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import Typography from "@mui/joy/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function TargetArticles(props: any) {
  return (
    <Stack>
      {props.targetBoArticles?.map((article: any, index: string) => {
        const art_image_url = "/restaurant/top5.jpg";
        return (
          <Link
            className="all_article_box"
            sx={{ textDecoration: "none" }}
            href={``}
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${art_image_url})` }}
            ></Box>
            <Box className="all_article_container">
              <Box alignItems="center" display="flex">
                <img
                  src="/auth/default_user.svg"
                  width="35px"
                  style={{
                    borderRadius: "50%",
                    backgroundSize: "cover",
                    marginTop: "15px",
                  }}
                />
                <span className="all_article_author_user">@walter</span>
              </Box>
              <Box display="flex" flexDirection="column" sx={{ mt: "15px" }}>
                {/* <span className="all_article_title">evaluation</span> */}
                <p className="all_article_desc">
                  Texas De Brazil is best of the best
                </p>
              </Box>

              <Box className="article_bottom_side">
                <Box>
                  <VisibilityIcon
                    sx={{ fontSize: 20, marginLeft: "20px", marginTop: "5px" }}
                  />
                </Box>
                <span
                  style={{
                    fontSize: 20,
                    marginLeft: "15px",
                    // marginTop: "5px",
                  }}
                >
                  1000
                </span>
                <Box>
                  <Favorite
                    style={{
                      color: "red",
                      marginTop: "10px",
                      fontSize: 20,
                      marginLeft: "15px",
                    }}
                  />
                </Box>
                <span
                  style={{
                    fontSize: 20,
                    marginLeft: "15px",
                    // marginTop: "5px",
                  }}
                >
                  500
                </span>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
