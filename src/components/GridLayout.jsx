/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { useState, useEffect, memo } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { Scrollbars } from 'react-custom-scrollbars'
import SlimSelect from 'slim-select'
import '../resource/css/slimselect.min.css'
import moveIcon from '../resource/img/move.png'
import CompGen from './CompGen'
import bitsFetch from '../Utils/bitsFetch'

function GridLayout(props) {
  console.log('%c $render GridLayout', 'background:black;padding:3px;border-radius:5px;color:white')

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

  const [isLoading, setisLoading] = useState(true)
  const [newCounter, setNewCounter] = useState(0)
  const [layout, setLayout] = useState([])
  const [data, setData] = useState(props.fields)
  // const [breakpoint, setBreakpoint] = useState('md')

  const fetchTemplate = () => {
    if (props.formType === 'new') {
      if (props.formID === 'blank') {
        setisLoading(false)
      } else {
        // const pram = process.env.NODE_ENV === 'development' ? prepareData({ template: props.formID }) : { template: props.formID }
        bitsFetch({ template: props.formID }, 'bitapps_get_template')
          .then(res => {
            if (res !== undefined && res.success) {
              const responseData = JSON.parse(res.data)
              setLayout(responseData.form_content.layout)
              setData(responseData.form_content.fields)
              setNewCounter(responseData.form_content.layout.length)
              props.setFormName(responseData.form_content.form_name)
              setisLoading(false)
            } else {
              setisLoading(false)
            }
          })
          .catch(() => {
            setisLoading(false)
          })
      }
    } else if (props.formType === 'edit') {
      // const pram = process.env.NODE_ENV === 'development' ? prepareData({ id: props.formID }) : { id: props.formID }
      bitsFetch({ id: props.formID }, 'bitapps_get_a_form')
        .then(res => {
          if (res !== undefined && res.success) {
            console.log('edit gfetched')
            const responseData = JSON.parse(res.data)
            setLayout(responseData.form_content.layout)
            setData(responseData.form_content.fields)
            setNewCounter(responseData.form_content.layout.length)
            props.setFormName(responseData.form_content.form_name)
            setisLoading(false)
          } else {
            setisLoading(false)
          }
        })
        .catch(() => {
          setisLoading(false)
        })
    }
  }

  const slimIntit = () => {
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
  }

  const setFileIcn = () => {
    // attach icon file
    const fInputs = document.querySelectorAll('.btcd-f-input>div>input')
    // eslint-disable-next-line no-restricted-syntax
    for (const inp of fInputs) {
      // eslint-disable-next-line max-len
      inp.parentNode.querySelector('.btcd-inpBtn>img').src = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJDbGlwIj48cGF0aCBkPSJtMTIuMDggNTcuNzQ5YTkgOSAwIDAgMCAxMi43MjggMGwzMS4xMTItMzEuMTEzYTEzIDEzIDAgMSAwIC0xOC4zODQtMTguMzg1bC0yMC41MDcgMjAuNTA2IDEuNDE1IDEuNDE1IDIwLjUwNi0yMC41MDZhMTEgMTEgMCAxIDEgMTUuNTU2IDE1LjU1NmwtMzEuMTEyIDMxLjExMmE3IDcgMCAwIDEgLTkuOS05LjlsMjYuODctMjYuODdhMyAzIDAgMCAxIDQuMjQyIDQuMjQzbC0xNi4yNjMgMTYuMjY0IDEuNDE0IDEuNDE0IDE2LjI2NC0xNi4yNjNhNSA1IDAgMCAwIC03LjA3MS03LjA3MWwtMjYuODcgMjYuODdhOSA5IDAgMCAwIDAgMTIuNzI4eiIvPjwvZz48L3N2Zz4='
    }
  }

  const margeNewData = () => {
    const { newData, setNewData } = props
    const { w, h, minH, maxH, minW } = newData[1]
    const x = 0
    const y = Infinity
    setNewData(null)
    setData({ ...data, [`b-${newCounter}`]: newData[0] })
    setNewCounter(newCounter + 1)
    setLayout([...layout, { i: `b-${newCounter}`, x, y, w, h, minH, maxH, minW }])
  }

  const { newData, fields, setFields } = props
  useEffect(() => {
    // comp mount
    fetchTemplate()
  }, [])

  useEffect(() => {
    if (newData !== null) {
      margeNewData()
    }
    slimIntit()

    setTimeout(() => { setFileIcn() }, 1)

    setFields(data)
  }, [data, newData, fields])

  const onLayoutChange = (lat) => {
    props.setLay(lat)
  }


  const onRemoveItem = i => {
    let lay = [...layout]
    lay = lay.filter(itm => itm.i !== i)
    const tmpData = { ...data }
    delete tmpData[i]
    setData(tmpData)
    setLayout(lay)
  }

  const onDrop = elmPrms => {
    const { draggedElm } = props
    const { w, h, minH, maxH, minW } = draggedElm[1]
    // eslint-disable-next-line prefer-const
    let { x, y } = elmPrms
    if (y !== 0) { y -= 1 }
    const newBlk = `b-${newCounter}`

    setData({ ...data, [newBlk]: draggedElm[0] })
    setNewCounter(newCounter + 1)
    setLayout([...layout, { i: newBlk, x, y, w, h, minH, maxH, minW }])
  }

  const getElmProp = e => {
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

      if (data[id].typ === 'select') {
        const allSel = document.querySelectorAll('select')
        for (let i = 0; i < allSel.length; i += 1) {
          allSel[i].parentNode.parentNode.classList.remove('z-9')
        }
        node.classList.add('z-9')
      }

      props.setElmSetting({ id, data: data[id] })
    }
  }

  const editSubmit = () => {
    props.setElmSetting({ id: '', type: 'submit', data: props.subBtn })
  }

  const compByTheme = (compData) => {
    switch (props.theme) {
      case 'default':
        return <CompGen atts={compData} />
      default:
        return null
    }
  }

  const blkGen = item => (
    <div
      key={item.i}
      className="blk"
      btcd-id={item.i}
      data-grid={item}
      onClick={getElmProp}
      onKeyPress={getElmProp}
      role="button"
      tabIndex={0}
    >
      <span
        data-close
        style={{ right: 8 }}
        unselectable="on"
        draggable="false"
        className="bit-blk-icn"
        onClick={onRemoveItem.bind(this, item.i)}
        onKeyPress={onRemoveItem.bind(this, item.i)}
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

      {compByTheme(data[item.i])}
    </div>
  )

  return (
    isLoading ? <h1>Loading</h1>
      : (
        <div style={{ width: props.width }} className="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
          <Scrollbars>
            <ResponsiveReactGridLayout
              className="layout"
              // layouts={props.lay}
              onDrop={onDrop}
              onLayoutChange={onLayoutChange}
              droppingItem={props.draggedElm[1]}
              cols={{ lg: 10 }}
              breakpoints={{ lg: 800 }}
              //  onBreakpointChange={onBreakpointChange}
              // cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
              // breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
              rowHeight={40}
              width={props.width}
              margin={[0, 0]}
              draggableCancel=".no-drg"
              draggableHandle=".drag"
              isDroppable
              useCSSTransforms
            // compactType="vertical"
            >
              {layout.map(itm => blkGen(itm))}
            </ResponsiveReactGridLayout>

            <div onClick={editSubmit} onKeyPress={editSubmit} role="button" tabIndex={0}>
              {compByTheme(props.subBtn)}
            </div>
          </Scrollbars>
        </div>
      )
  )
}

export default memo(GridLayout)
