/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { memo, useEffect, useId, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $builderHistory, $fields, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { isDev } from '../../Utils/config'
import { addToBuilderHistory, assignNestedObj, reCalculateFieldHeights } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import OtherOptionSettings from './CompSettingsUtils/OtherOptionSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import UniqFieldSettings from './CompSettingsUtils/UniqFieldSettings'
import EditOptions from './EditOptions/EditOptions'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function RadioCheckSettings() {
  console.log('%c $render RadioCheckSettings', 'background:royalblue;padding:3px;border-radius:5px;color:white')
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const options = deepCopy(fields[fldKey].opt)
  const adminLabel = fieldData.adminLbl || ''
  const fieldName = fieldData.fieldName || fldKey
  const isRound = fieldData.round || false
  const isRadioRequired = fieldData.valid.req || false
  const optionCol = fieldData?.optionCol === undefined ? '' : fieldData?.optionCol

  const isOptionRequired = fieldData.opt.find(opt => opt.req)
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const dataSrc = fieldData?.customType?.type || 'fileupload'
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const setStyles = useSetRecoilState($styles)

  let fieldObject = null
  let disabled = false
  if (fieldData?.customType?.type) {
    disabled = true
    fieldObject = fieldData?.customType
  }
  const [importOpts, setImportOpts] = useState({})
  const [optionMdl, setOptionMdl] = useState(false)
  useEffect(() => setImportOpts({ dataSrc, fieldObject, disabled }), [fldKey])

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

  function setRound({ target: { checked } }) {
    const fldClsSelector = fieldData.typ === 'radio' ? 'rdo' : 'ck'
    const path = `fields->${fldKey}->classes->.${fldKey}-${fldClsSelector}->border-radius`
    setStyles(prvStyles => produce(prvStyles, drft => {
      let bdr = '5px'
      if (checked) {
        fieldData.round = true
        bdr = '50%'
        assignNestedObj(drft, path, bdr)
      } else {
        delete fieldData.round
        assignNestedObj(drft, path, bdr)
      }
    }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option rounded ${checked ? 'on' : 'off'}`, type: 'set_round', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function rmvOpt(ind) {
    options.splice(ind, 1)
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option removed: ${fieldData.opt[ind].lbl}`, type: `rmv_option_${useId() * 2 * 5 + 2}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function addOpt() {
    options.push({ lbl: `Option ${options.length + 1}` })
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option added: ${fieldData.opt}`, type: `add_option_${useId() * 8 * 4 + 2}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setCheck(e, i) {
    if (fieldData.typ === 'radio') {
      for (let ind = 0; ind < options.length; ind += 1) {
        delete options[ind].check
      }
    }

    if (e.target.checked) {
      const tmp = { ...options[i] }
      tmp.check = true
      options[i] = tmp
    } else {
      delete options[i].check
    }
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Check by default ${e.target.checked ? 'on' : 'off'} : {option_label}`, type: `set_check_${useId() * 5 * 4 + 3}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setReq(e, i) {
    if (e.target.checked) {
      const tmp = { ...options[i] }
      tmp.req = true
      options[i] = tmp
    } else {
      delete options[i].req
    }
    fieldData.opt = options
    const reqOpts = options.filter(opt => opt.req).map(op => op.lbl).join(', ')
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err.req) fieldData.err.req = {}
    fieldData.err.req.dflt = reqOpts ? `<p>${reqOpts} is required</p>` : '<p>This field is required</p>'
    fieldData.err.req.show = true
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field required ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `Field required ${req} : ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setRadioRequired = e => {
    if (e.target.checked) {
      fieldData.valid.req = true
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.req) fieldData.err.req = {}
      fieldData.err.req.dflt = '<p>This field is required</p>'
      fieldData.err.req.show = true
    } else {
      delete fieldData.valid.req
      delete fieldData.mn
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option rounded ${e.target.checked ? 'on' : 'off'}`, type: 'set_round', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setOptLbl(e, i) {
    const tmp = { ...options[i] }
    tmp.lbl = e.target.value
    options[i] = tmp
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option label updated: ${fieldData.lbl || adminLabel || fldKey}`, type: `set_opt_label_${useId() * 4 * 2 + 5}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const openImportModal = () => {
    importOpts.show = true
    setImportOpts({ ...importOpts })
  }

  const openOptionModal = () => {
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
      setRadioRequired({ target: { checked: false } })
    } else {
      fieldData.mn = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mn) fieldData.err.mn = {}
      fieldData.err.mn.dflt = `<p>Minimum ${e.target.value} option${Number(e.target.value) > 1 ? 's' : ''}<p>`
      fieldData.err.mn.show = true
      if (!isOptionRequired) setRadioRequired({ target: { checked: true } })
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
    addToBuilderHistory(setBuilderHistory, { event: `Disable on max selected ${e.target.checked ? 'on' : 'off'}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_disable_on_max', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideAdminLabel = (e) => {
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
    } else {
      delete fieldData.adminLbl
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Admin label: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req}_adminlabel`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const handleFieldName = ({ target: { value } }) => {
    if (value !== '') fieldData.fieldName = value
    else fieldData.fieldName = fldKey

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field name updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_field_name', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const handleOptions = newOpts => {
    setFields(allFields => produce(allFields, draft => { draft[fldKey].opt = newOpts }))
    reCalculateFieldHeights(fldKey)
  }

  function setColumn({ target: { value } }) {
    if (value === '') {
      delete fieldData.optionCol
    } else {
      fieldData.optionCol = value
    }
    const req = value ? 'Add' : 'Remove'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    let colStr = ''
    for (let colindx = 0; colindx < value; colindx += 1) {
      colStr += '1fr '
    }
    setStyles(prvStyle => produce(prvStyle, drft => {
      const gridStyle = {
        display: 'grid',
        'grid-template-columns': colStr,
        width: '100%',
        'grid-row-gap': '10px',
        'column-gap': '10px',
      }

      const flxStyle = {
        display: 'flex',
        'flex-wrap': 'wrap',
        'margin-top': '8px',
      }

      drft.fields[fldKey].classes[`.${fldKey}-cc`] = value === '' ? flxStyle : gridStyle
    }))
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Column: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_column`, state: { fields: allFields, fldKey } }, setUpdateBtn)
    reCalculateFieldHeights(fldKey)
  }
  if (isDev) {
    window.selectedFieldData = fieldData
  }
  return (
    <div className="">
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ === 'check' ? 'Check Box' : 'Radio'}
        fieldKey={fldKey}
      />

      <FieldLabelSettings />

      <FieldSettingsDivider />

      {/* <SimpleAccordion
        title={__('Admin Label')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={hideAdminLabel}
        toggleChecked={fieldData?.adminLbl !== undefined}
        open={fieldData?.adminLbl !== undefined}
        disable={!fieldData?.adminLbl}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            ariaLabel="Admin label"
            value={adminLabel}
            changeAction={e => setAdminLabel(e)}
          />
        </div>
      </SimpleAccordion> */}
      <AdminLabelSettings />

      <FieldSettingsDivider />

      <SubTitleSettings />

      <FieldSettingsDivider />

      <HelperTxtSettings />

      <FieldSettingsDivider />

      {/* <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <FieldDisabledSettings />

      <FieldSettingsDivider /> */}

      <SimpleAccordion
        id="nam-stng"
        title={__('Name')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="nam-stng-inp"
            aria-label="Name for this Field"
            placeholder="Type field name here..."
            className={css(FieldStyle.input)}
            value={fieldName}
            onChange={handleFieldName}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      {/* <SimpleAccordion
        id="rqrd-stng"
        title={__('Required')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By disabling this option, the field required will be hidden"
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={setRadioRequired}
        toggleChecked={isRadioRequired}
        open
      >
        {(isRadioRequired || isOptionRequired) && (
          <ErrorMessageSettings
            id="rqrd-stng"
            type="req"
            title="Error Message"
            tipTitle="By enabling this feature, user will see the error message when required option is not checked"
          />
        )}
      </SimpleAccordion> */}
      {/* TODO this required settings should be checked by Md.abbas */}
      <RequiredSettings />

      <FieldSettingsDivider />

      <div className={`${css(FieldStyle.fieldSection)} ${css({ pr: 36 })}`}>
        <SingleToggle
          id="rnd-stng"
          tip="By disabling this option, the field rounded will be remove"
          title={__('Rounded')}
          action={e => setRound(e)}
          isChecked={isRound}
        />
      </div>

      <FieldSettingsDivider />
      <SimpleAccordion
        id="opt-clm-stng"
        title={__('Options Column')}
        className={css(FieldStyle.fieldSection)}
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="opt-clm-stng-inp"
            aria-label="Option Column"
            className={css(FieldStyle.input)}
            min="1"
            type="number"
            value={optionCol}
            onChange={setColumn}
          />
        </div>
      </SimpleAccordion>
      <FieldSettingsDivider />

      {/* <SingleInput inpType="text" title={__('Admin Label:')} value={adminLabel} action={setAdminLabel} /> */}

      {/* <SingleToggle title={__('Required:')} action={setRadioRequired} isChecked={isRadioRequired} disabled={isOptionRequired} className="mt-3" />
      {(isRadioRequired || isOptionRequired) && (
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message when required option is not checked"
        />
      )} */}
      {
        fieldData.typ === 'check' && (
          <>
            <SimpleAccordion
              id="mnmm-stng"
              title={__('Minimum')}
              className={css(FieldStyle.fieldSection)}
              tip="Set minimum number to be selected for checkbox option"
              isPro
            >
              {/* <div>
                <div className="flx mt-2 mb-2">
                  <h4 className="m-0">{__('Minimum:')}</h4>
                  <Cooltip width={250} icnSize={17} className="ml-2">
                    <div className="txt-body">{__('Set minimum number to be selected for checkbox option')}</div>
                  </Cooltip>
                  {!bits.isPro && <span className="pro-badge ml-2">{__('Pro')}</span>}
                </div>
                <input className="btcd-paper-inp" type="number" value={min} onChange={setMin} disabled={!isPro} />
              </div> */}
              <div className={css(FieldStyle.placeholder)}>
                <input
                  data-testid="mnmm-stng-inp"
                  aria-label="Minimum number"
                  className={css(FieldStyle.input)}
                  value={min}
                  type="text"
                  onChange={setMin}
                  disabled={!isPro}
                />
              </div>

              {fieldData.mn && (
                <ErrorMessageSettings
                  id="mnmm-stng"
                  type="mn"
                  title="Min Error Message"
                  tipTitle={`By enabling this feature, user will see the error message when selected checkbox is less than ${fieldData.mn}`}
                />
              )}
            </SimpleAccordion>

            <FieldSettingsDivider />

            <SimpleAccordion
              id="mxmm-stng"
              title={__('Maximum')}
              className={css(FieldStyle.fieldSection)}
              tip="Set maximum number to be selected for checkbox option"
              isPro
            >
              <div className={css(FieldStyle.placeholder)}>
                <input
                  data-testid="mxmm-stng-inp"
                  aria-label="maximim number"
                  className={css(FieldStyle.input)}
                  value={max}
                  type="number"
                  onChange={setMax}
                  disabled={!isPro}
                />
              </div>

              {fieldData.mx && (
                <>
                  <ErrorMessageSettings
                    id="mxmm-stng"
                    type="mx"
                    title="Max Error Message"
                    tipTitle={`By enabling this feature, user will see the error message when selected checkbox is greater than ${fieldData.mx}`}
                  />
                  <SingleToggle id="mxmm-slctd" title={__('Disable if maximum selected:')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" />
                </>
              )}
            </SimpleAccordion>

            <FieldSettingsDivider />

            {/* <div>
              <div className="flx mt-2 mb-2">
                <h4 className="m-0">{__('Maximum:')}</h4>
                <Cooltip width={250} icnSize={17} className="ml-2">
                  <div className="txt-body">{__('Set maximum number to be selected for checkbox option')}</div>
                </Cooltip>
                {!bits.isPro && <span className="pro-badge ml-2">{__('Pro')}</span>}
              </div>
              <input className="btcd-paper-inp" type="number" value={max} onChange={setMax} disabled={!isPro} />
            </div>
            {fieldData.mx && (
              <>
                <ErrorMessageSettings
                  type="mx"
                  title="Max Error Message"
                  tipTitle={`By enabling this feature, user will see the error message when selected checkbox is greater than ${fieldData.mx}`}
                />
                <SingleToggle title={__('Disable if maximum selected:')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" />
              </>
            )} */}

          </>
        )
      }
      <UniqFieldSettings
        type="userUnique"
        title="Validate as User Unique"
        tipTitle="Enabling this option will check from the user database whether its value is duplicate."
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        isUnique="show"
      />

      <FieldSettingsDivider />

      <OtherOptionSettings id={`${fldKey}-other-stng`} />

      <FieldSettingsDivider />

      {/* <SimpleAccordion
        title={__('Options')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <>
          <button onClick={openImportModal} className={css(app.btn)} type="button">
            <DownloadIcon size="16" />
            &nbsp;
            {__('Import Options')}
          </button>
          <div className="opt mt-1">
            <span className="font-w-m">{__('Options:')}</span>
            {options.map((itm, i) => (
              <div key={`opt-${i + 8}`} className="flx flx-between">
                <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={140} className="mt-0" />
                <div className="flx mt-1">
                  {fieldData.typ === 'check'
                    && (
                      <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Required')}'` }}>
                        <input aria-label="checkbox" onChange={(e) => setReq(e, i)} type="checkbox" checked={itm.req !== undefined} disabled={isRadioRequired} />
                        <span className="btcd-mrk ck br-50 " />
                      </label>
                    )}
                  <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Check by Default')}'` }}>
                    <input aria-label="checkbox" onChange={(e) => setCheck(e, i)} type="checkbox" checked={itm.check !== undefined} />
                    <span className="btcd-mrk ck br-50 " />
                  </label>
                  <button onClick={() => rmvOpt(i)} className={`${css(app.btn)} cls-btn`} type="button" aria-label="close"><CloseIcn size="12" /></button>
                </div>
              </div>
            ))}
            <button onClick={addOpt} className={`${css(app.btn)} blue`} type="button">
              {__('Add More +')}
            </button>
          </div>
        </>
      </SimpleAccordion> */}

      <div className={css(FieldStyle.fieldSection)}>
        <button data-testid="edt-opt-stng" onClick={openOptionModal} className={css(app.btn, { my: 0 })} type="button">
          &nbsp;
          {__('Edit Options')}
        </button>
      </div>
      <FieldSettingsDivider />
      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Options')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium')}
                  </span>
                </a>
              </div>
            </div>
          )}
          <EditOptions
            optionMdl={optionMdl}
            options={options}
            setOptions={newOpts => handleOptions(newOpts)}
            lblKey="lbl"
            valKey="val"
            type={fieldData.typ}
          />
        </div>
      </Modal>
      {/* <Modal
        md
        autoHeight
        show={importOpts.show}
        setModal={closeImportModal}
        className="o-v"
        title={__('Import Options')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium')}
                  </span>
                </a>
              </div>
            </div>
          )}
          <ImportOptions
            importOpts={importOpts}
            setImportOpts={setImportOpts}
            lblKey="lbl"
            valKey="val"
            customType={fieldData}
          />
        </div>
      </Modal> */}
    </div>
  )
}

export default memo(RadioCheckSettings)
