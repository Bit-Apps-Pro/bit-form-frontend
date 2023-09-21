import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import { deepCopy } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'
import RenderHtml from '../Utilities/RenderHtml'

/* eslint-disable react/jsx-props-no-spreading */
export default function StepButton({
  styleClasses, buttonDisabled, handleReset, formID, data, btnInfo,
}) {
  const styleClassesForRender = deepCopy(styleClasses)
  const fieldKey = btnInfo?.key
  return (
    <>
      <RenderStyle styleClasses={styleClassesForRender} />

      <button
        data-testid={fieldKey}
        {...{ [`data-dev-${btnInfo.key}`]: formID }}
        className={`_frm-b${formID}-${fieldKey} ${getCustomClsName(fieldKey, 'btn')}`}
        {...getCustomAttributes(fieldKey, 'btn')}
        // eslint-disable-next-line react/button-has-type
        type={btnInfo.typ}
        name={btnInfo.btnType}
      >
        {btnInfo.preIcn && (
          <img
            data-testid={`_frm-b${formID}-${fieldKey}-pre-i`}
            data-dev-pre-i={fieldKey}
            className={`_frm-b${formID}-${fieldKey}-pre-i ${getCustomClsName(fieldKey, 'pre-i')}`}
            src={btnInfo.preIcn}
            alt="Previous Step Button"
            {...getCustomAttributes(fieldKey, 'pre-i')}
          />
        )}
        <RenderHtml html={btnInfo.txt || ''} />
        {btnInfo.sufIcn && (
          <img
            data-testid={`_frm-b${formID}-${fieldKey}-suf-i`}
            data-dev-suf-i={fieldKey}
            className={`_frm-b${formID}-${fieldKey}-suf-i ${getCustomClsName(fieldKey, 'suf-i')}`}
            src={btnInfo.sufIcn}
            alt=""
            {...getCustomAttributes(fieldKey, 'suf-i')}
          />
        )}
      </button>
    </>
  )
}
