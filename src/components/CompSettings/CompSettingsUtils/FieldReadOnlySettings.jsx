/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldReadOnlySettings({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const isReadOnly = fields[fldKey].valid.readonly || false
  const { css } = useFela()
  const setReadOnly = e => {
    const { checked } = e.target

    const allFields = produce(fields, draft => {
      const fldData = draft[fldKey]
      if (checked) {
        fldData.valid.readonly = true
      } else {
        delete fldData.valid.readonly
      }
    })
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory({ event: `Read only field ${req}`, type: 'read_only_field_on_off', state: { fields: allFields, fldKey } })
  }

  return (
    <div className={`${css(FieldStyle.fieldSection, FieldStyle.singleOption, FieldStyle.hover_tip)} ${cls}`}>
      <SingleToggle
        id="rdonly-stng"
        tip="By disabling this option, the field readonly will be hidden"
        title={__('Read only Field')}
        action={setReadOnly}
        isChecked={isReadOnly}
      />
    </div>
  )
}
