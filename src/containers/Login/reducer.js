import { LOGIN } from "./action";

const initialState = {
  token: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.data };
    default:
      return state;
  }
};

export default loginReducer;
