import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import CloseIcn from '../../../Icons/CloseIcn'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import Icons from '../Icons'
import IconStyleBtn from '../IconStyleBtn'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function HelperTxtSetting() {
  console.log('%cRander Helper Text Setting', 'background:green;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const [styles, setStyles] = useRecoilState($styles)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()

  const adminLabel = fieldData.adminLbl || ''
  const helperTxt = fieldData.helperTxt || ''

  const hlpPreIcnCls = `.${fldKey}-hlp-txt-pre-i`
  const hlpSufIcnCls = `.${fldKey}-hlp-txt-suf-i`

  const { width: hlpPreIcnWidth, height: hlpPreIcnHeight } = styles?.fields[fldKey]?.classes[hlpPreIcnCls] || {}
  const { width: hlpSufIcnWidth, height: hlpSufIcnHeight } = styles?.fields[fldKey]?.classes[hlpSufIcnCls] || {}

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
    setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    addToBuilderHistory(setBuilderHistory, { event: `Helper Text ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `helpetTxt_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
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
        </div>

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
