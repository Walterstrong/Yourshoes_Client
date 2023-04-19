import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectMemberPage = (state: AppRootState) => state.memberPage;

export const retrieveChosenMember = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMember
);

export const retrieveChosenMemberBoArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMemberBoArticles
);

export const retrieveChosenSingleBoArticle = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenSingleBoArticle
);

export const retrieveMemberFollowers = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowers
);

export const retrieveMemberFollowings = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowings
);

export const retrieveTargetComments = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.targetComments
);
