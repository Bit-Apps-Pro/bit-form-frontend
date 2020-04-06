/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BitappsContextProvider } from './Utils/BitappsContext'
import { SnackContextProvider } from './Utils/SnackContext'
import Loader from './components/Loader'

const App = lazy(() => import('./App'))


if (process.env.NODE_ENV === 'production' && typeof bits.assetsURL !== 'undefined') {
  __webpack_public_path__ = `${bits.assetsURL}/js/`
}
ReactDOM.render(
  <BitappsContextProvider>
    <SnackContextProvider>
      <Loader />

      {/* <Suspense fallback={<h1>sedfasdf</h1>}><App /></Suspense> */}
    </SnackContextProvider>
  </BitappsContextProvider>, document.getElementById('btcd-app')
)
serviceWorker.unregister();
