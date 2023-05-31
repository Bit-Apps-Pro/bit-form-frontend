import loadable from '@loadable/component'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAtom, useAtomValue, useSetAtom } from 'recoil'
import bitIcn from '../../logo.svg'
import BuilderLoader from '../components/Loaders/BuilderLoader'
import Loader from '../components/Loaders/Loader'
import PublishBtn from '../components/PublishBtn'
import RouteByParams from '../components/RouteByParams'
import UpdateButton from '../components/UpdateButton'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import Modal from '../components/Utilities/Modal'
import SegmentControl from '../components/Utilities/SegmentControl'
import {
  $additionalSettings, $breakpoint, $breakpointSize, $builderHelperStates, $builderSettings, $colorScheme, $confirmations, $customCodes, $deletedFldKey, $fieldLabels, $fields, $formId, $formInfo, $integrations, $isNewThemeStyleLoaded, $layouts, $mailTemplates, $nestedLayouts, $newFormId, $reportId, $reports, $updateBtn, $workflows,
} from '../GlobalStates/GlobalStates'
import { $savedStylesAndVars } from '../GlobalStates/SavedStylesAndVars'
import { $staticStylesState } from '../GlobalStates/StaticStylesState'
import { $allStyles } from '../GlobalStates/StylesState'
import { $allThemeColors } from '../GlobalStates/ThemeColorsState'
import { $allThemeVars } from '../GlobalStates/ThemeVarsState'
import BackIcn from '../Icons/BackIcn'
import CloseIcn from '../Icons/CloseIcn'
import navbar from '../styles/navbar.style'
import bitsFetch from '../Utils/bitsFetch'
import { addToBuilderHistory, getSessionStorageStates } from '../Utils/FormBuilderHelper'
import { hideWpMenu, resetRecoilStates, showWpMenu } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import { ShowProModalContext } from '../Utils/StaticData/Contexts'
import templateProvider from '../Utils/StaticData/form-templates/templateProvider'

const FormBuilder = loadable(() => import('./FormBuilder'), { fallback: <BuilderLoader /> })
const FormEntries = loadable(() => import('./FormEntries'), { fallback: <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }} /> })
const FormSettings = loadable(() => import('./FormSettings'), { fallback: <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }} /> })

function FormDetails() {
  let componentMounted = true
  const navigate = useNavigate()
  const { formType, formID } = useParams()
  const setReports = useSetAtom($reports)
  const setFormId = useSetAtom($formId)
  const setFields = useSetAtom($fields)
  const setFieldLabels = useSetAtom($fieldLabels)
  const [appFullScreen, setAppFullScreen] = useState(true)
  const [allResponse, setAllResponse] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const updateBtn = useAtomValue($updateBtn)
  const [formInfo, setFormInfo] = useAtom($formInfo)
  const { formName } = formInfo
  const [modal, setModal] = useState({ show: false, title: '', msg: '', action: () => closeModal(), btnTxt: '' })
  const [proModal, setProModal] = useState({ show: false, msg: '' })
  const setMailTem = useSetAtom($mailTemplates)
  const setworkFlows = useSetAtom($workflows)
  const setAdditional = useSetAtom($additionalSettings)
  const [integrations, setIntegration] = useAtom($integrations)
  const setConfirmations = useSetAtom($confirmations)
  const setReportId = useSetAtom($reportId)
  const setLayouts = useSetAtom($layouts)
  const setNestedLayouts = useSetAtom($nestedLayouts)
  const setAllThemeColors = useSetAtom($allThemeColors)
  const setAllThemeVars = useSetAtom($allThemeVars)
  const setAllStyles = useSetAtom($allStyles)
  const setSavedStylesAndVars = useSetAtom($savedStylesAndVars)
  const setIsNewThemeStyleLoaded = useSetAtom($isNewThemeStyleLoaded)
  const setUpdateBtn = useSetAtom($updateBtn)
  const newFormId = useAtomValue($newFormId)
  const { css } = useFela()
  const [staticStylesState, setStaticStylesState] = useAtom($staticStylesState)
  const setBreakpoint = useSetAtom($breakpoint)
  const [builderHelperStates, setBuilderHelperStates] = useAtom($builderHelperStates)
  const [builderSettings, setBuilderSettings] = useAtom($builderSettings)
  const [colorScheme, setColorScheme] = useAtom($colorScheme)
  const [customCodes, setCustomCodes] = useAtom($customCodes)
  const [deletedFldKey, setDeletedFldKey] = useAtom($deletedFldKey)
  const [breakpointSize, setBreakpointSize] = useAtom($breakpointSize)

  useEffect(() => { setFormId(formID) }, [formID])

  const activePath = () => {
    const loaciton = useLocation()
    const pathArray = loaciton.pathname.split('/')
    return pathArray[2].charAt(0).toUpperCase() + pathArray[2].slice(1)
  }

  const setNewFormInitialStates = () => {
    const {
      name,
      fields,
      layouts,
      confirmations,
      conditions,
      allThemeColors,
      allThemeVars,
      allStyles,
      additionalSettings,
    } = templateProvider(formType, newFormId)

    setFormInfo({ formName: name })
    setFields(fields)
    setLayouts(layouts)
    setConfirmations(confirmations)
    setworkFlows(conditions)
    setAllThemeColors(allThemeColors)
    setAllThemeVars(allThemeVars)
    setAllStyles(allStyles)
    setSavedStylesAndVars({ allThemeColors, allThemeVars, allStyles })
    setIsNewThemeStyleLoaded(true)
    addToBuilderHistory({ state: { fields, layouts, allThemeColors, allThemeVars, allStyles } }, false, 0)
    setisLoading(false)
    if (additionalSettings) {
      setAdditional(additionalSettings)
    }
  }

  const onMount = () => {
    window.scrollTo(0, 0)
    hideWpMenu()
    if (formType !== 'edit') {
      setNewFormInitialStates()
      return
    }
    setOldFormStates()
  }

  const onUnmount = () => {
    showWpMenu()
    setAppFullScreen(false)
    resetRecoilStates()
  }

  useEffect(() => {
    onMount()
    return () => {
      componentMounted = false
      // TODO: temproray turn off if it causes any hot reload problem
      onUnmount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSessionStorageStates = () => {
    let sessionDataNotFound = 0
    const sessionStorageBreakpoint = getSessionStorageStates(`btcd-breakpoint-bf-${formID}`) ?? (sessionDataNotFound += 1)
    const sessionStorageAllThemeVars = {
      lgLightThemeVars: getSessionStorageStates(`btcd-themeVarsLgLight-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      mdLightThemeVars: getSessionStorageStates(`btcd-themeVarsMdLight-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      smLightThemeVars: getSessionStorageStates(`btcd-themeVarsSmLight-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      lgDarkThemeVars: getSessionStorageStates(`btcd-themeVarsLgDark-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      mdDarkThemeVars: getSessionStorageStates(`btcd-themeVarsMdDark-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      smDarkThemeVars: getSessionStorageStates(`btcd-themeVarsSmDark-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
    }
    const sessionStorageAllThemeColors = {
      lightThemeColors: getSessionStorageStates(`btcd-lightThemeColors-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      darkThemeColors: getSessionStorageStates(`btcd-darkThemeColors-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
    }
    const sessionStorageAllStyles = {
      lgLightStyles: getSessionStorageStates(`btcd-stylesLgLight-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      mdLightStyles: getSessionStorageStates(`btcd-stylesMdLight-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      smLightStyles: getSessionStorageStates(`btcd-stylesSmLight-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      lgDarkStyles: getSessionStorageStates(`btcd-stylesLgDark-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      mdDarkStyles: getSessionStorageStates(`btcd-stylesMdDark-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
      smDarkStyles: getSessionStorageStates(`btcd-stylesSmDark-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1),
    }
    const sessionLayouts = getSessionStorageStates(`btcd-layouts-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1)
    const sessionNestedLayouts = getSessionStorageStates(`btcd-nested-layouts-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1)
    const sessionFields = getSessionStorageStates(`btcd-fields-bf-${formID}`, { strType: 'json' }) ?? (sessionDataNotFound += 1)

    const sessionBreakpointSize = getSessionStorageStates(`btcd-breakpointSize-bf-${formID}`, { strType: 'json' }) ?? breakpointSize
    const sessionStaticStyle = getSessionStorageStates(`btcd-staticStyles-bf-${formID}`, { strType: 'json' }) ?? staticStylesState
    const sessionBuilderHelperStates = getSessionStorageStates(`btcd-builderHelperStates-bf-${formID}`, { strType: 'json' }) ?? builderHelperStates
    const sessionBuilderSettings = getSessionStorageStates(`btcd-builderSettings-bf-${formID}`, { strType: 'json' }) ?? builderSettings
    const sessionColorScheme = getSessionStorageStates(`btcd-colorScheme-bf-${formID}`) ?? colorScheme
    const sessionCustomCodes = getSessionStorageStates(`btcd-customCodes-bf-${formID}`, { strType: 'json' }) ?? customCodes
    const sessionDeletedFldKey = getSessionStorageStates(`btcd-deletedFldKey-bf-${formID}`, { strType: 'json' }) ?? deletedFldKey
    const sessionFormInfo = getSessionStorageStates(`btcd-formInfo-bf-${formID}`, { strType: 'json' }) ?? formInfo

    if (sessionDataNotFound === 0) {
      setLayouts(sessionLayouts)
      setNestedLayouts(sessionNestedLayouts)
      setFields(sessionFields)
      addToBuilderHistory({ state: { layouts: sessionLayouts, fields: sessionFields } }, false, 0)
      setBreakpoint(sessionStorageBreakpoint)
      setAllThemeVars(sessionStorageAllThemeVars)
      setAllThemeColors(sessionStorageAllThemeColors)
      setAllStyles(sessionStorageAllStyles)
      setStaticStylesState(sessionStaticStyle)
      setSavedStylesAndVars({ allThemeVars: sessionStorageAllThemeVars, allThemeColors: sessionStorageAllThemeColors, allStyles: sessionStorageAllStyles })
      setBuilderHelperStates(sessionBuilderHelperStates)
      setBuilderSettings(sessionBuilderSettings)
      setColorScheme(sessionColorScheme)
      setCustomCodes(sessionCustomCodes)
      setDeletedFldKey(sessionDeletedFldKey)
      setFormInfo(sessionFormInfo)
      setUpdateBtn({ unsaved: true })
      setBreakpointSize(sessionBreakpointSize)
      setIsNewThemeStyleLoaded(true)
      return true
    }

    return false
  }

  const setOldFormStates = () => {
    if (formType === 'edit') {
      bitsFetch({ id: formID }, 'bitforms_get_a_form')
        .then(res => {
          if (res?.success && componentMounted) {
            const responseData = res.data
            const defaultReport = responseData?.reports?.find(report => report.isDefault.toString() === '1')
            const formsSessionDataFound = handleSessionStorageStates()
            if (!formsSessionDataFound) {
              setLayouts(responseData.form_content.layout)
              addToBuilderHistory({ state: { layouts: responseData.form_content.layout } }, false, 0)
            }
            if (!formsSessionDataFound) {
              setNestedLayouts(responseData.form_content.nestedLayout || {})
              addToBuilderHistory({ state: { nestedLayouts: responseData.form_content.nestedLayout || {} } }, false, 0)
            }
            if (!formsSessionDataFound) {
              setFields(responseData.form_content.fields)
              addToBuilderHistory({ state: { fields: responseData.form_content.fields } }, false, 0)
            }
            if (!formsSessionDataFound) {
              setFormInfo(oldInfo => ({ ...oldInfo, formName: responseData.form_content.form_name }))
            }
            setworkFlows(responseData.workFlows)
            setAdditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setConfirmations(responseData.formSettings.confirmation)
            setMailTem(responseData.formSettings.mailTem)
            if (!formsSessionDataFound && responseData.builderSettings) setBuilderSettings(responseData.builderSettings)
            setReportId({
              id: responseData?.form_content?.report_id || defaultReport?.id,
              isDefault: responseData?.form_content?.report_id === null,
            })
            setFieldLabels(responseData.Labels)
            setReports(responseData.reports || [])
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
      action: () => navigate('/', { replace: true }),
    })
  }

  const options = [
    { label: 'Builder' },
    { label: 'Responses' },
    { label: 'Settings' },
  ]

  const onChangeHandler = (value) => {
    if (value === 'Builder') {
      navigate(`/form/builder/${formType}/${formID}/fields-list`)
    }
    if (value === 'Responses') {
      navigate(`/form/responses/${formType}/${formID}/`)
    }
    if (value === 'Settings') {
      navigate(`/form/settings/${formType}/${formID}/form-settings`)
    }
  }

  return (
    <ShowProModalContext.Provider value={setProModal}>
      <div className={`btcd-builder-wrp ${appFullScreen && 'btcd-ful-scn'}`}>
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
          cancelBtn={modal.cancelBtn}
          close={closeModal}
        />
        <nav className={css(navbar.btct_bld_nav)}>
          <div className={css(navbar.btcd_bld_title)}>
            <NavLink className={css(navbar.nav_back_icn)} to="/" onClick={updateBtn.unsaved ? showUnsavedWarning : null}>
              <span className="g-c"><BackIcn size="22" className="mr-2" stroke="3" /></span>
            </NavLink>
            <div className={css(navbar.bit_icn)}>
              <img width="16" src={bitIcn} alt="BitForm logo" />
            </div>
            <input
              className={css(navbar.btcd_bld_title_inp)}
              onChange={({ target: { value } }) => {
                setFormInfo(oldInfo => ({ ...oldInfo, formName: value }))
                setUpdateBtn(oldUpdateBtn => ({ ...oldUpdateBtn, unsaved: true }))
              }}
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
            {/* <FeedbackBtn /> */}
            {formType === 'edit' && <PublishBtn />}
            <UpdateButton componentMounted={componentMounted} modal={modal} setModal={setModal} />
            <NavLink to="/" className={css(navbar.cls_btn)} onClick={updateBtn.unsaved ? showUnsavedWarning : null}>
              <CloseIcn size="14" />
            </NavLink>
          </div>
        </nav>
        <div className={css(navbar.builder_routes)}>

          <RouteByParams
            page="responses"
            formType
            formID
            render={(
              <FormEntries
                isLoading={isLoading}
                allResp={allResponse}
                setAllResp={setAllResponse}
                integrations={integrations}
              />
            )}
          />
          <RouteByParams page="builder" formType formID render={<FormBuilder isLoading={isLoading} />} />
          <RouteByParams page="settings" formType formID render={<FormSettings setProModal={setProModal} />} />
          {/* <Routes> */}
          {/* <Route path=":rightBar/:fieldKey" element={<FormBuilderHOC isLoading={isLoading} />} /> */}
          {/* <Route path=":rightBar/:element/:fieldKey" element={<FormBuilderHOC isLoading={isLoading} />} /> */}
          {/* </Routes> */}

          {/* <RouteByParams
            page="builder"
            formType
            formId
            rightBar="?"
            fieldKey="?"
            element="?"
            render={<FormBuilderHOC isLoading={isLoading} />}
          /> */}
          {/* <RouteByParams
            page="responses"
            formType
            formId
            render={

            }
          /> */}

          {/* <Routes> */}

          {/* <Route
              path="/builder/:formType/:formID/:rightBar/:element/:fieldKey"
              element={(
                <Suspense fallback={<BuilderLoader />}>
                  <FormBuilderHOC isLoading={isLoading} />
                </Suspense>
              )}
            /> */}
          {/* <Route
              path="/builder/:formType/:formID/:rightBar/:element"
              element={(
                <Suspense fallback={<BuilderLoader />}>
                  <FormBuilderHOC isLoading={isLoading} />
                </Suspense>
              )}
            /> */}
          {/* <Route
              path="/builder/:formType/:formID/:rightBar"
              element={(
                <Suspense fallback={<BuilderLoader />}>
                  <FormBuilderHOC isLoading={isLoading} />
                </Suspense>
              )}
            /> */}
          {/* <Route
              path="/builder/:formType/:formID"
              element={(
                <Suspense fallback={<BuilderLoader />}>
                  <FormBuilderHOC isLoading={isLoading} />
                </Suspense>
              )}
            /> */}

          {/* // <Route
            //   path="/responses/:formType/:formID"
            //   element={
            //     !isLoading ? (
            //       <FormEntries
            //         allResp={allResponse}
            //         setAllResp={setAllResponse}
            //         integrations={integrations}
            //       />
            //     ) : <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }} />
            //   }
            // /> */}

          {/* <Route
              path="/settings/:formType/:formID"
              element={<FormSettings setProModal={setProModal} />}
            /> */}
          {/* <Route
              path="/settings/:formType/:formID/:settings"
              element={<FormSettings setProModal={setProModal} />}
            /> */}
          {/* </Routes> */}
        </div>
      </div>
    </ShowProModalContext.Provider>
  )
}

export default memo(FormDetails)
