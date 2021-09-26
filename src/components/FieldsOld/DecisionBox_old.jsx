/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react'
import validateForm from '../../user-frontend/validation'
import OldInputWrapper from '../OldInputWrapper'

export default function DecisionBox_old({ attr, onBlurHandler, resetFieldValue, formID }) {
  let { checked } = attr.valid
  const checkBoxRef = useRef(null)
  const defaultValue = attr.val || (checked ? attr.msg.checked : attr.msg.unchecked)
  const [value, setvalue] = useState(defaultValue)
  if (value === attr.msg.unchecked) {
    checked = false
  } else if (value === attr.msg.checked) {
    checked = true
  }
  useEffect(() => {
    if (resetFieldValue) {
      setvalue(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && onBlurHandler && !attr.userinput) {
      const { current } = checkBoxRef
      onBlurHandler(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const onChangeHandler = (event) => {
    if (attr.valid.disabled) {
      return
    }
    if (event.target.checked) {
      setvalue(attr.msg.checked)
    } else {
      setvalue(attr.msg.unchecked)
    }
    if (onBlurHandler) {
      onBlurHandler(event)
    }
  }

  const handleBlur = e => {
    const { form } = e.target
    validateForm({ input: { name: attr.name, form, value: e.target.checked ? attr.msg.checked : attr.msg.unchecked } })
  }
  return (
    <OldInputWrapper
      formID={formID}
      fieldKey={attr.name}
      fieldData={attr}
      noLabel
    >
      <div className={`no-drg fld fld-${formID} btcd-ck-con ${attr.round && 'btcd-round'}`}>
        <label className={`btcd-ck-wrp btcd-ck-wrp-${formID}`}>
          <span
            className="decision-content"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: attr.lbl || attr?.info?.lbl }}
          />
          <input type="hidden" value={value} {...'name' in attr && { name: attr.name }} />
          <input
            style={{
              height: attr.valid.req && 1,
              width: attr.valid.req && 1,
            }}
            type="checkbox"
            ref={checkBoxRef}
            disabled={attr?.valid?.disabled}
            readOnly={attr?.valid?.readonly}
            {...attr.valid.req && { required: true }}
            {...{ checked }}
            value={value}
            onChange={onChangeHandler}
            onBlur={handleBlur}
          />
          <span className="btcd-mrk ck" />
        </label>
      </div>
    </OldInputWrapper>
  )
}