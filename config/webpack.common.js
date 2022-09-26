const rootPath = require("./rootPath");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const baseCSSLoader = [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      importLoaders: 1,
    },
  },
  "postcss-loader",
];

const common = {
  entry: "./src/app.js",
  output: {
    path: rootPath("./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...baseCSSLoader],
      },
      {
        test: /\.less$/,
        use: [...baseCSSLoader, "less-loader"],
      },
      {
        test: /\.scss$/,
        use: [...baseCSSLoader, "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new HtmlWebpackPlugin({
      title: "haha123",
      template: rootPath("./public/index.html"),
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: rootPath("./public/favicon.ico") }],
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
};

module.exports = (env) => {
  const { merge } = require("webpack-merge");
  if (env.production) {
    return merge(common, require("./webpack.prod"));
  } else {
    return merge(common, require("./webpack.dev"));
  }
};
