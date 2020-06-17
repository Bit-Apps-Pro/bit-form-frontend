/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react'

export default function TextField({ attr, onBlurHandler, resetFieldValue }) {
  const textFieldRef = useRef(null)
  const [value, setvalue] = useState(attr.val !== undefined ? attr.val : '')
  useEffect(() => {
    // console.log('att.name', attr.name, attr.val)
    if (attr.val !== undefined && !attr.userinput) {
      setvalue(attr.val)
    } else if (!attr.val && !attr.userinput) {
      setvalue('')
    } else if (attr.conditional) {
      setvalue(attr.val)
    }
  }, [attr.val, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue('')
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
      const { current } = textFieldRef
      // console.log('value', value, current, attr.name)
      onBlurHandler(current)
    }
  }, [value])
  const onChangeHandler = (event) => {
    const val = attr.typ === 'email' ? event.target.value.toLowerCase() : event.target.value
    setvalue(val)
  }
  return (
    !('hide' in attr.valid && attr.valid.hide === true)
    && (
      <div className="fld-wrp drag" btcd-fld="text-fld">
        {'lbl' in attr && <label title={attr.lbl} className="fld-lbl">{attr.lbl}</label>}
        <input
          className="fld no-drg"
          type={attr.typ}
          {...'attr' in attr && attr.attr}
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'mn' in attr && { min: attr.mn }}
          {...'mx' in attr && { max: attr.mx }}
          {...'val' in attr && { defaultValue: attr.val }}
          {...{ value }}
          {...'ac' in attr && { autoComplete: attr.ac }}
          {...'name' in attr && { name: attr.name }}
          {...onBlurHandler && { onBlur: onBlurHandler }}
          {...{ onChange: onChangeHandler }}
          ref={textFieldRef}
        />
        {attr.error && <span style={{ color: 'red' }}>{attr.error}</span>}
      </div>
    )
  )
}