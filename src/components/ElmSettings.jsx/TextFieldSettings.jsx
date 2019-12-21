/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Label from './Childs/Label'
import Required from './Childs/Required'
import Placeholder from './Childs/Placeholder'
import AutoComplete from './Childs/AutoComplete'
import MinMax from './Childs/MinMax'
import MinMaxLength from './Childs/MinMaxLength'

export default function TextFieldSettings(props) {
  let isChecked = true
  let isAutocomplete = true
  let label = ''
  let placeholder = ''
  let min = 0
  let max = 0
  let minL = 0
  let maxL = 0
  let tag = ''
  let type = ''

  props.elm.data.child.map(el => {
    if (el.tag === 'input') {
      tag = 'input'
      type = el.attr.type
      if ('required' in el.attr) {
        isChecked = el.attr.required
      } else {
        isChecked = false
      }
      if ('autoComplete' in el.attr) {
        isAutocomplete = el.attr.autoComplete === 'on'
      } else {
        isAutocomplete = false
      }
      if ('min' in el.attr) {
        min = el.attr.min
      } else {
        min = ''
      }
      if ('max' in el.attr) {
        max = el.attr.max
      } else {
        max = ''
      }
      if ('minLength' in el.attr) {
        minL = el.attr.minLength
      } else {
        minL = ''
      }
      if ('maxLength' in el.attr) {
        console.log('max found', el.attr.maxL);
        maxL = el.attr.maxLength
      } else {
        maxL = ''
      }
      placeholder = el.attr.placeholder
    } else if (el.tag === 'label') {
      label = el.child
    }
    return null
  })
  return (
    <div>
      <h4>Single line Field</h4>
      <Required tag={tag} isChecked={isChecked} elm={props.elm} updateData={props.updateData} />
      <AutoComplete tag={tag} isAutocomplete={isAutocomplete} elm={props.elm} updateData={props.updateData} />
      <Label label={label} elm={props.elm} updateData={props.updateData} />
      <Placeholder placeholder={placeholder} elm={props.elm} updateData={props.updateData} />
      {type === 'number' && <MinMax min={min} max={max} elm={props.elm} updateData={props.updateData} />}
      {type.match(/^(text|url|password|pineapple)$/) && <MinMaxLength minLength={minL} maxLength={maxL} elm={props.elm} updateData={props.updateData} />}
    </div>
  )
}
