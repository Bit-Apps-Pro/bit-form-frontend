/* eslint-disable no-undef */
/* import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable' */
import React from 'react'
import ReactDOM from 'react-dom'
import Bitforms from './Bitforms'

if (!window._babelPolyfill) {
  require('babel-polyfill')
}
export default function BitformsRenderer(params) {
  const renderApp = () => {

    /* const isJS = document.getElementById(`${params.contentID}no-js`)
    if (isJS) {
      isJS.innerHTML = ''
    } */
    // eslint-disable-next-line react/jsx-filename-extension
    ReactDOM.hydrate(<Bitforms
      buttons={params.buttons}
      data={params.fields}
      layout={params.layout}
      file={params.file}
      gRecaptchaSiteKey={params.gRecaptchaSiteKey}
      gRecaptchaVersion={params.gRecaptchaVersion}
      fieldToCheck={params.fieldToCheck}
      fieldToChange={params.fieldToChange}
      conditional={params.conditional}
      fieldsKey={params.fieldsKey}
      contentID={params.contentID}
      appID={params.appID}
      nonce={params.nonce}
    />, document.getElementById(params.contentID))
  }

  const app = document.getElementById(params.contentID)
  if (!app) {
    const appConatinerObserver = new MutationObserver(() => {
      const container = document.getElementById(params.contentID)
      if (container) {
        renderApp()
      }
    })
    if (window.top !== window.self) {
      appConatinerObserver.observe(document.body, { childList: true, subtree: true })
    }
  } else {
    renderApp()
  }
}
