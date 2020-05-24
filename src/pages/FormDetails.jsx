import React, { useState, useContext, memo, useEffect, lazy, Suspense } from 'react'
import { Switch, Route, NavLink, useParams, withRouter } from 'react-router-dom'
import FormSettings from './FormSettings'
import FormEntries from './FormEntries'
import bitsFetch from '../Utils/bitsFetch'
import { AllFormContext } from '../Utils/AllFormContext'
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg'
import BuilderLoader from '../components/Loaders/BuilderLoader'
import '../resource/sass/components.scss'

const FormBuilder = lazy(() => import('./FormBuilder'))

function Builder(props) {
  console.log('%c $render Form Details', 'background:purple;padding:3px;border-radius:5px;color:white')

  const { formType, formID } = useParams()
  const [fulScn, setFulScn] = useState(true)
  const [newCounter, setNewCounter] = useState(0)
  const [isLoading, setisLoading] = useState(true)
  const [lay, setLay] = useState({ lg: [], md: [], sm: [] })
  const [fields, setFields] = useState(null)
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const [formName, setFormName] = useState('Form Name')
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const { allFormsData, reportsData } = useContext(AllFormContext)
  const [snack, setSnackbar] = useState({ show: false })
  const { allFormsDispatchHandler } = allFormsData
  const { reports, reportsDispatch } = reportsData

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchTemplate()
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
        document.getElementById('wpcontent').style.marginLeft = null
        document.getElementById('wpfooter').style.display = 'block'
      }
      setFulScn(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [subBtn, setSubBtn] = useState({
    typ: 'submit',
    btnSiz: 'md',
    fulW: false,
    align: 'right',
    subBtnTxt: 'Submit',
    rstBtnTxt: 'Reset',
  })

  const [mailTem, setMailTem] = useState([])

  const [integrations, setIntegration] = useState([])

  const [workFlows, setworkFlows] = useState([])

  const [additional, setadditional] = useState({
    enabled: {},
    settings: {},
  })
  console.log('STAreports', reports)
  const [formSettings, setFormSettings] = useState({
    formName,
    theme: 'default',
    submitBtn: subBtn,
    confirmation: {
      type: {
        successMsg: [{ title: 'Message Title 1', msg: 'Successfully Submitted.' }],
        redirectPage: [{ title: 'Redirect Url 1', url: '' }],
        webHooks: [{ title: 'Web Hook 1', url: '', method: 'GET' }],
      },
    },
    mailTem,
    integrations,
    additional,
  })

  const fetchTemplate = () => {
    if (formType === 'new') {
      if (formID === 'blank') {
        setisLoading(false)
      } else {
        bitsFetch({ template: formID }, 'bitforms_get_template')
          .then(res => {
            if (res !== undefined && res.success) {
              let responseData = JSON.parse(res.data)
              if (typeof data !== 'object') {
                responseData = JSON.parse(res.data)
              }
              responseData.form_content.layout !== undefined && setLay(responseData.form_content.layout)
              setFields(responseData.form_content.fields)
              setNewCounter(responseData.form_content.layout.lg.length + 1)
              setFormName(responseData.form_content.form_name)
              setisLoading(false)
            } else {
              setisLoading(false)
            }
          })
          .catch(() => {
            setisLoading(false)
          })
      }
    } else if (formType === 'edit') {
      bitsFetch({ id: formID }, 'bitforms_get_a_form')
        .then(res => {
          if (res !== undefined && res.success) {
            const responseData = res.data
            responseData.form_content.layout !== undefined && setLay(responseData.form_content.layout)
            setFields(responseData.form_content.fields)
            setNewCounter(responseData.form_content.layout.lg.length + 1)
            setFormName(responseData.form_content.form_name)
            setFormSettings(responseData.formSettings)
            setworkFlows(responseData.workFlows)
            setadditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setMailTem(responseData.formSettings.mailTem)
            if ('reports' in responseData) /* setAllReport(responseData.reports) */ reportsDispatch({ type: 'set', reports: responseData.reports })
            setisLoading(false)
          } else {
            setisLoading(false)
          }
        })
        .catch(() => {
          setisLoading(false)
        })
    }
  }

  const handleFormName = e => {
    setFormName(e.target.value)
  }

  const saveForm = () => {
    setbuttonDisabled(true)
    let formData = {
      layout: lay,
      fields,
      form_name: formName,
      formSettings,
      workFlows,
      mailTem,
      integrations,
      additional,
    }
    let action = 'bitforms_create_new_form'
    if (savedFormId > 0) {
      formData = {
        id: savedFormId,
        layout: lay,
        fields,
        form_name: formName,
        formSettings,
        workFlows,
        additional,
        reports,
      }
      action = 'bitforms_update_form'
    }

    bitsFetch(formData, action)
      .then(response => {
        if (response !== undefined && response.success) {
          let { data } = response
          if (typeof data !== 'object') {
            data = JSON.parse(data)
          }
          if (action === 'bitforms_create_new_form') {
            if (savedFormId === 0 && buttonText === 'Save') {
              setSavedFormId(data.id)
              setButtonText('Update')
              props.history.replace(`/builder/edit/${data.id}`)
              setSnackbar({ show: true, msg: data.message })
              if ('formSettings' in data) setFormSettings(data.formSettings)
              if ('workFlows' in data) setworkFlows(data.workFlows)
              if ('formSettings' in data && 'integrations' in formSettings) setIntegration(data.formSettings.integrations)
              if ('formSettings' in data && 'mailTem' in formSettings) setMailTem(data.formSettings.mailTem)
              if ('reports' in data) reportsDispatch({ type: 'set', reports: data.reports })
            }
            allFormsDispatchHandler({ type: 'add', data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitforms id='${data.id}'`, entries: data.entries, views: data.views, conversion: ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at } })
          } else if (action === 'bitforms_update_form') {
            setSnackbar({ show: true, msg: data.message })
            if ('formSettings' in data) setFormSettings(data.formSettings)
            if ('workFlows' in data) setworkFlows(data.workFlows)
            if ('formSettings' in data && 'integrations' in formSettings) setIntegration(data.formSettings.integrations)
            if ('formSettings' in data && 'mailTem' in formSettings) setMailTem(data.formSettings.mailTem)
            if ('reports' in data) reportsDispatch({ type: 'set', reports: data.reports })
            allFormsDispatchHandler({ type: 'update', data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitforms id='${data.id}'`, entries: data.entries, views: data.views, conversion: ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at } })
          }
          setbuttonDisabled(false)
        }
      })
  }

  return (
    <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <nav className="btcd-bld-nav">
        <div className="btcd-bld-lnk">
          <NavLink exact to="/">
            <span className="btcd-icn icn-arrow_back" />
            {' '}
            Home
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
          <button className="btn blue" type="button" onClick={saveForm} disabled={!!buttonDisabled}>
            {buttonText}
          </button>
          <NavLink to="/" className="btn btcd-btn-close">
            &#10799;
          </NavLink>
        </div>
      </nav>

      <Switch>
        <Route exact path="/builder/:formType/:formID">
          <Suspense fallback={<BuilderLoader />}>
            <FormBuilder
              newCounter={newCounter}
              isLoading={isLoading}
              fields={fields}
              setFields={setFields}
              subBtn={subBtn}
              setSubBtn={setSubBtn}
              lay={lay}
              setLay={setLay}
              setNewCounter={setNewCounter}
              theme={formSettings.theme}
              setFormName={setFormName}
              formID={formID}
              formType={formType}
            />
          </Suspense>
        </Route>
        <Route path="/builder/:formType/:formID/settings/:settings?">
          <FormSettings
            formName={formName}
            setFormName={setFormName}
            formSettings={formSettings}
            setFormSettings={setFormSettings}
            mailTem={mailTem}
            setMailTem={setMailTem}
            integrations={integrations}
            setIntegration={setIntegration}
            workFlows={workFlows}
            setworkFlows={setworkFlows}
            additional={additional}
            setadditional={setadditional}
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
