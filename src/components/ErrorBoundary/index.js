// Error Boundaries 错误边界，网络异常时显示  https://github.com/landluck/react-go/tree/master/src/lazy
import React from "react"; //PureComponent
import "./style";
// PureComponent 纯函数，浅比较，减少render重新渲染
class ErrorBoundary extends React.PureComponent {
  // 官网的建议是 请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。
  static getDerivedStateFromError(error) {
    //static getDerivedStateFromError渲染备用 UI    静态方法来处理错误
    console.log(error);
    return { isError: true }; // 更新状态来显示错误触发的UI
  }
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidCatch(error, info) {
    //生命周期 componentDidCatch 来处理错误，官方推荐在此打印错误信息
    console.log(error);
    console.log(info);
    // this.setState({ hasError: true });
    // logErrorToMyService(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="errorPage">
          <h1>This Page Not Available</h1>
          <button onClick={() => location.reload()}>Reload</button>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
export default ErrorBoundary;
