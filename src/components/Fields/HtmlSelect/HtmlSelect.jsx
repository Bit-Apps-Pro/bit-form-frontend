/* eslint-disable react/jsx-props-no-spreading */
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'

export default function HtmlSelect({ fieldKey, formID, styleClasses }) {
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={fieldData}
      >
        <select
          data-dev-fld={fieldKey}
          id={fieldKey}
          className={`${fieldKey}-fld no-drg ${fieldData.readonly ? 'readonly' : ''}`}
          {...'disabled' in fieldData && { disabled: fieldData.disabled }}
          {...'readonly' in fieldData && { readOnly: fieldData.readonly }}
        >
          {fieldData.phHide && <option data-dev-slct-optn={fieldKey} className={`${fieldKey}-slct-optn`} value="">{fieldData.ph}</option>}
          {
            fieldData.opt.map(opt => {
              if (opt.type) {
                return (
                  <optgroup data-dev-slct-opt-grp={fieldKey} className={`${fieldKey}-slct-opt-grp`} key={opt.title} label={opt.title}>
                    {opt.childs.map(opt2 => <option data-dev-slct-optn={fieldKey} className={`${fieldKey}-slct-optn`} key={opt2.val} value={opt2.val} selected={opt2.check}>{opt2.lbl}</option>)}
                  </optgroup>
                )
              } return <option data-dev-slct-optn={fieldKey} className={`${fieldKey}-slct-optn`} key={opt.val} value={opt.val} selected={opt.check}>{opt.lbl}</option>
            })
          }
        </select>
      </InputWrapper>
    </>
  )
}
