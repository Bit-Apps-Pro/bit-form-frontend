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
      data-dev-fw={fieldKey}
      className={`${fieldKey}-fw  ${flags.styleMode ? '' : 'drag'} ${isBuilder ? 'o-h' : ''} ${fieldData?.valid?.hide ? 'vis-n' : ''} ${isHidden ? 'fld-hide' : ''}`}
      style={{ direction: fieldDirection }}
    >
      <div
        data-dev-lw={fieldKey}
        className={`${fieldKey}-lw`}
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
        <div data-dev-st={fieldKey} className={`${fieldKey}-st`}>sub title</div>
      </div>
      <div data-dev-iw={fieldKey} className={`${fieldKey}-iw`}>
        {children}
        <div className={`${fieldKey}-ht`}>helper text</div>
      </div>
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
