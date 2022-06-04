/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../GlobalStates/GlobalStates'
import { $fieldsDirection } from '../GlobalStates/ThemeVarsState'
import { getCustomAttributs, getCustomClsName } from '../Utils/globalHelpers'
import { renderHTMR } from '../Utils/Helpers'

export default function InputWrapper({ formID, fieldKey, fieldData, children, noLabel, isBuilder }) {
  const { rightBar, element, fieldKey: urlFldKey } = useParams()
  const breakpoint = useRecoilValue($breakpoint)
  const fieldDirection = useRecoilValue($fieldsDirection)
  const flages = useRecoilValue($flags)
  const { styleMode } = flages
  const showAllErrorMsg = styleMode && rightBar === 'theme-customize' && element === 'err-msg'
  const showOnlyThisFldErrMsg = styleMode && rightBar === 'field-theme-customize' && element === 'err-msg' && urlFldKey === fieldKey
  const isHidden = fieldData.valid.hidden?.includes(breakpoint) || false

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
      data-testid={`${fieldKey}-fld-wrp`}
      data-dev-fld-wrp={fieldKey}
      className={`${fieldKey}-fld-wrp ${getCustomClsName(fieldKey, 'fld-wrp')} ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}
      style={{ direction: fieldDirection }}
      {... { ...getCustomAttributs(fieldKey, 'fld-wrp') }}
    >
      {!noLabel && (
        <div
          data-testid={`${fieldKey}-lbl-wrp`}
          data-dev-lbl-wrp={fieldKey}
          className={`${fieldKey}-lbl-wrp ${getCustomClsName(fieldKey, 'lbl-wrp')}`}
          {... { ...getCustomAttributs(fieldKey, 'lbl-wrp') }}
        >
          {(!fieldData?.valid?.hideLbl && 'lbl' in fieldData) && (
            <label
              data-testid={`${fieldKey}-lbl`}
              data-dev-lbl={fieldKey}
              title={fieldData.lbl}
              className={`${fieldKey}-lbl ${getCustomClsName(fieldKey, 'lbl')}`}
              htmlFor={fieldKey}
              {... { ...getCustomAttributs(fieldKey, 'lbl') }}
            >
              {fieldData.valid?.req && fieldData.valid?.reqShow && fieldData.valid?.reqPos === 'before' && (
                <span
                  data-testid={`${fieldKey}-req-smbl`}
                  data-dev-req-smbl={fieldKey}
                  className={`${fieldKey}-req-smbl ${getCustomClsName(fieldKey, 'req-smbl')}`}
                  {... { ...getCustomAttributs(fieldKey, 'req-smbl') }}
                >
                  *
                </span>
              )}
              {fieldData.lblPreIcn && (
                <img
                  data-testid={`${fieldKey}-lbl-pre-i`}
                  data-dev-lbl-pre-i={fieldKey}
                  className={`${fieldKey}-lbl-pre-i ${getCustomClsName(fieldKey, 'lbl-pre-i')}`}
                  src={fieldData.lblPreIcn}
                  alt=""
                  {... { ...getCustomAttributs(fieldKey, 'lbl-pre-i') }}
                />
              )}
              {renderHTMR(fieldData.lbl.replaceAll('$_bf_$', '\\'))}
              {fieldData.lblSufIcn && (
                <img
                  data-testid={`${fieldKey}-lbl-suf-i`}
                  data-dev-lbl-suf-i={fieldKey}
                  className={`${fieldKey}-lbl-suf-i ${getCustomClsName(fieldKey, 'lbl-suf-i')}`}
                  src={fieldData.lblSufIcn}
                  alt=""
                  {... { ...getCustomAttributs(fieldKey, 'lbl-suf-i') }}
                />
              )}

              {fieldData.valid?.req && fieldData.valid?.reqShow && fieldData.valid?.reqPos !== 'before' && (
                <span
                  data-testid={`${fieldKey}-req-smbl`}
                  data-dev-req-smbl={fieldKey}
                  className={`${fieldKey}-req-smbl ${getCustomClsName(fieldKey, 'req-smbl')}`}
                  {... { ...getCustomAttributs(fieldKey, 'req-smbl') }}
                >
                  *
                </span>
              )}
            </label>
          )}
          {
            (fieldData.subtitle || fieldData.subTlePreIcn || fieldData.subTleSufIcn) && (
              <div
                data-testid={`${fieldKey}-sub-titl`}
                data-dev-sub-titl={fieldKey}
                className={`${fieldKey}-sub-titl ${getCustomClsName(fieldKey, 'sub-titl')}`}
                {... { ...getCustomAttributs(fieldKey, 'sub-titl') }}
              >
                {fieldData.subTlePreIcn && (
                  <img
                    data-testid={`${fieldKey}-sub-titl-pre-i`}
                    data-dev-sub-titl-pre-i={fieldKey}
                    className={`${fieldKey}-sub-titl-pre-i ${getCustomClsName(fieldKey, 'sub-titl-pre-i')}`}
                    src={fieldData.subTlePreIcn}
                    alt=""
                    {... { ...getCustomAttributs(fieldKey, 'sub-titl-pre-i') }}
                  />
                )}
                {renderHTMR(fieldData.subtitle || '')}
                {fieldData.subTleSufIcn && (
                  <img
                    data-testid={`${fieldKey}-sub-titl-suf-i`}
                    data-dev-sub-titl-suf-i={fieldKey}
                    className={`${fieldKey}-sub-titl-suf-i ${getCustomClsName(fieldKey, 'sub-titl-suf-i')}`}
                    src={fieldData.subTleSufIcn}
                    alt=""
                    {... { ...getCustomAttributs(fieldKey, 'sub-titl-suf-i') }}
                  />
                )}
              </div>
            )
          }
        </div>
      )}

      <div
        data-testid={`${fieldKey}-inp-wrp`}
        data-dev-inp-wrp={fieldKey}
        className={`${fieldKey}-inp-wrp ${getCustomClsName(fieldKey, 'inp-wrp')}`}
        {... { ...getCustomAttributs(fieldKey, 'inp-wrp') }}
      >
        {/* field content here */}
        {children}

        {/* field helper text */}
        {
          (fieldData.helperTxt || fieldData.hlpPreIcn || fieldData.hlpSufIcn) && (
            <div
              data-testid={`${fieldKey}-hlp-txt`}
              data-dev-hlp-txt={fieldKey}
              className={`${fieldKey}-hlp-txt ${getCustomClsName(fieldKey, 'hlp-txt')}`}
              {... { ...getCustomAttributs(fieldKey, 'hlp-txt') }}
            >
              {fieldData.hlpPreIcn && (
                <img
                  data-testid={`${fieldKey}-hlp-txt-pre-i`}
                  data-dev-hlp-txt-pre-i={fieldKey}
                  className={`${fieldKey}-hlp-txt-pre-i ${getCustomClsName(fieldKey, 'hlp-txt-pre-i')}`}
                  src={fieldData.hlpPreIcn}
                  alt=""
                  {... { ...getCustomAttributs(fieldKey, 'hlp-txt-pre-i') }}
                />
              )}
              {renderHTMR(fieldData.helperTxt || '')}
              {fieldData.hlpSufIcn && (
                <img
                  data-testid={`${fieldKey}-hlp-txt-suf-i`}
                  data-dev-hlp-txt-suf-i={fieldKey}
                  className={`${fieldKey}-hlp-txt-suf-i ${getCustomClsName(fieldKey, 'hlp-txt-suf-i')}`}
                  src={fieldData.hlpSufIcn}
                  alt=""
                  {... { ...getCustomAttributs(fieldKey, 'hlp-txt-suf-i') }}
                />
              )}
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
        <div
          data-testid={`${fieldKey}-err-msg`}
          data-dev-err-msg={fieldKey}
          className={`${fieldKey}-err-msg ${getCustomClsName(fieldKey, 'err-msg')}`}
          {... { ...getCustomAttributs(fieldKey, 'err-msg') }}
        >
          {fieldData.errPreIcn && (
            <img
              data-testid={`${fieldKey}-err-txt-pre-i`}
              data-dev-err-txt-pre-i={fieldKey}
              className={`${fieldKey}-err-txt-pre-i ${getCustomClsName(fieldKey, 'err-txt-pre-i')}`}
              src={fieldData.errPreIcn}
              alt=""
              {... { ...getCustomAttributs(fieldKey, 'err-txt-pre-i') }}
            />
          )}
          {err || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero obcaecati totam a! Ullam dolores esse perspiciatis dignissimos vel quos quae?'}
          {fieldData.errSufIcn && (
            <img
              data-testid={`${fieldKey}-err-txt-suf-i`}
              data-dev-err-txt-suf-i={fieldKey}
              className={`${fieldKey}-err-txt-suf-i ${getCustomClsName(fieldKey, 'err-txt-suf-i')}`}
              src={fieldData.errSufIcn}
              alt=""
              {... { ...getCustomAttributs(fieldKey, 'err-txt-suf-i') }}
            />
          )}
        </div>
      )}
    </div>
  )
}
