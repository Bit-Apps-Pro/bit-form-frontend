/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, reCalculateFldHeights } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses, isStyleExist, setIconFilterValue, styleClasses } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function SubTitleSettings() {
  const [fields, setFields] = useRecoilState($fields)
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const [styles, setStyles] = useRecoilState($styles)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])

  const subtitle = fieldData.subtitle || ''
  const adminLabel = fieldData.adminLbl || ''

  const hideSubTitle = ({ target: { checked } }) => {
    if (checked) {
      fieldData.subtitle = 'Sub Title'
      fieldData.subtitleHide = true
      addDefaultStyleClasses(selectedFieldId, 'subTitl')
    } else {
      delete fieldData.subtitle
      fieldData.subtitleHide = false
    }
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Sub Title ${req}:  ${fieldData.subtitle || adminLabel || fldKey}`,
      type: `subtitle_${req}`,
      state: { fields: allFields, fldKey },
    })
  }

  const setSubTitle = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.subtitle
      reCalculateFldHeights(fldKey)
    } else {
      fieldData.subtitle = value
    }

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Sub Title updated: ${adminLabel || fieldData.subtitle || fldKey}`,
      type: 'change_subtitle',
      state: { fields: allFields, fldKey },
    })
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
      setStyles(prvStyle => produce(prvStyle, draft => {
        if (iconType === 'prefixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-left']
        if (iconType === 'suffixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-right']
      }))
      reCalculateFldHeights(fldKey)
    }
  }

  return (
    <div>
      <SimpleAccordion
        id="sub-titl-stng"
        title={__('Sub Title')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By disabling this option, the field sub title will be hidden"
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={hideSubTitle}
        toggleChecked={fieldData?.subtitleHide}
        open={fieldData?.subtitleHide}
        disable={!fieldData?.subtitleHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            id="sub-titl-stng"
            ariaLabel="Sub title for this Field"
            placeholder="Type sub title here..."
            value={subtitle}
            changeAction={setSubTitle}
          />
        </div>

        <FieldIconSettings
          label="Leading Icon"
          iconSrc={fieldData?.subTlePreIcn}
          styleRoute="sub-titl-pre-i"
          setIcon={() => setIconModel('subTlePreIcn')}
          removeIcon={() => removeIcon('subTlePreIcn')}
        />

        <FieldIconSettings
          label="Trailing Icon"
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
        title={__('Icons')}
      >
        <div className="pos-rel" />
        <Icons iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </div>
  )
}
