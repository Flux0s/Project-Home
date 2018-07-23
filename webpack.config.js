const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const outputDirectory = "build";
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: [
    "./src/client/index.js",
    "./src/client/app.scss",
    "./src/client/routes/Components/MDC.js"
  ],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "bundle.css" }
          },
          { loader: "extract-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: { plugins: () => [autoprefixer()] }
          },
          {
            loader: "sass-loader",
            options: { includePaths: ["./node_modules"] }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: { limit: 100000 }
      }
    ]
  },
  devServer: {
    port: 3000,
    open: false,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        pathRewrite: { "^/api": "" }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
