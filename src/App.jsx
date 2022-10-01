import loadable from '@loadable/component'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../logo.svg'
import BuilderLoader from './components/Loaders/BuilderLoader'
import Loader from './components/Loaders/Loader'
import AllForms from './pages/AllForms'
import { __ } from './Utils/i18nwrap'

const loaderStyle = { height: '90vh' }
const AppSettings = loadable(() => import('./pages/AppSettings'), { fallback: <Loader className="g-c" style={loaderStyle} /> })
const FormDetails = loadable(() => import('./pages/FormDetails'), { fallback: <BuilderLoader /> })
const Error404 = loadable(() => import('./pages/Error404'), { fallback: <Loader className="g-c" style={loaderStyle} /> })

const { backgroundColor } = window.getComputedStyle(document.querySelector('#wpadminbar'))
document.querySelector('#wpbody').style.backgroundColor = backgroundColor

export default function App() {
  useEffect(() => {
    removeUnwantedCSS()
  }, [])

  return (
    <>
      <Toaster
        position="bottom-right"
        containerStyle={{ inset: '-25px 30px 20px -10px' }}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            bottom: 40,
            padding: '15px 18px',
            boxShadow: '0 0px 7px rgb(0 0 0 / 30%), 0 3px 30px rgb(0 0 0 / 20%)',
          },
        }}
      />
      <HashRouter>
        <div className="Btcd-App" style={{ backgroundColor }}>
          <div className="nav-wrp" style={{ backgroundColor }}>
            <div className="flx">
              <div className="logo flx" title={__('Bit Form')}>
                <Link to="/" className="flx">
                  <img src={logo} alt="bit form logo" className="ml-2" />
                  <span className="ml-2">Bit Form</span>
                </Link>
              </div>
              <nav className="top-nav ml-2">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'app-link-active' : '')}
                >
                  {__('My Forms')}
                </NavLink>

                <NavLink
                  to="/app-settings/recaptcha"
                  // to="/app-settings"
                  className={({ isActive }) => (isActive ? 'app-link-active' : '')}
                >
                  {__('App Settings')}
                </NavLink>
              </nav>
            </div>
          </div>

          <div className="route-wrp">
            <Routes>
              <Route path="/" element={<AllForms />} />
              <Route path="/form/:page/:formType/:formID/*" element={<FormDetails />} />
              <Route path="/app-settings/*" element={<AppSettings />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </>
  )
}

function removeUnwantedCSS() {
  const conflictStyles = ['bootstrap']
  const styles = document.styleSheets

  for (let i = 0; i < styles.length; i += 1) {
    if (styles[i].href !== null) {
      const regex = new RegExp(conflictStyles.join('.*css|'), 'gi')
      if (styles[i]?.href.match(regex)) {
        styles[i].disabled = true
      }
    }
  }
}
