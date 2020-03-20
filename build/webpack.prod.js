const merge = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.less/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].css",
      chunkFilename: "css/[contenthash].css"
    })
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime" //兼容老版本，文件内容没有改变，不会改变hash值
    },
    minimizer: [new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      //代码分割
      chunks: "all", //默认async异步  all  全部， 同步
      minChunks: 1, //当一个模块至少用了多少次才做代码分割
      //   minSize: 30000,   //大于30kb代码分割
      //   maxSize: 300000,   //可配可不配，分割成多个300000大小的文件
      maxInitialRequests: 5, //加载首页或入口文件的时候最多可以加载5个代码分割
      automaticNameDelimiter: ".", //用什么连接文件名
      name: false, // vender
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.(less|css|scss)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        // moment: {
        //   chunks: "initial",
        //   test: /[\\/]node_modules[\\/]moment/,
        //   //   test: /node_modules\/moment/,
        //   name: "moment",
        //   priority: -9,
        //   enforce: true
        // },
        vendor: {
          chunks: "initial",
          test: /node_modules/,
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  }
});
