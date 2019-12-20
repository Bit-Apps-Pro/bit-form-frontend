/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Label from './Childs/Label'
import Required from './Childs/Required'
import Placeholder from './Childs/Placeholder'

export default function TextFieldSettings(props) {
  let isChecked = true
  let label = ''
  let placeholder = ''
  let tag = ''

  props.elm.data.child.map(el => {
    if (el.tag === 'input') {
      tag = 'input'
      if ('required' in el.attr) {
        isChecked = el.attr.required
      } else {
        isChecked = false
      }
      placeholder = el.attr.placeholder
    } else if (el.tag === 'label') {
      label = el.child
    }
    return null
  })
  return (
    <div>
      <Required tag={tag} isChecked={isChecked} elm={props.elm} updateData={props.updateData} />
      <Label label={label} elm={props.elm} updateData={props.updateData} />
      <Placeholder placeholder={placeholder} elm={props.elm} updateData={props.updateData} />
    </div>
  )
}
