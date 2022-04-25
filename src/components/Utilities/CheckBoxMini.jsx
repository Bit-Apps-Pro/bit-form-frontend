import { useId } from 'react'

/* eslint-disable react/jsx-props-no-spreading */
export default function CheckBoxMini({ className, cls, id, name, refer, onChange, checked, value, title, disabled }) {
  const checkId = id || useId()
  return (
    <div className={`form-check ${className}`}>
      <input
        data-testid={`${id}-chk-mini`}
        type="checkbox"
        className={`form-check-input ${cls}`}
        id={checkId}
        name={name}
        ref={refer}
        onChange={onChange}
        checked={checked}
        value={value}
        disabled={disabled}
      />
      <label className="form-check-label" htmlFor={checkId}>{title}</label>
    </div>
  )
}
