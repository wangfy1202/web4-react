const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    overlay: true, //本地起服务的时候，报错继续进行，但在浏览器上显示
    contentBase: path.join(__dirname, "dist"),
    open: true,
    port: 8080,
    // hot: true,
    // hotOnly: true,
    // progress: true,   //显示打包的文件和进度
    historyApiFallback: true,
    //proxy 代理前端开发环境解决跨域的问题 node写一个中间层
    proxy: {
      // "/react/api": "http://www.dell-lee.com"
      "/": {
        // 凡是"/"开始的接口地址都转到 target这个地址下面
        target: "http://www.dell-lee.com",
        // changeOrigin 改变源devServer会帮我们起一个服务
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
              // modules: true    //CSS是否模块化
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    // usedExports: true  //开发环境  Tree Shaking  去除不用的代码
  }
});
