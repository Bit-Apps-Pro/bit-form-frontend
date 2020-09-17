const path = require('path');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = (env, argv) => {
  const production = argv.mode === 'production';
  return {
    entry: {
      index: path.resolve(__dirname, 'src/index.js'),
      bitformsFrontend: path.resolve(__dirname, 'src/user-frontend/index.js'),
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
      path: path.resolve(__dirname, '../assets/js/'),
      chunkFilename: '[name].js?[hash:6]',
      library: '_bitforms',
      libraryTarget: 'umd',
    },
    /*  devServer: {
       contentBase: path.join(__dirname, '../assets/js/'),
       hot: true,
     }, */
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
      minimizer: [
        new UglifyJsPlugin({
          cache: !production,
          parallel: true,
          test: /\.js(\?.*)?$/i,
          uglifyOptions: {
            output: {
              comments: /^\**!|@preserve|@license/,
            },
            compress: {
              drop_console: production && true,
            },
          },
        }),
      ],
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        cache: !production,
        filename: '../../views/view-root.php',
        path: path.resolve('../views/'),
        template: `${__dirname}/public/wp_index.html`,
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
          ? JSON.stringify('production')
          : JSON.stringify('development'),
      }),
      new MiniCssExtractPlugin({
        filename: '../css/[name].css?[hash:6]',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'manifest.json'),
            to: path.resolve(__dirname, '../assets/js/manifest.json'),
          },
          {
            from: path.resolve(__dirname, 'bitform-logo-icon.ico'),
            to: path.resolve(__dirname, '../assets/img/bitform-logo-icon.ico'),
          },
          {
            from: path.resolve(__dirname, 'logo-256.png'),
            to: path.resolve(__dirname, '../assets/img/logo-256.png'),
          },
          {
            from: path.resolve(__dirname, 'logo-bg.svg'),
            to: path.resolve(__dirname, '../assets/img/logo-bg.svg'),
          },
          {
            from: path.resolve(__dirname, 'logo.svg'),
            to: path.resolve(__dirname, '../assets/img/logo.svg'),
          },
          {
            from: path.resolve(__dirname, 'redirect.php'),
            to: path.resolve(__dirname, '../assets/js/index.php'),
          },
        ],
      }),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
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
            // production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // only enable hot in development
                hmr: process.env.NODE_ENV === 'development',
                // if hmr does not work, this is a forceful method.
                reloadAll: true,
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  autoprefixer,
                ],
                minimize: true,

                hmr: !production,
                reloadAll: true,
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
