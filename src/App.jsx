/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
import React from "react";
import {
  HashRouter as Router,
  NavLink as Link,
  Route,
  Switch
} from "react-router-dom";
import "./resource/sass/app.scss";
import "./resource/sass/components.scss";
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
      gridWidth: 840
    };

    this.setGridWidth = this.setGridWidth.bind(this);
    // this.stringifyLayout = this.stringifyLayout.bind(this)
    this.setNavActive = this.setNavActive.bind(this);

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
    this.setState({ gridWidth: w - 20 });
  }

  /* stringifyLayout() {
    return this.state.layout.map((l) => (
      <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>:[{l.x}, {l.y}, {l.w}, {l.h}]
      </div>
    ))
  } */

  // eslint-disable-next-line class-methods-use-this
  setNavActive(isCurrent) {
    const as = {
        color: "#0e112f",
        fontWeight: "bold",
        background: "white"
    };
    const is = {
        fontWeight: "normal"
    };

    return isCurrent ? as : is;
  }

  saveForm(lay) {
    console.log("bits.nonce: ", this.state.data);
    axios
      .post(
        bits.ajaxURL,
        {
          fields: this.state.layout,
          fields: this.state.data
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            action: "bitapps_update_form",
            _ajax_nonce: bits.nonce
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  render() {
    return (
      <Router>
        <div className="Btcd-App">
          <div className="nav-wrp">
            <div className="logo" />
            <nav className="top-nav">
              <Link exact to={"/"} activeStyle={this.setNavActive(true)}>My Forms</Link>

              <Link to="/builder" activeStyle={this.setNavActive(true)}>Builder</Link>

              <Link to="/settings" activeStyle={this.setNavActive(true)}>Settings</Link>
            </nav>
          </div>

          <div className="route-wrp">
            <Switch>
              <Route exact path="/builder/:preLayout">
                <Builder
                  gridWidth={this.state.gridWidth}
                  setGridWidth={this.setGridWidth}
                />
              </Route>
              <Route exact path="/settings">
                <Dashboard />
              </Route>
              <Route exact path="/">
                <AllForms />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// const gridProps = window.gridProps || {};
