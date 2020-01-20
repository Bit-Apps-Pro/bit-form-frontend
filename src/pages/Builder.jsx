import React,{useState} from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import { NavLink as Link } from 'react-router-dom'
import ToolBar from '../components/Toolbar'
import GridLayout from '../components/GridLayout'
import ElementSettings from '../components/ElmSettings'
import axios from 'axios'

export default function Builder(props) {
  const [fulScn, setFulScn] = React.useState(false)
  const [elmSetting, setElmSetting] = React.useState({ id: null, type: null, data: null })
  const [cloneData, setCloneData] = React.useState()
  const [newData, setNewData] = React.useState(null)
  const [drgElm, setDrgElm] = React.useState(['', { h: 1, w: 1, i: '' }])

  const updateData = (data) => {
    setCloneData({ ...cloneData, data })
  }

  setTimeout(() => { setFulScn(true) }, 500)
  const notIE = !window.document.documentMode

  React.useEffect(() => {
    return function cleanup() {
      setFulScn(false)
    }
  }, [])

  return (
    <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
      <nav className="btcd-bld-nav">
        <div className="btcd-bld-lnk">
          <Link to="/">
            <span className="btcd-icn icn-arrow_back" />
            {' '}
            Back
          </Link>
          <Link to={`/builder/${props.preLayout}`}>Builder</Link>
          <Link to="/">Settings</Link>
        </div>
        <div className="btcd-bld-btn">
          <button className="btn blue" type="button">Save</button>
        </div>
      </nav>
      <Container>
        <Section defaultSize={160} minSize={notIE && 60}>
          <ToolBar setDrgElm={setDrgElm} setNewData={setNewData} className="tile" />
        </Section>
        <Bar className="bar" />

        <Section onSizeChanged={props.setGridWidth} minSize={notIE && 320} defaultSize={props.gridWidth}>
          <div className="layoutJSON">
            Displayed as
            <code>[x, y, w, h]</code>
            :
            <div className="columns">{/* props.stringifyLayout() */}</div>
          </div>
          <GridLayout
            width={props.gridWidth}
            draggedElm={drgElm}
            setElmSetting={setElmSetting}
            cloneData={cloneData}
            setCloneData={setCloneData}
            newData={newData}
            setNewData={setNewData}
            preLayout={props.preLayout}
          />
        </Section>

        <Bar className="bar" />
        <Section id="settings-menu" defaultSize={300}>
          <ElementSettings key="elm-settins1" elm={elmSetting} updateData={updateData} />
        </Section>
      </Container>
    </div>
  )
}
