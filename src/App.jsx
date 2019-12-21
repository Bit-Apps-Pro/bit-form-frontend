/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'
import SplitPane from 'react-split-pane'
import { Container, Section, Bar } from 'react-simple-resizer'
import GridLayout from './components/GridLayout'
import './resource/sass/app.scss'
import './resource/sass/components.scss'
import ToolBar from './components/Toolbar'
import ElementSettings from './components/ElmSettings.jsx'

export default class App extends React.Component {
  col;

  constructor(props) {
    super(props)
    this.state = {
      forceRender: false,
      drgElm: ['', { h: 1, w: 1, i: '' }],
      gridWidth: 1100,
      settings: { id: null, type: null, data: null },
      layout: [
        { i: 'blk_1', x: 0, y: 0, w: 1, h: 2 },
        { i: 'blk_2', x: 1, y: 0, w: 1, h: 2 },
        { i: 'blk_3', x: 2, y: 0, w: 1, h: 2 },
        { i: 'blk_4', x: 3, y: 0, w: 1, h: 2 },
        { i: 'blk_5', x: 4, y: 0, w: 1, h: 2 },
        { i: 'blk_6', x: 5, y: 0, w: 1, h: 2 },
        { i: 'blk_7', x: 6, y: 0, w: 1, h: 2 },
        { i: 'blk_8', x: 7, y: 0, w: 1, h: 2 },
        { i: 'blk_9', x: 8, y: 0, w: 1, h: 2 },
        { i: 'blk_10', x: 9, y: 0, w: 1, h: 2 },
      ],
      data: {
        blk_1: [

          {
            tag: 'label',
            attr: {},
            child: 'laebl',
          },
          {
            tag: 'div',
            attr: { type: 'text' },
            child: [
              { tag: 'label', attr: '', child: 'laebl' },
              { tag: 'label', attr: '', child: 'laebl' },
            ],
          },
        ],
        blk_2: [
          { tag: 'label', attr: '', child: 'laebl' },
          {
            tag: 'div',
            attr: { type: 'text' },
            child: { tag: 'b', attr: {}, child: 'bold' },
          },
        ],
        blk_3: [
          {
            tag: 'label',
            attr: {},
            child: 'laebl',
          },
          {
            tag: 'input',
            attr: { type: 'text' },
            child: null,
          },
        ],
        blk_4: [],
        blk_5: [],
        blk_6: [],
        blk_7: [],
        blk_8: [],
        blk_9: [],
        blk_10: [],
      },
    }
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.setDrgElm = this.setDrgElm.bind(this)
    this.setGridWidth = this.setGridWidth.bind(this)
    this.getElmSettings = this.getElmSettings.bind(this)
    this.addData = this.addData.bind(this)
    this.updateData = this.updateData.bind(this)

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

  onLayoutChange(layout) {
    // console.log(this.col, cols);
    /* let count = 0
    if (this.col != cols) {
      console.log('cols', this.col, cols, layout);
      let w = 0
      for (let i = 0; i < layout.length; i += 2) {
        console.log(i)
        w = 0
        for (let j = 0; j < cols; j++) {
          count++
          if (count < layout.length) {
            layout[count].x = w
            layout[count].y = i
            console.log("x", w, "y", i)
            w += 1
          } else {
            break;
            console.log('exrta', count)
          }
        }
      }
      console.log(layout)
      this.col = cols
    } */
    // console.log(cols, layout);
    this.setState({ layout })
  }

  getElmSettings(id, type) {
    // console.log(id, type);
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ settings: { id, type, data: this.state.data[id][0] } })
  }

  setDrgElm(el) {
    this.setState({ drgElm: el })
  }

  setGridWidth(w) {
    this.setState({ gridWidth: w - 10 })
  }

  addData(counter) {
    /*  this.setState(prvState => {
       const { data } = prvState
       data.blk_1[0].child = Math.random().toString()
       return {
         ...prvState,
         data,
       }
     }) */
    this.setState(prvState => ({
      ...prvState,
      data: {
        ...prvState.data, [`n_blk_${counter}`]: prvState.drgElm[0],
      },
    }))
  }

  updateData(updatedElm) {
    this.setState(prvState => {
      const { data } = prvState
      data[updatedElm.id] = [updatedElm.data]
      return {
        ...prvState,
        data,
        forceRender: !prvState.forceRender,
      }
    })
  }

  stringifyLayout() {
    return this.state.layout.map((l) => (
      <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>:[{l.x}, {l.y}, {l.w}, {l.h}]
      </div>
    ));
  }

  render() {
    return (
      <div className="App">
        <SplitPane
          split="vertical"
          minSize={175}
          maxSize={290}
          onChange={() => { }}
        >
          <ToolBar setDrgElm={this.setDrgElm} className="tile" />

          <div className="grid-lay-wrp">
            <Container style={this.containerStyle}>
              <Section defaultSize={0.1} style={this.sectionStyle} />
              <Bar className="bar" />

              <Section onSizeChanged={this.setGridWidth} minSize={320}>
                <div className="layoutJSON">
                  Displayed as
                  <code>[x, y, w, h]</code>
                  :
                  <div className="columns">{this.stringifyLayout()}</div>
                </div>
                {/* <button onClick={() => this.setGridWidth(1300)}>desktop</button> */}
                <GridLayout
                  layout={this.state.layout}
                  setLayout={this.setLayout}
                  width={this.state.gridWidth}
                  onLayoutChange={this.onLayoutChange}
                  draggedElm={this.state.drgElm}
                  data={this.state.data}
                  addData={this.addData}
                  getElmSettings={this.getElmSettings}
                  reRender={this.state.forceRender}
                />
              </Section>

              <Bar className="bar" />
              <Section defaultSize={300} style={this.sectionStyle}>
                <ElementSettings key="elm-settins1" elm={this.state.settings} updateData={this.updateData} />
              </Section>
            </Container>


          </div>
        </SplitPane>

      </div>
    )
  }
}

// const gridProps = window.gridProps || {};
