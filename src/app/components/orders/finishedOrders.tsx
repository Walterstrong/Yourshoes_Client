import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import moment from "moment";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../lib/config";

// REDUX SELECTOR
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);
export default function FinishedOrders(props: any) {
  //** INITIALIZATIONS */
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>{product.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>${item.item_price}</p>
                        <img src={"./icons/Close.svg"} />
                        <p>{item.item_quantity}</p>
                        <img src={"./icons/Pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box red_solid"}>
                <Box className={"boxTotal"}>
                  <p>
                    <b>product price:</b>
                  </p>
                  <p style={{ color: "red" }}>
                    <b>
                      ${order.order_total_amount - order.order_delivery_cost}
                    </b>
                  </p>
                  <img
                    src={"./icons/Plus.svg"}
                    style={{ marginLeft: "10px" }}
                  />
                  <p>
                    <b>delivery price:</b>
                  </p>
                  <p style={{ color: "red" }}>
                    <b>${order.order_delivery_cost}</b>
                  </p>
                  <img
                    src={"./icons/Pause.svg"}
                    style={{ marginLeft: "10px" }}
                  />
                  <p>
                    <b>total price:</b>
                  </p>
                  <p style={{ color: "red" }}>
                    <b>${order.order_total_amount}</b>
                  </p>
                  <p className={"data_compl"} style={{ marginLeft: "150px" }}>
                    {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                  </p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
