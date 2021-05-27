/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react'
import { observeElement, select } from '../../Utils/globalHelpers'

export default function TextArea({ fieldKey, attr, onBlurHandler, resetFieldValue, formID }) {
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
      onBlurHandler(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const onChangeHandler = (event) => {
    setvalue(event.target.value)
  }

  useEffect(() => {
    const textFld = select(`#${fieldKey}`)
    if (textFld) {
      observeElement(textFld, 'value', (oldVal, newVal) => setvalue(newVal))
    }
  }, [])

  return (
    <div className={`fld-wrp fld-wrp-${formID} drag  ${attr.valid.hide ? 'btcd-hidden' : ''}`} btcd-fld="textarea">
      {'lbl' in attr && (
        <label className={`fld-lbl fld-lbl-${formID}`} htmlFor={fieldKey}>
          {attr.lbl}
          {attr.valid?.req && ' *'}
        </label>
      )}
      <div>
        <textarea
          id={fieldKey}
          className={`fld fld-${formID} no-drg textarea`}
          style={{ height: 'calc(100% - 30px)' }}
          ref={textAreaRef}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'ac' in attr && { autoComplete: attr.ac }}
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { readOnly: attr.valid.disabled }}
          {...'name' in attr && { name: attr.name }}
          {...onBlurHandler && { onBlur: onBlurHandler }}
          {...{ value }}
          onChange={onChangeHandler}
        />
      </div>
      <div className="error-wrapper">
        <div id={`${fieldKey}-error`} className="error-txt">
          {attr?.err?.msg}
        </div>
      </div>
    </div>
  )
}
