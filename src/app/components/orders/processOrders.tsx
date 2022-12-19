import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
import { Product } from "../../../types/product";
import { serverApi } from "../../lib/config";
import OrderApiService from "../../apiServices/orderApiService";
import { sweetErrorHandling } from "../../lib/sweetAlert";

// REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export default function ProcessOrders(props: any) {
  //** INITIALIZATIONS */
  const { processOrders } = useSelector(processOrdersRetriever);

  //** HANDLERS */
  const finishedOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "finished" };
      let confirmation = window.confirm("Are you sure you want to finish?");

      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
        props.setValue("3");
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order) => {
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
                        <img src={"/icons/Close.svg"} />
                        <p>{item.item_quantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box blue_solid"}>
                <Box className={"boxTotal"}>
                  <p>mahsulot narxi</p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>yetkazish xizmati</p>
                  <p>${order.order_delivery_cost}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>jami narx</p>
                  <p>${order.order_total_amount}</p>
                </Box>
                <p className={"data_compl"}>
                  {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  onClick={finishedOrderHandler}
                  variant="contained"
                  style={{
                    background: "#0288D1",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    boxShadow:
                      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
                  }}
                >
                  yakushlash
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
