import { __ } from '../../Utils/i18nwrap'

function LogicChip({ logic, nested, onChange, className = null }) {
  return (
    <div>
      <select
        value={logic}
        onChange={onChange}
        className={`btcd-logic-chip ${className} ${nested && 'scl-8'}`}
      >
        <option value="or">{__('OR')}</option>
        <option value="and">{__('AND')}</option>
      </select>
    </div>
  )
}

export default LogicChip
