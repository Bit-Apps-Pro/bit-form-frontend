/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Label from './Childs/Label'
import Options from './Childs/Options'
import RoundedInput from './Childs/RoundedInput'

export default function RadioBtn(props) {
  let label = ''

  props.elm.data.child.map(el => {
    if (el.tag === 'label') {
      label = el.child
    }
    return null
  })

  // setting name using layput index
  if (!Object.prototype.hasOwnProperty.call(props.elm.data.child[1].child[0].child[1].attr, 'name')) {
    props.elm.data.child[1].child.map(el => {
      el.child[1].attr.name = props.elm.id
      return null
    })
    props.updateData(props.elm)
  }


  return (
    <div>
      <h4>Single Select Radio Button</h4>
      <Label label={label} elm={props.elm} updateData={props.updateData} />
      <RoundedInput label={label} elm={props.elm} updateData={props.updateData} />
      <Options layId={props.elm.id} type="radio" elm={props.elm} updateData={props.updateData} />
    </div>
  )
}
