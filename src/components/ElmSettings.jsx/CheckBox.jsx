/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Label from './Childs/Label'
import Options from './Childs/Options'
import RoundedInput from './Childs/RoundedInput'

export default function CheckBox(props) {
  let label = ''

  props.elm.data.child.map(el => {
    if (el.tag === 'label') {
      label = el.child
    }
    return null
  })

  return (
    <div>
      <h4>Multiple Select Check Box</h4>
      <Label label={label} elm={props.elm} updateData={props.updateData} />
      <RoundedInput label={label} elm={props.elm} updateData={props.updateData} />
      <Options type="check" elm={props.elm} updateData={props.updateData} />
    </div>
  )
}
