import React, { useEffect, useState } from "react";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
import { Follower, Following, FollowSearchObj } from "types/follow";
import FollowApiService from "app/apiServices/followApiService";
import { serverApi } from "app/lib/config";
import assert from "assert";
import { Definer } from "app/lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "app/lib/sweetAlert";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "app/apiServices/verify";

// REDUX SLICE

const actionDispatch = (dispatch: Dispatch) => ({
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

export function MemberFollowing(props: any) {
  /** INITIALIZATIONSS **/
  const history = useHistory();
  const { setFollowRebuild, mb_id, followRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const [followingsSearchObj, setFollowingsSearchObj] =
    useState<FollowSearchObj>({ page: 1, limit: 6, mb_id: mb_id });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingsSearchObj, followRebuild]);

  //** HANDLERS */

  const handlePaginationChange = (event: any, value: number) => {
    followingsSearchObj.page = value;
    setFollowingsSearchObj({ ...followingsSearchObj });
  };

  const unsubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.unsubscribe(id);

      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };
  return (
    <Stack className="friend_box">
      <Stack className={"followers_content"}>
        {memberFollowings.map((following: Following) => {
          const image_url = following?.follow_member_data?.mb_image
            ? `${serverApi}/${following.follow_member_data.mb_image}`
            : "/auth/person.jpg";
          return (
            <Box className={"follow_box"}>
              <Avatar
                alt={""}
                src={image_url}
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "180px",
                  borderRadius: "10px",
                }}
                onClick={() => visitMemberHandler(following?.follow_id)}
              />
              <div
                style={{
                  // width: "400px",
                  display: "flex",
                  flexDirection: "column",

                  height: "85%",
                }}
              >
                {" "}
                {/* <span className={"username_text"}>
                {following?.follow_member_data?.mb_type}
              </span> */}
                <span
                  className={"name_text"}
                  onClick={() => visitMemberHandler(following?.follow_id)}
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                >
                  {following?.follow_member_data?.mb_nick}
                </span>
              </div>

              {props.actions_enabled && (
                <Button
                  variant={"contained"}
                  // startIcon={
                  //   // <img
                  //   //   src={"/icons/follow_icon.svg"}
                  //   //   style={{ width: "40px", marginLeft: "16px" }}
                  //   // />
                  // }
                  className={"follow_cancel_btn"}
                  onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                >
                  Cancel Following
                </Button>
              )}
            </Box>
          );
        })}
      </Stack>
      <Stack
        sx={{ mt: "100px", ml: "-300px" }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box className={"bottom_box"} style={{ marginLeft: "300px" }}>
          <Pagination
            count={
              followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3
            }
            page={followingsSearchObj.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                style={{ color: "white" }}
                color={"secondary"}
              />
            )}
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
