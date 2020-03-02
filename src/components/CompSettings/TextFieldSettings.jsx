/* eslint-disable no-param-reassign */
import React, { memo } from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'

function TextFieldSettings(props) {
  const isRequired = props.elm.data.valid.req !== undefined
  const isAutoComplete = props.elm.data.ac === 'on'
  const label = props.elm.data.lbl === undefined ? '' : props.elm.data.lbl
  const placeholder = props.elm.data.ph === undefined ? '' : props.elm.data.ph
  const min = props.elm.data.mn === undefined ? '' : props.elm.data.mn
  const max = props.elm.data.mx === undefined ? '' : props.elm.data.mx

  function setRequired(e) {
    if (e.target.checked) {
      props.elm.data.valid.req = true
    } else {
      delete props.elm.data.valid.req
    }
    props.updateData(props.elm)
  }

  function setAutoComplete(e) {
    if (e.target.checked) {
      props.elm.data.ac = 'on'
    } else {
      delete props.elm.data.ac
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

  function setMin(e) {
    if (e.target.value === '') {
      delete props.elm.data.mn
    } else {
      props.elm.data.mn = e.target.value
    }
    props.updateData(props.elm)
  }

  function setMax(e) {
    if (e.target.value === '') {
      delete props.elm.data.mx
    } else {
      props.elm.data.mx = e.target.value
    }
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
      {props.elm.data.typ !== 'textarea'
        && props.elm.data.typ.match(/^(text|url|password|number|email|)$/)
        && <SingleToggle title="Auto Complete:" action={setAutoComplete} isChecked={isAutoComplete} className="mt-3" />}
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} />
      {props.elm.data.typ.match(/^(text|url|password|number|email|)$/) && <SingleInput inpType="text" title="Placeholder:" value={placeholder} action={setPlaceholder} />}
      {props.elm.data.typ === 'number' && <SingleInput inpType="number" title="Min:" value={min} action={setMin} width={100} className="ml-4" />}
      {props.elm.data.typ === 'number' && <SingleInput inpType="number" title="Max:" value={max} action={setMax} width={100} />}
    </div>
  )
}

export default memo(TextFieldSettings)
