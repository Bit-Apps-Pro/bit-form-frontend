/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import React, { memo } from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'

function RadioCheckSettings(props) {
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  const options = [...props.fields[elmId].opt]
  console.log('^', elmData)
  console.log('%c $render RadioCheckSettings', 'background:royalblue;padding:3px;border-radius:5px;color:white')

  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const isRound = elmData.round !== undefined

  function setLabel(e) {
    if (e.target.value === '') {
      delete elmData.lbl
    } else {
      elmData.lbl = e.target.value
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
    <div>
      <h4>
        {elmData.typ === 'check' ? 'Check' : 'Radio'}
        {' '}
        Boxs
      </h4>
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} className="mt-0" />
      <SingleToggle title="Rounded:" action={setRound} isChecked={isRound} className="mt-3" />
      <div className="opt">
        Options:
        {options.map((itm, i) => (
        <div key={`opt-${i + 8}`} className="flx flx-between">
          <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={120} className="mt-0" />
          <div className="flx mt-1">
            {elmData.typ === 'check'
              && (
                <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': '"Required"' }}>
                  <input onChange={(e) => setReq(e, i)} type="checkbox" checked={itm.req !== undefined} />
                  <span className="btcd-mrk ck br-50 " />
                </label>
              )}
            <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': '"Check by Default"' }}>
              <input onChange={(e) => setCheck(e, i)} type="checkbox" checked={itm.check !== undefined} />
              <span className="btcd-mrk ck br-50 " />
            </label>
            <button onClick={() => rmvOpt(i)} className="btn cls-btn" type="button" aria-label="close"><span className="btcd-icn icn-clear" /></button>
          </div>
        </div>
      ))}
        <button onClick={addOpt} className="btn blue" type="button">Add More +</button>
      </div>
    </div>
  )
}
export default memo(RadioCheckSettings)
