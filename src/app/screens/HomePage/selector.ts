import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

//bu yerda har birini malumotlarni selector orqali malumotlarini olib olinayabdi

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveRandomRestaurants = createSelector(
  selectHomePage,
  (HomePage) => HomePage.randomRestaurants
);
export const retrieveNewProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newProducts
);

export const retrieveBestProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestProducts
);

export const retrieveTrendProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendProducts
);

export const retrieveBestBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestBoArticles
);

export const retrieveTrendBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendBoArticles
);

export const retrieveNewsBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newsBoArticles
);
