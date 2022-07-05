import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

export default function PlaceholderSettings() {
  console.log('%cRander Place Holder Setting', 'background:green;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const { css } = useFela()
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const adminLabel = fieldData.adminLbl || ''
  const placeholder = fieldData.ph || ''

  const hidePlaceholder = (e) => {
    if (e.target.checked) {
      fieldData.ph = 'Placeholder Text...'
      fieldData.phHide = true
    } else {
      fieldData.phHide = false
      delete fieldData.ph
    }
    const req = e.target.checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Placeholder: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_placeholder`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setPlaceholder(e) {
    if (e.target.value === '') {
      delete fieldData.ph
    } else {
      fieldData.ph = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Placeholder updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_placeholder', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <SimpleAccordion
      id="plchldr-stng"
      title={__('Placeholder', 'bitform')}
      className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
      switching
      tip="By disabling this option, the field placeholder will be hidden"
      tipProps={{ width: 250, icnSize: 17 }}
      toggleAction={hidePlaceholder}
      toggleChecked={fieldData?.phHide}
      open={fieldData?.phHide}
      disable={!fieldData?.phHide}
    >
      <div className={css(FieldStyle.placeholder)}>
        <input
          data-testid="plchldr-stng-inp"
          aria-label="Placeholer for this Field"
          placeholder="Type Placeholder here..."
          className={css(FieldStyle.input)}
          type="text"
          value={placeholder}
          onChange={setPlaceholder}
        />
      </div>
    </SimpleAccordion>
  )
}
