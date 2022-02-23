/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function FieldLabelSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])

  const label = fieldData.lbl || ''
  const { css } = useFela()
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const selectedFieldId = useRecoilValue($selectedFieldId)

  const [styles, setStyles] = useRecoilState($styles)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')

  function setLabel(e) {
    if (e.target.value === '') {
      delete fieldData.lbl
    } else {
      fieldData.lbl = e.target.value
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
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
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const req = !e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field Label Hide ${req}: ${fieldData.lbl || fldKey}`, type: `field_label_hide_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
    }
  }

  const setIconModel = (typ) => {
    console.log(typ)
    addDefaultStyleClasses(selectedFieldId, typ, setStyles)
    setIcnType(typ)
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

        <div className={css({ w: '97%', mx: 5 })}>
          <AutoResizeInput ariaLabel="Field Label input" changeAction={setLabel} value={label} />
        </div>

        <div className={css(ut.mt2, { mx: 10 })}>
          <FieldIconSettings
            label="Start Icon"
            iconSrc={fieldData?.lblPreIcn}
            styleRoute="lbl-pre-i"
            setIcon={() => setIconModel('lblPreIcn')}
            removeIcon={() => removeIcon('lblPreIcn')}
          />
          <FieldIconSettings
            label="End Icon"
            iconSrc={fieldData?.lblSufIcn}
            styleRoute="lbl-suf-i"
            setIcon={() => setIconModel('lblSufIcn')}
            removeIcon={() => removeIcon('lblSufIcn')}
          />
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
