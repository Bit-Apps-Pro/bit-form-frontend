const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin')

function generateWebpackConfig({ dir }) {
  const packageJson = require(`${dir}/package.json`) // eslint-disable-line global-require, import/no-unresolved, import/no-dynamic-require
  const inputFileName = packageJson.name
  const libName = `bf_${packageJson.name.replace('-', '_')}`
  const inputFilePath = `${dir}/src/${inputFileName}.js`
  const outputFileName = `${inputFileName}.min.js`

  return {
    entry: inputFilePath,
    output: {
      path: path.resolve(dir, 'dist'),
      filename: outputFileName,
      clean: true,
      library: {
        name: libName,
        type: 'umd',
      },

    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { targets: '> 2%' },
              ],
            ],
            exclude: 'node_modules/**',
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: {
              // properties: true
            },
          },
        }),
      ],
    },
  }
}
module.exports = { generateWebpackConfig }
