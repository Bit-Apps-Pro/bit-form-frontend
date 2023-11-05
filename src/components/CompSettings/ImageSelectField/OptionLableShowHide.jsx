/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, reCalculateFldHeights } from '../../../Utils/FormBuilderHelper'
import { IS_PRO } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import SingleToggle from '../../Utilities/SingleToggle'
import { addDefaultStyleClasses } from '../../style-new/styleHelpers'

export default function OptionLableShowHide({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const isImageLbl = fields[fldKey].optLblHide
  const { css } = useFela()

  const setImgLbl = ({ target }) => {
    if (!IS_PRO) return
    const { checked } = target
    const allFields = create(fields, draft => {
      const fldData = draft[fldKey]

      if (checked) {
        fldData.optLblHide = true
      } else {
        fldData.optLblHide = false
        addDefaultStyleClasses(fldKey, 'imageSelectOptLbl')
      }
    })
    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory({ event: `Hide image ${req}`, type: 'Hide_image_label_on_off', state: { fields: allFields, fldKey } })
    reCalculateFldHeights(fldKey)
  }

  return (
    <div className={`${css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)} ${cls}`}>
      <SingleToggle
        id="opt-img-lbl-hide-or-show"
        tip={tippyHelperMsg.imageOptLbl}
        title={__('Hide Image Label')}
        action={setImgLbl}
        isChecked={isImageLbl}
        isPro
        proProperty="hidden"
      />
    </div>
  )
}
