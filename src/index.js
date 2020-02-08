import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BitappsContextProvider } from './Utils/BitappsContext'
import App from './App'

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<BitappsContextProvider><App /></BitappsContextProvider>, document.getElementById('btcd-app'));
serviceWorker.unregister();
