import React, { useState } from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import { NavLink, useParams, withRouter } from 'react-router-dom'

import ToolBar from '../components/Toolbar'
import GridLayout from '../components/GridLayout'
import ElementSettings from '../components/ElmSettings'
import axios from 'axios'

function Builder(props) {
  const { formType, formID } = useParams()

  const [fulScn, setFulScn] = useState(false)
  const [elmSetting, setElmSetting] = useState({ id: null, type: null, data: null })
  const [cloneData, setCloneData] = useState()
  const [newData, setNewData] = useState(null)
  const [drgElm, setDrgElm] = useState(['', { h: 1, w: 1, i: '' }])
  const [lay, setLay] = useState(null)
  const [fields, setFields] = useState(null)
  const [tolbarSiz, setTolbarSiz] = useState(false)
  const [saved_form_id, setSaved_form_id] = formType ==='edit'? useState(formID) : useState(0)
  const [formName, setFormName] = useState("Blank Form")
  const [buttonText, setButtonText] = formType ==='edit'? useState('Update') : useState('Save')
  const updateData = (data) => {
    setCloneData({ ...cloneData, data })
  }

  setTimeout(() => { setFulScn(true) }, 500)
  const notIE = !window.document.documentMode

  React.useEffect(() => function cleanup() {
    setFulScn(false)
  }, [])

  const saveForm = () => {
    console.log('In saveForm: ', saved_form_id, formID)
    let formData = {
      layout: lay,
      fields: fields,
      form_name: formName
    }
    let action = 'bitapps_create_new_form'
    if (saved_form_id > 0 ) {
       formData = {
        layout: lay,
        fields: fields,
        form_name: formName,
        id: saved_form_id
      }

       action = 'bitapps_update_form'
    }
    axios.post(bits.ajaxURL, formData, {
      headers: {
        'Content-Type': 'application/json'
    },
    params : {
      action: action,
      _ajax_nonce: bits.nonce,
    }
    }).then((response) => {
      if (action === 'bitapps_create_new_form') {
        let data = JSON.parse(response.data.data)
        if (saved_form_id === 0 && buttonText === 'Save' ) {
          setSaved_form_id(data.id)
          setButtonText('Update')
          props.history.replace('/builder/edit/'+data.id)
        }
      }
    }).catch(error => {
      console.log('error', error);
    })
  }

  return (
    <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'} ${process.env.NODE_ENV === 'production' && 'btcd-wp-ful-scn'}`} >
      <nav className="btcd-bld-nav">
        <div className="btcd-bld-lnk">
          <NavLink to="/">
            <span className="btcd-icn icn-arrow_back" />
            {' '}
            Back
          </NavLink>
          <NavLink
            to={`/builder/${formType}/${formID}`}
            activeClassName="app-link-active"
          >
            Builder
          </NavLink>
          <NavLink
            to="/s"
            activeClassName="app-link-active"
          >
            Settings
          </NavLink>
        </div>
        <div style={{color:'#fff'}}>
        {formName}
        </div>
        <div className="btcd-bld-btn">
          <button className="btn blue" type="button" onClick={saveForm}>{buttonText}</button>
        </div>
      </nav>
      <Container className="btcd-bld-con" style={{ height: '100%' }}>
        <Section className="tool-sec" defaultSize={160} minSize={notIE && 58} style={{ flexGrow: tolbarSiz ? 0.212299 : 0.607903 }}>
          <ToolBar setDrgElm={setDrgElm} setNewData={setNewData} className="tile" tolbarSiz={tolbarSiz} setTolbarSiz={setTolbarSiz} setGridWidth={props.setGridWidth} />
        </Section>
        <Bar className="bar bar-l" />

        <Section onSizeChanged={props.setGridWidth} minSize={notIE && 320} defaultSize={props.gridWidth} style={{ flexGrow: tolbarSiz ? 3.58883 : 3.19149 }}>

          {lay !== null
            && (
              <small style={{ background: 'lightgray', padding: 8, display: 'none' }}>
                {lay.map((item, i) => (
                  <div key={`k-${i + 10}`} style={{ display: 'inline-block', padding: 5, background: 'aliceblue', margin: 5 }}>
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

          <GridLayout
            width={props.gridWidth}
            draggedElm={drgElm}
            setElmSetting={setElmSetting}
            cloneData={cloneData}
            setCloneData={setCloneData}
            newData={newData}
            setNewData={setNewData}
            formType={formType}
            formID={formID}
            setLay={setLay}
            setFields={setFields}
            setFormName={setFormName}
          />
        </Section>

        <Bar className="bar bar-r" />
        <Section id="settings-menu" defaultSize={300}>
          <ElementSettings elm={elmSetting} updateData={updateData} />
        </Section>
      </Container>
    </div>
  )
}

export default withRouter(Builder)
