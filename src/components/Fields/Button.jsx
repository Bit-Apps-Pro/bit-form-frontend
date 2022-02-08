import { renderDOMObjectFromHTMLStr } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'

/* eslint-disable react/jsx-props-no-spreading */
export default function Button({ fieldKey, attr, styleClasses, buttonDisabled, handleReset, formID, data }) {
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className={`${fieldKey}-fld-wrp drag`}>
        <button
          className={`${fieldKey}-btn`}
          // eslint-disable-next-line react/button-has-type
          type={attr.btnTyp}
          {...attr.btnTyp === 'reset' && { onClick: handleReset }}
        >
          {attr.btnPreIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-btn-pre-i`} src={attr.btnPreIcn} alt="" />}
          {renderDOMObjectFromHTMLStr(attr.txt || '')}
          {attr.btnSufIcn && <img data-dev-suf-i={fieldKey} className={`${fieldKey}-btn-suf-i`} src={attr.btnSufIcn} alt="" />}
        </button>
        {
          (attr.helperTxt || attr.hlpPreIcn || attr.hlpSufIcn) && (
            <div data-dev-hlp-txt={fieldKey} className={`${fieldKey}-hlp-txt`}>
              {/* Prefix icon */}
              {attr.hlpPreIcn && <img data-dev-hlp-txt-pre-i={fieldKey} className={`${fieldKey}-hlp-txt-pre-i`} src={attr.hlpPreIcn} alt="" />}
              {/* Helper text */}
              {renderDOMObjectFromHTMLStr(attr.helperTxt || '')}
              {/* suffix icon */}
              {attr.hlpSufIcn && <img data-dev-hlp-txt-suf-i={fieldKey} className={`${fieldKey}-hlp-txt-suf-i`} src={attr.hlpSufIcn} alt="" />}
            </div>
          )
        }
      </div>
    </>
  )
}
