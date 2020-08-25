/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
// import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker'
import { AllFormContextProvider } from './Utils/AllFormContext'
import AppSettingsProvider from './Utils/AppSettingsContext'
import Loader from './components/Loaders/Loader'

const App = lazy(() => import('./App'))

// Sentry.init({ dsn: 'https://ca450a3bacc2472bbe9b010388f11880@o400688.ingest.sentry.io/5259314' });

if (process.env.NODE_ENV === 'production' && typeof bits !== 'undefined' && bits.assetsURL !== undefined) {
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = `${bits.assetsURL}/js/`
}
if (typeof bits !== 'undefined' && bits.baseURL && `${window.location.pathname + window.location.search}#` !== bits.baseURL) {
  bits.baseURL = `${window.location.pathname + window.location.search}#`
}
if (window.location.hash === '') {
  window.location = `${window.location.href}#/`
}
ReactDOM.render(
  <AllFormContextProvider>
    <AppSettingsProvider>
      <Suspense fallback={(
        <Loader style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
        />
      )}
      >
        <App />
      </Suspense>
    </AppSettingsProvider>
  </AllFormContextProvider>, document.getElementById('btcd-app'),
)

serviceWorker.register();
