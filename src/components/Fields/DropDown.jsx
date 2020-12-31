/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'

export default function DropDown({ attr, onBlurHandler, resetFieldValue, formID, dev }) {
  let defaultValue
  if ('val' in attr && attr.val && attr.val.length > 0) {
    if (typeof attr.val === 'string') {
      if (attr.val[0] === '[') {
        defaultValue = JSON.parse(attr.val)
      } else {
        defaultValue = attr.val.split(',')
      }
    } else if (Array.isArray(attr.val)) {
      if (attr.val.length > 0) {
        defaultValue = attr.val.filter(option => option)
      } else {
        defaultValue = []
      }
    }
  } else {
    defaultValue = []
  }

  const [value, setvalue] = useState(defaultValue || [])

  useEffect(() => {
    if (!dev && defaultValue && !attr.userinput && JSON.stringify(value) !== JSON.stringify(defaultValue)) {
      setvalue(defaultValue)
    } else if (defaultValue && attr.conditional) {
      setvalue(defaultValue)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attr.val, attr.userinput, attr.conditional, defaultValue, value])

  useEffect(() => {
    if (resetFieldValue) {
      setvalue([])
    }
  }, [resetFieldValue])

  useEffect(() => {
    if (attr.hasWorkflow && JSON.stringify(defaultValue) === JSON.stringify(value) && onBlurHandler && !attr.userinput) {
      const eventLikeData = { name: 'mul' in attr ? `${attr.name}` : attr.name, value, type: 'dropdown', multiple: 'mul' in attr && attr.mul }
      onBlurHandler(eventLikeData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const onChangeHandler = (event) => {
    if (event && event.target && event.target.slim) {
      const newValue = []
      event.target.slim.data.data.forEach((option => { option.selected && option.value && newValue.push(option.value) }))
      setvalue(newValue)
    } else if (event && event.target && event.target.multiple && value) {
      const selectedValue = []
      event.target.childNodes.forEach((option => { option.selected && option.value && selectedValue.push(option.value) }))
      setvalue([...selectedValue])
    } else {
      setvalue(event.split(','))
    }
    if (onBlurHandler && event) {
      const eventLikeData = { name: 'mul' in attr ? `${attr.name}` : attr.name, value: event.split(','), type: 'dropdown', multiple: 'mul' in attr && attr.mul, userinput: true }
      onBlurHandler(eventLikeData)
    }
  }

  return (
    <div className={`fld-wrp fld-wrp-${formID} drag  ${attr.valid.hide ? 'btcd-hidden' : ''}`} btcd-fld="select">
      {'lbl' in attr && (
        <label className={`fld-lbl fld-lbl-${formID}`}>
          {attr.lbl}
          {' '}
          {attr.valid.req && ' *'}
        </label>
      )}

      <MultiSelect
        className={`fld fld-${formID} dpd no-drg`}
        {...'req' in attr.valid && { required: attr.valid.req }}
        {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
        {...'ph' in attr && { placeholder: attr.ph }}
        {...'name' in attr && { name: 'mul' in attr ? `${attr.name}` : attr.name }}
        // {...'val' in attr && attr.val.length > 0 && { defaultValue: typeof attr.val === 'string' && attr.val.length > 0 && attr.val[0] === '[' ? JSON.parse(attr.val) : attr.val !== undefined && attr.val.split(',') }}
        singleSelect={!attr.mul}
        customValue={attr.customOpt}
        options={attr.opt.map(option => (option.lbl ? { value: option.lbl, label: option.lbl } : option))}
        onChange={onChangeHandler}
        defaultValue={value}
      />
    </div>
  )
}
