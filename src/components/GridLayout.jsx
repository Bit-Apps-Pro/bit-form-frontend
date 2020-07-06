/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { useState, useEffect, memo, useContext } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { Scrollbars } from 'react-custom-scrollbars'
import SlimSelect from 'slim-select'
import '../resource/css/slimselect.min.css'
import CompGen from './CompGen'
import '../resource/css/grid-layout.css'
import { AppSettings } from '../Utils/AppSettingsContext'

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
  const { reCaptchaV2 } = useContext(AppSettings)
  const { newData, setNewData, fields, setFields, newCounter, setNewCounter, style, gridWidth } = props

  const [layouts, setLayouts] = useState(props.layout)
  const [breakpoint, setBreakpoint] = useState('lg')
  const [builderWidth, setBuilderWidth] = useState(gridWidth - 32)
  const cols = { lg: 6, md: 4, sm: 2 }

  useEffect(() => {
    if (newData !== null) {
      margeNewData()
    }
    slimInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData, fields])

  // set builder width by style
  useEffect(() => {
    const newW = gridWidth - 32
    let w = 0
    if (style['._frm']['border-width']
      || style['._frm'].padding
      || style['._frm'].margin) {
      if (style['._frm']['border-width']) {
        const vals = style['._frm']['border-width'].replace(/px|em|rem/g, '').split(' ')
        w += Number(vals[1])
        w += Number(vals[3])
      }
      if (style['._frm'].padding) {
        const vals = style['._frm'].padding.replace(/px|em|rem/g, '').split(' ')
        w += Number(vals[1])
        w += Number(vals[3])
      }
      if (style['._frm'].margin) {
        const vals = style['._frm'].margin.replace(/px|em|rem/g, '').split(' ')
        w += Number(vals[1])
        w += Number(vals[3])
      }
    }
    setBuilderWidth(newW - w)
  }, [style, gridWidth])

  const sortLay = arr => {
    const newArr = arr
    for (let i = 1; i < newArr.length; i += 1) {
      let j = i - 1
      const tmp = newArr[i]
      while (j >= 0 && newArr[j].y > tmp.y) {
        newArr[j + 1] = newArr[j]
        j -= 1
      }
      newArr[j + 1] = tmp
    }
    return newArr
  }

  // eslint-disable-next-line consistent-return
  const getPos = (vgrid, width, h, col) => {
    const w = width > col ? col : width
    for (let i = 0; i < vgrid.length; i += 1) {
      for (let j = 0; j < vgrid[i].length; j += 1) {
        if (!vgrid[i][j]) {
          if (h > i) {
            vgrid.push(Array(col).fill(0));
          }
          if (col - j >= w) {
            // chek height
            let clr = true;
            for (let k = i; k < i + h; k += 1) {
              // check clr right by w
              if (k > vgrid.length - 1) {
                vgrid.push(Array(col).fill(0));
              }
              for (let m = j; m < w + j - 1; m += 1) {
                if (vgrid[k][m]) {
                  clr = false;
                }
              }
            }
            if (clr) {
              for (let r = i; r < h + i; r += 1) {
                for (let c = j; c < w + j; c += 1) {
                  // eslint-disable-next-line no-param-reassign
                  vgrid[r][c] = 1
                }
              }
              // console.log("row", i, "col", j);
              return { x: j, y: i, vgrid, w }
            }
          } else {
            break;
          }
        } else {
          vgrid.push(Array(col).fill(0));
        }
      }
    }
  }

  const genLay = (lay, col) => {
    const sortedLay = sortLay(lay)
    const nlay = []
    const nvgrid = Array(Array(col).fill(0));
    for (let i = 0; i < sortedLay.length; i += 1) {
      const o = { ...sortedLay[i] }
      const { x, y, w } = getPos(nvgrid, o.w, o.h, col);
      o.x = x;
      o.y = y;
      o.w = w;
      nlay.push(o)
    }
    return nlay;
  }

  const genFilterLay = (lay, col, idx) => {
    const nlay = []
    const nvgrid = Array(Array(col).fill(0));
    for (let i = 0; i < lay.length; i += 1) {
      const o = { ...lay[i] }
      if (o.i !== idx) {
        const { x, y, w } = getPos(nvgrid, o.w, o.h, col);
        o.x = x;
        o.y = y;
        o.w = w;
        nlay.push(o)
      }
    }
    return nlay;
  }

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
    const newBlk = { i: `bf-${newCounter + 1}-`, x, y, w, h, minH, maxH, minW }
    const tmpLayouts = layouts
    tmpLayouts[breakpoint] = sortLay(tmpLayouts[breakpoint])
    tmpLayouts.lg.push(newBlk)
    tmpLayouts.md.push(newBlk)
    tmpLayouts.sm.push(newBlk)
    if (breakpoint === 'lg') {
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'md') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'sm') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
    }
    setLayouts({ ...tmpLayouts })
    const tmpField = JSON.parse(JSON.stringify(newData[0]))
    setFields({ ...fields, [`bf-${newCounter + 1}-`]: tmpField })
    setNewCounter(newCounter + 1)
  }

  const onLayoutChange = (newLay, newLays) => {
    if (newLays.lg.length === layouts.lg.length
      && newLays.md.length === layouts.md.length
      && newLays.sm.length === layouts.sm.length) {
      setLayouts({ ...newLays })
      props.setLay({ ...newLays })
    }
  }

  const onBreakpointChange = bp => {
    setBreakpoint(bp)
  }

  const onRemoveItem = i => {
    const nwLay = {}
    nwLay.lg = genFilterLay(layouts.lg, cols.lg, i)
    nwLay.md = genFilterLay(layouts.md, cols.md, i)
    nwLay.sm = genFilterLay(layouts.sm, cols.sm, i)
    delete fields[i]
    setLayouts(nwLay)
    setFields({ ...fields })
  }

  const onDrop = elmPrms => {
    /* if (layouts.lg.length === 4) {
      alert('You can not add more than 5 field in free version.')
      return false
    } */

    const { draggedElm } = props
    const { w, h, minH, maxH, minW } = draggedElm[1]
    // eslint-disable-next-line prefer-const
    let { x, y } = elmPrms
    if (y !== 0) { y -= 1 }
    const newBlk = `bf-${newCounter + 1}-`

    const tmpLayouts = layouts
    tmpLayouts[breakpoint] = sortLay(tmpLayouts[breakpoint])
    tmpLayouts.lg.push({ i: newBlk, x, y, w, h, minH, maxH, minW })
    tmpLayouts.md.push({ i: newBlk, x, y, w, h, minH, maxH, minW })
    tmpLayouts.sm.push({ i: newBlk, x, y, w, h, minH, maxH, minW })
    if (breakpoint === 'lg') {
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'md') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'sm') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
    }
    setLayouts({ ...tmpLayouts })
    const tmpField = JSON.parse(JSON.stringify(draggedElm[0]))
    setFields({ ...fields, [newBlk]: tmpField })
    setNewCounter(newCounter + 1)
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
    if (compData.typ === 'recaptcha') {
      // eslint-disable-next-line no-param-reassign
      compData.siteKey = reCaptchaV2.siteKey
    }
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
        style={{ right: 8, fontSize: 20 }}
        unselectable="on"
        draggable="false"
        className="bit-blk-icn"
        onClick={() => onRemoveItem(item.i)}
        onKeyPress={() => onRemoveItem(item.i)}
        role="button"
        tabIndex="0"
        title="Remove"
      >
        <span className="btcd-icn icn-clear" />
      </div>
      <div
        style={{ right: 27, cursor: 'move', fontSize: 15 }}
        className="bit-blk-icn drag "
        aria-label="Move"
        title="Move"
      >
        <span className="btcd-icn icn-move1" />
      </div>
      <div
        style={{ right: 47, fontSize: 15 }}
        className="bit-blk-icn drag "
        aria-label="Settings"
        title="Settings"
      >
        <span className="btcd-icn icn-settings" />
      </div>

      {compByTheme(fields[item.i])}
    </div>
  )
  return (
    <div style={{ width: gridWidth - 9 }} className="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
      <Scrollbars autoHide>
        <div style={{ padding: 10, paddingRight: 13 }}>
          <div className="_frm">
            <ResponsiveReactGridLayout
              width={Math.round(builderWidth)}
              measureBeforeMount={false}
              isDroppable={props.draggedElm[0] !== ''}
              className="layout"
              onDrop={onDrop}
              onLayoutChange={onLayoutChange}
              droppingItem={props.draggedElm[1]}
              cols={cols}
              breakpoints={{ lg: 750, md: 500, sm: 300 }}
              rowHeight={40}
              margin={[-0.2, 0]}
              containerPadding={[1, 1]}
              draggableCancel=".no-drg"
              draggableHandle=".drag"
              layouts={layouts}
              onBreakpointChange={onBreakpointChange}
            // compactType="vertical"
            >
              {layouts[breakpoint].map(itm => blkGen(itm))}
            </ResponsiveReactGridLayout>

            <div onClick={editSubmit} onKeyPress={editSubmit} role="button" tabIndex={0}>
              {compByTheme(props.subBtn)}
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  )
}

export default memo(GridLayout)
