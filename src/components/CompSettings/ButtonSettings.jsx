/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { addDefaultStyleClasses } from '../style-new/styleHelpers'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import Icons from './Icons'
import IconStyleBtn from './IconStyleBtn'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function ButtonSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [error, seterror] = useState({})
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { txt, align, fulW, btnSiz, btnTyp } = fieldData
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const helperTxt = fieldData.helperTxt || ''

  const pos = [
    { name: __('Left', 'bitform'), value: 'start' },
    { name: __('Center', 'bitform'), value: 'center' },
    { name: __('Right', 'bitform'), value: 'end' },
  ]
  const type = [
    { name: 'Submit', value: 'submit' },
    { name: 'Reset', value: 'reset' },
    { name: 'Button', value: 'button' },
  ]
  function setSubBtnTxt(e) {
    fieldData.txt = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Button text updated : ${fieldData.txt}`, type: 'change_btn_txt', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setBtnTyp(e) {
    fieldData.btnTyp = e.target.value
    if (fieldData.btnTyp === 'submit' && checkSubmitBtn()) {
      seterror({ btnTyp: __('Already have a submit button') })
      return
    }

    if (error.btnTyp) {
      seterror({ btnTyp: '' })
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Type updated to ${e.target.value}: ${fieldData.txt}`, type: 'set_btn_typ', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setButtonAlign(e) {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[`.${fldKey}-fld-wrp`]['align-items'] = e.target.value
    }))
    addToBuilderHistory(setBuilderHistory, { event: `Alignment changed to ${e.target.value}: ${fieldData.txt}`, type: 'set_btn_align', state: { fields, fldKey } }, setUpdateBtn)
  }

  const checkSubmitBtn = () => {
    const btns = Object.values(fields).filter(fld => fld.typ === 'button' && fld.btnTyp === 'submit')
    return btns.length >= 1
  }

  function setFulW(e) {
    fieldData.fulW = e.target.checked
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Full width ${e.target.checked ? 'on' : 'off'}`, type: 'set_btn_full', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setBtnSiz(e) {
    if (e.target.checked) {
      fieldData.btnSiz = 'sm'
    } else {
      fieldData.btnSiz = 'md'
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Size updated to ${e.target.checked ? 'small' : 'medium'}`, type: 'set_btn_size', state: { fields: allFields, fldKey } }, setUpdateBtn)
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
    }
  }

  const setHelperTxt = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.helperTxt
      // recalculate builder field height
      setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    } else fieldData.helperTxt = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Helper Text updated: ${fieldData.lbl || fldKey}`, type: 'change_helperTxt', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideHelperTxt = ({ target: { checked } }) => {
    if (checked) {
      fieldData.helperTxt = 'Helper Text'
      fieldData.hlpTxtHide = true
      addDefaultStyleClasses(selectedFieldId, 'hepTxt', setStyles)
    } else {
      fieldData.hlpTxtHide = false
      delete fieldData.helperTxt
    }

    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    addToBuilderHistory(setBuilderHistory, { event: `Helper Text ${req}:  ${fieldData.lbl || fldKey}`, type: `helpetTxt_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <>
      <div className="">
        <FieldSettingTitle title="Field Settings" subtitle={fieldData.typ} fieldKey={fldKey} />

        <SimpleAccordion
          title={__('Submit Button Text', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <AutoResizeInput
              aria-label="Submit button text"
              placeholder="Type text here..."
              value={txt}
              changeAction={setSubBtnTxt}
            />
          </div>
          <div className={css(ut.mt2, { mx: 10 })}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Start icon</span>
              <div className={css(ut.flxcb)}>
                {fieldData?.btnPreIcn && (
                  <>
                    <img src={fieldData?.btnPreIcn} alt="start icon" width="18" height="18" />
                    <IconStyleBtn route="btn-pre-i" />
                  </>

                )}

                <button type="button" onClick={() => setIconModel('btnPreIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
                {fieldData?.btnPreIcn && (
                  <button onClick={() => removeIcon('btnPreIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                )}

              </div>
            </div>

            <div className={css(ut.mt2)}>
              <div className={css(ut.flxcb)}>
                <span className={css(ut.fw500)}>End icon</span>
                <div className={css(ut.flxcb)}>
                  {fieldData?.btnSufIcn && (
                    <>
                      <img src={fieldData?.btnSufIcn} alt="end icon" width="18" height="18" />
                      <IconStyleBtn route="btn-suf-i" />
                    </>
                  )}
                  <button onClick={() => setIconModel('btnSufIcn')} className={css(ut.icnBtn)} type="button">
                    <EditIcn size={22} />
                  </button>
                  {fieldData?.btnSufIcn && (
                    <button onClick={() => removeIcon('btnSufIcn')} className={css(ut.icnBtn)} type="button">
                      <CloseIcn size="13" />
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Button Align', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <select className={css(FieldStyle.input)} name="" id="" value={align} onChange={setButtonAlign}>
              {pos.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

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

        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Button Type', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <select className={css(FieldStyle.input)} name="" id="" value={btnTyp} onChange={setBtnTyp}>
              {type.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
          {error.btnTyp && <span style={{ color: 'red' }}>{error.btnTyp}</span>}
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />

        <div className={`${css(FieldStyle.fieldSection)} ${css(ut.pr8)}`}>
          <SingleToggle title={__('Full Width Button:', 'bitform')} action={setFulW} isChecked={fulW} />
        </div>

        <hr className={css(FieldStyle.divider)} />

        <div className={`${css(FieldStyle.fieldSection)} ${css(ut.pr8)}`}>
          <SingleToggle title={__('Small Button:', 'bitform')} action={setBtnSiz} isChecked={btnSiz === 'sm'} />
        </div>

        <hr className={css(FieldStyle.divider)} />

      </div>

      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons', 'bitform')}
      >
        <div className="pos-rel" />

        <Icons iconType={icnType} addPaddingOnSelect={false} setModal={setIcnMdl} />
      </Modal>
    </>
  )
}
