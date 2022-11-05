import React, { useEffect, useState } from "react";
import "../../../css/order.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Stack, Container } from "@mui/material";
import PausedOrders from "../../components/headers/orders/pausedOrders";
import ProcessOrders from "../../components/headers/orders/processOrders";
import FinisheddOrders from "../../components/headers/orders/finishedOrders";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Typography from "@mui/joy/Typography";
import Marginer from "../../components/headers/marginer";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Textarea from "@mui/joy/Textarea";
import FinishedOrders from "../../components/headers/orders/finishedOrders";
import { borderBottomColor } from "@mui/system";

export function OrdersPage() {
  //INITIALIZATIONS
  const [value, setValue] = useState("1");

  //HANDLERS
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order_page">
      <Container
        maxWidth="lg"
        style={{ display: "flex", flexDirection: "row" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        <Stack className="order_left">
          <TabContext value={value}>
            <Box className="order_nav_frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  value={value}
                  aria-label="basic tabs example"
                  style={{
                    borderBottomColor: "1px solid white",
                    margin: "15px",
                  }}
                >
                  <Tab
                    label="Buyurtmalarim"
                    value={"1"}
                    style={{
                      marginRight: "80px",
                    }}
                  />
                  <Tab
                    label="Jarayon"
                    value={"2"}
                    style={{
                      marginRight: "60px",
                    }}
                  />
                  <Tab
                    label="Yakunlangan"
                    value={"3"}
                    style={{
                      marginLeft: "50px",
                    }}
                  />
                </TabList>
              </Box>
            </Box>
            <Stack className="order_main_content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order_right">
          <Box className="order_info_box">
            <Box display="flex" flexDirection="column" alignItems="center">
              <div className="order_user_img">
                <img src="/restaurant/kaka.png" className="order_user_avatar" />
                <p className="order_user_name">Ismoilov Akmaljon</p>
                <p className="user">Foydalanuvchi</p>
              </div>
              <div className="masdfsfdrginer">
                <Marginer
                  direction="horizontal"
                  height="1"
                  width="323"
                  bg="#A1A1A1"
                />
              </div>
              <p>
                <img src="/icons/location.svg" />
                SEOUL
              </p>
            </Box>
          </Box>
          <Box className="order_form_box">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <input
                type="text"
                name="card_number"
                className="card_number"
                placeholder="Card number: 5423 4090 2002 7495"
                required
              />
              <Box
                className="date_cvv"
                display="flex"
                flexDirection="row"
                justifyContent={"space-between"}
              >
                <input
                  type="text"
                  name="expire_date"
                  className="expire_date"
                  placeholder="07 / 24"
                  required
                />
                <input
                  type="text"
                  name="cvv_number"
                  className="cvv_number"
                  placeholder="CVV : 010"
                  required
                />
              </Box>

              <input
                type="text"
                name="user_name"
                className="user_name"
                placeholder="Umarov Abdulloh"
                required
              />
            </Box>
            <Box className="payment_brands">
              <div>
                <img src="/icons/westernUnion.svg" className="brands_avatars" />
              </div>
              <div>
                <img src="/icons/masterCard.svg" className="brands_avatars" />
              </div>
              <div>
                <img src="/icons/paypal.svg" className="brands_avatars" />
              </div>
              <div>
                <img src="/icons/visa.svg" className="brands_avatars" />
              </div>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
