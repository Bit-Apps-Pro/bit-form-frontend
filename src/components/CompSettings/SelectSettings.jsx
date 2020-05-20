/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import React from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'

export default function SelectSettings(props) {
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  const options = [...elmData.opt]
  console.log('%c $render SelectSettings', 'background:gray;padding:3px;border-radius:5px;color:white')

  const isRequired = elmData.valid.req !== undefined
  const isMultiple = elmData.mul !== undefined
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const placeholder = elmData.ph === undefined ? '' : elmData.ph

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

  function rmvOpt(ind) {
    options.splice(ind, 1)
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function addOpt() {
    options.push({ lbl: `Option ${elmData.opt.length}` })
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function setCheck(e) {
    if (e.target.checked) {
      if (isMultiple) {
        if (!Array.isArray(elmData.val)) {
          elmData.val = []
        }
        elmData.val.push(e.target.getAttribute('data-lbl'))
      } else {
        elmData.val = e.target.getAttribute('data-lbl')
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isMultiple) {
        elmData.val = elmData.val.filter(itm => itm !== e.target.getAttribute('data-lbl'))
      } else {
        delete elmData.val
      }
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setOptLbl(e, i) {
    const tmp = { ...options[i] }
    tmp.lbl = e.target.value
    elmData.opt[i] = tmp
    props.updateData({ id: elmId, data: elmData })
  }

  return (
    <div>
      <h4>
        Text Field (
        {elmData.typ}
        )
      </h4>
      <SingleToggle title="Required:" action={setRequired} isChecked={isRequired} />
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} />
      <SingleToggle title="Multiple Select:" action={setMultiple} isChecked={isMultiple} className="mt-3" />
      {elmData.typ.match(/^(text|url|password|number|email|select)$/) && <SingleInput inpType="text" title="Placeholder:" value={placeholder} action={setPlaceholder} />}
      <div className="opt">
        Options:
        {elmData.opt.map((itm, i) => (
        <div key={`opt-${i + 8}`} className="flx flx-between">
          <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={120} className="mt-0" />
          <div className="flx mt-3">
            <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': '"Check by Default"' }}>
              <input onChange={setCheck} type="checkbox" data-lbl={itm.lbl} checked={isMultiple ? elmData.val.indexOf(itm.lbl) >= 0 : itm.lbl === elmData.val} />
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
