/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

export default function CompGen(props) {

  function textField(attr) {
    return (
      <div className="text-wrp drag" btcd-fld="text-fld">
        {'lbl' in attr && <label>{attr.lbl.txt}</label>}
        <input
          className="txt-fld no-drg"
          type={attr.typ}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'mn' in attr && { min: attr.mn }}
          {...'mx' in attr && { max: attr.mx }}
          {...'val' in attr && { value: attr.val }}
          {...'ac' in attr && { autoComplete: attr.ac }}
          {...'req' in attr.valid && { required: attr.valid.req }}
        />
      </div>
    )
  }

  switch (props.atts.typ) {
    case 'text':
      return textField(props.atts)
    default:
      break
  }

  return <div>aaa</div>
}
