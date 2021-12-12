import { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $breakpoint, $fieldsDirection, $flags } from '../GlobalStates'

export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  const breakpoint = useRecoilValue($breakpoint)
  const fieldDirection = useRecoilValue($fieldsDirection)
  const flags = useRecoilValue($flags)
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
            {fieldData.lblPreIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-lbl-pre-i`} src={fieldData.lblPreIcn} alt="" />}
            {fieldData.lbl}
            {fieldData.valid?.req && (
              <>
                {' '}
                <span className="fld-req-symbol">*</span>
              </>
            )}
            {fieldData.lblSufIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-lbl-suf-i`} src={fieldData.lblSufIcn} alt="" />}
          </label>
        )}
        {
          (fieldData.subtitle || fieldData.subTlePreIcn || fieldData.subTleSufIcn) && (
            <div data-dev-sub-titl={fieldKey} className={`${fieldKey}-sub-titl`}>
              {fieldData.subTlePreIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-sub-titl-pre-i`} src={fieldData.subTlePreIcn} alt="" />}
              {fieldData.subtitle || ''}
              {fieldData.subTleSufIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-sub-titl-suf-i`} src={fieldData.subTleSufIcn} alt="" />}
            </div>
          )
        }
      </div>
      <div data-dev-inp-wrp={fieldKey} className={`${fieldKey}-inp-wrp`}>
        {children}
        {
          (fieldData.helperTxt || fieldData.hlpPreIcn || fieldData.hlpSufIcn) && (
            <div data-dev-hlp-txt={fieldKey} className={`${fieldKey}-hlp-txt`}>
              {fieldData.hlpPreIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-hlp-txt-pre-i`} src={fieldData.hlpPreIcn} alt="" />}
              {fieldData.helperTxt || ''}
              {fieldData.hlpSufIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-hlp-txt-suf-i`} src={fieldData.hlpSufIcn} alt="" />}
            </div>
          )
        }
      </div>
      {(err || fieldData?.err) && (
        <div className={`error-wrapper ${err && 'err-msg'}`}>
          <div id={`${fieldKey}-error`} data-dev-err-msg={fieldKey} className="error-txt">
            {err}
          </div>
        </div>
      )}
    </div>
  )
}
