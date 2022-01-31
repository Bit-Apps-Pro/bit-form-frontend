/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import produce from 'immer'
import { memo, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import autofillList from '../../Utils/StaticData/autofillList'
import predefinedPatterns from '../../Utils/StaticData/patterns.json'
import { addDefaultStyleClasses, getNumFromStr, getStrFromStr, unitConverter } from '../style-new/styleHelpers'
import Downmenu from '../Utilities/Downmenu'
import Modal from '../Utilities/Modal'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import TableCheckBox from '../Utilities/TableCheckBox'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import UniqField from './CompSettingsUtils/UniqField'
import EditOptions from './EditOptions/EditOptions'
import Icons from './Icons'
import IconStyleBtn from './IconStyleBtn'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from './StyleCustomize/ChildComp/SizeControl'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function TextFieldSettings() {
  console.log('%c $render TextFieldSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const bits = useRecoilValue($bits)
  const { fieldKey: fldKey } = useParams()

  if (!fldKey) return <>No field exist with this field key</>
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const [styles, setStyles] = useRecoilState($styles)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const isRequired = fieldData.valid.req || false
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const patternTippy = useRef()
  const isAutoComplete = fieldData.ac === 'on'
  const adminLabel = fieldData.adminLbl || ''
  // const adminLblHide = fieldData.adminLblHide || true
  // const subtitleHide = fieldData.subtitleHide || true
  // const hlpTxtHide = fieldData.hlpTxtHide || true
  const subtitle = fieldData.subtitle || ''
  const helperTxt = fieldData.helperTxt || ''
  const imputMode = fieldData.inputMode || 'text'
  const placeholder = fieldData.ph || ''
  const defaultValue = fieldData.defaultValue || ''
  const suggestions = fieldData.suggestions || []
  const autoComplete = fieldData?.autoComplete ? fieldData.autoComplete.trim().split(' ') : ['Off']
  const fieldName = fieldData.fieldName || fldKey
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const regexr = fieldData.valid.regexr || ''
  const flags = fieldData.valid.flags || ''
  const { css } = useFela()

  const subTlePreIcn = `.${fldKey}-sub-titl-pre-i`
  const subTleSufIcn = `.${fldKey}-sub-titl-suf-i`

  const hlpPreIcnCls = `.${fldKey}-hlp-txt-pre-i`
  const hlpSufIcnCls = `.${fldKey}-hlp-txt-suf-i`

  const { width: subPreIcnWidth, height: subPreIcnHeight } = styles?.fields[fldKey]?.classes[subTlePreIcn] || {}
  const { width: subSufIcnWidth, height: subSufIcnHeight } = styles?.fields[fldKey]?.classes[subTleSufIcn] || {}

  const { width: hlpPreIcnWidth, height: hlpPreIcnHeight } = styles?.fields[fldKey]?.classes[hlpPreIcnCls] || {}
  const { width: hlpSufIcnWidth, height: hlpSufIcnHeight } = styles?.fields[fldKey]?.classes[hlpSufIcnCls] || {}

  const generateBackslashPattern = str => str.replaceAll('$_bf_$', '\\')
  const escapeBackslashPattern = str => str.replaceAll('\\', '$_bf_$')
  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...fieldData.valid }
      tmp.req = true
      fieldData.valid = tmp
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.req) fieldData.err.req = {}
      fieldData.err.req.dflt = '<p>This field is required</p>'
      fieldData.err.req.show = true
    } else {
      delete fieldData.valid.req
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    const req = e.target.checked ? 'on' : 'off'
    addToBuilderHistory(setBuilderHistory, { event: `Field required ${req}: ${adminLabel || fieldData.lbl || fldKey}`, type: `required_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  // 'address, user,

  function setAutoComplete(e) {
    if (e.target.checked) {
      fieldData.ac = 'on'
    } else {
      delete fieldData.ac
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Auto complete ${e.target.checked ? 'on' : 'off'}: ${adminLabel || fieldData.lbl || fldKey}`, type: `autocomplete_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // e.persist()
    // if(!(e.ctrl && e.key.toLowerCase() === 'z' || e.key.toLowerCase() === 'y')) {
    addToBuilderHistory(setBuilderHistory, { event: `Admin label updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_adminlabel', state: { fields: allFields, fldKey } }, setUpdateBtn)
    // }
  }
  const hideAdminLabel = (e) => {
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
      fieldData.adminLblHide = true
    } else {
      fieldData.adminLblHide = false
      delete fieldData.adminLbl
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Admin label ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `adminlabel_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setSubTitle = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.subtitle
      setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    } else {
      fieldData.subtitle = value
    }

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Sub Title updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_subtitle', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideSubTitle = ({ target: { checked } }) => {
    if (checked) {
      fieldData.subtitle = 'Sub Title'
      fieldData.subtitleHide = true
      addDefaultStyleClasses(selectedFieldId, 'subTitl', setStyles)
    } else {
      delete fieldData.subtitle
      fieldData.subtitleHide = false
    }
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    addToBuilderHistory(setBuilderHistory, { event: `Sub Title ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `subtitle_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setHelperTxt = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.helperTxt
      // recalculate builder field height
      setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    } else fieldData.helperTxt = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Helper Text updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_helperTxt', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideHelperTxt = ({ target: { checked } }) => {
    if (checked) {
      fieldData.helperTxt = 'Helper Text'
      fieldData.hlpTxtHide = true
      addDefaultStyleClasses(selectedFieldId, 'hepTxt', setStyles)
    } else {
      fieldData.hlpTxtHide = false
      delete fieldData.helperTxt
    }

    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    addToBuilderHistory(setBuilderHistory, { event: `Helper Text ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `helpetTxt_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hidePlaceholder = (e) => {
    if (e.target.checked) {
      fieldData.ph = 'type here...'
      fieldData.phHide = true
    } else {
      fieldData.phHide = false
      delete fieldData.ph
    }
    const req = e.target.checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Placeholder: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_placeholder`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setPlaceholder(e) {
    if (e.target.value === '') {
      delete fieldData.ph
    } else {
      fieldData.ph = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Placeholder updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_placeholder', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const defaultValueChecked = ({ target: { checked } }) => {
    if (checked) fieldData.defaultValue = 'type here...'
    else delete fieldData.defaultValue

    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Default value ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_defaultValue`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setDefaultValue = ({ target: { value } }) => {
    if (value === '') delete fieldData.defaultValue
    else fieldData.defaultValue = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Default value updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_defaultValue', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setMin(e) {
    if (e.target.value === '') {
      delete fieldData.mn
    } else {
      fieldData.mn = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mn) fieldData.err.mn = {}
      fieldData.err.mn.dflt = `<p>Minimum number is ${e.target.value}<p>`
      fieldData.err.mn.show = true
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Min value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_min', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setMax(e) {
    if (e.target.value === '') {
      delete fieldData.mx
    } else {
      fieldData.mx = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mx) fieldData.err.mx = {}
      fieldData.err.mx.dflt = `<p>Maximum number is ${e.target.value}</p>`
      fieldData.err.mx.show = true
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Max value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_max', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setRegexr = e => {
    if (!bits.isPro) return
    const { value } = e.target
    if (value === '') {
      delete fieldData.valid.regexr
    } else {
      const val = escapeBackslashPattern(value)
      fieldData.valid.regexr = val
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.regexr) fieldData.err.regexr = {}
      const ifPredefined = predefinedPatterns.find(opt => opt.val === val)
      fieldData.err.regexr.dflt = `<p>${ifPredefined ? ifPredefined.msg : 'Pattern not matched'}</p>`
      fieldData.err.regexr.show = true
      if (fieldData.typ === 'password') {
        delete fieldData.valid.validations
      }
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Regex Pattern updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_regexr', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setRegexrValue = value => {
    // eslint-disable-next-line no-underscore-dangle
    patternTippy?.current?._tippy?.hide()
    if (!bits.isPro) return
    if (value === '') {
      delete fieldData.valid.regexr
    } else {
      const val = escapeBackslashPattern(value)
      fieldData.valid.regexr = val
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.regexr) fieldData.err.regexr = {}
      const ifPredefined = predefinedPatterns.find(opt => opt.val === val)
      fieldData.err.regexr.dflt = `<p>${ifPredefined ? ifPredefined.msg : 'Pattern not matched'}</p>`
      fieldData.err.regexr.show = true
      if (fieldData.typ === 'password') {
        delete fieldData.valid.validations
      }
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Regex Pattern updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_regexr', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setFlags = e => {
    if (!bits.isPro) return
    if (e.target.value === '') {
      delete fieldData.valid.flags
    } else {
      fieldData.valid.flags = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Regex Pattern Flag updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_flags', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const generatePasswordPattern = validations => `^${validations.digit || ''}${validations.lower || ''}${validations.upper || ''}${validations.special || ''}.{${validations?.limit?.mn || 0},${validations?.limit?.mx || ''}}$`

  const generatePasswordErrMsg = validations => `<p>Password must consist at least ${Object.keys(validations).map(vld => {
    if (vld === 'digit') {
      return 'one number'
    } if (vld === 'lower') {
      return 'one lowercase character'
    } if (vld === 'upper') {
      return 'one uppercase character'
    } if (vld === 'special') {
      return 'one special character'
    } if (vld === 'limit') {
      return `${validations.limit.mn}${validations.limit.mx ? ` to ${validations.limit.mx}` : ''} characters`
    }
  }).join(', ').replace(/, ([^,]*)$/, ' and $1')}</p>`

  const setPasswordValidation = e => {
    if (!bits.isPro) return
    const { checked, name, value } = e.target
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err.regexr) fieldData.err.regexr = {}
    if (!fieldData.valid.validations) fieldData.valid.validations = {}
    const { validations } = fieldData.valid
    if (checked) {
      if (name === 'limit') {
        validations.limit = {}
        validations.limit.mn = 8
        validations.limit.mx = 32
      } else {
        validations[name] = value
      }
    } else {
      delete validations[name]
    }
    fieldData.valid.validations = validations

    if (Object.keys(validations).length) {
      fieldData.valid.regexr = generatePasswordPattern(validations)
      fieldData.err.regexr.dflt = generatePasswordErrMsg(validations)
      fieldData.err.regexr.show = true
    } else {
      fieldData.err.regexr.dflt = '<p>Pattern not matched</p>'
      delete fieldData.valid.regexr
      delete fieldData.err.regexr.show
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Password validation updated: ${fieldData.lbl || adminLabel || fldKey}`, type: `set_password_validation_${validations}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setPasswordLimit = e => {
    if (!bits.isPro) return
    const { name, value } = e.target
    const { validations } = fieldData.valid
    if (value) {
      fieldData.valid.validations.limit[name] = value
    } else {
      delete fieldData.valid.validations.limit[name]
    }

    fieldData.valid.regexr = generatePasswordPattern(validations)
    fieldData.err.regexr.dflt = generatePasswordErrMsg(validations)

    const limit = name === 'mx' ? 'max' : 'min'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Password ${limit} limit updated to ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_password_${limit}_limit`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  // const handleSuggestion = ({ target: { value } }) => {
  //   if (value !== '') fieldData.autoComplete = value
  //   else delete fieldData.autoComplete

  //   const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
  //   setFields(allFields)
  //   addToBuilderHistory(setBuilderHistory, { event: `Auto Complete updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${value}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  // }
  const seAutoComplete = (value) => {
    let strValue = value
    if (strValue.match(/(off)/gi)?.[0] === 'off' && strValue.split(',').length > 1) {
      strValue = strValue.replaceAll(/(off,)/gi, '')
    }
    const val = strValue.split(',').join(' ')
    if (val === '') delete fieldData.autoComplete
    else fieldData.autoComplete = val

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Auto Complete updated ${val}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${value}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideAutoComplete = ({ target: { checked } }) => {
    if (checked) fieldData.autoComplete = fieldData.lbl || fldKey
    else delete fieldData.autoComplete

    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Auto Complete  ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const handleFieldName = ({ target: { value } }) => {
    if (value !== '') fieldData.fieldName = value
    else fieldData.fieldName = fldKey

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field name updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_field_name', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const handleInputmode = ({ target: { value } }) => {
    if (value !== '') fieldData.inputMode = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field Input mode update ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_input_mode', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setIconModel = (typ) => {
    addDefaultStyleClasses(selectedFieldId, typ, setStyles)
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      setStyles(prvStyle => produce(prvStyle, draft => {
        if (iconType === 'prefixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-left']
        if (iconType === 'suffixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-right']
      }))
    }
  }

  const handleSuggestions = newSuggestions => {
    fieldData.suggestions = newSuggestions
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    setUpdateBtn({ unsaved: true })
  }

  const icnWidthHandle = ({ unit, value }, cls, width) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(width || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].width = `${convertvalue}${unit || 'px'}`
    }))
  }
  const icnHeightHandle = ({ unit, value }, cls, height) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(height || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].height = `${convertvalue}${unit || 'px'}`
    }))
  }

  const inputModeList = ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']
  const style = {
    dotBtn: {
      b: 0,
      brs: 5,
      mr: 15,
      curp: 1,
    },
    button: {
      dy: 'block',
      w: '100%',
      ta: 'left',
      b: 0,
      bd: 'none',
      p: 3,
      curp: 1,
      '&:hover':
      {
        bd: 'var(--white-0-95)',
        cr: 'var(--black-0)',
        brs: 8,
      },
      fs: 11,
    },
  }

  return (
    <>
      <div className="">
        <FieldSettingTitle
          title="Field Settings"
          subtitle={fieldData.typ}
          fieldKey={fldKey}
        />

        <FieldLabelSettings />

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Admin Label', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideAdminLabel}
          toggleChecked={fieldData?.adminLblHide}
          open={fieldData?.adminLblHide}
          disable={!fieldData?.adminLblHide}
        >
          <div className={css(FieldStyle.placeholder)}>
            <AutoResizeInput
              ariaLabel="Admin label for this Field"
              placeholder="Type Admin label here..."
              value={adminLabel}
              changeAction={setAdminLabel}
            />
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Sub Title', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideSubTitle}
          toggleChecked={fieldData?.subtitleHide}
          open={fieldData?.subtitleHide}
          disable={!fieldData?.subtitleHide}
        >
          <div className={css(FieldStyle.placeholder)}>
            <AutoResizeInput
              ariaLabel="Sub title for this Field"
              placeholder="Type sub title here..."
              value={subtitle}
              changeAction={setSubTitle}
            />
          </div>

          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Start Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.subTlePreIcn && (
                <>
                  <img src={fieldData?.subTlePreIcn} alt="start icon" width="18" height="18" />
                  <IconStyleBtn route="sub-titl-pre-i" />
                </>
              )}

              <button type="button" onClick={() => setIconModel('subTlePreIcn')} className={css(ut.icnBtn)}>
                <EditIcn size={22} />
              </button>
              {fieldData.subTlePreIcn && (
                <button onClick={() => removeIcon('subTlePreIcn')} className={css(ut.icnBtn)} type="button">
                  <CloseIcn size="13" />
                </button>
              )}

            </div>
          </div>
          {fieldData?.subTlePreIcn && (
            <>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>Start Icon Width</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnWidthHandle(val, subTlePreIcn, subPreIcnWidth)}
                    sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, subTlePreIcn, subPreIcnWidth)}
                    value={getNumFromStr(subPreIcnWidth) || 10}
                    unit={getStrFromStr(subPreIcnWidth) || 'px'}
                    width="80px"
                    options={['px', '%']}
                  />
                </div>
              </div>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>Start Icon Height</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnHeightHandle(val, subTlePreIcn, subPreIcnHeight)}
                    sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, subTlePreIcn, subPreIcnHeight)}
                    value={getNumFromStr(subPreIcnHeight) || 10}
                    unit={getStrFromStr(subPreIcnHeight) || 'px'}
                    width="80px"
                    options={['px', '%']}
                  />
                </div>
              </div>
            </>
          )}
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>End Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.subTleSufIcn && (
                <>
                  <img src={fieldData?.subTleSufIcn} alt="end icon" width="18" height="18" />
                  <IconStyleBtn route="sub-titl-suf-i" />
                </>
              )}

              <button type="button" onClick={() => setIconModel('subTleSufIcn')} className={css(ut.icnBtn)}>
                <EditIcn size={22} />
              </button>
              {fieldData.subTleSufIcn && (
                <button onClick={() => removeIcon('subTleSufIcn')} className={css(ut.icnBtn)} type="button">
                  <CloseIcn size="13" />
                </button>
              )}

            </div>
          </div>
          {fieldData?.subTleSufIcn && (
            <>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>End Icon Width</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnWidthHandle(val, subTleSufIcn, subSufIcnWidth)}
                    sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, subTleSufIcn, subSufIcnWidth)}
                    value={getNumFromStr(subSufIcnWidth) || 10}
                    unit={getStrFromStr(subSufIcnWidth) || 'px'}
                    width="80px"
                    options={['px', '%']}
                  />
                </div>
              </div>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>End Icon Height</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnHeightHandle(val, subTleSufIcn, subSufIcnHeight)}
                    sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, subTleSufIcn, subSufIcnHeight)}
                    value={getNumFromStr(subSufIcnHeight) || 10}
                    unit={getStrFromStr(subSufIcnHeight) || 'px'}
                    width="80px"
                    options={['px', '%']}
                  />
                </div>
              </div>
            </>
          )}

        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Helper Text', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideHelperTxt}
          toggleChecked={fieldData?.hlpTxtHide}
          open={fieldData?.hlpTxtHide}
          disable={!fieldData?.hlpTxtHide}
        >
          <div className={css(FieldStyle.placeholder)}>
            <AutoResizeInput
              aria-label="Helper text for this Field"
              placeholder="Type Helper text here..."
              value={helperTxt}
              changeAction={setHelperTxt}
            />
          </div>
          <div className={css(ut.mt2, { mx: 10 })}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Start Icon</span>
              <div className={css(ut.flxcb)}>
                {fieldData?.hlpPreIcn && (
                  <>
                    <img src={fieldData?.hlpPreIcn} alt="Hepler text start icon" width="18" height="18" />
                    <IconStyleBtn route="hlp-txt-pre-i" />
                  </>
                )}

                <button type="button" onClick={() => setIconModel('hlpPreIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
                {fieldData?.hlpPreIcn && (
                  <button onClick={() => removeIcon('hlpPreIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                )}

              </div>
            </div>

            {fieldData?.hlpPreIcn && (
              <>
                <div className={css(ut.flxcb, ut.m10)}>
                  <span className={css(ut.fw500)}>Start Icon Width</span>
                  <div className={css(ut.flxc)}>
                    <SizeControl
                      inputHandler={val => icnWidthHandle(val, hlpPreIcnCls, hlpPreIcnWidth)}
                      sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, hlpPreIcnCls, hlpPreIcnWidth)}
                      value={getNumFromStr(hlpPreIcnWidth) || 10}
                      unit={getStrFromStr(hlpPreIcnWidth) || 'px'}
                      width="80px"
                      options={['px', '%']}
                    />
                  </div>
                </div>
                <div className={css(ut.flxcb, ut.m10)}>
                  <span className={css(ut.fw500)}>Start Icon Height</span>
                  <div className={css(ut.flxc)}>
                    <SizeControl
                      inputHandler={val => icnHeightHandle(val, hlpPreIcnCls, hlpPreIcnHeight)}
                      sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, hlpPreIcnCls)}
                      value={getNumFromStr(hlpPreIcnHeight) || 10}
                      unit={getStrFromStr(hlpPreIcnHeight) || 'px'}
                      width="80px"
                      options={['px', '%']}
                    />
                  </div>
                </div>
              </>
            )}

            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>End Icon</span>
              <div className={css(ut.flxcb)}>
                {fieldData?.hlpSufIcn && (
                  <>
                    <img src={fieldData?.hlpSufIcn} alt="Hepler text end icon" width="18" height="18" />
                    <IconStyleBtn route="hlp-txt-suf-i" />
                  </>
                )}

                <button type="button" onClick={() => setIconModel('hlpSufIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
                {fieldData?.hlpSufIcn && (
                  <button onClick={() => removeIcon('hlpSufIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                )}

              </div>
            </div>

            {fieldData?.hlpSufIcn && (
              <>
                <div className={css(ut.flxcb, ut.m10)}>
                  <span className={css(ut.fw500)}>Start Icon Width</span>
                  <div className={css(ut.flxc)}>
                    <SizeControl
                      inputHandler={val => icnWidthHandle(val, hlpSufIcnCls, hlpPreIcnWidth)}
                      sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, hlpSufIcnCls, hlpSufIcnWidth)}
                      value={getNumFromStr(hlpSufIcnWidth) || 10}
                      unit={getStrFromStr(hlpSufIcnWidth) || 'px'}
                      width="80px"
                      options={['px', '%']}
                    />
                  </div>
                </div>
                <div className={css(ut.flxcb, ut.m10)}>
                  <span className={css(ut.fw500)}>Start Icon Height</span>
                  <div className={css(ut.flxc)}>
                    <SizeControl
                      inputHandler={val => icnHeightHandle(val, hlpSufIcnCls, hlpSufIcnHeight)}
                      sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, hlpSufIcnCls, hlpSufIcnHeight)}
                      value={getNumFromStr(hlpSufIcnHeight) || 10}
                      unit={getStrFromStr(hlpSufIcnHeight) || 'px'}
                      width="80px"
                      options={['px', '%']}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Input Icons', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          toggleAction={hideAdminLabel}
          toggleChecked
          open
        // disable={!fieldData?.adminLbl}
        >
          <div className={css(ut.mt2, { mx: 10 })}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Start icon</span>
              <div className={css(ut.flxcb)}>
                {fieldData?.prefixIcn && (
                  <>
                    <img src={fieldData?.prefixIcn} alt="start icon" width="18" height="18" />
                    <IconStyleBtn route="pre-i" />
                  </>

                )}

                <button type="button" onClick={() => setIconModel('prefixIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
                {fieldData?.prefixIcn && (
                  <button onClick={() => removeIcon('prefixIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                )}

              </div>
            </div>

            <div className={css(ut.mt2)}>
              <div className={css(ut.flxcb)}>
                <span className={css(ut.fw500)}>End icon</span>
                <div className={css(ut.flxcb)}>
                  {fieldData?.suffixIcn && (
                    <>
                      <img src={fieldData?.suffixIcn} alt="end icon" width="18" height="18" />
                      <IconStyleBtn route="suf-i" />
                    </>
                  )}
                  <button onClick={() => setIconModel('suffixIcn')} className={css(ut.icnBtn)} type="button">
                    <EditIcn size={22} />
                  </button>
                  {fieldData?.suffixIcn && (
                    <button onClick={() => removeIcon('suffixIcn')} className={css(ut.icnBtn)} type="button">
                      <CloseIcn size="13" />
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>

        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Placeholder', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hidePlaceholder}
          toggleChecked={fieldData?.phHide}
          open={fieldData?.phHide}
          disable={!fieldData?.phHide}
        >
          <div className={css(FieldStyle.placeholder)}>
            <input
              aria-label="Placeholer for this Field"
              placeholder="Type Placeholder here..."
              className={css(FieldStyle.input)}
              type="text"
              value={placeholder}
              onChange={setPlaceholder}
            />
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Default value', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={defaultValueChecked}
          toggleChecked={fieldData?.defaultValue !== undefined}
          open={fieldData?.defaultValue !== undefined}
          disable={!fieldData?.defaultValue}
        >
          <div className={css(FieldStyle.placeholder)}>
            <input
              aria-label="Default value for this Field"
              placeholder="Type default value here..."
              className={css(FieldStyle.input)}
              type="text"
              value={defaultValue}
              onChange={setDefaultValue}
            />
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Suggestion', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          // toggleAction={() => (e)}
          toggleChecked
          open
          disable={false}
        >
          <div className={css(FieldStyle.placeholder)}>
            <button onClick={openOptionModal} className={css(app.btn)} type="button">
              &nbsp;
              {__('Edit suggestions', 'bitform')}
            </button>
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Auto Complete', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideAutoComplete}
          toggleChecked={fieldData?.autoComplete !== undefined}
          open={fieldData?.autoComplete !== undefined}
          disable={!fieldData.autoComplete}
        >
          <div className={css(FieldStyle.placeholder)}>
            <MultiSelect
              defaultValue={autoComplete}
              className={`${css(FieldStyle.multiselectInput)}`}
              placeholder="Select one"
              options={autofillList}
              onChange={val => seAutoComplete(val)}
              disableChip
            />
            {/* <select
              className={css(FieldStyle.input)}
              name="suggestion" value={autoComplete}
              onChange={handleSuggestion}
            >
              {autofillList.map((item) => {
                if (item.type === 'group_start') {
                  return <optgroup label={item.label} />
                }
                return <option value={item.value}>{item.label}</option>
              })}
            </select> */}
          </div>

        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Name', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <input
              aria-label="Name for this Field"
              placeholder="Type field name here..."
              className={css(FieldStyle.input)}
              value={fieldName}
              onChange={handleFieldName}
            />
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />
        {
          fieldData.typ === 'text' && (
            <>
              <SimpleAccordion
                title={__('Input mode', 'bitform')}
                className={css(FieldStyle.fieldSection)}
                open
              >
                <div className={css(FieldStyle.placeholder)}>
                  <select
                    className={css(FieldStyle.input)}
                    aria-label="Input mode for this Field"
                    placeholder="Type field inpur mode here..."
                    value={imputMode}
                    onChange={handleInputmode}
                  >
                    {inputModeList.map(itm => <option key={`input-itm${Math.random() * 222 + 89}`} value={itm}>{itm}</option>)}
                  </select>
                </div>
              </SimpleAccordion>
              <hr className={css(FieldStyle.divider)} />
            </>
          )
        }

        <SimpleAccordion
          title={__('Required', 'bitform')}
          // eslint-disable-next-line react/jsx-no-bind
          toggleAction={setRequired}
          toggleChecked={isRequired}
          className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
          switching
          tip="By enabling this feature, user will see the error message when input is empty"
          tipProps={{ width: 200, icnSize: 17 }}
          open={isRequired}
          disable={!isRequired}
        >
          <ErrorMessageSettings
            type="req"
            title="Error Message"
            tipTitle="By enabling this feature, user will see the error message when input is empty"
          />
        </SimpleAccordion>
        {/* <SingleToggle title={__('Required', 'bitform')} action={setRequired} isChecked={isRequired} className={css(FieldStyle.fieldSection)} /> */}
        <hr className={css(FieldStyle.divider)} />
        {
          fieldData.typ.match(/^(text|url|textarea|password|number|email|username|)$/) && (
            <>
              <SimpleAccordion
                title={__('Pattern', 'bitform')}
                className={css(FieldStyle.fieldSection)}
                open
              >
                <>
                  <div className={css(ut.mr2, ut.mt3)}>
                    <div className={css(ut.flxcb, ut.ml1)}>
                      <h4 className={css(ut.m0, FieldStyle.title)}>
                        {__('Expression', 'bitform')}
                        :
                      </h4>
                      {!bits.isPro && <span className={css(ut.proBadge, ut.ml2)}>{__('Pro', 'bitform')}</span>}
                      <Downmenu instance={patternTippy}>
                        <button
                          data-close
                          type="button"
                          className={css(style.dotBtn)}
                          unselectable="on"
                          draggable="false"
                          style={{ cursor: 'pointer' }}
                          title={__('Fields', 'bitform')}
                        >
                          <BdrDottedIcn size="19" />
                        </button>
                        <div>
                          <ul role="menu">
                            {predefinedPatterns?.map(opt => (
                              <li role="menuitem" className={`${css(style.button)} btnHover`} onKeyPress={() => setRegexrValue(opt.val)} onClick={() => setRegexrValue(opt.val)}>
                                <span>{opt.lbl}</span>
                                <br />
                                <small>{generateBackslashPattern(opt.val)}</small>
                              </li>
                            ))}
                          </ul>
                          {/* {predefinedPatterns.map((opt, i) => <option key={`${i * 2}`} value={generateBackslashPattern(opt.val)}>{opt.lbl}</option>)} */}
                        </div>
                      </Downmenu>
                    </div>
                    <AutoResizeInput
                      ariaLabel="Pattern for input field"
                      placeholder="e.g. ([A-Z])\w+"
                      list="patterns"
                      disabled={!bits.isPro}
                      value={generateBackslashPattern(regexr)}
                      changeAction={setRegexr}
                    />
                  </div>
                  <SingleInput inpType="text" title={__('Flags:', 'bitform')} value={flags} action={setFlags} placeholder="e.g. g" cls={css(FieldStyle.input)} disabled={!bits.isPro} />
                  {regexr && (
                    <ErrorMessageSettings
                      type="regexr"
                      title="Error Message"
                      tipTitle="By enabling this feature, user will see the error message when input value does not match the pattern"
                    />
                  )}
                </>
              </SimpleAccordion>
              <hr className={css(FieldStyle.divider)} />
            </>
          )
        }

        <FieldHideSettings cls={css(FieldStyle.fieldSection, FieldStyle.singleOption)} />
        <hr className={css(FieldStyle.divider)} />
        <FieldReadOnlySettings cls={css(FieldStyle.fieldSection, FieldStyle.singleOption)} />

        <hr className={css(FieldStyle.divider)} />

        {
          fieldData.typ.match(/^(text|url|password|number|email|)$/) && (
            <>
              <div className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}>
                <SingleToggle title={__('Auto Fill:', 'bitform')} action={setAutoComplete} isChecked={isAutoComplete} />
              </div>
              <hr className={css(FieldStyle.divider)} />
            </>
          )
        }

        {
          fieldData.typ.match(/^(text|url|textarea|password|number|email|color|date|username|)$/) && (
            <>
              <UniqField
                type="entryUnique"
                title="Validate as Entry Unique"
                tipTitle="Enabling this option will check from the entry database whether its value is duplicate."
                className={css(FieldStyle.fieldSection)}
                isUnique="show"
              />
              <hr className={css(FieldStyle.divider)} />
            </>
          )
        }

        {
          fieldData.typ === 'number' && (
            <>
              <SimpleAccordion title="Number:" className={css(FieldStyle.fieldSection)} open>
                {/* <input aria-label="Maximum number for this field" className={css(FieldStyle.input)} type="text" value={placeholder} onChange={setPlaceholder} /> */}
                <div className={css(FieldStyle.fieldNumber)}>
                  <span>{__('Min:', 'bitform')}</span>
                  <input aria-label="Minimum number for this field" placeholder="Type minimum number here..." className={css(FieldStyle.inputNumber)} type="number" value={min} onChange={setMin} />
                </div>
                {/* <SingleInput inpType="number" title={__('Min:', 'bitform')} value={min} action={setMin} cls={css(FieldStyle.input)} /> */}
                {fieldData.mn && (
                  <ErrorMessageSettings
                    type="mn"
                    title="Min Error Message"
                    tipTitle={`By enabling this feature, user will see the error message when input number is less than ${fieldData.mn}`}
                  />
                )}
                <div className={css(FieldStyle.fieldNumber)}>
                  <span>{__('Max:', 'bitform')}</span>
                  <input aria-label="Maximum number for this field" placeholder="Type maximun number here..." className={css(FieldStyle.inputNumber)} type="number" value={max} onChange={setMax} />
                </div>
                {/* <SingleInput inpType="number" title={__('Max:', 'bitform')} value={max} action={setMax} cls={css(FieldStyle.input)} /> */}
                {fieldData.mx && (
                  <ErrorMessageSettings
                    type="mx"
                    title="Max Error Message"
                    tipTitle={`By enabling this feature, user will see the error message when input number is greater than ${fieldData.mx}`}
                  />
                )}
              </SimpleAccordion>
              <hr className={css(FieldStyle.divider)} />
            </>
          )
        }
        {/* {
        fieldData.typ.match(/^(url|number|email|)$/) && (
          <ErrorMessageSettings
            type="invalid"
            title="Invalid Error Message"
            tipTitle={`By enabling this feature, user will see the error message when input value is not any ${fieldData.typ}`}
          />
        )
      } */}
        {
          fieldData.typ === 'password' && (
            <>
              <SimpleAccordion
                title={__('Validations', 'bitform')}
                className={css(FieldStyle.fieldSection)}
                open
                isPro
              >
                <div className={css(ut.mt1, ut.flxClm)}>
                  <TableCheckBox className={css(ut.w10)} cls={css(ut.mr2)} name="digit" checked={fieldData.valid?.validations?.digit || false} value="(?=.*[0-9])" title={__('At least one digit (0-9)', 'bitform')} onChange={setPasswordValidation} disabled={!bits.isPro} />
                  <TableCheckBox className={css(ut.w10, ut.mt2)} cls={css(ut.mr2)} name="lower" checked={fieldData.valid?.validations?.lower || false} value="(?=.*[a-z])" title={__('At least one lowercase character (a-z)', 'bitform')} onChange={setPasswordValidation} disabled={!bits.isPro} />
                  <TableCheckBox className={css(ut.w10, ut.mt2)} cls={css(ut.mr2)} name="upper" checked={fieldData.valid?.validations?.upper || false} value="(?=.*[A-Z])" title={__('At least one uppercase character (A-Z)', 'bitform')} onChange={setPasswordValidation} disabled={!bits.isPro} />
                  <TableCheckBox
                    className={css(ut.w10, ut.mt2)}
                    cls={css(ut.mr2)}
                    name="special"
                    checked={fieldData.valid?.validations?.special || false}
                    value="(?=.*[~!@#$%^&*(){}[$_bf_$]<>+$_bf_$-_=$_bf_$$_bf_$/|;:,.])"
                    title={__('At least one special character (~!@#$%^&*(){}[]<>+-_=/\\|;:,.)', 'bitform')}
                    onChange={setPasswordValidation}
                    disabled={!bits.isPro}
                  />
                  <TableCheckBox className={css(ut.w10, ut.mt2)} cls={css(ut.mr2)} name="limit" checked={fieldData.valid?.validations?.limit || false} value=".{8,32}" title={__('Limit Password Length', 'bitform')} onChange={setPasswordValidation} disabled={!bits.isPro} />
                  {fieldData.valid?.validations?.limit && (
                    <div>
                      <div className={css(FieldStyle.fieldNumber)}>
                        <span>{__('Min:', 'bitform')}</span>
                        <input name="mn" aria-label="Minimum number for this field" placeholder="Type minimum number here..." className={css(FieldStyle.inputNumber)} type="number" value={fieldData.valid?.validations?.limit?.mn} onChange={setPasswordLimit} />
                      </div>
                      <div className={css(FieldStyle.fieldNumber)}>
                        <span>{__('Max:', 'bitform')}</span>
                        <input name="mx" aria-label="Maximum number for this field" placeholder="Type maximum number here..." className={css(FieldStyle.inputNumber)} type="number" value={fieldData.valid?.validations?.limit?.mx} onChange={setPasswordLimit} />
                      </div>
                      {/* <SingleInput inpType="number" name="mn" title={__('Min:', 'bitform')} value={fieldData.valid?.validations?.limit?.mn} action={setPasswordLimit} width={100} className="mr-4" /> */}
                      {/* <SingleInput inpType="number" name="mx" title={__('Max:', 'bitform')} value={fieldData.valid?.validations?.limit?.mx} action={setPasswordLimit} width={100} /> */}
                    </div>
                  )}
                </div>
              </SimpleAccordion>
              <hr className={css(FieldStyle.divider)} />
            </>
          )
        }
        <div className="pos-rel">
          {
            fieldData.typ.match(/^(email|username)$/) && (
              <>
                <ErrorMessageSettings
                  className={css(FieldStyle.fieldSection)}
                  type="userUnique"
                  isUnique="isUserUnique"
                  title="Validate as User Unique"
                  tipTitle="Enabling this option will check from the user database whether its value is duplicate."
                  defaultMsg="The value is already taken. Try another."
                />
                <hr className={css(FieldStyle.divider)} />
              </>
            )
          }
        </div>
      </div>

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Suggestion', 'bitform')}
      >
        <div className="pos-rel">
          {/* {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium', 'bitform')}
                  </span>
                </a>
              </div>
            </div>
          )} */}

          <EditOptions
            optionMdl={optionMdl}
            options={suggestions}
            setOptions={newSuggestions => handleSuggestions(newSuggestions)}
            lblKey="lbl"
            valKey="val"
            checkByDefault={false}
          />
        </div>
      </Modal>

      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons', 'bitform')}
      >
        <div className="pos-rel" />

        <Icons iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </>
  )
}

export default memo(TextFieldSettings)
