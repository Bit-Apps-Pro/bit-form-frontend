// import { useRecoilValue } from 'recoil'
// import { $breakpoint, $layouts, $selectedFieldId } from '../GlobalStates'

export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  // const fldKey = useRecoilValue($selectedFieldId)
  // const breakpoint = useRecoilValue($breakpoint)
  // const layouts = useRecoilValue($layouts)
  // const fldLayIndex = layouts[breakpoint].findIndex(lay => lay.i === fldKey)
  // const isHidden = layouts[breakpoint][fldLayIndex]?.hidden || false

  const err = fieldData.error || ''
  return (
    <div className={`fld-wrp fld-wrp-${formID} drag ${isBuilder ? 'o-h' : ''} ${fieldData?.valid?.hide ? 'vis-n' : ''} ${isHidden ? 'fld-hide' : ''}`}>
      {(!noLabel && !fieldData?.valid?.hideLbl && 'lbl' in fieldData) && (
        <label title={fieldData.lbl} className={`fld-lbl fld-lbl-${formID}`} htmlFor={fieldKey}>
          {fieldData.lbl}
          {fieldData.valid?.req && (
            <>
              {' '}
              <span className="fld-req-symbol">*</span>
            </>
          )}
        </label>
      )}
      {children}
      {(err || fieldData?.err) && (
        <div className={`error-wrapper ${err && 'h-a'}`} >
          <div id={`${fieldKey}-error`} className="error-txt">
            {err}
          </div>
        </div>
      )}
    </div>
  )
}
