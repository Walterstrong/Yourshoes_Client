import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

//bu yerda har birini malumotlarni selector orqali malumotlarini olib olinayabdi

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedOrders
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders
);
