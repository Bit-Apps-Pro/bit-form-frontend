/* eslint-disable no-unused-expressions */
import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  $additionalSettings,
  $breakpointSize,
  $builderHelperStates,
  $builderHookStates,
  $builderSettings,
  $confirmations,
  $customCodes,
  $deletedFldKey,
  $fieldLabels,
  $fields,
  $formInfo,
  $forms,
  $integrations,
  $layouts,
  $mailTemplates,
  $newFormId,
  $reportId,
  $reports,
  $reportSelector,
  $selectedFieldId,
  $updateBtn,
  $workflows,
} from '../GlobalStates/GlobalStates'
import { $allStyles, $styles } from '../GlobalStates/StylesState'
import { $allThemeColors } from '../GlobalStates/ThemeColorsState'
import { $allThemeVars } from '../GlobalStates/ThemeVarsState'
import navbar from '../styles/navbar.style'
import atomicStyleGenarate from '../Utils/atomicStyleGenarate'
import bitsFetch from '../Utils/bitsFetch'
import { prepareLayout } from '../Utils/FormBuilderHelper'
import { JCOF, select, selectInGrid } from '../Utils/globalHelpers'
import { bitCipher, bitDecipher, isObjectEmpty } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import { formsReducer } from '../Utils/Reducers'
import LoaderSm from './Loaders/LoaderSm'
// TODO - updateGoogleFontUrl move to Utils and discuss with team for optimization
import { removeUnuseStylesAndUpdateState, updateGoogleFontUrl } from './style-new/styleHelpers'

export default function UpdateButton({ componentMounted, modal, setModal }) {
  const navigate = useNavigate()
  const { page, formType, formID, '*': rightBarUrl } = useParams()
  const { css } = useFela()
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const [lay, setLay] = useRecoilState($layouts)
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const [deletedFldKey, setDeletedFldKey] = useRecoilState($deletedFldKey)
  const fields = useRecoilValue($fields)
  const formInfo = useRecoilValue($formInfo)
  const { formName } = formInfo
  const newFormId = useRecoilValue($newFormId)
  const setAllForms = useSetRecoilState($forms)
  const builderHelperStates = useRecoilValue($builderHelperStates)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const setFieldLabels = useSetRecoilState($fieldLabels)
  const resetUpdateBtn = useResetRecoilState($updateBtn)
  const [reports, setReports] = useRecoilState($reports)
  const currentReport = useRecoilValue($reportSelector)
  const [reportId, setReportId] = useRecoilState($reportId)
  const [mailTem, setMailTem] = useRecoilState($mailTemplates)
  const [updateBtn, setUpdateBtn] = useRecoilState($updateBtn)
  const [workFlows, setworkFlows] = useRecoilState($workflows)
  const [integrations, setIntegration] = useRecoilState($integrations)
  const [additional, setAdditional] = useRecoilState($additionalSettings)
  const [confirmations, setConfirmations] = useRecoilState($confirmations)
  // const style = useRecoilValue($styles)
  const [style] = useRecoilState($styles)
  const setAllThemeColors = useSetRecoilState($allThemeColors)
  const setAllThemeVars = useSetRecoilState($allThemeVars)
  const setAllStyles = useSetRecoilState($allStyles)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const builderSettings = useRecoilValue($builderSettings)

  const breakpointSize = useRecoilValue($breakpointSize)

  const customCodes = useRecoilValue($customCodes)

  useEffect(() => {
    if (integrations[integrations.length - 1]?.newItegration || integrations[integrations.length - 1]?.editItegration) {
      const newIntegrations = produce(integrations, draft => { draft.pop() })
      setIntegration(newIntegrations)
      saveForm('integrations', newIntegrations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrations])

  useEffect(() => {
    if (mailTem[mailTem.length - 1]?.updateTem) {
      const newTem = produce(mailTem, draft => {
        draft.pop()
      })
      setMailTem(newTem)
      saveForm('email-template', newTem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailTem])

  const updateBtnEvent = e => {
    if ((e.key === 's' || e.key === 'S') && e.ctrlKey) {
      e.preventDefault()
      if (!updateBtn.disabled) {
        saveOrUpdateForm()
      }
      return false
    }
  }

  const closeTabOrBrowserEvent = e => {
    if (updateBtn.unsaved) {
      e.preventDefault()
      // TODO remove this depricated feature
      e.returnValue = ''
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', updateBtnEvent)
    const iFrameDocument = document.getElementById('bit-grid-layout')?.contentDocument
    iFrameDocument?.addEventListener('keydown', updateBtnEvent)
    window.addEventListener('beforeunload', closeTabOrBrowserEvent)
    return () => {
      document.removeEventListener('keydown', updateBtnEvent)
      iFrameDocument?.removeEventListener('keydown', updateBtnEvent)
      window.removeEventListener('beforeunload', closeTabOrBrowserEvent)
    }
  })

  const checkUpdateBtnErrors = () => {
    if (updateBtn.errors) {
      const firstErr = updateBtn.errors[0]
      if (firstErr.errorMsg) toast.error(firstErr.errorMsg)
      else toast.error(__('Please fix the errors'))
      if (firstErr.errorUrl) {
        navigate(firstErr.errorUrl)
      }
      if (firstErr.fieldKey) {
        setSelectedFieldId(firstErr.fieldKey)
        setTimeout(() => {
          selectInGrid(`[data-key="${firstErr.fieldKey}"]`)?.focus()
        }, 500)
      }
      return true
    }
    return false
  }

  const saveOrUpdateForm = btnTyp => {
    const saveBtn = select('#secondary-update-btn')
    if (saveBtn) {
      saveBtn.click()
    } else if (btnTyp === 'update-btn') {
      if (checkUpdateBtnErrors()) return
      // TODO: update the code
      if (style?.font?.fontType === 'Google') updateGoogleFontUrl()
      saveForm()
    } else {
      select('#update-btn').click()
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
      const mdl = { ...modal }
      mdl.show = true
      mdl.title = __('Sorry')
      mdl.btnTxt = __('Close')
      mdl.msg = __('Please add a submit button')
      setModal(mdl)
      return
    }
    if (!lay.md.length || typeof lay === 'undefined') {
      const mdl = { ...modal }
      mdl.show = true
      mdl.title = __('Sorry')
      mdl.btnTxt = __('Close')
      mdl.msg = __('You can not save a blank form')
      setModal(mdl)
      return
    }

    // setUpdateBtn({ disabled: true, loading: true })

    const layouts = prepareLayout(lay, builderHelperStates.respectLGLayoutOrder)

    const isStyleNotLoaded = isObjectEmpty(style) || style === undefined

    const {
      atomicCssText,
      atomicClassMap,
      lightThemeColors,
      darkThemeColors,
      lgLightThemeVars,
      lgDarkThemeVars,
      mdLightThemeVars,
      mdDarkThemeVars,
      smLightThemeVars,
      smDarkThemeVars,
      lgLightStyles,
      lgDarkStyles,
      mdLightStyles,
      mdDarkStyles,
      smLightStyles,
      smDarkStyles,
    } = isStyleNotLoaded ? {} : atomicStyleGenarate(layouts)

    const allThemeColors = {
      lightThemeColors,
      darkThemeColors,
    }
    const allThemeVars = {
      lgLightThemeVars,
      lgDarkThemeVars,
      mdLightThemeVars,
      mdDarkThemeVars,
      smLightThemeVars,
      smDarkThemeVars,
    }
    const allStyles = {
      lgLightStyles,
      lgDarkStyles,
      mdLightStyles,
      mdDarkStyles,
      smLightStyles,
      smDarkStyles,
    }

    if (!isStyleNotLoaded) {
      const atomicData = {
        form_id: savedFormId || newFormId,
        atomicCssText,
      }
      bitsFetch(atomicData, 'bitforms_save_css')
        .catch(err => console.error('save css error=', err))
    }

    let formStyle = sessionStorage.getItem('btcd-fs')
    formStyle = formStyle && (bitDecipher(formStyle))

    const formData = {
      ...(savedFormId && { id: savedFormId }),
      ...(!savedFormId && { form_id: newFormId }),
      ...(savedFormId && { currentReport }),
      layout: layouts,
      fields,
      // saveStyle && style obj
      form_name: formName,
      report_id: reportId.id,
      additional: additionalSettings,
      workFlows,
      formStyle,
      // style: isStyleNotLoaded ? undefined : allStyles,
      // themeColors: isStyleNotLoaded ? undefined : allThemeColors,
      // themeVars: isStyleNotLoaded ? undefined : allThemeVars,
      // atomicClassMap: isStyleNotLoaded ? undefined : atomicClassMap,
      ...(!isStyleNotLoaded && { style: JCOF.stringify(allStyles) }),
      ...(!isStyleNotLoaded && { themeColors: JCOF.stringify(allThemeColors) }),
      ...(!isStyleNotLoaded && { themeVars: JCOF.stringify(allThemeVars) }),
      ...(!isStyleNotLoaded && { atomicClassMap }),
      breakpointSize,
      customCodes,
      layoutChanged: sessionStorage.getItem('btcd-lc'),
      rowHeight: sessionStorage.getItem('btcd-rh'),
      formSettings: {
        formName,
        theme: 'default',
        confirmation: confirmations,
        mailTem: mailTemplates,
        integrations: allIntegrations,
      },
      builderSettings,
    }
    const action = savedFormId ? 'bitforms_update_form' : 'bitforms_create_new_form'
    if (savedFormId && deletedFldKey.length !== 0) {
      formData.deletedFldKey = deletedFldKey
    }

    const formSavePromise = bitsFetch(formData, action)
      .then(response => {
        if (response?.success && componentMounted) {
          let { data } = response
          if (typeof data !== 'object') { data = JSON.parse(data) }
          if (action === 'bitforms_create_new_form' && savedFormId === 0 && buttonText === 'Save') {
            setSavedFormId(data.id)
            setButtonText('Update')
            // TODO : keep current route but replace form type and id
            navigate(`/form/${page}/edit/${data.id}/${rightBarUrl}`, { replace: true })
          }
          setLay(layouts)
          setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
          data?.workFlows && setworkFlows(data.workFlows)
          data?.formSettings?.integrations && setIntegration(data.formSettings.integrations)
          data?.formSettings?.mailTem && setMailTem(data.formSettings.mailTem)
          data?.formSettings?.confirmation && setConfirmations(data.formSettings.confirmation)
          data?.additional && setAdditional(data.additional)
          data?.Labels && setFieldLabels(data.Labels)
          data?.reports && setReports(data?.reports || [])
          if (!reportId?.id && data?.form_content?.report_id) {
            setReportId(
              {
                id: data?.form_content?.report_id,
                isDefault: data?.form_content?.is_default || 0,
              },
            )
          }

          if (!isStyleNotLoaded) {
            setAllThemeColors(allThemeColors)
            setAllThemeVars(allThemeVars)
            setAllStyles(allStyles)
            removeUnuseStylesAndUpdateState()
          }

          setAllForms(allforms => formsReducer(allforms, {
            type: action === 'bitforms_create_new_form' ? 'add' : 'update',
            data: {
              formID: data.id,
              status: data.status !== '0',
              formName: data.form_name,
              shortcode: `bitform id='${data.id}'`,
              entries: data.entries,
              views: data.views,
              conversion: data.entries === 0 ? 0.00 : ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3),
              created_at: data.created_at,
            },
          }))
          resetUpdateBtn()
          setDeletedFldKey([])
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
      .catch(err => {
        console.error('form save error=', err)
      })

    toast.promise(formSavePromise, {
      loading: __('Updating...', 'biform'),
      success: (res) => res?.data?.message || res?.data,
      error: __('Error occurred, Please try again.'),
    })
  }

  return (
    <button id="update-btn" className={`${css(navbar.btn)} tooltip ${!updateBtn.unsaved ? css(navbar.visDisable) : ''}`} type="button" onClick={() => saveOrUpdateForm('update-btn')} disabled={updateBtn.disabled} style={{ '--tooltip-txt': `'${__('ctrl + s')}'` }}>
      {buttonText}
      {updateBtn.loading && <LoaderSm size={20} clr="white" className="ml-1" />}
    </button>
  )
}
