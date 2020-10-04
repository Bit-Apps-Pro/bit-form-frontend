/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react'

export default function TextField({ attr, onBlurHandler, resetFieldValue, formID }) {
  const textFieldRef = useRef(null)
  const [value, setvalue] = useState(attr.val !== undefined ? attr.val : '')
  useEffect(() => {
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
    <div className={`fld-wrp fld-wrp-${formID} drag  ${attr.valid.hide ? 'btcd-hidden' : ''}`} btcd-fld="text-fld">
      {'lbl' in attr && <label title={attr.lbl} className={`fld-lbl fld-lbl-${formID}`}>{attr.lbl}{attr.valid?.req && ' *'}</label>}
      <input
        className={`fld fld-${formID} no-drg`}
        type={attr.typ}
        {...'req' in attr.valid && { required: attr.valid.req }}
        {...'disabled' in attr.valid && { readOnly: attr.valid.disabled }}
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
}
