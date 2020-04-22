/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router, Switch, Route, NavLink,
} from 'react-router-dom'
import './resource/sass/app.scss'
import TableLoader from './components/Loaders/TableLoader'
import Loader from './components/Loaders/Loader'
import './resource/icons/style.css'
// import './resource/fonts/stylesheet.css'

const AllForms = lazy(() => import('./pages/AllForms'))
const FormDetails = lazy(() => import('./pages/FormDetails'))
const FormEntries = lazy(() => import('./pages/FormEntries'))
const Error404 = lazy(() => import('./pages/Error404'))

function App() {
  console.log('%c $render App', 'background:gray;padding:3px;border-radius:5px;color:white')


  return (
    // eslint-disable-next-line no-undef
    <Router basename={process.env.NODE_ENV === 'production' ? bits.baseURL : '/'}>
      <div className="Btcd-App">

        <div className="nav-wrp">
          <div className="logo" />
          <nav className="top-nav">
            <NavLink
              exact
              to="/"
              activeClassName="app-link-active"
            >My Forms
            </NavLink>

            <NavLink
              to="/settings"
              activeClassName="app-link-active"
            >App Settings
            </NavLink>
          </nav>
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
              <h1>Settings</h1>
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}


export default App
