import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { CartItem } from "../../../types/others";

import { sweetErrorHandling } from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import OrderApiService from "../../apiServices/orderApiService";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "app/apiServices/verify";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Basket(props: any) {
  /** INITIALIZATIONS **/
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const itemsPrice = cartItems.reduce(
    (a: any, c: CartItem) => a + c.price * c.quantity,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 2;
  const totalPrice = itemsPrice + shippingPrice;

  /** HANDLERS **/
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const processOrderHandler = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const order = new OrderApiService();
      await order.createOrder(cartItems);

      onDeleteAll();
      handleClose();
      props.setOrderRebuild(new Date());
      history.push("/orders");
    } catch (err: any) {
      handleClose();
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <Box
            style={{
              background: "#755BB4",
              width: "35px",
              height: "35px",
              borderRadius: "24px",
            }}
          >
            <img
              style={{ padding: "6px" }}
              src={"/icons/shopping_cart.svg"}
              alt=""
            />
          </Box>
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket_frame"}>
          <Box className={"all_check_box"}>
            {false ? <div>Cart is empty!</div> : <div>Shopping List:</div>}
          </Box>

          <Box className={"orders_main_wrapper"}>
            <Box className={"orders_wrapper"}>
              {cartItems?.map((item: CartItem) => {
                const image_path = `http://178.16.142.232:3003/${item.image}`;
                return (
                  <Box className={"basket_info_box"}>
                    <div className={"cancel_btn"}>
                      <DeleteIcon
                        color={"primary"}
                        onClick={() => onDelete(item)}
                      />
                    </div>
                    <img src={image_path} className={"product_img"} alt="" />
                    <span className={"product_name"}>{item.name}</span>

                    <Box
                      flexDirection={"column"}
                      sx={{ minWidth: 120, marginLeft: "20px" }}
                    >
                      <Box className={"product_price"}>
                        <p>
                          {" "}
                          ${item.price} x {item.quantity}
                        </p>
                        <Box
                          className="price_button"
                          sx={{ marginLeft: "10px" }}
                        >
                          <button onClick={() => onAdd(item)} className="add">
                            +
                          </button>
                          <button
                            onClick={() => onRemove(item)}
                            className="remove"
                          >
                            -
                          </button>
                        </Box>
                      </Box>
                      <div className="col-2"></div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cartItems.length > 0 ? (
            <Box className={"to_order_box"}>
              <span className={"price_text"}>
                Total: ${totalPrice} ({itemsPrice} + {shippingPrice})
              </span>
              <Button
                onClick={processOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
              >
                Making order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
