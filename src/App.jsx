/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState } from 'react'
import {
  BrowserRouter as Router, Switch, Route, NavLink,
} from 'react-router-dom'
import './resource/sass/app.scss'
import './resource/sass/components.scss'
// import './resource/icons/style.css'
import './resource/js/custom'
import Builder from './pages/Builder'
import AllForms from './pages/AllForms'
import FormEntries from './pages/FormEntries'
import { BitappsContext } from './Utils/BitappsContext'
import Modal from './components/Modal'
import SnackMsg from './components/ElmSettings/Childs/SnackMsg'

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <div>
      <div style={{ background: 'blue', height: 200, width: 100 }} />
      <div style={{ background: 'red', height: 200, width: 100 }} />
      <div style={{ background: 'green', height: 200, width: 100 }} />
    </div>
  </div>
)

export default function App() {
  console.log('%c $render App', 'background:gray;padding:3px;border-radius:5px;color:white')

  const [gridWidth, setGridWidth] = useState(window.innerWidth - 480)
  const { confirmModal, snackMsg } = React.useContext(BitappsContext)
  const { confModal, hideConfModal } = confirmModal
  const { snackbar } = snackMsg

  return (
    // eslint-disable-next-line no-undef
    <Router basename={process.env.NODE_ENV === 'production' ? bits.baseURL : '/'}>
      <div className="Btcd-App">
        <Modal
          sm
          title={confModal.title}
          subTitle={confModal.subTitle}
          show={confModal.show}
          setModal={hideConfModal}
        >
          <button onClick={confModal.yesAction} className="btn blue btn-lg blue-sh " type="button">{confModal.yesBtn}</button>
          <button onClick={confModal.noAction} className="btn red btn-lg red-sh ml-4" type="button">{confModal.noBtn}</button>
        </Modal>

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
            >Settings
            </NavLink>
          </nav>
        </div>

        <div className="route-wrp">
          <Switch>
            <Route exact path="/">
              <AllForms />
            </Route>
            <Route path="/builder/:formType/:formID?/:option?">
              <Builder
                gridWidth={gridWidth}
                setGridWidth={setGridWidth}
              />
            </Route>
            <Route path="/formEntries/:formID">
              <FormEntries />
            </Route>
            <Route path="/settings">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
      {snackbar.show && <SnackMsg />}
    </Router>
  )
}

// const gridProps = window.gridProps || {};
