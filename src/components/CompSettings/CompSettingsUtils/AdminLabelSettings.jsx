import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function AdminLabelSettings() {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
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
    addToBuilderHistory({ event: `Admin label updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_adminlabel', state: { fields: allFields, fldKey } })
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
    addToBuilderHistory({ event: `Admin label ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `adminlabel_${req}`, state: { fields: allFields, fldKey } })
  }

  return (
    <SimpleAccordion
      id="admn-lbl-stng"
      title={__('Admin Label')}
      className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
      switching
      tip="By disabling this option, the field admin label will be hidden"
      tipProps={{ width: 250, icnSize: 17 }}
      toggleAction={hideAdminLabel}
      toggleChecked={fieldData?.adminLblHide}
      open={fieldData?.adminLblHide}
      disable={!fieldData?.adminLblHide}
    >
      <div className={css(FieldStyle.placeholder)}>
        <AutoResizeInput
          id="admn-lbl-stng"
          ariaLabel="Admin label for this Field"
          placeholder="Type Admin label here..."
          value={adminLabel}
          changeAction={e => setAdminLabel(e)}
        />
      </div>
    </SimpleAccordion>
  )
}
