/* eslint-disable react/jsx-no-useless-fragment */
import loadable from '@loadable/component'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from '../logo.svg'
import { $bits } from './GlobalStates/GlobalStates'
import { __ } from './Utils/i18nwrap'
import BuilderLoader from './components/Loaders/BuilderLoader'
import Loader from './components/Loaders/Loader'
import MigrationModal from './components/MigrationModal'
import RollbackButton from './components/RollbackButton'
import AllForms from './pages/AllForms'
import DocNSupport from './pages/DocNSupport'

const loaderStyle = { height: '90vh' }
const AppSettings = loadable(() => import('./pages/AppSettings'), { fallback: <Loader className="g-c" style={loaderStyle} /> })
const FormDetails = loadable(() => import('./pages/FormDetails'), { fallback: <BuilderLoader /> })
const Error404 = loadable(() => import('./pages/Error404'), { fallback: <Loader className="g-c" style={loaderStyle} /> })

const { backgroundColor } = window.getComputedStyle(document.querySelector('#wpadminbar'))

export default function App() {
  const bits = useAtomValue($bits)
  useEffect(removeUnwantedCSS, [])

  const isAppSettingsActive = () => {
    const { pathname } = useLocation()
    const url = pathname.split('/')
    const len = url.length
    const nav = ['recaptcha', 'gclid', 'smtp', 'cpt', 'api', 'payments', 'general']
    const active = nav.includes(url[len - 1]) || false
    return active
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        containerStyle={{ inset: '-25px 30px 20px -10px' }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--dp-blue-bg)',
            color: '#fff',
            bottom: 40,
            padding: '15px 18px',
            borderRadius: 12,
            boxShadow: '0 2px 7px rgb(0 0 0 / 30%), 0 3px 30px rgb(0 0 0 / 20%)',
          },
        }}
      />
      <MigrationModal />
      <div className="Btcd-App" style={{ backgroundColor }}>
        <div className="nav-wrp" style={{ backgroundColor }}>
          <div className="top-wrp">
            <div className="flx flx-between">
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
                    className={isAppSettingsActive() ? 'app-link-active' : ''}
                  >
                    {__('App Settings')}
                  </NavLink>
                </nav>
              </div>
              <nav className="top-nav mr-2">
                {/* <a
                    target="_blank"
                    href="https://wordpress.org/support/plugin/bit-form/reviews/#new-post"
                    rel="noreferrer"
                  >
                    {__('Review Us')}
                  </a> */}
                <NavLink
                  to="/doc-support"
                  className={({ isActive }) => (isActive ? 'app-link-active' : '')}
                >
                  {__('Doc & Support')}
                </NavLink>
              </nav>
            </div>
            {bits.canRollbackToV1 && (
              <RollbackButton />
            )}
          </div>
        </div>

        <div className="route-wrp">
          <Routes>
            <Route path="/" element={<AllForms />} />
            <Route path="/form/:page/:formType/:formID/*" element={<FormDetails />} />
            <Route path="/app-settings/*" element={<AppSettings />} />
            <Route path="/doc-support" element={<DocNSupport />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
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
