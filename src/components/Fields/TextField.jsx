/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react';

export default function TextField({ fieldKey, attr, onBlurHandler, resetFieldValue, formID }) {
  const type = attr.typ === 'url' ? 'text' : attr.typ
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
      onBlurHandler(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const onChangeHandler = (event) => {
    const val = attr.typ === 'email' ? event.target.value.toLowerCase() : event.target.value
    setvalue(val)
  }

  return (
    <div className={`fld-wrp fld-wrp-${formID} drag  ${attr.valid.hide ? 'btcd-hidden' : ''}`} btcd-fld="text-fld">
      {'lbl' in attr && (
        <label title={attr.lbl} className={`fld-lbl fld-lbl-${formID}`} htmlFor={fieldKey}>
          {attr.lbl}
          {attr.valid?.req && ' *'}
        </label>
      )}
      <input
        id={fieldKey}
        className={`fld fld-${formID} no-drg`}
        type={type}
        {...'req' in attr.valid && { required: attr.valid.req }}
        {...'disabled' in attr.valid && { readOnly: attr.valid.disabled }}
        {...'ph' in attr && { placeholder: attr.ph }}
        {...'mn' in attr && { min: attr.mn }}
        {...'mx' in attr && { max: attr.mx }}
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
