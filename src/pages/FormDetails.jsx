import produce from 'immer'
import { createContext, lazy, memo, Suspense, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { NavLink, Route, Switch, useHistory, useParams, withRouter } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import bitIcn from '../../logo.svg'
import confirmMsgCssStyles from '../components/ConfirmMessage/confirm_msg_css_styles'
import BuilderLoader from '../components/Loaders/BuilderLoader'
import Loader from '../components/Loaders/Loader'
import PublishBtn from '../components/PublishBtn'
import atlassianTheme from '../components/style-new/themes/atlassianTheme/3_atlassianTheme'
import bitformDefaultTheme from '../components/style-new/themes/bitformDefault/1_bitformDefault'
import UpdateButton from '../components/UpdateButton'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import Modal from '../components/Utilities/Modal'
import SegmentControl from '../components/Utilities/SegmentControl'
import { $additionalSettings, $breakpoint, $builderHistory, $colorScheme, $confirmations, $customCodes, $fieldLabels, $fields, $formId, $formInfo, $integrations, $layouts, $mailTemplates, $newFormId, $reportId, $reports, $updateBtn, $workflows } from '../GlobalStates/GlobalStates'
import { $styles } from '../GlobalStates/StylesState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
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
  const setStyles = useSetRecoilState($styles)
  const themeVars = useRecoilValue($themeVars)
  const newFormId = useRecoilValue($newFormId)
  const setFormId = useSetRecoilState($formId)
  const setFields = useSetRecoilState($fields)
  const breakpoint = useRecoilValue($breakpoint)
  const colorScheme = useRecoilValue($colorScheme)
  const setFieldLabels = useSetRecoilState($fieldLabels)
  const [fulScn, setFulScn] = useState(true)
  const [allResponse, setAllResponse] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const updateBtn = useRecoilValue($updateBtn)
  const [formInfo, setFormInfo] = useRecoilState($formInfo)
  const { formName } = formInfo
  const [modal, setModal] = useState({ show: false, title: '', msg: '', action: () => closeModal(), btnTxt: '' })
  const [proModal, setProModal] = useState({ show: false, msg: '' })
  const setMailTem = useSetRecoilState($mailTemplates)
  const setworkFlows = useSetRecoilState($workflows)
  const setAdditional = useSetRecoilState($additionalSettings)
  const [integrations, setIntegration] = useRecoilState($integrations)
  const setConfirmations = useSetRecoilState($confirmations)
  const resetFieldLabels = useResetRecoilState($fieldLabels)
  const resetFields = useResetRecoilState($fields)
  const resetFormInfo = useResetRecoilState($formInfo)
  const resetReports = useResetRecoilState($reports)
  const resetLayouts = useResetRecoilState($layouts)
  const resetMailTemplates = useResetRecoilState($mailTemplates)
  const resetAdditionalSettings = useResetRecoilState($additionalSettings)
  const resetWorkflows = useResetRecoilState($workflows)
  const resetIntegrations = useResetRecoilState($integrations)
  const resetConfirmations = useResetRecoilState($confirmations)
  const resetUpdateBtn = useResetRecoilState($updateBtn)
  const resetCustomCodes = useResetRecoilState($customCodes)
  const resetBuilderHistory = useResetRecoilState($builderHistory)
  const resetReportId = useResetRecoilState($reportId)
  const setReportId = useSetRecoilState($reportId)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const { css } = useFela()

  useEffect(() => { setFormId(formID) }, [formID])

  const activePath = () => {
    const pathArray = history.location.pathname.split('/')
    return pathArray[2].charAt(0).toUpperCase() + pathArray[2].slice(1)
  }

  const setNewFormProps = () => {
    // for all kind of template
    if (formType === 'new') {
      setworkFlows(defaultWorkflowValue)
      setConfirmations(defaultConfirmationValue(formID))
    }
    // form blank form only
    // if (formId === 'Blank') {
    if (formType === 'new') {
      const btnFld = {}
      const btnFieldKey = `b${newFormId}-1`
      btnFld[btnFieldKey] = btnData
      setFields(btnFld)
      const btnLay = { lg: [], md: [], sm: [] }
      const subBtnLay = { h: 40, i: btnFieldKey, w: 60, x: 0, y: 0 }
      btnLay.lg.push(subBtnLay)
      btnLay.md.push(subBtnLay)
      btnLay.sm.push(subBtnLay)
      setLay(btnLay)
      setBuilderHistory(oldHistory => produce(oldHistory, draft => {
        draft.histories[0].state = { fields: btnFld, layouts: btnLay, breakpoint, colorScheme }
      }))
      setisLoading(false)
      setStyles(styles => produce(styles, draftStyle => {
        const globalTheme = draftStyle.theme
        if (globalTheme === 'bitformDefault') {
          const fieldStyle = bitformDefaultTheme({ fieldKey: btnFieldKey, type: btnData.typ, direction: themeVars['--dir'] })
          draftStyle.fields[btnFieldKey] = fieldStyle
        }

        // if (globalTheme === 'material') {
        //   const fieldStyle = materialTheme(btnFieldKey, btnData.typ, themeVars['--dir'])
        //   draftStyle.fields[btnFieldKey] = fieldStyle
        // }

        if (globalTheme === 'atlassian') {
          const obj = { fk: btnFieldKey, type: btnData.typ, direction: themeVars['--dir'] }
          const fieldStyle = atlassianTheme(obj)
          draftStyle.fields[btnFieldKey] = fieldStyle
        }
      }))
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
    resetFormInfo()
    resetCustomCodes()
    resetReportId()
    resetBuilderHistory()

    // TODO: reset all states of style, themeVars & themeColors
  }
  const onMount = () => {
    window.scrollTo(0, 0)
    hideWpMenu()

    if (sessionStorage.getItem('bitformData')) {
      const formData = JSON.parse(bitDecipher(sessionStorage.getItem('bitformData')))
      if (formData.layout !== undefined) {
        setLay(formData.layout)
        setBuilderHistory(oldHistory => produce(oldHistory, draft => { draft.histories[0].state.layouts = formData.layout }))
      }
      setFields(formData.fields)
      setBuilderHistory(oldHistory => produce(oldHistory, draft => { draft.histories[0].state.fields = formData.fields }))
      setFormInfo(oldInfo => ({ ...oldInfo, formName: formData.form_name }))
      setworkFlows(formData.workFlows)
      setAdditional(formData.additional)
      setIntegration(formData.formSettings.integrations)
      setConfirmations(formData.formSettings.confirmation)
      setMailTem(formData.formSettings.mailTem)
      sessionStorage.removeItem('bitformData')
      toast.error(__('Please try again. Token was expired'))
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
    if (formType === 'new' && formInfo.template !== 'Blank') {
      bitsFetch({ template: formID, newFormId }, 'bitforms_get_template')
        .then(res => {
          if (res?.success && componentMounted) {
            let responseData = JSON.parse(res.data)
            if (typeof data !== 'object') { responseData = JSON.parse(res.data) }
            if (responseData.form_content.layout !== undefined) {
              setLay(responseData.form_content.layout)
              setBuilderHistory(oldHistory => produce(oldHistory, draft => { draft.histories[0].state.layouts = responseData.form_content.layout }))
            }
            setFields(responseData.form_content.fields)
            // setBuilderHistory(oldHistory => oldHistory.histories[0].state.fields = responseData.form_content.fields)
            setBuilderHistory(oldHistory => produce(oldHistory, draft => { draft.histories[0].state.fields = responseData.form_content.fields }))
            setFormInfo(oldInfo => ({ ...oldInfo, formName: responseData.form_content.form_name }))
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
            if (responseData.form_content.layout !== undefined) {
              setLay(responseData.form_content.layout)
              setBuilderHistory(oldHistory => produce(oldHistory, draft => { draft.histories[0].state.layouts = responseData.form_content.layouts }))
            }
            const defaultReport = responseData?.reports?.find(report => report.isDefault.toString() === '1')

            setFields(responseData.form_content.fields)
            setBuilderHistory(oldHistory => produce(oldHistory, draft => { draft.histories[0].state.fields = responseData.form_content.fields }))
            setFormInfo(oldInfo => ({ ...oldInfo, formName: responseData.form_content.form_name }))
            setworkFlows(responseData.workFlows)
            setAdditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setConfirmations(responseData.formSettings.confirmation)
            setMailTem(responseData.formSettings.mailTem)

            setReportId({
              id: responseData?.form_content?.report_id || defaultReport?.id,
              isDefault: responseData?.form_content?.report_id === null,
            })
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
      history.push(`/form/builder/${formType}/${formID}/fields-list`)
    }
    if (evn === 'Responses') {
      history.push(`/form/responses/${formType}/${formID}/`)
    }
    if (evn === 'Settings') {
      history.push(`/form/settings/${formType}/${formID}/form-settings`)
    }
  }

  return (
    <ShowProModalContext.Provider value={setProModal}>
      <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
        <Modal
          sm
          show={proModal.show}
          setModal={() => setProModal({ show: false })}
          title={__('Premium Feature')}
          className="pro-modal"
        >
          <h4 className="txt-center mt-5">
            {proModal.msg}
          </h4>
          <div className="txt-center">
            <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer"><button className="btn btn-lg blue" type="button">{__('Buy Premium')}</button></a>
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
              onChange={({ target: { value } }) => setFormInfo(oldInfo => ({ ...oldInfo, formName: value }))}
              value={formName}
              data-testid="form-name"
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
            <Route exact path="/form/builder/:formType/:formID/:rightBar?/:element?/:fieldKey?">
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

const defaultConfirmationValue = (formID) => {
  const msgType = 'snackbar'
  const position = 'bottom-right'
  const animation = 'fade'
  const autoHide = true
  const duration = 5
  const styles = {
    width: '300px',
    padding: '5px 35px 5px 20px',
    color: '#000000',
    background: '#fafafa',
    borderWidth: '1px',
    borderType: 'solid',
    borderColor: 'gray',
    borderRadius: '10px',
    boxShadow: [{ x: '0px', y: '27px', blur: '30px', spread: '', color: 'rgb(0 0 0 / 18%)', inset: '' },
      { x: '0px', y: '5.2px', blur: '9.4px', spread: '5px', color: 'rgb(0 0 0 / 6%)', inset: '' },
      { x: '0px', y: '11.1px', blur: '14px', spread: '', color: 'rgb(0 0 0 / 14%)', inset: '' }],
    closeBackground: '#48484829',
    closeHover: '#dfdfdf',
    closeIconColor: '#5a5a5a',
    closeIconHover: '#000',
  }
  return {
    type: {
      successMsg: [{
        title: 'Untitled Message 1',
        msg: __('<p>Successfully Submitted.</p>'),
        config: {
          msgType,
          position,
          animation,
          autoHide,
          duration,
          styles,
          stylesObj: confirmMsgCssStyles(formID, 0, msgType, position, animation, styles),
        },
      }],
      redirectPage: [{ title: 'Untitled Redirect-Url 1', url: '' }],
      webHooks: [{ title: 'Untitled Web-Hook 1', url: '', method: 'GET' }],
    },
  }
}
const defaultWorkflowValue = [
  {
    title: __('Show Success Message'),
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
const btnData = {
  typ: 'button',
  btnSiz: 'md',
  btnTyp: 'submit',
  txt: 'Submit',
  align: 'end',
  icn: {
    pos: '',
    url: '',
  },
  valid: {},
  customClasses: {},
  customAttributes: {},
}
