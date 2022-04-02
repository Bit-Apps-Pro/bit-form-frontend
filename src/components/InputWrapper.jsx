import { useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../GlobalStates/GlobalStates'
import { $fieldsDirection } from '../GlobalStates/ThemeVarsState'
import { renderDOMObjectFromHTMLStr } from '../Utils/Helpers'
import { highlightElm, removeHightlight } from './style-new/styleHelpers'

export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  const { rightBar, element, fieldKey: urlFldKey, formType } = useParams()
  const history = useHistory()
  const breakpoint = useRecoilValue($breakpoint)
  const fieldDirection = useRecoilValue($fieldsDirection)
  const [flages, setFlags] = useRecoilState($flags)
  const { styleMode, inspectMode } = flages
  const showAllErrorMsg = styleMode && rightBar === 'theme-customize' && element === 'error-messages'
  const showOnlyThisFldErrMsg = styleMode && rightBar === 'field-theme-customize' && element === 'error-message' && urlFldKey === fieldKey

  const isHidden = fieldData.hidden?.includes(breakpoint) || false

  const err = fieldData.error || ''
  const fldWrapperElm = useRef(null)
  const isElementInViewport = elm => {
    const rect = elm.getBoundingClientRect()

    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  if (err && fldWrapperElm) {
    const fld = fldWrapperElm.current
    const bodyRect = document.body.getBoundingClientRect()
    const fldRect = fld.getBoundingClientRect()
    const offsetTop = fldRect.top - bodyRect.top
    if (!isElementInViewport(fld)) window.scroll({ top: offsetTop, behavior: 'smooth' })
  }

  const elementStyleHandler = (e, route) => {
    setFlags(prvFlags => ({ ...prvFlags, inspectMode: false }))
    if (fieldKey) history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fieldKey}`)
  }

  return (
    <div
      data-dev-fld-wrp={fieldKey}
      className={`${fieldKey}-fld-wrp  ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}
      style={{ direction: fieldDirection }}
    >
      {!noLabel && (
        <div
          data-dev-lbl-wrp={fieldKey}
          className={`${fieldKey}-lbl-wrp`}
        >
          {(!fieldData?.valid?.hideLbl && 'lbl' in fieldData) && (
            <label
              data-dev-lbl={fieldKey}
              title={fieldData.lbl}
              className={`${fieldKey}-lbl`}
              htmlFor={fieldKey}
            >
              {fieldData.valid?.req && fieldData.valid?.reqShow && fieldData.valid?.reqPos === 'before' && (
                <span data-dev-req-smbl={fieldKey} className={`${fieldKey}-req-smbl`}>*</span>
              )}
              {fieldData.lblPreIcn && <img data-dev-lbl-pre-i={fieldKey} className={`${fieldKey}-lbl-pre-i`} src={fieldData.lblPreIcn} alt="" />}
              {inspectMode ? (
                <div
                  onMouseEnter={() => highlightElm(`[data-dev-lbl-wrp="${fieldKey}"]`)}
                  onFocus={() => highlightElm(`[data-dev-lbl-wrp="${fieldKey}"]`)}
                  onMouseLeave={() => removeHightlight()}
                  onBlur={() => removeHightlight()}
                  role="button"
                  onClick={(e) => elementStyleHandler(e, 'label')}
                >
                  {renderDOMObjectFromHTMLStr(fieldData.lbl.replaceAll('$_bf_$', '\\'))}
                </div>
              ) : (
                renderDOMObjectFromHTMLStr(fieldData.lbl.replaceAll('$_bf_$', '\\'))
              )}
              {fieldData.lblSufIcn && <img data-dev-lbl-suf-i={fieldKey} className={`${fieldKey}-lbl-suf-i`} src={fieldData.lblSufIcn} alt="" />}

              {fieldData.valid?.req && fieldData.valid?.reqShow && fieldData.valid?.reqPos === 'after' && (
                <span data-dev-req-smbl={fieldKey} className={`${fieldKey}-req-smbl`}>*</span>
              )}

            </label>
          )}
          {
            (fieldData.subtitle || fieldData.subTlePreIcn || fieldData.subTleSufIcn) && (
              <div data-dev-sub-titl={fieldKey} className={`${fieldKey}-sub-titl`}>
                {fieldData.subTlePreIcn && <img data-dev-sub-titl-pre-i={fieldKey} className={`${fieldKey}-sub-titl-pre-i`} src={fieldData.subTlePreIcn} alt="" />}
                {renderDOMObjectFromHTMLStr(fieldData.subtitle || '')}
                {fieldData.subTleSufIcn && <img data-dev-sub-titl-suf-i={fieldKey} className={`${fieldKey}-sub-titl-suf-i`} src={fieldData.subTleSufIcn} alt="" />}
              </div>
            )
          }
        </div>
      )}

      <div data-dev-inp-wrp={fieldKey} className={`${fieldKey}-inp-wrp`}>
        {/* field content here */}
        {children}

        {/* field helper text */}
        {
          (fieldData.helperTxt || fieldData.hlpPreIcn || fieldData.hlpSufIcn) && (
            <div data-dev-hlp-txt={fieldKey} className={`${fieldKey}-hlp-txt`}>
              {fieldData.hlpPreIcn && <img data-dev-hlp-txt-pre-i={fieldKey} className={`${fieldKey}-hlp-txt-pre-i`} src={fieldData.hlpPreIcn} alt="" />}
              {renderDOMObjectFromHTMLStr(fieldData.helperTxt || '')}
              {fieldData.hlpSufIcn && <img data-dev-hlp-txt-suf-i={fieldKey} className={`${fieldKey}-hlp-txt-suf-i`} src={fieldData.hlpSufIcn} alt="" />}
            </div>
          )
        }
      </div>
      {/* TEMPORARY HIDE */}
      {/* {(err || fieldData?.err) && (
        <div className={`error-wrapper ${err && 'err-msg'}`}>
          <div id={`${fieldKey}-error`} data-dev-err-msg={fieldKey} className="error-txt">
            {err}
          </div>
        </div>
      )} */}
      {/* field error message */}
      {(showAllErrorMsg || showOnlyThisFldErrMsg) && (
        <div data-dev-err-msg={fieldKey} className={`${fieldKey}-err-msg`}>
          {fieldData.errPreIcn && <img data-dev-err-txt-pre-i={fieldKey} className={`${fieldKey}-err-txt-pre-i`} src={fieldData.errPreIcn} alt="" />}
          {err || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero obcaecati totam a! Ullam dolores esse perspiciatis dignissimos vel quos quae?'}
          {fieldData.errSufIcn && <img data-dev-err-txt-suf-i={fieldKey} className={`${fieldKey}-err-txt-suf-i`} src={fieldData.errSufIcn} alt="" />}
        </div>
      )}
    </div>
  )
}
