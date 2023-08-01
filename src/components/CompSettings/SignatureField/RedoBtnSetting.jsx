/* eslint-disable no-param-reassign */
import { useAtom, useAtomValue } from 'jotai'
import { create } from 'mutative'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { $fields, $selectedFieldId } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import { addToBuilderHistory, reCalculateFldHeights } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import Modal from '../../Utilities/Modal'
import { addDefaultStyleClasses, isStyleExist, setIconFilterValue, styleClasses } from '../../style-new/styleHelpers'
import AutoResizeInput from '../CompSettingsUtils/AutoResizeInput'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

export default function RedoBtnSetting() {
  const [fields, setFields] = useAtom($fields)
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useAtomValue($selectedFieldId)
  const styles = useAtomValue($styles)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])

  const redoBtnTxt = fieldData?.redoBtn || ''
  const adminLabel = fieldData.adminLbl || ''

  const hideRedoBtn = ({ target: { checked } }) => {
    if (checked) {
      fieldData.redoBtn = __('Redo')
      fieldData.redoBtnHide = false
      addDefaultStyleClasses(selectedFieldId, 'redoBtn')
    } else {
      delete fieldData.redoBtn
      delete fieldData.redoPreIcn
      delete fieldData.redoSufIcn
      fieldData.redoBtnHide = true
    }
    const req = checked ? 'on' : 'off'
    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Redo Button ${req}:  ${redoBtnTxt || adminLabel || fldKey}`,
      type: `redo_btn_${req}`,
      state: { fields: allFields, fldKey },
    })
  }

  const setBtnTxt = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.redoBtn
      reCalculateFldHeights(fldKey)
    } else {
      fieldData.redoBtn = value
    }

    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Redo btn text updated: ${adminLabel || fieldData.redoBtn || fldKey}`,
      type: 'change_redo_btn_txt',
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
      const allFields = create(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      reCalculateFldHeights(fldKey)
    }
  }

  return (
    <div>
      <SimpleAccordion
        id="redo-button-stng"
        title={__('Redo Button')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip={tippyHelperMsg.redoBtn}
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={hideRedoBtn}
        toggleChecked={!fieldData?.redoBtnHide}
        open={!fieldData?.redoBtnHide}
        disable={fieldData?.redoBtnHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            id="redo-btn-stng"
            ariaLabel="Redo Button for this Field"
            placeholder="Type redo button txt here..."
            value={redoBtnTxt}
            changeAction={setBtnTxt}
          />
        </div>

        <FieldIconSettings
          label="Leading Icon"
          iconSrc={fieldData?.redoPreIcn}
          styleRoute="redo-btn-pre-i"
          setIcon={() => setIconModel('redoPreIcn')}
          removeIcon={() => removeIcon('redoPreIcn')}
          isPro
          proProperty="leadingIcon"
        />

        <FieldIconSettings
          label="Trailing Icon"
          iconSrc={fieldData?.redoSufIcn}
          styleRoute="redo-btn-suf-i"
          setIcon={() => setIconModel('redoSufIcn')}
          removeIcon={() => removeIcon('redoSufIcn')}
          isPro
          proProperty="trailingIcon"
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
