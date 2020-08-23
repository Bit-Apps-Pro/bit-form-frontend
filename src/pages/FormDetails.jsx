import React, { useCallback, useState, useContext, memo, useEffect, lazy, Suspense, createContext } from 'react'
import { Switch, Route, NavLink, useParams, withRouter } from 'react-router-dom'
import useSWR from 'swr'
import FormSettings from './FormSettings'
import FormEntries from './FormEntries'
import bitsFetch from '../Utils/bitsFetch'
import { AllFormContext } from '../Utils/AllFormContext'
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg'
import BuilderLoader from '../components/Loaders/BuilderLoader'
import '../resource/sass/components.scss'
import ConfirmModal from '../components/ConfirmModal'
import { hideWpMenu, showWpMenu, getNewId, bitDecipher, bitCipher } from '../Utils/Helpers'

const FormBuilder = lazy(() => import('./FormBuilder'))

export const FromSaveContext = createContext(null)

function FormDetails(props) {
  console.log('%c $render Form Details', 'background:purple;padding:3px;border-radius:5px;color:white')

  const { formType, formID } = useParams()
  const [fulScn, setFulScn] = useState(true)
  const [newCounter, setNewCounter] = useState(0)
  const [allResponse, setAllResponse] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [lay, setLay] = useState({ lg: [], md: [], sm: [] })
  const [fields, setFields] = useState(null)
  const [allLabels, setallLabels] = useState([])
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const [formName, setFormName] = useState('Form Name')
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const { allFormsData, reportsData } = useContext(AllFormContext)
  const [snack, setSnackbar] = useState({ show: false })
  const { allFormsDispatchHandler } = allFormsData
  const { reports, reportsDispatch } = reportsData
  const [modal, setModal] = useState({ show: false, title: '', msg: '', action: () => closeModal(), btnTxt: '' })
  const { history, newFormId } = props

  // const formID = (formType === 'new' && frmID === 'blank') ? getNewFormId() : frmID

  // const { data, isValidating, error } = useSWR([formID, 'bitforms_get_a_form'], (id, action) => bitsFetch({ id }, action))
  // console.log('userSWR', data, error, isValidating)

  const onMount = () => {
    if (sessionStorage.getItem('btcd-fd')) {
      const formData = bitDecipher(JSON.parse(sessionStorage.getItem('btcd-fd')))
      formData.layout !== undefined && setLay(formData.layout)
      setFields(formData.fields)
      setNewCounter(getNewId(formData.fields))
      setFormName(formData.form_name)
      setSubBtn(formData.formSettings.submitBtn)
      setFormSettings(formData.formSettings)
      setworkFlows(formData.workFlows)
      setadditional(formData.additional)
      setIntegration(formData.formSettings.integrations)
      setMailTem(formData.formSettings.mailTem)
      if ('formSettings' in formData && 'submitBtn' in formSettings) setSubBtn(formData.formSettings.submitBtn)
      sessionStorage.removeItem('btcd-fd')
      setSnackbar({ show: true, msg: 'Please try again. Token was expired' })
      if (isLoading) {
        setisLoading(!isLoading)
      }
    } else {
      fetchTemplate()
    }
    window.scrollTo(0, 0)
    hideWpMenu()
  }

  const onUnmount = () => {
    showWpMenu()
    setFulScn(false)
  }

  useEffect(() => {
    onMount()
    return () => onUnmount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [subBtn, setSubBtn] = useState({
    typ: 'submit',
    btnSiz: 'md',
    fulW: false,
    align: 'right',
    subBtnTxt: 'Submit',
  })

  const updateSubBtn = val => {
    setSubBtn(val)
    formSettings.submitBtn = val
    setFormSettings(formSettings)
  }

  const [mailTem, setMailTem] = useState([])

  const [integrations, setIntegration] = useState([])

  const [workFlows, setworkFlows] = useState([])

  const [additional, setadditional] = useState({ enabled: {}, settings: {} })
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
      const formTitle = formID
      if (formTitle === 'Blank') {
        setisLoading(false)
      } else {
        bitsFetch({ template: formTitle, newFormId }, 'bitforms_get_template')
          .then(res => {
            if (res !== undefined && res.success) {
              let responseData = JSON.parse(res.data)
              if (typeof data !== 'object') {
                responseData = JSON.parse(res.data)
              }
              responseData.form_content.layout !== undefined && setLay(responseData.form_content.layout)
              setFields(responseData.form_content.fields)
              setNewCounter(getNewId(responseData.form_content.fields))
              setFormName(responseData.form_content.form_name)
              setisLoading(false)
              sessionStorage.setItem('btcd-lc', '-')
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
            setNewCounter(getNewId(responseData.form_content.fields))
            setFormName(responseData.form_content.form_name)
            setSubBtn(responseData.formSettings.submitBtn)
            setFormSettings(responseData.formSettings)
            setworkFlows(responseData.workFlows)
            setadditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setMailTem(responseData.formSettings.mailTem)
            if ('formSettings' in responseData && 'submitBtn' in formSettings) setSubBtn(responseData.formSettings.submitBtn)
            if ('Labels' in responseData) setallLabels(responseData.Labels)
            if ('reports' in responseData) reportsDispatch({ type: 'set', reports: responseData.reports })
            else reportsDispatch({ type: 'set', reports: [] })
            setisLoading(false)
          } else {
            if (!res.data.success && res.data.data === 'Token expired') {
              window.location.reload()
            }
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

  const saveForm = useCallback(() => {
    let formStyle = sessionStorage.getItem('btcd-fs')
    if (formStyle) {
      formStyle = bitDecipher(formStyle)
    }
    if (lay.md.length === 0 || typeof lay === 'undefined') {
      modal.show = true
      modal.title = 'Sorry'
      modal.btnTxt = 'Close'
      modal.msg = 'You can not save a blank form'
      setModal({ ...modal })
    } else {
      // setbuttonDisabled(true)
      let formData = {
        form_id: newFormId,
        layout: lay,
        fields,
        form_name: formName,
        formSettings,
        workFlows,
        mailTem,
        integrations,
        additional,
        formStyle,
        layoutChanged: sessionStorage.getItem('btcd-lc'),
        rowHeight: sessionStorage.getItem('btcd-rh'),
      }
      let action = 'bitforms_create_new_form'
      if (savedFormId > 0) {
        setFormSettings({ ...formSettings })
        formData = {
          id: savedFormId,
          layout: lay,
          fields,
          form_name: formName,
          formSettings,
          workFlows,
          additional,
          reports,
          formStyle,
          layoutChanged: sessionStorage.getItem('btcd-lc'),
          rowHeight: sessionStorage.getItem('btcd-rh'),
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
                history.replace(`/form/builder/edit/${data.id}/fs`)
                setSnackbar({ show: true, msg: data.message })
                if ('formSettings' in data) setFormSettings(data.formSettings)
                if ('workFlows' in data) setworkFlows(data.workFlows)
                if ('formSettings' in data && 'integrations' in formSettings) setIntegration(data.formSettings.integrations)
                if ('formSettings' in data && 'mailTem' in formSettings) setMailTem(data.formSettings.mailTem)
                if ('Labels' in data) setallLabels(data.Labels)
                if ('reports' in data) reportsDispatch({ type: 'set', reports: data.reports })
                else reportsDispatch({ type: 'set', reports: [] })
              }
              allFormsDispatchHandler({ type: 'add', data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitform id='${data.id}'`, entries: data.entries, views: data.views, conversion: ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at } })
            } else if (action === 'bitforms_update_form') {
              setSnackbar({ show: true, msg: data.message })
              if ('formSettings' in data) setFormSettings(data.formSettings)
              if ('workFlows' in data) setworkFlows(data.workFlows)
              if ('formSettings' in data && 'integrations' in formSettings) setIntegration(data.formSettings.integrations)
              if ('formSettings' in data && 'mailTem' in formSettings) setMailTem(data.formSettings.mailTem)
              if ('Labels' in data) setallLabels(data.Labels)
              if ('reports' in data) reportsDispatch({ type: 'set', reports: data.reports })
              else reportsDispatch({ type: 'set', reports: [] })
              allFormsDispatchHandler({ type: 'update', data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitform id='${data.id}'`, entries: data.entries, views: data.views, conversion: ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at } })
            }
            setbuttonDisabled(false)
            sessionStorage.removeItem('btcd-lc')
            sessionStorage.removeItem('btcd-fs')
            sessionStorage.removeItem('btcd-rh')
          } else if (!response?.data?.success && response?.data?.data === 'Token expired') {
            sessionStorage.setItem('btcd-fd', bitCipher(JSON.stringify(formData)))
            window.location.reload()
          } else if (response?.data?.data) {
            setSnackbar({ show: true, msg: response?.data?.data })
          }
        })
    }
  }, [lay, modal, newFormId, fields, formName, formSettings, workFlows, mailTem, integrations, additional, savedFormId, reports, buttonText, allFormsDispatchHandler, history, reportsDispatch])

  const closeModal = () => {
    modal.show = false
    setModal({ ...modal })
  }

  return (
    <FromSaveContext.Provider value={saveForm}>
      <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
        <SnackMsg snack={snack} setSnackbar={setSnackbar} />
        <ConfirmModal
          title={modal.title}
          action={modal.action}
          show={modal.show}
          body={modal.msg}
          btnTxt={modal.btnTxt}
          close={closeModal}
        />
        <nav className="btcd-bld-nav">
          <div className="btcd-bld-lnk">
            <NavLink exact to="/">
              <span className="btcd-icn icn-arrow_back" />
              {' '}
              Home
            </NavLink>
            <NavLink
              exact
              to={`/form/builder/${formType}/${formID}/fs`}
              activeClassName="app-link-active"
              isActive={(m, l) => l.pathname.includes('/form/builder')}
            >
              Builder
            </NavLink>
            <NavLink
              to={`/form/responses/${formType}/${formID}/`}
              activeClassName="app-link-active"
            >
              Responses
            </NavLink>
            <NavLink
              to={`/form/settings/${formType}/${formID}/form-settings`}
              activeClassName="app-link-active"
              isActive={(m, l) => l.pathname.includes('settings')}
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
            <button className="btn blue" type="button" onClick={saveForm} disabled={buttonDisabled}>
              {buttonText}
            </button>
            <NavLink to="/" className="btn btcd-btn-close">
              <span className="btcd-icn icn-clear" />
            </NavLink>
          </div>
        </nav>

        <Switch>
          <Route exact path="/form/builder/:formType/:formID/:s?/:s?">
            <Suspense fallback={<BuilderLoader />}>
              <FormBuilder
                newCounter={newCounter}
                isLoading={isLoading}
                fields={fields}
                setFields={setFields}
                subBtn={subBtn}
                setSubBtn={updateSubBtn}
                lay={lay}
                setLay={setLay}
                setNewCounter={setNewCounter}
                theme={formSettings.theme}
                setFormName={setFormName}
                formID={formType === 'new' ? newFormId : formID}
                formType={formType}
              />
            </Suspense>
          </Route>
          <Route path="/form/responses/:formType/:formID/">
            {!isLoading && (
              <FormEntries
                allResp={allResponse}
                setAllResp={setAllResponse}
                allLabels={allLabels}
              />
            )}
          </Route>
          <Route path="/form/settings/:formType/:formID/:settings?">
            <FormSettings
              saveForm={saveForm}
              formName={formName}
              setFormName={setFormName}
              allLabels={allLabels}
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
        </Switch>
      </div>
    </FromSaveContext.Provider>
  )
}

export default memo(withRouter(FormDetails))
