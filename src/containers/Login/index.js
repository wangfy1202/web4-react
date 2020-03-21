import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, WhiteSpace, WingBlank } from "antd-mobile";
import { loginAction } from "./action";

const Login = props => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  useEffect(() => {
    const { token } = props;
    token && setRedirectToReferrer(true);
    return () => {
      window.scrollTo(0, 0); //方法可把内容滚动到指定的坐标(x坐标，y坐标)
    };
  }, []); //第二个参数空数组的话，只第一次执行一次
  if (redirectToReferrer) {
    const { from } = props.location.state || {
      from: { pathname: "/" } // default site
    };
    return <Redirect to={from} />;
  }
  const fnLogin = async () => {
    const value = {
      username: "react",
      password: "webpack4"
    };
    await props.loginAction(value, () => setRedirectToReferrer(true));
  };
  return (
    <WingBlank>
      <WhiteSpace />
      <Button type="primary" onClick={fnLogin}>
        登录
      </Button>
      <WhiteSpace />
    </WingBlank>
  );
};

const mapStateToProps = state => ({
  token: state.loginReducer.token
});
const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
