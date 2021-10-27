/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react'
import validateForm from '../../user-frontend/validation'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function CheckBox({ attr, onBlurHandler, resetFieldValue, formID, fieldKey, styleClasses }) {
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
    let val = []
    const index = value.indexOf(event.target.value)
    if (event.target.checked && index === -1) {
      val = [...value, event.target.value]
    } else if (!event.target.checked && index >= 0) {
      val = value.filter(v => v !== event.target.value)
    }
    if (!attr.valid.disableOnMax || (attr.valid.disableOnMax && val.length <= Number(attr.mx))) {
      setvalue(val)
    }

    if (onBlurHandler) {
      onBlurHandler(event)
    }
  }

  const handleBlur = e => {
    const { name, form } = e.target
    validateForm({ input: { name, form, value: value.length ? value : '' } })
  }

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        // fieldKey={attr.name}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        {/* cc for checkbox container */}
        <div className={`${fieldKey}-cc`}>
          <svg className={`${fieldKey}-cks`}>
            <symbol id={`${fieldKey}-ck-svg`} viewBox="0 0 12 10">
              <polyline
                className={`${fieldKey}-ck-svgline`}
                points="1.5 6 4.5 9 10.5 1"
              />
            </symbol>
          </svg>
          {attr.opt.map((itm, i) => (
            <div key={`opt-${i + 24}`} className={`${fieldKey}-cw`}>
              <input
                id={`${fieldKey}-chk-${i}`}
                type="checkbox"
                className={`${fieldKey}-ci`}
                ref={checkBoxRef}
                disabled={attr.valid.disabled}
                // readOnly={attr?.valid?.readonly}
                // {...itm.check && { defaultChecked: true }}
                // {...value && value.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
                defaultValue={itm.val || itm.lbl}
                {...itm.req && { required: true }}
                {...'name' in attr && { name: `${attr.name}[]` }}
                {...{ checked: Array.isArray(value) && value.indexOf(itm.val || itm.lbl) >= 0 }}
                onChange={onChangeHandler}
                onBlur={handleBlur}
              />
              <label data-cl htmlFor={`${fieldKey}-chk-${i}`} className={`${fieldKey}-cl`}>
                <span data-bx className={`${fieldKey}-bx ${fieldKey}-ck`}>
                  <svg width="12" height="10" viewBox="0 0 12 10" className={`${fieldKey}-svgwrp`}>
                    <use data-ck-icn href={`#${fieldKey}-ck-svg`} className={`${fieldKey}-ck-icn`} />
                  </svg>
                </span>
                <span className={`${fieldKey}-ct`}>{itm.lbl}</span>
              </label>
            </div>
          ))}
        </div>
      </InputWrapper>
    </>
  )
}
