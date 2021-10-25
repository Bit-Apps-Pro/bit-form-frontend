/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Cooltip from '../Utilities/Cooltip'
import SingleToggle from '../Utilities/SingleToggle'
import DecisionBoxLabelModal from './CompSettingsUtils/DecisionBoxLabelModal'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function DecisionBoxSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [labelModal, setLabelModal] = useState(false)
  const { css } = useFela()
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Admin label added:', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...fieldData.valid }
      tmp.req = true
      fieldData.valid = tmp
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.req) fieldData.err.req = {}
      fieldData.err.req.dflt = '<p>This field is required</p>'
      fieldData.err.req.show = true
    } else {
      delete fieldData.valid.req
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Required field validation ${e.target.checked ? 'on' : 'off' } ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setChecked(e) {
    if (e.target.checked) {
      const tmp = { ...fieldData.valid }
      tmp.checked = true
      fieldData.valid = tmp
    } else {
      delete fieldData.valid.checked
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Default checked ${e.target.checked ? 'on' : 'off'} : ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setMsg = (val, typ) => {
    fieldData.msg[typ] = val

    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Message added', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div>

      <FieldSettingTitle title="Field Settings" subtitle={fieldData.typ} fieldKey={fldKey} />

      {/*
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {fieldData.typ.charAt(0).toUpperCase() + fieldData.typ.slice(1)}
      </div>
      <div className="flx">
        <span className="font-w-m w-4">{__('Field Key : ', 'bitform')}</span>
        <CopyText value={fldKey} className="field-key-cpy m-0" />
      </div> */}
      <div className={css(FieldStyle.fieldSection)}>
        <div className="flx flx-between">
          <div className="flx">
            <b>Label: </b>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className="txt-body">{__('Edit your decision box label by clicking on edit icon', 'bitform')}</div>
            </Cooltip>
          </div>
          <span
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
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: fieldData.lbl || fieldData?.info?.lbl }}
          // className="err-msg-box mt-2"
          className={css(FieldStyle.input, ut.px10, ut.py5, ut.pmt0)}
        />
      </div>

      <hr className={css(FieldStyle.divider)} />

      <DecisionBoxLabelModal labelModal={labelModal} setLabelModal={setLabelModal} />

      <SimpleAccordion
        title={__('Admin Label', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input aria-label="admib label" className={css(FieldStyle.input)} value={fieldData.adminLbl || ''} type="text" onChange={setAdminLabel} />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Required', 'bitform')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={setRequired}
        toggleChecked={fieldData.valid.req}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        tip="By enabling this feature, user will see the error message when input is empty"
        tipProps={{ width: 200, icnSize: 17 }}
        open
      >
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message if decision box is not checked"
        />
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      {/* <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={fieldData.adminLbl || ''} action={setAdminLabel} /> */}
      {/* <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={fieldData.valid.req} className="mt-3" />
      {
        fieldData?.valid?.req && (
          <ErrorMessageSettings
            type="req"
            title="Error Message"
            tipTitle="By enabling this feature, user will see the error message if decision box is not checked"
          />
        )
      } */}
      <SimpleAccordion
        title={__('Checked Value:', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input aria-label="Checked value" className={css(FieldStyle.input)} type="text" value={fieldData.msg.checked || ''} onChange={e => setMsg(e.target.value, 'checked')} />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Unchecked Value:', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input aria-label="Uncheked value" className={css(FieldStyle.input)} type="text" value={fieldData.msg.unchecked || ''} onChange={e => setMsg(e.target.value, 'unchecked')} />
        </div>
      </SimpleAccordion>
      <hr className={css(FieldStyle.divider)} />

      <div className={css(FieldStyle.fieldSection, ut.pr8)}>
        <SingleToggle title={__('Checked by Default:', 'bitform')} action={setChecked} isChecked={fieldData.valid.checked} />
      </div>
      <hr className={css(FieldStyle.divider)} />
      {/* <SingleInput inpType="text" title={__('Checked Value:', 'bitform')} value={fieldData.msg.checked || ''} action={e => setMsg(e.target.value, 'checked')} /> */}
      {/* <SingleInput inpType="text" title={__('Unchecked Value:', 'bitform')} value={fieldData.msg.unchecked || ''} action={e => setMsg(e.target.value, 'unchecked')} /> */}
      {/* <SingleToggle title={__('Checked by Default:', 'bitform')} action={setChecked} isChecked={fieldData.valid.checked} className="mt-3" /> */}

    </div>
  )
}
