/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $selectedFieldId, $styles, $updateBtn } from '../../../GlobalStates'
import CloseIcn from '../../../Icons/CloseIcn'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { getNumFromStr, getStrFromStr, unitConverterHelper } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import Icons from '../Icons'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../StyleCustomize/ChildComp/SizeControl'

export default function FieldLabelSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const label = fieldData.lbl || ''
  const { css } = useFela()
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const [styles, setStyles] = useRecoilState($styles)
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')

  const lblIcnCls = `.${fldKey}-lbl-pre-i`
  const { width: lblIcnWidth, height: lblIcnHeight } = styles.fields[fldKey].classes[lblIcnCls] || ''
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
    } else {
      delete fieldData.valid.hideLbl
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const req = !e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field label Hide ${req}: ${fieldData.lbl || fldKey}`, type: `field_label_hide_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
    }
  }

  const setIconModel = (typ) => {
    setIcnType(typ)
    setIcnMdl(true)
  }

  const lblWidthHandler = ({ unit, value }, cls, width) => {
    const convertvalue = unitConverterHelper(unit, value, getStrFromStr(width || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].width = `${convertvalue}${unit || 'px'}`
    }))
  }

  const lblHeightHandler = ({ unit, value }, cls, height) => {
    const convertvalue = unitConverterHelper(unit, value, getStrFromStr(height || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].height = `${convertvalue}${unit || 'px'}`
    }))
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
        <input
          className={`${css(FieldStyle.input)}`}
          aria-label="Field Label input"
          type="text"
          onChange={setLabel}
          value={label}
        />

        <div className={css(ut.mt2, { mx: 10 })}>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.lblPreFix && (
                <img src={fieldData?.lblPreFix} alt="start icon" width="18" height="18" />
              )}

              <button type="button" onClick={() => setIconModel('lblPreFix')} className={css(ut.icnBtn)}>
                <EditIcn size={22} />
              </button>
              {fieldData?.lblPreFix && (
                <button onClick={() => removeIcon('lblPreFix')} className={css(ut.icnBtn)} type="button">
                  <CloseIcn size="13" />
                </button>
              )}

            </div>
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <span className={css(ut.fw500)}>Width</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                inputHandler={val => lblWidthHandler(val, lblIcnCls, lblIcnWidth)}
                sizeHandler={({ unitKey, unitValue }) => lblWidthHandler({ unit: unitKey, value: unitValue }, lblIcnCls, lblIcnWidth)}
                value={getNumFromStr(lblIcnWidth) || 10}
                unit={getStrFromStr(lblIcnWidth) || 'px'}
                width="110px"
                options={['px', '%']}
              />
            </div>
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <span className={css(ut.fw500)}>Height</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                inputHandler={val => lblHeightHandler(val, lblIcnCls, lblIcnHeight)}
                sizeHandler={({ unitKey, unitValue }) => lblHeightHandler({ unit: unitKey, value: unitValue }, lblIcnCls, lblIcnHeight)}
                value={getNumFromStr(lblIcnHeight) || 10}
                unit={getStrFromStr(lblIcnHeight) || 'px'}
                width="110px"
                options={['px', '%']}
              />
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
