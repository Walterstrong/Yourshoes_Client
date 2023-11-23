import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";

import OrderApiService from "../../apiServices/orderApiService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Member } from "../../../types/user";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { http://localhost:3003 } from "../../lib/config";

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
        {processOrders?.map((order: Order) => {
          const mb_image_url =
            verifiedMemberData?.mb_image ?? "/auth/default_user.svg";
          return (
            <Stack className={"order_card"}>
              <Stack className={"order_card_full"}>
                <Stack className={"card_details"}>
                  <p>Card Details</p>
                  <img src={mb_image_url} />
                </Stack>
                <Box className={"card_type"}>Card type</Box>
                <Stack className={"card_images"}>
                  <img
                    src={"/icons/western_card.svg"}
                    style={{ width: "75px", height: "55px" }}
                  />
                  <img
                    src={"/icons/master_card.svg"}
                    style={{ width: "75px", height: "55px" }}
                  />
                  <img
                    src={"/icons/paypal_card.svg"}
                    style={{ width: "75px", height: "55px" }}
                  />
                  <img
                    src={"/icons/visa_card.svg"}
                    style={{ width: "75px", height: "55px" }}
                  />
                </Stack>
                <Box className={"card_name"}>Name on card</Box>
                <Box>
                  <div>
                    <input
                      type={"text"}
                      name={"card_period"}
                      placeholder={`${verifiedMemberData?.mb_nick}`}
                      className={"card_input"}
                    />
                  </div>
                </Box>
                <Box className={"card_name"}>Card Number</Box>
                <Box>
                  <div>
                    <input
                      type={"text"}
                      name={"card_period"}
                      placeholder={"1111 2222 3333 4444"}
                      className={"card_input"}
                    />
                  </div>
                </Box>
                <Stack className={"card_half"}>
                  <Box className={"card_name"}>Expiration date</Box>
                  <Box className={"card_name_2"}>CVV</Box>
                </Stack>
                <Stack className={"card_half"}>
                  <Box>
                    <div>
                      <input
                        type={"text"}
                        name={"card_period"}
                        placeholder={"mm/yy"}
                        className={"card_half_input"}
                      />
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <input
                        type={"text"}
                        name={"card_period"}
                        placeholder={"123"}
                        className={"card_half_input_2"}
                      />
                    </div>
                  </Box>
                </Stack>
                <Box>
                  <img className={"line"} src={"/icons/Line.png"} />
                </Box>
                <Stack className={"card_details_2"}>
                  <p>Subtotal</p>
                  <p style={{ marginRight: "-100px" }}>
                    ${order.order_total_amount - order.order_delivery_cost}
                  </p>
                </Stack>
                <Stack className={"card_details_3"}>
                  <p>Shipping</p>
                  <p style={{ marginRight: "-110px" }}>
                    ${order.order_delivery_cost}
                  </p>
                </Stack>
                <Stack className={"card_details_3"}>
                  <p>Total(Tax incl.)</p>
                  <p style={{ marginRight: "-100px" }}>
                    ${order.order_total_amount}
                  </p>
                </Stack>
                <Box className="button_payment">
                  <p>${order.order_total_amount}</p>
                  <Button
                    value={order._id}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={finishedOrderHandler}
                  >
                    Checkout
                  </Button>
                </Box>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </TabPanel>
  );
}

// <Box className={"order_main_box"}>
//   <Box className={"order_box_scroll"}>
//     {order.order_items.map((item) => {
//       const product: Product = order.product_data.filter(
//         (ele) => ele._id === item.product_id
//       )[0];
//       const image_path = `${http://localhost:3003}/${product.product_images[0]}`;
//       return (
//         <Box className={"ordersName_price"}>
//           <img src={image_path} className={"orderDishImg"} />
//           <p className={"titleDish"}>{product.product_name}</p>
//           <Box className={"priceBox"}>
//             <p>${item.item_price}</p>
//             <img src={"/icons/Close.svg"} />
//             <p>{item.item_quantity}</p>
//             <img src={"/icons/pause.svg"} />
//             <p style={{ marginLeft: "15px" }}>
//               ${item.item_price * item.item_quantity}
//             </p>
//           </Box>
//         </Box>
//       );
//     })}
//   </Box>

//   <Box className={"total_price_box blue_solid"}>
//     <Box className={"boxTotal"}>
//       <p>
//         <b>product price:</b>
//       </p>
//       <p style={{ color: "red" }}>
//         <b>
//           ${order.order_total_amount - order.order_delivery_cost}
//         </b>
//       </p>
//       <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
//       <p>
//         <b>delivery price:</b>
//       </p>
//       <p style={{ color: "red" }}>
//         <b>${order.order_delivery_cost}</b>
//       </p>
//       <img
//         src={"/icons/pause.svg"}
//         style={{ marginLeft: "10px" }}
//       />
//       <p>
//         <b>total price:</b>
//       </p>
//       <p style={{ color: "red" }}>
//         <b>${order.order_total_amount}</b>
//       </p>
//     </Box>
//     <p className={"data_compl"}>
//       {moment(order.createdAt).format("YY-MM-DD HH:mm")}
//     </p>
//     <Button
//       value={order._id}
//       onClick={finishedOrderHandler}
//       variant="contained"
//       style={{
//         background: "#0288D1",
//         color: "#FFFFFF",
//         borderRadius: "10px",
//         boxShadow:
//           "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
//       }}
//     >
//       yakushlash
//     </Button>
//   </Box>
// // // </Box>
// // <Stack className={"order_card_full"}>
// //                 <Box className={"order_info_box"}>
// //                   <Box
// //                     display={"flex"}
// //                     flexDirection={"column"}
// //                     alignItems={"center"}
// //                   >
// //                     <div className={"order_user_img"}>
// //                       <img
// //                         src={
// //                           verifiedMemberData?.mb_image
// //                             ? verifiedMemberData.mb_image
// //                             : "/auth/default_user.svg"
// //                         }
// //                         className={"order_user_avatar"}
// //                       />
// //                       <div className={"order_user_icon_box"}>
// //                         <img
// //                           src={"/icons/user_icon.svg"}
// //                           className={"order_user_prof_img"}
// //                         />
// //                       </div>
// //                     </div>
// //                     <span className={"order_user_name"}>
// //                       {verifiedMemberData?.mb_nick}
// //                     </span>
// //                     <span className={"order_user_prof"}>
// //                       {verifiedMemberData?.mb_type ?? "Foydalanuvchi"}
// //                     </span>
// //                   </Box>
// //                   <div>
// //                     <p>Card type</p>
// //                   </div>
// //                   <div className={"cards_box"}>
// //                     <img
// src={"/icons/western_card.svg"}
// //
// //                     <img src={"/icons/master_card.svg"} />
// //                     <img src={"/icons/paypal_card.svg"} />
// //                     <img src={"/icons/visa_card.svg"} />
// //                   </div>
// //                   <Box
// //                     style={{ border: "1px solid #A1A1A1" }}
// //                     width={"100%"}
// //                     sx={{ mt: "40px", mb: "8px" }}
// //                   ></Box>
// //                   <Box className={"order_user_address"}>
// //                     <div style={{ display: "flex" }}>
//                       <LocationOnIcon />
//                     </div>
//                     <div className={"spec_address_txt"}>
//                       {verifiedMemberData?.mb_address ?? "manzil kitirilmagan"}
//                     </div>
//                   </Box>
//                 </Box>
//                 <Box className={"order_info_box"} sx={{ mt: "15px" }}>
//                   <input
//                     type={"text"}
//                     name={"card_number"}
//                     placeholder={"Card number : 5243 4090 2002 7495"}
//                     className={"card_input"}
//                     style={{
//                       marginLeft: "20px",
//                     }}
//                   />
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <input
//                       type={"text"}
//                       name={"card_period"}
//                       placeholder={"07 / 24"}
//                       className={"card_half_input"}
//                       style={{
//                         marginLeft: "20px",
//                       }}
//                     />
//                     <input
//                       type={"text"}
//                       name={"card_cvv"}
//                       placeholder={"CVV : 010"}
//                       className={"card_half_input"}
//                       style={{
//                         marginRight: "20px",
//                       }}
//                     />
//                   </div>
//                   <input
//                     type={"text"}
//                     name={"card_creator"}
//                     placeholder={"Umarov Abdulloh"}
//                     className={"card_input"}
//                   />
//                 </Box>
//               </Stack
