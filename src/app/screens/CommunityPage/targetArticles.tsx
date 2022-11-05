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
                <p className="all_article_desc">
                  Texas De Brazil is best of the best
                </p>
              </Box>
              <Box
                className="article_share_main"
                style={{
                  color: "#fff",
                  marginLeft: "150px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>{moment().format("YY-MM-DD HH:mm")}</span>
                <Checkbox
                  sx={{ ml: "40px" }}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite style={{ color: "red" }} />}
                  checked={false}
                />
                <span style={{ marginLeft: "18px" }}>100</span>
                <RemoveRedEyeIcon style={{ marginLeft: "18px" }} />
                <span style={{ marginLeft: "18px" }}>1000</span>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
