/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BitappsContextProvider } from './Utils/BitappsContext'
import { SnackContextProvider } from './Utils/SnackContext'
import App from './App'

if (process.env.NODE_ENV === 'production' && typeof bits.assetsURL !== 'undefined') {
  __webpack_public_path__ = `${bits.assetsURL}/js/`
}
ReactDOM.render(
  <BitappsContextProvider>
    <SnackContextProvider>
      <App />
    </SnackContextProvider>
  </BitappsContextProvider>, document.getElementById('btcd-app')
)
serviceWorker.unregister();
