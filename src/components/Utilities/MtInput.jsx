/* eslint-disable jsx-a11y/label-has-associated-control */

function MtInput({
  label, onChange, onKeyUp, onClick, value, disabled, type, textarea, className,
}) {
  return (
    <label className={`btcd-mt-inp ${className}`}>
      {!textarea && <input type={type === undefined ? 'text' : type} onChange={onChange} onClick={onClick} onKeyUp={onKeyUp} placeholder=" " disabled={disabled} value={value} />}
      {textarea && <textarea type={type === undefined ? 'text' : type} onChange={onChange} onClick={onClick} onKeyUp={onKeyUp} placeholder=" " disabled={disabled} value={value} />}
      <span>{label}</span>
    </label>
  )
}

export default MtInput
