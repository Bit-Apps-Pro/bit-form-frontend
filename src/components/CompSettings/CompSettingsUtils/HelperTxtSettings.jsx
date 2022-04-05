import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import { $themeColors } from '../../../GlobalStates/ThemeColorsState'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, reCalculateFieldHeights } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses, isStyleExist, setIconFilterValue, styleClasses } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function HelperTxtSettings() {
  console.log('%cRander Helper Text Setting', 'background:green;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const [styles, setStyles] = useRecoilState($styles)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const adminLabel = fieldData.adminLbl || ''
  const helperTxt = fieldData.helperTxt || ''

  // const hlpPreIcnCls = `.${fldKey}-hlp-txt-pre-i`
  // const hlpSufIcnCls = `.${fldKey}-hlp-txt-suf-i`

  // const { width: hlpPreIcnWidth, height: hlpPreIcnHeight } = styles?.fields[fldKey]?.classes[hlpPreIcnCls] || {}
  // const { width: hlpSufIcnWidth, height: hlpSufIcnHeight } = styles?.fields[fldKey]?.classes[hlpSufIcnCls] || {}

  const hideHelperTxt = ({ target: { checked } }) => {
    if (checked) {
      fieldData.helperTxt = 'Helper Text'
      fieldData.hlpTxtHide = true
      addDefaultStyleClasses(selectedFieldId, 'hlpTxt', setStyles)
    } else {
      fieldData.hlpTxtHide = false
      delete fieldData.helperTxt
    }

    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFieldHeights(setBuilderHookState, fldKey)
    addToBuilderHistory(setBuilderHistory, { event: `Helper Text ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `helpetTxt_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setHelperTxt = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.helperTxt
      // recalculate builder field height
      reCalculateFieldHeights(setBuilderHookState, fldKey)
    } else fieldData.helperTxt = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFieldHeights(setBuilderHookState, fldKey)
    addToBuilderHistory(setBuilderHistory, { event: `Helper Text updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_helperTxt', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setIconModel = (typ) => {
    if (!isStyleExist(styles, fldKey, styleClasses[typ])) addDefaultStyleClasses(selectedFieldId, typ, setStyles)
    setIconFilterValue(typ, fldKey, styles, setStyles, themeColors, setThemeColors)
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
      reCalculateFieldHeights(setBuilderHookState, fldKey)
    }
  }

  return (
    <>
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
        <FieldIconSettings
          label="Prefix Icon"
          iconSrc={fieldData?.hlpPreIcn}
          styleRoute="hlp-txt-pre-i"
          setIcon={() => setIconModel('hlpPreIcn')}
          removeIcon={() => removeIcon('hlpPreIcn')}
        />
        <FieldIconSettings
          label="Suffix Icon"
          iconSrc={fieldData?.hlpSufIcn}
          styleRoute="hlp-txt-suf-i"
          setIcon={() => setIconModel('hlpSufIcn')}
          removeIcon={() => removeIcon('hlpSufIcn')}
        />

      </SimpleAccordion>
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
