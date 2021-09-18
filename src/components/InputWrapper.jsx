import { useRecoilValue } from 'recoil'
import { $breakpoint } from '../GlobalStates'

export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  const breakpoint = useRecoilValue($breakpoint)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false

  const err = fieldData.error || ''
  return (
    <div className={`${fieldKey}-fw  drag  ${isBuilder ? 'o-h' : ''} ${fieldData?.valid?.hide ? 'vis-n' : ''} ${isHidden ? 'fld-hide' : ''}`}>
      {(!noLabel && !fieldData?.valid?.hideLbl && 'lbl' in fieldData) && (
        <label title={fieldData.lbl} className={`${fieldKey}-lbl`} htmlFor={fieldKey}>
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
        <div className={`error-wrapper ${err && 'h-a'}`}>
          <div id={`${fieldKey}-error`} className="error-txt">
            {err}
          </div>
        </div>
      )}
    </div>
  )
}
