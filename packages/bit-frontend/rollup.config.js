/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default function generateRollupConfig() {
  const isDev = process.env.NODE_ENV === 'dev'
  const fileNames = ['hidden-token-field', 'submit-form', 'customFieldsReset', 'advancedFileHandle']

  const external = [
    'window',
    'document',
    ...fileNames,
  ]

  const terserOptions = {
    compress: {
      passes: 10,
      drop_console: true,
    },
    // mangle: {
    //   properties: true,
    //   reserved: [
    //     'observeElement',
    //   ]
    // }
  }

  const srcFolder = 'src'
  const distFolder = 'dist'

  const plugins = [
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
  ]

  if (isDev) {
    return fileNames.map(fileName => ({
      input: `${srcFolder}/${fileName}.js`,
      output: [
        {
          file: `${distFolder}/${fileName}.min.js`,
        },
      ],
    }))
  }

  return fileNames.map(fileName => ({
    external,
    plugins,
    input: `${srcFolder}/${fileName}.js`,
    output: [
      {
        file: `${distFolder}/${fileName}.min.js`,
        name: fileName,
        format: 'umd',
        plugins: [terser(terserOptions)],
        globals: {
          document: 'document',
          window: 'window',
        },
      },
    ],
  }))
}
