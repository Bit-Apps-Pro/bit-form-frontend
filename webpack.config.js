const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  let production = argv.mode === "production";
  return {
    entry: {
      index: path.resolve(__dirname, "src/index.js")
    },

    output: {
      filename: "[name].js",
      path: path.resolve("../assets/js/"),
      chunkFilename: "[name].js"
    },

    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          },
          styles: {
            name: 'bitapps-styles',
            test: /\.(s[ac]ss|css)$/i,
            chunks: 'all',
            enforce: true,
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "../../views/view-root.php",
        path: path.resolve("../views/"),
        template: __dirname + "/public/index.html",
        inject: "true",
        chunks: ["webpackAssets"]
        // chunksSortMode: 'dependency'
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": production
          ? JSON.stringify("development")
          : JSON.stringify("production")
      })
    ],

    devtool: production ? "" : "source-map",

    resolve: {
      extensions: [".js", ".jsx", ".json"]
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: [">0.2%", "ie 11", "not dead", "not op_mini all"]
                  }
                }
              ]
            ],
            plugins: ["@babel/proposal-class-properties"]
          }
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 1,
                name: "[name].[ext]",
                outputPath: "../img"
              }
            }
          ]
        }
      ]
    }
  };
};
