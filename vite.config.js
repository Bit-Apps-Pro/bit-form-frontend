/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { packagesFileLists } from './packages/configs/package-helpers'

let chunkCount = 0
const newBuildHash = hash()

export default defineConfig(({ mode }) => ({

  plugins: [
    react(),
    copyStatics(mode),
    storeBuildHash(mode),
  ],

  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildCommonjs([
          'react-calendar',
          'react-date-picker',
          'react-clock',
          'react-time-picker',
          'fela',
        ]),
      ],
    },
  },

  root: 'src',
  base: mode === 'development' ? '/' : '',
  build: {
    outDir: '../../assets',
    emptyOutDir: true,

    // emit manifest so PHP can find the hashed files
    manifest: true,

    target: 'es2015',
    // minify: 'terser',

    // sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.jsx'),
      output: {
        entryFileNames: `main-${newBuildHash}.js`,
        compact: true,
        validate: true,
        generatedCode: {
          arrowFunctions: true,
          // objectShorthand: true
        },
        chunkFileNames: () => `bf-${hash()}-${chunkCount++}.js`,
        assetFileNames: (fInfo) => {
          const pathArr = fInfo.name.split('/')
          const fileName = pathArr[pathArr.length - 1]

          if (fileName === 'main.css') {
            return `main-${newBuildHash}.css`
          }
          if (fileName === 'logo.svg') {
            return 'logo.svg'
          }

          return `bf-${hash()}-${chunkCount++}.[ext]`
        },
      },
    },
    commonjsOptions: { transformMixedEsModules: true },
  },

  server: {
    origin: 'http://localhost:3000',
    // required to load scripts from custom host
    cors: true,
    // we need a strict port to match on PHP side
    strictPort: true,
    port: 3000,
    hmr: { host: 'localhost' },
    commonjsOptions: { transformMixedEsModules: true },
  },
}))

function hash() {
  return Math.round(Math.random() * (999 - 1) + 1)
}

function copyStatics(mode) {
  if (mode === 'development') {
    return null
  }

  const targets = Object.keys(packagesFileLists).reduce((acc, packageName) => {
    const packageFileList = packagesFileLists[packageName]
    const packageTargets = packageFileList.map((fileName) => ({
      src: absPath(`packages/${packageName}/dist/${fileName}.min.js`),
      dest: absPath('../assets'),
    }))
    return [...acc, ...packageTargets]
  }, [])

  return viteStaticCopy({ targets })
}

function storeBuildHash(mode) {
  if (mode === 'development') {
    return null
  }
  fs.writeFileSync(absPath('../build-hash.txt'), String(newBuildHash))
}

function absPath(relativePath) {
  return normalizePath(path.resolve(__dirname, relativePath))
}
