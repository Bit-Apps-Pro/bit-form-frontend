import { createContext, lazy, memo, Suspense, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { NavLink, Route, Switch, useHistory, useParams, withRouter } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import bitIcn from '../../logo.svg'
import BuilderLoader from '../components/Loaders/BuilderLoader'
import Loader from '../components/Loaders/Loader'
import PublishBtn from '../components/PublishBtn'
import UpdateButton from '../components/UpdateButton'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import Modal from '../components/Utilities/Modal'
import SegmentControl from '../components/Utilities/SegmentControl'
import { $additionalSettings, $builderHistory, $confirmations, $fieldLabels, $fields, $formId, $formName, $integrations, $layouts, $mailTemplates, $newFormId, $reports, $updateBtn, $workflows } from '../GlobalStates'
import BackIcn from '../Icons/BackIcn'
import CloseIcn from '../Icons/CloseIcn'
import navbar from '../styles/navbar.style'
import bitsFetch from '../Utils/bitsFetch'
import { bitDecipher, hideWpMenu, showWpMenu } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import FormEntries from './FormEntries'
import FormSettings from './FormSettings'

// eslint-disable-next-line import/no-cycle
const FormBuilderHOC = lazy(() => import('./FormBuilderHOC'))

export const FormSaveContext = createContext(null)
export const ShowProModalContext = createContext(null)

function FormDetails() {
  let componentMounted = true
  const history = useHistory()
  const { formType, formID } = useParams()
  const setReports = useSetRecoilState($reports)
  const setLay = useSetRecoilState($layouts)
  const newFormId = useRecoilValue($newFormId)
  const setFormId = useSetRecoilState($formId)
  const setFields = useSetRecoilState($fields)
  const setFieldLabels = useSetRecoilState($fieldLabels)
  const [fulScn, setFulScn] = useState(true)
  const [allResponse, setAllResponse] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const updateBtn = useRecoilValue($updateBtn)
  const [formName, setFormName] = useRecoilState($formName)
  const [modal, setModal] = useState({ show: false, title: '', msg: '', action: () => closeModal(), btnTxt: '' })
  const [proModal, setProModal] = useState({ show: false, msg: '' })
  const setMailTem = useSetRecoilState($mailTemplates)
  const setworkFlows = useSetRecoilState($workflows)
  const setAdditional = useSetRecoilState($additionalSettings)
  const [integrations, setIntegration] = useRecoilState($integrations)
  const setConfirmations = useSetRecoilState($confirmations)
  const resetFieldLabels = useResetRecoilState($fieldLabels)
  const resetFields = useResetRecoilState($fields)
  const resetReports = useResetRecoilState($reports)
  const resetLayouts = useResetRecoilState($layouts)
  const resetMailTemplates = useResetRecoilState($mailTemplates)
  const resetAdditionalSettings = useResetRecoilState($additionalSettings)
  const resetWorkflows = useResetRecoilState($workflows)
  const resetIntegrations = useResetRecoilState($integrations)
  const resetConfirmations = useResetRecoilState($confirmations)
  const resetUpdateBtn = useResetRecoilState($updateBtn)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const { css } = useFela()

  useEffect(() => { setFormId(formID) }, [formID])

  const activePath = () => {
    const pathArray = history.location.pathname.split('/')
    return pathArray[2].charAt(0).toUpperCase() + pathArray[2].slice(1)
  }

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
      // setBuilderHistory(oldHistory => oldHistory[0].state.fields = btnFld)
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
    resetUpdateBtn()
  }
  const onMount = () => {
    window.scrollTo(0, 0)
    hideWpMenu()

    if (sessionStorage.getItem('bitformData')) {
      const formData = JSON.parse(bitDecipher(sessionStorage.getItem('bitformData')))
      formData.layout !== undefined && setLay(formData.layout)
      setFields(formData.fields)
      setBuilderHistory(oldHistory => oldHistory[0].state.fields = formData.fields)
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
            setBuilderHistory(oldHistory => oldHistory[0].state.fields = responseData.form_content.fields)
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
            // responseData.form_content.layout !== undefined && setLay(responseData.form_content.layout)
            // exp start
            if (responseData.form_content.layout !== undefined && responseData.form_content.layout.lg[0].w < 12) {
              const l = responseData.form_content.layout
              const nl = { lg: [], md: [], sm: [] }
              l.lg.map(itm => { nl.lg.push({ ...itm, w: itm.w * 10, h: itm.h * 20, x: itm.x * 10, y: itm.y * 10, ...itm.maxW && { maxW: itm.maxW * 10 }, ...itm.maxH && { maxH: itm.maxH * 20 } }) })
              l.md.map(itm => { nl.md.push({ ...itm, w: itm.w * 10, h: itm.h * 20, x: itm.x * 10, y: itm.y * 10, ...itm.maxW && { maxW: itm.maxW * 10 }, ...itm.maxH && { maxH: itm.maxH * 20 } }) })
              l.sm.map(itm => { nl.sm.push({ ...itm, w: itm.w * 10, h: itm.h * 20, x: itm.x * 10, y: itm.y * 10, ...itm.maxW && { maxW: itm.maxW * 10 }, ...itm.maxH && { maxH: itm.maxH * 20 } }) })
              setLay(nl)
              setBuilderHistory(oldHistory => oldHistory[0].state.layout = nl)
            } else {
              setLay(responseData.form_content.layout)
              setBuilderHistory(oldHistory => oldHistory[0].state.layout = responseData.form_content.layout)
            }
            // exp end

            setFields(responseData.form_content.fields)
            setBuilderHistory(oldHistory => oldHistory[0].state.fields = responseData.form_content.fields)
            setFormName(responseData.form_content.form_name)
            setworkFlows(responseData.workFlows)
            setAdditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setConfirmations(responseData.formSettings.confirmation)
            setMailTem(responseData.formSettings.mailTem)
            // if ('formSettings' in responseData && 'submitBtn' in formSettings) setSubBtn(responseData.formSettings.submitBtn)
            setFieldLabels(responseData.Labels)
            setReports(responseData.reports || [])
            /* if ('reports' in responseData) setReports(reprts => reportsReducer(reprts, { type: 'set', reports: responseData.reports }))
            else setReports(reprts => reportsReducer(reprts, { type: 'set', reports: [] })) */
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

  const closeModal = () => {
    modal.show = false
    setModal({ ...modal })
  }

  const showUnsavedWarning = e => {
    e.preventDefault()
    setModal({
      show: true,
      title: 'Warning',
      msg: 'Are you sure you want to leave the form? Unsaved data will be lost.',
      btnTxt: 'Okay',
      action: () => history.push('/'),
    })
  }

  const options = [
    { label: 'Builder' },
    { label: 'Responses' },
    { label: 'Settings' },
  ]

  const onChangeHandler = (evn) => {
    if (evn === 'Builder') {
      history.push(`/form/builder/${formType}/${formID}/fs`)
    }
    if (evn === 'Responses') {
      history.push(`/form/responses/${formType}/${formID}/`)
    }
    if (evn === 'Settings') {
      history.push(`/form/settings/${formType}/${formID}/form-settings`)
    }
  }

  console.log(formType, 'form type')

  return (
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
            <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer"><button className="btn btn-lg blue" type="button">{__('Buy Premium', 'bitform')}</button></a>
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
        <nav className={css(navbar.btct_bld_nav)}>
          <div className={css(navbar.btcd_bld_title)}>
            <NavLink className={css(navbar.nav_back_icn)} exact to="/" onClick={updateBtn.unsaved ? showUnsavedWarning : null}>
              <span className="g-c"><BackIcn size="22" className="mr-2" stroke="3" /></span>
            </NavLink>
            <div className={css(navbar.bit_icn)}>
              <img width="16" src={bitIcn} alt="BitForm logo" />
            </div>
            <input
              className={css(navbar.btcd_bld_title_inp)}
              onChange={({ target: { value } }) => setFormName(value)}
              value={formName}
            />
          </div>
          <div className={css(navbar.btcd_bld_lnk)}>
            <SegmentControl
              defaultActive={activePath()}
              options={options}
              size="90"
              component="button"
              onChange={onChangeHandler}
              variant="blue"
            />
          </div>
          <div className={css(navbar.btcd_bld_btn)}>
            {formType === 'edit' && <PublishBtn />}
            <UpdateButton componentMounted={componentMounted} modal={modal} setModal={setModal} />
            <NavLink to="/" className={css(navbar.cls_btn)} onClick={updateBtn.unsaved ? showUnsavedWarning : null}>
              <CloseIcn size="14" />
            </NavLink>
          </div>
        </nav>
        <div className={css(navbar.builder_routes)}>
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
              <FormSettings setProModal={setProModal} />
            </Route>
          </Switch>
        </div>
      </div>
    </ShowProModalContext.Provider>
  )
}

export default memo(withRouter(FormDetails))
