/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'
import SplitPane from 'react-split-pane'
import GridLayout from './components/GridLayout'
import './resource/sass/app.scss'
import ToolBar from './components/ToolBar'
import { Container, Section, Bar } from "react-simple-resizer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [],
      drgElm: ['', { h: 1, w: 1, i: '' }],
      gridWidth: window.innerWidth - 350
    }
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.setDrgElm = this.setDrgElm.bind(this)
    this.setGridWidth = this.setGridWidth.bind(this)

    /* function insertion_Sort(arr) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
          //move current element to the first position
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

  onLayoutChange(layout) {
    this.setState({ layout });
  }

  setDrgElm(el) {
    this.setState({ drgElm: el })
  }

  stringifyLayout() {
    return this.state.layout.map((l) => (
      <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
      </div>
    ));
  }

  setGridWidth(w) {
    this.setState({ gridWidth: w })
  }


  render() {
    return (

      <div className="App">
        <SplitPane
          split="vertical"
          minSize={150}
          maxSize={290}
          onChange={(l) => { console.log('object', l) }}
        >
          <ToolBar setDrgElm={this.setDrgElm} className="tile" />

          <div className="grid-lay-wrp">
            <Container style={this.containerStyle}>
              <Section defaultSize={.1} style={this.sectionStyle} />
              <Bar className="bar" />

              <Section onSizeChanged={this.setGridWidth} minSize={320}>
                <div className="layoutJSON">Displayed as<code>[x, y, w, h]</code>:
                  <div className="columns">{this.stringifyLayout()}</div>
                </div>
                <GridLayout
                  width={this.state.gridWidth}
                  onLayoutChange={this.onLayoutChange}
                  draggedElm={this.state.drgElm}
                />
              </Section>

              <Bar className="bar" />
              <Section defaultSize={.1} style={this.sectionStyle} />
            </Container>


          </div>
        </SplitPane>

      </div>
    )
  }
}

// const gridProps = window.gridProps || {};
