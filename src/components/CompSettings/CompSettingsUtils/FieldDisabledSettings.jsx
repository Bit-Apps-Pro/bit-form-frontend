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

export default function FieldDisabledSettings({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const isDiasabled = fields[fldKey].disabled || false
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const { css } = useFela()
  const setDiasabled = e => {
    const { checked } = e.target

    const allFields = produce(fields, draft => {
      const fldData = draft[fldKey]
      if (checked) {
        fldData.disabled = true
      } else {
        delete fldData.disabled
      }
    })
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Disabled field ${req}`, type: `disabled_field_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div className={`${css(FieldStyle.fieldSection, FieldStyle.singleOption)} ${cls}`}>
      <SingleToggle title={__('Disabled Field:', 'bitform')} action={setDiasabled} isChecked={isDiasabled} />
    </div>
  )
}
