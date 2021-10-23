/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import DownloadIcon from '../../Icons/DownloadIcon'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import UniqField from './CompSettingsUtils/UniqField'
import ImportOptions from './ImportOptions'
import Option from './Option'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function RadioCheckSettings() {
  console.log('%c $render RadioCheckSettings', 'background:royalblue;padding:3px;border-radius:5px;color:white')
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const options = deepCopy(fields[fldKey].opt)
  const adminLabel = fieldData.adminLbl || ''
  const isRound = fieldData.round || false
  const isRadioRequired = fieldData.valid.req || false
  const isOptionRequired = fieldData.opt.find(opt => opt.req)
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const dataSrc = fieldData?.customType?.type || 'fileupload'
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

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
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Admin label Added', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setRound(e) {
    if (e.target.checked) {
      fieldData.round = true
    } else {
      delete fieldData.round
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option Rounded ${e.target.checked}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function rmvOpt(ind) {
    options.splice(ind, 1)
    fieldData.opt = options
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Option Remove', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function addOpt() {
    options.push({ lbl: `Option ${options.length + 1}` })
    fieldData.opt = options
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'New Option added', state: { fields: allFields, fldKey } }, setUpdateBtn)
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
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Default option ${e.target.checked ? 'added' : 'remove'}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
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

    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Required option ${e.target.checked ? 'added' : 'remove'}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setRadioRequired = e => {
    console.log('set radio required')
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
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Radio Required ${e.target.checked}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setOptLbl(e, i) {
    const tmp = { ...options[i] }
    tmp.lbl = e.target.value
    options[i] = tmp
    fieldData.opt = options
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Option label Added', state: { fields: allFields, fldKey } }, setUpdateBtn)
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
      setRadioRequired({ target: { checked: false } })
    } else {
      fieldData.mn = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mn) fieldData.err.mn = {}
      fieldData.err.mn.dflt = `<p>Minimum ${e.target.value} option${Number(e.target.value) > 1 ? 's' : ''}<p>`
      fieldData.err.mn.show = true
      if (!isOptionRequired) setRadioRequired({ target: { checked: true } })
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Hide ${!e.target.checked} ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
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
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Set Maximum number ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setDisabledOnMax = e => {
    if (!isPro) return
    if (e.target.checked) {
      fieldData.valid.disableOnMax = true
    } else {
      delete fieldData.valid.disableOnMax
    }

    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Disable ${!e.target.checked} ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideAdminLabel = (e) => {
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
    } else {
      delete fieldData.adminLbl
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Hide ${!e.target.checked} ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div className="">
      <FieldSettingTitle title="Field Settings" subtitle={fieldData.typ === 'check' ? 'Check Box' : 'Radio'} fieldKey={fldKey} />

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

      <SimpleAccordion
        title={__('Required', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={setRadioRequired}
        toggleChecked={isRadioRequired}
        open
      >
        {(isRadioRequired || isOptionRequired) && (
          <ErrorMessageSettings
            type="req"
            title="Error Message"
            tipTitle="By enabling this feature, user will see the error message when required option is not checked"
          />
        )}
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <div className={`${css(FieldStyle.fieldSection)} ${css(ut.pr8)}`}>
        <SingleToggle title={__('Rounded:', 'bitform')} action={setRound} isChecked={isRound} />
      </div>

      <hr className={css(FieldStyle.divider)} />

      {/* <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} /> */}

      {/* <SingleToggle title={__('Required:', 'bitform')} action={setRadioRequired} isChecked={isRadioRequired} disabled={isOptionRequired} className="mt-3" />
      {(isRadioRequired || isOptionRequired) && (
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message when required option is not checked"
        />
      )} */}
      {/* <SingleToggle title={__('Rounded:', 'bitform')} action={setRound} isChecked={isRound} className="mt-3" /> */}
      {
        fieldData.typ === 'check' && (
          <>
            <SimpleAccordion
              title={__('Minimum', 'bitform')}
              className={css(FieldStyle.fieldSection)}
              tip="Set minimum number to be selected for checkbox option"
              open
              isPro
            >
              {/* <div>
                <div className="flx mt-2 mb-2">
                  <h4 className="m-0">{__('Minimum:', 'bitform')}</h4>
                  <Cooltip width={250} icnSize={17} className="ml-2">
                    <div className="txt-body">{__('Set minimum number to be selected for checkbox option', 'bitform')}</div>
                  </Cooltip>
                  {!bits.isPro && <span className="pro-badge ml-2">{__('Pro', 'bitform')}</span>}
                </div>
                <input className="btcd-paper-inp" type="number" value={min} onChange={setMin} disabled={!isPro} />
              </div> */}
              <div className={css(FieldStyle.placeholder)}>
                <input aria-label="Minimum number" className={css(FieldStyle.input)} value={min} type="text" onChange={setMin} disabled={!isPro} />
              </div>

              {fieldData.mn && (
                <ErrorMessageSettings
                  type="mn"
                  title="Min Error Message"
                  tipTitle={`By enabling this feature, user will see the error message when selected checkbox is less than ${fieldData.mn}`}
                />
              )}
            </SimpleAccordion>

            <hr className={css(FieldStyle.divider)} />

            <SimpleAccordion
              title={__('Minimum', 'bitform')}
              className={css(FieldStyle.fieldSection)}
              tip="Set maximum number to be selected for checkbox option"
              open
              isPro
            >
              <div className={css(FieldStyle.placeholder)}>
                <input aria-label="minimim number" className={css(FieldStyle.input)} value={max} type="number" onChange={setMax} disabled={!isPro} />
              </div>

              {fieldData.mx && (
                <>
                  <ErrorMessageSettings
                    type="mx"
                    title="Max Error Message"
                    tipTitle={`By enabling this feature, user will see the error message when selected checkbox is greater than ${fieldData.mx}`}
                  />
                  <SingleToggle title={__('Disable if maximum selected:', 'bitform')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" />
                </>
              )}
            </SimpleAccordion>

            <hr className={css(FieldStyle.divider)} />

            {/* <div>
              <div className="flx mt-2 mb-2">
                <h4 className="m-0">{__('Maximum:', 'bitform')}</h4>
                <Cooltip width={250} icnSize={17} className="ml-2">
                  <div className="txt-body">{__('Set maximum number to be selected for checkbox option', 'bitform')}</div>
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
                  tipTitle={`By enabling this feature, user will see the error message when selected checkbox is greater than ${fieldData.mx}`}
                />
                <SingleToggle title={__('Disable if maximum selected:', 'bitform')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" />
              </>
            )} */}

          </>
        )
      }
      <div className="pos-rel">
        {/* {!bits.isPro && (
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
        )} */}
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

      <SimpleAccordion
        title={__('Options', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <>
          <button onClick={openImportModal} className={css(app.btn)} type="button">
            <DownloadIcon size="16" />
            &nbsp;
            {__('Import Options', 'bitform')}
          </button>
          <div className="opt mt-1">
            <span className="font-w-m">{__('Options:', 'bitform')}</span>
            {options.map((itm, i) => (
              <div key={`opt-${i + 8}`} className="flx flx-between">
                <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={140} className="mt-0" />
                <div className="flx mt-1">
                  {fieldData.typ === 'check'
                    && (
                      <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Required', 'bitform')}'` }}>
                        <input aria-label="checkbox" onChange={(e) => setReq(e, i)} type="checkbox" checked={itm.req !== undefined} disabled={isRadioRequired} />
                        <span className="btcd-mrk ck br-50 " />
                      </label>
                    )}
                  <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Check by Default', 'bitform')}'` }}>
                    <input aria-label="checkbox" onChange={(e) => setCheck(e, i)} type="checkbox" checked={itm.check !== undefined} />
                    <span className="btcd-mrk ck br-50 " />
                  </label>
                  <button onClick={() => rmvOpt(i)} className={`${css(app.btn)} cls-btn`} type="button" aria-label="close"><CloseIcn size="12" /></button>
                </div>
              </div>
            ))}
            <button onClick={addOpt} className={`${css(app.btn)} blue`} type="button">
              {__('Add More +', 'bitform')}
            </button>
          </div>
        </>
      </SimpleAccordion>
      <hr className={css(FieldStyle.divider)} />

      {/* <button onClick={openImportModal} className={css(app.btn)} type="button">
        <DownloadIcon size="16" />
        &nbsp;
        {__('Import Options', 'bitform')}
      </button>
      <br />
      <button onClick={openOptionModal} className={css(app.btn)} type="button">
        &nbsp;
        {__('Edit Options', 'bitform')}
      </button>
      {/* <div className="opt mt-1">
        <span className="font-w-m">{__('Options:', 'bitform')}</span>
        {options.map((itm, i) => (
          <div key={`opt-${i + 8}`} className="flx flx-between">
            <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={140} className="mt-0" />
            <div className="flx mt-1">
              {fieldData.typ === 'check'
                && (
                  <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Required', 'bitform')}'` }}>
                    <input onChange={(e) => setReq(e, i)} type="checkbox" checked={itm.req !== undefined} disabled={isRadioRequired} />
                    <span className="btcd-mrk ck br-50 " />
                  </label>
                )}
              <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Check by Default', 'bitform')}'` }}>
                <input onChange={(e) => setCheck(e, i)} type="checkbox" checked={itm.check !== undefined} />
                <span className="btcd-mrk ck br-50 " />
              </label>
              <button onClick={() => rmvOpt(i)} className={`${css(app.btn)} cls-btn`} type="button" aria-label="close"><CloseIcn size="12" /></button>
            </div>
          </div>
        ))}
        <button onClick={addOpt} className={`${css(app.btn)} blue`} type="button">
          {__('Add More +', 'bitform')}
        </button>
      </div> */}
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
          <Option
            options={options}
            lblKey="lbl"
            valKey="val"
            type={fieldData.typ}
          />
        </div>
      </Modal>
      <Modal
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
            lblKey="lbl"
            valKey="val"
            customType={fieldData}
          />
        </div>
      </Modal>
    </div>
  )
}

export default memo(RadioCheckSettings)
