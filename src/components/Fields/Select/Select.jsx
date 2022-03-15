import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'

export default function Select({ fieldKey, formID, styleClasses }) {
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
        <select data-dev-fld={fieldKey} id={fieldKey} className={`${fieldKey}-fld no-drg`}>
          {fieldData.phHide && <option value="">{fieldData.ph}</option>}
          {
            fieldData.opt.map(opt => <option key={opt.val} value={opt.val} selected={opt.check}>{opt.lbl}</option>)
          }
        </select>
      </InputWrapper>
    </>
  )
}
