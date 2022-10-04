/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
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
import { $bits, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import autofillList from '../../Utils/StaticData/autofillList'
import predefinedPatterns from '../../Utils/StaticData/patterns.json'
import tippyHelperMsg from '../../Utils/StaticData/tippyHelperMsg'
import { addDefaultStyleClasses, iconElementLabel, isStyleExist, paddingGenerator, setIconFilterValue, styleClasses } from '../style-new/styleHelpers'
import Btn from '../Utilities/Btn'
import Downmenu from '../Utilities/Downmenu'
import Modal from '../Utilities/Modal'
import SingleInput from '../Utilities/SingleInput'
import TableCheckBox from '../Utilities/TableCheckBox'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldNameSettings from './CompSettingsUtils/FieldNameSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import PlaceholderSettings from './CompSettingsUtils/PlaceholderSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import UniqFieldSettings from './CompSettingsUtils/UniqFieldSettings'
import EditOptions from './EditOptions/EditOptions'
import Icons from './Icons'
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SizeAndPosition from './StyleCustomize/StyleComponents/SizeAndPosition'

function TextFieldSettings() {
  const bits = useRecoilValue($bits)
  const { fieldKey: fldKey } = useParams()

  if (!fldKey) return <>No field exist with this field key</>
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const [styles, setStyles] = useRecoilState($styles)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const patternTippy = useRef()
  const adminLabel = fieldData.adminLbl || ''
  const imputMode = fieldData.inputMode || 'text'
  const defaultValue = fieldData.defaultValue || ''
  const suggestions = fieldData.suggestions || []
  const ac = fieldData?.ac ? fieldData.ac.trim().split(',') : ['Off']
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const regexr = fieldData.valid.regexr || ''
  const flags = fieldData.valid.flags || ''
  const { css } = useFela()

  const generateBackslashPattern = str => str.replace(/\$_bf_\$/g, '\\')
  const escapeBackslashPattern = str => str.replace(/\\\\/g, '$_bf_$')

  // function setAutoComplete(e) {
  //   if (e.target.checked) {
  //     fieldData.ac = 'on'
  //   } else {
  //     delete fieldData.ac
  //   }
  //   const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
  //   setFields(allFields)
  //   addToBuilderHistory({ event: `Auto complete ${e.target.checked ? 'on' : 'off'}: ${adminLabel || fieldData.lbl || fldKey}`, type: 'autocomplete_on_off', state: { fields: allFields, fldKey } })
  // }

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
    addToBuilderHistory({ event: `Admin label ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `adminlabel_${req}`, state: { fields: allFields, fldKey } })
  }

  const hideDefalutValue = (e) => {
    if (e.target.checked) {
      fieldData.defaultValue = fieldData.lbl || fldKey
      fieldData.defaultValueHide = true
    } else {
      fieldData.defaultValueHide = false
      delete fieldData.defaultValue
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Default value ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_defaultValue`, state: { fields: allFields, fldKey } })
  }

  const setDefaultValue = ({ target: { value } }) => {
    if (value === '') delete fieldData.defaultValue
    else fieldData.defaultValue = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Default value updated: ${value || fieldData.lbl || adminLabel || fldKey}`, type: 'change_defaultValue', state: { fields: allFields, fldKey } })
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
    addToBuilderHistory({ event: `Min value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_min', state: { fields: allFields, fldKey } })
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
    addToBuilderHistory({ event: `Max value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_max', state: { fields: allFields, fldKey } })
  }

  const setRegexr = e => {
    if (!bits.isPro) return
    const { value } = e.target
    console.log(value)
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
    addToBuilderHistory({ event: `Regex Pattern updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_regexr', state: { fields: allFields, fldKey } })
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
    addToBuilderHistory({ event: `Regex Pattern updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_regexr', state: { fields: allFields, fldKey } })
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
    addToBuilderHistory({ event: `Regex Pattern Flag updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_flags', state: { fields: allFields, fldKey } })
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
    addToBuilderHistory({ event: `Password validation updated: ${fieldData.lbl || adminLabel || fldKey}`, type: `set_password_validation_${validations}`, state: { fields: allFields, fldKey } })
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
    addToBuilderHistory({ event: `Password ${limit} limit updated to ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_password_${limit}_limit`, state: { fields: allFields, fldKey } })
  }
  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  // const handleSuggestion = ({ target: { value } }) => {
  //   if (value !== '') fieldData.ac = value
  //   else delete fieldData.ac

  //   const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
  //   setFields(allFields)
  //   addToBuilderHistory({ event: `Auto Complete updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${value}`, state: { fields: allFields, fldKey } }
  const seAutoComplete = (value) => {
    const splitted = value.split(',')
    let val = ''

    if (splitted.length === 1) val = value
    else {
      const lastIndx = splitted.length - 1
      if (splitted[lastIndx] === 'on') {
        val = 'on'
      } else if (splitted[lastIndx] === 'off') {
        val = 'off'
      } else if (splitted.includes('on')) {
        splitted.splice(splitted.indexOf('on'), 1)
        val = splitted.join(',')
      } else if (splitted.includes('off')) {
        splitted.splice(splitted.indexOf('off'), 1)
        val = splitted.join(',')
      } else {
        val = value
      }
    }

    if (!val) delete fieldData.ac
    else fieldData.ac = val

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Auto Complete updated ${val}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${value}`, state: { fields: allFields, fldKey } })
  }
  const hideAutoComplete = ({ target: { checked } }) => {
    if (checked) fieldData.acHide = true
    else delete fieldData.acHide

    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Auto Complete  ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${req}`, state: { fields: allFields, fldKey } })
  }

  const handleInputmode = ({ target: { value } }) => {
    if (value !== '') fieldData.inputMode = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Field Input mode update to ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_input_mode', state: { fields: allFields, fldKey } })
  }
  const setIconModel = (typ) => {
    if (!isStyleExist(styles, fldKey, styleClasses[typ])) addDefaultStyleClasses(selectedFieldId, typ)
    setIconFilterValue(typ, fldKey)
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      const newStyles = produce(styles, draft => {
        const { padding } = styles.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]
        if (iconType === 'prefixIcn') draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`].padding = paddingGenerator(padding, 'left', false)
        if (iconType === 'suffixIcn') draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`].padding = paddingGenerator(padding, '', false)
      })
      setStyles(newStyles)
      addToBuilderHistory({ event: `${iconElementLabel[iconType]} Icon Deleted`, type: `delete_${iconType}`, state: { fldKey, fields: allFields, styles: newStyles } })
    }
  }

  const handleSuggestions = newSuggestions => {
    fieldData.suggestions = newSuggestions
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    setUpdateBtn({ unsaved: true })
    addToBuilderHistory({ event: `Suggestion Update: ${fieldData.lbl || adminLabel || fldKey}`, type: 'suggestion_update', state: { fields: allFields, fldKey } })
  }

  const hideSuggestionVal = ({ target: { checked } }) => {
    if (checked) {
      fieldData.suggestionHide = true
    } else {
      fieldData.suggestionHide = false
      delete fieldData.suggestions
    }
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Suggestion ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_defaultValue`, state: { fields: allFields, fldKey } })
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

        <FieldSettingsDivider />

        <SubTitleSettings />

        <FieldSettingsDivider />

        <AdminLabelSettings />

        <FieldSettingsDivider />

        <SizeAndPosition />

        <FieldSettingsDivider />

        <SimpleAccordion
          id="inp-icn-stng"
          title={__('Input Icons')}
          className={css(FieldStyle.fieldSection)}
          toggleAction={hideAdminLabel}
          toggleChecked
          open
        // disable={!fieldData?.adminLbl}
        >
          <div className={css(ut.mt2)}>
            <FieldIconSettings
              label="Leading Icon"
              iconSrc={fieldData?.prefixIcn}
              styleRoute="pre-i"
              setIcon={() => setIconModel('prefixIcn')}
              removeIcon={() => removeIcon('prefixIcn')}
            />
            <FieldIconSettings
              label="Trailing Icon"
              iconSrc={fieldData?.suffixIcn}
              styleRoute="suf-i"
              setIcon={() => setIconModel('suffixIcn')}
              removeIcon={() => removeIcon('suffixIcn')}
            />

          </div>
        </SimpleAccordion>

        <FieldSettingsDivider />

        <PlaceholderSettings />

        <FieldSettingsDivider />

        <HelperTxtSettings />

        <FieldSettingsDivider />

        {!(fieldData.typ === 'password') && (
          <>
            <SimpleAccordion
              id="dflt-val-stng"
              title={__('Default value')}
              className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
              switching
              tip={tippyHelperMsg.defaultValue}
              tipProps={{ width: 250, icnSize: 17 }}
              toggleAction={hideDefalutValue}
              toggleChecked={fieldData?.defaultValueHide}
              open={fieldData?.defaultValueHide}
              disable={!fieldData?.defaultValueHide}
            >
              <div className={css(FieldStyle.placeholder)}>
                <input
                  data-testid="dflt-val-stng-inp"
                  aria-label="Default value for this Field"
                  placeholder="Type default value here..."
                  className={css(FieldStyle.input)}
                  type={fieldData.typ === 'textarea' ? 'text' : fieldData.typ}
                  value={defaultValue}
                  onChange={setDefaultValue}
                />
              </div>
            </SimpleAccordion>
            <FieldSettingsDivider />
          </>
        )}

        {!(fieldData.typ === 'password'
          || fieldData.typ === 'date'
          || fieldData.typ === 'time'
          || fieldData.typ === 'datetime-local'
          || fieldData.typ === 'color'
          || fieldData.typ === 'month'
          || fieldData.typ === 'week'
          || fieldData.typ === 'textarea'
        ) && (
            <>
              <SimpleAccordion
                id="sgsn-stng"
                title={__('Suggestion')}
                className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
                switching
                tip={tippyHelperMsg.suggestion}
                tipProps={{ width: 250, icnSize: 17 }}
                toggleAction={hideSuggestionVal}
                toggleChecked={fieldData?.suggestionHide}
                open={fieldData?.suggestionHide}
                disable={!fieldData?.suggestionHide}
              >
                <div className={css(FieldStyle.placeholder, ut.mb1)}>
                  <Btn
                    variant="default-outline"
                    size="sm"
                    className={css({ mt: 10 })}
                    onClick={openOptionModal}
                    dataTestId="sgsn-stng-btn"
                  >
                    {__('Add/Edit Suggestions')}
                    <span className={css(style.plsIcn)}>
                      <CloseIcn size="13" stroke="3" />
                    </span>
                  </Btn>
                </div>
              </SimpleAccordion>

              <FieldSettingsDivider />

              <SimpleAccordion
                id="ato-cmplt"
                title={__('Auto Complete')}
                className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
                switching
                tip={tippyHelperMsg.autoComplete}
                tipProps={{ width: 250, icnSize: 17 }}
                toggleAction={hideAutoComplete}
                toggleChecked={fieldData?.acHide}
                open={fieldData?.acHide}
                disable={!fieldData.acHide}
              >
                <div className={css(FieldStyle.placeholder)}>
                  <MultiSelect
                    data-testid="ato-cmplt-slct"
                    defaultValue={ac}
                    className={`${css(FieldStyle.multiselectInput)} `}
                    placeholder="Select one"
                    options={autofillList}
                    onChange={val => seAutoComplete(val)}
                    disableChip
                  />
                </div>
              </SimpleAccordion>

              <FieldSettingsDivider />
            </>
          )}
        {
          fieldData.typ === 'text' && (
            <>
              <SimpleAccordion
                id="inp-mod-stng"
                title={__('Input mode')}
                className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
                tip={tippyHelperMsg.inputMode}
                tipProps={{ width: 250, icnSize: 17 }}
              >
                <div className={css(FieldStyle.placeholder)}>
                  <select
                    data-testid="inp-mod-stng-slct"
                    className={css(FieldStyle.input)}
                    aria-label="Input mode for this Field"
                    placeholder="Type field inpur mode here..."
                    value={imputMode}
                    onChange={handleInputmode}
                  >
                    {inputModeList.map(itm => <option key={itm} value={itm}>{itm}</option>)}
                  </select>
                </div>
              </SimpleAccordion>
              <FieldSettingsDivider />
            </>
          )
        }

        {
          fieldData.typ.match(/^(text|url|textarea|password|number|email|username|)$/) && (
            <>
              <SimpleAccordion
                id="ptrn-stng"
                title={__('RegEx Pattern')}
                className={css(FieldStyle.fieldSection)}
              >
                <>
                  <div className={css(ut.mr2, ut.mt3, ut.pl1)}>
                    <div className={css(ut.flxcb, ut.ml1)}>
                      <h4 className={css(ut.m0, FieldStyle.title)}>
                        {__('Expression')}
                        :
                      </h4>
                      {!bits.isPro && <span className={css(ut.proBadge, ut.ml2)}>{__('Pro')}</span>}
                      <Downmenu instance={patternTippy}>
                        <button
                          data-testid="ptrn-stng-exprsn-btn"
                          data-close
                          type="button"
                          className={css(style.dotBtn)}
                          unselectable="on"
                          draggable="false"
                          style={{ cursor: 'pointer' }}
                          title={__('Fields')}
                        >
                          <BdrDottedIcn size="19" />
                        </button>
                        <div>
                          <ul role="menu">
                            {predefinedPatterns?.map((opt, i) => (
                              <li
                                data-testid={`ptrn-stng-expn-itm-${i}`}
                                // eslint-disable-next-line react/no-array-index-key
                                key={i}
                                role="menuitem"
                                className={`${css(style.button)} btnHover`}
                                onKeyPress={() => setRegexrValue(opt.val)}
                                onClick={() => setRegexrValue(opt.val)}
                              >
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
                      id="ptrn-stng-expn"
                      ariaLabel="Pattern for input field"
                      placeholder="e.g. ([A-Z])\w+"
                      list="patterns"
                      disabled={!bits.isPro}
                      value={generateBackslashPattern(regexr)}
                      changeAction={setRegexr}
                    />
                  </div>
                  <div className={css({ mr: 5 }, ut.pl1)}>

                    <SingleInput
                      id="ptrn-stng-flg"
                      inpType="text"
                      title={__('Flags:')}
                      value={flags}
                      action={setFlags}
                      placeholder="e.g. g"
                      cls={css(FieldStyle.input)}
                      disabled={!bits.isPro}
                    />
                  </div>
                  {regexr && (
                    <ErrorMessageSettings
                      id="ptrn-stng-expn"
                      type="regexr"
                      title="Error Message"
                      tipTitle={tippyHelperMsg.patternsErrMsg}
                    />
                  )}
                </>
              </SimpleAccordion>
              <FieldSettingsDivider />
            </>
          )
        }

        <RequiredSettings />

        <FieldSettingsDivider />

        <FieldHideSettings />

        <FieldSettingsDivider />

        <FieldReadOnlySettings />

        <FieldSettingsDivider />

        <FieldDisabledSettings />

        <FieldSettingsDivider />

        {/* {
          fieldData.typ.match(/^(text|url|password|number|email|)$/) && (
            <>
              <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}>
                <SingleToggle
                  id="ato-fil-stng"
                  tip={tippyHelperMsg.autoFill}
                  title={__('Auto Fill')}
                  action={setAutoComplete}
                  isChecked={isAutoComplete}
                />
              </div>
              <FieldSettingsDivider />
            </>
          )
        } */}

        {
          fieldData.typ === 'number' && (
            <>
              <SimpleAccordion id="nmbr-stng" title="Number:" className={css(FieldStyle.fieldSection)}>
                {/* <input aria-label="Maximum number for this field" className={css(FieldStyle.input)} type="text" value={placeholder} onChange={setPlaceholder} /> */}
                <div className={css({ mx: 5 })}>
                  <div className={css(FieldStyle.fieldNumber, { py: '0px !important' })}>
                    <span>{__('Min:')}</span>
                    <input
                      data-testid="nmbr-stng-min-inp"
                      title="Minimum number for this field"
                      aria-label="Minimum number for this field"
                      placeholder="Type minimum number here..."
                      // className={css(FieldStyle.inputNumber, FieldStyle.w140)}
                      className={css(FieldStyle.input, FieldStyle.w140)}
                      type="number"
                      value={min}
                      onChange={setMin}
                    />
                  </div>
                  {/* <SingleInput inpType="number" title={__('Min:')} value={min} action={setMin} cls={css(FieldStyle.input)} /> */}
                  {fieldData.mn && (
                    <ErrorMessageSettings
                      id="nmbr-stng-min"
                      type="mn"
                      title="Min Error Message"
                      tipTitle={`By enabling this feature, user will see the error message when input number is less than ${fieldData.mn}`}
                    />
                  )}
                  <div className={css(FieldStyle.fieldNumber, { py: '0px !important' })}>
                    <span>{__('Max:')}</span>
                    <input
                      data-testid="nmbr-stng-max-inp"
                      title="Maximum number for this field"
                      aria-label="Maximum number for this field"
                      placeholder="Type maximun number here..."
                      className={css(FieldStyle.input, FieldStyle.w140)}
                      type="number"
                      value={max}
                      onChange={setMax}
                    />
                  </div>
                  {/* <SingleInput inpType="number" title={__('Max:')} value={max} action={setMax} cls={css(FieldStyle.input)} /> */}
                  {fieldData.mx && (
                    <ErrorMessageSettings
                      id="nmbr-stng-max"
                      type="mx"
                      title="Max Error Message"
                      tipTitle={`By enabling this feature, user will see the error message when input number is greater than ${fieldData.mx}`}
                    />
                  )}
                </div>
              </SimpleAccordion>
              <FieldSettingsDivider />
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
                id="pass-vldsn-stng"
                title={__('Validations')}
                className={css(FieldStyle.fieldSection)}
                isPro
              >
                <div className={css(ut.mt1, ut.flxClm)}>
                  <TableCheckBox id="pass-vldsn-stng-dgt" className={css(ut.w10)} cls={css(ut.mr2)} name="digit" checked={fieldData.valid?.validations?.digit || false} value="(?=.*[0-9])" title={__('At least one digit (0-9)')} onChange={setPasswordValidation} disabled={!bits.isPro} />
                  <TableCheckBox id="pass-vldsn-stng-lwr" className={css(ut.w10, ut.mt2)} cls={css(ut.mr2)} name="lower" checked={fieldData.valid?.validations?.lower || false} value="(?=.*[a-z])" title={__('At least one lowercase character (a-z)')} onChange={setPasswordValidation} disabled={!bits.isPro} />
                  <TableCheckBox id="pass-vldsn-stng-upr" className={css(ut.w10, ut.mt2)} cls={css(ut.mr2)} name="upper" checked={fieldData.valid?.validations?.upper || false} value="(?=.*[A-Z])" title={__('At least one uppercase character (A-Z)')} onChange={setPasswordValidation} disabled={!bits.isPro} />
                  <TableCheckBox
                    id="pass-vldsn-stng-spcl"
                    className={css(ut.w10, ut.mt2)}
                    cls={css(ut.mr2)}
                    name="special"
                    checked={fieldData.valid?.validations?.special || false}
                    value="(?=.*[~!@#$%^&*(){}[$_bf_$]<>+$_bf_$-_=$_bf_$$_bf_$/|;:,.])"
                    title={__('At least one special character (~!@#$%^&*(){}[]<>+-_=/\\|;:,.)')}
                    onChange={setPasswordValidation}
                    disabled={!bits.isPro}
                  />
                  <TableCheckBox
                    id="pass-vldsn-stng-lmt"
                    className={css(ut.w10, ut.mt2)}
                    cls={css(ut.mr2)}
                    name="limit"
                    checked={fieldData.valid?.validations?.limit || false}
                    value=".{8,32}"
                    title={__('Limit Password Length')}
                    onChange={setPasswordValidation}
                    disabled={!bits.isPro}
                  />
                  {fieldData.valid?.validations?.limit && (
                    <div>
                      <div className={css(FieldStyle.fieldNumber)}>
                        <span>{__('Min:')}</span>
                        <input
                          data-testid="pass-vldsn-stng-lmt-min-inp"
                          name="mn"
                          aria-label="Minimum number for this field"
                          placeholder="Type minimum number here..."
                          className={css(FieldStyle.inputNumber)}
                          type="number"
                          value={fieldData.valid?.validations?.limit?.mn}
                          onChange={setPasswordLimit}
                        />
                      </div>
                      <div className={css(FieldStyle.fieldNumber)}>
                        <span>{__('Max:')}</span>
                        <input
                          data-testid="pass-vldsn-stng-lmt-max-inp"
                          name="mx"
                          aria-label="Maximum number for this field"
                          placeholder="Type maximum number here..."
                          className={css(FieldStyle.inputNumber)}
                          type="number"
                          value={fieldData.valid?.validations?.limit?.mx}
                          onChange={setPasswordLimit}
                        />
                      </div>
                      {/* <SingleInput inpType="number" name="mn" title={__('Min:')} value={fieldData.valid?.validations?.limit?.mn} action={setPasswordLimit} width={100} className="mr-4" /> */}
                      {/* <SingleInput inpType="number" name="mx" title={__('Max:')} value={fieldData.valid?.validations?.limit?.mx} action={setPasswordLimit} width={100} /> */}
                    </div>
                  )}
                </div>
              </SimpleAccordion>
              <FieldSettingsDivider />
            </>
          )
        }
        <div className="pos-rel">
          {
            fieldData.typ.match(/^(email|username)$/) && (
              <>
                <UniqFieldSettings
                  type="userUnique"
                  title="Validate as User Unique"
                  tipTitle={tippyHelperMsg.userUnique}
                  className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
                  isUnique="show"
                />
                <FieldSettingsDivider />
              </>
            )
          }
        </div>
        {
          fieldData.typ.match(/^(text|url|textarea|password|number|email|color|date|username|)$/) && (
            <>
              <UniqFieldSettings
                type="entryUnique"
                title="Unique Entry"
                tipTitle={tippyHelperMsg.uniqueEntry}
                className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
                isUnique="show"
              />
              <FieldSettingsDivider />
            </>
          )
        }
      </div>

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Suggestion')}
      >
        <div className="pos-rel">
          {/* {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium')}
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
        title={__('Icons')}
      >
        <div className="pos-rel" />

        <Icons iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </>
  )
}

export default memo(TextFieldSettings)

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
  plsIcn: {
    ml: 3, mt: 3, tm: 'rotate(45deg)',
  },
}
