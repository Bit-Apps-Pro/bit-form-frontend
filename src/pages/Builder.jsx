import React, { useState, useContext, useCallback, memo, useEffect } from 'react'
import { Container, Section, Bar } from 'react-simple-resizer'
import { Switch, Route, NavLink, useParams, withRouter } from 'react-router-dom'
import ToolBar from '../components/Toolbar'
import GridLayout from '../components/GridLayout'
import CompSettings from '../components/CompSettings/CompSettings'
import FormSettings from '../components/FormSettings'
import FormEntries from './FormEntries'
import bitsFetch from '../Utils/bitsFetch'
import { BitappsContext } from '../Utils/BitappsContext'

function Builder(props) {
  console.log('%c $render Builder', 'background:purple;padding:3px;border-radius:5px;color:white')

  const { formType, formID } = useParams()
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
  const { allFormsData, snackMsg } = useContext(BitappsContext)
  const { allFormsDispatchHandler } = allFormsData
  const { setSnackbar } = snackMsg

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

  const conRef = React.createRef()

  const setConSiz = useCallback(() => {
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

  useEffect(() => {
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

  const handleFormName = e => {
    setFormName(e.target.value)
  }

  const saveForm = () => {
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

    bitsFetch(formData, action)
      .then(response => {
        if (response.success) {
          let { data } = response
          if (typeof data !== 'object') {
            data = JSON.parse(data)
          }
          if (action === 'bitapps_create_new_form') {
            if (savedFormId === 0 && buttonText === 'Save') {
              setSavedFormId(data.id)
              setButtonText('Update')
              props.history.replace(`/builder/edit/${data.id}`)
              setSnackbar({ show: true, msg: 'Form Saved Successfully.' })
            }
            allFormsDispatchHandler({ type: 'add', data: { formID: data.id, status: true, formName, shortcode: `bitapps id='${data.id}'`, entries: 0, views: 0, conversion: (0).toPrecision(3), created_at: data.created_at } })
          } else if (action === 'bitapps_update_form') {
            setSnackbar({ show: true, msg: 'Form Updated Successfully.' })
            allFormsDispatchHandler({ type: 'update', data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitapps id='${data.id}'`, entries: data.entries, views: data.views, conversion: ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at } })
          }
        }
      })
  }

  const setSubmitConfig = useCallback(data => {
    setSubBtn({ ...data })
  }, [])

  const updateFields = useCallback(updatedElm => {
    const tmp = { ...fields }
    fields[updatedElm.id] = updatedElm.data
    setFields(tmp)
  }, [fields])

  const setElementSetting = useCallback(elm => {
    setElmSetting(elm)
  }, [])

  const addNewData = useCallback(ndata => {
    setNewData(ndata)
  }, [])

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
            onChange={handleFormName}
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
              onSizeChanged={props.setGridWidth}
              minSize={notIE && 320}
              defaultSize={props.gridWidth}
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
              />
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
          <FormEntries />
        </Route>
      </Switch>
    </div>
  )
}

export default memo(withRouter(Builder))
