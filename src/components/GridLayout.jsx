/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { createElement } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import axios from 'axios';
import SlimSelect from 'slim-select'
import '../resource/css/slimselect.min.css'
import moveIcon from '../resource/img/move.png'

export default class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      newCounter: 0,
      breakpoint: 'md',
      layout: [
      ],
      data: {
      },
      id: 0,
      form_name: "Blank Form"
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.childGen = this.childGen.bind(this)
    this.getElmProp = this.getElmProp.bind(this)
    this.saveForm = this.saveForm.bind(this)
  }

  componentDidMount() {
    const fetchTemplate = async () => {
      const result = await axios.post(bits.ajaxURL, {template:this.props.preLayout}, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          action: "bitapps_create_new_form",
          _ajax_nonce: bits.nonce
        }
      })
      console.log(result.data.data)
      if (result.data.data !== false) {
        let data = JSON.parse(result.data.data)
        this.setState({ layout: data.form_content.layout, data: data.form_content.fields , id:data.id, form_name:  data.form_content.form_name, newCounter: data.form_content.layout.length})
      }
    }
    if (this.props.preLayout === '0') {
      this.setState({ isLoading: false })
    } else {
      fetchTemplate()
      this.setState({ isLoading: false })
    }
  }

  componentDidUpdate() {
    // slim init
    if (document.querySelector('.slim') != null) {
      const allSel = document.querySelectorAll('select.slim')
      for (let i = 0; i < allSel.length; i += 1) {
        // eslint-disable-next-line no-unused-vars
        const s = new SlimSelect({
          select: `[btcd-id="${allSel[i].parentNode.parentNode.getAttribute(
            "btcd-id"
          )}"] > div > .slim`,
          allowDeselect: true,
          placeholder: allSel[i].getAttribute("placeholder"),
          limit: Number(allSel[i].getAttribute("limit"))
        });
        if (allSel[i].nextSibling != null) {
          if (allSel[i].hasAttribute("data-max-show")) {
            allSel[
              i
            ].nextSibling.children[1].children[1].style.maxHeight = `${Number(
              allSel[i].getAttribute("data-max-show")
            ) * 2}pc`;
          }
        }
      }
    }

    // attach icon file
    const fInputs = document.querySelectorAll('.btcd-f-input>div>input')
    // eslint-disable-next-line no-restricted-syntax
    for (const inp of fInputs) {
      // eslint-disable-next-line max-len
      inp.parentNode.querySelector('.btcd-inpBtn>img').src = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJDbGlwIj48cGF0aCBkPSJtMTIuMDggNTcuNzQ5YTkgOSAwIDAgMCAxMi43MjggMGwzMS4xMTItMzEuMTEzYTEzIDEzIDAgMSAwIC0xOC4zODQtMTguMzg1bC0yMC41MDcgMjAuNTA2IDEuNDE1IDEuNDE1IDIwLjUwNi0yMC41MDZhMTEgMTEgMCAxIDEgMTUuNTU2IDE1LjU1NmwtMzEuMTEyIDMxLjExMmE3IDcgMCAwIDEgLTkuOS05LjlsMjYuODctMjYuODdhMyAzIDAgMCAxIDQuMjQyIDQuMjQzbC0xNi4yNjMgMTYuMjY0IDEuNDE0IDEuNDE0IDE2LjI2NC0xNi4yNjNhNSA1IDAgMCAwIC03LjA3MS03LjA3MWwtMjYuODcgMjYuODdhOSA5IDAgMCAwIDAgMTIuNzI4eiIvPjwvZz48L3N2Zz4='
    }
  }

  static getDerivedStateFromProps(nextProps, prvState) {
    if (nextProps.newData !== null) {
      const { w, h, minH, maxH, minW } = nextProps.newData[1]
      const x = 0
      const y = Infinity

      nextProps.setNewData(null)
      return {
        data: {
          ...prvState.data, [`n_blk_${prvState.newCounter}`]: nextProps.newData[0],
        },
        layout: prvState.layout.concat({ i: `n_blk_${prvState.newCounter}`, x, y, w, h, minH, maxH, minW }),
        newCounter: prvState.newCounter + 1,
      }
    }
    return null
  }

  onBreakpointChange(breakpoint, cols) {
    // unused
    // this.setState({ breakpoint, cols })
  }

  onLayoutChange(layout) {
    // this.setState({ layout })
  }

  onRemoveItem(i) {
    let { data, layout } = this.state
    layout = layout.filter(itm => itm.i !== i)
    delete data[i]
    this.setState({ layout, data })
  }

  onDrop = (elmPrms) => {
    const { draggedElm } = this.props
    const { w, h, minH, maxH, minW } = draggedElm[1]
    let { x, y } = elmPrms
    if (y !== 0) { y -= 1 }
    const newBlk = `n_blk_${this.state.newCounter}`

    this.setState(prvState => ({
      ...prvState,
      data: {
        ...prvState.data,
        [newBlk]: draggedElm[0]
      },
      layout: prvState.layout.concat({ i: newBlk, x, y, w, h, minH, maxH, minW }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  getElmProp(e) {
    if (!e.target.hasAttribute('data-close')) {
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

      this.props.setElmSetting({ id, type, data: this.state.data[id][0] })
    }
  }

  saveForm(lay) {
    console.log('bits.nonce: ', this.state.data)
    axios.post(bits.ajaxURL, {
      layout: this.state.layout,
      fields: this.state.data,
      id: this.state.id,
      form_name: this.state.form_name
    }, {
      headers: {
        'Content-Type': 'application/json'
    },
    params : {      
      action: 'bitapps_update_form',
      _ajax_nonce: bits.nonce,
    }
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
    }
    return null;
  }

  createElm(elm) {
    return elm.map(item => (
      <div
        key={item.i}
        className="blk"
        btcd-id={item.i}
        data-grid={item}
        onClick={this.getElmProp}
        onKeyPress={this.getElmProp}
        role="button"
        tabIndex={0}
      >
        <span
          data-close
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
          style={{ right: 22, cursor: "move" }}
          className="bit-blk-icn drag"
          role="button"
        >
          <img
            className="unselectable"
            draggable="false"
            unselectable="on"
            onDragStart={() => false}
            src={
              process.env.NODE_ENV === "production"
                ? `${bits.assetsURL}/img/${moveIcon}`
                : `${moveIcon}`
            }
            alt="drag handle"
          />
        </span>
        {this.state.data[item.i].map((i, idx) =>
          createElement(i.tag, { key: idx, ...i.attr }, this.childGen(i.child))
        )}
      </div>
    ));
  }

  render() {
    return (
      <div style={{ width: this.props.width, margin: 'auto' }}>
        <p>
          form_name:{this.state.form_name}  
          ID:{this.state.id}
        </p>
        <button type="button" onClick={this.saveForm}>Save</button>
        {this.state.isLoading ? <h1>Loading</h1>
          : (
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

                {this.createElm(this.state.layout)}

              </ResponsiveReactGridLayout>
            </div>
          )}
      </div>
    );
  }
}
