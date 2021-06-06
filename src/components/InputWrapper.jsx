export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  return (
    <div className={`fld-wrp fld-wrp-${formID} drag ${isBuilder ? 'o-h' : ''} ${fieldData?.valid?.hide ? 'vis-n' : ''}`}>
      {(!noLabel && 'lbl' in fieldData) && (
        <label title={fieldData.lbl} className={`fld-lbl fld-lbl-${formID}`} htmlFor={fieldKey}>
          {fieldData.lbl}
          {fieldData.valid?.req && ' *'}
        </label>
      )}
      {children}
      {fieldData.error && <span style={{ color: 'red' }}>{fieldData.error}</span>}
      {fieldData.err && (
        <div className="error-wrapper">
          <div id={`${fieldKey}-error`} className="error-txt">
            {fieldData?.err?.msg}
          </div>
        </div>
      )}
    </div>
  )
}
