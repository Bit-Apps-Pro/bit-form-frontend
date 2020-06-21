/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router, Switch, Route, NavLink, Link,
} from 'react-router-dom'
import './resource/sass/app.scss'
import TableLoader from './components/Loaders/TableLoader'
import Loader from './components/Loaders/Loader'
import './resource/icons/style.css'
import logo from './resource/img/bit-form-logo.svg'
import AppSettings from './pages/AppSettings'

const AllForms = lazy(() => import('./pages/AllForms'))
const FormDetails = lazy(() => import('./pages/FormDetails'))
const FormEntries = lazy(() => import('./pages/FormEntries'))
const Error404 = lazy(() => import('./pages/Error404'))

function App() {
  console.log('%c $render App', 'background:gray;padding:3px;border-radius:5px;color:white')
  // eslint-disable-next-line no-undef
  return (
    // eslint-disable-next-line no-undef
    <Suspense fallback={<Loader />}>
      <Router basename={process.env.NODE_ENV === 'production' ? bits.baseURL : '/'}>
        <div className="Btcd-App">

          <div className="nav-wrp">
            <div className="flx">
              <div className="logo flx" title="Bit Form">
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
                >My Forms
              </NavLink>

                <NavLink
                  to="/settings/recaptcha"
                  activeClassName="app-link-active"
                >Settings
              </NavLink>
              </nav>
            </div>
          </div>

          <div className="route-wrp">
            <Switch>
              <Route exact path="/">
                <Suspense fallback={<TableLoader />}>
                  <AllForms />
                </Suspense>
              </Route>
              <Route path="/builder/:formType/:formID?/:option?">
                <Suspense fallback={<Loader />}>
                  <FormDetails />
                </Suspense>
              </Route>
              <Route path="/formEntries/:formID">
                <Suspense fallback={<TableLoader />}>
                  <FormEntries />
                </Suspense>
              </Route>
              <Route path="/settings">
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
