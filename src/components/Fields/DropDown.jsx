/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'

export default function DropDown({ attr, onBlurHandler, resetFieldValue, formID }) {
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
    if (defaultValue && !attr.userinput && JSON.stringify(value) !== JSON.stringify(defaultValue)) {
      setvalue(defaultValue)
    } else if (defaultValue && attr.conditional) {
      setvalue(defaultValue)
    }
  }, [attr.val, attr.userinput, attr.conditional])

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
    <div className={`fld-wrp fld-wrp-${formID} drag`} btcd-fld="select">
      {'lbl' in attr && <label className={`fld-lbl fld-lbl-${formID}`}>{attr.lbl}</label>}
      {/* props options
        https://github.com/Arif-un/react-multiple-select-dropdown-lite#readme */}
      <MultiSelect
        width="100%"
        className="no-drg"
        {...'req' in attr.valid && { required: attr.valid.req }}
        {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
        {...'ph' in attr && { placeholder: attr.ph }}
        {...'name' in attr && { name: 'mul' in attr ? `${attr.name}` : attr.name }}
        // {...'val' in attr && attr.val.length > 0 && { defaultValue: typeof attr.val === 'string' && attr.val.length > 0 && attr.val[0] === '[' ? JSON.parse(attr.val) : attr.val !== undefined && attr.val.split(',') }}
        singleSelect={!attr.mul}
        options={attr.opt.map(option => (option.lbl ? { value: option.lbl, label: option.lbl } : option))}
        onChange={onChangeHandler}
        {...{ defaultValue: value }}
      />
      {/* <select
          className="fld slim no-drg"
          ref={selectFieldRef}
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'mul' in attr && { multiple: attr.mul }}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'name' in attr && { name: 'mul' in attr ? `${attr.name}[]` : attr.name }}
          {...{ defaultValue: value }}
          {...{ value }}
          {...resetFieldValue && { value: [] }}
          onChange={onChangeHandler}
        >
          <option data-placeholder="true" aria-label="option placeholder" />
          {attr.opt.map((itm, i) => (
            <option key={`op-${i + 87}-${(!attr.userinput || resetFieldValue) && Math.random()}`} value={itm.lbl}>{itm.lbl}</option>
          ))}
        </select> */}
    </div>
  )
}
