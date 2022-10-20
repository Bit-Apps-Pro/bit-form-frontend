/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default function generateRollupConfig() {
  const fileNames = [
    'checkFldValidation',
    'checkMinMaxOptions',
    'customOptionValidation',
    'dcsnbxFldValidation',
    'emailFldValidation',
    'fileupFldValidation',
    'advanceFileUpFldValidation',
    'generateBackslashPattern',
    'nmbrFldValidation',
    'requiredFldValidation',
    'urlFldValidation',
    'validateForm',
    'regexPatternValidation',
  ]

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
    output: {
      comments: false,
    },
    // mangle: {
    //   properties: true,
    //   reserved: [
    //     'bit_country_field',
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

  const inputOutpus = fileNames.map(fileName => ({
    external,
    plugins,
    input: `${srcFolder}/${fileName}.js`,
    output: [
      {
        file: `${distFolder}/${fileName}.min.js`,
        name: fileName,
        format: 'iife',
        plugins: [terser(terserOptions)],
        globals: {
          document: 'document',
          window: 'window',
        },
      },
    ],
  }))

  return inputOutpus
}
