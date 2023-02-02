import { useId } from 'react'

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function CheckBox({
  id, className, disabled, checked, onChange, radio, name, title, value, sqr, tip,
}) {
  const inpName = name || useId()
  return (
    <label title={tip} data-testid={`${id}-chk`} className={`btcd-ck-wrp ${className}`}>
      <input aria-label={value || title} type={radio ? 'radio' : 'checkbox'} checked={checked} onChange={onChange} name={inpName} value={value} disabled={disabled} />
      <span className={`btcd-mrk ${!sqr && 'br-50'} ${radio ? 'rdo' : 'ck'}`} />
      {title}
    </label>
  )
}
