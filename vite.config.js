/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

let chunkCount = 0

export default defineConfig(({ mode }) => ({

  plugins: [
    react(),
    copyStatics(mode),
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
        entryFileNames: 'main.js',
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
            return 'main.css'
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

  return viteStaticCopy({
    targets: [
      {
        src: absPath('packages/bit-country-field/dist/bit-country-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/observeElm.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-recaptcha-field/dist/bit-recaptcha-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/isFormValidatedWithoutError.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/bfSelect.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/setStyleProperty.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/setBFMsg.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/bfReset.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/bfValidationErrMsg.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/paymentSubmitResponse.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/setHiddenFld.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-helpers/dist/scrollToFld.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond/dist/bit-filepond.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-file-validate-size/dist/bit-filepond-plugin-file-validate-size.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-file-validate-type/dist/bit-filepond-plugin-file-validate-type.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-image-crop/dist/bit-filepond-plugin-image-crop.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-image-preview/dist/bit-filepond-plugin-image-preview.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-image-resize/dist/bit-filepond-plugin-image-resize.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-image-transform/dist/bit-filepond-plugin-image-transform.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-image-validate-size/dist/bit-filepond-plugin-image-validate-size.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-filepond-plugin-media-preview/dist/bit-filepond-plugin-media-preview.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-virtualized-list/dist/bit-virtualized-list.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-currency-field/dist/bit-currency-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-select-field/dist/bit-select-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-file-up-field/dist/bit-file-up-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-paypal-field/dist/bit-paypal-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-phone-number-field/dist/bit-phone-number-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-razorpay-field/dist/bit-razorpay-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-advanced-file-up-field/dist/bit-advanced-file-up-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/advanceFileUpFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/checkFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/checkMinMaxOptions.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/customOptionValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/dcsnbxFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/emailFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/fileupFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/generateBackslashPattern.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/nmbrFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/phoneNumberFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/regexPatternValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/requiredFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/urlFldValidation.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-validation/dist/validateForm.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-conditionals/dist/bit-conditionals.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/submit-form.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/bitsFetchFront.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/validate-focus.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/hidden-token-field.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/advancedFileHandle.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/decisionFldHandle.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/customFieldsReset.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-frontend/dist/validate-focus.min.js'),
        dest: absPath('../assets'),
      },
      {
        src: absPath('packages/bit-stripe-field/dist/bit-stripe-field.min.js'),
        dest: absPath('../assets'),
      },
    ],
  })
}

function absPath(relativePath) {
  return normalizePath(path.resolve(__dirname, relativePath))
}
