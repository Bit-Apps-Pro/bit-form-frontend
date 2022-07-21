/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $breakpoint, $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldHideSettings({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const breakpoint = useRecoilValue($breakpoint)
  const [fields, setFields] = useRecoilState($fields)
  const isHidden = fields[fldKey].valid.hidden?.includes(breakpoint) || false
  const { css } = useFela()
  const setHidden = e => {
    const { checked } = e.target

    const allFields = produce(fields, draft => {
      const fldData = draft[fldKey]
      if (!fldData.valid.hidden) fldData.valid.hidden = []
      if (checked) {
        fldData.valid.hidden.push(breakpoint)
      } else {
        fldData.valid.hidden.splice(fldData.valid.hidden.indexOf(breakpoint), 1)
      }
      if (!fldData.valid.hidden.length) delete fldData.valid.hidden
    })
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory({ event: `Hidden Field ${req}`, type: 'hide_Field_on_off', state: { fields: allFields, fldKey } })
  }

  return (
    <div className={`${css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)} ${cls}`}>
      <SingleToggle
        id="fld-hid-stng"
        tip="By disabling this option, the field will be hidden"
        title={__('Hidden Field')}
        action={setHidden}
        isChecked={isHidden}
      />
    </div>
  )
}
