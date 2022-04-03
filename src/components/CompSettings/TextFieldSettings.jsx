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
import { $bits, $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import autofillList from '../../Utils/StaticData/autofillList'
import predefinedPatterns from '../../Utils/StaticData/patterns.json'
import { addDefaultStyleClasses } from '../style-new/styleHelpers'
import Downmenu from '../Utilities/Downmenu'
import Modal from '../Utilities/Modal'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import TableCheckBox from '../Utilities/TableCheckBox'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
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
  const setStyles = useSetRecoilState($styles)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const patternTippy = useRef()
  const isAutoComplete = fieldData.ac === 'on'
  const adminLabel = fieldData.adminLbl || ''
  const imputMode = fieldData.inputMode || 'text'
  const defaultValue = fieldData.defaultValue || ''
  const suggestions = fieldData.suggestions || []
  const ac = fieldData?.ac ? fieldData.ac.trim().split(',') : ['Off']
  const fieldName = fieldData.fieldName || fldKey
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const regexr = fieldData.valid.regexr || ''
  const flags = fieldData.valid.flags || ''
  const { css } = useFela()

  console.log('fieldData', fieldData)

  const generateBackslashPattern = str => str.replaceAll('$_bf_$', '\\')
  const escapeBackslashPattern = str => str.replaceAll('\\', '$_bf_$')

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
    addToBuilderHistory(
      setBuilderHistory,
      { event: `Default value ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_defaultValue`, state: { fields: allFields, fldKey } },
      setUpdateBtn,
    )
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
  //   if (value !== '') fieldData.ac = value
  //   else delete fieldData.ac

  //   const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
  //   setFields(allFields)
  //   addToBuilderHistory(setBuilderHistory, { event: `Auto Complete updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${value}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  // }
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
    addToBuilderHistory(setBuilderHistory, { event: `Auto Complete updated ${val}: ${fieldData.lbl || adminLabel || fldKey}`, type: `change_autoComplete_${value}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideAutoComplete = ({ target: { checked } }) => {
    if (checked) fieldData.ac = fieldData.lbl || fldKey
    else delete fieldData.ac

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

        <FieldSettingsDivider />

        <SubTitleSettings />

        <FieldSettingsDivider />

        <HelperTxtSettings />

        <FieldSettingsDivider />

        <SimpleAccordion
          title={__('Input Icons', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          toggleAction={hideAdminLabel}
          toggleChecked
          open
        // disable={!fieldData?.adminLbl}
        >
          <div className={css(ut.mt2, { mx: 10 })}>
            <FieldIconSettings
              label="Prefix Icon"
              iconSrc={fieldData?.prefixIcn}
              styleRoute="pre-i"
              setIcon={() => setIconModel('prefixIcn')}
              removeIcon={() => removeIcon('prefixIcn')}
            />

            <FieldIconSettings
              label="Suffix Icon"
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

        <SimpleAccordion
          title={__('Default value', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideDefalutValue}
          toggleChecked={fieldData?.defaultValueHide}
          open={fieldData?.defaultValueHide}
          disable={!fieldData?.defaultValueHide}
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

        <FieldSettingsDivider />

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

        <FieldSettingsDivider />

        <SimpleAccordion
          title={__('Auto Complete', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideAutoComplete}
          toggleChecked={fieldData?.ac !== undefined}
          open={fieldData?.ac !== undefined}
          disable={!fieldData.ac}
        >
          <div className={css(FieldStyle.placeholder)}>
            <MultiSelect
              defaultValue={ac}
              className={`${css(FieldStyle.multiselectInput)}`}
              placeholder="Select one"
              options={autofillList}
              onChange={val => seAutoComplete(val)}
              disableChip
            />
            {/* <select
              className={css(FieldStyle.input)}
              name="suggestion" value={ac}
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

        <FieldSettingsDivider />

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

        <FieldSettingsDivider />
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
              <FieldSettingsDivider />
            </>
          )
        }

        <RequiredSettings />

        <FieldSettingsDivider />
        {
          fieldData.typ.match(/^(text|url|textarea|password|number|email|username|)$/) && (
            <>
              <SimpleAccordion
                title={__('Pattern', 'bitform')}
                className={css(FieldStyle.fieldSection)}
                open
              >
                <>
                  <div className={css(ut.mr2, ut.mt3, ut.pl1)}>
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
                  <div className={css({ mr: 5 }, ut.pl1)}>

                    <SingleInput
                      inpType="text"
                      title={__('Flags:', 'bitform')}
                      value={flags}
                      action={setFlags}
                      placeholder="e.g. g"
                      cls={css(FieldStyle.input)}
                      disabled={!bits.isPro}
                    />
                  </div>
                  {regexr && (
                    <ErrorMessageSettings
                      type="regexr"
                      title="Error Message"
                      tipTitle="By enabling this feature, user will see the error message when input value does not match the pattern"
                    />
                  )}
                </>
              </SimpleAccordion>
              <FieldSettingsDivider />
            </>
          )
        }

        <FieldHideSettings />

        <FieldSettingsDivider />

        <FieldReadOnlySettings />

        <FieldSettingsDivider />

        <FieldDisabledSettings />

        <FieldSettingsDivider />

        {
          fieldData.typ.match(/^(text|url|password|number|email|)$/) && (
            <>
              <div className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}>
                <SingleToggle title={__('Auto Fill:', 'bitform')} action={setAutoComplete} isChecked={isAutoComplete} />
              </div>
              <FieldSettingsDivider />
            </>
          )
        }

        {
          fieldData.typ.match(/^(text|url|textarea|password|number|email|color|date|username|)$/) && (
            <>
              <UniqFieldSettings
                type="entryUnique"
                title="Validate as Entry Unique"
                tipTitle="Enabling this option will check from the entry database whether its value is duplicate."
                className={css(FieldStyle.fieldSection)}
                isUnique="show"
              />
              <FieldSettingsDivider />
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
                  tipTitle="Enabling this option will check from the user database whether its value is duplicate."
                  className={css(FieldStyle.fieldSection)}
                  isUnique="show"
                />
                <FieldSettingsDivider />
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
