import { useRecoilValue } from 'recoil'
import { $breakpoint, $fieldsDirection, $flags } from '../GlobalStates'

export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  const breakpoint = useRecoilValue($breakpoint)
  const fieldDirection = useRecoilValue($fieldsDirection)
  const flags = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false

  const err = fieldData.error || ''
  return (
    <div
      data-dev-fld-wrp={fieldKey}
      className={`${fieldKey}-fld-wrp  ${flags.styleMode ? '' : 'drag'} ${isBuilder ? 'o-h' : ''} ${fieldData?.valid?.hide ? 'vis-n' : ''} ${isHidden ? 'fld-hide' : ''}`}
      style={{ direction: fieldDirection }}
    >
      <div
        data-dev-lbl-wrp={fieldKey}
        className={`${fieldKey}-lbl-wrp`}
      >
        {(!noLabel && !fieldData?.valid?.hideLbl && 'lbl' in fieldData) && (
          <label
            data-dev-lbl={fieldKey}
            title={fieldData.lbl}
            className={`${fieldKey}-lbl`}
            htmlFor={fieldKey}
          >
            {fieldData.lbl}
            {fieldData.valid?.req && (
              <>
                {' '}
                <span className="fld-req-symbol">*</span>
              </>
            )}
          </label>
        )}
        {
          fieldData.subtitle && (
            <div data-dev-sub-titl={fieldKey} className={`${fieldKey}-sub-titl`}>{fieldData.subtitle}</div>
          )
        }
      </div>
      <div data-dev-inp-wrp={fieldKey} className={`${fieldKey}-inp-wrp`}>
        {children}
        {
          fieldData.helperTxt && (
            <div className={`${fieldKey}-hlp-txt`}>{fieldData.helperTxt}</div>
          )
        }
      </div>
      {(err || fieldData?.err) && (
        <div className={`error-wrapper ${err && 'h-a'}`}>
          <div id={`${fieldKey}-error`} data-dev-err-msg={fieldKey} className="error-txt">
            {err}
          </div>
        </div>
      )}
    </div>
  )
}
