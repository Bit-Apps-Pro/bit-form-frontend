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

export default function ClearBtnSetting() {
  const [fields, setFields] = useAtom($fields)
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useAtomValue($selectedFieldId)
  const styles = useAtomValue($styles)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])

  const clrBtnTxt = fieldData?.clrBtn || ''
  const adminLabel = fieldData.adminLbl || ''

  const hideClrBtn = ({ target: { checked } }) => {
    if (checked) {
      fieldData.clrBtn = __('Clear')
      fieldData.clrBtnHide = false
      addDefaultStyleClasses(selectedFieldId, 'clrBtn')
    } else {
      delete fieldData.clrBtn
      delete fieldData.clrPreIcn
      delete fieldData.clrSufIcn
      fieldData.clrBtnHide = true
    }
    const req = checked ? 'on' : 'off'
    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Clear Button ${req}:  ${clrBtnTxt || adminLabel || fldKey}`,
      type: `clr_btn_${req}`,
      state: { fields: allFields, fldKey },
    })
  }

  const setBtnTxt = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.clrBtn
      reCalculateFldHeights(fldKey)
    } else {
      fieldData.clrBtn = value
    }

    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `Clear btn text updated: ${adminLabel || clrBtnTxt || fldKey}`,
      type: 'change_clr_btn_txt',
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
        id="clr-button-stng"
        title={__('Clear Button')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip={tippyHelperMsg.clrBtn}
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={hideClrBtn}
        toggleChecked={!fieldData?.clrBtnHide}
        open={!fieldData?.clrBtnHide}
        disable={fieldData?.clrBtnHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            id="clr-btn-stng"
            ariaLabel="Clear Button for this Field"
            placeholder="Type clear button txt here..."
            value={clrBtnTxt}
            changeAction={setBtnTxt}
          />
        </div>

        <FieldIconSettings
          label="Leading Icon"
          iconSrc={fieldData?.clrPreIcn}
          styleRoute="clr-btn-pre-i"
          setIcon={() => setIconModel('clrPreIcn')}
          removeIcon={() => removeIcon('clrPreIcn')}
          isPro
          proProperty="leadingIcon"
        />

        <FieldIconSettings
          label="Trailing Icon"
          iconSrc={fieldData?.clrSufIcn}
          styleRoute="undo-btn-suf-i"
          setIcon={() => setIconModel('clrSufIcn')}
          removeIcon={() => removeIcon('clrSufIcn')}
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
