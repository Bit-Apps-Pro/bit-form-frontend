/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { createElement } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import _ from 'lodash'
import axios from 'axios';
import SlimSelect from 'slim-select'
import '../resource/css/slimselect.min.css'
import moveIcon from '../resource/img/move.png'


export default class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      newCounter: props.newCounter,
      breakpoint: 'md',
      data: props.data,
      lay: props.layout,
      forceRender: props.forceRender
    }

    this.onAddItem = this.onAddItem.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.changeDat = this.changeDat.bind(this)
    this.childGen = this.childGen.bind(this)
    this.getElmProp = this.getElmProp.bind(this)
    this.saveForm = this.saveForm.bind(this)
  }

  componentDidUpdate() {
    if (document.querySelector('.slim') != null) {
      const allSel = document.querySelectorAll('select.slim')
      for (let i = 0; i < allSel.length; i += 1) {
        // eslint-disable-next-line no-unused-vars
        const s = new SlimSelect({
          select: `[btcd-id="${allSel[i].parentNode.parentNode.getAttribute('btcd-id')}"] > div > .slim`,
          allowDeselect: true,
          placeholder: allSel[i].getAttribute('placeholder'),
          limit: Number(allSel[i].getAttribute('limit')),
        })
        if (allSel[i].nextSibling != null) {
          if (allSel[i].hasAttribute('data-max-show')) {
            allSel[i].nextSibling.children[1].children[1].style.maxHeight = `${Number(allSel[i].getAttribute('data-max-show')) * 2}pc`
          }
        }
      }
    }
  }


  onAddItem() {
    console.log('item add')
    /* this.setState(prvState => ({
      ...prvState,
      lay: prvState.lay.concat({ i: `n_blk_${prvState.newCounter}`, x: 4, y: 0, w: 2, h: 2 }),
      newCounter: prvState.newCounter + 1,
    })) */
    this.setState(prvState => ({
      ...prvState,
      forceRender: !prvState.forceRender,
      lay: prvState.lay.concat({ i: 'n_blk_4', x: 0, y: 0, w: 2, h: 2 }),
      data: {
        ...prvState.data,
        n_blk_4: [{
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'date' },
          child: [
            { tag: 'label', attr: {}, child: 'Week:' },
            { tag: 'input', attr: { className: 'no-drg', type: 'week' }, child: null },
          ],
        }],
      },
    }))
  }

  onBreakpointChange(breakpoint, cols) {
    // unused
    // this.setState({ breakpoint, cols })
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout, this.state.cols)

    // unused
    // this.setState({ layout })
  }

  onRemoveItem(i) {
    this.setState(prvState => ({ ...prvState, lay: _.reject(prvState.lay, { i }) }))
  }

  onDrop = (elmPrms) => {
    // console.log('droped ', elmPrms)
    const { draggedElm } = this.props
    const { w, h, minH, maxH, minW } = draggedElm[1]
    const { x, y } = elmPrms
    const newBlk = `n_blk_${this.state.newCounter}`
    // setting data in parent state
    this.props.addData(this.state.newCounter, { i: newBlk, x, y, w, h, minH, maxH, minW })
    this.setState(prvState => ({
      ...prvState,
      data: {
        ...prvState.data, [newBlk]: draggedElm[0],
      },
      lay: prvState.lay.concat({ i: newBlk, x, y, w, h, minH, maxH, minW }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  getElmProp(e) {
    let id = null
    let type = null
    let node = null
    if (e.target.hasAttribute('btcd-id')) {
      node = e.target
    } else if (e.target.parentNode.hasAttribute('btcd-id')) {
      node = e.target.parentNode
    } else if (e.target.parentNode.parentNode.hasAttribute('btcd-id')) {
      node = e.target.parentNode.parentNode
    } else if (e.target.parentNode.parentNode.parentNode.hasAttribute('btcd-id')) {
      node = e.target.parentNode.parentNode.parentNode
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.hasAttribute('btcd-id')) {
      node = e.target.parentNode.parentNode.parentNode.parentNode
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.hasAttribute('btcd-id')) {
      node = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.hasAttribute('btcd-id')) {
      node = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    }

    id = node.getAttribute('btcd-id')
    for (let i = 0; i < node.children.length; i += 1) {
      if (node.children[i].hasAttribute('btcd-fld')) {
        type = node.children[i].getAttribute('btcd-fld')
        break
      }
    }
    if (type === 'select') {
      const allSel = document.querySelectorAll('select')
      for (let i = 0; i < allSel.length; i += 1) {
        allSel[i].parentNode.parentNode.classList.remove('z-9')
      }
      node.classList.add('z-9')
    }
    this.props.getElmSettings(id, type)
  }

  saveForm() {
    console.log('bits.nonce: ', bits.ajaxURL)
    axios.post(bits.ajaxURL, null, {
      params: {
        action: 'bitapps_save_form',
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
      return cld.map((itm, ind) => createElement(itm.tag, { key: ind, ...itm.attr }, this.childGen(itm.child)))
      // return cld.map((itm, ind) => this.childGen(itm))
      /* for (let cl of cld) {
        console.log(cl)
         this.childGen(cl)
      } */
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
          style={{ right: 22, cursor: 'move' }}
          className="bit-blk-icn drag"
          role="button"
        >
          <img className="unselectable" draggable="false" unselectable="on" onDragStart={() => false} src={process.env.NODE_ENV === 'production' ? `${bits.assetsURL}/img/${moveIcon}` : `${moveIcon}`} alt="drag handle" />
        </span>
        {this.state.data[item.i].map((i, idx) => createElement(i.tag,
          { key: idx, ...i.attr }, this.childGen(i.child)))}
      </div>
    ))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('get derive',nextProps, prevState)
    // console.log('get derive', nextProps.forceRender, prevState.forceRender)
    if (nextProps.forceRender !== prevState.forceRender) {
      return {
        lay: nextProps.layout,
        data: nextProps.data,
        newCounter: nextProps.newCounter,
        forceRender: !prevState.forceRender,
      }
    }
    return null
  }

  changeDat() {
    this.props.addData()
    /* this.setState(prvState => {
      const { data } = prvState
      data.blk_1[0].child = Math.random().toString()
      return {
        ...prvState,
        data,
      }
    }) */
    // this.forceUpdate()
  }


  render() {
    const { lay } = this.state
    return (
      <div /* onDrop={(elm = { x: 0, y: 0 }) => this.onDrop(elm)} */ style={{ width: this.props.width, background: 'aliceblue' }}>
        {/* <button type='button' onClick={this.onAddItem}>Add Item</button> */}
        <button type="button" onClick={this.changeDat}>change data</button>
        <button type="button" onClick={this.saveForm}>Save</button>
        <div onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
          <ResponsiveReactGridLayout
            className="layout"
            style={{ height: '100vh' }}
            // layouts={this.props.lay}
            onDrop={this.onDrop}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            droppingItem={this.props.draggedElm[1]}
            cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
            breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
            rowHeight={40}
            width={this.props.width}
            margin={[0, 0]}
            draggableCancel=".no-drg"
            draggableHandle=".drag"
            isDroppable
            useCSSTransforms
            transformScale={1}
          >
            {this.createElm(lay)}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    )
  }
}
