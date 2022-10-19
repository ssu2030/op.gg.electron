const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopmentMode = !argv || argv.mode === "development";

  const rootPath = path.resolve(__dirname);
  const srcPath = path.join(rootPath, "src");
  const outPath = path.join(rootPath, "dist");

  const serverIP = "0.0.0.0";
  const localIP = "127.0.0.1";
  const serverPort = 3000;

  return {
    entry: path.join(srcPath, "index.tsx"),
    target: ["web", "es5"],
    devtool: isDevelopmentMode ? "source-map" : false,
    output: {
      path: outPath,
    },
    resolve: {
      modules: ["node_modules", srcPath + "/"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: ["ts-loader"] },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
        { test: /\.svg$/, use: ["@svgr/webpack"] },
        { test: /\.(png|jpg|jpeg|gif)$/, type: "asset/resource" },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(rootPath, "Template.html"),
      }),
    ],
    devServer: {
      host: serverIP,
      port: serverPort,
      hot: true,
      open: `http://${localIP}:${serverPort}`,
      historyApiFallback: {
        disableDotRule: true,
      },
      devMiddleware: {
        writeToDisk: true,
      },
    },
  };
};
