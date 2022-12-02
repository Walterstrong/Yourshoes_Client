/** SweetAlertHandling **/

import Swal from "sweetalert2";
import { Definer } from "./Definer";

export const sweetErrorHandling = async (
  err: any,
  sweet_off: boolean = false
) => {
  let error_message = err.message.includes("att:")
    ? err.message
    : Definer.general_err1;

  if (sweet_off) {
    alert(error_message);
  } else {
    await Swal.fire({
      icon: "error",
      text: error_message,
      showConfirmButton: false,
    });
  }
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
  window.location.reload();
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000,
  enable_forward: boolean = false
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then((data) => {
    if (enable_forward) {
      window.location.reload();
    }
  });
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  enable_forward: boolean = false,
  forward_url: string = "/"
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then((data) => {
    if (enable_forward) {
      window.location.replace(forward_url);
    }
  });
};
