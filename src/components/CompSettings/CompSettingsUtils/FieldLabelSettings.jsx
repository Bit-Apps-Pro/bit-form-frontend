import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../../GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

export default function FieldLabelSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const label = fieldData.lbl || ''
  const { css } = useFela()
  function setLabel(e) {
    if (e.target.value === '') {
      delete fieldData.lbl
    } else {
      fieldData.lbl = e.target.value
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const hideFieldLabel = e => {
    if (!e.target.checked) {
      fieldData.valid.hideLbl = true
    } else {
      delete fieldData.valid.hideLbl
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <SimpleAccordion
      title={__('Field Label:', 'bitform')}
      className={`${css(FieldStyle.fieldSection)} ${css(FieldStyle.hover_tip)}`}
      switching
      tip="By disabling this option, the field label will be hidden"
      tipProps={{ width: 250, icnSize: 17 }}
      toggleAction={hideFieldLabel}
      toggleChecked={!fieldData.valid.hideLbl}
      open
    >
      <input className={`${css(FieldStyle.input)}`} type="text" onChange={setLabel} value={label} />
    </SimpleAccordion>
  )
}
