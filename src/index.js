/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { AllFormContextProvider } from './Utils/AllFormContext'
import Loader from './components/Loaders/Loader'

const App = lazy(() => import('./App'))


if (process.env.NODE_ENV === 'production' && typeof bits.assetsURL !== 'undefined') {
  __webpack_public_path__ = `${bits.assetsURL}/js/`
}
ReactDOM.render(
  <AllFormContextProvider>
    <Suspense fallback={<Loader />}><App /></Suspense>
  </AllFormContextProvider>, document.getElementById('btcd-app'),
)
serviceWorker.unregister();
