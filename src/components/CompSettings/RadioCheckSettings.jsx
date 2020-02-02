/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import React from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'

export default function RadioCheckSettings(props) {
  const label = props.elm.data.lbl === undefined ? '' : props.elm.data.lbl
  const isRound = props.elm.data.round !== undefined

  function setLabel(e) {
    if (e.target.value === '') {
      delete props.elm.data.lbl
    } else {
      props.elm.data.lbl = e.target.value
    }
    props.updateData(props.elm)
  }

  function setRound(e) {
    if (e.target.checked) {
      props.elm.data.round = true
    } else {
      delete props.elm.data.round
    }
    props.updateData(props.elm)
  }

  function rmvOpt(ind) {
    props.elm.data.opt.splice(ind, 1)
    props.updateData(props.elm)
  }

  function addOpt() {
    props.elm.data.opt.push({ lbl: `Option ${props.elm.data.opt.length}` })
    props.updateData(props.elm)
  }

  function setCheck(e, i) {
    if (props.elm.data.typ === 'radio') {
      props.elm.data.opt.map(itm => { delete itm.check })
    }

    if (e.target.checked) {
      props.elm.data.opt[i].check = true
    } else {
      delete props.elm.data.opt[i].check
    }
    props.updateData(props.elm)
  }

  function setReq(e, i) {
    if (e.target.checked) {
      props.elm.data.opt[i].req = true
    } else {
      delete props.elm.data.opt[i].req
    }
    props.updateData(props.elm)
  }

  function setOptLbl(e, i) {
    props.elm.data.opt[i].lbl = e.target.value
    props.updateData(props.elm)
  }

  return (
    <div>
      <h4>{props.elm.data.typ === 'check' ? 'Check' : 'Radio'} Boxs</h4>
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} className="mt-0" />
      <SingleToggle title="Rounded Checkbox:" action={setRound} isChecked={isRound} className="mt-3" />
      <div className="opt">
        Options:
        {props.elm.data.opt.map((itm, i) => (
          <div key={`opt-${i + 8}`} className="flx flx-between">
            <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={120} className="mt-0" />
            <div className="flx mt-3">
              {props.elm.data.typ === 'check'
                && (
                  <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': '"Required"' }}>
                    <input onChange={(e) => setReq(e, i)} type="checkbox" checked={itm.req !== undefined} />
                    <span className="btcd-mrk ck br-50 btcd-neo-sh-1" />
                  </label>
                )}
              <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': '"Check by Default"' }}>
                <input onChange={(e) => setCheck(e, i)} type="checkbox" checked={itm.check !== undefined} />
                <span className="btcd-mrk ck br-50 btcd-neo-sh-1" />
              </label>
              <button onClick={() => rmvOpt(i)} className="btn cls-btn btcd-neo-sh-1" type="button">&times;</button>
            </div>
          </div>
        ))}
        <button onClick={addOpt} className="btn btcd-neo-sh-1 blue" type="button">Add More +</button>
      </div>
    </div>
  )
}
