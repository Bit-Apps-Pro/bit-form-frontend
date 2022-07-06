/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../GlobalStates/GlobalStates'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import FieldStyle from '../../styles/FieldStyle.style'
import { isDev } from '../../Utils/config'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Cooltip from '../Utilities/Cooltip'
import RenderHtml from '../Utilities/RenderHtml'
import SingleToggle from '../Utilities/SingleToggle'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import DecisionBoxLabelModal from './CompSettingsUtils/DecisionBoxLabelModal'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function DecisionBoxSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [labelModal, setLabelModal] = useState(false)
  const { css } = useFela()
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  function setChecked(e) {
    const { checked } = e.target
    if (checked) {
      const tmp = { ...fieldData.valid }
      tmp.checked = true
      fieldData.valid = tmp
    } else {
      delete fieldData.valid.checked
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Check by default ${checked ? 'on' : 'off'} : ${fieldData.adminLbl || fldKey}`, type: `set_check_${5}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setMsg = (val, typ) => {
    fieldData.msg[typ] = val
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Message added', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setDiasabled = e => {
    const { checked } = e.target
    if (checked) {
      const tmp = { ...fieldData.valid }
      tmp.disabled = true
      fieldData.valid = tmp
    } else {
      delete fieldData.valid.disabled
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    const req = checked ? 'on' : 'off'
    addToBuilderHistory(setBuilderHistory, { event: `Disabled field ${req}`, type: `disabled_field_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setReadOnly = e => {
    const { checked } = e.target
    if (checked) {
      const tmp = { ...fieldData.valid }
      tmp.readonly = true
      fieldData.valid = tmp
    } else {
      delete fieldData.valid.readonly
    }
    console.log('setReadOnly', fieldData)

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    const req = checked ? 'on' : 'off'
    addToBuilderHistory(setBuilderHistory, { event: `Readonly field ${req}`, type: `readobly_field_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  if (isDev) {
    window.selectedFieldData = fieldData
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <div className={css(FieldStyle.fieldSection)}>
        <div className={`flx flx-between ${FieldStyle.hover_tip}`}>
          <div className="flx">
            <b>Label </b>
            <Cooltip
              width={250}
              icnSize={17}
              className="hover-tip"
            >
              <div className="txt-body">
                {__('Edit your decision box label by clicking on edit icon')}
              </div>
            </Cooltip>
          </div>
          <span
            data-testid="lbl-edt-btn"
            role="button"
            tabIndex="-1"
            className="mr-2 cp"
            onClick={() => setLabelModal(true)}
            onKeyPress={() => setLabelModal(true)}
          >
            <EditIcn size={19} />
          </span>
        </div>
        <div
          className={css(FieldStyle.input, ut.px10, ut.py5, sc.childPmargin0)}
        >
          <RenderHtml html={fieldData.lbl || fieldData?.info?.lbl} />
        </div>
      </div>

      <FieldSettingsDivider />

      <DecisionBoxLabelModal
        labelModal={labelModal}
        setLabelModal={setLabelModal}
      />

      <AdminLabelSettings />

      <FieldSettingsDivider />

      <RequiredSettings />

      <FieldSettingsDivider />

      {/* <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, { pr: '36px !important' })}>
        <SingleToggle
          id="fld-dsbl-stng"
          tip="By disabling this option, the field disable will be hidden"
          title={__('Disabled Field')}
          action={setDiasabled}
          isChecked={isDiasabled}
        />
      </div> */}
      <FieldDisabledSettings />

      <FieldSettingsDivider />

      {/* <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, { pr: '36px !important' })}>
        <SingleToggle
          id="rdonly-stng"
          tip="By disabling this option, the field readonly will be hidden"
          title={__('Read Only')}
          action={setReadOnly}
          isChecked={fieldData.valid.readonly}
        />
      </div> */}
      <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="chek-val-stng"
        title={__('Checked Value')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="chek-val-inp"
            aria-label="Checked value"
            className={css(FieldStyle.input)}
            type="text"
            value={fieldData.msg.checked || ''}
            onChange={e => setMsg(e.target.value, 'checked')}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="unchek-val-stng"
        title={__('Unchecked Value')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="unchek-val-inp"
            aria-label="Uncheked value"
            className={css(FieldStyle.input)}
            type="text"
            value={fieldData.msg.unchecked || ''}
            onChange={e => setMsg(e.target.value, 'unchecked')}
          />
        </div>
      </SimpleAccordion>
      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, { pr: '36px !important' })}>
        <SingleToggle
          id="chek-by-dflt"
          tip="By disabling this option, the field checked by default will be hidden"
          title={__('Checked by Default')}
          action={setChecked}
          isChecked={fieldData.valid.checked}
        />
      </div>
      <FieldSettingsDivider />
    </div>
  )
}
