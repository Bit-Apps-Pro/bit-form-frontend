import { useState, memo, useEffect, lazy, Suspense, createContext } from 'react'
import { Switch, Route, NavLink, useParams, withRouter } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import toast from 'react-hot-toast'
import produce from 'immer'
import { __ } from '../Utils/i18nwrap'
import FormSettings from './FormSettings'
import FormEntries from './FormEntries'
import bitsFetch from '../Utils/bitsFetch'
import { formsReducer, reportsReducer } from '../Utils/Reducers'
import BuilderLoader from '../components/Loaders/BuilderLoader'
import '../resource/sass/components.scss'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import { hideWpMenu, showWpMenu, bitDecipher, bitCipher } from '../Utils/Helpers'
import Loader from '../components/Loaders/Loader'
import LoaderSm from '../components/Loaders/LoaderSm'
import Modal from '../components/Utilities/Modal'
import { sortLayoutByXY } from '../Utils/FormBuilderHelper'
import CloseIcn from '../Icons/CloseIcn'
import { $fieldLabels, $fields, $forms, $newFormId, $reports, $layouts, $mailTemplates, $additionalSettings, $workflows, $integrations, $confirmations, $formName } from '../GlobalStates'
import BackIcn from '../Icons/BackIcn'
import { select } from '../Utils/globalHelpers'
// import useSWR from 'swr'

const FormBuilderHOC = lazy(() => import('./FormBuilderHOC'))

export const FormSaveContext = createContext(null)
export const ShowProModalContext = createContext(null)

function FormDetails({ history }) {
  let componentMounted = true
  const { formType, formID } = useParams()
  const setAllForms = useSetRecoilState($forms)
  const [reports, setReports] = useRecoilState($reports)
  const [lay, setLay] = useRecoilState($layouts)
  const newFormId = useRecoilValue($newFormId)
  const [fields, setFields] = useRecoilState($fields)
  const setFieldLabels = useSetRecoilState($fieldLabels)
  const [fulScn, setFulScn] = useState(true)
  const [allResponse, setAllResponse] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const [formName, setFormName] = useRecoilState($formName)
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const [modal, setModal] = useState({ show: false, title: '', msg: '', action: () => closeModal(), btnTxt: '' })
  const [proModal, setProModal] = useState({ show: false, msg: '' })
  const [mailTem, setMailTem] = useRecoilState($mailTemplates)
  const [workFlows, setworkFlows] = useRecoilState($workflows)
  const [additional, setAdditional] = useRecoilState($additionalSettings)
  const [integrations, setIntegration] = useRecoilState($integrations)
  const [confirmations, setConfirmations] = useRecoilState($confirmations)
  const resetFieldLabels = useResetRecoilState($fieldLabels)
  const resetFields = useResetRecoilState($fields)
  const resetReports = useResetRecoilState($reports)
  const resetLayouts = useResetRecoilState($layouts)
  const resetMailTemplates = useResetRecoilState($mailTemplates)
  const resetAdditionalSettings = useResetRecoilState($additionalSettings)
  const resetWorkflows = useResetRecoilState($workflows)
  const resetIntegrations = useResetRecoilState($integrations)
  const resetConfirmations = useResetRecoilState($confirmations)

  const setNewFormProps = () => {
    if (formType === 'new') {
      const defaultConfirmationValue = {
        type: {
          successMsg: [{ title: 'Untitled Message 1', msg: __('Successfully Submitted.', 'bitform') }],
          redirectPage: [{ title: 'Untitled Redirect-Url 1', url: '' }],
          webHooks: [{ title: 'Untitled Web-Hook 1', url: '', method: 'GET' }],
        },
      }
      const defaultWorkflowValue = [
        {
          title: __('Show Success Message', 'bitform'),
          action_type: 'onsubmit',
          action_run: 'create_edit',
          action_behaviour: 'always',
          logics: [
            {
              field: '',
              logic: '',
              val: '',
            },
            'or',
            {
              field: '',
              logic: '',
              val: '',
            },
          ],
          actions: [
            {
              field: '',
              action: 'value',
            },
          ],
          successAction: [
            {
              type: 'successMsg',
              details: { id: '{"index":0}' },
            },
          ],
        },
      ]
      setworkFlows(defaultWorkflowValue)
      setConfirmations(defaultConfirmationValue)
    }
    if (formID === 'Blank') {
      const btnData = {
        typ: 'button',
        btnSiz: 'md',
        btnTyp: 'submit',
        txt: 'Submit',
        align: 'right',
        valid: {},
      }
      const btnFld = []
      btnFld[`bf${newFormId}-1`] = btnData
      setFields(btnFld)
      const btnLay = { lg: [], md: [], sm: [] }
      const subBtnLay = { h: 2, i: `bf${newFormId}-1`, minH: 2, w: 6, x: 0, y: Infinity }
      btnLay.lg.push(subBtnLay)
      btnLay.md.push(subBtnLay)
      btnLay.sm.push(subBtnLay)
      setLay(btnLay)
      setisLoading(false)
    }
  }

  const resetAllState = () => {
    resetFieldLabels()
    resetFields()
    resetReports()
    resetLayouts()
    resetMailTemplates()
    resetAdditionalSettings()
    resetWorkflows()
    resetIntegrations()
    resetConfirmations()
  }
  const onMount = () => {
    window.scrollTo(0, 0)
    hideWpMenu()

    if (sessionStorage.getItem('bitformData')) {
      const formData = JSON.parse(bitDecipher(sessionStorage.getItem('bitformData')))
      formData.layout !== undefined && setLay(formData.layout)
      setFields(formData.fields)
      setFormName(formData.form_name)
      setworkFlows(formData.workFlows)
      setAdditional(formData.additional)
      setIntegration(formData.formSettings.integrations)
      setConfirmations(formData.formSettings.confirmation)
      setMailTem(formData.formSettings.mailTem)
      sessionStorage.removeItem('bitformData')
      toast.error(__('Please try again. Token was expired', 'bitform'))
      if (isLoading) { setisLoading(!isLoading) }
    } else {
      setNewFormProps()
      fetchTemplate()
    }

    document.addEventListener('keydown', (e) => {
      if ((e.key === 's' || e.key === 'S') && e.ctrlKey) {
        e.preventDefault()
        if (!buttonDisabled) {
          select('#update-btn').click()
        }
        return false
      }
    })
  }

  const onUnmount = () => {
    showWpMenu()
    setFulScn(false)
    resetAllState()
  }

  useEffect(() => {
    onMount()
    return () => {
      componentMounted = false
      onUnmount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTemplate = () => {
    if (formType === 'new' && formID !== 'Blank') {
      bitsFetch({ template: formID, newFormId }, 'bitforms_get_template')
        .then(res => {
          if (res?.success && componentMounted) {
            let responseData = JSON.parse(res.data)
            if (typeof data !== 'object') { responseData = JSON.parse(res.data) }
            responseData.form_content.layout !== undefined && setLay(responseData.form_content.layout)
            setFields(responseData.form_content.fields)
            setFormName(responseData.form_content.form_name)
            setisLoading(false)
            sessionStorage.setItem('btcd-lc', '-')
          } else {
            setisLoading(false)
          }
        })
        .catch(() => { setisLoading(false) })
    } else if (formType === 'edit') {
      bitsFetch({ id: formID }, 'bitforms_get_a_form')
        .then(res => {
          if (res?.success && componentMounted) {
            const responseData = res.data
            responseData.form_content.layout !== undefined && setLay(responseData.form_content.layout)
            setFields(responseData.form_content.fields)
            setFormName(responseData.form_content.form_name)
            setworkFlows(responseData.workFlows)
            setAdditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setConfirmations(responseData.formSettings.confirmation)
            setMailTem(responseData.formSettings.mailTem)
            // if ('formSettings' in responseData && 'submitBtn' in formSettings) setSubBtn(responseData.formSettings.submitBtn)
            setFieldLabels(responseData.Labels)
            if ('reports' in responseData) setReports(reprts => reportsReducer(reprts, { type: 'set', reports: responseData.reports }))
            else setReports(reprts => reportsReducer(reprts, { type: 'set', reports: [] }))
            setisLoading(false)
          } else {
            if (!res.success && res.data === 'Token expired') {
              window.location.reload()
            }
            setisLoading(false)
          }
        })
        .catch(() => { setisLoading(false) })
    }
  }
  const checkSubmitBtn = () => {
    const btns = Object.values(fields).filter(fld => fld.typ === 'button' && fld.btnTyp === 'submit')
    const payFields = fields ? Object.values(fields).filter(field => field.typ.match(/paypal|razorpay/)) : []
    return (payFields.length > 0 || btns.length > 0)
  }

  const saveForm = (type, updatedData) => {
    let mailTemplates = mailTem
    let additionalSettings = additional
    let allIntegrations = integrations
    if (type === 'email-template') {
      mailTemplates = updatedData
    } else if (type === 'additional') {
      additionalSettings = updatedData
    } else if (type === 'integrations') {
      allIntegrations = updatedData
    }
    if (!checkSubmitBtn()) {
      modal.show = true
      modal.title = __('Sorry', 'bitform')
      modal.btnTxt = __('Close', 'bitform')
      modal.msg = __('Please add a submit button', 'bitform')
      setModal({ ...modal })
      return
    }
    if (lay.md.length === 0 || typeof lay === 'undefined') {
      modal.show = true
      modal.title = __('Sorry', 'bitform')
      modal.btnTxt = __('Close', 'bitform')
      modal.msg = __('You can not save a blank form', 'bitform')
      setModal({ ...modal })
      return
    }

    setbuttonDisabled(true)

    const sortLayoutLG = { lg: [], md: [], sm: [] }
    sortLayoutLG.lg = sortLayoutByXY(lay.lg)
    sortLayoutLG.md = lay.md
    sortLayoutLG.sm = lay.sm

    let formStyle = sessionStorage.getItem('btcd-fs')
    formStyle &&= bitDecipher(formStyle)
    const formData = {
      ...(savedFormId && { id: savedFormId }),
      ...(!savedFormId && { form_id: newFormId }),
      ...(savedFormId && { reports }),
      layout: sortLayoutLG,
      fields,
      form_name: formName,
      additional: additionalSettings,
      workFlows,
      formStyle,
      layoutChanged: sessionStorage.getItem('btcd-lc'),
      rowHeight: sessionStorage.getItem('btcd-rh'),
      formSettings: {
        formName,
        theme: 'default',
        confirmation: confirmations,
        mailTem: mailTemplates,
        integrations: allIntegrations,
      },
    }
    const action = savedFormId ? 'bitforms_update_form' : 'bitforms_create_new_form'

    const fetchProm = bitsFetch(formData, action)
      .then(response => {
        if (response?.success && componentMounted) {
          let { data } = response
          if (typeof data !== 'object') { data = JSON.parse(data) }
          if (action === 'bitforms_create_new_form' && savedFormId === 0 && buttonText === 'Save') {
            setSavedFormId(data.id)
            setButtonText('Update')
            history.replace(`/form/builder/edit/${data.id}/fs`)
          }
          data?.workFlows && setworkFlows(data.workFlows)
          data?.formSettings?.integrations && setIntegration(data.formSettings.integrations)
          data?.formSettings?.mailTem && setMailTem(data.formSettings.mailTem)
          data?.formSettings?.confirmation && setConfirmations(data.formSettings.confirmation)
          data?.additional && setAdditional(data.additional)
          data?.Labels && setFieldLabels(data.Labels)
          data?.reports && setReports(reprts => reportsReducer(reprts, { type: 'set', reports: data?.reports || [] }))
          setAllForms(allforms => formsReducer(allforms, {
            type: action === 'bitforms_create_new_form' ? 'add' : 'update',
            data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitform id='${data.id}'`, entries: data.entries, views: data.views, conversion: data.entries === 0 ? 0.00 : ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at },
          }))
          setbuttonDisabled(false)
          sessionStorage.removeItem('btcd-lc')
          sessionStorage.removeItem('btcd-fs')
          sessionStorage.removeItem('btcd-rh')
        } else if (!response?.success && response?.data === 'Token expired') {
          sessionStorage.setItem('bitformData', bitCipher(JSON.stringify(formData)))
          window.location.reload()
        } else if (!response?.success) {
          setTimeout(() => { window.location.reload() }, 2000)
        }
        return response
      })

    toast.promise(fetchProm, {
      loading: __('Updating...', 'biform'),
      success: (res) => res?.data?.message || res?.data,
      error: __('Error occured, Please try again.', 'bitform'),
    })
  }

  // setSaveForm(() => saveForm())
  // useEffect(() => {
  //   setSaveForm((a, b) => (c, d) => saveForm(c, d))
  // })

  const closeModal = () => {
    modal.show = false
    setModal({ ...modal })
  }

  useEffect(() => {
    if (integrations[integrations.length - 1]?.newItegration || integrations[integrations.length - 1]?.editItegration) {
      const newIntegrations = produce(integrations, draft => {
        draft.pop()
      })
      setIntegration(newIntegrations)
      saveForm('integrations', newIntegrations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrations])

  return (
    <FormSaveContext.Provider value={saveForm}>
      <ShowProModalContext.Provider value={setProModal}>

        <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
          <Modal
            sm
            show={proModal.show}
            setModal={() => setProModal({ show: false })}
            title={__('Premium Feature', 'bitform')}
            className="pro-modal"
          >
            <h4 className="txt-center mt-5">
              {proModal.msg}
            </h4>
            <div className="txt-center">
              <a href="https://bitpress.pro/" target="_blank" rel="noreferrer"><button className="btn btn-lg blue" type="button">{__('Buy Premium', 'bitform')}</button></a>
            </div>

          </Modal>
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
                <span className="g-c"><BackIcn size="22" className="mr-2" stroke="3" /></span>
                {__('Home', 'bitform')}
              </NavLink>
              <NavLink
                exact
                to={`/form/builder/${formType}/${formID}/fs`}
                activeClassName="app-link-active"
                isActive={(m, l) => l.pathname.match(/\/form\/builder/g)}
              >
                {__('Builder', 'bitform')}
              </NavLink>
              <NavLink
                to={`/form/responses/${formType}/${formID}/`}
                activeClassName="app-link-active"
              >
                {__('Responses', 'bitform')}
              </NavLink>
              <NavLink
                to={`/form/settings/${formType}/${formID}/form-settings`}
                activeClassName="app-link-active"
                isActive={(m, l) => l.pathname.match(/settings/g)}
              >
                {__('Settings', 'bitform')}
              </NavLink>
            </div>
            <div className="btcd-bld-title">
              <input
                className="btcd-bld-title-inp br-50"
                onChange={({ target: { value } }) => setFormName(value)}
                value={formName}
              />
            </div>

            <div className="btcd-bld-btn">
              <button id="update-btn" className="btn blue tooltip pos-rel" type="button" onClick={saveForm} disabled={buttonDisabled} style={{ '--tooltip-txt': `'${__('ctrl + s', 'bitform')}'` }}>
                {buttonText}
                {buttonDisabled && <LoaderSm size={20} clr="white" className="ml-1" />}
              </button>
              <NavLink to="/" className="btn btcd-btn-close">
                <CloseIcn size="14" />
              </NavLink>
            </div>
          </nav>

          <Switch>
            <Route exact path="/form/builder/:formType/:formID/:s?/:s?/:s?">
              <Suspense fallback={<BuilderLoader />}>
                <FormBuilderHOC isLoading={isLoading} />
              </Suspense>
            </Route>
            <Route path="/form/responses/:formType/:formID/">
              {!isLoading ? (
                <FormEntries
                  allResp={allResponse}
                  setAllResp={setAllResponse}
                  integrations={integrations}
                />
              ) : <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }} />}
            </Route>
            <Route path="/form/settings/:formType/:formID/:settings?">
              <FormSettings
                saveForm={saveForm}
                setProModal={setProModal}
              />
            </Route>
          </Switch>
        </div>
      </ShowProModalContext.Provider>
    </FormSaveContext.Provider>
  )
}

export default memo(withRouter(FormDetails))
