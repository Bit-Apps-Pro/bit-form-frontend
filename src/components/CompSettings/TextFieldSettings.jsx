import React from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'

export default function TextFieldSettings(props) {
  console.log(props)
  const isRequired = props.elm.data.valid.req
  function setRequired(e) {
    if (e.target.checked) {
      props.elm.data.valid.req = true
    } else {
      delete props.elm.data.valid.req
    }
    props.updateData(props.elm)
  }

  return (
    <div>
      <h4>Single line Field</h4>
      <SingleToggle title="Required:" action={setRequired} isChecked={isRequired} />
    </div>
  )
}