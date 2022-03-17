/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import CloseIcn from '../../../Icons/CloseIcn'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses, getNumFromStr, getStrFromStr, unitConverter } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import AutoResizeInput from './AutoResizeInput'
import Icons from '../Icons'
import IconStyleBtn from '../IconStyleBtn'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../StyleCustomize/ChildComp/SizeControl'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'

export default function SubTitleSettings() {
  const [fields, setFields] = useRecoilState($fields)
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const [styles, setStyles] = useRecoilState($styles)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])

  const subtitle = fieldData.subtitle || ''
  const adminLabel = fieldData.adminLbl || ''

  const subTlePreIcn = `.${fldKey}-sub-titl-pre-i`
  const subTleSufIcn = `.${fldKey}-sub-titl-suf-i`

  const { width: subPreIcnWidth, height: subPreIcnHeight } = styles?.fields[fldKey]?.classes[subTlePreIcn] || {}
  const { width: subSufIcnWidth, height: subSufIcnHeight } = styles?.fields[fldKey]?.classes[subTleSufIcn] || {}

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

  return (
    <div>
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

        <FieldIconSettings
          label="Prefix Icon"
          iconSrc={fieldData?.subTlePreIcn}
          styleRoute="sub-titl-pre-i"
          setIcon={() => setIconModel('subTlePreIcn')}
          removeIcon={() => removeIcon('subTlePreIcn')}
        />

        <FieldIconSettings
          label="Suffix Icon"
          iconSrc={fieldData?.subTleSufIcn}
          styleRoute="sub-titl-suf-i"
          setIcon={() => setIconModel('subTleSufIcn')}
          removeIcon={() => removeIcon('subTleSufIcn')}
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
    </div>
  )
}
