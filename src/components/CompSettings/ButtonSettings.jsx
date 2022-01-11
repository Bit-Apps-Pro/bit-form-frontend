import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import SingleToggle from '../Utilities/SingleToggle'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function ButtonSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [error, seterror] = useState({})
  const { txt, align, fulW, btnSiz, btnTyp } = fieldData
  const { css } = useFela()
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const pos = [
    { name: __('Left', 'bitform'), value: 'left' },
    { name: __('Center', 'bitform'), value: 'center' },
    { name: __('Right', 'bitform'), value: 'right' },
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
    fieldData.align = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Alignment changed to ${e.target.value}: ${fieldData.txt}`, type: 'set_btn_align', state: { fields: allFields, fldKey } }, setUpdateBtn)
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

  return (
    <div className="">
      <FieldSettingTitle title="Field Settings" subtitle={fieldData.typ} fieldKey={fldKey} />

      <SimpleAccordion
        title={__('Submit Button Text', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input aria-label="Submit button text" className={css(FieldStyle.input)} value={txt} type="text" onChange={setSubBtnTxt} />
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
        title={__('Button Type', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <select className={css(FieldStyle.input)} name="" id="" value={btnTyp} onChange={setBtnTyp}>
            {type.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
          </select>
        </div>
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

      {/* end  */}
      {/* <div>
        <span className="font-w-m">{__('Field Type : ', 'bitform')}</span>
        {__('Button', 'bitform')}
      </div> */}
      {/* <SingleInput inpType="text" title={__('Submit Button Text:', 'bitform')} value={txt} action={setSubBtnTxt} /> */}
      {/* <SelectBox2 title={__('Button Align:', 'bitform')} options={pos} value={align} action={setButtonAlign} /> */}
      {/* <SelectBox2 title={__('Button Type:', 'bitform')} options={type} value={btnTyp} action={setBtnTyp} /> */}
      {error.btnTyp && <span style={{ color: 'red' }}>{error.btnTyp}</span>}
      {/* <SingleToggle title={__('Full Width Button:', 'bitform')} action={setFulW} isChecked={fulW} className="mt-5" /> */}
      {/* <SingleToggle title={__('Small Button:', 'bitform')} action={setBtnSiz} isChecked={btnSiz === 'sm'} className="mt-5" /> */}
    </div>
  )
}
