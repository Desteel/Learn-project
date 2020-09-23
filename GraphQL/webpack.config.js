const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const FILENAME = "server";

const PATHES = {
  SOURCE: path.join(__dirname, "./src"),
  BUILD: path.join(__dirname, "./dist"),
  DEV: path.join(__dirname, "./dev"),
  TS_CONFIG: path.join(__dirname, "./tsconfig.json")
};

const graphqlLoaderConfig = {
  test: /\.graphql?$/,
  use: [
    {
      loader: "webpack-graphql-loader",
      options: {
        validate: true
      }
    }
  ]
};

module.exports = env => ({
  mode: env.production ? "production" : "development",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    index: `${PATHES.SOURCE}/${FILENAME}.ts`
  },
  output: {
    filename: `${FILENAME}.js`,
    path: env.production ? PATHES.BUILD : PATHES.DEV
  },
  resolve: {
    extensions: [".ts"],
    plugins: [new TsconfigPathsPlugin({ configFile: PATHES.TS_CONFIG })]
  },
  module: {
    rules: [
      {
        test: [/\.ts$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      graphqlLoaderConfig
    ]
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin({
      watch: PATHES.SOURCE,
      ext: "ts",
      delay: "1000"
    })
  ]
});
