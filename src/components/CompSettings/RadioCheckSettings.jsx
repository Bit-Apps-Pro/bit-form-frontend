/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { memo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import DownloadIcon from '../../Icons/DownloadIcon'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import CopyText from '../Utilities/CopyText'
import Modal from '../Utilities/Modal'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import Back2FldList from './Back2FldList'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import ImportOptions from './ImportOptions'

function RadioCheckSettings() {
  console.log('%c $render RadioCheckSettings', 'background:royalblue;padding:3px;border-radius:5px;color:white')
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const options = deepCopy(fields[fldKey].opt)
  const adminLabel = fieldData.adminLbl || ''
  const isRound = fieldData.round || false
  const isRadioRequired = fieldData.valid.req || false
  const isOptionRequired = fieldData.opt.find(opt => opt.req)
  const [importOpts, setImportOpts] = useState({ dataSrc: 'fileupload' })

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  function setRound(e) {
    if (e.target.checked) {
      fieldData.round = true
    } else {
      delete fieldData.round
    }
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  function rmvOpt(ind) {
    options.splice(ind, 1)
    fieldData.opt = options
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  function addOpt() {
    options.push({ lbl: `Option ${options.length + 1}` })
    fieldData.opt = options
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
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
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
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

    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
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
    }
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  function setOptLbl(e, i) {
    const tmp = { ...options[i] }
    tmp.lbl = e.target.value
    options[i] = tmp
    fieldData.opt = options
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  const openImportModal = () => {
    importOpts.show = true
    setImportOpts({ ...importOpts })
  }

  const closeImportModal = () => {
    delete importOpts.show
    setImportOpts({ ...importOpts })
  }

  return (
    <div className="mr-4 ml-2">
      <Back2FldList />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        {fieldData.typ === 'check' ? 'Check Box' : 'Radio'}
      </div>
      <div className="flx">
        <span className="font-w-m w-4">{__('Field Key : ', 'bitform')}</span>
        <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy m-0" />
      </div>
      <FieldLabelSettings />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      <SingleToggle title={__('Required:', 'bitform')} action={setRadioRequired} isChecked={isRadioRequired} disabled={isOptionRequired} className="mt-3" />
      {(isRadioRequired || isOptionRequired) && (
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message when required option is not checked"
        />
      )}
      <SingleToggle title={__('Rounded:', 'bitform')} action={setRound} isChecked={isRound} className="mt-3" />
      <button onClick={openImportModal} className="btn" type="button">
        <DownloadIcon size="16" />
        &nbsp;
        {__('Import Options', 'bitform')}
      </button>
      <div className="opt">
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
              <button onClick={() => rmvOpt(i)} className="btn cls-btn" type="button" aria-label="close"><CloseIcn size="12" /></button>
            </div>
          </div>
        ))}
        <button onClick={addOpt} className="btn blue" type="button">
          {__('Add More +', 'bitform')}
        </button>
      </div>
      <Modal
        md
        autoHeight
        show={importOpts.show}
        setModal={closeImportModal}
        title={__('Import Options', 'bitform')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://bitpress.pro/" target="_blank" rel="noreferrer">
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
          />
        </div>
      </Modal>
    </div>
  )
}

export default memo(RadioCheckSettings)
