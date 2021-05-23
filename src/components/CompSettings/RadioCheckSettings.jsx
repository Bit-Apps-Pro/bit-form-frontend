/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { memo, useState } from 'react'
import CloseIcn from '../../Icons/CloseIcn'
import DownloadIcon from '../../Icons/DownloadIcon'
import { __ } from '../../Utils/i18nwrap'
import CopyText from '../Utilities/CopyText'
import Modal from '../Utilities/Modal'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import Back2FldList from './Back2FldList'
import ImportOptions from './ImportOptions'

function RadioCheckSettings(props) {
  console.log('%c $render RadioCheckSettings', 'background:royalblue;padding:3px;border-radius:5px;color:white')
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  const options = [...props.fields[elmId].opt]
  const fldKey = elmId
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const adminLabel = elmData.adminLbl === undefined ? '' : elmData.adminLbl
  const isRound = elmData.round !== undefined
  const [importOpts, setImportOpts] = useState({ dataSrc: 'fileupload' })

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

  function setRound(e) {
    if (e.target.checked) {
      elmData.round = true
    } else {
      delete elmData.round
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function rmvOpt(ind) {
    options.splice(ind, 1)
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function addOpt() {
    options.push({ lbl: `Option ${options.length + 1}` })
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function setCheck(e, i) {
    if (elmData.typ === 'radio') {
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
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function setReq(e, i) {
    if (e.target.checked) {
      const tmp = { ...options[i] }
      tmp.req = true
      options[i] = tmp
    } else {
      delete options[i].req
    }
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function setOptLbl(e, i) {
    const tmp = { ...options[i] }
    tmp.lbl = e.target.value
    options[i] = tmp
    elmData.opt = options
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
    <div className="mr-4 ml-2">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        {elmData.typ === 'check' ? 'Check Box' : 'Radio'}
      </div>
      <span className="font-w-m">{__('Field Key', 'bitform')}</span>
      <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy" />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      <SingleInput inpType="text" title={__('Field Label:', 'bitform')} value={label} action={setLabel} />
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
            <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={120} className="mt-0" />
            <div className="flx mt-1">
              {elmData.typ === 'check'
                && (
                  <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': `'${__('Required', 'bitform')}'` }}>
                    <input onChange={(e) => setReq(e, i)} type="checkbox" checked={itm.req !== undefined} />
                    <span className="btcd-mrk ck br-50 " />
                  </label>
                )}
              <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': `'${__('Check by Default', 'bitform')}'` }}>
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
            elmId={elmId}
            elmData={elmData}
            updateData={props.updateData}
            lblKey="lbl"
            valKey="val"
          />
        </div>
      </Modal>
    </div>
  )
}

export default memo(RadioCheckSettings)
