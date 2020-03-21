/**
 * toast
 */
import { Toast } from "antd-mobile";

const fail = (message, duration = 1) => Toast.fail(message, duration);
const success = (message, duration = 1) => Toast.success(message, duration);
const info = (message, duration = 1) => Toast.info(message, duration);
const loading = (message, duration = 0) => Toast.loading(message, duration);
const hide = () => Toast.hide();

export default {
  fail,
  success,
  info,
  loading,
  hide
};
