const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");
const ENV = process.env.NODE_ENV;
// console.log(ENV);
// console.log(process);

const makePlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "src/json/", to: "json/" }]) //复制文件，from复制的文件地址，to复制到的地方
  ];

  const files = fs.readdirSync(path.resolve(__dirname, "../dll"));
  files.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, "../dll", file),
          outputPath: "js",
          publicPath: "js",
          hash: true,
          includeSourcemap: false
        })
      );
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "../dll", file)
        })
      );
    }
  });
  return plugins;
};

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "eslint-loader",
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "img/",
            limit: 10240
          }
        }
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@config": path.resolve(__dirname, "../config/"), //配置
      "@containers": path.resolve(__dirname, "../src/containers/"), //容器
      "@components": path.resolve(__dirname, "../src/components/"), //组件
      "@contexts": path.resolve(__dirname, "../src/contexts/"), //上下文
      "@styles": path.resolve(__dirname, "../src/styles/"), //样式
      "@utils": path.resolve(__dirname, "../src/utils/"), //实用菜单,使用菜单
      "@image": path.resolve(__dirname, "../src/static/images/") //静态文件
    },
    extensions: [".js", ".jsx", ".less", ".scss"]
  },
  plugins: makePlugins(),
  output: {
    filename: "js/[name].[hash:6].js", //文件名里面增加hash值，文件内容不变hash值不会变，文件内容改变hash值会改变，
    chunkFilename: "js/[name].[hash:6].js", //文件名不改变的时候，浏览器二次加载的时候直接取缓存里面的文件，不用重新加载
    path: path.resolve(__dirname, "../dist")
  }
};
