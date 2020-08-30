/* eslint-disable no-param-reassign */
import React, { useState, useCallback, useReducer, useEffect } from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import merge from 'deepmerge-alt'
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
    multiAssign(style['@media only screen and (max-width: 600px)'], action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.brkPoint === 'sm') {
    multiAssign(style['@media only screen and (max-width: 400px)'], action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.type === 'init') {
    return action.style
  }
  return style
}

function FormBuilder({ isLoading, newCounter, setNewCounter, fields, setFields, subBtn, setSubBtn, lay, setLay, theme, setFormName, formID, formType, setProModal }) {
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
  const conRef = React.createRef(null)
  const notIE = !window.document.documentMode

  useEffect(() => {
    if (formType === 'new') {
      sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(defaultTheme(formID))))
      setstyleLoading(false)
    } else {
      setExistingStyle()
    }
  }, [])

  useEffect(() => {
    if (brkPoint === 'md') {
      setStyleSheet(j2c.sheet(merge(style, style['@media only screen and (max-width: 600px)'])))
    } else if (brkPoint === 'sm') {
      setStyleSheet(j2c.sheet(merge(style, style['@media only screen and (max-width: 400px)'])))
    } else if (brkPoint === 'lg') {
      setStyleSheet(j2c.sheet(style))
    }
  }, [brkPoint, style])

  const styleProvider = () => {
    if (brkPoint === 'md') {
      return merge(style, style['@media only screen and (max-width: 600px)'])
    }
    if (brkPoint === 'sm') {
      return merge(style, style['@media only screen and (max-width: 400px)'])
    }
    return style
  }

  const setExistingStyle = () => {
    // eslint-disable-next-line no-undef
    fetch(`${bits.styleURL}/bitform-${formID}.css`, { cache: 'no-store' })
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        setstyleLoading(false)
        return Promise.reject(response.statusText)
      })
      .then(styleText => {
        const oldStyle = css2json(styleText)
        styleDispatch({ type: 'init', style: oldStyle })
        // console.log('wwwww', oldStyle)
        setstyleLoading(false)
      })
  }

  console.log('ssssssssssss', style)

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
    if (view === 'lg') {
      setbrkPoint('lg')
      resizer.resizeSection(0, { toSize: 165 })
      resizer.resizeSection(2, { toSize: 300 })
    } else if (view === 'md') {
      setbrkPoint('md')
      const s0 = ((window.innerWidth - 473) / 2.2) - 165
      const s2 = ((window.innerWidth - 473) / 2.2) - 300
      resizer.resizeSection(0, { toSize: 165 + s0 })
      resizer.resizeSection(2, { toSize: 300 + s2 })
    } else if (view === 'sm') {
      setbrkPoint('sm')
      const s0 = ((window.innerWidth - 473) / 1.8) - 165
      const s2 = ((window.innerWidth - 473) / 1.8) - 300
      resizer.resizeSection(0, { toSize: 165 + s0 })
      resizer.resizeSection(2, { toSize: 300 + s2 })
    }
    conRef.current.applyResizer(resizer)
  }, [conRef])

  const setGrWidth = useCallback((gw) => {
    setGridWidth(gw)
    if (gw < 785 && gw > 535 && brkPoint !== 'md') {
      setbrkPoint('md')
    } else if (gw < 535 && brkPoint !== 'sm') {
      setbrkPoint('sm')
    } else if (gw > 785 && brkPoint !== 'lg') {
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
                { lbl: 'sm', icn: 'phone_android', tip: 'Phone View' },
                { lbl: 'md', icn: 'tablet_android', tip: 'Tablet View' },
                { lbl: 'lg', icn: 'laptop_mac', tip: 'Laptop View' },
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
              setProModal={setProModal}
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
          updateData={updateFields}
          setSubmitConfig={setSubmitConfig}
          setElementSetting={setElementSetting}
          formID={formID}
        />
      </Section>
    </Container>
  )
}

export default FormBuilder
