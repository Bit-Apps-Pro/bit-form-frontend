/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router, Switch, Route, NavLink,
} from 'react-router-dom'
import './resource/sass/app.scss'
import './resource/sass/components.scss'
import './resource/js/custom'
import TableLoader from './components/Loaders/TableLoader'
// import './resource/icons/style.css'

const AllForms = lazy(() => import('./pages/AllForms'))
const Builder = lazy(() => import('./pages/Builder'))
const FormEntries = lazy(() => import('./pages/FormEntries'))

function App() {
  console.log('%c $render App', 'background:gray;padding:3px;border-radius:5px;color:white')

  return (
    // eslint-disable-next-line no-undef
    <Router basename={process.env.NODE_ENV === 'production' ? bits.baseURL : '/'}>
      <main className="Btcd-App">

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
          <Suspense fallback={<TableLoader />}>
            <Switch>
              <Route exact path="/">
                <AllForms />
              </Route>
              <Route path="/builder/:formType/:formID?/:option?">
                <Builder />
              </Route>
              <Route path="/formEntries/:formID">
                <FormEntries />
              </Route>
              <Route path="/settings">
                <h1>Settings</h1>
              </Route>
            </Switch>
          </Suspense>
        </div>
      </main>
    </Router>
  )
}


export default App
