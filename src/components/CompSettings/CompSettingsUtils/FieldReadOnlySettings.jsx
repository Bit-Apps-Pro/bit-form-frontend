/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldReadOnlySettings({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const isReadOnly = fields[fldKey].readOnly || false
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setReadOnly = e => {
    const { checked } = e.target

    const allFields = produce(fields, draft => {
      const fldData = draft[fldKey]
      if (checked) {
        fldData.readOnly = true
      } else {
        delete fldData.readOnly
      }
    })
    console.log(allFields)
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Read only field ${req}`, type: `read_only_field_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div className={cls}>
      <SingleToggle title={__('Read only Field:', 'bitform')} action={setReadOnly} isChecked={isReadOnly} />
    </div>
  )
}
