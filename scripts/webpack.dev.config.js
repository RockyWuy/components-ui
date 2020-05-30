/*
 * @Author: rockyWu
 * @Date: 2020-05-29 15:41:39
 * @Description:
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-05-30 23:19:24
 */

const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const distDir = path.join(process.cwd(), "dist/dist");
module.exports = {
  mode: "production",
  entry: {
    "rockywu-ui": ["./src/components/**/*.tsx"],
  },
  output: {
    path: distDir,
    library: "rockywuUi",
    libraryTarget: "umd",
    filename: "[name].js",
  },
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: require.resolve("awesome-typescript-loader") }],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        // 压缩 css 与 ExtractTextPlugin 配合使用
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          safe: true,
          autoprefixer: false,
        }, // 移除所有注释
        canPrint: true, // 是否向控制台打印消息
      }),
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".less", ".css"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [distDir],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].min.css", // 提取后的css的文件名
    }),
  ],
};
