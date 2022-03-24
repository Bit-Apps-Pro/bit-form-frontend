/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from 'react'
import validateForm from '../../user-frontend/validation'
import { observeElement, select } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function TextArea({ fieldKey, attr, onBlurHandler, resetFieldValue, formID, styleClasses }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBlur = e => {
    validateForm({ input: e.target })
  }

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div data-dev-inp-fld-wrp={fieldKey} className={`${fieldKey}-inp-fld-wrp`}>
          <textarea
            id={fieldKey}
            className={`${fieldKey}-fld`}
            style={{ height: 'calc(100% - 30px)' }}
            ref={textAreaRef}
            {...'disabled' in attr && { disabled: attr.disabled }}
            {...'readonly' in attr && { readOnly: attr.readonly }}
            {...'ph' in attr && { placeholder: attr.ph }}
            {...'ac' in attr && { autoComplete: attr.ac }}
            {...'req' in attr.valid && { required: attr.valid.req }}
            {...'disabled' in attr.valid && { readOnly: attr.valid.disabled }}
            {...'name' in attr && { name: attr.name }}
            {...onBlurHandler && { onInput: onBlurHandler }}
            onBlur={handleBlur}
            {...{ value }}
            onChange={onChangeHandler}
          />
          {attr.prefixIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-pre-i`} height="90%" src={attr.prefixIcn} alt="" />}
          {attr.suffixIcn && <img data-dev-suf-i={fieldKey} className={`${fieldKey}-suf-i`} height="90%" src={attr.suffixIcn} alt="" />}
        </div>
      </InputWrapper>
    </>
  )
}
