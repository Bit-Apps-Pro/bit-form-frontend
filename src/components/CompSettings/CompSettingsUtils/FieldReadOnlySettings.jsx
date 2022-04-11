/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldReadOnlySettings({ cls, tip }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const isReadOnly = fields[fldKey].readonly || false
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const { css } = useFela()
  const setReadOnly = e => {
    const { checked } = e.target

    const allFields = produce(fields, draft => {
      const fldData = draft[fldKey]
      if (checked) {
        fldData.readonly = true
      } else {
        delete fldData.readonly
      }
    })
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Read only field ${req}`, type: `read_only_field_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div className={`${css(FieldStyle.fieldSection, FieldStyle.singleOption, FieldStyle.hover_tip)} ${cls}`}>
      <SingleToggle
        tip={tip}
        title={__('Read only Field', 'bitform')}
        action={setReadOnly}
        isChecked={isReadOnly}
      />
    </div>
  )
}
