/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react';
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'
import CopyText from '../ElmSettings/Childs/CopyText'
import Back2FldList from './Back2FldList'

function TextFieldSettings(props) {
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  console.log('%c $render TextFieldSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const isRequired = elmData.valid.req !== undefined
  const isAutoComplete = elmData.ac === 'on'
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const placeholder = elmData.ph === undefined ? '' : elmData.ph
  const min = elmData.mn === undefined ? '' : elmData.mn
  const max = elmData.mx === undefined ? '' : elmData.mx
  const fldKey = elmId

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

  function setAutoComplete(e) {
    if (e.target.checked) {
      elmData.ac = 'on'
    } else {
      delete elmData.ac
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

  function setMin(e) {
    if (e.target.value === '') {
      delete elmData.mn
    } else {
      elmData.mn = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setMax(e) {
    if (e.target.value === '') {
      delete elmData.mx
    } else {
      elmData.mx = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  return (
    <div className="mr-4 ml-2">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {elmData.typ.charAt(0).toUpperCase() + elmData.typ.slice(1)}
      </div>
      <span className="font-w-m">Field Key</span>
      <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy" />
      <SingleToggle title="Required:" action={setRequired} isChecked={isRequired} className="mt-3" />
      {elmData.typ !== 'textarea'
        && elmData.typ.match(/^(text|url|password|number|email|)$/)
        && <SingleToggle title="Auto Fill:" action={setAutoComplete} isChecked={isAutoComplete} className="mt-3" />}
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} />
      {elmData.typ.match(/^(text|url|textarea|password|number|email|)$/) && <SingleInput inpType="text" title="Placeholder:" value={placeholder} action={setPlaceholder} />}
      {elmData.typ === 'number' && <SingleInput inpType="number" title="Min:" value={min} action={setMin} width={100} className="mr-4" />}
      {elmData.typ === 'number' && <SingleInput inpType="number" title="Max:" value={max} action={setMax} width={100} />}
    </div>
  )
}

export default memo(TextFieldSettings)
