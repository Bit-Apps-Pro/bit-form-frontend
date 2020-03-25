/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import React from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'

export default function SelectSettings(props) {
  console.log('%c $render SelectSettings', 'background:gray;padding:3px;border-radius:5px;color:white')

  const isRequired = props.elm.data.valid.req !== undefined
  const isMultiple = props.elm.data.mul !== undefined
  const label = props.elm.data.lbl === undefined ? '' : props.elm.data.lbl
  const placeholder = props.elm.data.ph === undefined ? '' : props.elm.data.ph

  // set defaults
  if (isMultiple) {
    if ('val' in props.elm.data) {
      if (!Array.isArray(props.elm.data.val)) {
        props.elm.data.val = [props.elm.data.val]
      }
    } else {
      props.elm.data.val = []
    }
  }

  function setRequired(e) {
    if (e.target.checked) {
      props.elm.data.valid.req = true
    } else {
      delete props.elm.data.valid.req
    }
    props.updateData(props.elm)
  }

  function setLabel(e) {
    if (e.target.value === '') {
      delete props.elm.data.lbl
    } else {
      props.elm.data.lbl = e.target.value
    }
    props.updateData(props.elm)
  }

  function setPlaceholder(e) {
    if (e.target.value === '') {
      delete props.elm.data.ph
    } else {
      props.elm.data.ph = e.target.value
    }
    props.updateData(props.elm)
  }

  function setMultiple(e) {
    if (e.target.checked) {
      props.elm.data.mul = true
    } else {
      delete props.elm.data.mul
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

  function setCheck(e) {
    if (e.target.checked) {
      if (isMultiple) {
        if (!Array.isArray(props.elm.data.val)) {
          props.elm.data.val = []
        }
        props.elm.data.val.push(e.target.getAttribute('data-lbl'))
      } else {
        props.elm.data.val = e.target.getAttribute('data-lbl')
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isMultiple) {
        props.elm.data.val = props.elm.data.val.filter(itm => itm !== e.target.getAttribute('data-lbl'))
      } else {
        delete props.elm.data.val
      }
    }
    props.updateData(props.elm)
  }

  function setOptLbl(e, i) {
    props.elm.data.opt[i].lbl = e.target.value
    props.updateData(props.elm)
  }
  return (
    <div>
      <h4>
        Text Field (
        {props.elm.data.typ}
        )
      </h4>
      <SingleToggle title="Required:" action={setRequired} isChecked={isRequired} />
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} />
      <SingleToggle title="Multiple Select:" action={setMultiple} isChecked={isMultiple} className="mt-3" />
      {props.elm.data.typ.match(/^(text|url|password|number|email|select)$/) && <SingleInput inpType="text" title="Placeholder:" value={placeholder} action={setPlaceholder} />}
      <div className="opt">
        Options:
        {props.elm.data.opt.map((itm, i) => (
        <div key={`opt-${i + 8}`} className="flx flx-between">
          <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={120} className="mt-0" />
          <div className="flx mt-3">
            <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': '"Check by Default"' }}>
              <input onChange={setCheck} type="checkbox" data-lbl={itm.lbl} checked={isMultiple ? props.elm.data.val.indexOf(itm.lbl) >= 0 : itm.lbl === props.elm.data.val} />
              <span className="btcd-mrk ck br-50 btcd-neu-sh-1" />
            </label>
            <button onClick={() => rmvOpt(i)} className="btn cls-btn btcd-neu-sh-1" type="button">&times;</button>
          </div>
        </div>
      ))}
        <button onClick={addOpt} className="btn btcd-neu-sh-1 blue" type="button">Add More +</button>
      </div>
    </div>
  )
}
