import { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import { $breakpoint, $fieldsDirection, $flags } from '../GlobalStates'

export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  const breakpoint = useRecoilValue($breakpoint)
  const fieldDirection = useRecoilValue($fieldsDirection)
  const { styleMode } = useRecoilValue($flags)
  const { rightBar, element, fieldKey: urlFldKey } = useParams()
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

  return (
    <div
      data-dev-fld-wrp={fieldKey}
      className={`${fieldKey}-fld-wrp  ${styleMode ? '' : 'drag'} ${isBuilder ? 'o-h' : ''} ${fieldData?.valid?.hide ? 'vis-n' : ''} ${isHidden ? 'fld-hide' : ''}`}
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
            {fieldData.lblPreFix && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-lbl-pre-i`} src={fieldData.lblPreFix} alt="" />}
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
          (fieldData.subtitle || fieldData.subTleIcn) && (
            <div data-dev-sub-titl={fieldKey} className={`${fieldKey}-sub-titl`}>
              {fieldData.subTleIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-sub-titl-icn`} src={fieldData.subTleIcn} alt="" />}
              {fieldData.subtitle}
            </div>
          )
        }
      </div>
      <div data-dev-inp-wrp={fieldKey} className={`${fieldKey}-inp-wrp`}>
        {children}
        {(fieldData.helperTxt || fieldData.hlpTxtIcn) && (
          <div
            data-dev-hlp-txt={fieldKey}
            className={`${fieldKey}-hlp-txt`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: renderHelperText(fieldKey, fieldData.hlpTxtIcn, fieldData.helperTxt) }}
          />
        )}
      </div>
      {/* TEMPORARY HIDE */}
      {/* {(err || fieldData?.err) && (
        <div className={`error-wrapper ${err && 'err-msg'}`}>
          <div id={`${fieldKey}-error`} data-dev-err-msg={fieldKey} className="error-txt">
            {err}
          </div>
        </div>
      )} */}
      {(showAllErrorMsg || showOnlyThisFldErrMsg) && (
        <div className={`${fieldKey}-err-msg`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut distinctio recusandae libero voluptates, rerum blanditiis quisquam? A sapiente, cum molestiae ratione voluptatem ipsam veniam obcaecati.</div>
      )}
    </div>
  )
}

function renderHelperText(fieldKey, hlpTxtIcn, hlpTxt) {
  return `
  ${hlpTxtIcn ? `
    <img
      data-dev-pre-i="${fieldKey}"
      className="${fieldKey}-hlp-txt-icn"}
      src="${hlpTxtIcn}"
      alt=""
    />
  ` : ''}
  ${hlpTxt && hlpTxt}
</div>`
}
