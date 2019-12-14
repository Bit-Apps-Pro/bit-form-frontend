/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
import React, { createElement } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import _ from 'lodash'

export default class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      newCounter: 0,
      data: {
        blk_0: [
          {
            tag: 'label',
            attr: { key: 1111 },
            child: 'laebl',
          },
          {
            tag: 'div',
            attr: { key: 1112, type: 'text' },
            child: 'asddasasd',
          },
        ],
        blk_1: [

          {
            tag: 'label',
            attr: { key: 1113 },
            child: 'laebl',
          },
          {
            tag: 'div',
            attr: { key: 1114, type: 'text' },
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
            attr: { key: 1115, type: 'text' },
            child: { tag: 'b', attr: { key: 1119 }, child: 'bold' },
          },
        ],
        blk_3: [
          {
            tag: 'label',
            attr: { key: 1116 },
            child: 'laebl',
          },
          {
            tag: 'input',
            attr: { key: 1117, type: 'text' },
            child: null,
          },
        ],
      },
      lay: [
        { i: 'blk_0', x: 0, y: 0, w: 2, h: 2 },
        { i: 'blk_1', x: 2, y: 0, w: 2, h: 2 },
        { i: 'blk_2', x: 4, y: 0, w: 2, h: 2 },
        { i: 'blk_3', x: 6, y: 0, w: 2, h: 2 },
      ],
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
    this.setState({ breakpoint, cols })
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout)
    this.setState({ layout })
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
      data.blk_1[0].child = 'sssssss'
      return {
        ...prvState,
        data,
      }
    })
    this.forceUpdate()
  }

  childGen(cld) {
    if (this.cld === null) {
      return null
    } if (typeof cld === 'string') {
      return cld
    } if ((!!cld) && (cld.constructor === Object)) {
      return createElement(cld.tag, cld.attr, cld.child)
    } if ((!!cld) && (cld.constructor === Array)) {
      return cld.map(item => createElement(item.tag, item.attr, item.child))
    }
    return null
  }

  createElm(elm) {
    return elm.map(item => (
      <div key={item.i} data-grid={item}>
        <span
          className="remove-blk"
          onClick={this.onRemoveItem.bind(this, item.i)}
          onKeyPress={this.onRemoveItem.bind(this, item.i)}
          role="button"
          tabIndex={0}
        >
          &times
        </span>
        {this.state.data[item.i].map(i => createElement(i.tag, i.attr, this.childGen(i.child)))}
      </div>
    ))
  }

  render() {
    return (
      <div>
        {/* <button type="button" onClick={this.onAddItem}>Add Item</button> */}
        <button type="button" onClick={this.changeDat}>change data</button>
        <ResponsiveReactGridLayout
          style={{ height: 1000 }}
          onDrop={this.onDrop}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          droppingItem={this.props.draggedElm[1]}
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          rowHeight={50}
          width={this.props.width}
          isDroppable
          draggableCancel=".no-drg"
        >
          {this.createElm(this.state.lay)}
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}
