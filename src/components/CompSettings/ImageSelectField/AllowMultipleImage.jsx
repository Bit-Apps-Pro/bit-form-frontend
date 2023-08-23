/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { IS_PRO } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import SingleToggle from '../../Utilities/SingleToggle'

export default function AllowMultipleImage({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const isMultiple = fields[fldKey].inpType === 'checkbox'
  const { css } = useFela()

  const setMultipleImage = ({ target }) => {
    if (!IS_PRO) return
    const { checked } = target
    const allFields = create(fields, draft => {
      const fldData = draft[fldKey]

      if (checked) {
        fldData.inpType = 'checkbox'
      } else {
        fldData.inpType = 'radio'
      }
    })
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory({ event: `Allow multiple image ${req}`, type: 'allow_multiple_on_off', state: { fields: allFields, fldKey } })
  }

  return (
    <div className={`${css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)} ${cls}`}>
      <SingleToggle
        id="allow-multiple-stng"
        tip={tippyHelperMsg.imageMultipleImage}
        title={__('Allow multiple image')}
        action={setMultipleImage}
        isChecked={isMultiple}
        isPro
        proProperty="hidden"
      />
    </div>
  )
}
