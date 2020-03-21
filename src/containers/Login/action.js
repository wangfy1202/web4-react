import { Request, API, Storage } from "@utils";
export const LOGIN = "Login";

export const loginAction = (data, callback) => async dispatch => {
  let response = await Request({
    url: API.common.login,
    data,
    headers: { token: data.result }
  });
  console.log(response);
  console.log(dispatch);
  // dispatch({ type: LOGIN, data: { token: "123" } });
  // Storage.Session.set("token", "123");
  Storage.Session.set("user", JSON.stringify(data.username));
  if (callback) {
    callback();
  }
};
