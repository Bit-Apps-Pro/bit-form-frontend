import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import produce from 'immer'
import { $builderHistory, $fields, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import AutoResizeInput from './AutoResizeInput'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'

export default function AdminLabelSettings() {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const fieldData = deepCopy(fields[fldKey])
  const adminLabel = fieldData.adminLbl || ''

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Admin label updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_adminlabel', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideAdminLabel = (e) => {
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
      fieldData.adminLblHide = true
    } else {
      fieldData.adminLblHide = false
      delete fieldData.adminLbl
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Admin label ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `adminlabel_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <SimpleAccordion
      title={__('Admin Label', 'bitform')}
      className={css(FieldStyle.fieldSection)}
      switching
      toggleAction={hideAdminLabel}
      toggleChecked={fieldData?.adminLblHide}
      open={fieldData?.adminLblHide}
      disable={!fieldData?.adminLblHide}
    >
      <div className={css(FieldStyle.placeholder)}>
        <AutoResizeInput
          ariaLabel="Admin label for this Field"
          placeholder="Type Admin label here..."
          value={adminLabel}
          changeAction={e => setAdminLabel(e)}
        />
      </div>
    </SimpleAccordion>
  )
}
