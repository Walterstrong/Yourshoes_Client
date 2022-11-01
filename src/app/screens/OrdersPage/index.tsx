import React from "react";
import { Container } from "@mui/material";
import "../../../css/order.css";
import Tab from "@mui/lab/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Stack, Container } from "@mui/material";

import PausedOrders from "../../components/headers/orders/pausedOrders";
import ProcessOrders from "../../components/headers/orders/processOrders";
import FinisheddOrders from "../../components/headers/orders/finishedOrders";

export function OrdersPage() {
  return (
    <div className="order_page">
      <Container>OrdersPage</Container>
    </div>
  );
}
