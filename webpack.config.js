const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = (env, argv) => {
  const production = argv.mode === 'production';
  return {
    entry: {
      index: path.resolve(__dirname, 'src/index.js'),
      bitformsFrontend: ['babel-polyfill', path.resolve(__dirname, 'src/user-frontend/index.js')],
      'bitforms-shortcode-block': path.resolve(__dirname, 'src/gutenberg-block/shortcode-block.jsx'),
      bitforms: path.resolve(__dirname, 'src/resource/sass/app.scss'),
      'bitforms-file': path.resolve(__dirname, 'src/resource/js/file-upload'),
      components: [
        path.resolve(__dirname, 'src/resource/sass/components.scss'),
        path.resolve(__dirname, 'src/resource/css/slimselect.min.css'),
        path.resolve(__dirname, 'node_modules/react-multiple-select-dropdown-lite/dist/index.css'),
      ],
    },

    output: {
      filename: '[name].js',
      path: path.resolve('../assets/js/'),
      chunkFilename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd',
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          main: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors-main',
            chunks: chunk => chunk.name === 'index',
          },
          frontend: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors-frontend',
            chunks: chunk => chunk.name === 'bitformsFrontend',
          },
          gutenbergBlock: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors-block',
            chunks: chunk => chunk.name === 'bitforms-shortcode-block',
          },
        },
      },
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: '../../views/view-root.php',
        path: path.resolve('../views/'),
        template: `${__dirname}/public/index.html`,
        // inject: 'true',
        chunks: ['webpackAssets'],
        chunksSortMode: 'auto',
      }),
      /* new PreloadWebpackPlugin({
        rel: 'preload',
        include: ['vendors-main']
      }), */
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': production
          ? JSON.stringify('development')
          : JSON.stringify('production'),
      }),
      new MiniCssExtractPlugin({
        filename: '../css/[name].css',
      }),
    ],

    devtool: production ? '' : 'source-map',

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules\/(?!react-table-sticky)/,
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  corejs: 3,
                  targets: {
                    browsers: ['>0.2%', 'ie 11', 'not dead', 'not op_mini all'],
                  },
                },
              ],
            ],
            plugins: ['@babel/proposal-class-properties'],
          },
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            production ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  autoprefixer,
                ],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|ttf|woff|woff2|eot)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1,
                name: '[name].[ext]',
                outputPath: '../img',
              },
            },
          ],
        },
      ],
    },
  };
};
