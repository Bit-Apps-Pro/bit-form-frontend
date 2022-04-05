/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { addDefaultStyleClasses, setIconFilterValue } from '../style-new/styleHelpers'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import Icons from './Icons'
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function ButtonSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [error, setError] = useState({})
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { txt, align, fulW, btnSiz, btnTyp } = fieldData
  const [btnAlign, setBtnAlign] = useState(align)
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const selectedFieldId = useRecoilValue($selectedFieldId)

  const pos = [
    { name: __('Left', 'bitform'), value: 'start' },
    { name: __('Center', 'bitform'), value: 'center' },
    { name: __('Right', 'bitform'), value: 'end' },
  ]
  const type = [
    { name: 'Reset', value: 'reset', disabled: false },
    { name: 'Button', value: 'button', disabled: false },
  ]

  const setBuilderFldWrpHeight = () => {
    setBuilderHookState(olds => ({ ...olds, reCalculateSpecificFldHeight: { fieldKey: fldKey, counter: olds.reCalculateSpecificFldHeight.counter + 1 } }))
  }

  function setSubBtnTxt(e) {
    fieldData.txt = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Button text updated : ${fieldData.txt}`, type: 'change_btn_txt', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setBtnTyp(e) {
    fieldData.btnTyp = e.target.value
    if (fieldData.btnTyp === 'submit' && checkSubmitBtn()) {
      setError({ btnTyp: __('Already have a submit button') })
      setTimeout(() => {
        setError({ btnTyp: '' })
      }, 3000)
      return
    }

    if (error.btnTyp) {
      setError({ btnTyp: '' })
    }
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[`.${fldKey}-btn`]['background-color'] = e.target.value === 'reset' ? '#ededf1' : '#0083f3'
      drftStyle.fields[fldKey].classes[`.${fldKey}-btn`].color = e.target.value === 'reset' ? '#23435f' : '#fff'
    }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Type updated to ${e.target.value}: ${fieldData.txt}`, type: 'set_btn_typ', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setButtonAlign(e) {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[`.${fldKey}-fld-wrp`]['align-items'] = e.target.value
    }))
    fieldData.align = e.target.value
    setFields(produce(fields, draft => { draft[fldKey] = fieldData }))
    setBtnAlign(e.target.value)
    addToBuilderHistory(setBuilderHistory, { event: `Alignment changed to ${e.target.value}: ${fieldData.txt}`, type: 'set_btn_align', state: { fields, fldKey } }, setUpdateBtn)
  }

  const checkSubmitBtn = () => {
    const btns = Object.values(fields).filter(fld => fld.typ === 'button' && fld.btnTyp === 'submit')
    return btns.length >= 1
  }

  if (!checkSubmitBtn() || btnTyp === 'submit') {
    type.push({ name: 'Submit', value: 'submit', disabled: true })
  }

  function setFulW(e) {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[`.${fldKey}-btn`].width = e.target.checked ? '100%' : 'auto'
    }))
    fieldData.fulW = e.target.checked
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Full width ${e.target.checked ? 'on' : 'off'}`, type: 'set_btn_full', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setIconModel = (typ) => {
    addDefaultStyleClasses(selectedFieldId, typ, setStyles)
    setIconFilterValue(typ, fldKey, styles, setStyles, themeColors, setThemeColors)
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

  return (
    <>
      <div className="">
        <FieldSettingTitle title="Field Settings" subtitle={fieldData.typ} fieldKey={fldKey} />

        <SimpleAccordion
          title={__('Button Text', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <AutoResizeInput
              aria-label="Button text"
              placeholder="Type text here..."
              value={txt}
              changeAction={setSubBtnTxt}
            />
          </div>
          <FieldIconSettings
            label="Prefix Icon"
            iconSrc={fieldData?.btnPreIcn}
            styleRoute="btn-pre-i"
            setIcon={() => setIconModel('btnPreIcn')}
            removeIcon={() => removeIcon('btnPreIcn')}
          />
          <FieldIconSettings
            label="Suffix Icon"
            iconSrc={fieldData?.btnSufIcn}
            styleRoute="btn-suf-i"
            setIcon={() => setIconModel('btnSufIcn')}
            removeIcon={() => removeIcon('btnSufIcn')}
          />
        </SimpleAccordion>

        <FieldSettingsDivider />

        <HelperTxtSettings />

        <FieldSettingsDivider />

        <FieldDisabledSettings />

        <FieldSettingsDivider />
        <SimpleAccordion
          title={__('Button Align', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <select className={css(FieldStyle.input)} name="" id="" value={btnAlign} onChange={setButtonAlign}>
              {pos.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
        </SimpleAccordion>

        <FieldSettingsDivider />

        <SimpleAccordion
          title={__('Button Type', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <select className={css(FieldStyle.input)} name="" id="" value={btnTyp} onChange={setBtnTyp}>
              {type.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
          {error.btnTyp && <span className={css({ cr: 'red', ml: 10 })}>{error.btnTyp}</span>}
        </SimpleAccordion>

        <FieldSettingsDivider />

        <div className={`${css(FieldStyle.fieldSection)} ${css(ut.pr8)}`}>
          <SingleToggle title={__('Full Width Button:', 'bitform')} action={setFulW} isChecked={fulW} />
        </div>

        <FieldSettingsDivider />

      </div>

      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons', 'bitform')}
      >
        <div className="pos-rel" />

        <Icons iconType={icnType} addPaddingOnSelect={false} setModal={setIcnMdl} />
      </Modal>
    </>
  )
}
