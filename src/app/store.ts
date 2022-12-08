import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homepage/slice";
import reduxLogger from "redux-logger";
import RestaurantPageReducer from "./screens/restaurantpage/slice";
import OrdersPageReducer from "./screens/orderspage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer, // slicedan  reducerni chaqirib olish
    restaurantPage: RestaurantPageReducer,
    ordersPage: OrdersPageReducer, // slicedan  reducerni chaqirib olish
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
