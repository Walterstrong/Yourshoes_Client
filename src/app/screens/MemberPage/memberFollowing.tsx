import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers, setMemberFollowings } from "./slice";
import { Member } from "../../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { retrieveMemberFollowers, retrieveMemberFollowings } from "./selector";
import { BoArticle } from "types/boArticle";
import { Follower, Following } from "types/follow";

// REDUX SLICE

const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});

// REDUX SELECTOR
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);
const followings = [
  { mb_nick: "ravshan" },
  { mb_nick: "ulugbek" },
  { mb_nick: "temur" },
];

export function MemberFollowing(props: any) {
  /** INITIALIZATIONSS **/
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);

  return (
    <Stack>
      {followings.map((following) => {
        const image_url = "/auth/default_user.svg";
        return (
          <Box className={"follow_box"}>
            <Avatar alt={""} src={image_url} sx={{ width: 89, height: 89 }} />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className={"username_text"}>USER</span>
              <span className={"name_text"}>{following.mb_nick}</span>
            </div>

            {props.actions_enabled && (
              <Button
                variant={"contained"}
                startIcon={
                  <img
                    src={"/icons/follow_icon.svg"}
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
                className={"follow_cancel_btn"}
              >
                Bekor Qilish
              </Button>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
