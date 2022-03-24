import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { deepCopy, renderDOMObjectFromHTMLStr } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'

/* eslint-disable react/jsx-props-no-spreading */
export default function Button({ fieldKey, attr: fieldData, styleClasses, buttonDisabled, handleReset, formID, data }) {
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  const styleClassesForRender = deepCopy(styleClasses)
  styleClassesForRender[`.${fieldKey}-fld-wrp`]['align-items'] = fieldData.align
  return (
    <>
      <RenderStyle styleClasses={styleClassesForRender} />
      <div data-dev-fld-wrp={fieldKey} className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        <button
          data-dev-btn={fieldKey}
          className={`${fieldKey}-btn`}
          // eslint-disable-next-line react/button-has-type
          type={fieldData.btnTyp}
          {...fieldData.btnTyp === 'reset' && { onClick: handleReset }}
          {...'disabled' in fieldData && { disabled: fieldData.disabled }}
        >
          {fieldData.btnPreIcn && <img data-dev-btn-pre-i={fieldKey} className={`${fieldKey}-btn-pre-i`} src={fieldData.btnPreIcn} alt="" />}
          {renderDOMObjectFromHTMLStr(fieldData.txt || '')}
          {fieldData.btnSufIcn && <img data-dev-btn-suf-i={fieldKey} className={`${fieldKey}-btn-suf-i`} src={fieldData.btnSufIcn} alt="" />}
        </button>
        {
          (fieldData.helperTxt) && (
            <div data-dev-hlp-txt={fieldKey} className={`${fieldKey}-hlp-txt`}>
              {/* Prefix icon */}
              {fieldData.hlpPreIcn && <img data-dev-hlp-txt-pre-i={fieldKey} className={`${fieldKey}-hlp-txt-pre-i`} src={fieldData.hlpPreIcn} alt="" />}
              {/* Helper text */}
              {renderDOMObjectFromHTMLStr(fieldData.helperTxt || '')}
              {/* suffix icon */}
              {fieldData.hlpSufIcn && <img data-dev-hlp-txt-suf-i={fieldKey} className={`${fieldKey}-hlp-txt-suf-i`} src={fieldData.hlpSufIcn} alt="" />}
            </div>
          )
        }
      </div>
    </>
  )
}
