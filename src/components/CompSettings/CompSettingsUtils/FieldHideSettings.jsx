/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $fields, $layouts, $selectedFieldId, $updateBtn } from '../../../GlobalStates'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldHideSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const [fields, setFields] = useRecoilState($fields)
  const setLayouts = useSetRecoilState($layouts)
  const breakpoint = useRecoilValue($breakpoint)
  const fieldData = deepCopy(fields[fldKey])
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  const setHidden = e => {
    if (e.target.checked) {
      if (!fieldData.hidden) fieldData.hidden = []
      fieldData.hidden.push(breakpoint)
      setLayouts(oldLayouts => produce(oldLayouts, draft => {
        const fldLayIndex = draft[breakpoint].findIndex(lay => lay.i === fldKey)
        draft[breakpoint][fldLayIndex].hidden = true
      }))
    } else if (Array.isArray(fieldData.hidden)) {
      fieldData.hidden.splice(fieldData.hidden.indexOf(breakpoint), 1)
      if (!fieldData.hidden.length) delete fieldData.hidden
      setLayouts(oldLayouts => produce(oldLayouts, draft => {
        const fldLayIndex = draft[breakpoint].findIndex(lay => lay.i === fldKey)
        draft[breakpoint][fldLayIndex].hidden = false
      }))
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    setUpdateBtn({ unsaved: true })
  }

  return <SingleToggle title={__('Hidden Field:', 'bitform')} action={setHidden} isChecked={isHidden} className="mt-3" />
}
