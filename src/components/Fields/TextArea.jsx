/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react'

export default function TextArea({ attr, onBlurHandler, resetFieldValue }) {
  const [value, setvalue] = useState(attr.val)
  const textAreaRef = useRef(null)
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
      const { current } = textAreaRef
      // console.log('value', value, current, attr.name)
      onBlurHandler(current)
    }
  }, [value])
  const onChangeHandler = (event) => {
    setvalue(event.target.value)
  }
  return (
    !('hide' in attr.valid && attr.valid.hide === true)
    && (
      <div className="fld-wrp drag" btcd-fld="textarea">
        {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
        <textarea
          className="fld no-drg"
          ref={textAreaRef}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...{ defaultValue: value }}
          {...{ value }}
          {...'ac' in attr && { autoComplete: attr.ac }}
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'name' in attr && { name: attr.name }}
          {...onBlurHandler && { onBlur: onBlurHandler }}
          onChange={onChangeHandler}
        />
      </div>
    )
  )
}
