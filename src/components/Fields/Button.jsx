import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import { deepCopy } from '../../Utils/Helpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'
import RenderHtml from '../Utilities/RenderHtml'

/* eslint-disable react/jsx-props-no-spreading */
export default function Button({
  fieldKey, attr: fieldData, styleClasses, buttonDisabled, handleReset, formID, data,
}) {
  const styleClassesForRender = deepCopy(styleClasses)
  return (
    <>
      <RenderStyle styleClasses={styleClassesForRender} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={fieldData}
        noLabel
        noErrMsg
      >
        <button
          data-testid={fieldKey}
          data-dev-btn={fieldKey}
          className={`${fieldKey}-btn ${getCustomClsName(fieldKey, 'btn')}`}
          {...getCustomAttributes(fieldKey, 'btn')}
          // eslint-disable-next-line react/button-has-type
          type={fieldData.btnTyp}
          {...fieldData.btnTyp === 'reset' && { onClick: handleReset }}
          {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
          name={fieldData.fieldName}
        >
          {fieldData.btnPreIcn && (
            <img
              data-testid={`${fieldKey}-btn-pre-i`}
              data-dev-btn-pre-i={fieldKey}
              className={`${fieldKey}-btn-pre-i ${getCustomClsName(fieldKey, 'btn-pre-i')}`}
              src={fieldData.btnPreIcn}
              alt=""
              {...getCustomAttributes(fieldKey, 'btn-pre-i')}
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
              {...getCustomAttributes(fieldKey, 'btn-suf-i')}
            />
          )}
        </button>
      </InputWrapper>
    </>
  )
}
