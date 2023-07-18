import { useAtom } from 'jotai'
import { create } from 'mutative'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

const pos = [
  { name: __('Left'), value: 'start' },
  { name: __('Center'), value: 'center' },
  { name: __('Right'), value: 'end' },
  { name: __('Space Between'), value: 'space-between' },
]

export default function ControlBtnPosition() {
  const { fieldKey: fldKey } = useParams()
  const { css } = useFela()
  const [styles, setStyles] = useAtom($styles)
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fldKey])

  const [btnAlign, setBtnAlign] = useState(fieldData.btnAlign)

  function setButtonAlign(e) {
    const { value } = e.target

    setStyles(preStyle => create(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[`.${fldKey}-ctrl`]['justify-content'] = value
    }))

    fieldData.btnAlign = value
    setFields(create(fields, draft => { draft[fldKey] = fieldData }))
    setBtnAlign(value)
    addToBuilderHistory({ event: `Button Alignment changed to ${value}: ${fieldData.txt}`, type: 'set_btn_align', state: { fields, fldKey } })
  }

  return (
    <SimpleAccordion
      id="btn-algn"
      title={__('Button Align')}
      className={css(FieldStyle.fieldSection)}
      open
    >
      <div className={css(FieldStyle.placeholder)}>
        <select
          data-testid="btn-algn-slct"
          className={css(FieldStyle.input)}
          name=""
          id=""
          value={btnAlign}
          onChange={setButtonAlign}
        >
          {pos.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
        </select>
      </div>
    </SimpleAccordion>
  )
}
