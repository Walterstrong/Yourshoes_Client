import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import "../../../css/order.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";

export function OrdersPage() {
  /** INITIALIZATIONS **/
  const [value, setValue] = useState("1");
  console.log("PASSED HERE");
  console.log("value:", value);

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  return (
    <div className={"order_page"}>
      <Container
        style={{ display: "flex", flexDirection: "row" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  value={value}
                  aria-label="basic tabs example"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab label="Buyurtmalarim" value={"1"} />
                  <Tab label="Jarayon" value={"2"} />
                  <Tab label="Yakunlangan" value={"3"} />
                </TabList>
              </Box>
            </Box>
            <Stack className={"order_main_content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order_right"}>
          <Box className={"order_info_box"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <div className={"order_user_img"}>
                <img
                  src={"/auth/default_user.svg"}
                  className={"order_user_avatar"}
                />
                <div className={"order_user_icon_box"}>
                  <img
                    src={"/icons/user_icon.svg"}
                    className={"order_user_prof_img"}
                  />
                </div>
              </div>
              <span className={"order_user_name"}>martin</span>
              <span className={"order_user_prof"}>Foydalanuvchi</span>
            </Box>
            <Box
              style={{ border: "1px solid #A1A1A1" }}
              width={"100%"}
              sx={{ mt: "40px", mb: "8px" }}
            ></Box>
            <Box className={"order_user_address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div className={"spec_address_txt"}>Tashkent, Yunus Abad 4</div>
            </Box>
          </Box>
          <Box className={"order_info_box"} sx={{ mt: "15px" }}>
            <input
              type={"text"}
              name={"card_number"}
              placeholder={"Card number : 5243 4090 2002 7495"}
              className={"card_input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input
                type={"text"}
                name={"card_period"}
                placeholder={"07 / 24"}
                className={"card_half_input"}
              />
              <input
                type={"text"}
                name={"card_cvv"}
                placeholder={"CVV : 010"}
                className={"card_half_input"}
              />
            </div>
            <input
              type={"text"}
              name={"card_creator"}
              placeholder={"Umarov Abdulloh"}
              className={"card_input"}
            />
            <div className={"cards_box"}>
              <img src={"/icons/western_card.svg"} />
              <img src={"/icons/master_card.svg"} />
              <img src={"/icons/paypal_card.svg"} />
              <img src={"/icons/visa_card.svg"} />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
