import React from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import { Link } from '@reach/router'
import ToolBar from '../components/Toolbar'
import GridLayout from '../components/GridLayout'
import ElementSettings from '../components/ElmSettings'

export default function Builder(props) {
  const [fulScn, setFulScn] = React.useState(false)
  setTimeout(() => { setFulScn(true) }, 500)

  React.useEffect(() => {
    console.log(props.preLayout)
  }, [])
  const notIE = !window.document.documentMode

  return (
    <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
      <nav className="btcd-bld-nav">
        <div className="btcd-bld-lnk">
          <Link to="/">
            <span className="btcd-icn icn-arrow_back" />
            {' '}
            Back
          </Link>
          <Link to="/">Settings</Link>
        </div>
        <div className="btcd-bld-btn">
          <button className="btn blue" type="button">Save</button>
        </div>
      </nav>
      <Container>
        <Section defaultSize={160} minSize={notIE && 60}>
          <ToolBar setDrgElm={props.setDrgElm} onAddItem={props.onAddItem} className="tile" />
        </Section>
        <Bar className="bar" />

        <Section onSizeChanged={props.setGridWidth} minSize={notIE && 320} defaultSize={props.gridWidth}>
          <div className="layoutJSON">
            Displayed as
            <code>[x, y, w, h]</code>
            :
            <div className="columns">{props.stringifyLayout()}</div>
          </div>
          <GridLayout
            newCounter={props.newCounter}
            onAddItem={props.onAddItem}
            layout={props.layout}
            setLayout={props.setLayout}
            width={props.gridWidth}
            onLayoutChange={props.onLayoutChange}
            draggedElm={props.draggedElm}
            data={props.data}
            addData={props.addData}
            getElmSettings={props.getElmSettings}
            forceRender={props.forceRender}
          />
        </Section>

        <Bar className="bar" />
        <Section id="settings-menu" defaultSize={300}>
          <ElementSettings key="elm-settins1" elm={props.settings} updateData={props.updateData} />
        </Section>
      </Container>
    </div>
  )
}
