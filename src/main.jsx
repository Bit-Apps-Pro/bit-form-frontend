/* eslint-disable camelcase */
/* eslint-disable no-undef */
import './resource/sass/app.scss'
import './resource/sass/global.scss'
import { createRenderer } from 'fela'
import customProperty from 'fela-plugin-custom-property'
import ReactDOM from 'react-dom/client'
import { RendererProvider } from 'react-fela'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import multipleSelectors from 'fela-plugin-multiple-selectors'
import customProperties from './styles/1.customProperties'
import AppSettingsProvider from './Utils/AppSettingsContext'
import App from './App'

const renderer = createRenderer({
  plugins: [
    multipleSelectors(),
    customProperty(customProperties),
  ],
  filterClassName: cls => cls.indexOf('cp') !== -1,
  devMode: true,
})

// if (typeof bits !== 'undefined' && bits.assetsURL !== undefined) {
// eslint-disable-next-line camelcase
// __webpack_public_path__ = `${bits.assetsURL}/js/`
// }
// if (typeof bits !== 'undefined' && bits.baseURL && `${window.location.pathname + window.location.search}#` !== bits.baseURL) {
//   bits.baseURL = `${window.location.pathname + window.location.search}#`
// }
// if (window.location.hash === '') {
//   window.location = `${window.location.href}#/`
// }
// if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register(`${__webpack_public_path__}service-worker.js`).then(registration => {
//       // eslint-disable-next-line no-console
//       console.log('SW registered: ', registration)
//     }).catch(registrationError => {
//       // eslint-disable-next-line no-console
//       console.log('SW registration failed: ', registrationError)
//     })
//   })
// } else {
//   // eslint-disable-next-line no-console
//   console.log('no sw')
// }

const root = ReactDOM.createRoot(document.getElementById('btcd-app'))
root.render(
  <RecoilRoot>
    <RecoilNexus />
    <AppSettingsProvider>
      <RendererProvider renderer={renderer}>
        <App />
      </RendererProvider>
    </AppSettingsProvider>
  </RecoilRoot>,
)

// serviceWorker.register();
