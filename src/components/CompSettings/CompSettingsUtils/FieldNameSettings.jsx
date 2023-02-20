import produce from 'immer'
import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addFormUpdateError, addToBuilderHistory, removeFormUpdateError } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'

export default function FieldNameSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const { css } = useFela()
  const adminLabel = fieldData.adminLbl || ''
  const { fieldName } = fieldData
  let nameErr = false

  const allFields = { ...fields }
  delete allFields[fldKey]
  const allFieldsArr = Object.values(allFields)
  const duplicateFieldName = allFieldsArr.find(({ fieldName: fldName }) => fldName && fldName === fieldName)
  if (duplicateFieldName) {
    nameErr = true
  }

  useEffect(() => {
    if (nameErr) {
      const errorData = {
        fieldKey: fldKey,
        errorKey: 'duplicateFieldName',
        errorMsg: __('Duplicate field name'),
        errorUrl: `field-settings/${fldKey}`,
      }
      addFormUpdateError(errorData)
    } else {
      removeFormUpdateError(fldKey, 'duplicateFieldName')
    }
  }, [fieldName, fldKey])

  const handleFieldName = (value) => {
    fieldData.fieldName = value

    if (!value) {
      const errorData = {
        fieldKey: fldKey,
        errorKey: 'fieldNameEmpty',
        errorMsg: __('Field name cannot be empty'),
        errorUrl: `field-settings/${fldKey}`,
      }
      addFormUpdateError(errorData)
    } else {
      removeFormUpdateError(fldKey, 'fieldNameEmpty')
    }

    const tmpFields = produce(fields, draft => {
      draft[fldKey] = fieldData
    })
    setFields(tmpFields)
    addToBuilderHistory({
      event: `Field name updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`,
      type: 'change_field_name',
      state: { fields: allFields, fldKey },
    })
  }

  return (
    <SimpleAccordion
      id="nam-stng"
      title={__('Name')}
      className={css(FieldStyle.fieldSection)}
      tip={tippyHelperMsg.name}
    >
      <div className={css(FieldStyle.placeholder)}>
        <input
          data-testid="nam-stng-inp"
          aria-label="Name for this Field"
          placeholder="Name for this Field"
          className={css(FieldStyle.input)}
          value={fieldName || ''}
          onChange={e => handleFieldName(e.target.value)}
        />
      </div>
      {nameErr && <span className={css(FieldStyle.nameErr)}>Field name is duplicate</span>}
    </SimpleAccordion>
  )
}
