/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $breakpoint, $layouts, $selectedFieldId } from '../../../GlobalStates'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldHideSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const [layouts, setLayouts] = useRecoilState($layouts)
  const breakpoint = useRecoilValue($breakpoint)
  const fldLayIndex = layouts[breakpoint].findIndex(lay => lay.i === fldKey)
  const isHidden = layouts[breakpoint][fldLayIndex]?.hidden || false
  const setHidden = e => {
    const { checked } = e.target
    setLayouts(oldLayouts => produce(oldLayouts, draft => {
      if (checked) draft[breakpoint][fldLayIndex].hidden = true
      else delete draft[breakpoint][fldLayIndex].hidden
    }))
  }

  return <SingleToggle title={__('Hidden Field:', 'bitform')} action={setHidden} isChecked={isHidden} className="mt-3" />
}
