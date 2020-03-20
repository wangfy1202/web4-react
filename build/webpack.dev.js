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
    historyApiFallback: true,
    proxy: {
      "/react/api": "http://www.dell-lee.com"
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
