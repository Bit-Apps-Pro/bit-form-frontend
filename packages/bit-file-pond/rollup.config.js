/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default function generateRollupConfig() {
  const fileNames = ['create', 'destroy', 'registerPlugin', 'setOptions']

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

  const inputOutpus = fileNames.map(fileName => ({
    external,
    plugins,
    input: `${srcFolder}/${fileName}.js`,
    output: [
      {
        file: `${distFolder}/bit-filepond-${fileName}.min.js`,
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

  return inputOutpus
}
