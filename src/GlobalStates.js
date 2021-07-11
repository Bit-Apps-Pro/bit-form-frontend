import { atom, selector, selectorFamily } from 'recoil'
import { __ } from './Utils/i18nwrap'
import { bitDecipher, getFormsByPhpVar, getNewFormId, getNewId, makeFieldsArrByLabel } from './Utils/Helpers'
import { sortLayoutByXY } from './Utils/FormBuilderHelper'
import bitsFetch from './Utils/bitsFetch'
import produce from 'immer'

// atoms
// eslint-disable-next-line no-undef
export const $bits = atom({ key: '$bits', default: typeof bits !== 'undefined' ? bits : {} })
export const $forms = atom({ key: '$forms', default: getFormsByPhpVar(), dangerouslyAllowMutability: true })
export const $reports = atom({ key: '$reports', default: [], dangerouslyAllowMutability: true })
export const $fields = atom({ key: '$fields', default: [], dangerouslyAllowMutability: true })
export const $layouts = atom({ key: '$layouts', default: { lg: [], md: [], sm: [] }, dangerouslyAllowMutability: true })
export const $fieldLabels = atom({ key: '$fieldLabels', default: [], dangerouslyAllowMutability: true })
export const $selectedFieldId = atom({ key: '$selectedFieldId', default: null })
export const $draggingField = atom({ key: '$draggingField', default: null })
export const $mailTemplates = atom({ key: '$mailTemplates', default: [], dangerouslyAllowMutability: true })
export const $additionalSettings = atom({ key: '$additionalSettings', default: { enabled: { validateFocusLost: true }, settings: {} } })
export const $workflows = atom({ key: '$workflows', default: [], dangerouslyAllowMutability: true })
export const $confirmations = atom({ key: '$confirmations', default: {}, dangerouslyAllowMutability: true })
export const $integrations = atom({ key: '$integrations', default: [], dangerouslyAllowMutability: true })
export const $formName = atom({ key: '$formName', default: 'Untitled Form' })

// selectors
// export const $saveForm = selector({
//   key: '$saveForm',
//   get: ({ get, set }) => {
//     const f = get($fields)
//     const mailTemplates = get($mailTemplates)
//     const additionalSettings = get($additionalSettings)
//     const layouts = get($layouts)
//     const fields = get($fields)
//     const formName = get($formName)
//     const confirmation = get($confirmations)
//     const integrations = get($integrations)
//     const workFlows = get($workflows)
//     const reports = get($reports)
//     return async ({ type, updatedData, formId, newFormId }) => {
//       let mailTem = mailTemplates
//       let additional = additionalSettings
//       switch (type) {
//         case 'email-template':
//           mailTem = updatedData
//           set($mailTemplates, updatedData)
//           break
//         case 'additional':
//           additional = updatedData
//           set($additionalSettings, updatedData)
//           break
//         default:
//           break
//       }
//       // if (!checkSubmitBtn()) {
//       //   modal.show = true
//       //   modal.title = __('Sorry', 'bitform')
//       //   modal.btnTxt = __('Close', 'bitform')
//       //   modal.msg = __('Please add a submit button', 'bitform')
//       //   setModal({ ...modal })
//       //   return
//       // }
//       // if (lay.md.length === 0 || typeof lay === 'undefined') {
//       //   modal.show = true
//       //   modal.title = __('Sorry', 'bitform')
//       //   modal.btnTxt = __('Close', 'bitform')
//       //   modal.msg = __('You can not save a blank form', 'bitform')
//       //   setModal({ ...modal })
//       //   return
//       // }

//       const sortLayoutByLG = layouts
//       sortLayoutByLG.lg = sortLayoutByXY(layouts.lg)

//       let formStyle = sessionStorage.getItem('btcd-fs')
//       formStyle &&= bitDecipher(formStyle)

//       const formData = {
//         ...(formId && { id: formId }),
//         ...(!formId && { form_id: newFormId }),
//         layout: sortLayoutByLG,
//         fields,
//         form_name: formName,
//         formSettings: {
//           formName,
//           theme: 'default',
//           confirmation,
//           mailTem,
//           integrations,
//         },
//         additional,
//         workFlows,
//         ...(formId && { reports }),
//         formStyle,
//         layoutChanged: sessionStorage.getItem('btcd-lc'),
//         rowHeight: sessionStorage.getItem('btcd-rh'),
//       }
//       const action = formId ? 'bitforms_update_form' : 'bitforms_create_new_form'

//       const fetchProm = bitsFetch(formData, action)
//         .then(response => {
//           if (response?.success) {
//             let { data } = response
//             if (typeof data !== 'object') { data = JSON.parse(data) }
//             if (action === 'bitforms_create_new_form' && formId === 0) {
//               // setformId(data.id)
//               // setButtonText('Update')
//               // history.replace(`/form/builder/edit/${data.id}/fs`)
//             }
//             data?.workFlows && set(data.workFlows)
//             data?.formSettings?.integrations && setIntegration(data.formSettings.integrations)
//             data?.formSettings?.mailTem && setMailTem(data.formSettings.mailTem)
//             data?.formSettings?.confirmation && setConfirmations(data.formSettings.confirmation)
//             data?.additional && setAdditional(data.additional)
//             data?.Labels && setFieldLabels(data.Labels)
//             data?.reports && setReports(reprts => reportsReducer(reprts, { type: 'set', reports: data?.reports || [] }))
//             setAllForms(allforms => formsReducer(allforms, {
//               type: action === 'bitforms_create_new_form' ? 'add' : 'update',
//               data: { formID: data.id, status: data.status !== '0', formName: data.form_name, shortcode: `bitform id='${data.id}'`, entries: data.entries, views: data.views, conversion: data.entries === 0 ? 0.00 : ((data.entries / (data.views === '0' ? 1 : data.views)) * 100).toPrecision(3), created_at: data.created_at },
//             }))
//             // setbuttonDisabled(false)
//             sessionStorage.removeItem('btcd-lc')
//             sessionStorage.removeItem('btcd-fs')
//             sessionStorage.removeItem('btcd-rh')
//           } else if (!response?.success && response?.data === 'Token expired') {
//             sessionStorage.setItem('bitformData', bitCipher(JSON.stringify(formData)))
//             window.location.reload()
//           } else if (!response?.success) {
//             setTimeout(() => { window.location.reload() }, 2000)
//           }
//           return response
//         })

//       toast.promise(fetchProm, {
//         loading: __('Updating...', 'biform'),
//         success: (res) => res?.data?.message || res?.data,
//         error: __('Error occured, Please try again.', 'bitform'),
//       })
//       console.log('save form ', a, f)
//     }
//   },
// })
export const $fieldsArr = selector({ key: '$fieldsArr', get: ({ get }) => makeFieldsArrByLabel(get($fields), get($fieldLabels)), dangerouslyAllowMutability: true })
export const $newFormId = selector({ key: '$newFormId', get: ({ get }) => getNewFormId(get($forms)) })
export const $uniqueFieldId = selector({ key: '$uniqueFieldId', get: ({ get }) => getNewId(get($fields)) })
// export const $test = selector({
//   key: '$test',
//   get: ({ get }) => 'sdf',

// })

export const $reportSelector = selectorFamily({
    key: '$reportSelector',
    get: (reportID) => ({get}) => get($reports)[reportID],
    set: (reportID) => ({set}, newReport) => set($reports, oldReports => produce(oldReports,  draft => {
        console.log('inGL', newReport);
        draft[reportID] = newReport
    }))
})