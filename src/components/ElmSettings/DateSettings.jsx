/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Label from './Childs/Label'
import Required from './Childs/Required'

export default function DateSettings(props) {
  let isChecked = true
  let label = ''
  let tag = ''

  props.elm.data.child.map(el => {
    if (el.tag === 'input') {
      tag = 'input'
      if ('required' in el.attr) {
        isChecked = el.attr.required
      } else {
        isChecked = false
      }
    } else if (el.tag === 'label') {
      label = el.child
    }
    return null
  })
  return (
    <div>
      <h4>Date-Time</h4>
      <Required tag={tag} isChecked={isChecked} elm={props.elm} updateData={props.updateData} />
      <Label label={label} elm={props.elm} updateData={props.updateData} />
    </div>
  )
}
