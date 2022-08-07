/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import { lazy, Suspense, useEffect } from 'react'
import { useFela } from 'react-fela'
import { Toaster } from 'react-hot-toast'
import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import loadable from '@loadable/component'
import logo from '../logo.svg'
import Loader from './components/Loaders/Loader'
import TableLoader from './components/Loaders/TableLoader'
import { $bits } from './GlobalStates/GlobalStates'
import './resource/icons/style.css'
import './resource/sass/app.scss'
import './resource/sass/global.scss'
import ut from './styles/2.utilities'
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from './Utils/i18nwrap'
import BuilderLoader from './components/Loaders/BuilderLoader'

const loaderStyle = { height: '90vh' }
const AllForms = loadable(() => import('./pages/AllForms'), { fallback: <TableLoader /> })
const AppSettings = loadable(() => import('./pages/AppSettings'), { fallback: <Loader className="g-c" style={loaderStyle} /> })
const FormDetails = loadable(() => import('./pages/FormDetails'), { fallback: <BuilderLoader /> })
const Error404 = lazy(() => import('./pages/Error404'))

export default function App() {
  const { css } = useFela()
  const bits = useRecoilValue($bits)

  useEffect(() => {
    removeUnwantedCSS()
    // checkProVersionForUpdates(bits)
  }, [])

  const { backgroundColor } = window.getComputedStyle(document.querySelector('#wpadminbar'))
  document.querySelector('#wpbody').style.backgroundColor = backgroundColor

  return (
    <Suspense fallback={(<Loader className={css([ut['g-c'], loaderStyle])} />)}>
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
        {/* <Router basename={typeof bits !== 'undefined' ? bits.baseURL + '/' : '/'}> */}
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
                  to="/app-settings"
                  // to="/app-settings"
                  className={({ isActive }) => (isActive ? 'app-link-active' : '')}
                // isActive={(m, l) => l.pathname.match(/app-settings|recaptcha|gclid|cpt|api|smtp|payments/g)}
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
              {/* <Route
                path="/form/:page/:formType/:formID/:rightBar/:element/:fieldKey"
                element={(
                  <Suspense fallback={<Loader className="g-c" style={loaderStyle} />}>
                    <FormDetails />
                  </Suspense>
                )}
              />
              <Route
                path="/form/:page/:formType/:formID/:rightBar/:element"
                element={(
                  <Suspense fallback={<Loader className="g-c" style={loaderStyle} />}>
                    <FormDetails />
                  </Suspense>
                )}
              />
              <Route
                path="/form/:page/:formType/:formID/:rightBar"
                element={(
                  <Suspense fallback={<Loader className="g-c" style={loaderStyle} />}>
                    <FormDetails />
                  </Suspense>
                )}
              /> */}

            </Routes>
          </div>
        </div>
        {/* </Router> */}
      </HashRouter>
    </Suspense>
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
