/* eslint-disable no-console */
/* eslint-disable no-undef */

import React from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { Scrollbars } from 'react-custom-scrollbars'
import SlimSelect from 'slim-select'
import '../resource/css/slimselect.min.css'
import moveIcon from '../resource/img/move.png'
import CompGen from './CompGen'
import bitsFetch, { prepareData } from '../Utils/bitsFetch'

export default class GridLayout extends React.PureComponent {
  /*
  typ: input type
  lbl: label
  cls: class
  ph: placeholder
  mn: min
  mx: mix
  val: default value
  ac: autocomplete on/off
  req: required
  mul: multiple
  */

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      newCounter: 0,
      breakpoint: 'md',
      layout: [],
      data: {},
    }

    // this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.getElmProp = this.getElmProp.bind(this)
    this.editSubmit = this.editSubmit.bind(this)
  }

  componentDidMount() {

    if (this.props.formType === 'new') {
      if (this.props.formID === 'blank') {
        this.setState({ isLoading: false })
      } else {
        const pram = process.env.NODE_ENV === 'development' ? prepareData({ template: this.props.formID }) : { template: this.props.formID }
        bitsFetch(pram, 'bitapps_get_template')
          .then(res => {
            if (res !== undefined && res.success) {
              const responseData = JSON.parse(res.data)
              this.setState({ layout: responseData.form_content.layout, data: responseData.form_content.fields, id: responseData.id, newCounter: responseData.form_content.layout.length })
              this.props.setFormName(responseData.form_content.form_name)
              this.setState({ isLoading: false })
            }
          })
        this.setState({ isLoading: false })
      }
    } else if (this.props.formType === 'edit') {
      const pram = process.env.NODE_ENV === 'development' ? prepareData({ id: this.props.formID }) : { id: this.props.formID }
      bitsFetch(pram, 'bitapps_get_a_form')
        .then(res => {
          if (res !== undefined && res.success) {
            const responseData = JSON.parse(res.data)
            this.setState({ layout: responseData.form_content.layout, data: responseData.form_content.fields, id: responseData.id, newCounter: responseData.form_content.layout.length })
            this.props.setFormName(responseData.form_content.form_name)
            this.setState({ isLoading: false })
          }
        })
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
            'btcd-id',
          )}"] > div > .slim`,
          allowDeselect: true,
          placeholder: allSel[i].getAttribute('placeholder'),
          limit: Number(allSel[i].getAttribute('limit')),
        });
        if (allSel[i].nextSibling != null) {
          if (allSel[i].hasAttribute('data-max-show')) {
            allSel[
              i
            ].nextSibling.children[1].children[1].style.maxHeight = `${Number(
              allSel[i].getAttribute('data-max-show'),
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

    this.props.setFields(this.state.data)
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
    if (nextProps.updatedData !== null) {
      nextProps.updateData(null)
      return {
        data: { ...prvState.data, [nextProps.updatedData.id]: nextProps.updatedData.data },
      }
    }
    return null
  }

  /* onBreakpointChange(breakpoint, cols) {
    // unused
    // this.setState({ breakpoint, cols })
  } */

  onLayoutChange(layout) {
    this.props.setLay(layout)
    // console.log(layout)
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
        [newBlk]: draggedElm[0],
      },
      layout: prvState.layout.concat({ i: newBlk, x, y, w, h, minH, maxH, minW }),
      newCounter: prvState.newCounter + 1,
    }))
  }

  getElmProp(e) {
    if (!e.target.hasAttribute('data-close')) {
      let id = null
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
      } else if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.hasAttribute('btcd-id')) {
        node = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      }

      id = node.getAttribute('btcd-id')

      if (this.state.data[id].typ === 'select') {
        const allSel = document.querySelectorAll('select')
        for (let i = 0; i < allSel.length; i += 1) {
          allSel[i].parentNode.parentNode.classList.remove('z-9')
        }
        node.classList.add('z-9')
      }

      this.props.setElmSetting({ id, data: this.state.data[id] })
    }
  }

  editSubmit() {
    this.props.setElmSetting({ id: '', type: 'submit', data: this.props.subBtn })
  }

  compByTheme(compData) {
    switch (this.props.theme) {
      case 'default':
        return <CompGen atts={compData} />
      default:
        return null
    }
  }

  blkGen(item) {
    return (
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
              process.env.NODE_ENV === 'production'
                ? `${bits.assetsURL}/img/${moveIcon}`
                : `${moveIcon}`
            }
            alt="drag handle"
          />
        </span>

        {this.compByTheme(this.state.data[item.i])}
      </div>
    )
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
                {this.state.layout.map(itm => this.blkGen(itm))}
              </ResponsiveReactGridLayout>

              <div onClick={this.editSubmit} onKeyPress={this.editSubmit} role="button" tabIndex={0}>
                {this.compByTheme(this.props.subBtn)}
              </div>
            </Scrollbars>
          </div>
        )
    )
  }
}
