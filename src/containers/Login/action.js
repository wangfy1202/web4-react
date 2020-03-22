import { Request, API, Storage } from "@utils";
// import axios from "axios";
export const LOGIN = "Login";

export const loginAction = (data, callback) => async dispatch => {
  let response = await Request({
    url: API.common.login,
    data,
    headers: { token: data.result }
  });
  // axios("http://www.dell-lee.com/react/api/header.json").then(res => console.log(res));
  if (response.status) {
    dispatch({ type: LOGIN, data: { token: response.result } });
    Storage.Session.set("token", response.result);
    Storage.Session.set("user", JSON.stringify(data.username));
    if (callback) {
      callback();
    }
  }
};
