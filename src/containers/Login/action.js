export const LOGIN = "Login";

export const loginAction = (data, callback) => async dispatch => {
  dispatch({ type: LOGIN, data: { token: "123" } });
  if (callback) {
    callback();
  }
};
