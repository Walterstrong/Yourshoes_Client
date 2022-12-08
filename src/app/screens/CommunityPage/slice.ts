import { CommunityPageState } from "../../../types/screen";
import { createSlice } from "@reduxjs/toolkit";
//

const initialState: CommunityPageState = {
  targetBoArticles: [],
};

const communityPageSlice = createSlice({
  name: "communityPage",
  initialState,
  reducers: {
    setTargetBoArticles: (state, action) => {
      state.targetBoArticles = action.payload;
    },
  },
});

export const { setTargetBoArticles } = communityPageSlice.actions;

const CommunityPageReducer = communityPageSlice.reducer;
export default CommunityPageReducer;
