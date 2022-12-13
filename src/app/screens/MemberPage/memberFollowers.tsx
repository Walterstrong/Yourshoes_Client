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
import { retrieveMemberFollowers } from "./selector";
import { BoArticle } from "types/boArticle";
import { Follower, FollowSearchObj } from "types/follow";
import FollowApiService from "app/apiServices/followApiService";
import { serverApi } from "app/lib/config";
import assert from "assert";
import { Definer } from "app/lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "app/lib/sweetAlert";

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
  const { setFollowRebuild, mb_id, followRebuild } = props;
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>(
    { page: 1, limit: 5, mb_id: mb_id }
  );

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers(followersSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [followersSearchObj, followRebuild]);

  //** HANDLERS */

  const handlePaginationChange = (event: any, value: number) => {
    followersSearchObj.page = value;
    setFollowersSearchObj({ ...followersSearchObj });
  };

  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.subscribe(id);

      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack>
      {memberFollowers.map((follower: Follower) => {
        const image_url = follower?.subscriber_member_data?.mb_image
          ? `${serverApi}/${follower.subscriber_member_data.mb_image}`
          : "/auth/default_user.svg";
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
              <span className={"username_text"}>
                {follower?.subscriber_member_data?.mb_type}
              </span>
              <span className={"name_text"}>
                {follower?.subscriber_member_data?.mb_nick}
              </span>
            </div>
            {props.actions_enabled &&
              (follower?.me_followed &&
              follower?.me_followed[0]?.my_following ? (
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
                  onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                >
                  Follow Back
                </Button>
              ))}
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box className={"bottom_box"}>
          <Pagination
            count={
              followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3
            }
            page={followersSearchObj.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
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
