import { combineReducers } from "redux";
import { PUSH_LIST } from "../actions";
const initialState = {
  token: null,
  list: ["火影忍者", "海贼王", "中华小当家"]
};
const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_LIST:
      return { ...state, lists: action.data };
    default:
      return state;
  }
  // if (action.type === PUSH_LIST) {
  //   let newState = JSON.parse(JSON.stringify(state));
  //   newState.list.push(action.data);
  //   return newState;
  // }
  // return state;
};
// 通过combineReducers把多个reducer合并
const rootReducers = combineReducers({
  indexReducer
});
export default rootReducers;
