/* eslint-disable no-undef */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker'
import Bitapps from './Bitapps'

export default function BitappsRenderer(params) {
  document.getElementById(`${params.contentID}no-js`).innerHTML = ''
  ReactDOM.render(<Bitapps buttons={params.buttons} data={params.fields} layout={params.layout} file={params.file} />, document.getElementById(params.contentID));
}
serviceWorker.unregister();
