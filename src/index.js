// function getComponent(){
//     return import(/* webpackChunkName: lodash*/ 'lodash').then(({ default: _}) => {
//         const element = document.createElement("div");
//         element.innerHTML = _.join(["Dell","Lee"],"-")
//         return element;
//     })
// }
// document.addEventListener("click",() => {
//     getComponent().then(element => {
//         document.getElementById('root').appendChild(element)
//     })
// })

// async function getComponent(){
//     const { default: _ } = await import(/* webpackChunkName: "lodash"*/ 'lodash');
//     const element = document.createElement("div");
//     element.innerHTML = _.join(["wang","yang"], "-");
//     return element;
// }
// document.addEventListener("click",() => {
//     getComponent().then(element => {
//         document.getElementById('root').appendChild(element)
//     })
// })
// webpackPrefetch
// document.addEventListener('click', () => {
//     import(/* webpackPrefetch: true*/ './click.js').then(({default: func}) => {
//         func()
//     })
// })

// import './css./index.css'
// import './css./index.scss'

// import React, { Component } from "react";
// import ReactDom from "react-dom";
// import axios from "axios";
// import { BrowserRouter, Route } from "react-router-dom";
// import Home from "./home";
// import List from "./list";

// class App extends Component {
//   componentDidMount() {
//     axios.get("/react/api/header.json").then(res => {
//       console.log(res);
//     });
//   }

//   render() {
//     return (
//       <BrowserRouter>
//         <div>
//           <Route path="/" exact component={Home} />
//           <Route path="/list" exact component={List} />
//         </div>
//       </BrowserRouter>
//     );
//   }
// }

// ReactDom.render(<App />, document.getElementById("root"));

import React, { Component } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import createStore from "./store";
import App from "@containers";
import ErrorBoundary from "./components/ErrorBoundary";
import "@utils/rem";
const store = createStore();

// 非production环境，动态的使用eruda
// if (process.env.NODE_ENV !== "production") {
//   const src = "//cdn.jsdelivr.net/npm/eruda";
//   document.write("<script src=" + src + "></script>");
//   document.write("<script>eruda.init();</script>");
// }

class Index extends Component {
  render() {
    return (
      <ErrorBoundary>
        {/* 通过Provider把redux和react连接，store传递到react项目中 */}
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    );
  }
}

ReactDom.render(<Index />, document.getElementById("root"));
