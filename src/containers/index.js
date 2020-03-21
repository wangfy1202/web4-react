import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"; //当处于二级或多级路由状态时，刷新页面，BrowserRouter会将当前路由发送到服务器（基于rul的pathname），HashRouter而不会（因为是hash段,带#号）
import { connect } from "react-redux";
import Loading from "@components/Loading";
// lazy 异步懒加载
const Login = lazy(() => import(/* webpackChunkName: "login" */ "./Login"));
const Main = lazy(() => import(/* webpackChunkName: "login" */ "./Main"));
const App = props => {
  console.log(props);
  return (
    <Router>
      {/* lazy 是 react 提供的组件懒加载的能力，需要Suspense包裹着 */}
      <Suspense fallback={<Loading />}>
        {/*只匹配 一个url*/}
        <Switch>
          {/* exact能够使得路由的匹配更严格一些 */}
          <Route exact path={`/login`} component={Login} />
          <PrivateRoute path={`/`} component={Main} {...props} />
        </Switch>
      </Suspense>
    </Router>
  );
};
const PrivateRoute = props => {
  const { component: Component, token, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => {
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        );
      }}
    />
  );
};
const mapStateToProps = state => ({
  token: state.loginReducer.token
});
export default connect(mapStateToProps)(App);
