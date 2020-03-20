import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //redux不能异步，用了thunk就能异步了，applyMiddleware里面放需要使用的中间件
import reducers from "../reducers";
import { Session } from "@utils/storage";
function store(initialState) {
  const token = Session.get("token");
  if (token) {
    initialState = Object.assign({}, initialState, {
      loginReducer: { token }
    });
  }
  // const store = createStore(reducer, applyMiddleware(thunk));
  let createStoreWithMiddleware;
  // 非production环境，添加redux-logger中间件
  if (process.env.NODE_ENV !== "production") {
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  } else {
    const { createLogger } = require("redux-logger");
    createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);
  }
  const store = createStoreWithMiddleware(reducers, initialState);
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index");
      // store.replaceReducer(nextRootReducer); 用于替换 store 中原原有的 reducer
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export default store;
