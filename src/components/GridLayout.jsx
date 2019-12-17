/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { createElement } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import _ from 'lodash'
import axios from 'axios';
import moveIcon from '../resource/img/move.png'

export default class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      newCounter: 0,
      breakpoint: 'md',
      data: props.data,
      lay: props.layout,
    }

    this.onAddItem = this.onAddItem.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.changeDat = this.changeDat.bind(this)
    this.childGen = this.childGen.bind(this)
    this.getElmProp = this.getElmProp.bind(this)
  }

  onAddItem() {
    this.setState(prvState => ({
      ...prvState,
      lay: prvState.lay.concat({ i: `n_blk_${prvState.newCounter}`, x: 4, y: 0, w: 2, h: 2 }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  onBreakpointChange(breakpoint, cols) {
    console.log(this.state.breakpoint, cols);
    // unused
    // this.setState({ breakpoint, cols })
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout, this.state.cols)

    // unused
    // this.setState({ layout })
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
      lay: prvState.lay.concat({ i: `n_blk_${prvState.newCounter}`, x: elmPrms.x, y: elmPrms.y, w: draggedElm[1].w, h: draggedElm[1].h, maxH: draggedElm[1].maxH }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  getElmProp(e) {
    let id
    let type
    if (e.target.getAttribute('btcd-id') != null) {
      id = e.target.getAttribute('btcd-id')
    } else if (e.target.parentNode.getAttribute('btcd-id') != null) {
      id = e.target.parentNode.getAttribute('btcd-id')
    } else if (e.target.parentNode.parentNode.getAttribute('btcd-id') != null) {
      id = e.target.parentNode.parentNode.getAttribute('btcd-id')
    } else if (e.target.parentNode.parentNode.parentNode.getAttribute('btcd-id') != null) {
      id = e.target.parentNode.parentNode.parentNode.getAttribute('btcd-id')
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('btcd-id') != null) {
      id = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('btcd-id')
    }

    if (e.target.getAttribute('btcd-fld') != null) {
      type = e.target.getAttribute('btcd-fld')
    } else if (e.target.parentNode.getAttribute('btcd-fld') != null) {
      type = e.target.parentNode.getAttribute('btcd-fld')
    } else if (e.target.parentNode.parentNode.getAttribute('btcd-fld') != null) {
      type = e.target.parentNode.parentNode.getAttribute('btcd-fld')
    } else if (e.target.parentNode.parentNode.parentNode.getAttribute('btcd-fld') != null) {
      type = e.target.parentNode.parentNode.parentNode.getAttribute('btcd-fld')
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('btcd-fld') != null) {
      type = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('btcd-fld')
    }
    this.props.getElmSettings(id, type)
  }


  changeDat() {
    this.props.setData()
    /* this.setState(prvState => {
      const { data } = prvState
      data.blk_1[0].child = Math.random().toString()
      return {
        ...prvState,
        data,
      }
    }) */
    console.log(this.state.data, this.props.data);
    // this.forceUpdate()
  }

  saveForm() {
    console.log('bits.nonce: ', bits.ajaxURL)
    axios.post(bits.ajaxURL, null, {
      params: {
        action: 'bitform_save_form',
        _ajax_nonce: bits.nonce,
        lastName: 'Flintstone',
      },
    }).then((response) => {
      console.log(response)
    }).catch(error => {
      console.log('error', error);
    })
  }

  childGen(cld) {
    if (cld === null) {
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
    return elm.map(item => (
      <div
        key={item.i}
        btcd-id={item.i}
        data-grid={item}
        onClick={this.getElmProp}
        onKeyPress={this.getElmProp}
        role="button"
        tabIndex={0}
      >
        <span
          style={{ right: 2 }}
          unselectable="on"
          draggable="false"
          className="bit-blk-icn"
          onClick={this.onRemoveItem.bind(this, item.i)}
          onKeyPress={this.onRemoveItem.bind(this, item.i)}
          role="button"
          tabIndex={-1}
        >
          &times;
        </span>
        <span
          style={{ right: 21, cursor: 'grab' }}
          className="bit-blk-icn drag"
          role="button"
        >
          <img draggable="false" unselectable="on" src={moveIcon} alt="drag handle" />
        </span>
        {this.state.data[item.i].map((i, idx) => createElement(i.tag,
          { key: idx, ...i.attr }, this.childGen(i.child)))}
      </div>
    ))
  }

  render() {
    console.log('rendered', this.props.layout);
    const { lay } = this.state
    return (
      <div style={{ width: this.props.width }}>
        {/* <button type='button' onClick={this.onAddItem}>Add Item</button> */}
        <button type="button" onClick={this.changeDat}>change data</button>
        <button type="button" onClick={this.saveForm}>Save</button>
        <ResponsiveReactGridLayout
          className="layout"
          style={{ height: 1000 }}
          // layouts={this.props.lay}
          onDrop={this.onDrop}
          compactType="vertical"
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          droppingItem={this.props.draggedElm[1]}
          cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
          breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
          rowHeight={60}
          width={this.props.width}
          isDroppable
          margin={[3, 3]}
          draggableCancel=".no-drg"
          draggableHandle=".drag"
        >
          {this.createElm(lay)}
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}
