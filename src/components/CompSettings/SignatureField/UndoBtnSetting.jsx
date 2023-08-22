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

export default function UndoBtnSetting() {
  const [fields, setFields] = useAtom($fields)
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useAtomValue($selectedFieldId)
  const styles = useAtomValue($styles)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])

  const undoBtnTxt = fieldData?.undoBtn || ''
  const adminLabel = fieldData.adminLbl || ''

  const hideUndoBtn = ({ target: { checked } }) => {
    if (checked) {
      fieldData.undoBtn = __('Undo')
      fieldData.undoBtnHide = false
      addDefaultStyleClasses(selectedFieldId, 'undoBtn')
    } else {
      delete fieldData.undoBtn
      delete fieldData.undoPreIcn
      delete fieldData.undoSufIcn
      fieldData.undoBtnHide = true
    }
    const req = checked ? 'on' : 'off'
    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Undo Button ${req}:  ${undoBtnTxt || adminLabel || fldKey}`,
      type: `undo_btn_${req}`,
      state: { fields: allFields, fldKey },
    })
  }

  const setBtnTxt = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.undoBtn
      reCalculateFldHeights(fldKey)
    } else {
      fieldData.undoBtn = value
    }

    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Undo btn text updated: ${adminLabel || fieldData.undoBtn || fldKey}`,
      type: 'change_undo_btn_txt',
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
        id="undo-button-stng"
        title={__('Undo Button')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip={tippyHelperMsg.undoBtn}
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={hideUndoBtn}
        toggleChecked={!fieldData?.undoBtnHide}
        open={!fieldData?.undoBtnHide}
        disable={fieldData?.undoBtnHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            id="undo-btn-stng"
            ariaLabel="Undo Button for this Field"
            placeholder="Type undo button txt here..."
            value={undoBtnTxt}
            changeAction={setBtnTxt}
          />
        </div>

        <FieldIconSettings
          label="Leading Icon"
          iconSrc={fieldData?.undoPreIcn}
          styleRoute="undo-btn-pre-i"
          setIcon={() => setIconModel('undoPreIcn')}
          removeIcon={() => removeIcon('undoPreIcn')}
          isPro
          proProperty="leadingIcon"
        />

        <FieldIconSettings
          label="Trailing Icon"
          iconSrc={fieldData?.undoSufIcn}
          styleRoute="undo-btn-suf-i"
          setIcon={() => setIconModel('undoSufIcn')}
          removeIcon={() => removeIcon('undoSufIcn')}
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
