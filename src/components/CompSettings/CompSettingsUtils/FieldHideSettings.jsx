/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { $breakpoint, $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldHideSettings({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const breakpoint = useRecoilValue($breakpoint)
  const [fields, setFields] = useRecoilState($fields)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const isHidden = fields[fldKey].hidden?.includes(breakpoint) || false
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setHidden = e => {
    const { checked } = e.target

    const allFields = produce(fields, draft => {
      const fldData = draft[fldKey]
      if (!fldData.hidden) fldData.hidden = []
      if (checked) {
        fldData.hidden.push(breakpoint)
      } else {
        fldData.hidden.splice(fldData.hidden.indexOf(breakpoint), 1)
      }
      if (!fldData.hidden.length) delete fldData.hidden
    })
    console.log(allFields)
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Hidden Field ${req}`, type: `hide_Field_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div className={cls}>
      <SingleToggle title={__('Hidden Field:', 'bitform')} action={setHidden} isChecked={isHidden} />
    </div>
  )
}
