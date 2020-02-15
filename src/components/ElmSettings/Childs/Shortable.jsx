import React from 'react'
import { SortablePane } from 'react-sortable-pane'

export default class Shortable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      order: props.order,
      f: false,
    }
  }

  componentDidUpdate() {
    console.log('updated')
  }

  onChange = order => {
    this.setState({ order })
    this.props.onOrderChange(order)
    this.forceUpdate()
  }

  static getDerivedStateFromProps(nextProps, prvState) {
    console.log('derived', nextProps.order, prvState.order)
    if (nextProps.order.toString() !== prvState.order.toString()) {
      return {
        order: nextProps.order
      }
    }
    return null
  }

  render() {
    return (
      <>
        <button onClick={() => this.setState({ f: !this.state.f })}>up</button>
        <SortablePane direction="vertical" margin={10} disableEffect dragHandleClassName="btcd-pane-drg" onOrderChange={this.onChange} order={this.state.order}>
          {this.props.children}
        </SortablePane>
      </>
    )
  }
}
