/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import { $themeColors } from '../../../GlobalStates/ThemeColorsState'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, reCalculateFieldHeights } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses, setIconFilterValue } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function FieldLabelSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [styles, setStyles] = useRecoilState($styles)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const label = fieldData.lbl || ''
  const { css } = useFela()
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')

  function setLabel(e) {
    const { value } = e.target
    if (value === '') {
      delete fieldData.lbl
    } else {
      fieldData.lbl = value.replaceAll('\\', '$_bf_$')
    }
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFieldHeights(setBuilderHookStates, fldKey)
    addToBuilderHistory(setBuilderHistory, { event: `Field Label Change ${fieldData.lbl || fldKey}`, type: 'field_label_change', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideFieldLabel = e => {
    if (!e.target.checked) {
      fieldData.valid.hideLbl = true
      addDefaultStyleClasses(selectedFieldId, 'lbl', setStyles)
    } else {
      delete fieldData.valid.hideLbl
    }
    // eslint-disable-next-line no-param-reassign
    const req = !e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFieldHeights(setBuilderHookStates, fldKey)
    addToBuilderHistory(setBuilderHistory, { event: `Field Label Hide ${req}: ${fieldData.lbl || fldKey}`, type: `field_label_hide_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      reCalculateFieldHeights(setBuilderHookStates, fldKey)
    }
  }

  const setIconModel = (iconType) => {
    addDefaultStyleClasses(selectedFieldId, iconType, setStyles)
    setIconFilterValue(iconType, fldKey, styles, setStyles, themeColors, setThemeColors)
    setIcnType(iconType)
    setIcnMdl(true)
  }

  return (
    <>
      <SimpleAccordion
        title={__('Field Label:', 'bitform')}
        className={`${css(FieldStyle.fieldSection)} ${css(FieldStyle.hover_tip)}`}
        switching
        tip="By disabling this option, the field label will be hidden"
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={hideFieldLabel}
        toggleChecked={!fieldData.valid.hideLbl}
        open={!fieldData.valid.hideLbl}
        disable={fieldData.valid.hideLbl}
      >
        <div>
          <div className={css({ w: '97%', mx: 5 })}>
            <AutoResizeInput
              ariaLabel="Field Label input"
              changeAction={setLabel}
              value={label.replaceAll('$_bf_$', '\\')}
            />
          </div>

          <div className={css(ut.mt1)}>
            <FieldIconSettings
              label="Prefix Icon"
              iconSrc={fieldData?.lblPreIcn}
              styleRoute="lbl-pre-i"
              setIcon={() => setIconModel('lblPreIcn')}
              removeIcon={() => removeIcon('lblPreIcn')}
            />

            <FieldIconSettings
              label="Suffix Icon"
              iconSrc={fieldData?.lblSufIcn}
              styleRoute="lbl-suf-i"
              setIcon={() => setIconModel('lblSufIcn')}
              removeIcon={() => removeIcon('lblSufIcn')}
            />
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
