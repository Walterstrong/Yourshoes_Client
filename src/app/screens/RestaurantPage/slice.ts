import { RestaurantPageState } from "../../../types/screen";
import { createSlice } from "@reduxjs/toolkit";
//

const initialState: RestaurantPageState = {
  targetRestaurants: [],
  randomRestaurants: [],
  chosenRestaurant: null,
  targetProducts: [],
  chosenProduct: null,
  targetComments: [],
};

const restaurantPageSlice = createSlice({
  name: "restaurantPage",
  initialState,
  reducers: {
    setTargetRestaurants: (state, action) => {
      state.targetRestaurants = action.payload;
    },
    setRandomRestaurants: (state, action) => {
      state.randomRestaurants = action.payload;
    },
    setChosenRestaurant: (state, action) => {
      state.chosenRestaurant = action.payload;
    },

    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setTargetComments: (state, action) => {
      state.targetComments = action.payload;
    },
  },
});

export const {
  setTargetRestaurants,
  setRandomRestaurants,
  setChosenRestaurant,
  setTargetProducts,
  setChosenProduct,
  setTargetComments,
} = restaurantPageSlice.actions;

const RestaurantPageReducer = restaurantPageSlice.reducer;
export default RestaurantPageReducer;
