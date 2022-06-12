/* eslint-disable import/no-extraneous-dependencies */
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

const terserOptions = {
  compress: {
    passes: 10,
    drop_console: true,
  },
  // mangle: {
  //   properties: true,
  //   reserved: [
  //     'bit_country_field',
  //   ]
  // }
}

export default function generateRollupConfig() {
  const packageJson = require('./package.json') // eslint-disable-line global-require, import/no-unresolved
  const inputFileName = packageJson.name
  const libName = `bf_${packageJson.name.replace('-', '_')}`
  const inputFilePath = `src/${inputFileName}.js`
  const outputFilePath = `dist/${inputFileName}.min.js`

  return [
    {
      input: inputFilePath,
      external: [
        'window',
        'document',
      ],

      output: [
        {
          file: outputFilePath,
          name: libName,
          format: 'umd',
          plugins: [terser(terserOptions)],
          globals: {
            document: 'document',
            window: 'window',
          },
        },
      ],
      plugins: [
        resolve(),
        babel({
          presets: [
            [
              '@babel/preset-env',
              { targets: '> 2%' },
            ],
          ],
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
        }),
      ],
    },
  ]
}
