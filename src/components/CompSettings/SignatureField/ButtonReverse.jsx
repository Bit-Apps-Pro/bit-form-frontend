/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom, useSetAtom } from 'jotai'
import { $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { IS_PRO } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import SingleToggle from '../../Utilities/SingleToggle'
import { $styles } from '../../../GlobalStates/StylesState'

export default function ButtonReverse({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const isReverse = fields[fldKey].btnDir || false
  const { css } = useFela()
  const setStyles = useSetAtom($styles)

  const setReverse = ({ target }) => {
    if (!IS_PRO) return
    const { checked } = target
    let btnDirValue = 'row'
    const allFields = create(fields, draft => {
      const fldData = draft[fldKey]

      if (checked) {
        fldData.btnDir = 'row-reverse'
        btnDirValue = 'row-reverse'
      } else {
        delete fldData.btnDir
      }
    })

    setStyles(preStyle => create(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[`.${fldKey}-ctrl`]['flex-direction'] = btnDirValue
    }))

    const req = checked ? 'on' : 'off'
    setFields(allFields)
    addToBuilderHistory({ event: `Button reverse ${req}`, type: 'button_reverse_on_off', state: { fields: allFields, fldKey } })
  }

  return (
    <div className={`${css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)} ${cls}`}>
      <SingleToggle
        id="fld-hid-stng"
        tip={tippyHelperMsg.btnReverse}
        title={__('Button Reverse')}
        action={setReverse}
        isChecked={isReverse}
        isPro
        proProperty="reverse"
      />
    </div>
  )
}
