import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pushList } from "./actions";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  changeValue = e => {
    // console.log(e.target.value);
    this.setState({ value: e.target.value });
  };
  clickBtn = () => {
    const { pushList } = this.props;
    pushList(this.state.value);
  };
  render() {
    return (
      <div>
        <div>This is App</div>
        <input onChange={this.changeValue} />
        <button onClick={this.clickBtn}>增加</button>
        {this.props.list.map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  list: state.indexReducer.list,
  lists: state.indexReducer.lists
});
const mapDispatchToProps = dispatch => ({
  //   1、判断传入的参数是否是object，如果是函数，就直接返回一个包裹dispatch的函数
  // 2、如果是object，就根据相应的key，生成包裹dispatch的函数即可
  pushList: bindActionCreators(pushList, dispatch)
});
// 通过connect连接组件和redux数据和dispatch方法
export default connect(mapStateToProps, mapDispatchToProps)(List);
