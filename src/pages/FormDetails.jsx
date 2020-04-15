import React, { useState, useContext, memo, useEffect, lazy, Suspense } from 'react'
import { Switch, Route, NavLink, useParams, withRouter } from 'react-router-dom'
import FormSettings from './FormSettings'
import FormEntries from './FormEntries'
import bitsFetch from '../Utils/bitsFetch'
import { BitappsContext } from '../Utils/BitappsContext'
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg'
import BuilderLoader from '../components/Loaders/BuilderLoader'

const FormBuilder = lazy(() => import('./FormBuilder'))

function Builder(props) {
  console.log('%c $render Form Details', 'background:purple;padding:3px;border-radius:5px;color:white')

  const { formType, formID } = useParams()
  const [fulScn, setFulScn] = useState(true)
  const [newCounter, setNewCounter] = useState(0)
  const [isLoading, setisLoading] = useState(true)
  const [lay, setLay] = useState([])
  const [fields, setFields] = useState(null)
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const [formName, setFormName] = useState('Form Name')
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const { allFormsData } = useContext(BitappsContext)
  const [snack, setSnackbar] = useState({ show: false })
  const { allFormsDispatchHandler } = allFormsData

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
        document.getElementById('wpcontent').style.marginLeft = '160px'
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

  const [mailTem, setMailTem] = useState([
    { title: 'Template 1', sub: 'Email Subject', body: 'Email Body' },
    { title: 'Template 2', sub: 'Mail Subject', body: 'Email Body' },
  ])

  const [integrations, setIntegration] = useState([
    { name: 'Integration 1', type: 'Zoho Marketing Hub' },
    { name: 'Integration 2', type: 'Zoho Recruit' },
    { name: 'Zoho CRM API', type: 'Zoho CRM', email: '', pass: '', module: 'Leads', layout: 'Standard', field_map: [{ formField: '', zohoFormField: '' }], actions: ['Workflow', 'Approval'] },
  ])

  const [workFlows, setworkFlows] = useState([
    {
      title: 'Action',
      action_run: 'create_edit',
      action_type: 'onload',
      action_behaviour: 'cond',
      logics: [
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'bbb' },
        'or',
        [
          { field: 'fld-1', logic: 'eqal', val: 'ccc' },
          'or',
          { field: 'fld-1', logic: 'eqal', val: 'ddd' },
          'or',
          [
            { field: 'fld-1', logic: 'eqal', val: 'eee' },
            'and',
            { field: 'fld-1', logic: 'eqal', val: 'fff' },
            'and',
            { field: 'fld-1', logic: 'eqal', val: 'ggg' },
          ],
        ],
        'and',
        { field: 'fld-1', logic: 'eqal', val: 'hhh' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'iii' },
      ],
      actions: [
        { field: 'fld-1', action: 'show' },
        { field: 'fld-1', action: 'hide' },
        { field: 'fld-1', action: 'hide' },
      ],
      successAction: [],
    },
    {
      title: 'Action asd',
      action_type: 'onsubmit',
      action_run: 'edit',
      action_behaviour: 'always',
      logics: [
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'bbb' },
      ],
      actions: [
        { field: 'fld-1', action: 'value' },
      ],
      successAction: [
        {
          type: 'successMsg',
          details: {
            id: 0,
          },
        },
        {
          type: 'redirectPage',
          details: {
            id: 0,
          },
        },
        {
          type: 'webHooks',
          details: {
            id: [0],
          },
        },
        {
          type: 'mailNotify',
          details: {
            tem: 0,
            to: ['admin', 'custom@mail.com'],
            cc: ['admin', 'custom@mail.com'],
            bcc: ['admin', 'custom@mail.com'],
          },
        },
      ],
    },
  ])

  const [additional, setadditional] = useState({
    enabled: { captcha: true, blocked_ip: true },
    settings: {
      restrict_form: { day: ['Custom'], date: { from: new Date(), to: new Date() }, time: { from: '00:00', to: '23:59' } },
      entry_limit: 100,
      blocked_ip: [{ ip: '127.0.2.3', status: true }, { ip: '122.43.545.7', status: false }],
    },
    onePerIp: true,
  })

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
        bitsFetch({ template: formID }, 'bitapps_get_template')
          .then(res => {
            if (res !== undefined && res.success) {
              let responseData = JSON.parse(res.data)
              if (typeof data !== 'object') {
                responseData = JSON.parse(res.data)
              }
              setLay(responseData.form_content.layout)
              setFields(responseData.form_content.fields)
              setNewCounter(responseData.form_content.layout.length)
              setFormName(responseData.form_content.form_name)
              setisLoading(false)
              console.log(responseData.form_content.layout, responseData.form_content.fields)
            } else {
              setisLoading(false)
            }
          })
          .catch(() => {
            setisLoading(false)
          })
      }
    } else if (formType === 'edit') {
      bitsFetch({ id: formID }, 'bitapps_get_a_form')
        .then(res => {
          if (res !== undefined && res.success) {
            const responseData = res.data
            setLay(responseData.form_content.layout)
            setFields(responseData.form_content.fields)
            setNewCounter(responseData.form_content.layout.length)
            setFormName(responseData.form_content.form_name)
            setFormSettings(responseData.formSettings)
            setworkFlows(responseData.workFlows)
            setadditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setMailTem(responseData.formSettings.mailTem)
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
    let action = 'bitapps_create_new_form'
    if (savedFormId > 0) {
      formData = {
        id: savedFormId,
        layout: lay,
        fields,
        form_name: formName,
        formSettings,
        workFlows,
        additional,
      }
      action = 'bitapps_update_form'
    }

    bitsFetch(formData, action)
      .then(response => {
        if (response !== undefined && response.success) {
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
            setSnackbar({ show: true, msg: data.message })
            if ('formSettings' in data) setFormSettings(data.formSettings)
            if ('workFlows' in data) setworkFlows(data.workFlows)
            if ('formSettings' in data && 'integrations' in formSettings) setIntegration(data.formSettings.integrations)
            if ('formSettings' in data && 'mailTem' in formSettings) setMailTem(data.formSettings.mailTem)
            allFormsDispatchHandler({ type: 'update', data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitapps id='${data.id}'`, entries: data.entries, views: data.views, conversion: ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at } })
          }
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
