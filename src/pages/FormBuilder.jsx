/* eslint-disable no-param-reassign */
import { createRef, useState, useCallback, useReducer, useEffect } from 'react';
import { Container, Section, Bar } from 'react-simple-resizer'
import merge from 'deepmerge-alt'
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import css2json from '../Utils/css2json'
import j2c from '../Utils/j2c.es6'
import GridLayout from '../components/GridLayout'
import CompSettings from '../components/CompSettings/CompSettings'
import ToolBar from '../components/Toolbars/Toolbar'
import GridLayoutLoader from '../components/Loaders/GridLayoutLoader'
import { defaultTheme } from '../components/CompSettings/StyleCustomize/ThemeProvider'
import { multiAssign, bitCipher } from '../Utils/Helpers'

const styleReducer = (style, action) => {
  if (action.brkPoint === 'lg') {
    multiAssign(style, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.brkPoint === 'md') {
    const st = style['@media only screen and (max-width:600px)'] || style['@media only screen and (max-width: 600px)']
    multiAssign(st, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.brkPoint === 'sm') {
    const st = style['@media only screen and (max-width:400px)'] || style['@media only screen and (max-width: 400px)']
    multiAssign(st, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.type === 'init') {
    return action.style
  }
  return style
}

function FormBuilder({ isLoading, newCounter, setNewCounter, fields, setFields, subBtn, setSubBtn, lay, setLay, theme, setFormName, formID, formType }) {
  const [tolbarSiz, setTolbarSiz] = useState(false)
  const [gridWidth, setGridWidth] = useState(window.innerWidth - 468)
  const [drgElm, setDrgElm] = useState(['', { h: 1, w: 1, i: '' }])
  const [elmSetting, setElmSetting] = useState({ id: null, data: { typ: '' } })
  const [newData, setNewData] = useState(null)
  const [brkPoint, setbrkPoint] = useState('lg')
  const [style, styleDispatch] = useReducer(styleReducer, defaultTheme(formID))
  const [styleSheet, setStyleSheet] = useState(j2c.sheet(style))
  const [styleLoading, setstyleLoading] = useState(true)
  const [isToolDragging, setisToolDragging] = useState(false)
  const conRef = createRef(null)
  const notIE = !window.document.documentMode

  useEffect(() => {
    if (formType === 'new') {
      sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(defaultTheme(formID))))
      setstyleLoading(false)
    } else {
      setExistingStyle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (brkPoint === 'md') {
      const st = style['@media only screen and (max-width:600px)'] || style['@media only screen and (max-width: 600px)']
      setStyleSheet(j2c.sheet(merge(style, st)))
    } else if (brkPoint === 'sm') {
      const st = style['@media only screen and (max-width:400px)'] || style['@media only screen and (max-width: 400px)']
      setStyleSheet(j2c.sheet(merge(style, st)))
    } else if (brkPoint === 'lg') {
      setStyleSheet(j2c.sheet(style))
    }
  }, [brkPoint, style])

  const styleProvider = () => {
    if (brkPoint === 'md') {
      const st = style['@media only screen and (max-width:600px)'] || style['@media only screen and (max-width: 600px)']
      return merge(style, st)
    }
    if (brkPoint === 'sm') {
      const st = style['@media only screen and (max-width:400px)'] || style['@media only screen and (max-width: 400px)']
      return merge(style, st)
    }
    return style
  }

  const setExistingStyle = () => {
    const headers = new Headers()
    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')
    // eslint-disable-next-line no-undef
    const styleUrl = new URL(bits.styleURL);
    if (styleUrl.protocol !== window.location.protocol) {
      styleUrl.protocol = window.location.protocol
    }
    console.log('styleUrl', styleUrl)
    fetch(`${styleUrl}/bitform-${formID}.css`, { cache: 'no-store', headers })
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        setstyleLoading(false)
        return Promise.reject(response.statusText)
      })
      .then(oldStyleText => {
        const oldStyle = css2json(oldStyleText)
        styleDispatch({ type: 'init', style: oldStyle })
        setstyleLoading(false)
        recheckStyleById(oldStyleText)
      })
      .catch(() => {
        const dfThm = defaultTheme(formID)
        styleDispatch({ type: 'init', style: dfThm })
        sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(dfThm)))
      })
  }

  const recheckStyleById = (oldStyleText) => {
    if (!new RegExp(`._frm-bg-${formID}|._frm-${formID}`, 'g').test(oldStyleText)
      || oldStyleText.match(/._frm-bg-\d+/g)?.[0] !== `._frm-bg-${formID}`) {
      const replaceId = oldStyleText.match(/._frm-bg-\d+/g)?.[0].replace(/._frm-bg-/g, '')
      if (replaceId !== undefined) {
        oldStyleText = oldStyleText.replaceAll(new RegExp(`-${replaceId}`, 'g'), `-${formID}`)
      }
    }
    const modifiedStyle = css2json(oldStyleText)
    styleDispatch({ type: 'init', style: modifiedStyle })
    sessionStorage.setItem('btcd-fs', bitCipher(oldStyleText))
  }

  const setTolbar = useCallback(() => {
    const res = conRef.current.getResizer()
    if (res.getSectionSize(0) >= 160) {
      res.resizeSection(0, { toSize: 50 })
      setTolbarSiz(true)
    } else {
      res.resizeSection(0, { toSize: 160 })
      setTolbarSiz(false)
    }
    conRef.current.applyResizer(res)
  }, [conRef])

  const updateFields = useCallback(updatedElm => {
    const tmp = { ...fields }
    tmp[updatedElm.id] = updatedElm.data
    setFields(tmp)
  }, [fields, setFields])

  const setElementSetting = useCallback(elm => {
    setElmSetting(elm)
  }, [])

  const addNewData = useCallback(ndata => {
    setNewData(ndata)
  }, [])

  const setSubmitConfig = useCallback(data => {
    setSubBtn({ ...data })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subBtn])

  const onResize = useCallback(resizer => {
    if (resizer.isBarActivated(1)) {
      resizer.resizeSection(0, { toSize: resizer.getSectionSize(2) - 135 });
    }
  }, [])

  const onResizeActivate = useCallback(() => {
    document.querySelector('.tool-sec').style.transition = 'flex-grow 0ms'
  }, [])

  const afterResizing = useCallback(() => {
    document.querySelector('.tool-sec').style.transition = 'flex-grow 500ms'
  }, [])

  const setResponsiveView = useCallback(view => {
    const resizer = conRef.current.getResizer()
    const leftBarWidth = 165
    const rightBarWidth = 307
    const mobileSize = 320
    const tabletSize = 510
      if (view === 'lg') {
      setbrkPoint('lg')
      resizer.resizeSection(0, { toSize: leftBarWidth })
      resizer.resizeSection(2, { toSize: rightBarWidth })
    } else if (view === 'md') {
      setbrkPoint('md')
      const dividedWidth = (window.innerWidth - tabletSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    } else if (view === 'sm') {
      setbrkPoint('sm')
      const dividedWidth = (window.innerWidth - mobileSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    }
    conRef.current.applyResizer(resizer)
  }, [conRef])

  const setGrWidth = useCallback((gw) => {
    setGridWidth(gw)
    if (gw < 765 && gw > 525 && brkPoint !== 'md') {
      setbrkPoint('md')
    } else if (gw < 525 && brkPoint !== 'sm') {
      setbrkPoint('sm')
    } else if (gw > 765 && brkPoint !== 'lg') {
      setbrkPoint('lg')
    }
  }, [brkPoint])

  return (
    <Container
      ref={conRef}
      style={{ height: '100vh' }}
      beforeApplyResizer={onResize}
      afterResizing={afterResizing}
      onActivate={onResizeActivate}
    >
      <style>{styleSheet}</style>
      <Section
        className="tool-sec"
        defaultSize={165}
        minSize={notIE && 58}
      >
        <ToolBar
          setDrgElm={setDrgElm}
          setNewData={addNewData}
          className="tile"
          tolbarSiz={tolbarSiz}
          setTolbar={setTolbar}
          setisToolDragging={setisToolDragging}
        />
      </Section>
      <Bar className="bar bar-l" />

      <Section
        onSizeChanged={setGrWidth}
        minSize={notIE && 320}
        defaultSize={gridWidth}
      >
        {!isLoading && !styleLoading ? (
          <>
            <div className="btcd-device-btn flx">
              {[
                { lbl: 'sm', icn: 'phone_android', tip: __('Phone View', 'bitform') },
                { lbl: 'md', icn: 'tablet_android', tip: __('Tablet View', 'bitform') },
                { lbl: 'lg', icn: 'laptop_mac', tip: __('Laptop View', 'bitform') },
              ]
                .map(itm => <button key={itm.icn} onClick={() => setResponsiveView(itm.lbl)} className={`flx pos-rel tooltip phone ${brkPoint === itm.lbl && 'active'}`} style={{ '--tooltip-txt': `"${itm.tip}"` }} aria-label="responsive butoon" type="button"><span className={`btcd-icn icn-${itm.icn}`} /></button>)}
            </div>
            <GridLayout
              theme={theme}
              style={styleProvider()}
              gridWidth={gridWidth}
              draggedElm={drgElm}
              setElmSetting={setElementSetting}
              fields={fields}
              newData={newData}
              setNewData={setNewData}
              formType={formType}
              formID={formID}
              setLay={setLay}
              setFields={setFields}
              setFormName={setFormName}
              subBtn={subBtn}
              newCounter={newCounter}
              setNewCounter={setNewCounter}
              layout={lay}
              isToolDragging={isToolDragging}
            />
          </>
        ) : <GridLayoutLoader />}

      </Section>

      <Bar className="bar bar-r" />
      <Section id="settings-menu" defaultSize={300}>
        <CompSettings
          brkPoint={brkPoint}
          style={styleProvider()}
          setResponsiveView={setResponsiveView}
          styleDispatch={styleDispatch}
          fields={fields}
          elm={elmSetting}
          setElementSetting={setElementSetting}
          updateData={updateFields}
          setSubmitConfig={setSubmitConfig}
          formID={formID}
          lay={lay}
          setLay={setLay}
        />
      </Section>
    </Container>
  )
}

export default FormBuilder
