/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react'
import validateForm from '../../user-frontend/validation'
import { observeElement, select } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function TextField({ fieldKey, attr, onBlurHandler, resetFieldValue, formID, styleClasses }) {
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

  useEffect(() => {
    const textFld = select(`#${fieldKey}`)
    if (textFld) {
      observeElement(textFld, 'value', (oldVal, newVal) => setvalue(attr.typ === 'email' ? newVal.toLowerCase() : newVal))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBlur = e => validateForm({ input: e.target })

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div className={`${fieldKey}-iw`}>
          <span>dasd</span>
          <input
            id={fieldKey}
            className={`${fieldKey}-fld`}
            type={type}
            {...'req' in attr.valid && { required: attr.valid.req }}
            {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
            {...'readonly' in attr.valid && { readOnly: attr.valid.readonly }}
            {...'ph' in attr && { placeholder: attr.ph }}
            {...'mn' in attr && { min: attr.mn }}
            {...'mx' in attr && { max: attr.mx }}
            {...'ac' in attr && { autoComplete: attr.ac }}
            {...'name' in attr && { name: attr.name }}
            {...onBlurHandler && { onInput: onBlurHandler }}
            onBlur={handleBlur}
            {...{ value }}
            {...{ onChange: onChangeHandler }}
            ref={textFieldRef}
          />
        </div>
      </InputWrapper>
    </>
  )
}
