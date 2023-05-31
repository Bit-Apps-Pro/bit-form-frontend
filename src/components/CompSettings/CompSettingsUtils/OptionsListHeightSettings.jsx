/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

export default function OptionsListHeightSettings({ cls }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])

  const { css } = useFela()

  const handleHeightChange = (val) => {
    fieldData.config.maxHeight = val
    if (!val) delete fieldData.config.maxHeight
    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Options List Height '${String(val || 'Off').replace('true', 'On')}': ${fieldData.lbl || fldKey}`, type: 'height_changed', state: { fields: allFields, fldKey } })
  }

  return (
    <SimpleAccordion id="nmbr-stng" title="Options List Height:" className={css(FieldStyle.fieldSection)} isPro proProperty="listHeight">
      <div className={css({ mx: 5 })}>
        <div className={css(FieldStyle.fieldNumber, { py: '0px !important' })}>
          <span>{__('Maximum:')}</span>
          <input
            data-testid="nmbr-stng-min-inp"
            title="Maximum height of Option List(Ex: 400)"
            aria-label="Maximum height of Option List"
            placeholder="Type Maximum Height..."
            className={css(FieldStyle.input, FieldStyle.w140)}
            type="number"
            value={fieldData.config.maxHeight || ''}
            onChange={e => handleHeightChange(e.target.value)}
          />
        </div>
      </div>
    </SimpleAccordion>
  )
}
