import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { $additionalSettings, $confirmations, $fieldLabels, $fields, $formName, $forms, $integrations, $layouts, $mailTemplates, $newFormId, $reports, $updateBtn, $workflows } from '../GlobalStates'
import navbar from '../styles/navbar.style'
import bitsFetch from '../Utils/bitsFetch'
import { sortLayoutByXY } from '../Utils/FormBuilderHelper'
import { select } from '../Utils/globalHelpers'
import { bitCipher, bitDecipher } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import { formsReducer, reportsReducer } from '../Utils/Reducers'
import LoaderSm from './Loaders/LoaderSm'

export default function UpdateButton({ componentMounted, modal, setModal }) {
  const history = useHistory()
  const { formType, formID } = useParams()
  const { css } = useFela()
  const [buttonText, setButtonText] = useState(formType === 'edit' ? 'Update' : 'Save')
  const [savedFormId, setSavedFormId] = useState(formType === 'edit' ? formID : 0)
  const lay = useRecoilValue($layouts)
  const fields = useRecoilValue($fields)
  const formName = useRecoilValue($formName)
  const newFormId = useRecoilValue($newFormId)
  const setAllForms = useSetRecoilState($forms)
  const setFieldLabels = useSetRecoilState($fieldLabels)
  const resetUpdateBtn = useResetRecoilState($updateBtn)
  const [reports, setReports] = useRecoilState($reports)
  const [mailTem, setMailTem] = useRecoilState($mailTemplates)
  const [updateBtn, setUpdateBtn] = useRecoilState($updateBtn)
  const [workFlows, setworkFlows] = useRecoilState($workflows)
  const [additional, setAdditional] = useRecoilState($additionalSettings)
  const [integrations, setIntegration] = useRecoilState($integrations)
  const [confirmations, setConfirmations] = useRecoilState($confirmations)

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

  // useEffect(() => {
  //   if (additional?.updateForm) {
  //     const newData = produce(additional, draft => {
  //       // eslint-disable-next-line no-param-reassign
  //       delete draft.updateForm
  //     })
  //     saveForm('additional', newData)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [additional.updateForm])

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
      e.returnValue = ''
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', updateBtnEvent)
    window.addEventListener('beforeunload', closeTabOrBrowserEvent)
    return () => {
      document.removeEventListener('keydown', updateBtnEvent)
      window.removeEventListener('beforeunload', closeTabOrBrowserEvent)
    }
  })

  const saveOrUpdateForm = btnTyp => {
    const saveBtn = select('#secondary-update-btn')
    if (saveBtn) {
      saveBtn.click()
    } else if (btnTyp === 'update-btn') {
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
      mdl.title = __('Sorry', 'bitform')
      mdl.btnTxt = __('Close', 'bitform')
      mdl.msg = __('Please add a submit button', 'bitform')
      setModal(mdl)
      return
    }
    if (lay.md.length === 0 || typeof lay === 'undefined') {
      const mdl = { ...modal }
      mdl.show = true
      mdl.title = __('Sorry', 'bitform')
      mdl.btnTxt = __('Close', 'bitform')
      mdl.msg = __('You can not save a blank form', 'bitform')
      setModal(mdl)
      return
    }

    setUpdateBtn({ disabled: true, loading: true })

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
          resetUpdateBtn()
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
      error: __('Error occurred, Please try again.', 'bitform'),
    })
  }

  return (
    <button id="update-btn" className={`${css(navbar.btn)} tooltip ${!updateBtn.unsaved ? css(navbar.visDisable) : ''}`} type="button" onClick={() => saveOrUpdateForm('update-btn')} disabled={updateBtn.disabled} style={{ '--tooltip-txt': `'${__('ctrl + s', 'bitform')}'` }}>
      {buttonText}
      {updateBtn.loading && <LoaderSm size={20} clr="white" className="ml-1" />}
    </button>
  )
}
