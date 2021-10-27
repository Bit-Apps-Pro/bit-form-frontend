/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Cooltip from '../Utilities/Cooltip'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import UniqField from './CompSettingsUtils/UniqField'
import EditOptions from './EditOptions/EditOptions'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function SelectSettings() {
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const options = fieldData.opt
  const isRequired = fieldData.valid.req !== undefined
  const isMultiple = fieldData.mul
  const allowCustomOpt = fieldData.customOpt !== undefined
  const adminLabel = fieldData.adminLbl === undefined ? '' : fieldData.adminLbl
  const placeholder = fieldData.ph === undefined ? '' : fieldData.ph
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const dataSrc = fieldData?.customType?.type || 'fileupload'
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  let fieldObject = null
  let disabled = false
  if (fieldData?.customType?.type) {
    fieldObject = fieldData?.customType
    disabled = true
  }
  const [importOpts, setImportOpts] = useState({})
  const [optionMdl, setOptionMdl] = useState(false)
  
  useEffect(() => setImportOpts({ dataSrc, fieldObject, disabled }), [fldKey])
  // set defaults
  if (isMultiple) {
    if ('val' in fieldData) {
      if (!Array.isArray(fieldData.val)) {
        fieldData.val = [fieldData.val]
      }
    } else {
      fieldData.val = []
    }
  }

  function setRequired(e) {
    console.log('from SelectSetting', fieldData)
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
      delete fieldData.mn
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field required ${req}: ${adminLabel || fieldData.lbl || fldKey}`, type: `required_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Admin label updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_adminlabel', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setPlaceholder(e) {
    if (e.target.value === '') {
      delete fieldData.ph
    } else {
      fieldData.ph = e.target.value
    }
    const req = e.target.checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Placeholder: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_placeholder`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setMultiple(e) {
    if (e.target.checked) {
      fieldData.mul = true
    } else {
      delete fieldData.mul
      delete fieldData.mn
      delete fieldData.mx
      if (fieldData.err) {
        delete fieldData.err.mn
        delete fieldData.err.mx
      }
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Multiple option ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `set_multiple_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setAllowCustomOption(e) {
    if (e.target.checked) {
      fieldData.customOpt = true
    } else {
      delete fieldData.customOpt
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Custom option ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `set_allow_custom_option`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function rmvOpt(ind) {
    options.splice(ind, 1)
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option removed to ${options[ind].label}`, type: `rmv_option_field`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function addOpt() {
    options.push({ label: `Option ${fieldData.opt.length + 1}`, value: `Option ${fieldData.opt.length + 1}` })
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option added to ${fieldData.opt.label}`, type: `add_option_field`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setCheck(e) {
    if (e.target.checked) {
      if (isMultiple) {
        if (!Array.isArray(fieldData.val)) {
          fieldData.val = []
        }
        // fieldData.val.push(e.target.getAttribute('data-value'))
        fieldData.val = [...fieldData.val, e.target.getAttribute('data-value')]
      } else {
        fieldData.val = e.target.getAttribute('data-value')
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isMultiple) {
        fieldData.val = [...fieldData.val.filter(itm => itm !== e.target.getAttribute('data-value'))]
      } else {
        delete fieldData.val
      }
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Check by default ${e.target.checked ? 'on' : 'off'} : {options}`, type: `set_check_field`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setOptLbl(e, i) {
    const updateVal = e.target.value
    const tmp = { ...options[i] }
    tmp.label = updateVal
    tmp.value = updateVal.replace(',', '_')
    fieldData.opt[i] = tmp
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option label updated to ${tmp.label}`, type: `set_opt_label_field`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const openImportModal = () => {
    importOpts.show = true
    setImportOpts({ ...importOpts })
  }

  const openOptionModal = () => {
    console.log(fieldData.opt, 'aa')
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  const closeImportModal = () => {
    delete importOpts.show
    setImportOpts({ ...importOpts })
  }

  function setMin(e) {
    if (!isPro) return
    if (!Number(e.target.value)) {
      delete fieldData.mn
      setRequired({ target: { checked: false } })
    } else {
      fieldData.mn = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mn) fieldData.err.mn = {}
      fieldData.err.mn.dflt = `<p>Minimum ${e.target.value} option${Number(e.target.value) > 1 ? 's' : ''}<p>`
      fieldData.err.mn.show = true
      setRequired({ target: { checked: true } })
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Min value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_min', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setMax(e) {
    if (!isPro) return
    if (e.target.value === '') {
      delete fieldData.mx
    } else {
      fieldData.mx = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mx) fieldData.err.mx = {}
      fieldData.err.mx.dflt = `<p>Maximum ${e.target.value} option${Number(e.target.value) > 1 ? 's' : ''}</p>`
      fieldData.err.mx.show = true
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Max value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_max', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setDisabledOnMax = e => {
    if (!isPro) return
    if (e.target.checked) {
      fieldData.valid.disableOnMax = true
    } else {
      delete fieldData.valid.disableOnMax
    }

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Disable on max selected ${e.target.checked ? 'on' : 'off'}: ${fieldData.lbl || adminLabel || fldKey}`, type: `set_disable_on_max`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideAdminLabel = (e) => {
    console.log('from SelectSetting', fieldData)
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
    } else {
      delete fieldData.adminLbl
    }
    const req = e.target.checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Admin label: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_adminlabel`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div className="">
      {/*
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        {fieldData.typ.charAt(0).toUpperCase() + fieldData.typ.slice(1)}
      </div>
      <div className="flx">
        <span className="font-w-m mr-1">{__('Field Key : ', 'bitform')}</span>
        <CopyText value={fldKey} className="field-key-cpy m-0 w-7" />
      </div> */}
      <FieldSettingTitle title="Field Settings" subtitle={fieldData.typ} fieldKey={fldKey} />

      <FieldLabelSettings />

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Admin Label', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={hideAdminLabel}
        toggleChecked={fieldData?.adminLbl !== undefined}
        open={fieldData?.adminLbl !== undefined}
        disable={!fieldData?.adminLbl}
      >
        <div className={css(FieldStyle.placeholder)}>
          <input aria-label="Admin label" className={css(FieldStyle.input)} value={adminLabel} type="text" onChange={setAdminLabel} />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      {/* <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} /> */}

      {/* {fieldData.typ.match(/^(text|url|password|number|email|select)$/) && <SingleInput inpType="text" title={__('Placeholder:', 'bitform')} value={placeholder} action={setPlaceholder} />} */}
      {fieldData.typ.match(/^(text|url|password|number|email|select)$/) && (
        <SimpleAccordion
          title={__('Placeholder', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <input aria-label="Field placeholder" className={css(FieldStyle.input)} type="text" value={placeholder} onChange={setPlaceholder} />
          </div>
        </SimpleAccordion>
      )}

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Required', 'bitform')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={setRequired}
        toggleChecked={isRequired}
        className={`${css(FieldStyle.fieldSection)} ${css(FieldStyle.hover_tip)}`}
        switching
        tip="By enabling this feature, user will see the error message when input is empty"
        tipProps={{ width: 200, icnSize: 17 }}
        open
      >
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message when input is empty"
        />
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      {/* <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={isRequired} className="mt-3" />
      {fieldData?.valid?.req && (
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message if select box is empty"
        />
      )} */}
      {/* <div className="pos-rel">
        {!bits.isPro && (
          <div className="pro-blur flx" style={{ height: '100%', left: 0, width: '100%', marginTop: 14 }}>
            <div className="pro">
              {__('Available On', 'bitform')}
              <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                <span className="txt-pro">
                  {' '}
                  {__('Premium', 'bitform')}
                </span>
              </a>
            </div>
          </div>
        )}
        <UniqField
          type="entryUnique"
          isUnique="isEntryUnique"
          title="Validate as Entry Unique"
          tipTitle="Enabling this option will check from the entry database whether its value is duplicate."
        />
      </div> */}
      <div className="pos-rel">
        <UniqField
          type="entryUnique"
          isUnique="isEntryUnique"
          title="Validate as Entry Unique"
          tipTitle="Enabling this option will check from the entry database whether its value is duplicate."
          className={css(FieldStyle.fieldSection)}
          isPro
        />
      </div>

      <hr className={css(FieldStyle.divider)} />

      {/* <SingleToggle title={__('Allow Other Option:', 'bitform')} action={setAllowCustomOption} isChecked={allowCustomOpt} className="mt-3 mb-2" /> */}
      <div className={`${css(FieldStyle.fieldSection)} ${css(ut.pr8)}`}>
        <SingleToggle title={__('Allow Other Option:', 'bitform')} action={setAllowCustomOption} isChecked={allowCustomOpt} />
      </div>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Multiple Select:', 'bitform')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={setMultiple}
        toggleChecked={isMultiple}
        className={`${css(FieldStyle.fieldSection)} ${css(FieldStyle.hover_tip)}`}
        switching
        tip="By enabling this feature, user will see the error message when input is empty"
        tipProps={{ width: 200, icnSize: 17 }}
        open
      >
        {
          fieldData.mul && (
            <>
              <div>
                <div className={`${css(FieldStyle.flxCenter)} ${css(ut.mt2)} ${css(ut.mb2)}`}>
                  <h4 className={css(ut.m0)}>{__('Minimum:', 'bitform')}</h4>
                  <Cooltip width={250} icnSize={17} className={`${css(ut.ml2)} hovertip`}>
                    <div className={css(ut.tipBody)}>{__('Set minimum number to be selected for dropdown option', 'bitform')}</div>
                  </Cooltip>
                  {!isPro && <span className={`${css(ut.proBadge)} ${css(ut.ml2)}`}>{__('Pro', 'bitform')}</span>}
                </div>
                <input aria-label="Minimum number" className={css(FieldStyle.input)} type="number" value={min} onChange={setMin} disabled={!isPro} />
              </div>

              {fieldData.mn && (
                <ErrorMessageSettings
                  type="mn"
                  title="Min Error Message"
                  tipTitle={`By enabling this feature, user will see the error message when selected options is less than ${fieldData.mn}`}
                />
              )}

              <div>
                <div className={`${css(FieldStyle.flxCenter)} ${css(ut.mt2)} ${css(ut.mb2)}`}>
                  <h4 className={css(ut.m0)}>{__('Maximum:', 'bitform')}</h4>
                  <Cooltip width={250} icnSize={17} className={`${css(ut.ml2)} hovertip`}>
                    <div className={css(ut.tipBody)}>{__('Set maximum number to be selected for dropdown option', 'bitform')}</div>
                  </Cooltip>
                  {!bits.isPro && <span className={`${css(ut.proBadge)} ${css(ut.ml2)}`}>{__('Pro', 'bitform')}</span>}
                </div>
                <input aria-label="Maximum numebr" className={css(FieldStyle.input)} type="number" value={max} onChange={setMax} disabled={!isPro} />
              </div>
              {fieldData.mx && (
                <>
                  <ErrorMessageSettings
                    type="mx"
                    title="Max Error Message"
                    tipTitle={`By enabling this feature, user will see the error message when selected options is greater than ${fieldData.mx}`}
                  />
                  {/* <SingleToggle title={__('Disable if maximum selected:', 'bitform')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" /> */}
                </>
              )}
            </>
          )
        }
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      {/* <SingleToggle title={__('Multiple Select:', 'bitform')} action={setMultiple} isChecked={isMultiple} className="mt-3" />
      {
        fieldData.mul && (
          <>
            <div>
              <div className="flx mt-2 mb-2">
                <h4 className="m-0">{__('Minimum:', 'bitform')}</h4>
                <Cooltip width={250} icnSize={17} className="ml-2">
                  <div className="txt-body">{__('Set minimum number to be selected for dropdown option', 'bitform')}</div>
                </Cooltip>
                {!isPro && <span className="pro-badge ml-2">{__('Pro', 'bitform')}</span>}
              </div>
              <input className="btcd-paper-inp" type="number" value={min} onChange={setMin} disabled={!isPro} />
            </div>

            {fieldData.mn && (
              <ErrorMessageSettings
                type="mn"
                title="Min Error Message"
                tipTitle={`By enabling this feature, user will see the error message when selected options is less than ${fieldData.mn}`}
              />
            )}

            <div>
              <div className="flx mt-2 mb-2">
                <h4 className="m-0">{__('Maximum:', 'bitform')}</h4>
                <Cooltip width={250} icnSize={17} className="ml-2">
                  <div className="txt-body">{__('Set maximum number to be selected for dropdown option', 'bitform')}</div>
                </Cooltip>
                {!bits.isPro && <span className="pro-badge ml-2">{__('Pro', 'bitform')}</span>}
              </div>
              <input className="btcd-paper-inp" type="number" value={max} onChange={setMax} disabled={!isPro} />
            </div>
            {fieldData.mx && (
              <>
                <ErrorMessageSettings
                  type="mx"
                  title="Max Error Message"
                  tipTitle={`By enabling this feature, user will see the error message when selected options is greater than ${fieldData.mx}`}
                />
                <SingleToggle title={__('Disable if maximum selected:', 'bitform')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" />
              </>
            )}
          </>
        )
      } */}

      <hr className={css(FieldStyle.divider)} />
      {/* <button onClick={openImportModal} className={css(app.btn)} type="button">
        <DownloadIcon size="16" />
        &nbsp;
        {__('Import Options', 'bitform')}
      </button>
      <br /> */}
      <button onClick={openOptionModal} className={css(app.btn)} type="button">
        &nbsp;
        {__('Edit Options', 'bitform')}
      </button>

      {/* <div className="opt">
        <span className="font-w-m">{__('Options:', 'bitform')}</span>
        {fieldData.opt.map((itm, i) => (
          <div key={`opt-${i + 8}`} className="flx flx-between">
            <SingleInput inpType="text" value={itm.label} action={e => setOptLbl(e, i)} width={140} className="mt-0" />
            <div className="flx mt-2">
              <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': `'${__('Check by Default', 'bitform')}'` }}>
                <input aria-label="chek" onChange={setCheck} type="checkbox" data-value={itm.value} checked={typeof fieldData.val === 'string' ? fieldData.val === itm.value : fieldData?.val?.some(d => d === itm.value)} />
                <span className="btcd-mrk ck br-50" />
              </label>
              <button onClick={() => rmvOpt(i)} className={`${css(app.btn)} cls-btn`} type="button" aria-label="remove option"><CloseIcn size="14" /></button>
            </div>
          </div>
        ))}
        <button onClick={addOpt} className={`${css(app.btn)} blue`} type="button">{__('Add More +', 'bitform')}</button>
      </div> */}
      {/* <Modal
        md
        autoHeight
        show={importOpts.show}
        setModal={closeImportModal}
        className="o-v"
        title={__('Import Options', 'bitform')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium', 'bitform')}
                  </span>
                </a>
              </div>
            </div>
          )}
          <ImportOptions
            importOpts={importOpts}
            setImportOpts={setImportOpts}
            lblKey="label"
            valKey="value"
          />
        </div>
      </Modal> */}

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Options', 'bitform')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium', 'bitform')}
                  </span>
                </a>
              </div>
            </div>
          )}
          {/* <Option
            optionMdl={optionMdl}
            options={fieldData.opt}
            lblKey="label"
            valKey="value"
            type="select"
          /> */}
          <EditOptions
            optionMdl={optionMdl}
            options={fieldData.opt}
            lblKey="label"
            valKey="value"
            type="select"
            hasGroup
          />
        </div>
      </Modal>
    </div >
  )
}
