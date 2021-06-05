/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { useState } from 'react'
import { __ } from '../../Utils/i18nwrap'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import CopyText from '../Utilities/CopyText'
import Back2FldList from './Back2FldList'
import CloseIcn from '../../Icons/CloseIcn'
import ImportOptions from './ImportOptions'
import Modal from '../Utilities/Modal'
import DownloadIcon from '../../Icons/DownloadIcon'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'

export default function SelectSettings(props) {
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  const options = [...elmData.opt]
  const fldKey = elmId
  const isRequired = elmData.valid.req !== undefined
  const isMultiple = elmData.mul
  const allowCustomOpt = elmData.customOpt !== undefined
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const adminLabel = elmData.adminLbl === undefined ? '' : elmData.adminLbl
  const placeholder = elmData.ph === undefined ? '' : elmData.ph
  const [importOpts, setImportOpts] = useState({ dataSrc: 'fileupload' })

  // set defaults
  if (isMultiple) {
    if ('val' in elmData) {
      if (!Array.isArray(elmData.val)) {
        elmData.val = [elmData.val]
      }
    } else {
      elmData.val = []
    }
  }

  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...elmData.valid }
      tmp.req = true
      elmData.valid = tmp
      if (!elmData.err) elmData.err = {}
      if (!elmData.err.req) elmData.err.req = {}
      elmData.err.req.dflt = '<p>This field is required</p>'
      elmData.err.req.show = true
    } else {
      delete elmData.valid.req
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setLabel(e) {
    if (e.target.value === '') {
      delete elmData.lbl
    } else {
      elmData.lbl = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete elmData.adminLbl
    } else {
      elmData.adminLbl = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setPlaceholder(e) {
    if (e.target.value === '') {
      delete elmData.ph
    } else {
      elmData.ph = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setMultiple(e) {
    if (e.target.checked) {
      elmData.mul = true
    } else {
      delete elmData.mul
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setAllowCustomOption(e) {
    if (e.target.checked) {
      elmData.customOpt = true
    } else {
      delete elmData.customOpt
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function rmvOpt(ind) {
    options.splice(ind, 1)
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function addOpt() {
    options.push({ label: `Option ${elmData.opt.length + 1}`, value: `Option ${elmData.opt.length + 1}` })
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function setCheck(e) {
    if (e.target.checked) {
      if (isMultiple) {
        if (!Array.isArray(elmData.val)) {
          elmData.val = []
        }
        // elmData.val.push(e.target.getAttribute('data-value'))
        elmData.val = [...elmData.val, e.target.getAttribute('data-value')]
      } else {
        elmData.val = e.target.getAttribute('data-value')
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isMultiple) {
        elmData.val = [...elmData.val.filter(itm => itm !== e.target.getAttribute('data-value'))]
      } else {
        delete elmData.val
      }
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setOptLbl(e, i) {
    const updateVal = e.target.value
    const tmp = { ...options[i] }
    tmp.label = updateVal
    tmp.value = updateVal.replace(',', '_')
    elmData.opt[i] = tmp
    props.updateData({ id: elmId, data: elmData })
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
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        {elmData.typ.charAt(0).toUpperCase() + elmData.typ.slice(1)}
      </div>
      <div className="flx">
        <span className="font-w-m mr-1">{__('Field Key : ', 'bitform')}</span>
        <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy m-0 w-7" />
      </div>
      <SingleInput inpType="text" title={__('Field Label:', 'bitform')} value={label} action={setLabel} />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      {elmData.typ.match(/^(text|url|password|number|email|select)$/) && <SingleInput inpType="text" title={__('Placeholder:', 'bitform')} value={placeholder} action={setPlaceholder} />}
      <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={isRequired} className="mt-3" />
      {elmData?.valid?.req && (
        <ErrorMessageSettings
          elmId={elmId}
          elmData={elmData}
          type="req"
          title="Error Message"
          updateAction={() => props.updateData({ id: elmId, data: elmData })}
        />
      )}
      <SingleToggle title={__('Multiple Select:', 'bitform')} action={setMultiple} isChecked={isMultiple} className="mt-3" />
      <SingleToggle title={__('Allow Other Option:', 'bitform')} action={setAllowCustomOption} isChecked={allowCustomOpt} className="mt-3 mb-2" />
      <button onClick={openImportModal} className="btn" type="button">
        <DownloadIcon size="16" />
        &nbsp;
        {__('Import Options', 'bitform')}
      </button>
      <div className="opt">
        <span className="font-w-m">{__('Options:', 'bitform')}</span>
        {elmData.opt.map((itm, i) => (
          <div key={`opt-${i + 8}`} className="flx flx-between">
            <SingleInput inpType="text" value={itm.label} action={e => setOptLbl(e, i)} width={140} className="mt-0" />
            <div className="flx mt-2">
              <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': `'${__('Check by Default', 'bitform')}'` }}>
                <input onChange={setCheck} type="checkbox" data-value={itm.value} checked={typeof elmData.val === 'string' ? elmData.val === itm.value : elmData?.val?.some(d => d === itm.value)} />
                <span className="btcd-mrk ck br-50" />
              </label>
              <button onClick={() => rmvOpt(i)} className="btn cls-btn" type="button" aria-label="remove option"><CloseIcn size="14" /></button>
            </div>
          </div>
        ))}
        <button onClick={addOpt} className="btn blue" type="button">{__('Add More +', 'bitform')}</button>
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
            elmId={elmId}
            elmData={elmData}
            updateData={props.updateData}
            lblKey="label"
            valKey="value"
          />
        </div>
      </Modal>
    </div>
  )
}
