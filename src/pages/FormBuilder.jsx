import React, { useState } from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import GridLayout from '../components/GridLayout'
import CompSettings from '../components/CompSettings/CompSettings'
import ToolBar from '../components/Toolbars/Toolbar'
import GridLayoutLoader from '../components/Loaders/GridLayoutLoader'

function FormBuilder({ isLoading, newCounter, fields, setFields, subBtn, setSubBtn, lay, setLay, theme, setNewCounter, setFormName, formID, formType }) {
  const [tolbarSiz, setTolbarSiz] = useState(false)
  const [gridWidth, setGridWidth] = useState(window.innerWidth - 480)
  const [drgElm, setDrgElm] = useState(['', { h: 1, w: 1, i: '' }])
  const [elmSetting, setElmSetting] = useState({ id: null, data: { typ: '' } })
  const [newData, setNewData] = useState(null)

  const notIE = !window.document.documentMode

  const conRef = React.createRef(null)

  const setConSiz = () => {
    const res = conRef.current.getResizer()
    if (res.getSectionSize(0) >= 160) {
      res.resizeSection(0, { toSize: 50 })
      setTolbarSiz(true)
    } else {
      res.resizeSection(0, { toSize: 160 })
      setTolbarSiz(false)
    }
    conRef.current.applyResizer(res)
  }

  const updateFields = updatedElm => {
    const tmp = { ...fields }
    // eslint-disable-next-line no-param-reassign
    fields[updatedElm.id] = updatedElm.data
    setFields(tmp)
  }

  const setElementSetting = elm => {
    setElmSetting(elm)
  }

  const addNewData = ndata => {
    setNewData(ndata)
  }

  const setSubmitConfig = data => {
    setSubBtn({ ...data })
  }

  return (
    <Container ref={conRef} className="btcd-bld-con" style={{ height: '100%' }}>
      <Section
        className="tool-sec"
        defaultSize={160}
        minSize={notIE && 58}
      >
        <ToolBar
          setDrgElm={setDrgElm}
          setNewData={addNewData}
          className="tile"
          tolbarSiz={tolbarSiz}
          setTolbarSiz={setConSiz}
        />
      </Section>
      <Bar className="bar bar-l" />

      <Section
        onSizeChanged={setGridWidth}
        minSize={notIE && 320}
        defaultSize={gridWidth}
      >
        {lay !== null && (
          <small
            style={{
              background: 'lightgray',
              padding: 8,
              display: 'none',
            }}
          >
            {lay.map((item, i) => (
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
