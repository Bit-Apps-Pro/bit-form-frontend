/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'
import {
  BrowserRouter as Router, Switch, Route, NavLink,
} from 'react-router-dom'
import './resource/sass/app.scss'
import './resource/sass/components.scss'
// import './resource/icons/style.css'
import "./resource/js/custom";
import Builder from "./pages/Builder";
import AllForms from "./pages/AllForms";

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

export default class App extends React.Component {
  col;

  constructor(props) {
    super(props);
    this.state = {
      gridWidth: window.innerWidth - 480,
    }
    this.setGridWidth = this.setGridWidth.bind(this)

    /* function insertion_Sort(arr) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
          //move current element to the first position
          [arr[i], arr[0]] = [arr[0], arr[i]]
          arr.unshift(arr.splice(i, 1)[0]);
        }
        else if (arr[i] > arr[i - 1]) {
          //leave current element where it is
          continue;
        }
        else {
          //find where element should go
          for (let j = 1; j < i; j++) {
            if (arr[i] > arr[j - 1] && arr[i] < arr[j]) {
              //move element
              arr.splice(j, 0, arr.splice(i, 1)[0]);
            }
          }
        }
      }
      return arr;
    }

    console.log(insertion_Sort([3, 0, 2, 5, -1, 4, 1])); */
  }

  setGridWidth(w) {
    console.log(w)
    this.setState({ gridWidth: w - 20 })
  }

  render() {
    return (
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
              >Settings
              </NavLink>
            </nav>
          </div>

          <div className="route-wrp">
            <Switch>
              <Route exact path="/">
                <AllForms />
              </Route>
              <Route path="/builder/:formType/:formID?">
                <Builder
                  gridWidth={this.state.gridWidth}
                  setGridWidth={this.setGridWidth}
                />
              </Route>
              <Route path="/settings">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

// const gridProps = window.gridProps || {};
