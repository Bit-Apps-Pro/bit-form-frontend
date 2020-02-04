import React, { useState } from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import { Switch, Route, NavLink, useParams, withRouter } from 'react-router-dom'
import ToolBar from '../components/Toolbar'
import GridLayout from '../components/GridLayout'
import CompSettings from '../components/CompSettings'
import FormSettings from '../components/FormSettings'
import bitsFetch, { prepareData } from '../Utils/bitsFetch'

function Builder(props) {
  const { formType, formID } = useParams()

  // console.log(url)
  const [fulScn, setFulScn] = useState(false)
  const [elmSetting, setElmSetting] = useState({ id: null, data: { typ: '' } })
  const [newData, setNewData] = useState(null)
  const [drgElm, setDrgElm] = useState(['', { h: 1, w: 1, i: '' }])
  const [lay, setLay] = useState(null)
  const [fields, setFields] = useState(null)
  const [tolbarSiz, setTolbarSiz] = useState(false)
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const [formName, setFormName] = useState('Form Name')
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const [forceRender, setForceRender] = useState(false)
  const [updatedData, updateData] = useState(null)
  const [subBtn, setSubBtn] = useState({
    typ: 'submit',
    btnSiz: 'md',
    fulW: false,
    align: 'right',
    subBtnTxt: 'Submit',
    rstBtnTxt: 'Reset',
  })

  const [formSettings, setFormSettings] = useState({
    formName,
    theme: 'default',
    submitBtn: subBtn,
    confirmation: { type: 'msg', txt: '' },
  })

  const notIE = !window.document.documentMode
  setTimeout(() => { setFulScn(true) }, 500)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    if (process.env.NODE_ENV === 'production') {
      document.getElementsByClassName('wp-toolbar')[0].style.paddingTop = 0
      document.getElementById('wpadminbar').style.display = 'none'
      document.getElementById('adminmenumain').style.display = 'none'
      document.getElementById('adminmenuback').style.display = 'none'
      document.getElementById('adminmenuwrap').style.display = 'none'
      document.getElementById('wpfooter').style.display = 'none'
      document.getElementById('wpcontent').style.marginLeft = 0
    }
    return function cleanup() {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      if (process.env.NODE_ENV === 'production') {
        document.getElementsByClassName('wp-toolbar')[0].style.paddingTop = '32px'
        document.getElementById('wpadminbar').style.display = 'block'
        document.getElementById('adminmenumain').style.display = 'block'
        document.getElementById('adminmenuback').style.display = 'block'
        document.getElementById('adminmenuwrap').style.display = 'block'
        document.getElementById('wpcontent').style.marginLeft = '160px'
        document.getElementById('wpfooter').style.display = 'block'
      }
      setFulScn(false)
    }
  }, [])

  const saveForm = () => {
    console.log('In saveForm: ', savedFormId, formID)
    let formData = {
      layout: lay,
      fields,
      form_name: formName,
    }
    let action = 'bitapps_create_new_form'
    if (savedFormId > 0) {
      formData = {
        layout: lay,
        fields,
        form_name: formName,
        id: savedFormId,
      }

      action = 'bitapps_update_form'
    }

    formData = process.env.NODE_ENV === 'development' ? prepareData(formData) : formData
    bitsFetch(formData, action)
      .then(response => {
        if (action === 'bitapps_create_new_form') {
          const data = JSON.parse(response.data)
          if (savedFormId === 0 && buttonText === 'Save') {
            if (process.env.NODE_ENV === 'production') {
              // eslint-disable-next-line no-undef
              bits.allForms = [...bits.allForms, { formID: data.id, status: true, formName, shortcode: `bitapps id='${data.id}'`, entries: 0, views: 0, conversion: (0 * 100).toPrecision(3), created_at: data.created_at }]
              console.log(bits.allForms)
            }
            setSavedFormId(data.id)
            setButtonText('Update')
            props.history.replace(`/builder/edit/${data.id}`)
          }
        }
      })
  }

  const setSubmitConfig = data => {
    setForceRender(!forceRender)
    setSubBtn(data)
  }

  return (
    <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
      <nav className="btcd-bld-nav">
        <div className="btcd-bld-lnk">
          <NavLink exact to="/">
            <span className="btcd-icn icn-arrow_back" />
            {' '}
            Back
          </NavLink>
          <NavLink
            exact
            to={`/builder/${formType}/${formID}`}
            activeClassName="app-link-active"
          >
            Builder
          </NavLink>
          <NavLink
            to={`/builder/${formType}/${formID}/responses`}
            activeClassName="app-link-active"
          >
            Responses
          </NavLink>
          <NavLink
            to={`/builder/${formType}/${formID}/settings/`}
            activeClassName="app-link-active"
          >
            Settings
          </NavLink>
        </div>
        <div className="btcd-bld-title">
          <input
            className="btcd-bld-title-inp br-50"
            onChange={e => setFormName(e.target.value)}
            value={formName}
          />
        </div>

        <div className="btcd-bld-btn">
          <button className="btn blue" type="button" onClick={saveForm}>
            {buttonText}
          </button>
          <NavLink to="/" className="btn btcd-btn-close">
            &#10799;
          </NavLink>
        </div>
      </nav>

      <Switch>
        <Route exact path="/builder/:formType/:formID">
          <Container className="btcd-bld-con" style={{ height: '100%' }}>
            <Section
              className="tool-sec"
              defaultSize={160}
              minSize={notIE && 58}
              style={{ flexGrow: tolbarSiz ? 0.212299 : 0.607903 }}
            >
              <ToolBar
                setDrgElm={setDrgElm}
                setNewData={setNewData}
                className="tile"
                tolbarSiz={tolbarSiz}
                setTolbarSiz={setTolbarSiz}
                setGridWidth={props.setGridWidth}
              />
            </Section>
            <Bar className="bar bar-l" />

            <Section
              onSizeChanged={props.setGridWidth}
              minSize={notIE && 320}
              defaultSize={props.gridWidth}
              style={{ flexGrow: tolbarSiz ? 3.58883 : 3.19149 }}
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

              <GridLayout
                theme={formSettings.theme}
                width={props.gridWidth}
                draggedElm={drgElm}
                setElmSetting={setElmSetting}
                newData={newData}
                setNewData={setNewData}
                formType={formType}
                formID={formID}
                setLay={setLay}
                setFields={setFields}
                setFormName={setFormName}
                forceRender={forceRender}
                updatedData={updatedData}
                updateData={updateData}
                subBtn={subBtn}
              />
            </Section>

            <Bar className="bar bar-r" />
            <Section id="settings-menu" defaultSize={300}>
              <CompSettings
                elm={elmSetting}
                updateData={updateData}
                setSubmitConfig={setSubmitConfig}
              />
            </Section>
          </Container>
        </Route>
        <Route path="/builder/:formType/:formID/settings/:subSettings?">
          <FormSettings
            formName={formName}
            setFormName={setFormName}
            formSettings={formSettings}
            setFormSettings={setFormSettings}
          />
        </Route>
        <Route path="/builder/:formType/:formID/responses/">
          responses
        </Route>
      </Switch>
    </div>
  )
}

export default withRouter(Builder)
