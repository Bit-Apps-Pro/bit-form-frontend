import React, { useState, useCallback } from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import GridLayout from '../components/GridLayout'
import CompSettings from '../components/CompSettings/CompSettings'
import ToolBar from '../components/Toolbars/Toolbar'
import GridLayoutLoader from '../components/Loaders/GridLayoutLoader'

function FormBuilder({ isLoading, newCounter, setNewCounter, fields, setFields, subBtn, setSubBtn, lay, setLay, theme, setFormName, formID, formType }) {
  const [tolbarSiz, setTolbarSiz] = useState(false)
  const [gridWidth, setGridWidth] = useState(window.innerWidth - 473)
  const [drgElm, setDrgElm] = useState(['', { h: 1, w: 1, i: '' }])
  const [elmSetting, setElmSetting] = useState({ id: null, data: { typ: '' } })
  const [newData, setNewData] = useState(null)

  const conRef = React.createRef(null)

  const notIE = !window.document.documentMode

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
    // eslint-disable-next-line no-param-reassign
    fields[updatedElm.id] = updatedElm.data
    setFields(tmp)
  }, [fields, setFields])

  const setElementSetting = elm => {
    setElmSetting(elm)
  }

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

  const responsiveView = useCallback(view => {
    const resizer = conRef.current.getResizer()
    if (view === 'lg') {
      resizer.resizeSection(0, { toSize: 165 });
      resizer.resizeSection(2, { toSize: 300 });
    } else if (view === 'md') {
      const s0 = ((window.innerWidth - 473) / 2.5) - 165
      const s2 = ((window.innerWidth - 473) / 2.5) - 300
      resizer.resizeSection(0, { toSize: 165 + s0 });
      resizer.resizeSection(2, { toSize: 300 + s2 });
    } else if (view === 'sm') {
      const s0 = ((window.innerWidth - 473) / 2) - 165
      const s2 = ((window.innerWidth - 473) / 2) - 300
      resizer.resizeSection(0, { toSize: 165 + s0 });
      resizer.resizeSection(2, { toSize: 300 + s2 });
    }
    conRef.current.applyResizer(resizer)
  }, [conRef])

  return (
    <Container
      ref={conRef}
      style={{ height: '100vh' }}
      beforeApplyResizer={onResize}
      afterResizing={afterResizing}
      onActivate={onResizeActivate}
    >
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
        />
      </Section>
      <Bar className="bar bar-l" />

      <Section
        onSizeChanged={setGridWidth}
        minSize={notIE && 320}
        defaultSize={gridWidth}
      >
        {lay.lg !== undefined && (
          <small
            style={{
              background: 'lightgray',
              padding: 8,
              display: 'none',
            }}
          >
            {lay.lg.map((item, i) => (
              <div
                key={`k-${i + 10} `}
                style={{
                  display: 'inline-block',
                  padding: 5,
                  background: 'aliceblue',
                  margin: 5,
                }}
              >
                <div>{item.i}</div>
                <span style={{ margin: 8 }}>
                  X:
                  {item.x}
                </span>
                <span style={{ margin: 8 }}>
                  Y:
                  {item.y}
                </span>
                <span style={{ margin: 8 }}>
                  W:
                  {item.w}
                </span>
                <span style={{ margin: 8 }}>
                  H:
                  {item.h}
                </span>
              </div>
            ))}
          </small>
        )}
        {!isLoading ? (
          <>
            <div className="btcd-device-btn flx">
              <button onClick={() => responsiveView('sm')} className="flx pos-rel tooltip phone" style={{ '--tooltip-txt': '"Phone View"' }} aria-label="responsive butoon" type="button"><span className="btcd-icn icn-phone_android" /></button>
              <button onClick={() => responsiveView('md')} className="flx pos-rel tooltip tab" style={{ '--tooltip-txt': '"Tablet View"' }} aria-label="responsive butoon" type="button"><span className="btcd-icn icn-tablet_android" /></button>
              <button onClick={() => responsiveView('lg')} className="flx pos-rel tooltip lap" style={{ '--tooltip-txt': '"Laptop View"' }} aria-label="responsive butoon" type="button"><span className="btcd-icn icn-laptop_mac" /></button>
            </div>
            <GridLayout
              theme={theme}
              width={gridWidth}
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
              isLoading={isLoading}
              newCounter={newCounter}
              setNewCounter={setNewCounter}
              layout={lay}
            />
          </>
        ) : <GridLayoutLoader />}

      </Section>

      <Bar className="bar bar-r" />
      <Section id="settings-menu" defaultSize={300}>
        <CompSettings
          elm={elmSetting}
          updateData={updateFields}
          setSubmitConfig={setSubmitConfig}
        />
      </Section>
    </Container>
  )
}

export default FormBuilder
