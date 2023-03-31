import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

//bu yerda har birini malumotlarni selector orqali malumotlarini olib olinayabdi

const selectRestaurantPage = (state: AppRootState) => state.restaurantPage;

export const retrieveTargetRestaurants = createSelector(
  selectRestaurantPage,
  (RestaurantPage) => RestaurantPage.targetRestaurants
);

export const retrieveRandomRestaurants = createSelector(
  selectRestaurantPage,
  (RestaurantPage) => RestaurantPage.randomRestaurants
);

export const retrieveChosenRestaurant = createSelector(
  selectRestaurantPage,
  (RestaurantPage) => RestaurantPage.chosenRestaurant
);

export const retrieveTargetProducts = createSelector(
  selectRestaurantPage,
  (RestaurantPage) => RestaurantPage.targetProducts
);

export const retrieveChosenProduct = createSelector(
  selectRestaurantPage,
  (RestaurantPage) => RestaurantPage.chosenProduct
);

export const retrieveTargetComments = createSelector(
  selectRestaurantPage,
  (RestaurantPage) => RestaurantPage.targetComments
);
