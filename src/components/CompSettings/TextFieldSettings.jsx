/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import produce from 'immer'
import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn, $styles } from '../../GlobalStates'
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
import { getNumFromStr, getStrFromStr, unitConverter } from '../style-new/styleHelpers'
import Modal from '../Utilities/Modal'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import TableCheckBox from '../Utilities/TableCheckBox'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import UniqField from './CompSettingsUtils/UniqField'
import EditOptions from './EditOptions/EditOptions'
import Icons from './Icons'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from './StyleCustomize/ChildComp/SizeControl'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function TextFieldSettings() {
  console.log('%c $render TextFieldSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const bits = useRecoilValue($bits)
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const isRequired = fieldData.valid.req || false
  const isAutoComplete = fieldData.ac === 'on'
  const adminLabel = fieldData.adminLbl || ''
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
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const setBuilderHookState = useSetRecoilState($builderHookStates)

  const [styles, setStyles] = useRecoilState($styles)

  const subTleIcn = `.${fldKey}-sub-titl-icn`
  const hlpTxtIcn = `.${fldKey}-hlp-txt-icn`

  const { width: subTleWidth, height: subTleHeight } = styles.fields[fldKey].classes[subTleIcn] || ''
  const { width: hlpIcnWidth, height: hlpIcnHeight } = styles.fields[fldKey].classes[hlpTxtIcn] || ''

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
    } else {
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
    } else fieldData.subtitle = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Sub Title updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_subtitle', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideSubTitle = ({ target: { checked } }) => {
    if (checked) fieldData.subtitle = 'Sub Title'
    else delete fieldData.subtitle

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
    if (checked) fieldData.helperTxt = 'Helper Text'
    else delete fieldData.helperTxt

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
    } else {
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
    const val = value.split(',').join(' ')
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
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
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
          toggleChecked={fieldData?.adminLbl !== undefined}
          open={fieldData?.adminLbl !== undefined}
          disable={!fieldData?.adminLbl}
        >
          <div className={css(FieldStyle.placeholder)}>
            <input
              aria-label="Admin label for this Field"
              placeholder="Type Admin label here..."
              className={css(FieldStyle.input)}
              value={adminLabel}
              type="text"
              onChange={setAdminLabel}
            // onKeyDown={setAdminLabel}
            // onKeyPress={e => console.log(e.target.value)}
            />
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Sub Title', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideSubTitle}
          toggleChecked={fieldData?.subtitle !== undefined}
          open={fieldData?.subtitle !== undefined}
          disable={!fieldData?.subtitle}
        >
          <div className={css(FieldStyle.placeholder)}>
            <textarea
              cols="30"
              rows="2"
              aria-label="Sub title for this Field"
              placeholder="Type sub title here..."
              className={css(FieldStyle.input)}
              value={subtitle}
              type="text"
              onChange={setSubTitle}
            />
          </div>

          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.subTleIcn && (
                <img src={fieldData?.subTleIcn} alt="start icon" width="18" height="18" />
              )}

              <button type="button" onClick={() => setIconModel('subTleIcn')} className={css(ut.icnBtn)}>
                <EditIcn size={22} />
              </button>
              {fieldData.subTleIcn && (
                <button onClick={() => removeIcon('subTleIcn')} className={css(ut.icnBtn)} type="button">
                  <CloseIcn size="13" />
                </button>
              )}

            </div>
          </div>
          {fieldData?.subTleIcn && (
            <>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>Width</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnWidthHandle(val, subTleIcn, subTleWidth)}
                    sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, subTleIcn, subTleWidth)}
                    value={getNumFromStr(subTleWidth) || 10}
                    unit={getStrFromStr(subTleWidth) || 'px'}
                    width="110px"
                    options={['px', '%']}
                  />
                </div>
              </div>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>Height</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnHeightHandle(val, subTleIcn, subTleHeight)}
                    sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, subTleIcn, subTleHeight)}
                    value={getNumFromStr(subTleHeight) || 10}
                    unit={getStrFromStr(subTleHeight) || 'px'}
                    width="110px"
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
          toggleChecked={fieldData?.helperTxt !== undefined}
          open={fieldData?.helperTxt !== undefined}
          disable={!fieldData?.helperTxt}
        >
          <div className={css(FieldStyle.placeholder)}>
            <textarea
              cols="30"
              rows="2"
              aria-label="Helper text for this Field"
              placeholder="Type Helper text here..."
              className={css(FieldStyle.input)}
              value={helperTxt}
              type="text"
              onChange={setHelperTxt}
            />
          </div>
          <div className={css(ut.mt2, { mx: 10 })}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Icon</span>
              <div className={css(ut.flxcb)}>
                {fieldData?.hlpTxtIcn && (
                  <img src={fieldData?.hlpTxtIcn} alt="Icon" width="18" height="18" />
                )}

                <button type="button" onClick={() => setIconModel('hlpTxtIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
                {fieldData?.hlpTxtIcn && (
                  <button onClick={() => removeIcon('hlpTxtIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                )}

              </div>
            </div>
          </div>

          {fieldData?.hlpTxtIcn && (
            <>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>Width</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnWidthHandle(val, hlpTxtIcn, hlpIcnWidth)}
                    sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, hlpTxtIcn, hlpIcnWidth)}
                    value={getNumFromStr(hlpIcnWidth) || 10}
                    unit={getStrFromStr(hlpIcnWidth) || 'px'}
                    width="110px"
                    options={['px', '%']}
                  />
                </div>
              </div>
              <div className={css(ut.flxcb, ut.m10)}>
                <span className={css(ut.fw500)}>Height</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={val => icnHeightHandle(val, hlpTxtIcn, hlpIcnHeight)}
                    sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, hlpTxtIcn, hlpIcnHeight)}
                    value={getNumFromStr(hlpIcnHeight) || 10}
                    unit={getStrFromStr(hlpIcnHeight) || 'px'}
                    width="110px"
                    options={['px', '%']}
                  />
                </div>
              </div>
            </>
          )}

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
                  <img src={fieldData?.prefixIcn} alt="start icon" width="18" height="18" />
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
                    <img src={fieldData?.suffixIcn} alt="end icon" width="18" height="18" />
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
          toggleChecked={fieldData?.ph !== undefined}
          open={fieldData?.ph !== undefined}
          disable={!fieldData?.ph}
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
              width="100%"
              defaultValue={autoComplete}
              className={`${css(FieldStyle.input)}`}
              placeholder="Select one"
              options={autofillList}
              onChange={val => seAutoComplete(val)}
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
        {fieldData.typ === 'text' && (
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
        )}

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
                    <div className={css(ut.flxc)}>
                      <h4 className={css(ut.m0, FieldStyle.title)}>{__('Expression:', 'bitform')}</h4>
                      {!bits.isPro && <span className={css(ut.proBadge, ut.ml2)}>{__('Pro', 'bitform')}</span>}
                    </div>
                    <input
                      className={css(FieldStyle.input)}
                      aria-label="Pattern for input field"
                      type="text"
                      placeholder="e.g. ([A-Z])\w+"
                      list="patterns"
                      disabled={!bits.isPro}
                      value={generateBackslashPattern(regexr)}
                      onChange={setRegexr}
                    />
                    <datalist id="patterns">
                      {predefinedPatterns.map((opt, i) => <option key={`${i * 2}`} value={generateBackslashPattern(opt.val)}>{opt.lbl}</option>)}
                    </datalist>
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
                isUnique="isEntryUnique"
                title="Validate as Entry Unique"
                tipTitle="Enabling this option will check from the entry database whether its value is duplicate."
                className={css(FieldStyle.fieldSection)}
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
                <UniqField
                  className={css(FieldStyle.fieldSection)}
                  type="userUnique"
                  isUnique="isUserUnique"
                  title="Validate as User Unique"
                  tipTitle="Enabling this option will check from the user database whether its value is duplicate."
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
