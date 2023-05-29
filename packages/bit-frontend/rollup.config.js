/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default function generateRollupConfig() {
  const isDev = process.env.NODE_ENV === 'dev'
  const fileNames = ['hidden-token-field', 'bitsFetchFront', 'submit-form', 'customFieldsReset', 'advancedFileHandle', 'decisionFldHandle', 'validate-focus']

  const external = [
    'window',
    'document',
    ...fileNames,
  ]

  const terserOptions = {
    compress: {
      passes: 10,
      drop_console: false,
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
        name: fileName.replace(/-/g, '_'),
        format: 'iife',
        plugins: [terser(terserOptions)],
        globals: {
          document: 'document',
          window: 'window',
        },
      },
    ],
  }))
}
