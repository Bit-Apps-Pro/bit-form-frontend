/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldHideSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const breakpoint = useRecoilValue($breakpoint)
  const [fields, setFields] = useRecoilState($fields)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const isHidden = fields[fldKey].hidden?.includes(breakpoint) || false
  const setHidden = e => {
    const { checked } = e.target
    setFields(allFields => produce(allFields, draft => {
      const fldData = draft[fldKey]
      if (!fldData.hidden) fldData.hidden = []
      if (checked) {
        fldData.hidden.push(breakpoint)
      } else {
        fldData.hidden.splice(fldData.hidden.indexOf(breakpoint), 1)
      }
      if (!fldData.hidden.length) delete fldData.hidden
    }))
    setUpdateBtn({ unsaved: true })
  }

  return <SingleToggle title={__('Hidden Field:', 'bitform')} action={setHidden} isChecked={isHidden} className="mt-3" />
}
