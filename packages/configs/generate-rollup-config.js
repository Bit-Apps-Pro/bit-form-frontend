/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'
import { getPackageFileList } from './package-helpers'

export default function generateRollupConfig() {
  const packageJson = require('./package.json') // eslint-disable-line global-require, import/no-unresolved
  const inputFileName = packageJson.name
  const fileNames = getPackageFileList(inputFileName)

  const isDev = process.env.NODE_ENV === 'dev'

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

  const external = [
    'window',
    'document',
    ...fileNames,
  ]

  const plugins = [
    ...isDev ? [
      serve({ open: true, port: 3030 }),
      livereload(),
    ] : [],
    resolve(),
    babel({
      presets: [
        [
          '@babel/preset-env',
          { targets: isDev ? '> 20%' : '> 2%' },
        ],
      ],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
  ]

  const srcFolder = 'src'
  const distFolder = 'dist'

  const getOutputConfig = fileName => {
    const defaultConf = {
      file: `${distFolder}/${fileName}.min.js`,
      name: fileName.replace(/-/g, '_'),
      format: 'iife',
      globals: {
        document: 'document',
        window: 'window',
      },
    }
    if (!isDev) defaultConf.plugins = [terser(terserOptions)]
    return [defaultConf]
  }

  return fileNames.map(fileName => ({
    input: `${srcFolder}/${fileName}.js`,
    external,
    plugins,
    output: getOutputConfig(fileName),
  }))
}
