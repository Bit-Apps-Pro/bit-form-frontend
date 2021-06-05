import { useState, useContext, memo, useEffect, lazy, Suspense, createContext } from 'react'
import { Switch, Route, NavLink, useParams, withRouter } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { __ } from '../Utils/i18nwrap'
import FormSettings from './FormSettings'
import FormEntries from './FormEntries'
import bitsFetch from '../Utils/bitsFetch'
import { AllFormContext } from '../Utils/AllFormContext'
import SnackMsg from '../components/Utilities/SnackMsg'
import BuilderLoader from '../components/Loaders/BuilderLoader'
import '../resource/sass/components.scss'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import { hideWpMenu, showWpMenu, getNewId, bitDecipher, bitCipher } from '../Utils/Helpers'
import Loader from '../components/Loaders/Loader'
import LoaderSm from '../components/Loaders/LoaderSm'
import Modal from '../components/Utilities/Modal'
import { sortLayoutByXY } from '../Utils/FormBuilderHelper'
import CloseIcn from '../Icons/CloseIcn'
import { _fieldLabels, _fields, _fieldsArr, _uniqueFieldKey } from '../GlobalStates'
// import useSWR from 'swr'

const FormBuilder = lazy(() => import('./FormBuilder'))

export const FormSaveContext = createContext(null)
export const ShowProModalContext = createContext(null)

function FormDetails(props) {
  let componentMounted = true
  const { formType, formID } = useParams()
  const [fulScn, setFulScn] = useState(true)
  const [newCounter, setNewCounter] = useState(0)
  // const [uniqueFieldKey,  ] = useRecoilState(_fieldCounter)
  const [allResponse, setAllResponse] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [lay, setLay] = useState({ lg: [], md: [], sm: [] })
  const [fields, setFields] = useRecoilState(_fields)
  const setFieldLabels = useSetRecoilState(_fieldLabels)
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const [formName, setFormName] = useState('Untitled Form')
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const { allFormsData, reportsData } = useContext(AllFormContext)
  const [snack, setSnackbar] = useState({ show: false })
  const { allFormsDispatchHandler } = allFormsData
  const { reports, reportsDispatch } = reportsData
  const [modal, setModal] = useState({ show: false, title: '', msg: '', action: () => closeModal(), btnTxt: '' })
  const [proModal, setProModal] = useState({ show: false, msg: '' })
  const { history, newFormId } = props
  const resetState1 = useResetRecoilState(_fieldLabels)
  const resetState2 = useResetRecoilState(_fields)

  // const uniq = useRecoilValue(_uniqueFieldKey)
  // console.log({ uniq, newCounter })
  // useEffect(() => {
  //   const tmpLabels = [...allLabels]
  //   let i = 0
  //   while (i < tmpLabels.length) {
  //     tmpLabels[i].name = tmpLabels[i].adminLbl || tmpLabels[i].name || tmpLabels[i].key
  //     i += 1
  //   }
  //   setFormFields(sortArrOfObj(tmpLabels, 'name'))
  // }, [allLabels])

  const onMount = () => {
    if (sessionStorage.getItem('bitformData')) {
      const formData = JSON.parse(bitDecipher(sessionStorage.getItem('bitformData')))
      formData.layout !== undefined && setLay(formData.layout)
      setFields(formData.fields)
      setNewCounter(getNewId(formData.fields))
      setFormName(formData.form_name)
      setFormSettings(formData.formSettings)
      setworkFlows(formData.workFlows)
      setadditional(formData.additional)
      setIntegration(formData.formSettings.integrations)
      setMailTem(formData.formSettings.mailTem)
      // if ('formSettings' in formData && 'submitBtn' in formSettings) setSubBtn(formData.formSettings.submitBtn)
      sessionStorage.removeItem('bitformData')
      setSnackbar({ show: true, msg: __('Please try again. Token was expired', 'bitform') })
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
    setFulScn(false)
    showWpMenu()
    resetState1()
    resetState2()
  }

  useEffect(() => {
    onMount()
    return () => {
      componentMounted = false
      onUnmount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [mailTem, setMailTem] = useState([])

  const [integrations, setIntegration] = useState([])

  const [workFlows, setworkFlows] = useState([defaultWorkflow])

  const [additional, setadditional] = useState({ enabled: {}, settings: {} })
  const [formSettings, setFormSettings] = useState({
    formName,
    theme: 'default',
    // submitBtn: subBtn,
    confirmation: {
      type: {
        successMsg: [{ title: 'Untitled Message 1', msg: __('Successfully Submitted.', 'bitform') }],
        redirectPage: [{ title: 'Untitled Redirect-Url 1', url: '' }],
        webHooks: [{ title: 'Untitled Web-Hook 1', url: '', method: 'GET' }],
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
        const btnData = {
          typ: 'button',
          btnSiz: 'md',
          btnTyp: 'submit',
          txt: 'Submit',
          align: 'right',
        }
        const btnFld = []
        btnFld[`bf${newFormId}-1`] = btnData
        const btnLay = { lg: [], md: [], sm: [] }
        const subBtnLay = { h: 2, i: `bf${newFormId}-1`, minH: 2, w: 6, x: 0, y: Infinity }
        btnLay.lg.push(subBtnLay)
        btnLay.md.push(subBtnLay)
        btnLay.sm.push(subBtnLay)
        setLay(btnLay)
        setFields(btnFld)
        setNewCounter(2)
        setisLoading(false)
      } else {
        bitsFetch({ template: formTitle, newFormId }, 'bitforms_get_template')
          .then(res => {
            if (res?.success && componentMounted) {
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
          if (res?.success && componentMounted) {
            const responseData = res.data
            responseData.form_content.layout !== undefined && setLay(responseData.form_content.layout)
            setFields(responseData.form_content.fields)
            setNewCounter(getNewId(responseData.form_content.fields))
            setFormName(responseData.form_content.form_name)
            setFormSettings(responseData.formSettings)
            setworkFlows(responseData.workFlows)
            setadditional(responseData.additional)
            setIntegration(responseData.formSettings.integrations)
            setMailTem(responseData.formSettings.mailTem)
            // if ('formSettings' in responseData && 'submitBtn' in formSettings) setSubBtn(responseData.formSettings.submitBtn)
            setFieldLabels(responseData.Labels)
            if ('reports' in responseData) reportsDispatch({ type: 'set', reports: responseData.reports })
            else reportsDispatch({ type: 'set', reports: [] })
            setisLoading(false)
          } else {
            if (!res.success && res.data === 'Token expired') {
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

  const fSettings = {
    formName,
    theme: 'default',
    // submitBtn: subBtn,
    confirmation: { ...formSettings.confirmation },
    mailTem,
    integrations,
    additional,
  }

  const saveForm = () => {
    if (!checkSubmitBtn()) {
      modal.show = true
      modal.title = __('Sorry', 'bitform')
      modal.btnTxt = __('Close', 'bitform')
      modal.msg = __('Please add a submit button', 'bitform')
      setModal({ ...modal })
      return
    }
    let formStyle = sessionStorage.getItem('btcd-fs')
    const sortLayoutLG = lay
    sortLayoutLG.lg = sortLayoutByXY(lay.lg)

    if (formStyle) {
      formStyle = bitDecipher(formStyle)
    }
    if (lay.md.length === 0 || typeof lay === 'undefined') {
      modal.show = true
      modal.title = __('Sorry', 'bitform')
      modal.btnTxt = __('Close', 'bitform')
      modal.msg = __('You can not save a blank form', 'bitform')
      setModal({ ...modal })
    } else {
      setbuttonDisabled(true)
      let formData = {
        form_id: newFormId,
        layout: sortLayoutLG,
        fields,
        form_name: formName,
        formSettings: fSettings,
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
        setFormSettings({ ...formSettings, integrations })
        formData = {
          id: savedFormId,
          layout: sortLayoutLG,
          fields,
          form_name: formName,
          formSettings: fSettings,
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
          if (response?.success && componentMounted) {
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
                setFieldLabels(data.Labels)
                if ('reports' in data) reportsDispatch({ type: 'set', reports: data.reports })
                else reportsDispatch({ type: 'set', reports: [] })
              }
              allFormsDispatchHandler({
                type: 'add',
                data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitform id='${data.id}'`, entries: data.entries, views: data.views, conversion: data.entries === 0 ? 0.00 : ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at },
              })
            } else if (action === 'bitforms_update_form') {
              setSnackbar({ show: true, msg: data.message })
              if ('formSettings' in data) setFormSettings(data.formSettings)
              if ('workFlows' in data) setworkFlows(data.workFlows)
              if ('formSettings' in data && 'integrations' in formSettings) {
                setIntegration(data.formSettings.integrations)
              }
              if ('formSettings' in data && 'mailTem' in formSettings) setMailTem(data.formSettings.mailTem)
              setFieldLabels(data.Labels)
              if ('reports' in data) reportsDispatch({ type: 'set', reports: data.reports })
              else reportsDispatch({ type: 'set', reports: [] })
              allFormsDispatchHandler({
                type: 'update',
                data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitform id='${data.id}'`, entries: data.entries, views: data.views, conversion: data.entries === 0 ? 0.00 : ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at },
              })
            }
            setbuttonDisabled(false)
            sessionStorage.removeItem('btcd-lc')
            sessionStorage.removeItem('btcd-fs')
            sessionStorage.removeItem('btcd-rh')
          } else if (!response?.success && response?.data === 'Token expired') {
            sessionStorage.setItem('bitformData', bitCipher(JSON.stringify(formData)))
            window.location.reload()
          } else if (!response?.success) {
            setSnackbar({ show: true, msg: response?.data?.message })
            setTimeout(() => { window.location.reload() }, 2000)
          }
        })
    }
  }

  const closeModal = () => {
    modal.show = false
    setModal({ ...modal })
  }

  const checkSubmitBtn = () => {
    const btns = Object.values(fields).filter(fld => fld.typ === 'button' && fld.btnTyp === 'submit')
    const payFields = fields ? Object.values(fields).filter(field => field.typ.match(/paypal|razorpay/)) : []
    return (payFields.length > 0 || btns.length > 0)
  }
  useEffect(() => {
    if (integrations[integrations.length - 1]?.newItegration || integrations[integrations.length - 1]?.editItegration) {
      integrations.pop()
      saveForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrations])

  return (
    <FormSaveContext.Provider value={saveForm}>
      <ShowProModalContext.Provider value={setProModal}>
        <div className={`btcd-builder-wrp ${fulScn && 'btcd-ful-scn'}`}>
          <SnackMsg snack={snack} setSnackbar={setSnackbar} />
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
                <span className="btcd-icn icn-arrow_back" />
                {' '}
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
              <button className="btn blue" type="button" onClick={saveForm} disabled={buttonDisabled}>
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
                <FormBuilder
                  newCounter={newCounter}
                  isLoading={isLoading}
                  lay={lay}
                  setLay={setLay}
                  setNewCounter={setNewCounter}
                  theme={fSettings.theme}
                  formID={formType === 'new' ? newFormId : formID}
                  formType={formType}
                  formSettings={fSettings}
                />
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
                formName={formName}
                fields={fields}
                formSettings={fSettings}
                setFormSettings={setFormSettings}
                mailTem={mailTem}
                setMailTem={setMailTem}
                integrations={integrations}
                setIntegration={setIntegration}
                workFlows={workFlows}
                setworkFlows={setworkFlows}
                additional={additional}
                setadditional={setadditional}
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

const defaultWorkflow = {
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
}
