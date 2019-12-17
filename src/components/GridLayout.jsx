/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
import React, { createElement } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import _ from 'lodash'
import axios from "axios";

export default class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      newCounter: 0,
      breakpoint: 'md',
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
      lay: [
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
      lays: {
        lg: [
          { i: 'blk_0', x: 0, y: 0, w: 2, h: 2 },
          { i: 'blk_1', x: 2, y: 0, w: 2, h: 2 },
          { i: 'blk_2', x: 4, y: 0, w: 2, h: 2 },
          { i: 'blk_3', x: 7, y: 0, w: 2, h: 2 },
        ],
        md: [
          { i: 'blk_0', x: 0, y: 0, w: 2, h: 2 },
          { i: 'blk_1', x: 2, y: 0, w: 2, h: 2 },
          { i: 'blk_2', x: 4, y: 0, w: 2, h: 2 },
          { i: 'blk_3', x: 7, y: 0, w: 2, h: 2 },
        ]
      },
    }

    this.onAddItem = this.onAddItem.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.changeDat = this.changeDat.bind(this)
    this.childGen = this.childGen.bind(this)
  }

  onAddItem() {
    this.setState(prvState => ({
      ...prvState,
      lay: prvState.lay.concat({ i: `n_blk_${prvState.newCounter}`, x: 4, y: 0, w: 2, h: 2 }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  onBreakpointChange(breakpoint, cols) {
    //console.log(this.state.breakpoint, cols);
    // unused
    //this.setState({ breakpoint, cols })
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout, this.state.cols)

    // unused
    //this.setState({ layout })
  }

  onRemoveItem(i) {
    console.log('removing', i)
    this.setState(prvState => ({ ...prvState, lay: _.reject(prvState.lay, { i }) }))
  }

  onDrop = (elmPrms) => {
    const { draggedElm } = this.props
    this.setState(prvState => ({
      ...prvState,
      data: {
        ...prvState.data, [`n_blk_${prvState.newCounter}`]: draggedElm[0],
      },
    }))
    this.setState(prvState => ({
      ...prvState,
      lay: prvState.lay.concat({ i: `n_blk_${prvState.newCounter}`, x: elmPrms.x, y: elmPrms.y, w: draggedElm[1].w, h: draggedElm[1].h }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  changeDat() {
    this.setState(prvState => {
      const { data } = prvState
      data.blk_1[0].child = Math.random().toString()
      return {
        ...prvState,
        data,
      }
    })
    this.forceUpdate()
  }
  saveForm(){
    console.log("bits.nonce: ",bits.ajaxURL)
    axios.post(bits.ajaxURL, null, { params: {
      action: 'bitform_save_form',
      _ajax_nonce : bits.nonce,
      lastName: 'Flintstone'
    }}).then(function (response) {
     console.log(response)
    }) .catch(error => {
      console.log("error",error);
    })
  }
  childGen(cld) {
    if (this.cld === null) {
      return null
    } if (typeof cld === 'string') {
      return cld
    } if ((!!cld) && (cld.constructor === Object)) {
      return createElement(cld.tag, cld.attr, cld.child)
    } if ((!!cld) && (cld.constructor === Array)) {
      return cld.map((item, idx) => createElement(item.tag, { key: idx, ...item.attr }, item.child))
    }
    return null
  }

  createElm(elm) {
    console.log(elm);
    return elm.map(item => (
      <div key={item.i} data-grid={item}>
        <span
          className="remove-blk"
          onClick={this.onRemoveItem.bind(this, item.i)}
          onKeyPress={this.onRemoveItem.bind(this, item.i)}
          role="button"
          tabIndex={0}
        >
          &times;
        </span>
        <p>{item.i}</p>
        {this.state.data[item.i].map((i, idx) => createElement(i.tag, { key: idx, ...i.attr }, this.childGen(i.child)))}
      </div>
    ))
  }

  render() {
    return (
      <div style={{ width: this.props.width }}>
        {/* <button type="button" onClick={this.onAddItem}>Add Item</button> */}
        <button type="button" onClick={this.changeDat}>change data</button>
        <button type="button" onClick={this.saveForm}>Save</button>
        <ResponsiveReactGridLayout
          className="layout"
          style={{ height: 1000 }}
          //layouts={this.props.lay}
          onDrop={this.onDrop}
          compactType="vertical"
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          droppingItem={this.props.draggedElm[1]}
          cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
          breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
          rowHeight={50}
          width={this.props.width}
          isDroppable
          draggableCancel=".no-drg"
        >
          {this.createElm(this.props.layout)}
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}
