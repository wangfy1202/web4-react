/**
 * axios
 */
import axios from "axios";
// const axios = require("axios");
// import { Storage } from "@utils";
import { Session as Storage } from "../storage";
const instance = axios.create({
  timeout: 10000,
  headers: {
    version: 1,
    token: Storage.get("token") || "" // token
  }
});
const request = async ({
  url,
  method = "get",
  data = {}
  // headers = { "Content-Type": "application/json" },
  // loading = false,
  // timeout = 30000
}) => {
  const response = await instance({
    url,
    method,
    data
  });
  const responseData = { ...response };
  if (responseData.code === 0) {
    responseData.state = true;
  }
  return responseData;
};

export default request;
