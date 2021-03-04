/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react'

export default function DecisionBox({ attr, onBlurHandler, resetFieldValue, formID }) {
  console.log('decision', attr)
  let { checked } = attr.valid
  const checkBoxRef = useRef(null)
  const defaultValue = checked ? attr.msg.checked : attr.msg.unchecked
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
  return (
    <div className={`fld-wrp fld-wrp-${formID} drag ${attr.valid.hide ? 'btcd-hidden' : ''}`} btcd-fld="decisionbox">
      <div className={`no-drg fld fld-${formID} btcd-ck-con ${attr.round && 'btcd-round'}`}>
        <label className={`btcd-ck-wrp btcd-ck-wrp-${formID}`}>
          <span
            className="tinymce-content"
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
            {...attr.valid.req && { required: true }}
            {...{ checked }}
            onChange={onChangeHandler}
            value={value}
          />
          <span className="btcd-mrk ck" />
        </label>
      </div>
    </div>
  )
}
