import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

export default function FieldNameSettings() {
  console.log('%cRander Place Holder Setting', 'background:green;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const { css } = useFela()
  const adminLabel = fieldData.adminLbl || ''
  const { fieldName } = fieldData
  const [nameErr, setNameErr] = useState(false)

  const handleFieldName = ({ target: { value } }) => {
    if (value !== '') {
      const allFieldsArr = Object.values(fields)
      const duplicateFieldName = allFieldsArr.find(({ fieldName: fldName }) => fldName === value)

      if (duplicateFieldName) {
        setNameErr(true)
      } else {
        setNameErr(false)
      }

      fieldData.fieldName = value
    }
    // else fieldData.fieldName = fldKey
    else delete fieldData.fieldName

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Field name updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_field_name', state: { fields: allFields, fldKey } })
  }

  return (
    <SimpleAccordion
      id="nam-stng"
      title={__('Name')}
      className={css(FieldStyle.fieldSection)}
    >
      <div className={css(FieldStyle.placeholder)}>
        <input
          data-testid="nam-stng-inp"
          aria-label="Name for this Field"
          placeholder="Type field name here..."
          className={css(FieldStyle.input)}
          value={fieldName || ''}
          onChange={handleFieldName}
        />
      </div>
      {nameErr && <span className={css(FieldStyle.nameErr)}>Field name is duplicate</span>}
    </SimpleAccordion>
  )
}
