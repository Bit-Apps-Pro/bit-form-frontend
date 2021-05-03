/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import { lazy, Suspense, useState, useEffect, useContext } from 'react'
import {
  BrowserRouter as Router, Switch, Route, NavLink, Link,
} from 'react-router-dom'
import './resource/sass/app.scss'
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from './Utils/i18nwrap'
import TableLoader from './components/Loaders/TableLoader'
import Loader from './components/Loaders/Loader'
import './resource/icons/style.css'
import logo from './resource/img/bit-form-logo.svg'
import AppSettings from './pages/AppSettings'
import { AllFormContext } from './Utils/AllFormContext'

const AllForms = lazy(() => import('./pages/AllForms'))
const FormDetails = lazy(() => import('./pages/FormDetails'))
const FormEntries = lazy(() => import('./pages/FormEntries'))
const Error404 = lazy(() => import('./pages/Error404'))

function App() {
  const loaderStyle = { height: '90vh' }
  const [newFormId, setnewFormId] = useState(null)
  const { allFormsData } = useContext(AllFormContext)
  const { allForms } = allFormsData

  useEffect(() => {
    setnewFormId(getNewFormId())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allForms])

  const getNewFormId = () => {
    let max = 0
    allForms.map(frm => {
      const fid = Number(frm.formID)
      if (fid > max) {
        max = fid
      }
    })
    return max + 1
  }

  return (
    <Suspense fallback={(<Loader className="g-c" style={loaderStyle} />)}>
      <Router basename={typeof bits !== 'undefined' ? bits.baseURL : '/'}>
        <div className="Btcd-App">

          <div className="nav-wrp">
            <div className="flx">
              <div className="logo flx" title={__('Bit Form', 'bitform')}>
                <Link to="/" className="flx">
                  <img src={logo} alt="bit form logo" className="ml-2" />
                  <span className="ml-2">Bit Form</span>
                </Link>
              </div>
              <nav className="top-nav ml-2">
                <NavLink
                  exact
                  to="/"
                  activeClassName="app-link-active"
                >
                  {__('My Forms', 'bitform')}
                </NavLink>

                <NavLink
                  to="/app-settings/recaptcha"
                  activeClassName="app-link-active"
                  isActive={(m, l) => l.pathname.match(/app-settings|recaptcha|gclid|cpt|api|smtp|payments/g)}
                >
                  {__('App Settings', 'bitform')}
                </NavLink>
              </nav>
            </div>
          </div>

          <div className="route-wrp">
            <Switch>
              <Route exact path="/">
                <Suspense fallback={<TableLoader />}>
                  <AllForms newFormId={newFormId} />
                </Suspense>
              </Route>
              <Route path="/form/:page/:formType/:formID?/:option?">
                <Suspense fallback={<Loader className="g-c" style={loaderStyle} />}>
                  <FormDetails newFormId={newFormId} />
                </Suspense>
              </Route>
              <Route path="/formEntries/:formID">
                <Suspense fallback={<TableLoader />}>
                  <FormEntries />
                </Suspense>
              </Route>
              <Route path="/app-settings">
                <AppSettings />
              </Route>
              <Route path="*">
                <Error404 />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Suspense>
  )
}

export default App
