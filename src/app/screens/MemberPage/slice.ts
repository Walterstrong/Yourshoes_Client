import { MemberPageState } from "../../../types/screen";
import { createSlice } from "@reduxjs/toolkit";
//

const initialState: MemberPageState = {
  chosenMember: null,
  chosenMemberBoArticles: [],
  chosenSingleBoArticle: null,
  memberFollowers: [],
  memberFollowings: [],
};

const memberPageSlice = createSlice({
  name: "memberPage",
  initialState,
  reducers: {
    setChosenMember: (state, action) => {
      state.chosenMember = action.payload;
    },
    setChosenMemberBoArticles: (state, action) => {
      state.chosenMemberBoArticles = action.payload;
    },
    setChosenSingleBoArticle: (state, action) => {
      state.chosenSingleBoArticle = action.payload;
    },
    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
  },
});

export const {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
  setMemberFollowers,
  setMemberFollowings,
} = memberPageSlice.actions;

const MemberPageReducer = memberPageSlice.reducer;
export default MemberPageReducer;
