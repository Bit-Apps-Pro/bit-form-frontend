/* eslint-disable react/jsx-props-no-spreading */
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { getCustomAttributs, getCustomClsName } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

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
          data-testid={fieldKey}
          data-dev-fld={fieldKey}
          id={fieldKey}
          className={`${fieldKey}-fld ${getCustomClsName(fieldKey, 'fld')} no-drg ${fieldData.readonly ? 'readonly' : ''}`}
          {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
          {...'readonly' in fieldData.valid && { readOnly: fieldData.valid.readonly }}
          {...getCustomAttributs(fieldKey, 'fld')}
          {...'req' in fieldData.valid && { required: fieldData.valid.req }}
        >
          {fieldData.phHide && (
            <option
              data-dev-slct-optn={fieldKey}
              className={`${fieldKey}-slct-optn ${getCustomClsName(fieldKey, 'slct-optn')}`}
              value=""
              {...getCustomAttributs(fieldKey, 'slct-optn')}
            >
              {fieldData.ph}
            </option>
          )}
          {
            fieldData.opt.map(opt => {
              if (opt.type) {
                return (
                  <optgroup
                    data-dev-slct-opt-grp={fieldKey}
                    className={`${fieldKey}-slct-opt-grp ${getCustomClsName(fieldKey, 'slct-opt-grp')}`}
                    key={opt.title}
                    label={opt.title}
                    {... { ...getCustomAttributs(fieldKey, 'slct-opt-grp') }}
                  >
                    {opt.childs.map(opt2 => (
                      <option
                        data-dev-slct-optn={fieldKey}
                        className={`${fieldKey}-slct-optn ${getCustomClsName(fieldKey, 'slct-optn')}`}
                        key={opt2.val}
                        value={opt2.val}
                        selected={opt2.check}
                        {... { ...getCustomAttributs(fieldKey, 'slct-optn') }}
                      >
                        {opt2.lbl}
                      </option>
                    ))}
                  </optgroup>
                )
              } return (
                <option
                  data-dev-slct-optn={fieldKey}
                  className={`${fieldKey}-slct-optn ${getCustomClsName(fieldKey, 'slct-optn')}`}
                  key={opt.val}
                  value={opt.val}
                  selected={opt.check}
                  {... { ...getCustomAttributs(fieldKey, 'slct-optn') }}
                >
                  {opt.lbl}
                </option>
              )
            })
          }
        </select>
      </InputWrapper>
    </>
  )
}
