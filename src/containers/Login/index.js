import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Login = props => {
  console.log(props);
  const { redirectToReferrer } = useState(false);
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
  return <div>{redirectToReferrer ? "登陆页面" : "报错页面"}</div>;
};

const mapStateToProps = state => ({
  token: state.indexReducer.token
});

export default connect(mapStateToProps)(Login);
