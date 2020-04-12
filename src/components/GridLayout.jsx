/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { Scrollbars } from 'react-custom-scrollbars'
import SlimSelect from 'slim-select'
import '../resource/css/slimselect.min.css'
import CompGen from './CompGen'

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

  const { newData, setNewData, fields, setFields, newCounter, setNewCounter, isLoading } = props

  const [layout, setLayout] = useState(props.layout)
  // const [breakpoint, setBreakpoint] = useState('md')
  const slimInit = () => {
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

  const margeNewData = () => {
    const { w, h, minH, maxH, minW } = newData[1]
    const x = 0
    const y = Infinity
    setNewData(null)
    setFields({ ...fields, [`b-${newCounter + 1}`]: newData[0] })
    setNewCounter(newCounter + 1)
    setLayout([...layout, { i: `b-${newCounter + 1}`, x, y, w, h, minH, maxH, minW }])
  }

  useEffect(() => {
    if (newData !== null) {
      margeNewData()
    }
    slimInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData, fields, isLoading])

  const onLayoutChange = (lat) => {
    props.setLay(lat)
  }

  const onRemoveItem = i => {
    let lay = [...layout]
    lay = lay.filter(itm => itm.i !== i)
    const tmpData = { ...fields }
    delete tmpData[i]
    setFields(tmpData)
    setLayout(lay)
  }

  const onDrop = elmPrms => {
    const { draggedElm } = props
    const { w, h, minH, maxH, minW } = draggedElm[1]
    // eslint-disable-next-line prefer-const
    let { x, y } = elmPrms
    if (y !== 0) { y -= 1 }
    const newBlk = `b-${newCounter + 1}`

    setFields({ ...fields, [newBlk]: draggedElm[0] })
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

      if (fields[id].typ === 'select') {
        const allSel = document.querySelectorAll('select')
        for (let i = 0; i < allSel.length; i += 1) {
          allSel[i].parentNode.parentNode.classList.remove('z-9')
        }
        node.classList.add('z-9')
      }

      props.setElmSetting({ id, data: fields[id] })
    }
  }

  const editSubmit = () => {
    props.setElmSetting({ id: '', type: 'submit', data: props.subBtn })
  }

  const compByTheme = compData => {
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
      <div
        data-close
        style={{ right: 8 }}
        unselectable="on"
        draggable="false"
        className="bit-blk-icn"
        onClick={() => onRemoveItem(item.i)}
        onKeyPress={() => onRemoveItem(item.i)}
        role="button"
        tabIndex={-1}
      >
        &times;
      </div>
      <div
        style={{ right: 27, cursor: 'move', fontSize: 15 }}
        className="bit-blk-icn drag "
        aria-label="Move"
      >
        <span className="btcd-icn icn-move" />
      </div>

      {compByTheme(fields[item.i])}
    </div>
  )

  return (
    isLoading ? <h1>Loading</h1>
      : (
        <div style={{ width: props.width - 15 }} className="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
          <Scrollbars>
            <ResponsiveReactGridLayout
              isDroppable
              className="layout"
              onDrop={onDrop}
              onLayoutChange={onLayoutChange}
              droppingItem={props.draggedElm[1]}
              cols={{ lg: 10 }}
              breakpoints={{ lg: 800 }}
              rowHeight={40}
              width={props.width - 15}
              margin={[0, 0]}
              draggableCancel=".no-drg"
              draggableHandle=".drag"
              useCSSTransforms
              containerPadding={[1, 1]}
            // layouts={props.lay}
            // onBreakpointChange={onBreakpointChange}
            // cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
            // breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
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

export default (GridLayout)
