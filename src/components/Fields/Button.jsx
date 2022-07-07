import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { getCustomAttributs, getCustomClsName } from '../../Utils/globalHelpers'
import { deepCopy } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'
import RenderHtml from '../Utilities/RenderHtml'

/* eslint-disable react/jsx-props-no-spreading */
export default function Button({ fieldKey, attr: fieldData, styleClasses, buttonDisabled, handleReset, formID, data }) {
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.valid.hidden?.includes(breakpoint) || false
  const styleClassesForRender = deepCopy(styleClasses)
  return (
    <>
      <RenderStyle styleClasses={styleClassesForRender} />
      <div
        data-testid={`${fieldKey}-fld-wrp`}
        data-dev-fld-wrp={fieldKey}
        className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''} ${getCustomClsName(fieldKey, 'fld-wrp')}`}
        {...getCustomAttributs(fieldKey, 'fld-wrp')}
      >
        <button
          data-testid={fieldKey}
          data-dev-btn={fieldKey}
          className={`${fieldKey}-btn ${getCustomClsName(fieldKey, 'btn')}`}
          {...getCustomAttributs(fieldKey, 'btn')}
          // eslint-disable-next-line react/button-has-type
          type={fieldData.btnTyp}
          {...fieldData.btnTyp === 'reset' && { onClick: handleReset }}
          {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
        >
          {fieldData.btnPreIcn && (
            <img
              data-testid={`${fieldKey}-btn-pre-i`}
              data-dev-btn-pre-i={fieldKey}
              className={`${fieldKey}-btn-pre-i ${getCustomClsName(fieldKey, 'btn-pre-i')}`}
              src={fieldData.btnPreIcn}
              alt=""
              {...getCustomAttributs(fieldKey, 'btn-pre-i')}
            />
          )}
          <RenderHtml html={fieldData.txt || ''} />
          {fieldData.btnSufIcn && (
            <img
              data-testid={`${fieldKey}-btn-suf-i`}
              data-dev-btn-suf-i={fieldKey}
              className={`${fieldKey}-btn-suf-i ${getCustomClsName(fieldKey, 'btn-suf-i')}`}
              src={fieldData.btnSufIcn}
              alt=""
              {...getCustomAttributs(fieldKey, 'btn-suf-i')}
            />
          )}
        </button>
        {
          (fieldData.helperTxt) && (
            <div
              data-testid={`${fieldKey}-hlp-txt`}
              data-dev-hlp-txt={fieldKey}
              {...getCustomAttributs(fieldKey, 'hlp-txt')}
              className={`${fieldKey}-hlp-txt ${getCustomClsName(fieldKey, 'hlp-txt')}`}
            >
              {/* Prefix icon */}
              {fieldData.hlpPreIcn && (
                <img
                  data-testid={`${fieldKey}-hlp-txt-pre-i`}
                  data-dev-hlp-txt-pre-i={fieldKey}
                  className={`${fieldKey}-hlp-txt-pre-i ${getCustomClsName(fieldKey, 'hlp-txt-pre-i')}`}
                  src={fieldData.hlpPreIcn}
                  alt=""
                  {...getCustomAttributs(fieldKey, 'hlp-txt-pre-i')}
                />
              )}
              {/* Helper text */}
              <RenderHtml html={fieldData.helperTxt || ''} />
              {/* suffix icon */}
              {fieldData.hlpSufIcn && (
                <img
                  data-testid={`${fieldKey}-hlp-txt-suf-i`}
                  data-dev-hlp-txt-suf-i={fieldKey}
                  className={`${fieldKey}-hlp-txt-suf-i ${getCustomClsName(fieldKey, 'hlp-txt-suf-i')}`}
                  src={fieldData.hlpSufIcn}
                  alt=""
                  {...getCustomAttributs(fieldKey, 'hlp-txt-suf-i')}
                />
              )}
            </div>
          )
        }
      </div>
    </>
  )
}
