/* eslint-disable jsx-a11y/label-has-associated-control */
function CheckBox({ checked, onChange, radio, name, title, value }) {
  return (
    <label className="btcd-ck-wrp">
      {title}
      <input type={radio ? 'radio' : 'checkbox'} checked={checked} onChange={onChange} name={name} value={value} />
      <span className={`btcd-mrk br-50 ${radio ? 'rdo' : 'ck'}`} />
    </label>
  )
}

export default CheckBox
