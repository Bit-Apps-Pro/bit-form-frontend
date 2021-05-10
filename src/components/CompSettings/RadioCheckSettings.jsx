/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { memo } from 'react'
import { __ } from '../../Utils/i18nwrap'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import CopyText from '../Utilities/CopyText'
import Back2FldList from './Back2FldList'
import CloseIcn from '../../Icons/CloseIcn'

function RadioCheckSettings(props) {
  console.log('%c $render RadioCheckSettings', 'background:royalblue;padding:3px;border-radius:5px;color:white')
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  const options = [...props.fields[elmId].opt]
  const fldKey = elmId
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const adminLabel = elmData.adminLbl === undefined ? '' : elmData.adminLbl
  const isRound = elmData.round !== undefined

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
        <button onClick={addOpt} className="btn blue" type="button">{__('Add More +', 'bitform')}</button>
      </div>
    </div>
  )
}
export default memo(RadioCheckSettings)
