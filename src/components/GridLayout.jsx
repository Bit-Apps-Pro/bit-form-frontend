/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { createElement } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import axios from 'axios';
import SlimSelect from 'slim-select'
import '../resource/css/slimselect.min.css'
import moveIcon from '../resource/img/move.png'
import { Scrollbars } from 'react-custom-scrollbars';

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
    const fetchTemplate = async (template) => {
      const result = await axios.post(bits.ajaxURL, {template:template}, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          action: "bitapps_get_template",
          _ajax_nonce: bits.nonce
        }
      })
      console.log(result.data.data)
      if (result.data.data !== false) {
        let data = JSON.parse(result.data.data)
        this.setState({ layout: data.form_content.layout, data: data.form_content.fields , id:data.id, form_name:  data.form_content.form_name, newCounter: data.form_content.layout.length})
      }
    }
    if (this.props.formType === 'new') {
      if (this.props.formID === 'blank') {
        console.log('create a blank form')
        this.setState({ isLoading: false })
      } else {
        fetchTemplate(this.props.formID)
        console.log('fetch form layout', this.props.formID)
        this.setState({ isLoading: false })

      }
    } else if (this.props.formType === 'edit') {
      console.log('fetch existing form layout', this.props.formID)
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
          ...prvState.data, [`b-${prvState.newCounter}`]: nextProps.newData[0],
        },
        layout: prvState.layout.concat({ i: `b-${prvState.newCounter}`, x, y, w, h, minH, maxH, minW }),
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
    this.props.setLay(layout)
    console.log(layout)
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
    const newBlk = `b-${this.state.newCounter}`

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
    let data = {
      layout: this.state.layout,
      fields: this.state.data,
      form_name: this.state.form_name
    }
    let action = 'bitapps_create_new_form'
    if (this.state.id > 0 ) {
       data = {
        layout: this.state.layout,
        fields: this.state.data,
        id: this.state.id,
        form_name: this.state.form_name
      }

       action = 'bitapps_update_form'
    }
    axios.post(bits.ajaxURL, data, {
      headers: {
        'Content-Type': 'application/json'
    },
    params : {
      action: action,
      _ajax_nonce: bits.nonce,
    }
    }).then((response) => {
      if (action === 'bitapps_create_new_form') {
        let data = JSON.parse(response.data.data)
        this.setState({  id:data.id})
      }
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
          style={{ right: 8 }}
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
          style={{ right: 27, cursor: 'move' }}
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
      this.state.isLoading ? <h1>Loading</h1>
        : (
          <div style={{ width: this.props.width }} className="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
            <Scrollbars>
              <ResponsiveReactGridLayout
                className="layout"
                // layouts={this.props.lay}
                onDrop={this.onDrop}
                onLayoutChange={this.onLayoutChange}
                onBreakpointChange={this.onBreakpointChange}
                droppingItem={this.props.draggedElm[1]}
                cols={{ lg: 10 }}
                breakpoints={{ lg: 800 }}
                // cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
                // breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
                rowHeight={40}
                width={this.props.width}
                margin={[0, 0]}
                draggableCancel=".no-drg"
                draggableHandle=".drag"
                isDroppable
                useCSSTransforms
                transformScale={1}
              // compactType="vertical"
              >

                {this.createElm(this.state.layout)}

              </ResponsiveReactGridLayout>
            </Scrollbars>
          </div>
        )
    )
  }
}
