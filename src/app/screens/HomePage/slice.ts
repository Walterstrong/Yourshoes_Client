import { HomePageState } from "./../../../types/screen";
import { createSlice } from "@reduxjs/toolkit";
//

const initialState: HomePageState = {
  topRestaurants: [],
  bestRestaurants: [],
  trendProducts: [],
  bestBoArticles: [],
  trendBoArticles: [],
  newsBoArticles: [],
};
// Reducerlar malumotlarni storega yozadigan actionlar hissoblanadi, ular initialState ichidagilarni qiymatini o'zgartiradi. Masalan state ichidagi topRestaurantsni olayabmiz va actiondan kelayotgan datani unga payload qilayabmiz,yani redux slicedan kelayotgan datani,s shu orqali o'zgarayabdi, ikkinchi bosqich, homePageSlicedan reducerni storega yuklash. 48-49 qatorlarda buni ko'rishimiz mumkin
const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopRestaurants: (state, action) => {
      state.topRestaurants = action.payload;
    },
    setBestRestaurants: (state, action) => {
      state.bestRestaurants = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setBestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    setTrendBoArticles: (state, action) => {
      state.trendBoArticles = action.payload;
    },
    setNewsBoArticles: (state, action) => {
      state.newsBoArticles = action.payload;
    },
  },
});

export const {
  setTopRestaurants,
  setBestRestaurants,
  setTrendProducts,
  setBestBoArticles,
  setTrendBoArticles,
  setNewsBoArticles,
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
