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
import { retrieveMemberFollowers } from "./selector";
import { BoArticle } from "types/boArticle";
import { Follower } from "types/follow";

const followers = [
  { mb_nick: "botir", following: true },
  { mb_nick: "jonibek", following: false },
  { mb_nick: "larisa", following: true },
];

// REDUX SLICE

const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});

// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

export function MemberFollowers(props: any) {
  /** INITIALIZATIONSS **/
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);

  return (
    <Stack>
      {followers.map((follower) => {
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
              <span className={"name_text"}>{follower.mb_nick}</span>
            </div>
            {props.actions_enabled &&
              (follower.following ? (
                <Button
                  variant={"contained"}
                  className={"following_already"}
                  disabled
                >
                  FOLLOWING
                </Button>
              ) : (
                <Button
                  variant={"contained"}
                  startIcon={
                    <img
                      src={"/icons/follow_icon.svg"}
                      style={{ width: "40px" }}
                    />
                  }
                  className={"follow_btn"}
                >
                  Follow Back
                </Button>
              ))}
          </Box>
        );
      })}
    </Stack>
  );
}
