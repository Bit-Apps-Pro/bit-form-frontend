/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
import React from 'react'
import ReactDOM from 'react-dom'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import _ from 'lodash'
import DangerousHTML from 'react-dangerous-html'

export default class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newCounter: 0,
      data: {
        'blk-0': '<span>html</span>',
        'blk-1': '<span>html</span>',
        'blk-2': '<span>html</span>',
        'blk-3': '<span>html</span>',
        'blk-4': '<span>html</span>',
      },
      lay: [
        { i: 'blk-0', x: 0, y: 0, w: 2, h: 2 },
        { i: 'blk-1', x: 2, y: 0, w: 2, h: 2 },
        { i: 'blk-2', x: 4, y: 0, w: 2, h: 2 },
        { i: 'blk-3', x: 6, y: 0, w: 2, h: 2 },
        { i: 'blk-4', x: 8, y: 0, w: 2, h: 2 },
      ],
    }

    this.onAddItem = this.onAddItem.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).addEventListener('resize', () => {
      console.log('mounte');
    })
  }
  onAddItem() {
    this.setState(prvState => ({
      ...prvState,
      lay: prvState.lay.concat({ i: `n-blk-${prvState.newCounter}`, x: 4, y: 0, w: 2, h: 2 }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({ breakpoint, cols })
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout });
  }

  onRemoveItem(i) {
    console.log('removing', i);
    this.setState(prvState => ({ ...prvState, lay: _.reject(prvState.lay, { i }) }))
  }

  onDrop = (elmPrms) => {
    const { draggedElm } = this.props
    this.setState(prvState => ({
      ...prvState,
      data: {
        ...prvState.data, [`n-blk-${prvState.newCounter}`]: draggedElm[0],
      },
    }))
    this.setState(prvState => ({
      ...prvState,
      lay: prvState.lay.concat({ i: `n-blk-${prvState.newCounter}`, x: elmPrms.x, y: elmPrms.y, w: draggedElm[1].w, h: draggedElm[1].h }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  createElm(elm) {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer',
    }

    return elm.map(itm => (
      <div key={itm.i} data-grid={itm}>
        <span
          role="button"
          tabIndex={0}
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, itm.i)}
          onKeyPress={this.onRemoveItem.bind(this, itm.i)}
        >
          &times;
        </span>
        <DangerousHTML className="com-wrp" style={{ height: '100%', width: '100%' }} html={this.state.data[itm.i]} />
      </div>
    ))
  }

  render() {
    return (
      <div>
        {/* <button type="button" onClick={this.onAddItem}>Add Item</button> */}
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
    );
  }
}
