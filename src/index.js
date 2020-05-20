/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { AllFormContextProvider } from './Utils/AllFormContext'
import AppSettingsProvider from './Utils/AppSettingsContext'
import Loader from './components/Loaders/Loader'

const App = lazy(() => import('./App'))


if (process.env.NODE_ENV === 'production' && typeof bits.assetsURL !== 'undefined') {
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = `${bits.assetsURL}/js/`
}
if (typeof bits !== 'undefined' && bits.baseURL && `${window.location.pathname + window.location.search}#` !== bits.baseURL) {
  bits.baseURL = `${window.location.pathname + window.location.search}#`
}
ReactDOM.render(
  <AllFormContextProvider>
    <AppSettingsProvider>
      <Suspense fallback={<Loader />}><App /></Suspense>
    </AppSettingsProvider>
  </AllFormContextProvider>, document.getElementById('btcd-app'),
)
serviceWorker.register();
