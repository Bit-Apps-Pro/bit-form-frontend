/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import React from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'
import CopyText from '../ElmSettings/Childs/CopyText'

export default function SelectSettings(props) {
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  const options = [...elmData.opt]
  let fldKey = elmId
  if ('lbl' in elmData) {
    fldKey = elmId + elmData.lbl.split(' ').join('_')
  }
  console.log('%c $render SelectSettings', 'background:gray;padding:3px;border-radius:5px;color:white')

  const isRequired = elmData.valid.req !== undefined
  const isMultiple = elmData.mul
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
    options.push({ label: `Option ${elmData.opt.length + 1}`, value: `option_${elmData.opt.length + 1}` })
    elmData.opt = options
    props.updateData({ id: elmId, data: elmData })
  }

  function setCheck(e) {
    if (e.target.checked) {
      if (isMultiple) {
        if (!Array.isArray(elmData.val)) {
          elmData.val = []
        }
        elmData.val.push(e.target.getAttribute('data-value'))
      } else {
        elmData.val = e.target.getAttribute('data-value')
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isMultiple) {
        elmData.val = elmData.val.filter(itm => itm !== e.target.getAttribute('data-value'))
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

  return (
    <div>
      <div className="mt-2 mb-2">
        <span className="font-w-m">Field Type : </span>
        {elmData.typ.charAt(0).toUpperCase() + elmData.typ.slice(1)}
      </div>
      <span className="font-w-m">Field Key</span>
      <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy" />
      <SingleToggle title="Required:" action={setRequired} isChecked={isRequired} />
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} />
      <SingleToggle title="Multiple Select:" action={setMultiple} isChecked={isMultiple} className="mt-3" />
      {elmData.typ.match(/^(text|url|password|number|email|select)$/) && <SingleInput inpType="text" title="Placeholder:" value={placeholder} action={setPlaceholder} />}
      <div className="opt">
        <span className="font-w-m">Options:</span>
        {elmData.opt.map((itm, i) => (
          <div key={`opt-${i + 8}`} className="flx flx-between">
            <SingleInput inpType="text" value={itm.label} action={e => setOptLbl(e, i)} width={140} className="mt-0" />
            <div className="flx mt-2">
              <label className="btcd-ck-wrp tooltip" style={{ '--tooltip-txt': '"Check by Default"' }}>
                <input onChange={setCheck} type="checkbox" data-value={itm.value} checked={typeof elmData.val === 'string' ? elmData.val === itm.value : elmData.val.some(d => d === itm.value)} />
                <span className="btcd-mrk ck br-50" />
              </label>
              <button onClick={() => rmvOpt(i)} className="btn cls-btn" type="button"><span className="btcd-icn icn-clear" /></button>
            </div>
          </div>
        ))}
        <button onClick={addOpt} className="btn blue" type="button">Add More +</button>
      </div>
    </div>
  )
}
