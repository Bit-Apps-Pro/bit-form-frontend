/* eslint-disable jsx-a11y/label-has-associated-control */
export default function CheckBox({ className, disabled, checked, onChange, radio, name, title, value, sqr }) {
  return (
    <label className={`btcd-ck-wrp ${className}`}>
      <input aria-label={value || title} type={radio ? 'radio' : 'checkbox'} checked={checked} onChange={onChange} name={name} value={value} disabled={disabled} />
      <span className={`btcd-mrk ${!sqr && 'br-50'} ${radio ? 'rdo' : 'ck'}`} />
      {title}
    </label>
  )
}
