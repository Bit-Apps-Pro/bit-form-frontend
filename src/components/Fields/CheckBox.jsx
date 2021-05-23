/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react'

export default function CheckBox({ attr, onBlurHandler, resetFieldValue, formID }) {
  let defaultValue
  if ('val' in attr && attr.val && attr.val.length > 0) {
    if (typeof attr.val === 'string') {
      if (attr.val[0] === '[') {
        defaultValue = JSON.parse(attr.val)
      } else {
        defaultValue = attr.val.split(',')
      }
    } else if (Array.isArray(attr.val)) {
      defaultValue = attr.val
    }
  } else {
    // defaultValue = attr.opt.map(checkBoxElement => checkBoxElement.check && checkBoxElement.lbl)
    defaultValue = attr.opt.filter(checkBoxElement => checkBoxElement.check).map(checkBoxElement => checkBoxElement.val || checkBoxElement.lbl)
  }
  const [value, setvalue] = useState(defaultValue || [])
  const checkBoxRef = useRef(null)
  useEffect(() => {
    if (defaultValue && JSON.stringify(defaultValue) !== JSON.stringify(value) && !attr.userinput) {
      setvalue(defaultValue)
    } else if (attr.conditional) {
      setvalue(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attr.val, attr.userinput, attr.conditional, attr.opt])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue([])
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && JSON.stringify(defaultValue) === JSON.stringify(value) && onBlurHandler && !attr.userinput) {
      const { current } = checkBoxRef
      onBlurHandler(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const onChangeHandler = (event) => {
    if (attr.valid.disabled) {
      return
    }
    const index = value.indexOf(event.target.value)
    if (event.target.checked && index === -1) {
      setvalue([...value, event.target.value])
    } else if (!event.target.checked && index >= 0) {
      setvalue(value.filter(v => v !== event.target.value))
    }
    if (onBlurHandler) {
      onBlurHandler(event)
    }
  }
  return (
    <div className={`fld-wrp fld-wrp-${formID} drag ${attr.valid.hide ? 'btcd-hidden' : ''}`} btcd-fld="textarea">
      {'lbl' in attr && <label className={`fld-lbl fld-lbl-${formID}`}>{attr.lbl}</label>}
      <div className={`no-drg fld fld-${formID} btcd-ck-con ${attr.round && 'btcd-round'}`}>
        {attr.opt.map((itm, i) => (
          <label key={`opt-${i + 24}`} className={`btcd-ck-wrp btcd-ck-wrp-${formID}`}>
            <span>{itm.lbl}</span>
            <input
              type="checkbox"
              ref={checkBoxRef}
              disabled={attr?.valid?.disabled}
              readOnly={attr?.valid?.readonly}
              // {...itm.check && { defaultChecked: true }}
              // {...value && value.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
              defaultValue={itm.val || itm.lbl}
              {...itm.req && { required: true }}
              {...'name' in attr && { name: `${attr.name}[]` }}
              {...{ checked: Array.isArray(value) && value.indexOf(itm.val || itm.lbl) >= 0 }}
              onChange={onChangeHandler}
            />
            <span className="btcd-mrk ck" />
          </label>
        ))}
      </div>
    </div>
  )
}
